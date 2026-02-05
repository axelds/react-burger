import { Action, State } from '../utils/types';
import ingredientsReducer from './reducers/ingredients';
import orderReducer from './reducers/order';
import modalReducer from './reducers/modal';

export const initialState: State = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    order: null,
    orderRequest: false,
    orderFailed: false,

    isModalDetail: false,
    isModalOrder: false,
    ingredientDetail: null,

    ingredientsConstructor: [],
}

export const rootReducer = (state = initialState, action: Action) => {
    return {
        ...state,
        ...Object.assign(
            state,
            ingredientsReducer(state, action),
            orderReducer(state, action),
            modalReducer(state, action)
        )
    }
}
