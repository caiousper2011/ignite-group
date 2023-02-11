import GroupCard from "@components/GroupCard";
import Header from "@components/Header";
import HighLight from "@components/HighLight";
import { useCallback, useEffect, useState } from "react";
import { Container } from "./styles";
import { Alert, FlatList } from 'react-native'
import EmptyList from "@components/EmptyList";
import Button from "@components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupGetAll } from "@storage/group/groupGetAll";
import Loading from "@components/Loading";

const Groups = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true)
    const [groups, setGroups] = useState([
        'Rocketseat', 'Cod3r', 'Developer.IO'
    ])

    const handleNewGroup = () => {
        navigation.navigate("new")
    }

    const getGroups = async () => {
        setLoading(true)

        try {

            const data = await groupGetAll()
            setGroups(data)
        } catch (error) {
            Alert.alert("Erro", "Erro ao carregar os grupos.")
        } finally {
            setTimeout(() => setLoading(false), 500)
        }
    }

    useFocusEffect(useCallback(() => {
        getGroups()
    }, []))

    const handleOpenGroup = (group: string) => {
        navigation.navigate('players', { group })
    }

    return (
        <Container>
            <Header />
            <HighLight title="Turmas" subtitle="jogue com a sua turma" />
            {loading ? <Loading /> : (<FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={
                    ({ item }) => <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
                }
                ListEmptyComponent={() => (
                    <EmptyList message="Que tal cadastrar a primeira turma?" />
                )}
                contentContainerStyle={!groups.length && { flex: 1 }}
            />)}

            <Button title="Criar nova turma" onPress={handleNewGroup} />
        </Container>
    );
}

export default Groups;