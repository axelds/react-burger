import { JSX } from "react"

export const INGREDIENT_TYPE = 'ingredient'
export const CONSTRUCTOR_INGREDIENT_TYPE = 'constructor-ingredient'

export interface Ingredient {
    _id: string
    name: string
    type: 'bun' | 'sauce' | 'main'
    price: number;
    image: string;
    image_mobile?: string;
    image_large?: string;
    calories?: number;
    proteins?: number;
    fat?: number;
    carbohydrates?: number;
    count?: number;
    __v?: number;
    uniqueId?: string;
    uuid?: string;
}

export interface IngredientsState {
  items: Ingredient[];
  isLoading: boolean;
  error: string | null;
  ingredientsFailed?: boolean;
}

export interface DragItem {
    type: typeof INGREDIENT_TYPE
    ingredient: Ingredient
}

export interface ConstructorDragItem {
    type: typeof CONSTRUCTOR_INGREDIENT_TYPE
    ingredient: Ingredient
    index: number
}

export interface ModalContentType {
    isModal: null | 'order' | 'ingredient'
    content?: undefined | JSX.Element | JSX.Element[]
    ingredients?: Ingredient[]
    ingredient?: null | Ingredient
}

export interface Order {
    _id?: string;
    number: number;
    name?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    ingredients?: string[];
}

export interface StateIngredients {
    ingredients: Ingredient[]
    ingredientsRequest: boolean
    ingredientsFailed: boolean,
    ingredientsConstructor: Ingredient[]
}

export interface StateModal {
    isModalDetail: boolean
    isModalOrder: boolean,
    ingredientDetail: null | Ingredient
}

export interface StateOrder {
    order: null | Order
    orderRequest: boolean
    orderFailed: boolean
}

export interface Action {
    type: string
    id?: string
    ingredients?: Ingredient[]
    ingredient?: Ingredient
    ingredientDetail?: Ingredient
    indexConstructor?: number
    order?: Order
    dragIndex?: number
    hoverIndex?: number
}

export interface ModalOverlayProps {
    onClose: () => void
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}

export interface User {
    email: string;
    name: string;
}

export interface OrderState {
    order: Order | null;
    isLoading: boolean;
    error: string | null;
}

export interface FeedOrder {
    _id: string;
    number: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    ingredients: string[];
}

export interface FeedResponse {
    success: boolean;
    orders: FeedOrder[];
    total: number;
    totalToday: number;
}

export interface FormValues {
    [key: string]: string;
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

export interface UserOrdersState {
    orders: FeedOrder[];
    total: number;
    totalToday: number;
    wsConnected: boolean;
    error?: string;
}

export interface PasswordState {
    isLoading: boolean;
    error: string | null;
    message: string | null;
}

export interface FeedState {
    orders: FeedOrder[];
    total: number;
    totalToday: number;
    wsConnected: boolean;
    error?: string;
}

export interface CurrentIngredientState {
    item: Ingredient | null;
}

export interface ConstructorIngredient extends Ingredient {
  uuid: string;
}

export interface BurgerConstructorState {
  bun: Ingredient | null;
  fillings: ConstructorIngredient[];
}

export interface RootState {
    ingredients: IngredientsState;
    burgerConstructor: BurgerConstructorState;
    currentIngredient: CurrentIngredientState;
    order: OrderState;
    password: PasswordState;
    auth: AuthState;
    feed: FeedState;
    userOrders: UserOrdersState;
}

// auth
export interface RegisterRequestAction {
  type: 'REGISTER_REQUEST';
}

export interface RegisterSuccessAction {
  type: 'REGISTER_SUCCESS';
  payload: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface RegisterFailureAction {
  type: 'REGISTER_FAILURE';
  payload: string;
}

export interface LoginRequestAction {
  type: 'LOGIN_REQUEST';
}

export interface LoginSuccessAction {
  type: 'LOGIN_SUCCESS';
  payload: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface LoginFailureAction {
  type: 'LOGIN_FAILURE';
  payload: string;
}

export interface LogoutRequestAction {
  type: 'LOGOUT_REQUEST';
}

export interface LogoutSuccessAction {
  type: 'LOGOUT_SUCCESS';
}

export interface LogoutFailureAction {
  type: 'LOGOUT_FAILURE';
  payload: string;
}

export interface UpdateTokenRequestAction {
  type: 'UPDATE_TOKEN_REQUEST';
}

export interface UpdateTokenSuccessAction {
  type: 'UPDATE_TOKEN_SUCCESS';
  payload: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface UpdateTokenFailureAction {
  type: 'UPDATE_TOKEN_FAILURE';
  payload: string;
}

export interface GetUserRequestAction {
  type: 'GET_USER_REQUEST';
}

export interface GetUserSuccessAction {
  type: 'GET_USER_SUCCESS';
  payload: User;
}

export interface GetUserFailureAction {
  type: 'GET_USER_FAILURE';
  payload: string | null;
}

export interface UpdateUserRequestAction {
  type: 'UPDATE_USER_REQUEST';
}

export interface UpdateUserSuccessAction {
  type: 'UPDATE_USER_SUCCESS';
  payload: User;
}

export interface UpdateUserFailureAction {
  type: 'UPDATE_USER_FAILURE';
  payload: string;
}

export interface InitAuthAction {
  type: 'INIT_AUTH';
  payload: {
    accessToken: string;
    refreshToken: string;
  };
}

// Password Actions
export interface ResetPasswordRequestAction {
  type: 'RESET_PASSWORD_REQUEST';
}

export interface ResetPasswordSuccessAction {
  type: 'RESET_PASSWORD_SUCCESS';
  payload: string;
}

export interface ResetPasswordFailureAction {
  type: 'RESET_PASSWORD_FAILURE';
  payload: string;
}

export interface ResetPasswordResetAction {
  type: 'RESET_PASSWORD_RESET';
}

// Ingredients
export interface FetchIngredientsRequestAction {
  type: 'FETCH_INGREDIENTS_REQUEST';
}

export interface FetchIngredientsSuccessAction {
  type: 'FETCH_INGREDIENTS_SUCCESS';
  payload: Ingredient[];
}

export interface FetchIngredientsFailureAction {
  type: 'FETCH_INGREDIENTS_FAILURE';
  payload: string;
}

export interface IncrementIngredientCountAction {
  type: 'INCREMENT_INGREDIENT_COUNT';
  payload: {
    id: string;
    amount: number;
  };
}

export interface DecrementIngredientCountAction {
  type: 'DECREMENT_INGREDIENT_COUNT';
  payload: {
    id: string;
    amount: number;
  };
}

export interface ResetIngredientCountsAction {
  type: 'RESET_INGREDIENT_COUNTS';
}

export type IngredientsAction =
  | FetchIngredientsRequestAction
  | FetchIngredientsSuccessAction
  | FetchIngredientsFailureAction
  | IncrementIngredientCountAction
  | DecrementIngredientCountAction
  | ResetIngredientCountsAction;

export type UserOrdersAction =
  | {
      type: 'WS_USER_ORDERS_CONNECTION_START';
      payload?: string;
    }
  | {
      type: 'WS_USER_ORDERS_CONNECTION_SUCCESS';
    }
  | {
      type: 'WS_USER_ORDERS_CONNECTION_ERROR';
      payload: string;
    }
  | {
      type: 'WS_USER_ORDERS_CONNECTION_CLOSED';
    }
  | {
      type: 'WS_USER_ORDERS_GET_MESSAGE';
      payload: FeedResponse;
    };

