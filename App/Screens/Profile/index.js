import {
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  BackHandler,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useRoute, useFocusEffect} from '@react-navigation/native';
// import Axios from 'axios'
import React,{useRef, useEffect} from 'react';
import {Title} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const {height, width} = Dimensions.get('screen');
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import {Base_url, Image_url } from '../../Utils/BaseUrl';
import CameraModal from '../../Components/CameraModal';
import { PROFILE_IAMGE } from '../../Actions/ActionType/ProfileImage/index';
import Loder from '../../Components/Loder';
import { alertMessage } from '../../Components/AlertMessage';
import { useIsFocused } from '@react-navigation/native';


const Profile = ({navigation}) => {
  const route = useRoute();
  const {user}=useSelector(state=>state.user)
  const {token}=useSelector(state=>state.user)
  const {profileImage}=useSelector(state=>state.ProfileImage)
  const dispatch=useDispatch()
    // console.log(profileImage,'red')
  const isFocused=useIsFocused()



  const [modalVisible, setModalVisible] = React.useState(false);
  const [lodding, setLodding] = React.useState(false);
  const options = {
    title: ' Choose Image ',
    takePhotoButtonTitle: 'From camera',
    ChooseFromLibraryButtonTitle: 'From Library',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const pickCamera = async () => {
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        setModalVisible(false)
        console.log('User cancelled image picker');
      } else if (response.error) {
        setModalVisible(false)
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        setModalVisible(false)
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // console.log(response.fileName, 'hh', response.path, response.type)

        // setImage(response);
        // console.log(response.uri, response.fileName, response.type);
        save(response.assets[0])
        setModalVisible(false)
      }
    });
  };
  const pickImageLibrary= async () => {
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        setModalVisible(false)
        console.log('User cancelled image picker');
      } else if (response.error) {
        setModalVisible(false)
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        setModalVisible(false)
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // console.log(response);
        save(response.assets[0])
        setModalVisible(false)
      }
    });
  };
 const handleBackButton = () => {               
    Alert.alert(
        'Exit App',
        'Exiting the application?', [{
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
        }, {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
        }, ], {
            cancelable: false
        }
     )
     return true;
   }
const geImage= async()=>{ 
  // const tt= await AsyncStorage.getItem('@token')
  // console.log(tt);
  // console.log(token);



  fetch(`${Base_url}/profileImage`, {
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
        //  console.log(response,'rea')
        if (response) {
              
          dispatch({
            type:PROFILE_IAMGE,
            payload:{
              data:response
            }
          })
      }
        
    }
   
  })
  .catch(err=>console.log(err))
  // Axios.get(`${Base_url}/profileImage`)
  //     .then(response => {
          
  //       // console.log(response.data)
  //         if (response.data) {
              
  //             dispatch({
  //               type:PROFILE_IAMGE,
  //               payload:{
  //                 data:response.data
  //               }
  //             })
  //         }
  //         // console.log(response.data,'ddd')
  //     })
  //     .catch(error => {
  //         console.log(error)
  //     })
}




   const save = async (image) => {
    let formData = new FormData();
    setLodding(true)
    let localUri = image.uri;
    let filename = image.fileName;
    let type = image.type;
    formData.append('image', { uri: localUri, name: filename, type });

     fetch(`${Base_url}/updateProfileImage`, {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
       'Authorization': `Bearer ${token}`
      },
    }).then(res => {
      return res.json()
    }).then(  (result) => {
      //  console.log(result,'yyy')
      if (result?.error==true) {
        setLodding(false)
        alertMessage('Not Save', '#A77B06')
      }
      else {
        setLodding(false)
        dispatch({
          type:PROFILE_IAMGE,
          payload:{
            data:result.user.image
          }
        })  
         geImage()
      }
      //console.log(result)
    })
    .catch(err=>console.log(err))
  };

//=====
// useFocusEffect(
//   React.useCallback(() => {
//     const onBackPress = () => {
//       if (route.name === 'Profile') {
//         return true;
//       } else {
//         return false;
//       }
//     };

//     BackHandler.addEventListener('hardwareBackPress', onBackPress);

