import { test, expect } from '@playwright/test';

test.describe('добавление ингредиента из списка в конструктор.', () => {

});

test('добавление ингредиентов в конструктор', async ({ page }) => {
  await page.routeFromHAR('./tests/hars/ingredients.har', {
    url: '**/ingredients'
  });

  await page.goto('/');

  // Добавляем булку
  const bun = page.locator('li').filter({ hasText: 'Краторная булка N-200i' });

  await bun.getByRole('button', { name: 'Добавить' }).click();

  await expect(page.getByText('Краторная булка N-200i (верх)')).toBeVisible();

  await expect(page.getByText('Краторная булка N-200i (низ)')).toBeVisible();

  // Добавляем начинку
  const filling = page
    .locator('li')
    .filter({ hasText: 'Биокотлета из марсианской Магнолии' });

  await filling.getByRole('button', { name: 'Добавить' }).click();

  await expect(
    page.locator('.constructor-element__text').filter({
      hasText: 'Биокотлета из марсианской Магнолии'
    })
  ).toBeVisible();
});

test('открытие и закрытие модального окна ингредиента', async ({ page }) => {
  await page.routeFromHAR('./tests/hars/ingredients.har', {
    url: '**/ingredients'
  });

  await page.goto('/');

  // Открываем модалку ингредиента
  await page
    .getByRole('link', {
      name: 'Краторная булка N-200i'
    })
    .click();

  await expect(
    page.locator('#modals').getByText('Детали ингредиента')
  ).toBeVisible();

  // Закрываем модалку крестиком
  await page.locator('#modals button').click();

  // Проверяем, что модалка закрылась
  await expect(page.locator('#modals')).not.toBeVisible();
});

test('закрытие модального окна по клику на оверлей', async ({ page }) => {
  await page.routeFromHAR('./tests/hars/ingredients.har', {
    url: '**/ingredients'
  });

  await page.goto('/');

  // Открываем модалку ингредиента
  await page
    .getByRole('link', {
      name: 'Краторная булка N-200i'
    })
    .click();

  // Проверяем, что модалка открылась
  await expect(
    page.locator('#modals').getByText('Детали ингредиента')
  ).toBeVisible();

  // Закрываем модалку кликом по оверлею
  await page
    .locator('#modals > div')
    .last()
    .click({
      position: { x: 10, y: 10 }
    });

  // Проверяем, что модалка закрылась
  await expect(page.locator('#modals')).not.toBeVisible();
});

test('создание заказа', async ({ context, page }) => {
  await page.routeFromHAR('./tests/hars/ingredients.har', {
    url: '**/ingredients'
  });

  await page.route('**/auth/user', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        user: {
          email: 'test123456@test.test',
          name: 'test12345678'
        }
      })
    });
  });

  await page.route('**/orders', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        name: 'Метеоритный краторный бургер',
        order: {
          ingredients: [
            {
              _id: '643d69a5c3f7b9001cfa093c',
              name: 'Краторная булка N-200i',
              type: 'bun',
              proteins: 80,
              fat: 24,
              carbohydrates: 53,
              calories: 420,
              price: 1255,
              image: 'https://code.s3.yandex.net/react/code/bun-02.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/bun-02-large.png',
              __v: 0
            },
            {
              _id: '643d69a5c3f7b9001cfa0940',
              name: 'Говяжий метеорит (отбивная)',
              type: 'main',
              proteins: 800,
              fat: 800,
              carbohydrates: 300,
              calories: 2674,
              price: 3000,
              image: 'https://code.s3.yandex.net/react/code/meat-04.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/meat-04-large.png',
              __v: 0
            },
            {
              _id: '643d69a5c3f7b9001cfa093c',
              name: 'Краторная булка N-200i',
              type: 'bun',
              proteins: 80,
              fat: 24,
              carbohydrates: 53,
              calories: 420,
              price: 1255,
              image: 'https://code.s3.yandex.net/react/code/bun-02.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/bun-02-large.png',
              __v: 0
            }
          ],
          _id: '6aa3f5d16a172d001b994bb1',
          owner: {
            name: 'test12345678',
            email: 'test123456@test.test',
            createdAt: '2026-06-25T19:27:59.908Z',
            updatedAt: '2026-06-26T06:02:29.841Z'
          },
          status: 'done',
          name: 'Метеоритный краторный бургер',
          createdAt: '2026-09-11T12:36:33.622Z',
          updatedAt: '2026-09-11T12:36:33.718Z',
          number: 110100,
          price: 5510
        }
      })
    });
  });

  await context.addCookies([
    {
      name: 'accessToken',
      value: 'test-access-token',
      domain: 'localhost',
      path: '/'
    }
  ]);

  await page.addInitScript(() => {
    localStorage.setItem('refreshToken', 'test-refresh-token');
  });
  await page.goto('/');

  // await expect(
  //   page.getByRole('button', { name: 'Оформить заказ' })
  // ).toBeVisible();

  const bun = page.locator('li').filter({ hasText: 'Краторная булка N-200i' });
  await bun.getByRole('button', { name: 'Добавить' }).click();

  const filling = page
    .locator('li')
    .filter({ hasText: 'Говяжий метеорит (отбивная)' });

  await filling.getByRole('button', { name: 'Добавить' }).click();
  await page.getByRole('button', { name: 'Оформить заказ' }).click();

  await expect(page.getByText('110100')).toBeVisible();

  await expect(
    page.getByText('Краторная булка N-200i (верх)')
  ).not.toBeVisible();

  await expect(
    page
      .locator('.constructor-element__text')
      .filter({ hasText: 'Говяжий метеорит (отбивная)' })
  ).not.toBeVisible();

  await page.locator('#modals button').click();

  await expect(page.locator('#modals')).not.toBeVisible();
});
