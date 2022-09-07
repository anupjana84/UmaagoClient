
import {
  StyleSheet, Text,
  FlatList, View,
  TouchableOpacity,
  Image,
  Dimensions

} from 'react-native';
import React, { useState } from 'react';
import { Card, Title, } from 'react-native-paper';
import { useSelector } from 'react-redux';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Image_url } from '../../Utils/BaseUrl';
const {width}= Dimensions.get('screen')

const Completed = () => {
  const { completed } = useSelector((state) => state.CampaignHistory)
  // console.log(JSON.stringify( completed.details),'gg')
  // console.log(completed, 'gg')
  const [cardHeight, sertCardHeight] = useState(true)


  const randerItem = ({ item, index }) => {
    //  console.log(cardHeight)
    //  console.log(index);
    return (
      <Card

        style={{
          padding: 20,
          marginHorizontal: 15,
          marginVertical: 7,
          backgroundColor: 'white',
          borderRadius: 20,
          
          // height: cardHeight === index ? '' : null
        }}>
        <TouchableOpacity
          onPress={() => {
            //  sertCardHeight(item.created_at.toString())
          }} style={{ width: "100%", height: 30, alignItems: 'flex-end' }}>
          <MaterialIcons name={cardHeight == index ? "keyboard-arrow-down" : "keyboard-arrow-up"} size={24} color="black" />
        </TouchableOpacity>
        <Title>Campaign #{item.id} </Title>
        <View style={styles.itemView}>
          <Text>Campaign Type </Text>
          <Text>{item.type.name}</Text>
        </View>

        <View style={styles.itemView}>
          <Text>Start Date </Text>
          <Text>{moment(item.from_date).format("DD-MM-YYYY")}</Text>
        </View>
        <View style={styles.itemView}>
          <Text>End Date </Text>
          <Text>{moment(item.to_date).format("DD-MM-YYYY")}</Text>
        </View>
        <View style={styles.itemView}>
          <Text>Trip Count </Text>
          <Text>{item.details.length}</Text>
        </View>
        <View style={{ width: '100%', paddingVertical: 5, flexDirection: "row", flexWrap: 'wrap' }}>
          {cardHeight  ? (
            <>
              {item.details && item.details.map((itemm, i) => {
                return (
                  <View View  key={i}>
                   <View  style={{...styles.itemView1, }} >
                      <Text>Trip ID #{itemm.id} </Text>
                      <Text>{moment(itemm.from_date).format('DD-MM-YYYY')}</Text>
                     

                    </View>
                  <View style={{
                   width:'100%',}}
                   >
                    {itemm.routemaps.map((iteem,ri)=>{
                      return(
                        <View key={ri}>
                        <View   style={styles.itemView}>
                        <Text>status </Text>
                        <Text>{iteem.status}</Text>
                       
  
                      </View>
                        <View  style={styles.itemView}>
                        <Text>Spent time </Text>
                        <Text>{iteem?.spent_time}</Text>
                       
  
                      </View>
                        <View  style={styles.itemView}>
                        <Text>Address</Text>
                        <Text>{iteem?.latitude}</Text>
                       
  
                      </View>
                        <View  style={styles.itemView}>
                        <Text>Address</Text>
                        <Text>{iteem?.longitude}</Text>
                       
  
                      </View>
                       
                      </View>
                      )
                    })}
                   
                    {itemm.photos && itemm.photos.map((itemmm, ii) => {
                      return (
                        <View
                        key={`${itemmm.id}`} style={{
                            width: '90%',
                          
                            marginVertical:5,
                            
                          }}>
                          <Image
                            style={{width:width-65, height: 150,
                              borderRadius: 8,
                             

                              resizeMode: "contain",
                            }}
                            source={{ uri: `${Image_url}/${itemmm.image}` }} />
                        </View>
                      )
                    })}
                  </View>
                </View>)
              })}
            </>) : null}
        </View>
      </Card>
    );
  }
  return (

    <View >
      <FlatList
        data={completed}
        renderItem={(item, i) => randerItem(item)

        }

        keyExtractor={(item, i) => i.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Title>No Data found</Title>
          </View>
        )}
      />


      {/* <TouchableOpacity
          onPress={() => alert('Submit Successfull')}
          style={styles.nextBottom}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
           Start Campaign
          </Text>
        </TouchableOpacity> */}
    </View>

  );
};

export default Completed;

const styles = StyleSheet.create({
  itemView: {
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemView1: {
    width: '100%',

    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  //next Bottom
  nextBottom: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#ff3259',
    borderRadius: 25,

    alignSelf: 'center',
    marginBottom: 50,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  emptyContainer: {
    width: '100%',
    height: 500,

    justifyContent: 'center',
    alignItems: 'center',
  },
  //next Bottom
});
