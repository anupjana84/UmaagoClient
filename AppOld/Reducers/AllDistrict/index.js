
import { ALL_DISTRICT } from '../../Actions/ActionType/AllDistrict';

const initialState = {
  district:[],
  
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_DISTRICT:
     
    //  console.log(action.payload,'redu');
 
      return {
        ...state,
        district: action.payload.data,
       
       
        
      };

    default:
      return state;
  }
};
