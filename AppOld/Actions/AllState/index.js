
import { Base_url } from './../../Utils/BaseUrl';
import Axios from 'axios'
import {ALL_STATE} from "../ActionType/AllState";
export const getAllState= ()=> async(dispatch)=>{
   
  
    Axios.get(`${Base_url}/register`)
        .then(response => {
            //  console.log(response.data.sliders,'r')
            if (response.data) {
               
           
            dispatch({
                type:ALL_STATE,
                payload:{
                    data:response.data.states
                }
            })
            //  console.log(response.data,'state')
        }
        })
        .catch(error => {
            console.log(error)
        })

}