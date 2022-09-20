import * as React from "react";
import { Image, StyleSheet,TouchableOpacity, Text, View } from "react-native";

const ClientProfile = () => {
  return (
    <View style={styles.clientProfileView}>
      
     
    
      <View style={styles.groupView7}>
        <View style={styles.appCards}>
          <View style={styles.rectangleView} />
        </View>
        <View style={styles.lineView} />
        <View style={styles.groupView1}>
          <View style={styles.rectangleView1} />
          <Image
            style={styles.groupIcon2}
            resizeMode="center"
            source={require("../../Images/mobile.jpg")}
          />
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </View>
        <View style={styles.groupView2}>
          <View style={styles.rectangleView2} />
          <Text style={styles.compaignHistoryText}>Compaign History</Text>
          <Image
            style={styles.groupIcon3}
            resizeMode="cover"
            source={require("../../Images/truck.png")}
          />
        </View>
        <View style={styles.groupView3}>
          <View style={styles.rectangleView3} />
          <Text style={styles.serviceHistoryText}>Service History</Text>
          <Image
            style={styles.groupIcon4}
            resizeMode="cover"
            source={require("../../Images/user2.png")}
          />
        </View>
        <View style={styles.groupView4}>
          <View style={styles.rectangleView4} />
          <Text style={styles.paymentHistoryText}>Payment History</Text>
          <Image
            style={styles.groupIcon5}
            resizeMode="cover"
            source={require("../../Images/user2.png")}
          />
        </View>
        <View style={styles.groupView5}>
          <View style={styles.rectangleView5} />
          <Text style={styles.changePasswordText}>Change Password</Text>
          <Image
            style={styles.groupIcon6}
            resizeMode="cover"
            source={require("../../Images/car1.png")}
          />
        </View>
        <View style={{...styles.ellipseIcon, borderRadius:50}}>
         
        </View>
        {/* <Image
          style={styles.ellipseIcon}
          resizeMode="cover"
          source={require("../../Images/user.png")}
        /> */}
        <View style={styles.groupView6}>
          <Text style={styles.johnDoe27}>John Doe, 27</Text>
        </View>
        <TouchableOpacity style={styles.groupIcon7} onPress={()=>alert('dsfasd')}>
        {/* <Image
          
          resizeMode="cover"
          source={require("../../Images/logo.png")}
        /> */}
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ml3: {
    marginLeft: 3,
  },
  ml16: {
    marginLeft: 16,
  },
  backgroundIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    maxWidth: "100%",
    maxHeight: "100%",
  },
  barsStatusBarDesignLightIcon: {
    position: "absolute",
    height: "50%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "50%",
    left: "0%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  titleText: {
    position: "absolute",
    top: 54,
    right: 164,
    left: 163,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
    fontFamily: "Proxima Nova",
    color: "#fff",
    textAlign: "center",
  },
  iconDirectionsChevron: {
    position: "relative",
    width: 24,
    height: 24,
    flexShrink: 0,
    overflow: "hidden",
  },
  parentTitleText: {
    position: "relative",
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Montserrat",
    color: "#333",
    textAlign: "left",
    display: "none",
  },
  leftActionView: {
    position: "absolute",
    top: 52,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    display: "none",
  },
  iconOutlinedDirections: {
    position: "relative",
    width: 24,
    height: 24,
    flexShrink: 0,
    overflow: "hidden",
    display: "none",
  },
  saveText: {
    position: "relative",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "700",
    fontFamily: "Proxima Nova",
    color: "red",
    textAlign: "right",
    display: "none",
  },
  iconOutlinedDirections1: {
    position: "relative",
    width: 24,
    height: 24,
    flexShrink: 0,
    overflow: "hidden",
    display: "none",
  },
  iconDirectionsLogLog: {
    position: "relative",
    width: 24,
    height: 24,
    flexShrink: 0,
    overflow: "hidden",
  },
  rightActionView: {
    position: "absolute",
    transform: [
      {
        translateY: 12,
      },
    ],
    top: "50%",
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    display: "none",
  },
  barsView: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
  },
  groupView: {
    position: "absolute",
    height: "10.84%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "89.16%",
    left: "0%",
  },
  groupIcon: {
    position: "absolute",
    height: "27.46%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "72.54%",
    left: "0%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  backgroundIcon1: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    maxWidth: "100%",
    maxHeight: "100%",
  },
  titleText1: {
    position: "absolute",
    top: 54,
    right: 160,
    left: 160,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
    fontFamily: "Montserrat",
    color: "#fff",
    textAlign: "center",
  },
  iconOutlinedDirections2: {
    position: "relative",
    width: 24,
    height: 24,
    flexShrink: 0,
    overflow: "hidden",
  },
  parentTitleText1: {
    position: "relative",
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Montserrat",
    color: "#333",
    textAlign: "left",
    display: "none",
  },
  leftActionView1: {
    position: "absolute",
    top: 52,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  saveText1: {
    position: "relative",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "700",
    fontFamily: "Montserrat",
    color: "#007aff",
    textAlign: "right",
    display: "none",
  },
  iconOutlinedDirections3: {
    position: "relative",
    width: 24,
    height: 24,
    flexShrink: 0,
    overflow: "hidden",
  },
  rightActionView1: {
    position: "absolute",
    transform: [
      {
        translateY: 8,
      },
    ],
    top: "50%",
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    display: "none",
  },
  groupIcon1: {
    position: "absolute",
    height: "25.76%",
    top: "39.39%",
    right: 14.34,
    bottom: "34.85%",
    maxHeight: "100%",
    width: 66.66,
  },
  timeText: {
    position: "absolute",
    transform: [
      {
        translateY: -4.5,
      },
    ],
    width: "100%",
    top: "50%",
    right: "0%",
    left: "0%",
    fontSize: 15,
    letterSpacing: -0.24,
    lineHeight: 20,
    fontWeight: "600",
    fontFamily: "SF Pro Text",
    color: "#fff",
    textAlign: "center",
  },
  timeStyleView: {
    position: "absolute",
    height: "47.73%",
    top: "15.91%",
    bottom: "36.36%",
    left: 21,
    width: 54,
  },
  barsStatusBarDesignL: {
    position: "absolute",
    height: "50%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "50%",
    left: "0%",
  },
  barsView1: {
    position: "absolute",
    height: "10.84%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "89.16%",
    left: "0%",
  },
  rectangleView: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: 28,
    backgroundColor: "green",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 20,
    elevation: 20,
    shadowOpacity: 1,
  },
  appCards: {
    position: "absolute",
    height: "91.03%",
    width: "100%",
    top: "8.97%",
    right: "0%",
    bottom: "0%",
    left: "0%",
  },
  lineView: {
    position: "absolute",
    height: "0.14%",
    width: "86.3%",
    top: "34.08%",
    right: "6.85%",
    bottom: "65.77%",
    left: "6.85%",
    borderStyle: "solid",
    borderColor: "#e3e3e3",
    borderTopWidth: 1,
  },
  rectangleView1: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: 12,
    backgroundColor: "yellow",
  },
  groupIcon2: {
    position: "absolute",
    height: "50%",
    width: "10.85%",
    top: "25%",
    right: "82.37%",
    bottom: "25%",
    left: "6.78%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  editProfileText: {
    position: "absolute",
    height: "37.5%",
    width: "31.53%",
    top: "29.69%",
    right: "46.78%",
    bottom: "32.81%",
    left: "21.69%",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: "Montserrat",
    background: "linear-gradient(0deg, #fd3a84, #ffa68d)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign: "left",
  },
  groupView1: {
    position: "absolute",
    height: "9.26%",
    width: "86.01%",
    top: "38.78%",
    right: "7%",
    bottom: "51.95%",
    left: "7%",
  },
  rectangleView2: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: 12,
    backgroundColor: "#fcf4f7",
  },
  compaignHistoryText: {
    position: "absolute",
    height: "40%",
    width: "51.53%",
    top: "30%",
    right: "26.78%",
    bottom: "30%",
    left: "21.69%",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: "Montserrat",
    background: "linear-gradient(0deg, #fd3a84, #ffa68d)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign: "left",
  },
  groupIcon3: {
    position: "absolute",
    height: "53.33%",
    width: "10.85%",
    top: "26.67%",
    right: "82.37%",
    bottom: "20%",
    left: "6.78%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  groupView2: {
    position: "absolute",
    height: "8.68%",
    width: "86.01%",
    top: "49.78%",
    right: "7%",
    bottom: "41.53%",
    left: "7%",
  },
  rectangleView3: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: 12,
    backgroundColor: "pink",
  },
  serviceHistoryText: {
    position: "absolute",
    height: "40%",
    width: "42.71%",
    top: "30%",
    right: "35.59%",
    bottom: "30%",
    left: "21.69%",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: "Montserrat",
    background: "linear-gradient(0deg, #fd3a84, #ffa68d)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign: "left",
  },
  groupIcon4: {
    position: "absolute",
    height: "53.33%",
    width: "10.85%",
    top: "26.67%",
    right: "82.37%",
    bottom: "20%",
    left: "6.78%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  groupView3: {
    position: "absolute",
    height: "8.68%",
    width: "86.01%",
    top: "60.2%",
    right: "7%",
    bottom: "31.11%",
    left: "7%",
  },
  rectangleView4: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: 12,
    backgroundColor: "red",
  },
  paymentHistoryText: {
    position: "absolute",
    height: "40%",
    width: "47.8%",
    top: "30%",
    right: "30.51%",
    bottom: "30%",
    left: "21.69%",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: "Montserrat",
    background: "linear-gradient(0deg, #fd3a84, #ffa68d)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign: "left",
  },
  groupIcon5: {
    position: "absolute",
    height: "53.33%",
    width: "10.85%",
    top: "26.67%",
    right: "82.37%",
    bottom: "20%",
    left: "6.78%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  groupView4: {
    position: "absolute",
    height: "8.68%",
    width: "86.01%",
    top: "70.62%",
    right: "7%",
    bottom: "20.69%",
    left: "7%",
  },
  rectangleView5: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: 12,
    backgroundColor: "#fcf4f7",
  },
  changePasswordText: {
    position: "absolute",
    height: "40%",
    width: "51.19%",
    top: "30%",
    right: "27.12%",
    bottom: "30%",
    left: "21.69%",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: "Montserrat",
    background: "linear-gradient(0deg, #fd3a84, #ffa68d)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign: "left",
  },
  groupIcon6: {
    position: "absolute",
    height: "53.33%",
    width: "10.85%",
    top: "26.67%",
    right: "82.37%",
    bottom: "20%",
    left: "6.78%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  groupView5: {
    position: "absolute",
    height: "8.68%",
    width: "86.01%",
    top: "81.04%",
    right: "7%",
    bottom: "10.27%",
    left: "7%",
  },
  ellipseIcon: {
    position: "absolute",
    height: 150,
    width:150,
    top: "0%",
    right: "26.53%",
    bottom: "76.85%",
    left: "26.82%",
    
    borderRadius:75,
    backgroundColor:'yellowgreen'
  },
  johnDoe27: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    fontSize: 24,
    lineHeight: 36,
    fontWeight: "700",
    fontFamily: "Montserrat",
    color: "#333",
    textAlign: "center",
  },
  groupView6: {
    position: "absolute",
    height: "5.21%",
    width: "47.23%",
    top: "26.05%",
    right: "26.24%",
    bottom: "68.74%",
    left: "26.53%",
  },
  groupIcon7: {
    position: "absolute",
    height: 50,
    width: 50,
    borderRadius:25,
    top: "17.37%",
    right: "26.53%",
    bottom: "76.85%",
    left: "61.81%",
   
    
    backgroundColor:'red'
  },
  groupView7: {
    position: "absolute",
    height: "85.1%",
    width: "91.47%",
    top: "11.82%",
    right: "4.27%",
    bottom: "3.08%",
    left: "4.27%",
    
  },
  clientProfileView: {
    flex:1
  },
});

export default ClientProfile;
