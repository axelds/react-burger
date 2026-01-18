import React, { useEffect, useState }  from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { useModal } from '../../hooks/useModal';
import Ingredient from '../Ingredient';
import IngrediendDetails from '../IngredientDetails';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './index.module.scss';

const BurgerIngredients = ( {data} ) => {
    if (data === null) {
        throw new Error('Expected data prop to be not null');
    }
    const [current, setCurrent] = React.useState('bun');
    const { isModalOpen, openModal, closeModal } = useModal();
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
                                    <Ingredient data={item} index={index} key={item._id} onClick={() => {
                                        openModal();
                                        setCurrentModalData(item);
                                    }}/>
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
                                    <Ingredient data={item} index={index} key={item._id} onClick={() => {
                                        openModal();
                                        setCurrentModalData(item);
                                    }}/>
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
                                    <Ingredient data={item} index={index} key={item._id} onClick={() => {
                                        openModal();
                                        setCurrentModalData(item);
                                    }}/>
                                )
                            }
                        })}
                    </div>
                </div>}
            </div>
            {isModalOpen && (
                <Modal data={{modalTitle: 'Детали ингредиента', onClose: () => closeModal()}}>
                    <IngrediendDetails details={currentModalData} />
                </Modal>
            )}
        </section>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.array,
};

export default BurgerIngredients;

