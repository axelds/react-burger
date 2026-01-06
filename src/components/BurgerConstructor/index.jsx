import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './index.module.scss';
import Data from '../../utils/data.json';

const BurgerConstructor = () => {
    return (
        <section className="pt-25">
            <div className={Styles.draggable_list}>
                {Data.map((item, index) => {
                    return (
                        <div className={Styles.draggable}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                type="undefined"
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </div>
                    )
                })}
            </div>
            <div className={`${Styles.total} mt-10`}>
                <div className="mr-10"><span>610</span> <CurrencyIcon type="primary" /></div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
}

export default BurgerConstructor;
