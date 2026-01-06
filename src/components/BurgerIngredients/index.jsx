import React from 'react';
import PropTypes from 'prop-types';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './index.module.scss';
import Data from '../../utils/data.json';

const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('bun');
    const propTypes = {

    }
    return (
        <section className="pt-10">
            <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
            <div style={{ display: 'flex' }} className="pb-10">
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div>
                {current === 'bun' && <div>
                    <h2 className="text text_type_main-medium mb-5">Булки</h2>
                    <div className={`${Styles.product_list} mt-10`}>
                        {Data.map((item, index) => {
                            if (item.type === 'bun') {
                                return (
                                    <div className={`${Styles.item} mb-8`}>
                                        <div className={Styles.pic}>
                                            <img src={item.image_large} alt={item.name} />
                                            { index === 0 && <Counter count={1} size="default" extraClass="m-1" /> }
                                        </div>
                                        <div className={Styles.price}><span>{item.price}</span> <CurrencyIcon type="primary" /> </div>
                                        <div className={Styles.name}>{item.name}</div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>}
                {current === 'sauce' && <div>
                    <h2 className="text text_type_main-medium mb-5">Соусы</h2>
                    <div className={`${Styles.product_list} mt-10`}>
                        {Data.map((item, index) => {
                            if (item.type === 'sauce') {
                                return (
                                    <div className={`${Styles.item} mb-8`}>
                                        <div className={Styles.pic}>
                                            <img src={item.image_large} alt={item.name} />
                                            { index === 0 && <Counter count={1} size="default" extraClass="m-1" /> }
                                        </div>
                                        <div className={Styles.price}><span>{item.price}</span> <CurrencyIcon type="primary" /> </div>
                                        <div className={Styles.name}>{item.name}</div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>}
                {current === 'main' && <div>
                    <h2 className="text text_type_main-medium mb-5">Начинки</h2>
                    <div className={`${Styles.product_list} mt-10`}>
                        {Data.map((item, index) => {
                            if (item.type === 'main') {
                                return (
                                    <div className={`${Styles.item} mb-8`}>
                                        <div className={Styles.pic}>
                                            <img src={item.image_large} alt={item.name} />
                                            { index === 0 && <Counter count={1} size="default" extraClass="m-1" /> }
                                        </div>
                                        <div className={Styles.price}><span>{item.price}</span> <CurrencyIcon type="primary" /> </div>
                                        <div className={Styles.name}>{item.name}</div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>}
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
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

export default BurgerIngredients;
