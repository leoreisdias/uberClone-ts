import React from 'react';
import MapViewDirections from 'react-native-maps-directions'
// import { Container } from './styles';

interface destinationProps {
    destination: { latitude: number, longitude: number, title: string },
    origin: any,
    onReady: any,
}

const Directions: React.FC<destinationProps> = ({ destination, origin, onReady }) => (
    <MapViewDirections
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey="AIzaSyDo4RdcuiRqljtMG2zVnMe3yUzln6zoFmU"
        strokeWidth={3}
        strokeColor="#222"
    />
)

export default Directions;