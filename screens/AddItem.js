import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, set, get } from "firebase/database";

export default function AddItem() {
  const [selectedItem, setSelectedItem] = useState("Fan");
  const [itemId, setItemId] = useState("");
  const navigation = useNavigation();

  const handleAddItem = () => {
    const db = getDatabase();
    const deviceRef = ref(db, "device");
    get(deviceRef)
      .then((snapshot) => {
        const data = snapshot.val() || {};
        const itemCount = Object.keys(data).filter((key) =>
          key.startsWith(selectedItem)
        ).length;
        const newItemId = `${selectedItem} ${itemCount + 1}`;
        const newItem = { type: newItemId, id: itemId };
        set(ref(db, "device/" + newItem.type), 0)
          .then(() => {
            console.log("New item added to database");
            navigation.navigate("HomeTabs", { newItem });
          })
          .catch((error) => {
            console.error("Error adding new item to database:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching device data:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Item</Text>
      <Text style={styles.subtitle}>Let's manage your smart home</Text>
      <Picker
        selectedValue={selectedItem}
        style={styles.input}
        onValueChange={(itemValue) => setSelectedItem(itemValue)}
      >
        <Picker.Item label="Light" value="Light" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Enter item ID"
        keyboardType="numeric"
        value={itemId}
        onChangeText={setItemId}
      />
      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
