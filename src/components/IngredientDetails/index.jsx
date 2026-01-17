import React from 'react';
import Styles from './index.module.scss';

const IngrediendDetails = ( {details} ) => {
    return (
        <div className={Styles.details}>
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
        </div>
    );
}

export default IngrediendDetails;
