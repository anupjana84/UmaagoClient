
import { Base_url } from './../../Utils/BaseUrl';
import Axios from 'axios'
import {ALL_DISTRICT} from "../ActionType/AllDistrict";
export const getAllDistrict= (id)=> async(dispatch)=>{
   
//   console.log(id)
    Axios.get(`${Base_url}/get-distric/${id}`)
        .then(response => {
            //  console.log(response.data.sliders,'r')
            if (response.data) {
               
           
            dispatch({
                type:ALL_DISTRICT,
                payload:{
                    data:response.data.districs
                }
            })
            //   console.log(response.data,'dist')
        }
        })
        .catch(error => {
            console.log(error)
        })

}