import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from '../../hooks/useRedux';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import Styles from './IngredientPage.module.scss';
import { Ingredient } from '../../utils/types';

const IngredientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ingredients = useSelector((state) => state.ingredients.items as Ingredient[]);
  const ingredient = ingredients.find((item) => item._id === id);

  if (!ingredient) {
    return (
      <div className={Styles.container}>
        <h1 className="text text_type_main-large mb-6">Ингредиент не найден</h1>
        <button
          onClick={() => navigate(-1)}
          className="text text_type_main-default text_color_accent"
        >
          Вернуться назад
        </button>
      </div>
    );
  }

  return (
    <div className={Styles.container}>
      <IngredientDetails />
    </div>
  );
};

export default IngredientPage;
