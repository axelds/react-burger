import React, { useEffect, useState } from 'react';
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

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const ingredientsUrl = 'https://norma.education-services.ru/api/ingredients';

    const fetchIngredients = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(ingredientsUrl, { signal: abortController.signal });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const ingredientsData = await response.json();
        setData(ingredientsData.data);
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.log('Aborting request');
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngredients();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <AppHeader />
      <main>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </>
  );
}

export default App;
