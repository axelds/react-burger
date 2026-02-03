import { JSX } from "react"

export const INGREDIENT_TYPE = 'ingredient'
export const CONSTRUCTOR_INGREDIENT_TYPE = 'constructor-ingredient'

export interface Ingredient {
    _id: string
    name: string
    type: 'bun' | 'sauce' | 'main'
    proteins: number
    fat: number
    carbohydrates: number
    calories: number
    price: number
    image: string
    image_mobile: string
    image_large: string
    __v: number
    uniqueId?: string
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
    name: string
    order: { number: number }
    succsess: boolean
}


export interface State {
    ingredients: Ingredient[]
    ingredientsRequest: boolean
    ingredientsFailed: boolean
    ingredientDetail: null | Ingredient
    ingredientsConstructor: Ingredient[]
    isModalDetail: boolean
    isModalOrder: boolean
    order: null | Order
    orderRequest: boolean
    orderFailed: boolean
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
