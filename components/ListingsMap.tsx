import { View, Text, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import  { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation, useRouter } from 'expo-router';
import MapView from 'react-native-map-clustering';
import { defaultStyles } from '@/constants/styles';

interface Props{
  listings:any;
}

const INITIAL_REGION = {
  latitude:46.204391,
  longitude:6.143158,
  latitudeDelta:3,
  longitudeDelta:2
}

const ListingsMap = memo(({listings}:Props) => {
  const router = useRouter()
  const onMarkerSelected = (event:any)=>{
        router.push(`/Listing/${event.properties.id}`)
  }
 const renderCluster = (cluster:any) =>{
       const {id,geometry,onPress,properties} = cluster;
       const points = properties.point_count;

       return (
        <Marker key={`cluster-${id}`} 
        onPress={onPress}
        coordinate={{
          longitude:geometry.coordinates[0],
          latitude:geometry.coordinates[1]
        }}
        >
         <View style={styles.marker}>
          <Text style={{color:'#000',textAlign:'center',fontFamily:"MonSb"}}>
            {points}
          </Text>
         </View>
        </Marker>
       )
 }

  return (
    <View style={defaultStyles.container}>
      <MapView style={styles.map}
      animationEnabled={false}
      provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        clusterColor='#fff'
        clusterTextColor='#000'
        renderCluster={renderCluster}
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
})

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