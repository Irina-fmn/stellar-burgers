import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/slices/order-slice';

export const Feed: FC = () => {
  const orders = useSelector((state) => state.order.feed?.orders || []);
  const loading = useSelector((state) => state.order.loading);

  const dispatch = useDispatch();
  console.log('orders', orders);
  console.log('loading', loading);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
