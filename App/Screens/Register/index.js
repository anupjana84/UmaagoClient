import React, { useState, useEffect } from 'react';

import {
  ScrollView,
 
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

import { RadioButton } from 'react-native-paper';
import { TextInput, HelperText, Card } from 'react-native-paper';
import CameraModal from '../../Components/CameraModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Base_url } from '../../Utils/BaseUrl';
import { alertMessage } from '../../Components/AlertMessage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Loder from '../../Components/Loder';

import StateModal from '../../Components/StateModal';
import DistrictModal from '../../Components/DistrictModal';
import CityModal from '../../Components/CityModal';
// import { USER_SET } from '../../Actions/ActionType/User';
// import AsyncStorage from '@react-native-async-storage/async-storage';


const Register = ({ navigation }) => {
  
 
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [truckNo, setTruckNo] = useState('');
  const [pan_no, setPan] = useState('');
  const [gst_no, setGst_no] = useState('');

  const [division, setDivision] = useState('');
  const [subDivision, setSubDivision] = useState('');
  const [areaName, setAreaName] = useState('');
  const [modalVisible, setModalVisible] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(true);
  const [lodding, setLodding] =useState(false);
  ///===
  const [selectedCityName, setSelectedCityName] = useState('');
  const [selectedStateName, setSelectedStateName] = useState('');
  const [selectedDistName, setSelectedDistName] = useState('');
  const [stateMVisible, setstateMVisible] = useState(false);
  const [distDMVisible, setDMVisible] = useState(false);
  const [cityMVisible, setCityVisible] = useState(false);
  ///===


  const [selectedState, setSelectedState] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [truckType, setTruckType] = React.useState('1');
  const [image, setImage] = useState(null);
  const [errMessagefn, seterrorMessagefn] = useState('')
  const [errMessageln, seterrorMessageln] = useState('')
  const [errMessagead, seterrorMessagead] = useState('')
  const [errMessageph, seterrorMessageph] = useState('')
  const [errMessagePass, seterrorMessagePass] = useState('')
  const [errMessagePa, seterrorMessagePa] = useState('')
  const [getState, setGetState] = useState([])
  const [city, setCity] = useState([])

  const [district, setDistrict] = useState([])
 


  
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

        // console.log(result.states, 'RE')
        // console.log(result, 'RE')
      })
      .catch(err => console.log(err))
  }

  //=========
  const getDistrict = (id) => {
    setSelectedCityName('')
    setSelectedDistName('')
    setSelectedDistrict('')
    setSelectedCity('')
    fetch(`${Base_url}/get-distric/${id}`,
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
        setDistrict(result.districs)
        // console.log(result, 'RE')
      })
      .catch(err => console.log(err))

  }
  //=========
  const changeCity = (id) => {
    // console.log(id);
    setSelectedCityName('')
    setSelectedCity('')
    fetch(`${Base_url}/get-city/${id}`,
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
        setCity(result.cities)
        // console.log(result, 'RE')
      })
      .catch(err => console.log(err))

  }
  //=========
  //=========
  const checkname = (name) => {
    let rjx = /^[a-zA-Z\s-, ]+$/;
    if (!rjx.test(name)) {
      seterrorMessagefn('please write name in valid format')
    } else {
      setFName(name)
      seterrorMessagefn('')
    }
  }
  //========
  const checkln = (name) => {
    let rjx = /^[a-zA-Z\s-, ]+$/;
    if (!rjx.test(name)) {
      seterrorMessageln('please write name in valid format')
    } else {
      setLName(name)
      seterrorMessageln('')
    }
  }
  //========
  const checkph = (pin) => {

    if (pin.length < 10) {
      seterrorMessageph('Ph No. must be 10 digits')
    } else {
      setPhone(pin)
      seterrorMessageph('')
    }
  }
  //======== CHECK MATCH
  const checkPassword = (pass) => {
    if (password !== pass) {
      seterrorMessagePass('Password does not match')
    } else {
      setCPassword(pass)
      seterrorMessagePass('')
    }
  }
  //========
  const checkPasswordlength = (pass) => {
    if (pass.length < 6) {
      seterrorMessagePa('Password must be greater than 6 char.')
    } else {
      setPassword(pass)
      seterrorMessagePa('')
    }
  }
  //========
  const checkad = (pin) => {
    if (pin.length < 16) {
      seterrorMessagead('Aadhaar No. must be 16 digits')
    } else {
      setAadhar(pin)
      seterrorMessagead('')
    }
  }
  //========
  const register = async () => {
    console.log(
       fName ,
       lName,
    phone ,
    password,
    cPassword ,
    aadhar ,
    pan_no ,
    gst_no,
    selectedState ,
    selectedDistrict ,
    selectedCity ,
    areaName ,);

    if (
      fName == '' ||
      lName == '' ||
      phone == '' ||
      password == '' ||
      gst_no == '' ||
      pan_no == '' ||
      cPassword == '' ||
      aadhar == '' ||

      selectedState == '' ||
      selectedDistrict == '' ||
      selectedCity == '' ||

      areaName == ''

    ) {
      alertMessage('All Field are Required', '#800000')
    } else if (phone.length > 10) {
      alertMessage('Ph No. must be 10 digits', '#E07C24')
    }
    else if (aadhar.length > 16) {
      alertMessage('Aadhaar No. must be 16 digits', '#E07C24')
    } else {
      setLodding(true)

      const dataOne = {
        first_name: fName,
        last_name: lName,
        phone_no: phone,
        aadhar_no: aadhar,
        pan_no: pan_no,
        gst_no: gst_no,
        password_confirmation: cPassword,

        password: password,
        aadhar_no: aadhar,
        state_id: selectedState,
        distric_id: selectedDistrict,
        city_id: selectedCity,
        area_name_type: areaName,

      }


      return await fetch(`${Base_url}/register-client`, {
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
          setFName('')
          setLName('')
          setPhone('')
          setPassword('')
          setCPassword('')
          setAadhar('')
          setGst_no('')
          setPan('')

          setSelectedState('')
          setSelectedDistrict('')
          setSelectedCity('')


          setAreaName('')


          alertMessage('Register Successfull', '#E07C24')
          setLodding(false)
          setTimeout(() => {
            navigation.navigate('Login')
          }, 1000);


        }

      }).catch(err => console.log(err));
    }
  }
  //========
  useEffect(() => {
    // console.log("first")
    getdistAndTruck()
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
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <AntDesign name="left" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerMiddle}>
            <Text style={{ color: 'white', fontSize: 16 }}>Register</Text>

          </View>
          <View style={styles.headerLeft} />
        </View>
        <ScrollView nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
        >
          <Card
            style={{
              padding: 20,
              margin: 20,
              backgroundColor: 'white',
              borderRadius: 20,
            }}>
            <TextInput
              style={{ ...styles.inputStyle }}
              label="First Name"
              theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
              placeholderTextColor="#000"
              activeUnderlineColor="#ff3259"
              onChangeText={text => checkname(text)}
            />
            {errMessagefn ? (<HelperText type="error" >
              {errMessagefn}
            </HelperText>) : (null)}
            <TextInput
              style={styles.inputStyle}
              label="Last Name"
              theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
              activeUnderlineColor="#ff3259"
              onChangeText={text => checkln(text)}
            />
            {errMessageln ? (<HelperText type="error" >
              {errMessageln}
            </HelperText>) : (null)}
            <TextInput
              style={styles.inputStyle}
              label="Phone Number"
              theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
              maxLength={10}
              keyboardType="numeric"
              activeUnderlineColor="#ff3259"
              onChangeText={text => checkph(text)}
            />
            {errMessageph ? (<HelperText type="error" >
              {errMessageph}
            </HelperText>) : (null)}

            <TextInput
              activeUnderlineColor="#ff3259"
              style={[styles.inputStyle]}
              label="Enter Password"
              theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"

              secureTextEntry={show}
              onChangeText={text => checkPasswordlength(text)}
              right={
                <TextInput.Icon
                  onPress={() => setShow(!show)}
                  name={() => <Ionicons name={!show ? "md-eye-outline" : 'md-eye-off-outline'} size={20} color="black" />}
                />
              }
            />
            {errMessagePa ? (<HelperText type="error" >
              {errMessagePa}
            </HelperText>) : (null)}
            <TextInput
              activeUnderlineColor="#ff3259"
              style={[styles.inputStyle]}
              label="Confirm Password"
              theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
              secureTextEntry={show1}
              onChangeText={text => checkPassword(text)}
              right={
                <TextInput.Icon
                  onPress={() => setShow1(!show1)}
                  name={() => <Ionicons name={!show1 ? "md-eye-outline" : 'md-eye-off-outline'} size={20} color="black" />}
                />
              }
            />
            {errMessagePass ? (<HelperText type="error" >
              {errMessagePass}
            </HelperText>) : (null)}

            <TextInput
              style={styles.inputStyle}
              label="Aadhaar Number"
              theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
              keyboardType="numeric"
              maxLength={16}
              activeUnderlineColor="#ff3259"
              onChangeText={text => checkad(text)}
            />
            {errMessagead ? (<HelperText type="error" >
              {errMessagead}
            </HelperText>) : (null)}
            <TextInput
              style={styles.inputStyle}
              label="Pan No"
              value={pan_no}
              theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
              activeUnderlineColor="#ff3259"
              onChangeText={text => setPan(text)}
            />
            <TextInput
              style={styles.inputStyle}
              label="GST No"
              value={gst_no}
              theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
              activeUnderlineColor="#ff3259"
              onChangeText={text => setGst_no(text)}
            />
            {/* ==========state=========== */}
            <TouchableOpacity
              onPress={() => setstateMVisible(true)} style={styles.drView}>
              <View style={styles.drUpper}>
                <Text style={{ fontSize: 20 }}>State</Text>
              </View>
              <View style={styles.drLower}>
                <Text>{selectedStateName}</Text>
                <Entypo
                  name="chevron-down"
                  size={24}
                  color="black"
                  style={{ marginRight: 8 }}
                />
              </View>
            </TouchableOpacity>
            {/* ==========state=========== */}
            {/* ==========District=========== */}
            <TouchableOpacity
              onPress={() => setDMVisible(true)} style={styles.drView}>
              <View style={styles.drUpper}>
                <Text style={{ fontSize: 20 }}>District</Text>
              </View>
              <View style={styles.drLower}>
                <Text>{selectedDistName}</Text>
                <Entypo
                  name="chevron-down"
                  size={24}
                  color="black"
                  style={{ marginRight: 8 }}
                />
              </View>
            </TouchableOpacity>
             {/* ============ city========= */}
            <TouchableOpacity
              onPress={() => setCityVisible(true)} style={styles.drView}>
              <View style={styles.drUpper}>
                <Text style={{ fontSize: 20 }}>City</Text>
              </View>
              <View style={styles.drLower}>
                <Text>{selectedCityName}</Text>
                <Entypo
                  name="chevron-down"
                  size={24}
                  color="black"
                  style={{ marginRight: 8 }}
                />
              </View>
            </TouchableOpacity>
            
           
            
            {/* ==========City=========== */}
            {/* ==========Division=========== */}

            {/* ==========Division=========== */}

            <TextInput
              style={styles.inputStyle}
              label="Division"
              theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
              value={division}
              activeUnderlineColor="#ff3259"
              onChangeText={text => setDivision(text)}
            />
            <TextInput
              style={styles.inputStyle}
              label="Subdivision"
              theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
              value={subDivision}
              activeUnderlineColor="#ff3259"
              onChangeText={text => setSubDivision(text)}
            />
            <TextInput
              style={styles.inputStyle}
              label="Area Name"
              theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
              value={areaName}
              activeUnderlineColor="#ff3259"
              onChangeText={text => setAreaName(text)}
            />
            
          </Card>
          <TouchableOpacity
            onPress={() => register()}
            style={styles.nextBottom}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              Save
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* =======Header=========== */}
      
        <StateModal
          getDistrict={getDistrict}
          setSelectedState={setSelectedState}
          setSelectedStateName={setSelectedStateName}
          stateMVisible={stateMVisible}
          setstateMVisible={setstateMVisible}
          getState={getState}
        />
        <DistrictModal
        changeCity={changeCity}
        setSelectedDistrict={setSelectedDistrict}
        setSelectedDistName={setSelectedDistName}
          setDMVisible={setDMVisible}
          distDMVisible={distDMVisible}
          district={district} />


        <CityModal
        setSelectedCity={setSelectedCity}
        setSelectedCityName={setSelectedCityName}
        city={city}
        cityMVisible={cityMVisible} 
        setCityMVisible={setCityVisible}
        />
      </SafeAreaView>
      {lodding && <Loder lodding={lodding} />}
    </>
  );
};

const styles = StyleSheet.create({
  drView: {
    width: '100%', height: 60,
    borderBottomColor: '#858081',
    borderBottomWidth: 0.9,
    marginVertical: 13,
  },
  drUpper: { width: '100%', height: '50%', },
  drLower: {
    width: '100%', height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
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
    
    backgroundColor:'#ff3259',
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

export default Register;
