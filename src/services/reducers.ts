import { combineReducers, Reducer } from 'redux';
import ingredients from './reducers/ingredients';
import burgerConstructor from './reducers/burgerConstructor';
import currentIngredient from './reducers/currentIngredient';
import password from './reducers/password';
import auth from './reducers/auth';
import order from './reducers/order';
import feedReducer from './reducers/feed';
import userOrdersReducer from './reducers/userOrders';
import { RootState, RootAction } from '../utils/types';

const rootReducer = combineReducers({
    ingredients: ingredients as Reducer<RootState['ingredients'], RootAction>,
    burgerConstructor: burgerConstructor as Reducer<RootState['burgerConstructor'], RootAction>,
    currentIngredient: currentIngredient as Reducer<RootState['currentIngredient'], RootAction>,
    auth: auth as Reducer<RootState['auth'], RootAction>,
    order: order as Reducer<RootState['order'], RootAction>,
    password: password as Reducer<RootState['password'], RootAction>,
    feed: feedReducer as Reducer<RootState['feed'], RootAction>,
    userOrders: userOrdersReducer as Reducer<RootState['userOrders'], RootAction>
});

export default rootReducer;
