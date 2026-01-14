import React from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './index.module.scss';
import Data from '../../utils/data.json';

const BurgerConstructor = () => {
    return (
        <section className="pt-25">
            <div className={Styles.draggable_list}>
                {Data.map((item, index) => {
                    return (
                        <div key={item._id} className={Styles.draggable}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                type={index === 0 ? 'top' : index === Data.length - 1 ? 'bottom' : 'undefined'}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                isLocked={index === 0 || index === Data.length - 1 ? true : false}
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

export default BurgerConstructor;
