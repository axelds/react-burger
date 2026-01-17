import React from 'react';
import PropTypes from 'prop-types';
import Styles from './index.module.scss';

const ModalOverlay = ({ onClose }) => {
    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={Styles.overlay} onClick={handleOverlayClick}>
        </div>
    );
};

ModalOverlay.propTypes = {
    onClose: PropTypes.func
};

export default ModalOverlay;

