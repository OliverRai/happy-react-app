import React from 'react';
import  MapView  from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView 
      style={styles.map} 
      initialRegion={
        {
          latitude: -23.495532, 
          longitude: -48.4282114,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }
      }/>
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
  }
});
