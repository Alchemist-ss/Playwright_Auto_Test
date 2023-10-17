import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../helper/getroute.js';
import { performAuthorization } from 'C:/Users/user/Documents/GitHub/Playwright_Auto_Test/tests/Authentication/autorisation.spec.js'

// Открытие страницы
test.beforeEach(async ({ page }) => {
  await page.goto(getStageUrl());
  await page.setViewportSize({ width: 1920, height: 1080 })
});

test('surfPage', async ({ page }) => {
  await performAuthorization(page)
});

