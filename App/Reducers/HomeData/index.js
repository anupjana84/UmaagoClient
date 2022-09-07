
import { HOME_DATA } from '../../Actions/ActionType/Home';
import {Image_url} from '../../Utils/BaseUrl'
const initialState = {
  data:{},
  upcomming:[],
  completed:[],
  slider:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HOME_DATA:
      let aa=[]
      const item= action.payload.data.sliders.map(element => {
        aa.push(`${Image_url}/${element.image}`)   ;
     });
    
 
      return {
        ...state,
        data: action.payload.data,
        sliders:aa
       
        
      };

    default:
      return state;
  }
};
