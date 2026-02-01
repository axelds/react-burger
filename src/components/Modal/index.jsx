import React, { useEffect, useState }  from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import ModalOverlay from '../ModalOverlay';
import { CloseIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './index.module.scss';

const Modal = ( {data, children} ) => {

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                data.onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        createPortal(
            <>
                <div className={Styles.modal}>
                    <div className="p-10">
                        <div className={Styles.modal_header}>
                            <h3 className="text text_type_main-large">{data.modalTitle}</h3>
                            <Button htmlType="button" type="secondary" onClick={() => {
                                data.onClose();
                                }}>
                                <CloseIcon type="primary" />
                            </Button>
                        </div>
                        <div className={Styles.modal_body}>
                            {children}
                        </div>
                    </div>
                </div>
                <ModalOverlay onClose={data.onClose} />
            </>,
            document.getElementById('root')
        )
    );
}

Modal.propTypes = {
    data: PropTypes.shape({
        modalTitle: PropTypes.string.isRequired,
        onClose: PropTypes.func
    }).isRequired,
    children: PropTypes.node.isRequired
};

export default Modal;

