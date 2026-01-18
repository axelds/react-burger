import React, { useEffect, useState }  from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { useModal } from '../../hooks/useModal';
import OrderDetails from '../OrderDetails';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './index.module.scss';

const BurgerConstructor = ({ data }) => {
    if (data === null) {
        throw new Error('Expected data prop to be not null');
    }

    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <section className={`${Styles.list} pt-25`}>
            {data.filter(item => item.type === 'bun').map((item, index) => {
                    return (
                        <div key={item._id} className={`${Styles.draggable} pl-8`}>
                            <ConstructorElement
                                type={index === 0 ? 'top' : 'bottom'}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                isLocked="true"
                            />
                        </div>
                    )
            })}
            <div className={Styles.draggable_list}>
                {data.filter(item => item.type !== 'bun').map((item) => {
                    return (
                        <div key={item._id} className={Styles.draggable}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                type={item.type}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                isLocked="false"
                            />
                        </div>
                    )
                })}
            </div>
            <div className={`${Styles.total} mt-10`}>
                <div className="mr-10"><span>610</span> <CurrencyIcon type="primary" /></div>
                <Button htmlType="button" type="primary" size="large" onClick={() => openModal()}>
                    Оформить заказ
                </Button>
            </div>
            {isModalOpen && (
                <Modal data={{modalTitle: '', onClose: () => closeModal()}}>
                    <OrderDetails />
                </Modal>
            )}
        </section>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.array
}

export default BurgerConstructor;
