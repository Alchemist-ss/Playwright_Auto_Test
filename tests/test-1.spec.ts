import { test, expect } from '@playwright/test';
import { getApiUrl, getLandingUrl } from '../helper/getroute.js';

test('test', async ({ page }) => {
  await page.goto(getLandingUrl())
  await page.getByPlaceholder('Имя').click();
  await page.getByPlaceholder('Имя').fill('Вадим');
  await page.getByPlaceholder('Имя').press('Tab');
  await page.getByPlaceholder('Город').fill('Караганда');
  await page.getByPlaceholder('Город').press('Tab');
  await page.getByPlaceholder('Телефон').fill('8 747 579 42 69');
  await page.getByText('* Количество касс').click();
  await page.getByPlaceholder('Количество касс').fill('25');
  await page.getByRole('button', { name: 'Отправить заявку' }).click();
  await page.getByText('Спасибо за регистрацию! Ваша заявка принята в работу!');
  await expect(locator).toBeVisible('Спасибо за регистрацию! Ваша заявка принята в работу!')
  await page.waitForTimeout(2000)
  await page.close();
});