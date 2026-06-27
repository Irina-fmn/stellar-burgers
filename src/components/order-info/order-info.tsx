import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderByNumber } from '../../services/slices/order-slice';
import { Modal } from '../modal';
import { useHandleModalClose } from '../../services/hooks';
import { useParams } from 'react-router-dom';

interface Props {
  needModal?: boolean;
}

export const OrderInfo: FC<Props> = ({ needModal }) => {
  const { number } = useParams<{ number?: string }>();
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.order.selectedOrder);
  const loading = useSelector((state) => state.order.loading);

  const handleModalClose = useHandleModalClose();

  useEffect(() => {
    dispatch(getOrderByNumber(Number(number)));
  }, [dispatch, number]);

  const ingredients = useSelector((state) => state.ingredients.items);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  const content =
    !loading && orderInfo ? (
      <OrderInfoUI orderInfo={orderInfo} />
    ) : (
      <Preloader />
    );

  return needModal ? (
    <Modal title={`#${number}`} onClose={handleModalClose}>
      {content}
    </Modal>
  ) : (
    content
  );
};
