import { MODAL_OPEN_INGREDIENT, MODAL_OPEN_ORDER, MODAL_CLOSE } from '../actions/modal';
import { StateModal, Action } from '../../utils/types';

const initialState: StateModal = {
  isModalDetail: false,
  isModalOrder: false,
  ingredientDetail: null,
}

const modalReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case MODAL_OPEN_INGREDIENT: {
              return {
                  ...state,
                  isModalDetail: true,
                  ingredientDetail: action.ingredientDetail,
              }
    }
    case MODAL_OPEN_ORDER: {
              return {
                  ...state,
                  isModalOrder: true,
              }
    }
    case MODAL_CLOSE: {
              return {
                  ...state,
                  isModalOrder: false,
                  ingredientDetail: null,
                  isModalDetail: false,
              }
    }
  
    default: {
        return state
    }
  }
}

export default modalReducer
