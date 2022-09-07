import {
  StyleSheet, Text,
  TouchableOpacity, ScrollView, Image, View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Card, Title } from 'react-native-paper';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { getAllCampaignHistory } from '../../Actions/CampaignHistory'
import { connect, useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Base_url } from '../../Utils/BaseUrl';
import { ALL_CAMPAIGN_HISTORY } from '../../Actions/ActionType/CampaignHistory';

const Running = ({ getAllCampaignHistory }) => {
  const [loding, setLoding] = useState(false)
  const {token}=useSelector(state=>state.user)
  const dispatch=useDispatch()

  const isFocused = useIsFocused()
  const { running } = useSelector((state) => state.CampaignHistory)

  // console.log(running, 'run')
  const getData= async()=>{
    fetch(`${Base_url}/home`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }).then(res=>{
          return res.json()
        })
        .then(response=>{
          if (response) {
              // console.log(response)
              setLoding(false)
              dispatch({
                  type:ALL_CAMPAIGN_HISTORY,
                 payload:{
                     data:response,
                    
                  }
              })
              
          }
         
        })
        .catch(err=>console.log(err))
    
  }


  useEffect(() => {
    setLoding(true)
    getData()
    // getAllCampaignHistory(setLoding)
  }, [isFocused])

  const navigation = useNavigation()
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        <View style={{ flex: 1 }}>


          {loding ? (
            <View style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={80} color={'#ff3259'} />
            </View>) : (
            <>
              {running == null ? (<>
                <View style={{
                  width: '100%', height: 600, justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Image source={require('../../Images/truck.png')}

                    style={{ width: 250, height: 250, resizeMode: 'contain' }}

                  />
                  <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 18 }}> You don't have running Campaign</Text>
                </View>


              </>
              ) : (
                <>
                  <Card
                    style={{
                      padding: 20,
                      margin: 20,
                      backgroundColor: 'white',
                      borderRadius: 20,
                    }}>



                    <View style={styles.itemView}>

                      <Title>Campaign #{running?.id}</Title>
                      <Title>Trip #{running?.running_detail?.id}</Title>
                    </View>
                   
                    <View style={{
                      width: "100%",
                      paddingVertical:7,
                    }}>
                     <Text style={{marginTop:5, fontSize:18, fontWeight:'bold'}}>From Location </Text>
                      <Text style={{marginTop:10,}}>{running?.running_detail?.from_location}</Text>
                    </View>
                    <View style={{
                      width: "100%",
                      paddingVertical:7,
                    }}>
                     <Text style={{marginTop:5, fontSize:18, fontWeight:'bold'}}>To Location </Text>
                      <Text style={{marginTop:10}}>{running?.running_detail?.to_location}</Text>
                    </View>


                    <View style={styles.itemView}>
                      <Text>Campaign Type</Text>
                      <Text>{running?.type?.name}</Text>
                    </View>

                    <View style={styles.itemView}>
                      <Text>Campaign Date </Text>
                      <Text>{moment(running?.running_detail?.from_date).format('DD-MM-YY')}</Text>
                    </View>

                    <View style={styles.itemView}>
                      <Text>Assign Date </Text>
                      <Text>{moment(running?.running_detail?.created_at).format('DD-MM-YY')}</Text>

                    </View>


                  </Card>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('RouteMap')}
                    style={styles.nextBottom}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
                      Start Campaign
                    </Text>
                  </TouchableOpacity>
                </>
              )}

            </>

          )
          }




        </View>

      </ScrollView>
    </>
  );
};

export default connect(null, { getAllCampaignHistory })(Running);

const styles = StyleSheet.create({
  //Image View
  imageView: {
    width: '100%', height: 100, flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageViewLeft: {
    width: '48%',
    height: '100%',

    borderRadius: 8,
    padding: 2

  },
  imageViewRight: {
    width: '48%',
    height: '100%',
    borderRadius: 8,
    padding: 2
  },
  //Image View
  itemView: {
    width: '100%',
    height: 40,
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
  }
  //next Bottom
});
