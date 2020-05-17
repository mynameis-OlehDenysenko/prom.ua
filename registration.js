const { chromium } = require('playwright')
const data = require('./generateData')
/**
 * This is realization of positive registration test-case
*/
async function main (d) {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page = await context.newPage()

  await registerAccount(d, page)

  await browser.close()
}
main(data)

async function registerAccount (data, page) {
  await page.goto(data.url)
  const buttonEnter = await page.waitForSelector('[data-qaid=auth_element] a')
  await buttonEnter.click()

  const registerAsUserLink = await page.waitForSelector('div:nth-child(3) > a:nth-child(1)')
  await registerAsUserLink.click()

  const firstName = await page.waitForSelector('[data-qaid=name]')
  await firstName.type(data.firstName)

  const email = await page.waitForSelector('[data-qaid=email]')
  await email.type(data.email)

  const password = await page.waitForSelector('[data-qaid=password]')
  await password.type(data.password)

  const submitButton = await page.waitForSelector('[data-qaid=submit]')

  await Promise.all([
    submitButton.click(),
    page.waitForNavigation({ waitUntil: 'networkidle0' })
  ])
  await page.waitFor(2000) //  optional
  console.log(data.email, 'email for registration')
  console.log(data.password, 'password for registration')
}
