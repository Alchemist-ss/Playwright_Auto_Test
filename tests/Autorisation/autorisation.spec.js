import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../helper/getroute.js';


test.beforeEach(async ({ page }) => {
  // Переход на страницу TIS-Stage
  await page.goto(getStageUrl());
  // Перейти в полноэкранный режим
  await page.setViewportSize({ width: 1920, height: 1080 })

});

test('test', async ({ page }) => {
  // Тайм аут
  // await page.waitForTimeout(1000)
  await page.getByPlaceholder('Введите email').fill('t.alchemist@mail.ru')
  await page.getByPlaceholder('Введите пароль').fill('Иыsv856@$#')
  await page.getByRole('button', { name: 'Войти' }).click()

  // await page.close();
});