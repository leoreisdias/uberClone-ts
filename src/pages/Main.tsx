import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import mapStyle from '../constants/mapStyle.json';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import Search from '../components/Search'
import Directions from '../components/Directions'

function Main() {
    const [currentRegion, setCurrentRegion] = useState({
        latitude: -41.40338,
        longitude: -2.17403,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04
    });
    const [loadStartRegionFlag, setLoadStartRegionFlag] = useState(false)
    const [destination, setDestination] = useState<any>(null)

    useEffect(() => {
        async function loadInititalPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync();

                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0143,
                    longitudeDelta: 0.0134
                })

                setLoadStartRegionFlag(true);
            }
        }

        loadInititalPosition();
    }, [])

    if (!loadStartRegionFlag)
        return null

    function handleLocationSelected(data: any, { geometry }: any) {
        const { location: { lat: latitude, lng: longitude } } = geometry

        setDestination({
            latitude,
            longitude,
            title: data.structured_formatting.main_text,
        })
    }

    return (
        <View style={styles.map}>
            <MapView
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapStyle}
                initialRegion={currentRegion}
                style={styles.map}
                showsUserLocation
                loadingEnabled
            >
                {destination && (
                    <Directions
                        origin={currentRegion}
                        destination={destination}
                        onReady={() => {

                        }}
                    />
                )}
            </MapView>
            <Search onLocationSelected={handleLocationSelected} />
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
})

export default Main;