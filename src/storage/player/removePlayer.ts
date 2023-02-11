import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '@storage/storageConfig'
import { getAllPlayersByGroup } from './getAllPlayersByGroup'
import { PlayerStorageDTO } from './PlayerStorageDTO'

export const removePlayer = async (group: string, playerName: string) => {
    try {
        const players = await getAllPlayersByGroup(group)

        const newPlayers = players.filter(player => player.name !== playerName)
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify(newPlayers))
    } catch (error) {
        throw error
    }
}