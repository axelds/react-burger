import React, { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks/useRedux';
import { WSS_URL } from '../../utils/constants';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { wsFeedConnectionStart, wsFeedConnectionClosed } from '../../services/actions/feed';
import Styles from './Feed.module.scss';
import { FeedOrder, Ingredient } from '../../utils/types';

const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const ingredients = useSelector((state) => state.ingredients.items as Ingredient[]);
  const feedState = useSelector((state) => state.feed);

  useEffect(() => {
    const wsBaseUrl = WSS_URL;
    const wsUrl = `${wsBaseUrl}/orders/all`;
    dispatch(wsFeedConnectionStart(wsUrl));

    return () => {
      dispatch(wsFeedConnectionClosed());
    };
  }, [dispatch]);

  const getBurgerName = (order: FeedOrder): string => {
    if (!order.ingredients || order.ingredients.length === 0 || !ingredients.length) {
      return 'Бургер без названия';
    }

    const uniqueIngredientIds = Array.from(new Set(order.ingredients));
    const orderIngredients = uniqueIngredientIds
      .map((id) => ingredients.find((ing) => ing._id === id))
      .filter((ing) => ing !== undefined) as Ingredient[];

    const hasMain = orderIngredients.some((ing) => ing.type === 'main');
    const hasSauce = orderIngredients.some((ing) => ing.type === 'sauce');

    if (hasMain && hasSauce) {
      return `${orderIngredients.find((ing) => ing.type === 'main')?.name || 'Бургер'} соусом`;
    }
    if (hasMain) {
      return `${orderIngredients.find((ing) => ing.type === 'main')?.name || 'Бургер'}`;
    }

    return 'Космический бургер';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

    const timeStr = date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    if (diffDays === 0) {
      return `Сегодня, ${timeStr} i-GMT+3`;
    } else if (diffDays === 1) {
      return `Вчера, ${timeStr} i-GMT+3`;
    } else {
      return `${diffDays} дня назад, ${timeStr} i-GMT+3`;
    }
  };

  const calculatePrice = (ingredientIds?: string[]): number => {
    if (!ingredientIds || ingredientIds.length === 0 || !ingredients.length) return 0;
    return ingredientIds.reduce((total, id) => {
      const ingredient = ingredients.find((ing) => ing._id === id);
      return total + (ingredient?.price || 0);
    }, 0);
  };

  const getIngredientImage = (ingredientId: string): string | undefined => {
    const ingredient = ingredients.find((ing) => ing._id === ingredientId);
    return ingredient?.image;
  };

  const { readyOrdersColumns, inProgressOrdersColumns, totalCompleted, todayCompleted } = useMemo(() => {
    const ready = feedState.orders
      .filter((order) => order.status === 'done')
      .map((order) => order.number);
    const inProgress = feedState.orders
      .filter((order) => order.status === 'pending')
      .map((order) => order.number);
    
    const chunkArray = <T,>(array: T[], chunkSize: number): T[][] => {
      const chunks: T[][] = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
      }
      return chunks;
    };

    const readyColumns = chunkArray(ready, 10);
    const inProgressColumns = chunkArray(inProgress, 10);
    
    return {
      readyOrdersColumns: readyColumns,
      inProgressOrdersColumns: inProgressColumns,
      totalCompleted: feedState.total || 0,
      todayCompleted: feedState.totalToday || 0,
    };
  }, [feedState.orders, feedState.total, feedState.totalToday]);

  const sortedOrders = useMemo(() => {
    return [...feedState.orders].sort((a, b) => {
      const dateA = new Date(b.updatedAt || b.createdAt || 0).getTime();
      const dateB = new Date(a.updatedAt || a.createdAt || 0).getTime();
      return dateA - dateB;
    });
  }, [feedState.orders]);

  return (
    <main className={`${Styles.main} pt-10 pb-10`}>
        <div className={Styles.columns}>
          <div className={Styles.leftColumn}>
            <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
            <div className={Styles.ordersList}>
              {feedState.error && (
                <div className="text text_type_main-default text_color_error mb-4">
                  Ошибка: {feedState.error}
                </div>
              )}
              {sortedOrders.length === 0 && !feedState.error && (
                <div className="text text_type_main-default text_color_inactive">
                  Загрузка заказов...
                </div>
              )}
              {sortedOrders.map((order) => {
                const uniqueIngredients = order.ingredients?.slice(0, 6) || [];
                const remainingCount = (order.ingredients?.length || 0) - uniqueIngredients.length;
                const price = calculatePrice(order.ingredients);
                const burgerName = getBurgerName(order);

                return (
                  <Link
                    key={order._id || order.number}
                    to={`/feed/${order.number}`}
                    state={{ background: location }}
                    className={Styles.orderCard}
                  >
                    <div className={Styles.orderHeader}>
                      <span className="text text_type_digits-default">
                        #{String(order.number).padStart(6, '0')}
                      </span>
                      <span className="text text_type_main-default text_color_inactive">
                        {order.createdAt && formatDate(order.createdAt)}
                      </span>
                    </div>
                    <h2 className={`text text_type_main-medium mb-2 ${Styles.orderName}`}>
                      {burgerName}
                    </h2>
                    <div className={Styles.orderFooter}>
                      <div className={Styles.ingredientsPreview}>
                        {uniqueIngredients.map((ingredientId, index) => {
                          const image = getIngredientImage(ingredientId);
                          return (
                            <div
                              key={`${ingredientId}-${index}`}
                              className={Styles.ingredientIcon}
                            >
                              {image && (
                                <img
                                  src={image}
                                  alt=""
                                  className={Styles.ingredientImage}
                                />
                              )}
                              {index === uniqueIngredients.length - 1 && remainingCount > 0 && (
                                <div className={Styles.overlay}>
                                  <span className="text text_type_digits-default">+{remainingCount}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className={Styles.price}>
                        <span className="text text_type_digits-default mr-2">{price}</span>
                        <CurrencyIcon type="primary" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className={Styles.rightColumn}>
            <div className={Styles.stats}>
              <div className={Styles.statsSection}>
                <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
                <div className={Styles.ordersGridsContainer}>
                  {readyOrdersColumns.length === 0 ? (
                    <div className={Styles.ordersGrid}>
                      <span className="text text_type_main-default text_color_inactive">
                        Нет готовых заказов
                      </span>
                    </div>
                  ) : (
                    readyOrdersColumns.map((column, columnIndex) => (
                      <div key={columnIndex} className={Styles.ordersGrid}>
                        {column.map((orderNumber) => (
                          <Link
                            key={orderNumber}
                            to={`/feed/${orderNumber}`}
                            state={{ background: location }}
                            className={`text text_type_digits-default ${Styles.readyOrderLink}`}
                          >
                            {String(orderNumber).padStart(6, '0')}
                          </Link>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className={Styles.statsSection}>
                <h2 className="text text_type_main-medium mb-6">В работе:</h2>
                <div className={Styles.ordersGridsContainer}>
                  {inProgressOrdersColumns.length === 0 ? (
                    <div className={Styles.ordersGrid}>
                      <span className="text text_type_main-default text_color_inactive">
                        Нет заказов в работе
                      </span>
                    </div>
                  ) : (
                    inProgressOrdersColumns.map((column, columnIndex) => (
                      <div key={columnIndex} className={Styles.ordersGrid}>
                        {column.map((orderNumber) => (
                          <Link
                            key={orderNumber}
                            to={`/feed/${orderNumber}`}
                            state={{ background: location }}
                            className="text text_type_digits-default"
                          >
                            {String(orderNumber).padStart(6, '0')}
                          </Link>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className={Styles.statsSection}>
                <h2 className="text text_type_main-medium mb-6">Выполнено за все время:</h2>
                <p className={`text text_type_digits-large ${Styles.glowNumber}`}>
                  {totalCompleted.toLocaleString('ru-RU')}
                </p>
              </div>

              <div className={Styles.statsSection}>
                <h2 className="text text_type_main-medium mb-6">Выполнено за сегодня:</h2>
                <p className={`text text_type_digits-large ${Styles.glowNumber}`}>
                  {todayCompleted.toLocaleString('ru-RU')}
                </p>
              </div>
            </div>
          </div>
        </div>
    </main>
  );
};

export default Feed;
