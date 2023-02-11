import { TouchableOpacityProps } from "react-native";
import { Container, FilterProps, Title } from "./styles";

type Props = TouchableOpacityProps & FilterProps & {
    title: string
}

const Filter = ({ title, isActive = false, ...rest }: Props) => {
    return (
        <Container isActive={isActive} {...rest}>
            <Title>{title}</Title>
        </Container>
    );
}

export default Filter;