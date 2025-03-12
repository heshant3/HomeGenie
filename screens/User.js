import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function User() {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome jhone</Text>
      <View style={styles.infoWrapper}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>Jhone rock</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>test@gmail.com</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Password</Text>
          <Text style={styles.value}>********</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  infoWrapper: {
    marginTop: 200,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
    color: "#555",
  },
  buttonContainer: {
    marginTop: 70,
  },
});
