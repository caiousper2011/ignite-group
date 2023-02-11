import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '@storage/storageConfig'
import { PlayerStorageDTO } from './PlayerStorageDTO'

export const getAllPlayersByGroup = async (group: string) => {
    try {
        const data = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)

        return (data ? JSON.parse(data) : []) as PlayerStorageDTO[]
    } catch (error) {
        throw error
    }
}