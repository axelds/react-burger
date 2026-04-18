import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../hooks/useRedux';
import { Ingredient } from '../../utils/types';
import Styles from './IngredientDetails.module.scss';

const IngredientDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const ingredients = useSelector((state) => state.ingredients.items as Ingredient[]);
    const details = ingredients.find((item) => item._id === id);

    if (!details) {
        return null;
    }

    return (
        <section className={Styles.details}>
            <div className={`${Styles.image} pb-4`}><img src={details.image_large} alt={details.name} /></div>
            <div className="text text_type_main-medium pb-8">{details.name}</div>
            <div className={`${Styles.meta} text text_type_main-default text_color_inactive`}>
                <div>
                    <p>Калории,ккал</p>
                    <p className="text text_type_digits-default">{details.calories}</p>
                </div>
                <div>
                    <p>Белки, г</p>
                    <p className="text text_type_digits-default">{details.proteins}</p>
                </div>
                <div>
                    <p>Жиры, г</p>
                    <p className="text text_type_digits-default">{details.fat}</p>
                </div>
                <div>
                    <p>Углеводы, г</p>
                    <p className="text text_type_digits-default">{details.carbohydrates}</p>
                </div>
            </div>
        </section>
    );
}

export default IngredientDetails;