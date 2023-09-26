// @ts-check
const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  await page.goto('https://cabinet.stage.greenkassa.kz/login');
});


