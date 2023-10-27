export async function checkDate(page) {
  // Получаем текущую дату
  const currentDate = new Date();
  // Преобразуем текущую дату в строку в том же формате, который ожидается на странице
  const currentDateStr = currentDate.toLocaleDateString();
  // Ищем элемент на странице, содержащий текущую дату
  const dateElement = await page.locator('text=' + currentDateStr).first();
  // Получаем текст из найденного элемента
  const dateOnPage = await dateElement.textContent();
  // Проверяем, что дата на странице содержит текущую дату, возвращаем true если содержит, иначе false
  return dateOnPage.includes(currentDateStr);
}