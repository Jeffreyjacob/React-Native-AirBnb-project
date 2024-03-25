import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listing from '@/components/Listing';
import ListingData from '@/assets/data/airbnb-listings@public (4).json';
import ListingsMap from '@/components/ListingsMap';
import ListingDataGeo from '@/assets/data/airbnb-listings@public.geo.json';

const Explore = () => {
  const [Category,setCategory] = useState('Tiny homes')
const items = useMemo(()=>ListingData as any,[]);
const geo = useMemo(()=>ListingDataGeo as any,[]);  

  const onDataChnaged = (category:string)=>{
     setCategory(category);
  }

  return (
    <View style={{flex:1,marginTop:130}}>
      <Stack.Screen options={{
        header:()=><ExploreHeader onCategoryChanged={onDataChnaged}/>
      }}/>
      {/*<Listing listings={items} category={Category}/>*/}

      <ListingsMap listings={geo}/>
    </View>
  )
}

export default Explore