import type React from 'react';
import { useDrag } from 'react-dnd';
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import type { Ingredient, DragItem } from '../../utils/types';
import { INGREDIENT_TYPE } from '../../utils/types';

import Styles from './IngredientCard.module.scss';

interface IngredientCardProps {
    ingredient: Ingredient
    onClick: (ingredient: Ingredient) => void
    getIngredientCount: (ingredient: Ingredient) => number
}

const IngredientCard: React.FC<IngredientCardProps> = ({
    ingredient,
    getIngredientCount,
    onClick,
}) => {
    const [{ isDragging }, dragRef] = useDrag<
        DragItem,
        unknown,
        { isDragging: boolean }
    >({
        type: INGREDIENT_TYPE,
        item: { type: INGREDIENT_TYPE, ingredient },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    return (
        <div className={`${Styles.item} mb-8`} onClick={() => onClick(ingredient)} ref={dragRef as any} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
            <div className={Styles.pic}>
                <img src={ingredient.image_large} alt={ingredient.name} />
                {getIngredientCount(ingredient) > 0 && (
                    <Counter
                        count={getIngredientCount(ingredient)}
                        size="default"
                        extraClass="m-1"
                    />
                )}
            </div>
            <div className={Styles.price}><span>{ingredient.price}</span> <CurrencyIcon type="primary" /> </div>
            <div className={Styles.name}>{ingredient.name}</div>
        </div>
    )
}

export default IngredientCard
