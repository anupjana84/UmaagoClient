import React, { useState, useEffect } from 'react';

import {
  ScrollView,
Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,

} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import { Picker } from '@react-native-picker/picker';

import { TextInput, HelperText, Card } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';

import {getAllState} from '../../Actions/AllState'
import { Base_url } from '../../Utils/BaseUrl';
import { alertMessage } from '../../Components/AlertMessage';
import FlashMessage from "react-native-flash-message";

import Feather from 'react-native-vector-icons/Feather';
import Loder from '../../Components/Loder';
import { connect, useDispatch, useSelector } from 'react-redux';


import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { getAllDistrict } from '../../Actions/AllDistrict';
import { getAllCity } from '../../Actions/AllCity';

const CampaignCreate = ({ navigation,getAllState,getAllDistrict,getAllCity }) => {
  const { data } = useSelector((state) => state.HomeData)
  const { state } = useSelector((state) => state.AllState)
  const { district } = useSelector((state) => state.AllDistrict)
   console.log(district,'district',);


  const [fromDate, setFromDate] = useState('');
  const [toDate, setTodate] = useState('');
  const [typeNote, setTypeNote] = useState('');
  const [areaName, setAreaName] = useState('');
  const [division, setDivision] = useState('');
  const [subDivision, setSubDivision] = useState('');
  const [lodding, setLodding] = React.useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [getState, setGetState] = useState([])
  const [city, setCity] = useState([])
  // const [district, setDistrict] = useState([])
  const [truckType, setTruckType] = React.useState('1');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleOne, setDatePickerVisibilityOne] = useState(false);

 
  //=============StartDate Picker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
     console.log(moment(date).format('MM-DD-YYYY'));
   setFromDate(moment(date).format('DD-MM-YYYY'))

    hideDatePicker();
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
    Keyboard.dismiss();
  };
  // =======StartDate Picker
  //=============End date Picker
  const hideDatePickerOne = () => {
    setDatePickerVisibilityOne(false);
  };
  const handleConfirmOne = date => {
     console.log(moment(date).format('MM-DD-YYYY'));
    setTodate(moment(date).format('DD-MM-YYYY'))

    hideDatePickerOne();
  };
  const showDatePickerOne = () => {
    setDatePickerVisibilityOne(true);
    Keyboard.dismiss();
  };
  // ======= end Date Picker
  const getdistAndTruck = () => {
    fetch(`${Base_url}/register`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
        }
      }
    )
      .then(res => {
        return res.json()
      }).then(result => {
        setGetState(result.states)

        //  console.log(result, 'RE')
        // console.log(result, 'RE')
      })
      .catch(err => console.log(err))
  }

  //=========
  const getDistrict = (id) => {
    // console.log(id);
     getAllDistrict(id)
    // console.log(id);
    // fetch(`${Base_url}/get-distric/${id}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       Accept: 'application/json',
    //       "Content-Type": "application/json",
    //     }
    //   }
    // )
    //   .then(res => {
    //     return res.json()
    //   }).then(result => {

    //     setDistrict(result.districs)
    //     // console.log(result, 'RE')
    //   })
    //   .catch(err => console.log(err))

  }
  //=========
  const changeCity = (id) => {
     console.log(id,'musr');
     getAllCity(id)
    //  setSelectedCity('')
    // fetch(`${Base_url}/get-city/${id}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       Accept: 'application/json',
    //       "Content-Type": "application/json",
    //     }
    //   }
    // )
    //   .then(res => {
    //     return res.json()
    //   }).then(result => {
    //     setCity(result.cities)
    //     console.log(result.cities, 'RE')
    //   })
    //   .catch(err => console.log(err))

  }
 
  const register = async () => {
    // console.log(
    //   fromDate,
    //   toDate,
    //   truckType,
    //   typeNote,
    //   division,
    //   subDivision,
    //   selectedState,
    //   selectedDistrict,
    //   selectedCity,

    //   areaName,);

    if (
      fromDate == '' ||
      toDate == '' ||
      truckType == '' ||
      
      

      selectedState == '' ||
      selectedDistrict == '' ||
      selectedCity == '' ||

      areaName == ''

    ) {
      alertMessage('All Field are Required', '#800000')
    }  else {
      setLodding(true)

      const dataOne = {
        from_date: fromDate,
        to_date: toDate,
        state_id: selectedState,
        distric_id: selectedDistrict,
        city_id: selectedCity,
        area_name_type: areaName,
        division:division,
        subdivision:subDivision,
        type_note:typeNote,
        type:truckType,
        
      
       
        
      
      }
      return await fetch(`${Base_url}/campaign/store`, {
        method: 'POST',
        body: JSON.stringify(dataOne),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(res => {

        return res.json()
      }).then(async (result) => {
        if (result?.error == true) {
          setLodding(false)
          alertMessage(result.error_messages[0], '#E07C24')
        } else {
          setFromDate('')
          setTodate('')
          setTruckType('')
          setTypeNote('')
          setSelectedState('')
          setSelectedDistrict('')
          setSelectedCity('')
          setDivision('')
          setSubDivision('')


          setAreaName('')


          alertMessage('Register Successfull', '#E07C24')
          setLodding(false)
         


        }

      }).catch(err => console.log(err));
    }
  }
  //========
  useEffect(() => {
    // console.log("first")
    getAllState()
    // getdistAndTruck()
  }, [])
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#ff3259"
          barStyle="default"
          hidden={false}
        />
        {/* =======Header=========== */}
        <View style={styles.headerview}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerMiddle}>
            <Text style={{ color: 'white', fontSize: 16 }}>Campaign Create</Text>
          </View>
          <View style={styles.headerLeft} />
        </View>
        <ScrollView nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
        >
          <Card
            style={{
              padding: 15,
              margin: 15,
              backgroundColor: 'white',
              borderRadius: 20,
            }}>
            <View style={{
              width: '100%', height: 50, flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <TextInput
                style={{
                  width: '48%', height: 50,
                  backgroundColor: 'white', fontSize: 18, paddingHorizontal: 0
                }}
                label="From Date"
                value={fromDate}
                activeUnderlineColor="#ff3259"
                onFocus={()=>showDatePicker()}
               right={
                  <TextInput.Icon
                    name={() => <Feather name={"calendar"} size={20} color="black" />}
                  />
                }
              />
              <TextInput
                style={{
                  width: '48%', height: 50,
                  backgroundColor: 'white', fontSize: 18, paddingHorizontal: 0
                }}
                label="To Date"
                
                value={toDate}
                activeUnderlineColor="#ff3259"
                onFocus={()=>showDatePickerOne()}
                right={
                  <TextInput.Icon
                    name={() => <Feather name={"calendar"} size={20} color="black" />}
                  />
                }
              />
            </View>
            
            {/* ==========state=========== */}
            <View style={styles.dropDownView}>
              <View style={styles.dropDownViewLeft}>
                <Text style={styles.inputStyle1}>State</Text>
              </View>
              <View style={styles.dropDownViewRight}>
                <View style={styles.pickerBoxInner}>
                  <Picker
                  mode={"dialog"}
                  
                   dropdownIconRippleColor={'#FFFFFF'}
                   dropdownIconColor={'#ffffff'}
                    selectedValue={selectedState}
                    style={styles.pickerStyle}
                    placeholder="Select your SIM"
                    onValueChange={(itemValue, itemIndex) => {
                      setSelectedState(itemValue)
                      getDistrict(itemValue)
                    }
                    }>
                      
                    { state && state.length>0 && state.map((item, i) => {
                      return (
                        <Picker.Item key={i} label={item.name} value={item.id} />
                      )
                    })}
                  </Picker>
                </View>
                <Entypo
                  name="chevron-down"
                  size={24}
                  color="black"
                  style={{ marginTop: '-10%', marginLeft:300 }}
                />
              </View>
            </View>
            {/* ==========state=========== */}
            {/* ==========District=========== */}
            <View style={styles.dropDownView}>
              <View style={styles.dropDownViewLeft}>
                <Text style={styles.inputStyle1}>District</Text>
              </View>
              <View style={styles.dropDownViewRight}>
                <View style={styles.pickerBoxInner}>
                  <Picker
                   mode={"dialog"}
                       dropdownIconRippleColor={'#FFFFFF'}
                    dropdownIconColor={'#FFFFFF'}
                    selectedValue={selectedDistrict}
                    style={styles.pickerStyle}
                    placeholder="Select your SIM"
                    onValueChange={(itemValue, itemIndex) => {
                      console.log(itemValue);
                      changeCity(itemValue)
                      setSelectedDistrict(itemValue)
                    }
                    }>
                       
                    {district && district.map((item, i) => {

                      return (
                        <Picker.Item key={i} label={item.name} value={item.id} />
                      )
                    })}
                  </Picker>
                </View>
                <Entypo
                  name="chevron-down"
                  size={24}
                  color="black"
                  style={{ marginTop: '-10%', marginLeft: 300 }}
                />
              </View>
            </View>
            {/* ========== District =========== */}
            {/* ============ city========= */}
            <View style={styles.dropDownView}>
              <View style={styles.dropDownViewLeft}>
                <Text style={styles.inputStyle1}>City</Text>
              </View>
              <View style={styles.dropDownViewRight}>
                <View style={styles.pickerBoxInner}>
                  <Picker
                   mode={"dialog"}
                    dropdownIconRippleColor={'#FFFFFF'}
                    dropdownIconColor={'#FFFFFF'}
                    selectedValue={selectedCity}
                    style={styles.pickerStyle}
                    placeholder="Select your SIM"
                    onValueChange={(itemValue, itemIndex) =>{
                      setSelectedCity(itemValue)
                      console.log("object");
                    }
                     
                    }>
                      
                    {city.map((item, i) => {
                      return (

                        <Picker.Item key={i} label={item.name} value={item.id} />
                      )
                    })}

                  </Picker>
                </View>
                <Entypo
                  name="chevron-down"
                  size={24}
                  color="black"
                  style={{ marginTop: '-10%', marginLeft: 300 }}
                />
              </View>
            </View>
            {/* ==========City=========== */}
            {/* ==========Division=========== */}

            {/* ==========Division=========== */}
            <TextInput
              style={styles.inputStyle}
              label="Area Name"
              value={areaName}
              activeUnderlineColor="#ff3259"
              onChangeText={text => setAreaName(text)}
            />
            <TextInput
              style={styles.inputStyle}
              label="Division"
              value={division}
              activeUnderlineColor="#ff3259"
              onChangeText={text => setDivision(text)}
            />
            <TextInput
              style={styles.inputStyle}
              label="Subdivision"
              value={subDivision}
              activeUnderlineColor="#ff3259"
              onChangeText={text => setSubDivision(text)}
            />

            <TextInput
              style={styles.inputStyle}
              label="Type Note(Optional)"
              value={typeNote}
              activeUnderlineColor="#ff3259"
              onChangeText={text => setTypeNote(text)}
            />

            {/* =========Redio Area======== */}
            <View style={{ width: '100%', height: 120, alignSelf: 'center' }}>
              <Text style={{ marginTop: 20, fontSize: 18, fontWeight: '700' }}>
                Campaign Type
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                  flexWrap:'wrap'
                  
                }}>
                {/* <View
                  style={{
                    width: '33.33%',
                    height: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <RadioButton
                    value="1"
                    theme={{ paddingLeft: -10 }}
                    color="#ff3259"
                    status={truckType === '1' ? 'checked' : 'unchecked'}
                    onPress={() => setTruckType('1')}
                  />
                  <Text>Toto</Text>
                </View> */}
                
                {Object.keys(data).length > 0 ?(data.types.map((item,i)=>{
                  return(
                    <View
                    key={i}
                  style={{
                   
                    width: '33.33%',
                    height: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <RadioButton
                    value="2"
                    color="#ff3259"
                    status={truckType === item.id ? 'checked' : 'unchecked'}
                    onPress={() => setTruckType(item.id)}
                  />
                  <Text>{item.name}</Text>
                </View>
                  )

                })):(null)}

              </View>
            </View>
            {/* =========Redio Area======== */}

          </Card>
          <TouchableOpacity
            onPress={() => register()}
            style={styles.nextBottom}>
            <Text style={{ color: '#ff3259', fontSize: 20, fontWeight: 'bold' }}>
              Submit
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* =======Header=========== */}

        <FlashMessage />
      </SafeAreaView>
      {lodding && <Loder lodding={lodding} />}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisibleOne}
        mode="date"
        onConfirm={handleConfirmOne}
        onCancel={hideDatePickerOne}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerview: {
    width: '100%',
    height: 50,
    backgroundColor: '#ff3259',
    flexDirection: 'row',
  },
  headerLeft: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  headerMiddle: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: { backgroundColor: 'white', fontSize: 18, paddingHorizontal: 0 },
  inputStyle1: { backgroundColor: 'white', fontSize: 18, marginLeft: 0 },
  ///========dropdown
  dropDownView: {
    width: '100%',
    height: 70,
    flexDirection: 'column',
    marginTop: 10,
  },
  dropDownViewLeft: {
    width: '100%',
    height: '50%',
  },
  dropDownViewRight: {
    width: '100%',
    height: '50%',
    borderColor: 'transpatent',
    borderBottomWidth: 1,

    borderBottomColor: '#cbcaca',
  },
  pickerItem: { width: 200, height: 40, borderWidth: 0.5 },
  ///========dropdown
  pickerBoxInner: {
    borderWidth: 0,
    borderColor: 'black',
    borderRadius: 2,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  pickerBoxIcon: {
    position: 'absolute',
    right: 0,
    fontSize: 23,
    color: 'red',
  },
  pickerStyle: {
    width: '120%',
    paddingBottom: 0,
    paddingLeft: 0,
    transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
    left: -38,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  //next Bottom
  nextBottom: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 2.2,
    borderColor: '#ff3259',
    alignSelf: 'center',
    marginBottom: 50,
    alignItems: 'center',
  },
  //next Bottom
  //imageUpload
  imageUpload: {
    width: '100%',
    height: 180,
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  //imageUpload

  //=====
  textFocus: {
    backgroundColor: 'transparent',
    borderColor: '#5d05d5',
  },
});

export default connect(null,{getAllState,getAllDistrict,
  getAllCity})(CampaignCreate)
