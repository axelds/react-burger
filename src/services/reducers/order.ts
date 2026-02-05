import { POST_ORDER_REQUEST, POST_ORDER_SUCCESS, POST_ORDER_FAILED } from '../actions/order';
import { StateOrder, Action } from '../../utils/types';

const initialState: StateOrder = {
  order: null,
  orderRequest: false,
  orderFailed: false,
}

const orderReducer = (state = initialState, action: Action) => {
  switch (action.type) {
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
            }
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                ingredientsFailed: false,
                order: action.order,
                orderRequest: false,
                ingredientsConstructor: [],
            }
        }
        case POST_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
                order: null,
            }
        }
        default: {
            return state
        }
  }
}

export default orderReducer