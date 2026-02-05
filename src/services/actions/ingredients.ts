import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { v4 as uuidv4 } from 'uuid'

import { Ingredient, State, Order } from '../../utils/types'
import { request } from '../../utils/api'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export const GET_INGREDIENTS_CONSTRUCTOR = 'GET_INGREDIENTS_CONSTRUCTOR'
export const ADD_INGREDIENT_CONSTRUCTOR = 'ADD_INGREDIENT_CONSTRUCTOR'
export const MOVE_INGREDIENT_CONSTRUCTOR = 'MOVE_INGREDIENT_CONSTRUCTOR'
export const DELETE_INGREDIENT_CONSTRUCTOR = 'DELETE_INGREDIENT_CONSTRUCTOR'

export const VIEW_INGREDIENT = 'VIEW_INGREDIENT'

interface GetIngredientsAction {
    type: string
    ingredients?: Ingredient[]
}

type APIAction = GetIngredientsAction

export const getIngredients =
    (): ThunkAction<void, State, unknown, APIAction> =>
    async (dispatch: ThunkDispatch<State, unknown, APIAction>) => {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        })
        request('ingredients')
            .then((data) => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: data.data,
                })
            })
            .catch((error) => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                })
                alert(error)
            })
    }

export const addIngridient = (item: Ingredient) => {
    return {
        type: ADD_INGREDIENT_CONSTRUCTOR,
        ingredient: {
            ...item,
            uniqueId: uuidv4(),
        },
    }
}
