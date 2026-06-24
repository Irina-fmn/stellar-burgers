import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
//import { createOrder, selectOrderRequest } from 'src/services/slices/order-slice';
//import { selectConstructorItems } from '../../services/slices/constructor-slice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector((store) => store.burgerConstructor);
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };

  const dispatch = useDispatch();

  const orderRequest = false;
  const orderModalData = null;
  // const orderRequest = useSelector((store) => store.order.orderRequest);

  // const orderModalData = useSelector((store) => store.order.orderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    // const ingredients = constructorItems.ingredients;
    // dispatch(createOrder(ingredients))
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
