import React, { useEffect, useState, Fragment } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import mapStyle from '../constants/mapStyle.json';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import Search from '../components/Search'
import Directions from '../components/Directions'

import { LocationBox, LocationText, LocationTimeBox, LocationTimeText, LocationTimeTextSmall } from './styles'

const markerImage = require('../../assets/marker.png')


import { getPixelSize } from '../utils'

function Main() {
    const [currentRegion, setCurrentRegion] = useState({
        latitude: -41.40338,
        longitude: -2.17403,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04
    });
    const [loadStartRegionFlag, setLoadStartRegionFlag] = useState(false)
    const [destination, setDestination] = useState<any>(null)
    const [map, setMap] = useState<any>()

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
            <StatusBar
                hidden={true}
            />
            <MapView
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapStyle}
                initialRegion={currentRegion}
                style={styles.map}
                showsUserLocation
                loadingEnabled
                ref={el => setMap(el)}
            >
                {destination && (
                    <Fragment>
                        <Directions
                            origin={currentRegion}
                            destination={destination}
                            onReady={(result: any) => {
                                map.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: getPixelSize(50),
                                        left: getPixelSize(50),
                                        top: getPixelSize(50),
                                        bottom: getPixelSize(50),
                                    }
                                })
                            }}
                        />
                        <Marker coordinate={destination} anchor={{ x: 0, y: 0 }} image={markerImage}>
                            <LocationBox>
                                <LocationText>{destination.title}</LocationText>
                            </LocationBox>
                        </Marker>

                        <Marker coordinate={currentRegion} anchor={{ x: 0, y: 0 }}>
                            <LocationBox>
                                <LocationTimeBox>
                                    <LocationTimeText>31</LocationTimeText>
                                    <LocationTimeTextSmall>Min</LocationTimeTextSmall>
                                </LocationTimeBox>
                                <LocationText>Muzambinho</LocationText>
                            </LocationBox>
                        </Marker>
                    </Fragment>
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