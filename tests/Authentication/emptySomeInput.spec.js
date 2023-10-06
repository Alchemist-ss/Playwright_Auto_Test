import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../helper/getroute.js';

// Открытие страницы и настройка перед каждым тестом
test.beforeEach(async ({ page }) => {
  await page.goto(getStageUrl());
  await page.setViewportSize({ width: 1920, height: 1080 });
});

// Функция для авторизации
async function login(page, email, password) {
  await page.getByPlaceholder('Введите email').fill(email);
  await page.getByPlaceholder('Введите пароль').fill(password);
  await page.getByRole('button', { name: 'Войти' }).click();
}

// Если поле "Логин" пустое
test('emptyLoginField', async ({ page }) => {
  await login(page, '', 'Иыsv856@$#');
  await expect(page.getByText('Укажите email!')).toHaveText('Укажите email!');
  await expect(page).toHaveURL('https://stage.uchet24.kz/auth/login');
});

// Если поле "Пароль" пустое
test('emptyPasswordField', async ({ page }) => {
  await login(page, 't.alchemist@mail.ru', '');
  await expect(page.getByText('Укажите пароль!')).toHaveText('Укажите пароль!');
  await expect(page).toHaveURL('https://stage.uchet24.kz/auth/login');
});

// Если пустые все поля
test('emptyLoginAndPasswordFields', async ({ page }) => {
  await login(page, '', '');
  await expect(page.getByText('Укажите email!')).toHaveText('Укажите email!');
  await expect(page.getByText('Укажите пароль!')).toHaveText('Укажите пароль!');
  await expect(page).toHaveURL('https://stage.uchet24.kz/auth/login');
});
