
import { Base_url } from './../../Utils/BaseUrl';
import Axios from 'axios'
import { HOME_DATA } from '../ActionType/Home';

export const getHomedata= (setLoding)=> async(dispatch)=>{


    setLoding(true)
    Axios.get(`${Base_url}/home`)
        .then(response => {
            //  console.log(response.data.sliders,'r')
            if (response.data) {
                setLoding(false)
           
            dispatch({
                type:HOME_DATA,
                payload:{
                    data:response.data
                }
            })
            // console.log(response.data)
        }
        })
        .catch(error => {
            console.log(error)
        })

}