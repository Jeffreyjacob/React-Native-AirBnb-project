import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Layout = () => {
  return ( 
    <Tabs screenOptions={{tabBarActiveTintColor:Colors.primary,
    tabBarLabelStyle:{fontFamily:'MonSb'}
    }}>
       <Tabs.Screen name='index' options={{
        tabBarLabel:'Explore',
        tabBarIcon:({color,size})=> <Ionicons name="search" size={size} color={color} />
       }}/> 
       <Tabs.Screen name='WishList' options={{
        tabBarLabel:'Wishlist',
        tabBarIcon:({color,size})=> <Ionicons name="heart-outline" size={size} color={color} />
       }}/> 
       <Tabs.Screen name='Trips' options={{
        tabBarLabel:'Trips',
        tabBarIcon:({color,size})=> <FontAwesome5 name="airbnb" size={size} color={color} />
       }}/> 
       <Tabs.Screen name='Inbox' options={{
        tabBarLabel:'Inbox',
        tabBarIcon:({color,size})=> <MaterialCommunityIcons name="message-outline" size={size} color={color} />
       }}/> 
        <Tabs.Screen name='Profile' options={{
        tabBarLabel:'Profile',
        tabBarIcon:({color,size})=> <Ionicons name="person-circle-outline" size={size} color={color} />
       }}/> 

    </Tabs>
  )
}

export default Layout