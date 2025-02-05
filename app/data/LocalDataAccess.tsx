import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = {

    async saveData(key: string, value: any) {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    },

    async getData<T>(key: string): Promise<T | null> {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue ? JSON.parse(jsonValue) : null;
        } catch (error) {
            console.error('Error retrieving data:', error);
            return null;
        }
    },

    async removeData(key: string) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing data:', error);
        }
    }
};

export default Storage;
