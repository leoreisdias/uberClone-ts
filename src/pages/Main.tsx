import React, { useEffect, useState, Fragment } from 'react';
import { StyleSheet, StatusBar, View, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import axios from 'axios'
import mapStyle from '../constants/mapStyle.json';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import Search from '../components/Search'
import Directions from '../components/Directions'

import { GOOGLE_API_KEY } from 'react-native-dotenv'

import { LocationBox, LocationText, LocationTimeBox, LocationTimeText, LocationTimeTextSmall, Back } from './styles'

const markerImage = require('../../assets/marker.png')
const backImage = require('../../assets/back.png')


import { getPixelSize } from '../utils'
import Details from '../components/Details';

function Main() {
    const [currentRegion, setCurrentRegion] = useState({
        latitude: -41.40338,
        longitude: -2.17403,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04
    });
    const [loadStartRegionFlag, setLoadStartRegionFlag] = useState(false)
    const [destination, setDestination] = useState<any>(null)
    const [duration, setDuration] = useState<any>()
    const [originAddress, setOriginAddress] = useState<any>("Muzambinho");
    const [map, setMap] = useState<any>()

    useEffect(() => {
        async function loadInititalPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync();

                const { latitude, longitude } = coords
                const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`);
                setOriginAddress(response.data.results[0].address_components[1].short_name)
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

    function handleBack() {
        setDestination(null)
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
                                setDuration(Math.floor(result.duration))
                                map.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: getPixelSize(50),
                                        left: getPixelSize(50),
                                        top: getPixelSize(50),
                                        bottom: getPixelSize(350),
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
                                    <LocationTimeText>{duration}</LocationTimeText>
                                    <LocationTimeTextSmall>Min</LocationTimeTextSmall>
                                </LocationTimeBox>
                                <LocationText>{originAddress}</LocationText>
                            </LocationBox>
                        </Marker>
                    </Fragment>
                )}
            </MapView>
            {destination ?
                <Fragment>
                    <Back onPress={handleBack}>
                        <Image source={backImage} />
                    </Back>
                    <Details />
                </Fragment>
                : <Search onLocationSelected={handleLocationSelected} />}

        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
})

export default Main;