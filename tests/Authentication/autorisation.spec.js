import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../helper/getroute.js';
import { performAuthorization } from '../ServiceFunctions/auth.js';


// Открытие страницы
test.beforeEach(async ({ page }) => {
  // Переход на страницу TIS-Stage
  await page.goto(getStageUrl());
  // Перейти в полноэкранный режим
  await page.setViewportSize({ width: 1920, height: 1080 })
});

// Авторизация (позитивный сценарий)
test('Authorization', async ({ page }) => {
  await performAuthorization(page);

  // Проверить, что URL изменился
  await expect(page).toHaveURL('https://stage.uchet24.kz')

  // Ожидание нескольких элементов с использованием Promise.all()
  await Promise.all([
    expect(page.getByRole('link', { name: 'Инструкция' })).toHaveText('Инструкция'),
    expect(page.getByRole('link', { name: 'Пользовательское соглашение' })).toHaveText('Пользовательское соглашение'),
    expect(page.getByRole('link', { name: '© 2022 TOO “DISS-GROUP”' })).toHaveText('© 2022 TOO “DISS-GROUP”')
  ]);
});