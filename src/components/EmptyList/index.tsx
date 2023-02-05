import { Container, Message } from "./styles";

type Props = {
    message: string;
}

const EmptyList = ({ message }: Props) => {
    return (
        <Container>
            <Message>
                {message}
            </Message>
        </Container>
    );
}

export default EmptyList;