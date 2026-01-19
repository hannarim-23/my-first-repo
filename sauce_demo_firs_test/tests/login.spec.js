import { test, expect } from '@playwright/test';

test('User automation ', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  //await expect(page).toHaveTitle(/Swag Labs/); //проверка соответствия title страницы

  //const userName = page.locator("[data-test='user-name']");
  const userName = page.locator('#user-name');
  await expect(userName).toBeVisible(); //ожидание готовности/загрузки эл-та
  await userName.fill('standard_user'); // ввод данных

  const userPassword = page.locator("[data-test='password']");
  await expect(userPassword).toBeVisible(); //ожидание готовности/загрузки эл-та
  await userPassword.fill('secret_sauce'); // ввод данных

  const userLoginBtn = page.locator("[data-test='login-button']");
  await expect(userLoginBtn).toBeEnabled(); //ожидание готовности/загрузки эл-та
  await userLoginBtn.click();
});
