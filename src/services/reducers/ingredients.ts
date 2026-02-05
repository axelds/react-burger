import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, ADD_INGREDIENT_CONSTRUCTOR, MOVE_INGREDIENT_CONSTRUCTOR, DELETE_INGREDIENT_CONSTRUCTOR } from '../actions/ingredients';
import { StateIngredients, Action } from '../../utils/types';

const initialState: StateIngredients = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsConstructor: [],
}

const ingredientsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsFailed: false,
                ingredients: action.ingredients,
                ingredientsRequest: false,
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false,
                ingredients: [],
            }
        }
        case ADD_INGREDIENT_CONSTRUCTOR: {
            const ingredient = action.ingredient!
            if (ingredient.type === 'bun') {
                return {
                    ...state,
                    ingredientsConstructor: [
                        ...state.ingredientsConstructor
                            .filter((item) => item.type !== 'bun')
                            .concat(ingredient),
                    ],
                }
            } else {
                return {
                    ...state,
                    ingredientsConstructor: [
                        ...state.ingredientsConstructor,
                        ingredient,
                    ],
                }
            }
        }
        case MOVE_INGREDIENT_CONSTRUCTOR: {
            const fillings = state.ingredientsConstructor.filter(
                (item) => item.type !== 'bun'
            )
            const buns = state.ingredientsConstructor.filter(
                (item) => item.type === 'bun'
            )

            const dragItem = fillings[action.dragIndex as number]
            const newFillings = [...fillings]
            newFillings.splice(action.dragIndex as number, 1)
            newFillings.splice(action.hoverIndex as number, 0, dragItem)

            return {
                ...state,
                ingredientsConstructor: [...buns, ...newFillings],
            }
        }
        case DELETE_INGREDIENT_CONSTRUCTOR: {
            const newIngredients = [...state.ingredientsConstructor]
            const actualIndex = newIngredients.findIndex(
                (item, index) =>
                    item.type !== 'bun' &&
                    newIngredients.filter(
                        (filterItem, filterIndex) =>
                            filterIndex < index && filterItem.type !== 'bun'
                    ).length === action.indexConstructor
            )
            if (actualIndex !== -1) {
                newIngredients.splice(actualIndex, 1)
            }
            return { ...state, ingredientsConstructor: newIngredients }
        }
        default: {
            return state
        }
  }
}

export default ingredientsReducer
