import { BackButton, BackIcon, Container, Logo } from "./styles";
import logoImg from '@assets/logo.png';
import { useNavigation } from "@react-navigation/native";

type Props = {
    showBackButton?: boolean;
}

const Header = ({ showBackButton = false }: Props) => {

    const navigation = useNavigation()

    const handleBack = () => {
        navigation.navigate('groups')
    }

    return (
        <Container>
            {showBackButton && (
                <BackButton onPress={handleBack}>
                    <BackIcon />
                </BackButton>)
            }
            <Logo source={logoImg} />
        </Container>
    );
}

export default Header;