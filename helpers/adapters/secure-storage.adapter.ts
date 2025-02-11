import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export class SecureStorageAdapter {
  static async setItem(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      Alert.alert("Error", "Error a guardar dato");
    }
  }

  static async getItem(key: string) {
    try {
      await SecureStore.getItemAsync(key);
    } catch (error) {
      Alert.alert("Error", "Error al obtener datos");
    }
  }

  static async deleteItem(key: string) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      Alert.alert("Error", "Error al borrar datos");
    }
  }
}
