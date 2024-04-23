import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeData(key, object) {
    try {
        await AsyncStorage.setItem(
            key,
            JSON.stringify(object)
        )
        return 200;
    } catch (error) {
        console.log(error.message)
        return 500;   
    }
}

export async function requestData(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log(value);
            return value
        }
      } catch (error) {
        console.log(error.message)
        return 500;
      }
}

export async function EraseData(key) {
    try {
        await AsyncStorage.removeItem(key);
      } catch (error) {
        console.log(error.message)
        return 500;
      }
}