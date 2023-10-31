// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Чтение переменных окружения из файла.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  timeout: 60000,
  testDir: './tests',
  /* Запуск тестов в параллели */
  fullyParallel: true,
  /* Провалить сборку на CI, если в исходном коде осталась test.only. */
  forbidOnly: !!process.env.CI,
  /* Повторы только на CI */
  retries: process.env.CI ? 2 : 0,
  /* Отключение параллельных тестов на CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Репортер, который будет использоваться. См. https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Общие настройки для всех проектов ниже. См. https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Сбор трассировки при повторе неудачного теста. См. https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Включение видео записи */
    video: {
      mode: 'on',
      size: { width: 1920, height: 1080 },
    },
    // Включение скиншотов
    screenshot: 'on',



    /* Базовый URL для действий, таких как `await page.goto('/')`. */
    baseURL: process.env.BASE_URL_APP,
  },

  /* Настройка проектов для основных браузеров */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* Тестирование в брендированных браузерах. */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },

    /* Тестирование на мобильных устройствах. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },    
  ],

  // /* Запуск локального сервера разработки перед запуском тестов. */
  // webServer: {
  // command: 'npm run start',
  // url: 'http://127.0.0.1:3000',
  // reuseExistingServer: !process.env.CI,
  // },
});
