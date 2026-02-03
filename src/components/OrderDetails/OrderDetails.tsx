import { useAppSelector } from '../../hooks/reducerHook'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './OrderDetails.module.scss';

const OrderDetails = () => {
    const order = useAppSelector((state) => state.order)
    return (
        <div className={Styles.details}>
            <p className="text text_type_digits-large pb-8">{order?.order.number}</p>
            <p className="text text_type_main-medium pb-15">Идентификатор заказа</p>
            <p className="text text_type_main-default pb-15"><CheckMarkIcon type="primary" /></p>
            <p className="text text_type_main-default pb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive pb-15">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

export default OrderDetails;
