import { test, expect } from '@playwright/test';

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

