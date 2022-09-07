import React, { useState, useEffect } from 'react';

import {
  ScrollView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useColorScheme } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';



import { TextInput, HelperText, Card } from 'react-native-paper';


import { Base_url } from '../../Utils/BaseUrl';
import { alertMessage } from '../../Components/AlertMessage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Loder from '../../Components/Loder';
import { useDispatch, useSelector } from 'react-redux';
// import { USER_SET } from '../../Actions/ActionType/User';
// import AsyncStorage from '@react-native-async-storage/async-storage';


const ChangePassword = ({ navigation }) => {
  const { user } = useSelector(state => state.user)
  const { token } = useSelector(state => state.user)
  const scheme = useColorScheme();
  // console.log(user.phone_no);
  const dispatch = useDispatch()
  // console.log(user);



  const [password, setPassword] = React.useState('');
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [cPassword, setCPassword] = React.useState('');
  const [show, setShow] = React.useState(true);
  const [show1, setShow1] = React.useState(true);
  const [show2, setShow2] = React.useState(true);

  const [errMessagePass, seterrorMessagePass] = useState('')
  const [errMessagePa, seterrorMessagePa] = useState('')
  const [lodding, setLodding] = React.useState(false);

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

  const ChangePassword = async () => {
    if (
      password == '' ||
      cPassword == ''
    ) {
      alertMessage('All field Required', '#E07C24')
    } else {
      setLodding(true)
      const dataOne = {
        
        new_password: password,
        confirm_password: cPassword,
        phone_no:user.phone_no
      }
      return await fetch(`${Base_url}/resetPassword`, {
        method: 'POST',
        body: JSON.stringify(dataOne),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }).then(res => {
        // console.log(res,'red');
        return res.json()
      }).then(async (result) => {
        //  console.log(result)
        if (result?.error==true) {
          setLodding(false)
          alertMessage('Does not Match', '#E07C24')
        } else {
          setPassword('')
          setCPassword('')
         
          alertMessage('Change Password Successfully', '#E07C24')
          setLodding(false)
          setTimeout(() => {
            
            navigation.goBack()
          }, 15000);
          // console.log(result, 'rd')
        }
      }).catch(err => console.log(err));
    }
  }
  //========
  useEffect(() => {

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
            <Text style={{ color: 'white', fontSize: 16 }}>Change Password</Text>
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
              paddingBottom: 100
            }}>
             {/* <TextInput
              activeUnderlineColor="#ff3259"
              style={{ ...styles.inputStyle }}
              value={currentPassword}
              label="Current Password"
              theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"

              secureTextEntry={show2}
              onChangeText={text => setCurrentPassword(text)}
              right={
                <TextInput.Icon
                  onPress={() => setShow2(!show2)}
                  name={() => <Ionicons name={!show2 ? "md-eye-outline" : 'md-eye-off-outline'} size={20} color="black" />}
                />
              }
            />  */}
            <TextInput
              activeUnderlineColor="#ff3259"
              style={{ ...styles.inputStyle, marginTop: 30 }}
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
              style={{ ...styles.inputStyle, marginTop: 30 }}
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

          </Card>
          <TouchableOpacity
            onPress={() => ChangePassword()}
            style={styles.nextBottom}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              Save
            </Text>
          </TouchableOpacity>
        </ScrollView>



      </SafeAreaView>
      {lodding && <Loder lodding={lodding} />}
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
  inputStyle: {
    backgroundColor: 'white', fontSize: 18, paddingHorizontal: 0,
  },
  inputStyle1: { backgroundColor: 'white', fontSize: 18, marginLeft: 0 },
  ///========dropdown

  //next Bottom
  nextBottom: {
    width: '80%',
    height: 50,
    backgroundColor: "#ff3259",
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

  //imageUpload

  //=====
  textFocus: {
    backgroundColor: 'transparent',
    borderColor: '#5d05d5',
  },
});

export default ChangePassword;
