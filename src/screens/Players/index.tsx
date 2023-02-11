import ButtonIcon from "@components/ButtonIcon";
import Filter from "@components/Filter";
import Header from "@components/Header";
import HighLight from "@components/HighLight";
import Input from "@components/Input";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { Alert, FlatList, TextInput } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react'
import PlayerCard from "@components/PlayerCard";
import EmptyList from "@components/EmptyList";
import Button from "@components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useRoute, RouteProp, ParamListBase } from '@react-navigation/native'
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { AppError } from "@utils/AppError";
import { addPlayer } from "@storage/player/addPlayer";
import { getAllPlayersByGroup } from "@storage/player/getAllPlayersByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { removePlayer } from "@storage/player/removePlayer";
import { groupRemove } from "@storage/group/groupRemove";
import Loading from "@components/Loading";

type RouteParams = {
    group: string;
}

const Players = () => {
    const navigation = useNavigation()
    const route = useRoute() as RouteProp<{ params: RouteParams }>
    const [player, setPlayer] = useState('')
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const inputRef = useRef<TextInput>(null)
    const [loading, setLoading] = useState(true)

    const handleAddPlayers = async () => {
        if (!player.trim().length) {
            return Alert.alert("Atenção", "Nome da pessoa em branco.");
        }

        try {
            const newPlayer = { name: player, team }
            await addPlayer(newPlayer, route.params.group)
            getPlayersByTeam()
            setPlayer('')
            inputRef.current?.blur()

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("Erro", error.message);
            } else {
                Alert.alert("Erro", "Erro ao adicionar um novo player.");
            }

        }
    }

    const getPlayersByTeam = async () => {
        setLoading(true)

        try {
            const players = await playerGetByGroupAndTeam(route.params.group, team)
            setPlayers(players)
        } catch (error) {
            Alert.alert("Erro", "Erro ao carregar players.");
        } finally {
            setTimeout(() => setLoading(false), 500)
        }
    }

    useEffect(() => {
        getPlayersByTeam()
    }, [team])

    const handleRemovePlayers = async (playerName: string) => {
        try {
            await removePlayer(route.params.group, playerName)
            Alert.alert("Sucesso", "Player removido!");
            getPlayersByTeam()
        } catch (error) {
            Alert.alert("Sucesso", `Ocorreu um erro ao remover player ${playerName}`);
        }
    }

    const handleRemoveGroup = async () => {
        try {
            await groupRemove(route.params.group)
            Alert.alert("Sucesso", "Grupo removido!");
            navigation.navigate("groups")
        } catch (error) {
            Alert.alert("Sucesso", `Ocorreu um erro ao remover o grupo ${route.params.group}`);
        }
    }


    return (
        <Container>
            <Header showBackButton />
            <HighLight title={route.params.group} subtitle="adicione a galera e separe os times" />
            <Form>
                <Input
                    inputRef={inputRef}
                    value={player}
                    onChangeText={setPlayer}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onSubmitEditing={handleAddPlayers}
                />
                <ButtonIcon icon="add" onPress={handleAddPlayers} />
            </Form>
            <HeaderList>

                <FlatList
                    data={['Time A', 'Time B', 'Time C', 'Time D', 'Time E']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter title={item} isActive={team === item} onPress={() => setTeam(item)} />

                    )}
                    horizontal
                />
                <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
            </HeaderList>
            {loading ? <Loading /> : (<FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <PlayerCard name={item.name} onRemove={() => handleRemovePlayers(item.name)} />
                )}
                ListEmptyComponent={() => (
                    <EmptyList message="Não há pessoas nesse time" />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && { flex: 1 }
                ]}
            />)}
            <Button title="Remover turma" type="SECONDARY" onPress={handleRemoveGroup} />
        </Container>
    );
}

export default Players;