import React, { useEffect } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions,
  
    FlatList
} from 'react-native';

import { Modal, Title, Portal } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');
const DistrictModal = ({ 
    setSelectedDistName,
    setSelectedDistrict,
    setDMVisible,
     distDMVisible,
    district,
    changeCity
 }) => {
    const randerItem = ({ item, index }) => {
        return (
            <TouchableOpacity
            onPress={()=>{
                changeCity(item.id)
                setSelectedDistrict(item.id)
                setSelectedDistName(item.name)
                setDMVisible(false)}
           } style={{ width: "100%", height: 30 }}>
                <Text style={{ marginLeft: 30, fontSize: 18 }}> {item.name}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <>
            <Portal>
                <Modal
                    visible={distDMVisible}
                    onDismiss={() => setDMVisible(false)}
                    contentContainerStyle={styles.containerStyle}>
                    <View style={{ flex: 1 }}>
                        <Title style={{ textAlign: 'center',
                        color:'black', fontSize: 20 }}> Select District</Title>
                        <FlatList
                            data={district}
                            renderItem={(item, i) => randerItem(item)}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </Modal>
            </Portal>
        </>
    );
};

export default DistrictModal;

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        width: width - 100,
        height: 300,
        alignSelf: 'center',
        borderRadius: 10,

        zIndex: 999,
        top: height / 2 - 175,
        position: 'absolute',
    },
    container1: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,

        zIndex: 998,
    },
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'black',
        zIndex: 10,
        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center',
    },
});
