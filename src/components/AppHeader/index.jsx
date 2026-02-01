import { Logo, Button, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './index.module.scss';

const AppHeader = () => {
  return (
      <header className="p-4">
        <nav>
          <Button htmlType="button" type="undefined" extraClass={`${Styles.active} pt-4 pr-5 pb-4 pl-5`}>
            <BurgerIcon />
            Конструктор
          </Button>
          <Button htmlType="button" type="undefined" extraClass="pt-4 pr-5 pb-4 pl-5">
            <ListIcon />
            Лента заказов
          </Button>
        </nav>
        <Logo />
        <nav>
          <Button htmlType="button" type="undefined" extraClass="pt-4 pr-5 pb-4 pl-5">
            <ProfileIcon />
            Личный кабинет
          </Button>
        </nav>
      </header>
  );
}

export default AppHeader;
