import React from 'react';

import { Container, TypeTitle, TypeDescription, TypeImage, RequestButton, RequestButtonText } from './styles';

const uberx = require('../../../assets/uberx.png')

const Details: React.FC = () => {
    return <Container>
        <TypeTitle>Popular</TypeTitle>
        <TypeTitle>Viagens baratas no dia a dia</TypeTitle>
        <TypeImage source={uberx} />
        <TypeTitle>UberX</TypeTitle>
        <TypeDescription>R$6,00</TypeDescription>

        <RequestButton onPress={() => { }}>
            <RequestButtonText>Solicitar UberX</RequestButtonText>
        </RequestButton>
    </Container>;
}

export default Details;