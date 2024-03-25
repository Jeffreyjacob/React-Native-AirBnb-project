import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import  { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation, useRouter } from 'expo-router';
import MapView from 'react-native-map-clustering';

interface Props{
  listings:any;
}

const INITIAL_REGION = {
  latitude:46.204391,
  longitude:6.143158,
  latitudeDelta:3,
  longitudeDelta:2
}

const ListingsMap = ({listings}:Props) => {
  const router = useRouter()
  const onMarkerSelected = (event:any)=>{
        router.push(`/Listing/${event.properties.id}`)
  }
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      animationEnabled={false}
      provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        clusterColor='#fff'
        clusterTextColor='#000'
      >
        {listings.features.map((item:any)=>(
          <Marker 
          key={item.properties.id}
          onPress={()=>onMarkerSelected(item)}
          coordinate={{
            latitude: +item.properties.latitude,
            longitude:+item.properties.longitude
          }}>
            <View style={styles.marker}> 
              <Text style={styles.markerText}>
              € {item.properties.price}
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  map:{
    width:'100%',
    height:'100%'
  },
  marker:{
     backgroundColor:'#fff',
     borderRadius:12,
     padding:6,
     justifyContent:'center',
     alignItems:'center',
     elevation:5,
     shadowColor:'#000',
     shadowOpacity:0.1,
     shadowRadius:6,
     shadowOffset:{
      width:1,
      height:10
     }
  },
  markerText:{
     fontSize:14,
     fontFamily:'MonSb'
  }
})

export default ListingsMap