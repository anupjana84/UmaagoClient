import React, { useEffect, useState } from 'react';
import {
   Dimensions,
   StyleSheet,
   View,
   SafeAreaView,
   TouchableOpacity,
   Image,
   StatusBar,
   ScrollView,
   Text,
   Alert,
   Button,
   Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, useSelector } from 'react-redux';

import { Image_url } from '../../Utils/BaseUrl';
import { SliderBox } from "react-native-image-slider-box";
import { Title } from 'react-native-paper';
import { getHomedata } from '../../Actions/HomeData';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('screen');

const Dashboard = ({ getHomedata }) => {
   const navigation = useNavigation()

   const [playing, setPlaying] = useState(false);
   const onStateChange = (state) => {
      if (state === 'ended') {
         setPlaying(false);
         Alert.alert('video has finished playing!');
      }
   }
   const togglePlaying = () => {
      setPlaying((prev) => !prev);
   }
   const [loding, setLoding] = useState(true)
   const { data } = useSelector((state) => state.HomeData)
   const { sliders } = useSelector((state) => state.HomeData)
   //  console.log(data)

   // const sliderItem = () => {

   //    return sliders.map(element => {
   //       return { uri: `${Image_url}/${element.image}` };
   //    });
   // };
   useEffect(() => {

      getHomedata(setLoding)
   }, [])

   return (
      <>
         <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
               animated={true}
               backgroundColor="#ff3259"
               barStyle="default"
               hidden={false}
            />
            {/* ============Profile View=========  */}
            <View style={styles.profileView}>
               <View style={styles.rightProfile}

               >
                  <TouchableOpacity
                     onPress={() => navigation.navigate('Profile')}
                     style={{
                        width: 50,
                        height: 50,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 25,
                     }}>
                     <View
                        style={{
                           width: 45,
                           height: 45,
                           backgroundColor: 'red',
                           borderRadius: 22.5,
                        }}>
                        <Image
                           source={require('../../Images/car1.png')}
                           style={{
                              width: '100%',
                              borderRadius: 50,
                              height: '100%',
                              resizeMode: 'contain',
                           }}
                        />
                     </View>
                  </TouchableOpacity>
               </View >
               <View style={styles.middleProfile}>
                  <Image
                     source={require('../../Images/homeLogo1.png')}
                     style={{
                        width: '80%',
                        height: '70%',
                        resizeMode: 'contain',
                     }}
                  />
               </View>
               <TouchableOpacity onPress={() => navigation.navigate('Notification')} style={styles.rightProfile} >
                  <Ionicons name="notifications-outline" size={36} color="white" />
               </TouchableOpacity>
            </View>
            {/* ============Profile View========= */}

            <ScrollView showsVerticalScrollIndicator={false}>
               {Object.keys(data).length > 0 ? (
                  <View style={styles.slidImage}>

                     <SliderBox
                        images={sliders}
                        disableOnPress={true}
                        autoplay={false}
                        circleLoop
                        dotColor='red'
                        autoplayInterval={1000}
                        dotStyle={{ width: 10, height: 10, }}

                        resizeMethod={'resize'}
                        resizeMode={'cover'}
                        imageLoadingColor="#ff3259"
                        ImageComponentStyle={{
                           borderRadius: 5,
                           // width: Dimensions.get("screen").width*0.95,
                        }}
                        sliderBoxHeight={200}
                        parentWidth={Dimensions.get('screen').width * 0.95}

                     />
                  </View>
               ) : null}
               {/* ============ Compaigns View ======= */}
               <View style={{ ...styles.campaignView, height: 180, }}>
                  <View style={{ ...styles.campaignHeader, paddingVertical: 10 }}>
                     <Title>Compaigns</Title>
                  </View>
                  <View style={styles.campaignItemParent}>
                     {/* ======item======== */}

                     <TouchableOpacity onPress={()=>{
                        navigation.navigate('Campaign')
                     }} style={styles.campaignItem}>
                        <View style={styles.campaignItemUpper}>
                           <View style={styles.campaignItemUpperIconBox}>
                              <Image source={require('../../Images/rotated.png')} style={{
                                 width: 60, height: 60,
                                 tintColor: 'red', resizeMode: 'contain'
                              }} />

                           </View>
                        </View>
                        <View style={styles.campaignItemLower}>
                           <Text style={{ fontSize: 14, fontWeight: '500' }}>Running</Text>
                        </View>
                     </TouchableOpacity>
                     {/* ======item======== */}
                     <View style={styles.campaignItem}>
                        <View style={styles.campaignItemUpper}>
                           <View style={styles.campaignItemUpperIconBox}>
                              <Image source={require('../../Images/Group.png')} style={{
                                 width: 40, height: 40,
                                 tintColor: 'red', resizeMode: 'contain'
                              }} />
                           </View>
                        </View>
                        <View style={styles.campaignItemLower}>
                           <Text style={{ fontSize: 14, fontWeight: '500' }}>Upcoming</Text>
                        </View>
                     </View>
                     {/* ======item======== */}
                     <View style={styles.campaignItem}>
                        <View style={styles.campaignItemUpper}>
                           <View style={styles.campaignItemUpperIconBox}>
                              <Image source={require('../../Images/Vector.png')} style={{
                                 width: 40, height: 40,
                                 tintColor: 'red', resizeMode: 'contain'
                              }} />

                           </View>
                        </View>
                        <View style={styles.campaignItemLower}>
                           <Text style={{ fontSize: 14, fontWeight: '500' }}>Completed</Text>
                        </View>
                     </View>
                     {/* ======item======== */}
                  </View>
               </View>
               {/* ============ Compaigns View ======= */}
               {/* ============ CAR  View ======= */}
               <View style={{
                  ...styles.carView, marginTop: 0, height: 220,
               }}>
                  <ScrollView horizontal
                     showsHorizontalScrollIndicator={false}>
                     {/* ============ CAR  Item ======= */}
                     {Object.keys(data).length > 0 ? (
                        data.types.map((item, i) => {

                           return (
                              <TouchableOpacity
                                 onPress={() => {
                                    navigation.navigate('CampaignCreate')

                                 }}
                                 key={i} style={styles.carViewItem}>
                                 <View style={{
                                    width: '100%', height: '70%',
                                    borderRadius: 8,

                                    justifyConten: "center"
                                 }}>
                                    <Image style={{
                                       width: '100%', height: '100%',
                                       borderRadius: 10,
                                       resizeMode: "cover"
                                    }} source={{ uri: `${Image_url}/${item.image}` }} />
                                 </View>
                                 <View style={{ width: '100%', height: '30%' }}>
                                    <Title>{item.name}</Title>
                                    <Text>Starts 300/D</Text>
                                 </View>
                              </TouchableOpacity>
                           )
                        })

                     ) : null}
                     {/* ============ CAR  Item ======= */}
                  </ScrollView>

               </View>
               {/* ============ CAR  View ======= */}
               {/* ============ SERVICE  View ======= */}
               <View style={{
                  ...styles.carView1,
                  height: 250,


               }}>
                  <View style={{
                     width: '100%', height: 50,

                     justifyContent: 'center'
                  }}>
                     <Text style={{ fontSize: 20, fontWeight: "600" }}>Service</Text>
                  </View>
                  <View style={{ height: 200, width: '100%' }}>
                     <ScrollView horizontal style={{}}
                        showsHorizontalScrollIndicator={false}>
                        {/* ============ CAR  Item ======= */}
                        {Object.keys(data).length > 0 ? (
                           data.services.map((item, i) => {

                              return (
                                 <TouchableOpacity
                                    onPress={() => {
                                       navigation.navigate('ServiceCreate')
                                    }} key={i} style={styles.carViewItem1}>
                                    <View style={{
                                       width: 150, height: 150,
                                       borderRadius: 8,

                                       justifyConten: "center"
                                    }}>
                                       <Image style={{
                                          width: '100%', height: '100%',
                                          borderRadius: 10,
                                          resizeMode: "cover"
                                       }} source={{ uri: `${Image_url}/${item.image}` }} />
                                    </View>
                                    <View style={{ width: '100%', height: '30%' }}>
                                       <Title>{item.name}</Title>
                                       <Text>Starts 300/D</Text>
                                    </View>
                                 </TouchableOpacity>
                              )
                           })

                        ) : null}
                        {/* ============ CAR  Item ======= */}

                     </ScrollView>
                  </View>
               </View>
               {/* ============ SERVICE  View ======= */}
               <View style={{
                  width: width, height: 70,
                  paddingLeft: 10,
                  justifyContent: 'center'
               }}>
                  <Title>Client Feedback</Title>
               </View>
               <View style={{

                  justifyContent: 'center', alignItems: 'center',

               }}>
                  

               </View>

            </ScrollView>

         </SafeAreaView>
      </>
   );
};
export default connect(null, { getHomedata })(Dashboard);
const styles = StyleSheet.create({
   profileView: {
      width: '100%',
      height: 80,
      backgroundColor: '#ff3259',
      flexDirection: 'row',
   },
   leftProfile: {
      width: '25%',
      height: '100%',

      justifyContent: 'center',
      alignItems: 'center',
   },
   middleProfile: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      height: '100%',
   },
   rightProfile: {
      width: '25%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
   },
   //=========
   slidImage: {
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
   },

   //=======campaign
   campaignView: {
      width: '100%',
      paddingHorizontal: 10

   },
   campaignHeader: { width: '100%', height: 60 },
   campaignItemParent: { width: '100%', height: 100, flexDirection: 'row' },
   campaignItem: { width: '33.33%', height: '100%', justifyContent: 'center', alignItems: 'baseline' },
   campaignItemUpper: {
      width: '100%', height: '80%',
      justifyContent: 'center',
      alignItems: 'center'
   },
   campaignItemLower: {
      width: '100%', height: '20%', justifyContent: 'center',
      alignItems: 'center'
   },
   campaignItemUpperIconBox: { width: 75, height: 75, borderRadius: 37.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffe5ea' },
   //=======campaign
   //=======Car View
   carView: {

      width: '100%',

      paddingLeft: 10,
      paddingVertical: 10
   },
   carView1: {

      width: '100%',

      paddingLeft: 10,

   },
   carViewItem: {
      width: 150,
      height: '100%',
      marginRight: 10,

   },
   carViewItem1: {
      width: 150,
      height: '100%',
      marginRight: 10,

   }

   //=======Car View

});
