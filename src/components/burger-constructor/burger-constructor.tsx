import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder } from '../../services/slices/order-slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector((store) => store.burgerConstructor);
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };

  //const orderRequest = false;
  //const orderModalData = null;
  const orderRequest = useSelector((store) => store.order.orderRequest);
  const orderModalData = useSelector((store) => store.order.orderModalData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);

  const onOrderClick = () => {
    //if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }

    const ingredients = [
      constructorItems.bun!._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun!._id
    ];
    dispatch(createOrder(ingredients));
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
