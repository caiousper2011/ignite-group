import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { getAllPlayersByGroup } from "./getAllPlayersByGroup";

export const playerGetByGroupAndTeam = async (group: string, team: string) => {
    try {
        const players = await getAllPlayersByGroup(group)

        return players.filter((player) => player.team === team)
    } catch (error) {
        throw error
    }
} 