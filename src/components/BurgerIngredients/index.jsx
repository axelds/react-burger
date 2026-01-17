import React, { useEffect, useState }  from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import ModalOverlay from '../ModalOverlay';
import IngrediendDetails from '../IngredientDetails';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './index.module.scss';

const BurgerIngredients = ( {data} ) => {
    if (data === null) {
        throw new Error('Expected data prop to be not null');
    }
    const [current, setCurrent] = React.useState('bun');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentModalData, setCurrentModalData] = useState(null);

    return (
        <section className="pt-10">
            <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
            <div className={`${Styles.flex} pb-10`}>
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
                        {data.map((item, index) => {
                            if (item.type === 'bun') {
                                return (
                                    <div key={item._id} className={`${Styles.item} mb-8`} onClick={() => {
                                        setIsModalOpen(true);
                                        setCurrentModalData(item);
                                    }}>
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
                        {data.map((item, index) => {
                            if (item.type === 'sauce') {
                                return (
                                    <div key={item._id} className={`${Styles.item} mb-8`} onClick={() => {
                                        setIsModalOpen(true);
                                        setCurrentModalData(item);
                                    }}>
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
                        {data.map((item, index) => {
                            if (item.type === 'main') {
                                return (
                                    <div key={item._id} className={`${Styles.item} mb-8`} onClick={() => {
                                        setIsModalOpen(true);
                                        setCurrentModalData(item);
                                    }}>
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
            {isModalOpen && (
                <Modal data={{modal_title: 'Детали ингредиента', onClose: () => setIsModalOpen(false)}}>
                    <IngrediendDetails details={currentModalData} />
                </Modal>
            )}
            {isModalOpen && (
                <ModalOverlay onClose={() => setIsModalOpen(false)}/>
            )}
        </section>
    );
}

export default BurgerIngredients;
