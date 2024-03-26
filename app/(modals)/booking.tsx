import { View, Text, StyleSheet, TouchableOpacity,ScrollView, TextInput, Image} from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur';
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated';
import { defaultStyles } from '@/constants/styles';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { places } from '@/assets/data/places';


const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Booking = () => {
  const router = useRouter();
  const [openCard, SetOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);
  const onClearAll = () => {
    setSelectedPlace(0);
    SetOpenCard(0);
  }
  return (
    <BlurView intensity={70} style={styles.container} tint='light'>

      <View style={styles.card}>
        {/**Where */}
        {
          openCard != 0 && (
            <AnimatedTouchableOpacity onPress={() => SetOpenCard(0)}
              style={styles.cardPreview} entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
              <Text style={styles.previewText}>Where</Text>
              <Text style={styles.previewdData}>I'm flexable</Text>
            </AnimatedTouchableOpacity>
          )
        }
        {
          openCard === 0 && (
            <Animated.View style={styles.cardBody}>
              <Text style={styles.cardHeader}>Where to ?</Text>
              <View style={styles.searchSection}>
                <Ionicons name='search' size={20} style={styles.searchIcon}/>
                <TextInput style={styles.inputField} 
                placeholder='Search destination' placeholderTextColor={Colors.grey}/>
              </View>
              <ScrollView horizontal
              contentContainerStyle={{gap:25}}
               showsHorizontalScrollIndicator={false}>
                 {places.map((item,index)=>(
                    <TouchableOpacity onPress={()=>setSelectedPlace(index)} key={index}>
                      <Image source={item.img}
                      style={selectedPlace === index ? styles.placeSelected: styles.Place}/>
                      <Text 
                      style={selectedPlace === index ? {fontFamily:'MonSb',paddingTop:6,textAlign:'center'}
                      :{fontFamily:'Mon',paddingTop:6,textAlign:'center'}}>
                        {item.title}
                        </Text>
                    </TouchableOpacity>
                 ))}
              </ScrollView>
            </Animated.View>
          )
        }
      </View>


      <View style={styles.card}>
        {/**When */}
        {/**Where */}
        {
          openCard != 1 && (
            <AnimatedTouchableOpacity onPress={() => SetOpenCard(1)}
              style={styles.cardPreview} entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
              <Text style={styles.previewText}>When</Text>
              <Text style={styles.previewdData}>Any week</Text>
            </AnimatedTouchableOpacity>
          )
        }

        {
          openCard === 1 && (
            <Animated.View style={styles.cardBody}>
              <Text style={styles.cardHeader}>When is your trip ?</Text>
            </Animated.View>
          )
        }
      </View>

      <View style={styles.card}>

        {/**who */}
        {/**Where */}
        {
          openCard != 2 && (
            <AnimatedTouchableOpacity onPress={() => SetOpenCard(2)}
              style={styles.cardPreview} entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
              <Text style={styles.previewText}>Who</Text>
              <Text style={styles.previewdData}>Add guest</Text>
            </AnimatedTouchableOpacity>
          )
        }
        {
          openCard === 2 && (
            <Animated.View style={styles.cardBody}>
              <Text style={styles.cardHeader}>Who's coming</Text>
            </Animated.View>
          )
        }

      </View>




      {/**Footer */}
      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
          <TouchableOpacity onPress={onClearAll}>
            <Text style={{ fontSize: 18, fontFamily: 'MonSb', textDecorationLine: "underline" }}>
              Clear all
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} style={[defaultStyles.btn, { paddingLeft: 50, paddingRight: 20 }]}>
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
  container: {
    flex: 1,
    paddingTop: 100
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  previewText: {
    fontFamily: 'MonSb',
    fontSize: 14,
    color: Colors.grey,
  },
  previewdData: {
    fontFamily: 'MonSb',
    fontSize: 14,
    color: Colors.dark,
  },
  cardPreview: {
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 20
  },
  cardHeader: {
    fontFamily: 'MonSb',
    fontSize: 24,
    padding: 20
  },
  cardBody:{
   paddingHorizontal:20,
   paddingBottom:20,
  },
  searchSection:{
      height:50,
      flexDirection:'row',
       borderWidth:1,
       borderColor:'#ABABAB',
       borderRadius:8,
       backgroundColor:"#fff",
       alignItems:"center",
       alignContent:"center",
       marginBottom:16
  },
  inputField:{
      flex:1,
      padding:10
  },
  searchIcon:{
    padding:10
  },
  Place:{
    width:100,
    height:100,
    borderRadius:10,
  },
  placeSelected:{
    width:100,
    height:100,
    borderRadius:10,
    borderWidth:2,
    borderColor:Colors.grey
  }
})

export default Booking