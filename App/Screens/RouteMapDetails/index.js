import React, { useState, useEffect } from 'react';
import Geocoder from 'react-native-geocoding';

import {

    PermissionsAndroid,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { Card, Title, } from 'react-native-paper';
import { Loacationkey } from '../../Utils/key';
import { Image_url } from '../../Utils/BaseUrl';
import RNFetchBlob from 'rn-fetch-blob';

import Ionicons from 'react-native-vector-icons/Ionicons';
const RouteMapDetails = ({ navigation, route }) => {
 
    
    
    const [address,setAddress]=useState('')
    const find = (lat,lng) => {
        Geocoder.init(`${Loacationkey}`); 

        Geocoder.from(lat,lng)
        .then(json => {
          var getloc = json.results[0].formatted_address;
          var loacation = getloc.split(',');
          
            setAddress(`${loacation[0]}${loacation[1]}`)
          return{
            name:loacation[1]
          }
         
        })
        .catch(error => console.warn(error));
      };
      //==============
  const checkPermission = async (item) => {
    const REMOTE_IMAGE_PATH =`${Image_url}/${item}`
    
    console.log(REMOTE_IMAGE_PATH);
 
 
    if (Platform.OS === 'ios') {
      downloadImage(REMOTE_IMAGE_PATH);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         
          console.log('Storage Permission Granted.');
          downloadImage(REMOTE_IMAGE_PATH);
        } else {
          
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        
        console.warn(err);
      }
    }
  };
 
  const downloadImage = (REMOTE_IMAGE_PATH) => {
  
   
    let date = new Date();
   
    let image_URL = REMOTE_IMAGE_PATH;    
  
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
  
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
       
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };
 
  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ?
             /[^.]+$/.exec(filename) : undefined;
  };
  //==============
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
                        <Text style={{ color: 'white', fontSize: 16 }}>Route Map </Text>
                    </View>
                    <View style={styles.headerLeft} />
                </View>
                {/* =======Header=========== */}
                <ScrollView>
                    <Card
                        style={{
                            padding: 20,
                            marginHorizontal: 15,
                            marginVertical: 15,
                            backgroundColor: 'white',
                            borderRadius: 20,
                        }}>
                        {route.params.map && route.params.map.length > 0 ? (
                            route.params.map.map((item, i) => {
                                return (
                                    <View key={(i)} style={{ width: '100%', padding: 10 ,flexDirection:'row', justifyContent:'space-between'}}>
                                        <Text style={{ color: 'black' }}>{item.status}</Text>
                                        <Text style={{ color: 'black' }}>{find(item.latitude,item.longitude)}</Text>
                                        <Text style={{ color: 'black' }}>{address}</Text>
                                    </View>
                                )
                            })

                        ) : (null)}
                         {route.params.photo && route.params.photo.length > 0 ? (
                            route.params.photo.map((itemm, i) => {
                                // console.log(itemm,'itemm');
                                return (
                                   
                                    <View  key={i} style={{
                                        width: '100%', 
                                        height:100,
                                        marginVertical:8,
                                        
                                      }}> 
                    
                                      
                                       <ImageBackground
                                       imageStyle={{ borderRadius: 10}}
                                         style={{width:'100%',
                                         marginVertical:5,
                                         borderRadius:10,
                                         justifyContent:'center',
                                         alignItems:"center",
                                         
                                        height:'100%',resizeMode:'cover'}}
                                         source={{uri:`${Image_url}/${itemm.image}`}}>
                                          
                                          <TouchableOpacity onPress={()=>{
                                            checkPermission(itemm.image)
                                          }} >
                                            <View style={{
                                      width: 100, height: 100, borderRadius: 50,
                                      justifyContent: 'center',
                                      alignItems: "center",
                                    }}>
                                      <LinearGradient
                                      colors={['#FFA68D', '#FD3A84']}
                                      start={{x: 0.0, y: 0.0}}
                                      end={{x: 0.0, y: 1.0}}
                                      style={{ width: 40, height: 40, borderRadius: 20,justifyContent:'center',alignItems:"center"}}>
                                     <Ionicons name="md-cloud-download-outline" size={24} color="white" />
                                    </LinearGradient> 
                                    </View>
                    
                                          </TouchableOpacity>
                                      </ImageBackground>
                                      </View>
                                )
                            })

                        ) : (null)} 

                         
                    </Card>
                </ScrollView>
            </SafeAreaView>

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

        backgroundColor: '#ff3259',
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

export default RouteMapDetails;
