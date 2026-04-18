import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import Styles from './AppHeader.module.scss';

const AppHeader: React.FC = () => {
  return (
      <header className="p-4">
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => 
              `${Styles.navItem} pt-4 pr-5 pb-4 pl-5 ${isActive ? Styles.active : ''}`
            }
            end
          >
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <span className={`text text_type_main-default`}>
                  Конструктор
                </span>
              </>
            )}
          </NavLink>
          <NavLink
            to="/feed"
            className={({ isActive }) => 
              `${Styles.navItem} pt-4 pr-5 pb-4 pl-5 ${isActive ? Styles.active : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <span className={`text text_type_main-default`}>
                  Лента заказов
                </span>
              </>
            )}
          </NavLink>
        </nav>
        <NavLink to="/">
          <Logo />
        </NavLink>
        <nav>
          <NavLink
            to="/profile"
            className={({ isActive }) => 
              `${Styles.navItem} ${Styles.accountLink} pt-4 pr-5 pb-4 pl-5 ${isActive ? Styles.active : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                <span className={`text text_type_main-default`}>
                  Личный кабинет
                </span>
              </>
            )}
          </NavLink>
        </nav>
      </header>
  );
}

export default AppHeader;