//     return () =>
//       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//   }, [route]),
// );
//=====

  useEffect(() => {
     geImage()
  }, [])
 
   useEffect(() => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButton,
      );
    };
   }, [])
 
   const logout= async()=>{
    await AsyncStorage.removeItem('@user')
    await AsyncStorage.removeItem('@token')
    navigation.navigate('Home')
   }
   
  return (
    <>
   
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#ff3259"
          barStyle="default"
          hidden={false}
        />
        <View
          style={{
            width: '100%',
            height: 200,
            backgroundColor: '#ff3259',
          }}>
          <View style={styles.topView}>
            <View style={styles.topViewLeft}>
              <TouchableOpacity onPress={()=>navigation.goBack()} >
                <AntDesign name="left" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.topViewMiddle}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
                Profile
              </Text>
            </View>
            <View style={styles.topViewLeft} />
          </View>
        </View>
         {/* ==========one part====== */}
        <View
          style={{
            height: height - 210,
            width: width - 50,
            backgroundColor: 'white',
            borderRadius: 20,
            left: 25,

            top: 120,
            alignItems: 'center',
            position: 'absolute',
            zIndex: 10,
          }}>
          <View
            style={{
              width: '100%',
              height: 140,
              paddingBottom: 15,
              justifyContent: 'flex-end',
            }}>
            <Title
              style={{textAlign: 'center', fontSize: 22, fontWeight: 'bold'}}>
            {user.first_name} {user.last_name}
            </Title>
          </View>
          <View style={{width: '100%', paddingHorizontal: 10}}>
            {/* =========Item ========= */}
            <View style={styles.itemView}>
              <View style={styles.itemViewLeft}>
                <LinearGradient
                  colors={['#FFA68D', '#FD3A84']}
                  start={{x: 0.0, y: 0.0}}
                  end={{x: 0.0, y: 1.0}}
                  style={styles.CircleShapeView}>
                  <SimpleLineIcons name="pencil" size={24} color="white" />
                </LinearGradient>
              </View>
              <View style={styles.itemViewRight}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EditProfile');
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#ff3259',
                    }}>
                    Edit Profile
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* =========Item ========= */}
            <View style={styles.itemView}>
              <View style={styles.itemViewLeft}>
                <LinearGradient
                  colors={['#FFA68D', '#FD3A84']}
                  start={{x: 0.0, y: 0.0}}
                  end={{x: 0.0, y: 1.0}}
                  style={styles.CircleShapeView}>
                  <FontAwesome name="volume-up" size={24} color="white" />
                </LinearGradient>
              </View>
              <View style={styles.itemViewRight}>
              <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Campaign');
                  }}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: '#ff3259'}}>
                  Campaign 
                </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* =========Item ========= */}
            {/* =========Item ========= */}
            <View style={styles.itemView}>
              <View style={styles.itemViewLeft}>
                <LinearGradient
                  colors={['#FFA68D', '#FD3A84']}
                  start={{x: 0.0, y: 0.0}}
                  end={{x: 0.0, y: 1.0}}
                  style={styles.CircleShapeView}>
                 <AntDesign name="setting" size={24} color="white" />
                </LinearGradient>
              </View>
              <View style={styles.itemViewRight}>
              <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate('ServiceHistory');
                  }}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: '#ff3259'}}>
                  Service History
                </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* =========Item ========= */}
            {/* =========Item ========= */}
            <View style={styles.itemView}>
              <View style={styles.itemViewLeft}>
                <LinearGradient
                  colors={['#FFA68D', '#FD3A84']}
                  start={{x: 0.0, y: 0.0}}
                  end={{x: 0.0, y: 1.0}}
                  style={styles.CircleShapeView}>
                 <AntDesign name="setting" size={24} color="white" />
                </LinearGradient>
              </View>
              <View style={styles.itemViewRight}>
              <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('PaymentHistory');
                  }}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: '#ff3259'}}>
                  Payment History
                </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* =========Item ========= */}
            <View style={styles.itemView}>
              <View style={styles.itemViewLeft}>
                <LinearGradient
                  colors={['#FFA68D', '#FD3A84']}
                  start={{x: 0.0, y: 0.0}}
                  end={{x: 0.0, y: 1.0}}
                  style={styles.CircleShapeView}>
                  <AntDesign name="setting" size={24} color="white" />
                </LinearGradient>
              </View>
              <View style={styles.itemViewRight}>
              <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ChangePassword');
                  }}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: '#ff3259'}}>
                  Change Password{}
                </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* =========Item ========= */}
            {/* =========Item ========= */}
            {/* <View style={styles.itemView}>
              <View style={styles.itemViewLeft}>
                <LinearGradient
                  colors={['#FFA68D', '#FD3A84']}
                  start={{x: 0.0, y: 0.0}}
                  end={{x: 0.0, y: 1.0}}
                  style={styles.CircleShapeView}>
                  <AntDesign name="setting" size={24} color="white" />
                </LinearGradient>
              </View>
              <View style={styles.itemViewRight}>
              <TouchableOpacity
                  onPress={() => {
                   logout()
                  }}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: '#ff3259'}}>
                 Logout
                </Text>
                </TouchableOpacity>
              </View>
            </View> */}
            {/* =========Item ========= */}
            {/* =========Item ========= */}
          </View>
        </View>
        {/* ==========one part====== */}
        <View
          style={{
            height: 150,
            width: 150,
            backgroundColor: 'white',
            borderRadius: 75,

            left: width / 2 - 75,
            top: 65,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 122,
          }}>
          <View
            style={{
              width: 144,
              height: 144,
              borderRadius: 72,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
               {profileImage?.profileImage==null?(
            <Image
              source={require('../../Images/user2.png')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                borderRadius: 72,
              }}
            />
            ):( <Image
              source={{uri:`${Image_url}/${profileImage.profileImage}`}}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                borderRadius: 72,
              }}
            />)} 
          </View>
          <TouchableOpacity onPress={()=>{
           setModalVisible(true)
          }}>
            <LinearGradient
              colors={['#FFA68D', '#FD3A84']}
              start={{x: 0.0, y: 0.0}}
              end={{x: 0.0, y: 1.0}}
              style={{
                width: 50,
                height: 50,
                backgroundColor: 'green',
                left: 30,
                top: -50,
                justifyContent: 'center',
                position: 'absolute',
                zIndex: 500000,
                alignItems: 'center',
                borderRadius: 50,
              }}>
               <SimpleLineIcons name="pencil" size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
       
        </View>
      </SafeAreaView>
      {/* <BottomSheetView bottomSheetRef={bottomSheetRef}/> */}
      <CameraModal
        pickImageLibrary={pickImageLibrary}
        pickCamera={pickCamera}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {lodding && <Loder lodding={lodding}/>}  
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  //itemView
  itemViewRight: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
  },
  itemViewLeft: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemView: {
    width: '100%',
    height: 55,
    backgroundColor: '#FCF4F7',
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 8,
  },
  //itemView

  //topview
  topView: {
    width: '100%',
    height: 70,
    backgroundColor: '#ff3259',
    flexDirection: 'row',
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
  //gradiant
  CircleShapeView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
