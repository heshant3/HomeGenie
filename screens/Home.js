import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getDatabase, ref, get, update, onValue } from "firebase/database";
import { database } from "../firebaseConfig"; // Import the database

export default function Home() {
  const [devices, setDevices] = useState([]);
  const [emgStatus, setEmgStatus] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params?.newItem) {
      const newDevice = { type: route.params.newItem.type, isOn: false };
      setDevices((prevDevices) => [...prevDevices, newDevice]);
    }
  }, [route.params?.newItem]);

  useEffect(() => {
    const deviceRef = ref(database, "device");
    const unsubscribe = onValue(
      deviceRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const deviceArray = Object.keys(data).map((key) => ({
            type: key,
            isOn: data[key] === 1,
          }));
          setDevices(deviceArray);
        } else {
          console.log("No data available for devices");
        }
      },
      (error) => {
        console.error("Error fetching device data:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const emgRef = ref(database, "EMG");
    const unsubscribe = onValue(
      emgRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setEmgStatus(snapshot.val() === 1);
        } else {
          console.log("No data available for EMG sensor");
        }
      },
      (error) => {
        console.error("Error fetching EMG sensor data:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const toggleDevice = (index) => {
    setDevices((prevDevices) => {
      const updatedDevices = prevDevices.map((device, i) =>
        i === index ? { ...device, isOn: !device.isOn } : device
      );

      const updatedDevice = updatedDevices[index];
      const deviceRef = ref(database, `device/`);
      update(deviceRef, { [updatedDevice.type]: updatedDevice.isOn ? 1 : 0 })
        .then(() => {
          console.log(`${updatedDevice.type} status updated successfully`);
        })
        .catch((error) => {
          console.error(`Error updating ${updatedDevice.type} status:`, error);
        });

      return updatedDevices;
    });
  };

  const getIcon = (type) => {
    switch (type) {
      case "Light":
      case "Second Light":
        return <Ionicons name="bulb-outline" size={40} color="black" />;
      case "Fan":
        return (
          <MaterialCommunityIcons
            name="ceiling-fan-light"
            size={40}
            color="#2b2b2b"
          />
        );
      case "Door":
        return (
          <MaterialCommunityIcons name="door-sliding" size={40} color="black" />
        );
      default:
        return <Ionicons name="bulb-outline" size={40} color="black" />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome jhone</Text>
      <Text style={styles.subtitle}>Let's manage your smart home</Text>
      <TouchableOpacity
        style={styles.addIconContainer}
        onPress={() => navigation.navigate("AddItem")}
      >
        <Ionicons
          name="add-circle-outline"
          size={24}
          color="black"
          style={styles.addIcon}
        />
      </TouchableOpacity>
      <View style={styles.sensorContainer}>
        <Ionicons name="pulse-outline" size={24} color="black" />
        <Text style={styles.sensorText}>EGM Sensor Status</Text>
        <Text style={styles.sensorStatus}>{emgStatus ? "ON" : "OFF"}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.deviceContainer}>
          {devices.map((device, index) => (
            <View key={index} style={styles.device}>
              {getIcon(device.type)}
              <Text style={styles.deviceText}>{device.type}</Text>
              <Switch
                value={device.isOn}
                onValueChange={() => toggleDevice(index)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  addIconContainer: {
    position: "relative",
    top: -50,
  },
  addIcon: {
    position: "absolute",
    top: -5,
    right: 20,
  },
  sensorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
  },
  sensorText: {
    fontSize: 16,
  },
  sensorStatus: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deviceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  device: {
    width: "48%",
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  deviceText: {
    fontSize: 16,
    marginVertical: 10,
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
