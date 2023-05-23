import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";

import { setParkingMap } from "../redux/features/parking-map/actions";

import {
  generateCar,
  setRandomEntryPoint,
} from "../utils/random-car-generator";

import { PARKING_LOT_MAP } from "../constants/Enums";

/* Get Lot list from Redux. */
// let parkingLotRedux = store.getState().lot;

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  /* Redux data */
  const parkingMap = useSelector((state) => state.parkingMap);

  const [parkingLot, setParkingLot] = useState(PARKING_LOT_MAP);

  useEffect(() => {
    dispatch(setParkingMap(PARKING_LOT_MAP));
  }, []);

  useEffect(() => {
    if (parkingMap) setParkingLot(parkingMap.parkingMapLot);
  }, [parkingMap]);

  const validateCarSizeToPark = ({ car, entryPoint }) => {
    let hasSlot = false;

    // parkingLot.forEach(item => {
    // });
    for (let i = 0; i < parkingLot.length; i++) {
      if (parkingLot[i]?.ENTRY_POINT === entryPoint) {
        hasSlot = parkingLot[i]?.SLOTS.some((slot) => {
          if (slot?.PARKING_SIZE === car?.size + "P" && slot?.STATUS === null) {
            return true;
          }
        });
        if (hasSlot) {
          break;
        }
      }
    }
    return hasSlot;
  };

  const parkACar = () => {
    let car = generateCar();
    let entryPoint = setRandomEntryPoint();

    let hasSlot = validateCarSizeToPark({ car, entryPoint });
    if (!hasSlot) {
      Alert.alert("Parking Full/No Available Slot");
      return;
    }

    Alert.alert(
      "Car to park: " + car?.plate,
      "Size: " + car?.size + "\nEntry Point: " + entryPoint,
      [
        {
          text: "Proceed",
          style: "default",
          onPress: () => {
            navigation.navigate("ParkingScreen", { car, entryPoint });
          },
        },
        {
          text: "Alert Parking Full",
          style: "destructive",
          // onPress: () => defaultAction(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  // const removeCarParked = (entry_point, status) => {
  //   let tempParkingLot = parkingLot;

  //   const parkingSlotByEntryPoint = parkingLot.find(
  //     (obj) => obj.ENTRY_POINT === entry_point
  //   ).SLOTS;

  //   const parkingSlotByEntryPointIndex = parkingLot.findIndex(
  //     (obj) => obj.ENTRY_POINT === entry_point
  //   );

  //   const parkedIndex = parkingSlotByEntryPoint.findIndex(
  //     (obj) => obj.STATUS?.car_parked === status.car_parked
  //   );

  //   tempParkingLot[parkingSlotByEntryPointIndex].SLOTS[parkedIndex].STATUS =
  //     null;
  //   setParkingLot([...tempParkingLot]);
  //   dispatch(setParkingMap([...tempParkingLot]));
  // };

  const onPressRemove = (entry_point, status) => {
    if (status === null) return;

    navigation.navigate("PaymentScreen", {
      entry_point,
      status,
    });
  };

  const renderButton = () => {
    return (
      <TouchableOpacity style={styles.parkButton} onPress={() => parkACar()}>
        <Text>PARK A CAR</Text>
      </TouchableOpacity>
    );
  };

  const renderMap = () => {
    if (!parkingLot) return;

    return parkingLot.map((item, index) => {
      return (
        <View key={`${item?.ENTRY_POINT}-${index}`}>
          <Text style={{ margin: 8 }}>ENTRY POINT: {item?.ENTRY_POINT}</Text>
          {item?.SLOTS.map((slot, sIndex) => {
            return (
              <Pressable
                style={[
                  styles.lotView,
                  {
                    backgroundColor:
                      slot?.STATUS === null
                        ? "#22A22F"
                        : "rgba(255, 0, 0, 0.4)",
                  },
                ]}
                key={`${item?.ENTRY_POINT}:${index}:${sIndex}`}
                onPress={() => onPressRemove(item?.ENTRY_POINT, slot?.STATUS)}
              >
                <View>
                  <View key={`${item?.ENTRY_POINT}:${sIndex}`}>
                    <Text>Distance: {slot?.DISTANCE}</Text>
                    <Text>Parking Size: {slot?.PARKING_SIZE}</Text>
                  </View>
                </View>
                <View style={{ justifyContent: "center" }}>
                  <Text>
                    {slot?.STATUS?.car_parked
                      ? "Occupied: " + slot?.STATUS?.car_parked
                      : "Car Parked: Vacant"}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderButton()}
      <ScrollView>{renderMap()}</ScrollView>
      {false && (
        <TouchableOpacity
          style={[
            styles.parkButton,
            { backgroundColor: "rgba(255, 0, 0, 0.6)" },
          ]}
          onPress={() => {
            Alert.alert(
              "This will clear all data from the parking lot.\nContinue?",
              "",
              [
                {
                  text: "Yes",
                  style: "default",
                  onPress: () => {
                    /* Remove data from persistent storage */
                    AsyncStorage.removeItem("PARKING_LOT_MAP")
                      .then((res) => null)
                      .catch((e) => console.warn(e));
                  },
                },
                {
                  text: "No",
                  style: "cancel",
                  // onPress: () => defaultAction(),
                },
              ]
            );
          }}
        >
          <Text>** CLEAR PARKING LOT **</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
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
    margin: 8,
    padding: 16,
    backgroundColor: "gray",
  },
});
