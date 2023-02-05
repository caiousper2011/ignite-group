import { Container, Subtitle, Title } from "./styles";

type Props = {
    title: string;
    subtitle: string
}

const HighLight = ({ title, subtitle }: Props) => {
    return (
        <Container>
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
        </Container>
    );
}

export default HighLight;