import Button from "@components/Button";
import Header from "@components/Header";
import HighLight from "@components/HighLight";
import Input from "@components/Input";
import { Container, Content, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

const NewGroup = () => {
    const [group, setGroup] = useState('')

    const navigation = useNavigation()

    const handleNewGroup = async () => {
        try {
            if (!group.trim().length) {
                Alert.alert("Atenção", "Informe o nome da turma!")
                return
            }

            await groupCreate(group)
            navigation.navigate('players', { group })
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("Alerta", error.message)
            } else {
                Alert.alert("Alerta", "Não foi possível criar o grupo")
            }

        }
    }

    return (
        <Container>
            <Header showBackButton />

            <Content>
                <Icon />
                <HighLight title="Nova turma" subtitle="crie a turma para adicionar as pessoas" />
                <Input value={group} onChangeText={setGroup} placeholder="Nome da turma" style={{ marginBottom: 20 }} />
                <Button title="Criar" onPress={handleNewGroup} />
            </Content>
        </Container>
    );
}

export default NewGroup;