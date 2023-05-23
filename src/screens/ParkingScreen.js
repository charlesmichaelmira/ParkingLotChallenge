import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { setParkingMap } from "../redux/features/parking-map/actions";

export default function ParkingScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { car, entryPoint } = route?.params;
  const [parkingLot, setParkingLot] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  /* Redux data */
  const parkingMap = useSelector((state) => state.parkingMap.parkingMapLot);

  useEffect(() => {
    if (parkingMap) setParkingLot(parkingMap);
    // setParkingLot(parkingMap);
  }, [parkingMap]);

  const parkACar = () => {
    const slotByEntryPoint = parkingLot.find(
      (obj) => obj.ENTRY_POINT === entryPoint
    ).SLOTS;
    const slotByEntryPointIndex = parkingLot.findIndex(
      (obj) => obj.ENTRY_POINT === entryPoint
    );

    // const slotBySize = slotByEntryPoint.find(
    //   (obj) => obj.PARKING_SIZE === car?.size + "P"
    // );
    const slotBySizeIndex = slotByEntryPoint.findIndex((obj) => {
      if (obj.PARKING_SIZE === car?.size + "P" && obj.STATUS === null) {
        return true;
      }
    });

    if (slotBySizeIndex === -1) {
      Alert.alert("no more vacant");
      return;
    }

    const currentTimeMS = new Date();

    let newStatus = {
      car_parked: car?.plate,
      car_size: car?.size,
      time_in: currentTimeMS.getTime(),
      time_inStr: currentTimeMS.toLocaleTimeString(),
    };

    let newParkingLot = parkingLot;
    newParkingLot[slotByEntryPointIndex].SLOTS[slotBySizeIndex].STATUS =
      newStatus;
    setParkingLot([...newParkingLot]);
    dispatch(setParkingMap([...newParkingLot]));
    setIsDisabled(true);
  };

  const renderButton = () => {
    return (
      <TouchableOpacity
        style={styles.parkButton}
        onPress={() => parkACar()}
        disabled={isDisabled}
      >
        <Text>{isDisabled ? "Car Parked!" : "Select Nearest Parking"}</Text>
      </TouchableOpacity>
    );
  };

  const renderMap = () => {
    return parkingLot.map((item, index) => {
      if (item?.ENTRY_POINT === entryPoint) {
        return (
          <View key={`${item?.ENTRY_POINT}-${index}`}>
            <Text style={{ margin: 8 }}>ENTRY POINT: {item?.ENTRY_POINT}</Text>
            {item?.SLOTS.map((slot, sIndex) => {
              return (
                <View
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
                </View>
              );
            })}
          </View>
        );
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text> Car: {car?.plate}</Text>
      <Text> Size: {car?.size}</Text>
      <ScrollView>{renderMap()}</ScrollView>
      {renderButton()}
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
