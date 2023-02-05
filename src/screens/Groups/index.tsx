import GroupCard from "@components/GroupCard";
import Header from "@components/Header";
import HighLight from "@components/HighLight";
import { useState } from "react";
import { Container } from "./styles";
import { FlatList } from 'react-native'
import EmptyList from "@components/EmptyList";

const Groups = () => {
    const [groups, setGroups] = useState([
        //    'Rocketseat', 'Cod3r', 'Developer.IO'
    ])

    return (
        <Container>
            <Header />
            <HighLight title="Turmas" subtitle="jogue com a sua turma" />
            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={
                    ({ item }) => <GroupCard title={item} />
                }
                ListEmptyComponent={() => (
                    <EmptyList message="Que tal cadastrar a primeira turma?" />
                )}
                contentContainerStyle={!groups.length && { flex: 1 }}
            />
        </Container>
    );
}

export default Groups;