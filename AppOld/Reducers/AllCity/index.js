
import { ALL_CITY } from '../../Actions/ActionType/AllCity';

const initialState = {
  city:[],
  
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_CITY:
     
    //  console.log(action.payload,'redu');
 
      return {
        ...state,
        district: action.payload.data,
       
       
        
      };

    default:
      return state;
  }
};
