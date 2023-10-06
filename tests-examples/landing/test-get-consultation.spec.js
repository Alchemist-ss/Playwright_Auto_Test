import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import { getApiUrl, getLandingUrl } from '../../helper/getroute';
console.log(__dirname)
const records = parse(fs.readFileSync(path.join(process.cwd(), '/tests-inputs/landing/get_consultation.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const record of records) {
  test(`foo: ${record.test_case}`, async ({ page }) => {
    await page.goto(getLandingUrl())
    await page.waitForTimeout(1000)
    await page.getByPlaceholder('Имя').fill(record.name)
    await page.getByPlaceholder('Город').fill(record.city)
    await page.getByPlaceholder('Телефон').fill(record.phone)
    await page.getByPlaceholder('Количество касс').fill(record.sum_cash)
    await page.getByRole("button", { name: "Отправить заявку" }).click()

    const result = await page.waitForResponse(
      getApiUrl("/request/client_registration"),

    )

    await page.waitForTimeout(2000)
    console.log(result.status)
    expect(result.status === 200 || result.status === 429).toBeTruthy();


  });
}