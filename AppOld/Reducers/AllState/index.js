
import { ALL_STATE } from '../../Actions/ActionType/AllState';

const initialState = {
  state:[],
  
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_STATE:
     
    // console.log(action.payload.data,'redu');
 
      return {
        ...state,
        state: action.payload.data,
       
       
        
      };

    default:
      return state;
  }
};
