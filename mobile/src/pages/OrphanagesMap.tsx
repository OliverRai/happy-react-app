import React, { useState } from 'react';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import mapMarker from '../images/map-marker.png';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage{
  id: number,
  name: string,
  latitude: number,
  longitude: number,
}

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const navigation = useNavigation();

  useFocusEffect(() => {
    api.get('/orphanages').then(reponse => {
      setOrphanages(reponse.data);
    })
  });

  function handleNavigationToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={
          {
            latitude: -23.495532,
            longitude: -48.4282114,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }
        } >
        {orphanages.map(orphanage => {
          return (
            <Marker
            key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.55,
                y: 1
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            >
              <Callout tooltip onPress={() => handleNavigationToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>

      <View style={styles.footer}>
         <Text style={styles.footerText}>{orphanages.length} orfanato(s) encontrado(s)</Text>
        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color={"#FFF"}></Feather>
        </RectButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: '100%'
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: '#DCDCDC',
    borderRadius: 16,
    justifyContent: 'center'
  },

  calloutText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089A5',
    fontSize: 14
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,


    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',

    elevation: 10,
  },

  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3',
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  }
});
