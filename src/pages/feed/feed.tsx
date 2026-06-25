import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/slices/order-slice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = [];
  const orders = useSelector((state) => state.order.feed?.orders || []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
