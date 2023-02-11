import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { groupGetAll } from "./groupGetAll";

export const groupCreate = async (newGroup: string) => {
    try {
        const groups = await groupGetAll()

        const groupAlreadyExists = groups.includes(newGroup)

        if (groupAlreadyExists) {
            throw new AppError("Já existe uma classe com esse nome.")
        }

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify([...groups, newGroup]))
    } catch (error) {
        throw error
    }
} 