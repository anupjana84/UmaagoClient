import React, { useState, useEffect } from 'react';

import Axios from 'axios'
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { TextInput,  Card, Title } from 'react-native-paper';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Base_url } from '../../Utils/BaseUrl';
import { alertMessage } from '../../Components/AlertMessage';
import FlashMessage from "react-native-flash-message";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loder from '../../Components/Loder';

import AsyncStorage from '@react-native-async-storage/async-storage';
import shortid from 'shortid';
import CameraModal from '../../Components/CameraModal';



const ServiceCreate = ({ navigation }) => {

  const [lodding, setLodding] = useState(false)
  const [getServiceTypeData, setGetServiceTypeData] = useState([])
  const [modalVisible, setModalVisible] = useState(false);

  const [listOfSeasons, setListOfSeasons] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [matter, setMatter] = useState('');
  const [serveType, setServiceType] = useState('');


  //=============color change 
  const actiText = id => {
    //  console.log(id)
    // console.log(getServiceTypeData);
    let listData = getServiceTypeData.map(item => {
      let itm = { ...item, isActive: false };
      return itm;
    });
    // console.log(listData);

    listData[id].isActive = true;
    // console.log(listData[id]);
    setGetServiceTypeData(listData);
  };
  //=============Multiple Image 
  const addToList = async (item1, item2, item3) => {
    // console.log(item1, 'item1', item2, 'item2', item3);
    try {
      const seasonToAdd = {
        id: shortid.generate(),
        imguri: item1,
        imgfilename: item2,
        imgtype: item3,
      };
      const storedValue = await AsyncStorage.getItem('@season_list');
      const prevList = await JSON.parse(storedValue);
      // console.log(typeof prevList)
      if (!prevList) {
        const newList = [seasonToAdd];

        await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
        getList();
      } else {
        console.log(prevList.length);
        if (prevList.length >= 6) {
          alert('Max 6 Images')
        } else {

          prevList.push(seasonToAdd);
          await AsyncStorage.setItem('@season_list', JSON.stringify(prevList));
          getList();
        }

      }
    } catch (error) {
      console.log(error);
    }
  };
  const getList = async () => {
    const storedValue = await AsyncStorage.getItem('@season_list');
    if (!storedValue) {
      setListOfSeasons([]);
    }
    const list = JSON.parse(storedValue);
    setListOfSeasons(list);
  };

  const deleteSeason = async id => {
    const newList = await listOfSeasons.filter(list => list.id !== id);
    await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
    setListOfSeasons(newList);
  };
  //=============Multiple Image
  //========
  const options = {
    title: ' Choose Image ',
    takePhotoButtonTitle: 'From camera',
    ChooseFromLibraryButtonTitle: 'From Library',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  //======


  //======
  const pickCamera = async () => {
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // console.log(response.fileName, 'hh', response.path, response.type)
        // console.log(response.assets[0].uri,'pp')
        // setImage(response.assets[0]);
        addToList(response.assets[0].uri, response.assets[0].fileName, response.assets[0].type);
        // console.log(response.uri, response.fileName, response.type);
      }
    });
  };

  const pickImageLibrary = async () => {
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response);
        addToList(response.assets[0].uri, response.assets[0].fileName, response.assets[0].type);
      }
    });
  };
  //========
  const allSerives = () => {
    Axios.get(`${Base_url}/services`)
      .then(response => {
        //  console.log(response.data.sliders,'r')
        if (response.data) {
          console.log(response.data)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  //========
  const getServiceType = () => {
    Axios.get(`${Base_url}/service-types`)
      .then(response => {
        //  console.log(response.data.sliders,'r')
        if (response.data) {
          const data = response.data.service_types.map((item, i) => {
            return { ...item, isActive: false }
          })
          setGetServiceTypeData(data)
          // console.log(response.data)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  //=====SAVE
  const save = async () => {

    console.log(serveType)

    const user = JSON.parse(await AsyncStorage.getItem('@user'));
    console.log(user.access_token)
    let formData = new FormData();
    const storedValue = JSON.parse(await AsyncStorage.getItem('@season_list'));
    if (
      serveType == '' ||
      quantity == null
    ) {
      alertMessage('Service Type & Quantity Required', '#0D0D0D');
    } else {
      setLodding(true);
      if (storedValue && storedValue.length > 0) {
        storedValue.map((item, i) => {
          const imagdata = {
            uri: item.imguri,
            name: item.imgfilename,
            type: item.imgtype,
          };
          formData.append('image[]', imagdata);
        });
      } else {
        formData.append('image[]', null);
      }

      formData.append('service_type_id', serveType);
      formData.append('quantity', quantity);
      formData.append('Upload_matter', matter);

      console.log(formData);
      return await fetch(`${Base_url}/store-services`, {
        method: 'POST',
        body: formData,
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${user.access_token}`
        },
      }).then(res => {
        return res.json()
      }).then(async (result) => {
        console.log(result);
        if (result?.error == true) {
          setLodding(false)
          alertMessage(result.error_messages[0], '#E07C24')
        } else {
          setLodding(false)
          await AsyncStorage.removeItem('@season_list')
          getList()
          setMatter('')
          setQuantity('')
          setServiceType('')
          alertMessage('Save Successfully', '#4DD637')
        }
        // }
      }).catch(err => console.log(err));
    }
  };
  useEffect(() => {
    getServiceType()
    // allSerives()
    getList();
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
            <Text style={{ color: 'white', fontSize: 16 }}>Service
              Request</Text>
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

            {/* ==========serVice Type======== */}
            <Title style={{ marginVertical: 10 }}>Service Type</Title>
            <View style={{
              width: "100%",
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}>
              {getServiceTypeData && getServiceTypeData.map((item, i) => {
                // console.log(item.isActive);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      actiText(i)
                      setServiceType(item.id)
                    }} key={i} style={{
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 25,
                      marginBottom: 20,
                      marginRight: 5,
                      borderWidth: item.isActive ? 0 : 1,
                      borderColor: item.isActive ? '' : 'black',
                      backgroundColor: item.isActive ? '#ff3259' : null,
                    }}>
                    <Text style={{
                      color: item.isActive ? 'white' : 'black',

                    }}>{item.name}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
            {/* ==========serVice Type======== */}
            <TextInput
              activeUnderlineColor="#ff3259"
              style={[styles.inputStyle]}
              label="Quantity"
              value={quantity}
              keyboardType="numeric"
              onChangeText={text => setQuantity(text)}
            />
            <TextInput
              style={styles.inputStyle}
              label="Upload Matter"
              value={matter}
              activeUnderlineColor="#ff3259"
              onChangeText={text => setMatter(text)}
            />
            {/* =========Photo Area======== */}
            <Text style={{ fontWeight: '900', fontSize: 16, marginVertical: 15 }}>
              Upload Image
            </Text>
            <View style={styles.imageUpload}>
              <View style={{
                height: 200, width: "100%",
                flexDirection: 'row', flexWrap: 'wrap',
                justifyContent: 'flex-start',
                paddingVertical: 10
              }}>

                {listOfSeasons &&
                  listOfSeasons.map((item, i) => {
                    return (
                      <View
                        key={i}
                        style={{
                          width: '30%', height: 70,
                          borderRadius: 10,
                          marginVertical: 8,
                          borderColor: 'black',
                          backgroundColor: 'white',
                          marginLeft: 10
                        }}>
                        <ImageBackground
                          source={{ uri: item.imguri }}
                          imageStyle={{ borderRadius: 10 }}
                          style={{ width: '100%', height: '100%' }}
                          resizeMode="cover">
                          <TouchableOpacity
                            onPress={() => deleteSeason(item.id)}
                            style={{
                              width: '100%',
                              height: '100%',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <MaterialIcons
                              name="delete-outline"
                              size={24}
                              color="red"
                            />
                          </TouchableOpacity>
                        </ImageBackground>
                      </View>
                    );
                  })}
              </View>
              <View style={{
                height: 70, width: "100%",

                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true)
                  }}
                  style={{
                    width: '55%',
                    height: 40,
                    borderRadius: 25,

                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: "#ff3259",
                    borderWidth: 1.5
                  }}>
                  <Text
                    style={{ fontWeight: '900', color: '#ff3259', fontSize: 16 }}>
                    Upload
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* =========Photoa Area======== */}

          </Card>
          <TouchableOpacity
            onPress={() => save()}
            style={styles.nextBottom}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              Submit
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* =======Header=========== */}

        <FlashMessage />
      </SafeAreaView>
      {lodding && <Loder lodding={lodding} />}
      <CameraModal
        pickImageLibrary={pickImageLibrary}
        pickCamera={pickCamera}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
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

    backgroundColor: '#ff3259',
    alignSelf: 'center',
    marginBottom: 50,
    alignItems: 'center',
  },
  //next Bottom
  //imageUpload
  imageUpload: {
    width: '100%',
    height: 300,
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

export default ServiceCreate;
