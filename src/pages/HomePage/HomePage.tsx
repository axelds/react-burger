import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks/useRedux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import Modal from '../../components/Modal/Modal';
import {
  createOrder,
  resetOrder,
} from '../../services/actions/order';
import {
  resetConstructor,
} from '../../services/actions/burgerConstructor';
import { resetIngredientCounts } from '../../services/actions/ingredients';
import styles from './HomePage.module.scss';
import { Ingredient, Order } from '../../utils/types';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error } = useSelector((state) => state.ingredients);
  const bun = useSelector((state) => state.burgerConstructor.bun as Ingredient | null);
  const fillings = useSelector((state) => state.burgerConstructor.fillings as Array<Ingredient & { uuid: string }>);
  const order = useSelector((state) => state.order.order as Order | null);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleOrderClick = () => {
    if (!bun) {
      return;
    }

    if (!isAuthenticated && !user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const ingredientIds = [
      bun._id,
      ...fillings.map((item) => item._id),
      bun._id,
    ];

    dispatch(createOrder(ingredientIds));
  };

  const handleCloseOrderModal = () => {
    dispatch(resetOrder());
    dispatch(resetConstructor());
    dispatch(resetIngredientCounts());
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text text_type_main-large">Загрузка ингредиентов...</div>
      );
    }

    if (error) {
      return (
        <div className="text text_type_main-large text_color_error">
          Ошибка загрузки: {error}
        </div>
      );
    }

    return (
      <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor onOrderClick={handleOrderClick} />
      </DndProvider>
    );
  };

  return (
    <>
      <main className={`${styles.main} pt-10 pb-10`}>{renderContent()}</main>
      {order && (
        <Modal title="" onClose={handleCloseOrderModal}>
          <OrderDetails orderNumber={order.number} />
        </Modal>
      )}
    </>
  );
}

export default HomePage;
