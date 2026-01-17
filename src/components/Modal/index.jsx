import React, { useEffect, useState }  from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CloseIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './index.module.scss';

const Modal = ( {data, children} ) => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsModalOpen(false);
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
            <div className={Styles.modal}>
                <div className="p-10">
                    <div className={Styles.modal_header}>
                        <h3 className="text text_type_main-large">{data.modal_title}</h3>
                        <Button htmlType="button" type="secondary" onClick={() => {
                            setIsModalOpen(false);
                            data.onClose();
                            }}>
                            <CloseIcon type="primary" />
                        </Button>
                    </div>
                    <div className={Styles.modal_body}>
                        {children}
                    </div>
                </div>
            </div>,
            document.getElementById('root')
        )
    );
}

Modal.propTypes = {
    data: PropTypes.shape({
        modal_title: PropTypes.string.isRequired,
        onClose: PropTypes.func
    }).isRequired,
    children: PropTypes.node.isRequired
};

export default Modal;

