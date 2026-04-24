import React, { useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { Button, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import Styles from './Modal.module.scss';

interface ModalProps {
    title: string;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
        };

        document.addEventListener('keydown', handleEscape);
        
        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;
        
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        
        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        };
    }, [onClose]);

    return (
        ReactDOM.createPortal(
            <>
                <div className={Styles.modal}>
                    <div className="p-10">
                        <div className={Styles.modal_header}>
                            <h3 className="text text_type_main-large">{title}</h3>
                            <Button htmlType="button" type="secondary" onClick={onClose} aria-label="Закрыть">
                                <CloseIcon type="primary" />
                            </Button>
                        </div>
                        <div className={Styles.modal_body}>
                            {children}
                        </div>
                    </div>
                </div>
                <ModalOverlay onClose={onClose} />
            </>,
            document.getElementById('modals') as HTMLElement
        )
    );
}

export default Modal;
