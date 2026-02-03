import { ModalOverlayProps } from '../../utils/types';
import Styles from './ModalOverlay.module.scss';

const ModalOverlay = ({ onClose }: ModalOverlayProps ) => {
    const handleOverlayClick = (event: any) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    return (
        <div className={Styles.overlay} onClick={handleOverlayClick}></div>
    );
};

export default ModalOverlay;
