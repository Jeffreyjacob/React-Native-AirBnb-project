import { View, Text } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listing from '@/components/Listing'

const Explore = () => {
  const onDataChnaged = (category:string)=>{
     console.log(category);
  }
  return (
    <View style={{flex:1}}>
      <Stack.Screen options={{
        header:()=><ExploreHeader onCategoryChanged={onDataChnaged}/>
      }}/>
      <Listing/>
    </View>
  )
}

export default Explore