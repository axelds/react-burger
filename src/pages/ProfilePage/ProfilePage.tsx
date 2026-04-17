import React from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from '../../hooks/useRedux';
import { logout } from '../../services/actions/auth';
import ProfileSettings from './ProfileSettings/ProfileSettings';
import ProfileOrders from './ProfileOrders/ProfileOrders';
import Styles from './ProfilePage.module.scss';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isOrdersPage = location.pathname.includes('/orders');
  const isProfilePage = location.pathname === '/profile';

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <main className={`${Styles.main} pt-10 pb-10`}>
        <nav className={Styles.nav}>
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `${Styles.navLink} text text_type_main-medium ${
                isActive ? 'text_color_primary' : 'text_color_inactive'
              }`
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              `${Styles.navLink} text text_type_main-medium ${
                isActive ? 'text_color_primary' : 'text_color_inactive'
              }`
            }
          >
            История заказов
          </NavLink>
          <button
            type="button"
            onClick={handleLogout}
            className={`${Styles.navLink} ${Styles.logoutButton} text text_type_main-medium text_color_inactive`}
          >
            Выход
          </button>
          {isProfilePage && (
            <p className={`text text_type_main-default text_color_inactive mt-20 ${Styles.description}`}>
             В этом разделе вы можете изменить свои персональные данные
            </p>
          )}
          {isOrdersPage && (
            <p className={`text text_type_main-default text_color_inactive mt-20 ${Styles.description}`}>
              В этом разделе вы можете просмотреть свою историю заказов
            </p>
          )}
        </nav>
        <div className={Styles.main}>
          <Routes>
            <Route index element={<ProfileSettings />} />
            <Route path="orders" element={<ProfileOrders />} />
          </Routes>
        </div>
    </main>
  );
};

export default ProfilePage;
