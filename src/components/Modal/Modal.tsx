import { JSX } from 'react';
import { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { MODAL_CLOSE } from '../../services/actions/modal';
import { useAppDispatch } from '../../hooks/reducerHook';
import Styles from './Modal.module.scss';

interface ModalProps {
    children?: JSX.Element | JSX.Element[]
    title?: string
}

const Modal = ({ children, title }: ModalProps ) => {

    const dispatch = useAppDispatch()

    const closeWindow = useCallback(() => {
        dispatch({ type: MODAL_CLOSE })
    }, [dispatch])

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeWindow()
            }
        }
        window.addEventListener('keydown', handleEsc)
        return () => {
            window.removeEventListener('keydown', handleEsc)
        }
    }, [closeWindow])

    return (
        ReactDOM.createPortal(
            <>
                <div className={Styles.modal}>
                    <div className="p-10">
                        <div className={Styles.modal_header}>
                            <h3 className="text text_type_main-large">{title}</h3>
                            <Button htmlType="button" type="secondary" onClick={closeWindow}>
                                <CloseIcon type="primary" />
                            </Button>
                        </div>
                        <div className={Styles.modal_body}>
                            {children}
                        </div>
                    </div>
                </div>
                <ModalOverlay onClose={closeWindow} />
            </>,
            document.getElementById('modals') as HTMLElement
        )
    );
}

export default Modal;
