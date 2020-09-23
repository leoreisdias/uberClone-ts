import React from 'react';
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_API_KEY } from 'react-native-dotenv'

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
        apikey={GOOGLE_API_KEY}
        strokeWidth={3}
        strokeColor="yellow"
    />
)

export default Directions;