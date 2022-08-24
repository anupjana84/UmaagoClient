import { StyleSheet, Text, View } from 'react-native'
import React,{useRef} from 'react'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const RouteMap = () => {
    const mapRef=useRef(null)
    const changRegion=(e)=>{
        console.log(e)

    }
  return (
   
     <View style={{flex: 1}}>
              <MapView
                provider={MapView.PROVIDER_GOOGLE}
                style={{flex: 1, }}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                showsMyLocationButton={true}
                zoomControlEnabled={true}
                zoomEnabled={true}
                enableZoomControl={true}
                zoomTapEnabled={true}
                rotateEnabled={true}
                scrollEnabled={true}
                pitchEnabled={true}
                mapType={'standard'}
                onRegionChangeComplete={changRegion}
                ref={mapRef}
              />
    </View>
  )
}

export default RouteMap

const styles = StyleSheet.create({})