    // Burger Constructor Actions
export interface SetConstructorBunAction {
  type: 'SET_CONSTRUCTOR_BUN';
  payload: Ingredient;
}

export interface AddIngredientToConstructorAction {
  type: 'ADD_INGREDIENT_TO_CONSTRUCTOR';
  payload: ConstructorIngredient;
}

export interface RemoveIngredientFromConstructorAction {
  type: 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
  payload: string; // uuid
}

export interface MoveIngredientInConstructorAction {
  type: 'MOVE_INGREDIENT_IN_CONSTRUCTOR';
  payload: {
    fromIndex: number;
    toIndex: number;
  };
}

export interface ResetConstructorAction {
  type: 'RESET_CONSTRUCTOR';
}

export type BurgerConstructorAction =
  | SetConstructorBunAction
  | AddIngredientToConstructorAction
  | RemoveIngredientFromConstructorAction
  | MoveIngredientInConstructorAction
  | ResetConstructorAction;

// Current Ingredient Actions
export interface SetCurrentIngredientAction {
  type: 'SET_CURRENT_INGREDIENT';
  payload: Ingredient;
}

export interface ClearCurrentIngredientAction {
  type: 'CLEAR_CURRENT_INGREDIENT';
}

export type CurrentIngredientAction =
  | SetCurrentIngredientAction
  | ClearCurrentIngredientAction;

// Order Actions
export interface CreateOrderRequestAction {
  type: 'CREATE_ORDER_REQUEST';
}

export interface CreateOrderSuccessAction {
  type: 'CREATE_ORDER_SUCCESS';
  payload: Order;
}

export interface CreateOrderFailureAction {
  type: 'CREATE_ORDER_FAILURE';
  payload: string;
}

export interface ResetOrderAction {
  type: 'RESET_ORDER';
}

// WebSocket
export type FeedAction =
  | {
      type: 'WS_FEED_CONNECTION_START';
    }
  | {
      type: 'WS_FEED_CONNECTION_SUCCESS';
    }
  | {
      type: 'WS_FEED_CONNECTION_ERROR';
      payload: string;
    }
  | {
      type: 'WS_FEED_CONNECTION_CLOSED';
    }
  | {
      type: 'WS_FEED_GET_MESSAGE';
      payload: FeedResponse;
    };


export type OrderAction =
  | CreateOrderRequestAction
  | CreateOrderSuccessAction
  | CreateOrderFailureAction
  | ResetOrderAction;

export type PasswordAction =
  | ResetPasswordRequestAction
  | ResetPasswordSuccessAction
  | ResetPasswordFailureAction
  | ResetPasswordResetAction;


export type AuthAction =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction
  | UpdateTokenRequestAction
  | UpdateTokenSuccessAction
  | UpdateTokenFailureAction
  | GetUserRequestAction
  | GetUserSuccessAction
  | GetUserFailureAction
  | UpdateUserRequestAction
  | UpdateUserSuccessAction
  | UpdateUserFailureAction
  | InitAuthAction;

export type RootAction =
  | AuthAction
  | BurgerConstructorAction
  | CurrentIngredientAction
  | IngredientsAction
  | OrderAction
  | PasswordAction
  | FeedAction
  | UserOrdersAction;