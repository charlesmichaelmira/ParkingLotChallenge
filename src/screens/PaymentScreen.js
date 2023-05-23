import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";

import { DAY_RATE, FIXED_RATE, RATE_PER_HOUR } from "../constants/Enums";
import { setParkingMap } from "../redux/features/parking-map/actions";

/**
 * Reminder:
 *  for testing purposes, instead of hours, the time computation was
 *  based in minutes for faster testing in real time.
 *
 * TODO: change back to hours if needed
 */

export default function PaymentScreen({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { entry_point, status } = route?.params;
  const [parkingLot, setParkingLot] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [timeDiff, setTimeDiff] = useState(0);

  /* Redux data */
  const parkingMap = useSelector((state) => state.parkingMap.parkingMapLot);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const diffInMilliseconds = currentTime - status?.time_in;
    const diffInMinutes = Math.ceil(diffInMilliseconds / 60000);
    // const diffInHours = Math.ceil(diffInMilliseconds / 3600000); // TODO: uncomment line to return computation in HOURS

    setTimeDiff(diffInMinutes);
  }, []);

  useEffect(() => {
    if (parkingMap) setParkingLot(parkingMap);
  }, [parkingMap]);

  const onPressParkExit = () => {
    Alert.alert("Get payment to confirm exit", "", [
      {
        text: "Confirm",
        style: "default",
        onPress: () => {
          navigation.goBack();
          removeCarParked(entry_point, status);
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const removeCarParked = (entry_point, status) => {
    let tempParkingLot = parkingLot;

    const parkingSlotByEntryPoint = parkingLot.find(
      (obj) => obj.ENTRY_POINT === entry_point
    ).SLOTS;

    const parkingSlotByEntryPointIndex = parkingLot.findIndex(
      (obj) => obj.ENTRY_POINT === entry_point
    );

    const parkedIndex = parkingSlotByEntryPoint.findIndex(
      (obj) => obj.STATUS?.car_parked === status.car_parked
    );

    tempParkingLot[parkingSlotByEntryPointIndex].SLOTS[parkedIndex].STATUS =
      null;
    dispatch(setParkingMap([...tempParkingLot]));
  };

  const getRate = () => {
    let perHour = 0;
    switch (status?.car_size) {
      case "S":
        perHour = RATE_PER_HOUR.SMALL;
        break;
      case "M":
        perHour = RATE_PER_HOUR.MEDIUM;
        break;
      case "L":
        perHour = RATE_PER_HOUR.LARGE;
        break;
    }

    let remainder = 0;
    let dayRate = 0;
    if (timeDiff >= 24) {
      let numberOfDays = getNumberOfDays();
      dayRate = numberOfDays * DAY_RATE;
      const hourPerDay = 24 * numberOfDays;
      remainder = timeDiff - hourPerDay;
    }

    let newTime = remainder === 0 ? timeDiff : remainder;
    if (newTime <= 3) {
      return FIXED_RATE;
    } else {
      const additionalTime = (remainder === 0 ? newTime : remainder) - 3;
      const additionalRate = additionalTime * perHour;
      const finalAmount = dayRate + FIXED_RATE + additionalRate;
      return finalAmount;
    }
  };

  const getNumberOfDays = () => {
    const numOfDays = Math.floor(timeDiff / 24);
    return numOfDays;
  };

  const renderButton = () => {
    return (
      <TouchableOpacity
        style={styles.parkButton}
        onPress={() => onPressParkExit()}
        disabled={isDisabled}
      >
        <Text>{isDisabled ? "Car Exit Success!" : "Proceed on Exit"}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text> Car: {status?.car_parked}</Text>
      <Text> Size: {status?.car_size}</Text>
      <Text> Time In: {status?.time_inStr}</Text>
      <Text> Current Time/Time Out: {new Date().toLocaleTimeString()}</Text>
      <Text> Has 24hour stay: {timeDiff >= 24 ? "Yes" : "No"}</Text>
      <Text> Total Time Parked: {timeDiff + " (minutes*)"}</Text>
      {/* TODO: remove comment if showing in hours */}
      {/* <Text> Total Time Parked: {timeDiff + "hour(s)"}</Text> */}
      <Text> Rate: {getRate() + " PESOS"}</Text>
      {/* <Text>{JSON.stringify(status)}</Text> */}
      {renderButton()}
      <Text style={{ color: "red", fontSize: 12, marginTop: 16 }}>
        {
          "Reminder: for testing purposes, instead of hours, the time computation was based in minutes for faster testing in real time."
        }
      </Text>
      <Text style={{ color: "red", fontSize: 12, marginTop: 16 }}>
        {"Hourly computation is still included in source code."}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    margin: 16,
  },
  lotView: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 8,
    padding: 16,
  },
  parkButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
    padding: 16,
    backgroundColor: "red",
  },
});
