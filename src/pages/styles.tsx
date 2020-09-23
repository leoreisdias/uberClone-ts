import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native'


export const LocationBox = styled.View`
    background: #FFF;
    shadow-color: #000;
    shadow-offset: 0 0;
    shadow-opacity: 0.1;
    elevation: 1;
    border: 1px solid #ddd;
    border-radius: 3px;
    flex-direction: row;

    ${Platform.select({
    ios: css`
            margin-top: 20px;
        `,
    android: css`
        margin-top: 15px;
        margin-left: 10px;
    `,
})}
`;

export const LocationText = styled.Text`
    margin: 5px 8px;
    font-size: 14px;
    color: #333;
`;

export const LocationTimeBox = styled.View`
    background: #222;
    padding: 3px 8px;
`;

export const LocationTimeText = styled.Text`
    color: #FFF;
    font-size: 12px;
    text-align: center;
`;

export const LocationTimeTextSmall = styled.Text`
    color: #FFF;
    font-size: 10px;
    text-align: center;
`;

export const Back = styled.TouchableOpacity`
    background: #ddddaa;
    padding: 15px;
    border-radius: 15px;
    position: absolute;
    top: ${Platform.select({
    ios: 60,
    android: 40,
})};
    left: 20px;
`;