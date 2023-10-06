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

// Тест на некорректный логин
test('incorrectLogin', async ({ page }) => {
  await login(page, 'sss', 'Иыsv856@$#');
  await expect(page.getByText('Неверный формат email!')).toHaveText('Неверный формат email!');
  await expect(page).toHaveURL('https://stage.uchet24.kz/auth/login');
});

// Тест на некорректный пароль
test('incorrectPass', async ({ page }) => {
  await login(page, 't.alchemist@mail.ru', 'Иыsv8');
  await expect(page.getByText('Некорректные учетные данные.')).toHaveText('Некорректные учетные данные.');

  // Открываем блок ошибок
  await page.getByRole('button', { name: 'Закрыть' }).click();
  await page.getByRole('button', { name: 'Ошибки' }).click();
  await expect(page.getByRole('heading', { name: 'Есть ошибки!' })).toBeVisible();

  // Закрываем блок ошибок
  await page.getByLabel('close').click();
  await page.getByText('×').click();

  // Проверяем, что блок ошибок скрылся
  await page.waitForSelector('[role="heading"][name="Есть ошибки!"]', { state: 'hidden' });

  await expect(page).toHaveURL('https://stage.uchet24.kz/auth/login');
});

// Тест на некорректные все поля
test('incorrectAllInput', async ({ page }) => {
  await login(page, 't.alchemistytrtfgdfg@mail.ru', 'Иыsv8');
  await expect(page.getByText('Некорректные учетные данные.')).toHaveText('Некорректные учетные данные.');

  // Открываем блок ошибок
  await page.getByRole('button', { name: 'Закрыть' }).click();
  await page.getByRole('button', { name: 'Ошибки' }).click();
  await expect(page.getByRole('heading', { name: 'Есть ошибки!' })).toBeVisible();

  // Закрываем блок ошибок
  await page.getByLabel('close').click();
  await page.getByText('×').click();

  // Тайм аут
  await page.waitForTimeout(1000)

  // Проверяем, что блок ошибок скрылся
  await page.waitForSelector('[role="heading"][name="Есть ошибки!"]', { state: 'hidden' });

  await expect(page).toHaveURL('https://stage.uchet24.kz/auth/login');
});