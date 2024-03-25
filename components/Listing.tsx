import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { defaultStyles } from '@/constants/styles';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

interface Props{
  listings:any[];
  category:string;
}

const Listing = ({listings:items,category}:Props) => {
  const [loading,setLoading] = useState(false)
  const listRef = useRef<FlatList>(null);
  useEffect(()=>{
    console.log('REALOAD LISTINGS',items.length);
    setLoading(true)
    setTimeout(()=>{
       setLoading(false)
    },200)
  },[category])
  return (
    <View style={defaultStyles.container}>
      <FlatList 
      ref={listRef}
      data={loading? []: items}
      ListHeaderComponent={<Text style={{
        textAlign:"center",
        fontFamily:'MonSb',
        fontSize:16
      }}>
        {items.length} homes
      </Text>}
      renderItem={({item})=>(
         <Link href={`/Listing/${item.id}`} asChild>
           <TouchableOpacity>
            <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
                <Image
                source={{uri:item.xl_picture_url}}
                style={styles.image}
                />
                <TouchableOpacity style={{position:'absolute',right:30,top:30}}>
                  <Ionicons name='heart-outline' size={24} color={'#000'}/>
                </TouchableOpacity>
                
                <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                  <Text style={{fontSize:16,fontFamily:'MonSb',width:270}}>{item.name}</Text>
                  <View style={{flexDirection:"row",gap:4}}>
                    <Ionicons name='star' size={16}/>
                    <Text style={{fontFamily:'MonSb'}}>{item.review_scores_rating / 20}</Text>
                  </View>
                </View>

                <Text style={{fontFamily:'Mon'}}>{item.room_type}</Text>

                <View style={{flexDirection:'row',gap:4}}>
                   <Text style={{fontFamily:'MonSb'}}>€ {item.price}</Text>
                   <Text style={{fontFamily:'Mon'}}>night</Text>
                </View>

            </Animated.View>
           </TouchableOpacity>
         </Link>
      )}

      />
    </View>
  )
}

const styles = StyleSheet.create({
  listing:{
    padding:16,
    gap:10,
    marginVertical:16
  },
  image:{
    width:'100%',
    height:300,
    borderRadius:10
  }
})

export default Listing