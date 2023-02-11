import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";
import { groupGetAll } from "./groupGetAll";

export const groupRemove = async (groupName: string) => {
    try {
        const groups = await groupGetAll()

        const newGroups = groups.filter(group => group !== groupName);

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(newGroups))
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`)

    } catch (error) {
        throw error
    }
} 