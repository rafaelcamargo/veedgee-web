# Veedgee Web
> Veedgee's Web Client

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/rafaelcamargo/veedgee-web/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/rafaelcamargo/veedgee-web/tree/main)
[![Coverage Status](https://coveralls.io/repos/github/rafaelcamargo/veedgee-web/badge.svg?branch=main)](https://coveralls.io/github/rafaelcamargo/veedgee-web?branch=main)

## Contributing

1. Install [Node](https://nodejs.org/en/). Download the "Recommend for Most Users" version.

2. Clone the repo:
``` bash
git clone git@github.com:rafaelcamargo/veedgee-web.git
```

3. Go to the project directory
``` bash
cd veedgee-web
```

4. Install the project dependencies
``` bash
npm install
```

5. Check your changes running the command below and accessing `http://localhost:9000`:
``` bash
npm run start
```

## Tests

1. In case you have changed any website behavior, ensure that all changes are covered with automated tests:
``` bash
npm run test
```

2. You can optionally generate a coverage report while running tests:
``` bash
npm run test -- --coverage
```
