// Импортируем 'test' и 'expect' из библиотеки Playwright
import { test, expect } from '@playwright/test';

// Описываем наш набор тестов
test.describe('Авторизация на Sauce Demo', () => {
  // Создаем тест-кейс
  test('Пользователь должен успешно войти в систему', async ({ page }) => {
    // 1. Переходим на страницу
    await page.goto('https://www.saucedemo.com/');
    //await expect(page).toHaveTitle(/Swag Labs/); //проверка соответствия title страницы

    // 2. Вводим логин
    //const userName = page.locator("[data-test='user-name']"); //загрузка более 5 сек. поэтому поломал тест
    // Используем селектор по id + каждый шаг
    /*  const userName = page.locator('#user-name');
  await expect(userName).toBeVisible(); //ожидание готовности/загрузки эл-та
  await userName.fill('standard_user'); // ввод данных
*/
    //все в 1й сроке
    await page.locator('#user-name').fill('standard_user');
    /*
  const userPassword = page.locator("[data-test='password']");
  await expect(userPassword).toBeVisible(); //ожидание готовности/загрузки эл-та
  await userPassword.fill('secret_sauce'); // ввод данных
*/
    await page.locator('[placeholder="Password"]').fill('secret_sauce');

    /*
  const userLoginBtn = page.locator("[data-test='login-button']");
  await expect(userLoginBtn).toBeEnabled(); //ожидание готовности/загрузки эл-та
  await userLoginBtn.click();
*/
    await page.locator('[data-test="login-button"]').click();

    // 5. Проверяем, что URL изменился и содержит нужную часть
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });
});

test.describe('НЕ УСПЕШНАЯ Авторизация на Sauce Demo', () => {
  // Создаем тест-кейс
  test('Пользователь должен НЕ успешно войти в систему', async ({ page }) => {
    // 1. Переходим на страницу
    await page.goto('https://www.saucedemo.com/');

    // 2. Вводим логин
    await page.locator('#user-name').fill('locked_out_user');

    // 3. Вводим пароль
    await page.locator('[placeholder="Password"]').fill('secret_sauce');

    // 4. Нажимаем кнопку "Login"
    await page.locator('[data-test="login-button"]').click();

    // 5. Проверяем, что НЕ произошел переход на страницу товаров
    await expect(page).not.toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/'); // Остались на той же странице
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });
});
