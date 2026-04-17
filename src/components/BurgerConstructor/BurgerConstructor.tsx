import React, { useCallback, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from '../../hooks/useRedux';
import { Ingredient, DragItem } from '../../utils/types';
import {
  setConstructorBun,
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  moveIngredientInConstructor,
} from '../../services/actions/burgerConstructor';
import ConstructorIngredientItem from './ConstructorIngredient';
import {
  incrementIngredientCount,
  decrementIngredientCount,
} from '../../services/actions/ingredients';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './BurgerConstructor.module.scss';

interface BurgerConstructorProps {
  onOrderClick?: () => void;
}
const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ onOrderClick }) => {
    const dispatch = useDispatch();

    const bun = useSelector((state) => state.burgerConstructor.bun as Ingredient | null);

    const fillings = useSelector((state) => state.burgerConstructor.fillings as Array<Ingredient & { uuid: string }>);

    const totalPrice = useMemo(() => {
        const bunTotal = bun ? bun.price * 2 : 0;
        const fillingsTotal = fillings.reduce((sum, item) => sum + item.price, 0);
        return bunTotal + fillingsTotal;
    }, [bun, fillings]);

    const handleDrop = useCallback(
        (ingredient: Ingredient) => {
        if (ingredient.type === 'bun') {
            if (bun && bun._id === ingredient._id) {
            return;
            }
            if (bun) {
            dispatch(decrementIngredientCount(bun._id, 2));
            }
            dispatch(setConstructorBun(ingredient));
            dispatch(incrementIngredientCount(ingredient._id, 2));
        } else {
            dispatch(addIngredientToConstructor(ingredient));
            dispatch(incrementIngredientCount(ingredient._id));
        }
        },
        [bun, dispatch],
    );

    const handleRemoveIngredient = useCallback(
        (uuid: string, ingredientId: string) => {
        dispatch(removeIngredientFromConstructor(uuid));
        dispatch(decrementIngredientCount(ingredientId));
        },
        [dispatch],
    );

    const [{ isOver, canDrop }, dropRef] = useDrop<
        DragItem,
        unknown,
        { isOver: boolean; canDrop: boolean }
    >({
        accept: 'ingredient',
        drop: (ingredient ) => handleDrop(ingredient.ingredient),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const dropAreaStyle = {
        backgroundColor:
            isOver && canDrop ? 'rgba(76, 76, 255, 0.1)' : 'transparent',
        border: canDrop ? '2px dashed rgba(76, 76, 255, 0.5)' : 'none',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
    }

    const handleReorderIngredients = useCallback(
        (fromIndex: number, toIndex: number) => {
            dispatch(moveIngredientInConstructor(fromIndex, toIndex));
        },
        [dispatch],
    );

    const isOrderDisabled = !bun || fillings.length === 0;

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
                    {fillings.map((ingredient, index) => (
                        <ConstructorIngredientItem
                            key={ingredient.uuid}
                            item={ingredient}
                            index={index}
                            moveCard={handleReorderIngredients}
                            onRemove={handleRemoveIngredient}
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
                <Button htmlType="button" type="primary" size="large" onClick={onOrderClick} disabled={isOrderDisabled}>
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
        </section>
    );
}

export default BurgerConstructor;
