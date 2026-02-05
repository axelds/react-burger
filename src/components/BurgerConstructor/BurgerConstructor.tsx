import { useDrop } from 'react-dnd';
import { Ingredient, DragItem, INGREDIENT_TYPE } from '../../utils/types';
import { addIngridient, DELETE_INGREDIENT_CONSTRUCTOR, MOVE_INGREDIENT_CONSTRUCTOR } from '../../services/actions/ingredients';
import { postOrder } from '../../services/actions/order';
import { useAppDispatch, useAppSelector } from '../../hooks/reducerHook';
import ConstructorIngredient from './ConstructorIngredient';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './BurgerConstructor.module.scss';

const BurgerConstructor = () => {
    const dispatch = useAppDispatch()
    const ingredients = useAppSelector((state) => state.ingredientsConstructor)
    const isModalOpen = useAppSelector((state) => state.isModalOrder)

    const onDropIngredient = (ingredient: Ingredient) => {
        dispatch(addIngridient(ingredient))
    }

    const [{ isOver, canDrop }, dropRef] = useDrop<
        DragItem,
        unknown,
        { isOver: boolean; canDrop: boolean }
    >({
        accept: INGREDIENT_TYPE,
        drop: (item) => {
            onDropIngredient?.(item.ingredient)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const bun = ingredients.find(
        (ingredient: { type: string }) => ingredient.type === 'bun'
    )

    const fillings = ingredients.filter(
        (ingredient: { type: string }) => ingredient.type !== 'bun'
    )

    const totalPrice = ingredients.reduce(
        (sum: any, ingredient: { type: string; price: number }) => {
            return (
                sum +
                (ingredient.type === 'bun'
                    ? ingredient.price * 2
                    : ingredient.price)
            )
        },
        0
    )

    const handleRemove = (index: number) => {
        dispatch({
            type: DELETE_INGREDIENT_CONSTRUCTOR,
            indexConstructor: index,
        })
    }

    const dropAreaStyle = {
        backgroundColor:
            isOver && canDrop ? 'rgba(76, 76, 255, 0.1)' : 'transparent',
        border: canDrop ? '2px dashed rgba(76, 76, 255, 0.5)' : 'none',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
    }

    const handleOrder = async () => {
        dispatch(postOrder(ingredients))
    }

    const handleReorderIngredients = (
        dragIndex: number,
        hoverIndex: number
    ) => {
        dispatch({
            type: MOVE_INGREDIENT_CONSTRUCTOR,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex,
        })
    }

    return (
        <section className={`${Styles.list} pt-25`} ref={dropRef as any} style={dropAreaStyle}>

            {bun && (
                <div className={`${Styles.draggable} pl-8`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
            )}

                <div className={Styles.draggable_list}>
                    {fillings.map((ingredient: Ingredient, index) => (
                        <ConstructorIngredient
                            key={ingredient.uniqueId}
                            ingredient={ingredient}
                            index={index}
                            moveIngredient={handleReorderIngredients}
                            onRemove={handleRemove}
                        />
                    ))}
                </div>

            {bun && (
                <div className={`${Styles.draggable} pl-8`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                           thumbnail={bun.image}
                    />
                </div>
            )}

            <div className={`${Styles.total} mt-10`}>
                <div className="mr-10"><span>{totalPrice}</span> <CurrencyIcon type="primary" /></div>
                <Button htmlType="button" type="primary" size="large" onClick={handleOrder} disabled={ingredients.length === 0}>
                    Оформить заказ
                </Button>
            </div>

            {fillings.length === 0 && !bun && (
                <div className={Styles.empty_text}>
                    <p className="text text_type_main-medium">
                        Выберите ингредиенты
                    </p>
                </div>
            )}

            {isModalOpen && (
                <Modal>
                    <OrderDetails />
                </Modal>
            )}
        </section>
    );
}

export default BurgerConstructor;
