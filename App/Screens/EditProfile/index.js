import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ScrollView,

  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  
} from 'react-native';
import { useColorScheme } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import { TextInput, HelperText, Card } from 'react-native-paper';
import CameraModal from '../../Components/CameraModal';

import { Base_url } from '../../Utils/BaseUrl';
import { alertMessage } from '../../Components/AlertMessage';


import Loder from '../../Components/Loder';
import { useDispatch, useSelector } from 'react-redux';
 import { USER_SET } from '../../Actions/ActionType/User';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import StateModal from '../../Components/StateModal';
import DistrictModal from '../../Components/DistrictModal';
import CityModal from '../../Components/CityModal';

const EditProfile = ({ navigation }) => {
  const {user}=useSelector(state=>state.user)
  const {token}=useSelector(state=>state.user)
//  console.log(token,'tt',user);
  
  const dispatch =useDispatch()
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [registration_no, setRegistration_no] = useState('');

  const [division, setDivision] = useState('');
  const [subDivision, setSubDivision] = useState('');
  const [areaName, setAreaName] = useState('');

  const [panNo, setPanNo] = React.useState('');
  const [gstNo, setGstNo] = React.useState('');
  const [password, setPassword] = React.useState('');
 
  const [lodding, setLodding] = React.useState(false);


  const [selectedState, setSelectedState] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [truckType, setTruckType] = React.useState('1');

  const [errMessagefn, seterrorMessagefn] = useState('')
  const [errMessageln, seterrorMessageln] = useState('')
  const [errMessagead, seterrorMessagead] = useState('')
  const [errMessageph, seterrorMessageph] = useState('')

  const [getState, setGetState] = useState([])
  const [city, setCity] = useState([])
///===
const [selectedCityName, setSelectedCityName] = useState('');
const [selectedStateName, setSelectedStateName] = useState('');
const [selectedDistName, setSelectedDistName] = useState('');
const [stateMVisible, setstateMVisible] = useState(false);
const [distDMVisible, setDMVisible] = useState(false);
const [cityMVisible, setCityVisible] = useState(false);
///===
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
        
        //  console.log(result.states, 'RE')
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
    // console.log(id);
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
        console.log(result, 'RE')
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
  const checkPassword=(pass)=>{
if (password !== pass) {
  seterrorMessagePass('Password does not match')
}else{
  setCPassword(pass)
  seterrorMessagePass('')
}
  }
  //========
  const checkPasswordlength=(pass)=>{
if (pass.length<6) {
  seterrorMessagePa('Password must be greater than 6 char.')
}else{
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
  const save=()=>{
    const first_name=fName?fName:user.first_name;
    const last_name=lName?lName:user.last_name;
    const phone_no=phone?phone:user.phone_no;
    const aadhar_no =aadhar?aadhar:user.aadhar_no;
    const regiNo =registration_no?registration_no:user.registration_no;
    const state_id =selectedState?selectedState:user.state_id;
    const distric_id =selectedDistrict?selectedDistrict:user.distric_id;
    const city_id =selectedCity?selectedCity:user.city_id;
    const divisionn =division?division:user.division;
    const subdivision =subDivision?subDivision:user.subdivision;
    const area_name_type =areaName?areaName:user.area_name_type;
    const trucktype =truckType?truckType:user.type;
  }
  const register =  async () => {
   
    const first_name=fName?fName:user.first_name;
    const last_name=lName?lName:user.last_name;
    const phone_no=phone?phone:user.phone_no;
    const aadhar_no =aadhar?aadhar:user.aadhar_no;
    
    const state_id =selectedState?selectedState:user.state_id;
    const distric_id =selectedDistrict?selectedDistrict:user.distric_id;
    const city_id =selectedCity?selectedCity:user.city_id;
    const division =division?division:user.division;
    const subdivision =subDivision?subDivision:user.subdivision;
    const area_name_type =areaName?areaName:user.area_name_type;
    const pan_no =truckType?truckType:user.pan_no;
    const gst_no =truckType?truckType:user.gst_no;
    if (
      first_name == ''||
      last_name == ''
      // phone == '' ||
      // password == '' ||
      // cPassword == '' ||
      // aadhar == '' ||
      // truckNo == '' ||
      // selectedState == '' ||
      // selectedDistrict == '' ||
      // selectedCity == '' ||
      // truckType == '' ||
      // division == '' ||
      // subDivision == '' ||
      // areaName == '' 

    ) {
      alertMessage('All Field are Required', '#800000')
    } else if (phone.length > 10) {
      alertMessage('Ph No. must be 10 digits', '#E07C24')
    }
    else if (aadhar.length > 16) {
      alertMessage('Aadhaar No. must be 16 digits', '#E07C24')
    } else {
      setLodding(true)
     
     
      return await  fetch(`${Base_url}/updateProfile`, {
        method: 'POST',
        body: JSON.stringify({
          first_name:first_name,
          last_name:last_name,
          phone_no:phone_no,
          aadhar_no:aadhar_no,
          pan_no:pan_no,
          gst_no:gst_no,
          state_id:state_id,
          distric_id:distric_id,
          city_id:city_id,
         


        }),
        headers: {
          Accept  : 'application/json',
           'Content-Type' : 'application/json',
          'Authorization': `Bearer ${token}`
          // Accept  : 'application/json',
          // 'Content-Type' : 'application/json'

        },
      }).then(res => {
        // console.log(res,'red');
        return res.json()
      }).then( async (result) => {
        // console.log(result.user,'rult')
        if (result?.error==true) {

          setLodding(false)
          alertMessage(result.error_messages[0], '#E07C24')
        }else{
         
          setFName('')
          setLName('')
          setPhone('')
         
          setAadhar('')
          setPanNo('')
          setGstNo('')
    
          setSelectedState('')
          setSelectedDistrict('')
          setSelectedCity('')
          
          setDivision('')
          setSubDivision('')
          setAreaName('')
          setTruckType('')
          // setImage('') 
          await AsyncStorage.removeItem('@user')
        await AsyncStorage.setItem('@user',JSON.stringify(result.user))
        dispatch({
          type:USER_SET,
          payload:{
            data:result.user,
            token:token
          }
        })
        alertMessage('Upadate Successfull', '#38CC77')
        setLodding(false)
       
       
        // console.log(result, 'rd')
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={16} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerMiddle}>
          <Text style={{ color: 'white', fontSize: 16 }}>Edit Profile</Text>
          
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
            style={{...styles.inputStyle}}
            label="First Name"
            placeholder={user.first_name}
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
            placeholder={user.last_name}
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
            placeholder={user.phone_no}
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
            style={styles.inputStyle}
            label="Aadhaar Number"
            placeholder={user.aadhar_no}
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
            label="PAN Number"
            placeholder={user?.pan_no}
            theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
            value={panNo}
            activeUnderlineColor="#ff3259"
            onChangeText={text => setPanNo(text)}
          />
          <TextInput
            style={styles.inputStyle}
            label="GST Number"
            placeholder={user?.gst_no}
            theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
            value={gstNo}
            activeUnderlineColor="#ff3259"
            onChangeText={text => setGstNo(text)}
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

          {/* <TextInput
            style={styles.inputStyle}
            label="Division"
            theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
            value={division}
            placeholder={user?.division}
            activeUnderlineColor="#ff3259"
            onChangeText={text => setDivision(text)}
          />
          <TextInput
            style={styles.inputStyle}
            label="Subdivision"
            placeholder={user?.subdivision}
            theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
            value={subDivision}
            activeUnderlineColor="#ff3259"
            onChangeText={text => setSubDivision(text)}
          /> */}
          <TextInput
            style={styles.inputStyle}
            label="Area Name"
            placeholder={user?.area_name_type}
            theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
            
            activeUnderlineColor="#ff3259"
            onChangeText={text => setAreaName(text)}
          />
          
        </Card>
        <TouchableOpacity
          onPress={() => register()}
          style={styles.nextBottom}>
          <Text style={{ color: '#ff3259', fontSize: 20, fontWeight: 'bold' }}>
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
   {lodding && <Loder lodding={lodding}/>}  
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

export default EditProfile;
