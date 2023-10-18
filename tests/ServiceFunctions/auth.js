// Функция для авторизации
export async function performAuthorization(page) {
  // Найти и вписать значение
  await page.getByPlaceholder('Введите email').fill('AutoTest@mail.ru')

  // Найти и вписать значение
  await page.getByPlaceholder('Введите пароль').fill('Иыsv856@$#')

  // Нажатие на кнопку
  await page.getByRole('button', { name: 'Войти' }).click()
}

