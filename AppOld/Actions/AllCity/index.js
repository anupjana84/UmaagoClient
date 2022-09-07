
import { Base_url } from './../../Utils/BaseUrl';
import Axios from 'axios'
import {ALL_CITY} from "../ActionType/AllCity";
export const getAllCity= (id)=> async(dispatch)=>{
   
//   console.log(id)
    Axios.get(`${Base_url}/get-city/${id}`)
        .then(response => {
              console.log(response.data,'r')
            if (response.data) {
               
           
            // dispatch({
            //     type:ALL_CITY,
            //     payload:{
            //         data:response.data.districs
            //     }
            // })
            //   console.log(response.data,'dist')
        }
        })
        .catch(error => {
            console.log(error)
        })

}