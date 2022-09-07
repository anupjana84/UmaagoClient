import {combineReducers} from 'redux';

import CampaignHistory from './CampaignHistory';
import HomeData from './HomeData';
import AllCity from './AllCity';

import AllState from './AllState';



 import user from './User';
import AllDistrict from './AllDistrict';

const rootReducer = combineReducers({

user,
CampaignHistory,
HomeData,
AllState,
AllDistrict,
AllCity



});
export default rootReducer;
