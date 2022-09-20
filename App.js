import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import {LogBox, YellowBox} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import MainStack from './App/Stacks/MainStack';
import { Provider } from 'react-redux';
import store from './App/Store/store';
import FlashMessage from "react-native-flash-message";
LogBox.ignoreLogs([
  'Remote debugger is in a background tab which may cause apps to perform slowly',
  'Require cycle: node_modules/rn-fetch-blob/index.js',
  'Require cycle: node_modules/react-native/Libraries/Network/fetch.js'
]);
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';







const App = () => {
  const setAuthToken = async () => {
    const isRegister = await AsyncStorage.getItem('@user');
    const data = isRegister != null ? JSON.parse(isRegister) : null;
    // const user = JSON.parse(await AsyncStorage.getItem('@user'));
    // const token =user.access_token
    // console.log(data?.access_token,'dats')
    if (data === null) {
      Axios.defaults.headers.common['Authorization'] = ''
    } else {
      Axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
    }

  }
  useEffect(() => {
    setAuthToken()

  }, [])




  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      
        <Provider store={store}>
          <PaperProvider>
            <MainStack />
            <FlashMessage />
          </PaperProvider>

        </Provider>
      
    </GestureHandlerRootView>
  )
}

export default App
