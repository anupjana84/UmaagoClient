

import {
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
  ImageBackground

} from 'react-native';

// import Axios from 'axios'
import React, { useRef, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useSelector } from 'react-redux';
import { Base_url, Image_url } from '../../Utils/BaseUrl';

import { TextInput, Card, Title } from 'react-native-paper';

import Loder from '../../Components/Loder';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';




const ServiceHistory = ({ navigation }) => {
  const { token } = useSelector(state => state.user)
  const [lodding, setLodding] = React.useState(false);
  const [servive, setServive] = React.useState([]);
  //==============
  const checkPermission = async (item) => {
    const REMOTE_IMAGE_PATH =`${Image_url}/${item}`
    // const REMOTE_IMAGE_PATH ='https://raw.githubusercontent.com/AboutReact/sampleresource/master/gift.png'
    console.log(REMOTE_IMAGE_PATH);
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission
 
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
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage(REMOTE_IMAGE_PATH);
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };
 
  const downloadImage = (REMOTE_IMAGE_PATH) => {
    // Main function to download the image
    
    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = REMOTE_IMAGE_PATH;    
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
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
        // Showing alert after successful downloading
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


  const geImage = async () => {
    setLodding(true)
    fetch(`${Base_url}/services`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      return res.json()
    })
      .then(response => {
        if (response) {
          setLodding(false)
            // console.log(response.services[0],'rea')
          if (response) {
            setServive(response.services)
            // console.log(response.services)
          }
        }
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    geImage()
  }, [])


const randerItem=({item})=>{
  const itemll=item?.image?.split(',')?item?.image?.split(','):[]
  //  console.log(item);
  return(
    
    <Card
            style={{
              padding: 15,
              margin: 15,
              backgroundColor: 'white',
              borderRadius: 20,
              marginTop: 15
            }}>
            {/* ===========header========== */}
            <View style={{
              width: '100%', height: 60,
              flexDirection: 'row'
            }}>
              <View style={{
                width: '50%', height: 60, flexDirection: 'row',
                alignItems: 'center',    
              }}>
                <View style={{
                  width: 40, height: 40, borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: "center",
                }}>
                  <LinearGradient
                  colors={['#FFA68D', '#FD3A84']}
                  start={{x: 0.0, y: 0.0}}
                  end={{x: 0.0, y: 1.0}}
                  style={styles.CircleShapeView}>
                  <MaterialCommunityIcons name="file-document-multiple-outline" size={24} color="white" />
                </LinearGradient> 
                </View>
                <Text style={{ marginLeft: 10, color:'black' }}>{item?.service?.name}</Text>
              </View>
              <View style={{
                width: '50%', height: 60,
                alignItems: 'flex-end', justifyContent: 'center'
              }}>
                <View style={{
                  width: 120, height: 40, borderColor:item?.status==0 ?'#f39f55':"#a5e1be",
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 25,
                }}>
                  
                  <Text style={{color:item?.status==0 ?'#f39f55':"#a5e1be"}}>{item?.status==0 ?'Pending':'Completed'}</Text>
                </View>
              </View>
            </View>
            {/* ===========header========== */}
            {/* ===========header========== */}
            <View style={{
              width: '100%', height: 60,
              flexDirection: 'row'
            }}>
              <View style={{
                width: '50%', height: 60, flexDirection: 'row',
                alignItems: 'center', 
              }}>
                <Text style={{ marginLeft: 10, fontSize:20 }}>Quantity-{item.quantity}</Text>
              </View>
              <View style={{
                width: '50%', height: 60,
                alignItems: 'flex-end', justifyContent: 'center',
                paddingRight:10,
              }}>  
                  <Text >{moment(item.created_at).format('DD/MM/YYYY') }</Text>
              </View>
            </View>
            {/* ===========header========== */}
            {/* ===========header========== */}
            <Text style={{marginLeft:10,fontSize:18}}>Matter</Text>
            <View style={{
                width: '100%', paddingVertical:15,
                paddingHorizontal:10,
                flexDirection:'row',
                flexWrap:'wrap'
              }}>   
              {item?.upload_matter?(<Text>{item?.upload_matter}</Text>):null}
                  
              </View>
              <View style={{
                width: '100%', 
                paddingVertical:10
              }}> 
               {itemll && itemll.map((itemm, i)=>{
                return(
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
                     source={{uri:`${Image_url}/${itemm}`}}>
                      
                      <TouchableOpacity onPress={()=>{
                        checkPermission(itemm)
                      }} >
                        <View style={{
                  width: 40, height: 40, borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: "center",
                }}>
                  <LinearGradient
                  colors={['#FFA68D', '#FD3A84']}
                  start={{x: 0.0, y: 0.0}}
                  end={{x: 0.0, y: 1.0}}
                  style={styles.CircleShapeView}>
                 <Ionicons name="md-cloud-download-outline" size={24} color="white" />
                </LinearGradient> 
                </View>

                      </TouchableOpacity>
                  </ImageBackground>
                  </View>
                )
              })}  
             
              
                
                
              </View>
            {/* ===========header========== */}

          </Card>

  )
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
        <View style={styles.headerview}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerMiddle}>
            <Text style={{ color: 'white', fontSize: 16 }}>Services History</Text>
          </View>
          <View style={styles.headerLeft} />
        </View>
        {/* ==========one part====== */}
        <FlatList
        data={servive}
        renderItem={(item,i)=>randerItem(item)}
        keyExtractor={item => item.id}
      />





      </SafeAreaView>


      {lodding && <Loder lodding={lodding} />}
    </>
  );
};

export default ServiceHistory;

const styles = StyleSheet.create({
  //itemView
  container:{
    flex:1
  },
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
