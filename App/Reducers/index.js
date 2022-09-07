import {combineReducers} from 'redux';
import CampaignHistory from './CampaignHistory';
import ProfileImage from './ProfileImage';

import HomeData from './HomeData';

 import user from './User';

const rootReducer = combineReducers({

user,
CampaignHistory,
ProfileImage,
HomeData,
});
export default rootReducer;
