
import {
  StyleSheet, Text,
  FlatList, View,
  TouchableOpacity,
  Image,
  Dimensions

} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Card, Title, } from 'react-native-paper';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import { Base_url } from '../../Utils/BaseUrl';
const { width } = Dimensions.get('screen')

const Running = ({navigation}) => {

  const [loding, setLoding] = useState(false)
  const [running, seRunning] = useState([])
  const { token } = useSelector(state => state.user)
  const [cardHeight, sertCardHeight] = useState(true)

  // console.log(running, 'run')
  const getData = async () => {
    fetch(`${Base_url}/running-campaigns`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      return res.json()
    })
      .then(response => {
        // console.log(response.data)
        if (response) {
          seRunning(response.data)
          setLoding(false)
        }

      })
      .catch(err => console.log(err))

  }


  useEffect(() => {
    setLoding(true)
    getData()

  }, [])


  const randerItem = ({ item, index }) => {
    //  console.log(cardHeight)
    //  console.log(index);
    return (
      <Card

        style={{
          padding: 20,
          marginHorizontal: 15,
          marginVertical: 15,
          backgroundColor: 'white',
          borderRadius: 20,

          // height: cardHeight === index ? '' : null
        }}>

     
        <View style={styles.itemView}>
        <Title style={{color:'black'}} >Campaign #{item.id} </Title>
        <Title style={{color:'black'}} >Trip ID #{item?.running_detail.id}</Title>
        </View>
        <View style={{marginTop:20}}>
        <Text style={{fontWeight:'bold'}}>From Location </Text>
       
          <View style={{flexDirection:'row', marginTop:5, alignItems:'center'}}>
        <Feather name="map-pin" size={15} color="black" />
        <Text style={{color:'black', marginLeft:5}}>{item?.running_detail?.from_location}</Text>
        </View>
        
        </View>
        <View style={{marginTop:20}}>
        <Text style={{fontWeight:'bold'}}>To Location </Text>
        <View style={{flexDirection:'row', marginTop:5, alignItems:'center'}}>
        <Feather name="map-pin" size={15} color="black" />
        <Text style={{color:'black', marginLeft:5}}>{item?.running_detail?.to_location}</Text>
        </View>
        </View>
        
       
        <View style={styles.itemView}>
          <Text>Campaign Date </Text>
          <Text>{item.from_date}</Text>
        </View>


        <View style={styles.itemView}>
          <Text>Assign Date </Text>
          <Text>{moment(item.created_at).format("DD-MM-YYYY")}</Text>
        </View>
        {item?.running_detail?.routemaps?.length>0?( 
        <TouchableOpacity
        onPress={()=>{
          navigation.navigate('RouteMapDetails',{map:item?.running_detail?.routemaps,photo:item?.running_detail?.photos})
        }}
        style={{width:'90%', height:40, backgroundColor:'#ff3259',
        marginTop:20,
        alignSelf:'center',
        borderRadius:25,
        justifyContent:'center', alignItems:'center'}}>
          <Text style={{color:'white', fontWeight:'900'}}>Route Map </Text>
          
        </TouchableOpacity>):null}
       
       
       

         {/* <View style={{ width: '100%', paddingVertical: 5, flexDirection: "row", flexWrap: 'wrap' }}>
          {cardHeight  ? (
            <>
              {item?.running_detail?.routemaps && item?.running_detail?.routemaps?.map((itemm, i) => {
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
        </View>  */}
      </Card>
    );
  }
  return (

    <View >
      <FlatList
        data={running}
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

export default Running;

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
