


import {
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';

const {height, width} = Dimensions.get('screen');
// console.log(width);
const PaymentHistory = ({navigation}) => {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
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
                <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
                Payment History
                </Text>
              </View>
              <View style={styles.topViewLeft} />
            </View>
          </View>
          {/* ======top======== */}

          
          {/* ======top======== */}
         
         
          {/* ======Item======== */}
          <View style={styles.itemView}>
            <View ></View>
          </View>
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
    backgroundColor: '#FCF4F7',
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 8,
    alignSelf: 'center',
   
    borderLeftColor: '#ff3259',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
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
