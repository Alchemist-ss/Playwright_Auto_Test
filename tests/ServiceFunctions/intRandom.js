// Генерация случайного целого числа в диапазоне от min до max (включительно)
export function getRandomInt(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNumber.toString();
}
