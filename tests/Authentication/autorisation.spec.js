import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../helper/getroute.js';

// Открытие страницы
test.beforeEach(async ({ page }) => {
  // Переход на страницу TIS-Stage
  await page.goto(getStageUrl());
  // Перейти в полноэкранный режим
  await page.setViewportSize({ width: 1920, height: 1080 })
});

// Функция для авторизации
async function performAuthorization(page) {
  // Найти и вписать значение
  await page.getByPlaceholder('Введите email').fill('t.alchemist@mail.ru')

  // Найти и вписать значение
  await page.getByPlaceholder('Введите пароль').fill('Иыsv856@$#')

  // Нажатие на кнопку
  await page.getByRole('button', { name: 'Войти' }).click()
}

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