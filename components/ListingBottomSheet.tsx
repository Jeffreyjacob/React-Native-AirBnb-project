import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo, useRef } from 'react';
import BottomSheet, { BottomSheetView, TouchableOpacity } from '@gorhom/bottom-sheet';
import Listing from './Listing';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';



interface Props {
    listing: any[];
    category: string
}
const ListingBottomSheet = ({ listing, category }: Props) => {
    const snapPoints = useMemo(() => ['10%', '100%'], []);
    const bottomSheetRef = useRef<BottomSheet>(null);

    const showMap =()=>{
      bottomSheetRef.current?.collapse();
    }
    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={1}
            handleIndicatorStyle={{ backgroundColor: Colors.grey }}
            snapPoints={snapPoints}
            style={styles.sheetContainer}>
            <View style={{ flex: 1 }}>
                <Listing listings={listing} category={category} />
                <View style={styles.absoluteBtn}>
                <TouchableOpacity onPress={showMap} style={styles.btn}>
                  <Text style={{fontFamily:'MonSb',color:'#fff'}}>Maps</Text>
                  <Ionicons name ='map' size={20} color={'#fff'}/>       
                </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>

    )
}

const styles = StyleSheet.create({
    absoluteBtn: {
       position:'absolute',
       bottom:30,
       width:'100%',
       alignItems:'center',
    },
    btn:{
      backgroundColor:Colors.dark,
      padding:16,
      height:50,
      flexDirection:'row',
     alignItems:'center',
     gap:5,
     borderRadius:30
    },
    sheetContainer:{
    backgroundColor:'#fff',
     borderRadius:20,
     elevation:4,
     shadowColor:'#000',
     shadowOpacity:0.3,
     shadowRadius:4,
     shadowOffset:{
        width:1,
        height:1
     }
    }
})
export default ListingBottomSheet