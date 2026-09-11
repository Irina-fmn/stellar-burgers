import { describe, expect, test } from '@jest/globals';
import {
  constructorReducer,
  initialState,
  setBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredient
} from './constructor-slice';

const bun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

const ingredient = {
  _id: '643d69a5c3f7b9001cfa0940',
  name: 'Говяжий метеорит (отбивная)',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'meat.png',
  image_mobile: 'meat-mobile.png',
  image_large: 'meat-large.png',
  __v: 0
};

const constructorIngredient = {
  ...ingredient,
  id: 'test-id-1'
};

describe('проверяем работу редьюсера burgerConstructor', () => {
  test('при неизвестном action', () => {
    const state = constructorReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  test('устанавливает булку в конструктор', () => {
    const state = constructorReducer(initialState, setBun(bun));
    expect(state).toEqual({ ...initialState, bun });
  });

  test('добавляет ингредиент в конструктор', () => {
    const state = constructorReducer(initialState, addIngredient(ingredient));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject(ingredient);
    expect(state.ingredients[0]).toHaveProperty('id');
  });

  test('удаляет ингредиент из конструктора', () => {
    const state = constructorReducer(
      {
        ...initialState,
        ingredients: [constructorIngredient]
      },
      removeIngredient('test-id-1')
    );
    expect(state.ingredients).toEqual([]);
  });

  test('очищает конструктор', () => {
    const state = constructorReducer(
      { bun, ingredients: [constructorIngredient] },
      clearConstructor()
    );
    expect(state).toEqual(initialState);
  });

  test('перемещает ингредиент в конструкторе', () => {
    const ingredient1 = { ...ingredient, id: 'id-1' };
    const ingredient2 = { ...ingredient, id: 'id-2' };
    const ingredient3 = { ...ingredient, id: 'id-3' };

    const state = constructorReducer(
      {
        bun: null,
        ingredients: [ingredient1, ingredient2, ingredient3]
      },
      moveIngredient({ fromIndex: 0, toIndex: 2 })
    );

    expect(state.ingredients).toEqual([ingredient2, ingredient3, ingredient1]);
  });
});
