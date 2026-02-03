import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Ingredient, State, Order } from '../../utils/types';
import { request } from '../../utils/api';
import { GET_INGREDIENTS_REQUEST } from './ingredients';
import { MODAL_OPEN_ORDER } from './modal';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST'
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS'
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED'

export const CREATE_ORDER = 'CREATE_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'


interface GetIngredientsAction {
    type: string
    ingredients?: Ingredient[]
}

interface PostOrderAction {
    type: string
    order?: Order
}

type APIAction = GetIngredientsAction | PostOrderAction

export const postOrder =
    (
        ingredients: Ingredient[]
    ): ThunkAction<void, State, unknown, APIAction> =>
    async (dispatch: ThunkDispatch<State, unknown, APIAction>) => {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        })
        const data = ingredients.map((item) => item._id)
        request('orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: data }),
        })
            .then((data) => {
                dispatch({
                    type: POST_ORDER_SUCCESS,
                    order: data,
                })
                dispatch({ type: MODAL_OPEN_ORDER })
            })
            .catch((error) => {
                dispatch({
                    type: POST_ORDER_FAILED,
                })
                alert(error)
            })
    }