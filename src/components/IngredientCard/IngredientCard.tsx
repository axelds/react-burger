import type React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import {
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import type { Ingredient, DragItem } from '../../utils/types';
import { INGREDIENT_TYPE } from '../../utils/types';

import Styles from './IngredientCard.module.scss';

interface IngredientCardProps {
    ingredient: Ingredient
    onClick: (ingredient: Ingredient) => void
    getIngredientCount?: (ingredient: Ingredient) => number
}

const IngredientCard: React.FC<IngredientCardProps> = ({
    ingredient
}) => {
    const { count, _id } = ingredient;
    const location = useLocation();
    
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

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        return;
        }
    };

    return (
        <div className={`${Styles.item} mb-8`} ref={dragRef as unknown as React.RefObject<HTMLDivElement>} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
            <Link
                to={`/ingredients/${_id}`}
                state={{ background: location }}
                onClick={handleClick}
            >
                <div className={Styles.pic} data-testid="ingredient-card">
                    <img src={ingredient.image_large} alt={ingredient.name} />
                    <Counter
                            count={count ?? 0}
                            size="default"
                            extraClass="m-1"
                        />
                </div>
                <div className={Styles.price}><span>{ingredient.price}</span> <CurrencyIcon type="primary" /> </div>
                <div className={Styles.name}>{ingredient.name}</div>
            </Link>
        </div>
    )
}

export default IngredientCard
