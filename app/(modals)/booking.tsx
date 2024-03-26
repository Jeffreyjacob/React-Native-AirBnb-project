import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { defaultStyles } from '@/constants/styles';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Booking = () => {
  const router = useRouter();
  const [openCard,SetOpenCard] = useState(0);
  const [selectedPlace,setSelectedPlace] = useState(0);
  const onClearAll = ()=>{
     setSelectedPlace(0);
     SetOpenCard(0);
  }
  return (
    <BlurView intensity={70} style={styles.container} tint='light'>

        <Text>BOOK</Text>




        {/**Footer */}
        <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
           <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:'center'}}>
              <TouchableOpacity onPress={onClearAll}>
                   <Text style={{fontSize:18,fontFamily:'MonSb',textDecorationLine:"underline"}}>
                    Clear all
                   </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> router.back()} style={[defaultStyles.btn,{paddingLeft:50,paddingRight:20}]}>
                    <Ionicons name='search-outline' size={24}
                     color={'#fff'} style={defaultStyles.btnIcon} />
                   <Text style={defaultStyles.btnText}>
                    Search
                   </Text>
              </TouchableOpacity>
           </View>
        </Animated.View>

    </BlurView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:100
  }
})

export default Booking