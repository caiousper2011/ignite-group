import { TouchableHighlightProps } from "react-native";
import { Container, Icon, Title } from "./styles";

type Props = TouchableHighlightProps & {
    title: string;
}

const GroupCard = ({ title, ...rest }: Props) => {
    return (
        <Container {...rest}>
            <Icon />
            <Title>
                {title}
            </Title>
        </Container>
    );
}

export default GroupCard;