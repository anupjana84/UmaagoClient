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
const StateModal = ({ stateMVisible, getState,
    getDistrict,
    setSelectedState,
    setSelectedStateName,
    setstateMVisible }) => {
    const randerItem = ({ item, index }) => {
        return (
            <TouchableOpacity
            onPress={()=>{
                getDistrict(item.id)
                setSelectedState(item.id)
                setSelectedStateName(item.name)
                setstateMVisible(false)
            }} style={{ width: "100%", height: 30 }}>
                <Text style={{ marginLeft: 30, fontSize: 18 }}> {item.name}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <>
            <Portal>
                <Modal
                    visible={stateMVisible}
                    onDismiss={() => setstateMVisible(false)}
                    contentContainerStyle={styles.containerStyle}>
                    <View style={{ flex: 1 }}>
                        <Title style={{ textAlign: 'center',
                        color:'black', fontSize: 20 }}> Select State</Title>
                        <FlatList
                            data={getState}
                            renderItem={(item, i) => randerItem(item)}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </Modal>
            </Portal>
        </>
    );
};

export default StateModal;

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
