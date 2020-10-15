import React from 'react';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import mapMarker from './src/images/map-marker.png';

export default function App() {
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
          <Marker 
            icon={mapMarker}
            calloutAnchor={{
              x: 2.55,
              y: 1
            }}
            coordinate={{
              latitude: -23.495532,
              longitude: -48.4282114,
            }}
          >
            <Callout tooltip onPress={() => {}}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>Lar das meninas</Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
    color: '#0089A5',
    fontSize: 14
  }
});
