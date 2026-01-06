import React from 'react';
// @ts-ignore
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/fonts/fonts.css';
// @ts-ignore
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
// @ts-ignore
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import './App.module.scss';
import AppHeader from './components/AppHeader';
import BurgerIngredients from './components/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor';

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App;
