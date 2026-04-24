import { ModalOverlayProps } from '../../utils/types';
import Styles from './ModalOverlay.module.scss';

const ModalOverlay = ({ onClose }: ModalOverlayProps ) => {
    const handleOverlayClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    return (
        <div data-testid="modal-overlay" className={Styles.overlay} onClick={handleOverlayClick}></div>
    );
};

export default ModalOverlay;
