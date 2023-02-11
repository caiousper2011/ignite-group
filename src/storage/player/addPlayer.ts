import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '@storage/storageConfig'
import { AppError } from '@utils/AppError'
import { getAllPlayersByGroup } from './getAllPlayersByGroup'
import { PlayerStorageDTO } from './PlayerStorageDTO'

export const addPlayer = async (newPlayer: PlayerStorageDTO, group: string) => {
    try {
        const players = await getAllPlayersByGroup(group);

        if (players.some(({ name }) => name === newPlayer.name)) {
            throw new AppError("Essa pessoa já está adicionada no time" + group)
        }

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify([...players, newPlayer]));
    } catch (error) {
        throw error
    }

}