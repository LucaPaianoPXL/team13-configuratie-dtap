import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('AppHasAddButton', async ({ page }) => {
  await page.goto('http://localhost:4000');
  
  //Expect page to contain an Add button.
  const addButton = await page.getByRole('button', {name: 'Add', exact: true});
  
  await expect(addButton).toBeVisible();
  
});

test('AppCanSubtract', async ({ page}) => {
	await page.goto('http://localhost:4000');
	
	//Add 7 to number 1
	const number1 = await page.locator('id=number1');
	await number1.fill('7');
	
	//Add 3 to number 2
	const number2 = await page.locator('id=number2');
	await number2.fill('3');
	
	//press Subtract button
	const subTractButton = await page.locator('id=subtract');
	await subTractButton.click();
	
	//await for calculation
	await page.waitForSelector('#result');
	
	//expect 4 as output
	const resultBox = await page.locator('id=result').textContent();
	expect(resultBox).toBe('The result is: 4');
});

