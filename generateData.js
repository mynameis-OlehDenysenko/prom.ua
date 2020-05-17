const faker = require('faker')

module.exports = {
  firstName: faker.name.firstName(),
  email: faker.internet.email(null, null, 'mailforspam.com').toLowerCase(),
  password: '!Nickelback123',
  url: 'https://prom.ua/'
}
