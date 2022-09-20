
import { Base_url } from './../../Utils/BaseUrl';
import Axios from 'axios'
import { HOME_DATA } from '../ActionType/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getHomedata= (setLoding)=> async(dispatch)=>{
    const token= JSON.parse( await AsyncStorage.getItem('@token'))
    // console.log(token)
fetch(`${Base_url}/home`,{
    method:"GET",
    headers:{
        Accept: 'application/json',
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`

    }
}).then(res=>{
    return res.json()
}).then(response=>{
    dispatch({
        type:HOME_DATA,
        payload:{
            data:response
        }
    })

}).catch(err=>console.log(err))

    // setLoding(true)
    // Axios.get(`${Base_url}/home`)
    //     .then(response => {
    //         //  console.log(response.data.sliders,'r')
    //         if (response.data) {
    //             setLoding(false)
           
    //         dispatch({
    //             type:HOME_DATA,
    //             payload:{
    //                 data:response.data
    //             }
    //         })
    //         // console.log(response.data)
    //     }
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })

}