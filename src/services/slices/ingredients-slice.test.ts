import { describe, expect, test } from '@jest/globals';
import {
  ingredientsReducer,
  initialState,
  getIngredients
} from './ingredients-slice';

describe('проверяем работу редьюсера ingredients', () => {
  test('при неизвестном action', () => {
    const state = ingredientsReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  test('проверяет getIngredients.pending', () => {
    const state = ingredientsReducer(
      initialState,
      getIngredients.pending('request-id')
    );

    expect(state).toEqual({
      items: [],
      loading: true,
      error: null
    });
  });

  test('проверяет getIngredients.fulfilled', () => {
    const ingredients = [
      {
        _id: '1',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'bun.png',
        image_mobile: 'bun-mobile.png',
        image_large: 'bun-large.png',
        __v: 0
      }
    ];

    const state = ingredientsReducer(
      {
        items: [],
        loading: true,
        error: null
      },
      getIngredients.fulfilled(ingredients, 'request-id')
    );
    

    expect(state).toEqual({
      items: ingredients,
      loading: false,
      error: null
    });
  });
});
