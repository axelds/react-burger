import React from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './index.module.scss';

const Ingredient = ( { data, index, onClick }) => {

    return (
        <div key={data._id} className={`${Styles.item} mb-8`} onClick={() => onClick(data)}>
            <div className={Styles.pic}>
                <img src={data.image_large} alt={data.name} />
                    { index === 0 && <Counter count={1} size="default" extraClass="m-1" /> }
            </div>
            <div className={Styles.price}><span>{data.price}</span> <CurrencyIcon type="primary" /> </div>
            <div className={Styles.name}>{data.name}</div>
        </div>
    );
};

Ingredient.propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
    onClick: PropTypes.func
};

export default Ingredient;

