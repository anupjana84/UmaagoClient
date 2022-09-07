


import {
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  FlatList,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';

import React, { useState, useEffect } from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { Base_url } from '../../Utils/BaseUrl';
import moment from 'moment';

const { height, width } = Dimensions.get('screen');
// console.log(width);
const PaymentHistory = ({ navigation }) => {
  const [history, setHistory] = useState([])
  const [loding, setLoding] = useState([])
  const { token } = useSelector(state => state.user)
  const getPaymentHistory = () => {
    fetch(`${Base_url}/payment-history `,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      }
    )
      .then(res => {
        return res.json()
      }).then(result => {

        setHistory(result.payment_history)
      })
      .catch(err => console.log(err))

  }
  useEffect(() => {
    getPaymentHistory()
  }, [])
  const randerItem = ({ item }) => {
    return (
      <View style={styles.itemView}>
        <View style={{
          width: '20%', height: '100%',
          justifyContent: 'center', alignItems: 'center'
        }}>
          <View style={{
            width: 50, height: 50, backgroundColor: 'red',
            justifyContent: 'center', alignItems: 'center',
            borderRadius: 25
          }}>
            <Text style={{ color: 'white', fontSize: 30 }}>R</Text>
          </View>
        </View>
        <View style={{ width: '80%', height: '100%', flexDirection: 'row' }}>
          <View style={{ width: '80%', height: '100%', justifyContent: 'center' }}>
            <Text style={{fontWeight:'bold'}}>Anup Jana</Text>
            <Text>{moment(item.payment_date).format('DD/MM/YYYY')}</Text>
          </View>
          <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{fontWeight:'bold', fontSize:18, color:item.type=='1'?'green':'red'}}>{item.amount}</Text>
          </View>
        </View>
      </View>

    )
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <StatusBar
            animated={true}
            backgroundColor="#ff3259"
            barStyle="default"
            hidden={false}
          />
          {/* ======top======== */}
          <View
            style={{
              width: '100%',
              height: 60,
              backgroundColor: '#ff3259',
            }}>
            <View style={styles.topView}>
              <View style={styles.topViewLeft}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <AntDesign name="left" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.topViewMiddle}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
                  Payment History
                </Text>
              </View>
              <View style={styles.topViewLeft} />
            </View>
          </View>
          {/* ======top======== */}


          {/* ======top======== */}


          {/* ======Item======== */}
          <FlatList
            data={history}
            renderItem={(item, i) => randerItem(item)}
            keyExtractor={item => item.id}
          />

          {/* ======Item======== */}

        </View>
      </SafeAreaView>
    </>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  //itemView
  itemViewRight: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
  },
  itemViewLeft: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemView: {
    width: '94%',
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 8,
    alignSelf: 'center',

    borderLeftColor: '#ff3259',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    
    elevation: 14,
  },
  //itemView

  //topview
  topView1: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  topView: {
    width: '100%',
    height: 60,
    backgroundColor: '#ff3259',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topViewLeft: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  topViewMiddle: {
    width: '60%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topViewLower: {
    width: '100%',
    height: 150,
    backgroundColor: '#ff3259',
  },
});
