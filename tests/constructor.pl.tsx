import { test, expect } from '@playwright/test';

test('должен записать HAR-файл', async ({ page }) => {
  await page.routeFromHAR('./tests/hars/ingredients.har', {
    url: '**/ingredients',
    update: false
  });

  await page.goto('/');

  await expect(page.getByText('Соберите бургер')).toBeVisible();
});
