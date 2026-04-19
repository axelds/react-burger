import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from './hooks/useRedux';
// @ts-ignore
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/fonts/fonts.css';
// @ts-ignore
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
// @ts-ignore
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import './App.module.scss';
import AppHeader from './components/AppHeader/AppHeader';
import ProtectedRouteElement from './components/ProtectedRouteElement/ProtectedRouteElement';
import Modal from './components/Modal/Modal';
import IngredientDetails from './components/IngredientDetails/IngredientDetails';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, ProfileOrders, ProfileOrderDetails, Feed, FeedOrderDetails, NotFoundPage, IngredientPage } from './pages';
import { initAuth } from './services/actions/auth';
import { fetchIngredients } from './services/actions/ingredients';

const IngredientModal: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Modal title="Детали ингредиента" onClose={handleClose}>
      <IngredientDetails />
    </Modal>
  );
};

const FeedOrderModal: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Modal title="" onClose={handleClose}>
      <FeedOrderDetails />
    </Modal>
  );
};

const ProfileOrderModal: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Modal title="" onClose={handleClose}>
      <ProfileOrderDetails />
    </Modal>
  );
};

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = (location.state as any)?.background;

  useEffect(() => {
    dispatch(initAuth());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        {!background && <Route path="/ingredients/:id" element={<IngredientPage />} />}
        <Route
          path="/login"
          element={
            <ProtectedRouteElement onlyUnauth>
              <LoginPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRouteElement onlyUnauth>
              <RegisterPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRouteElement onlyUnauth>
              <ForgotPasswordPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRouteElement onlyUnauth>
              <ResetPasswordPage />
            </ProtectedRouteElement>
          }
        />
        <Route path="/feed" element={<Feed />} />
        <Route
          path="/feed/:id"
          element={
            !background ? (
              <FeedOrderDetails />
            ) : null
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement>
              <ProfilePage />
            </ProtectedRouteElement>
          }
          >
          <Route path="orders" element={<ProfileOrders />} />
        </Route>
        {!background && (
        <Route
            path="/profile/orders/:id"
            element={
              <ProtectedRouteElement>
                <ProfileOrderDetails />
              </ProtectedRouteElement>
            }
          />
        )}
        <Route path="orders" element={<ProfileOrders />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <IngredientModal />
            }
          />
          <Route
            path="/feed/:id"
            element={
              <FeedOrderModal />
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <ProtectedRouteElement>
                <ProfileOrderModal />
              </ProtectedRouteElement>
            }
          />
        </Routes>
      )}
    </>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;