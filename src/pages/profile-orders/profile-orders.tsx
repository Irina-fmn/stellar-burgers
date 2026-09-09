import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { getOrders } from '../../services/slices/order-slice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return loading ? <Preloader /> : <ProfileOrdersUI orders={orders} />;
};
