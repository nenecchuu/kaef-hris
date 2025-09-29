# Luminakra Sample App

Repository for Luminakra Sample App web application

# Tech Stack

- Laravel v9.19, with Vite as front-end build tools
- React v18.2
- React Route v6.3
- TanStack Query

## Set Up

- Clone repository to your local

```shell
git clone https://github.com/nenecchuu/luminakra-sample-app.git
```

- Set the required environment variables shown in .env.example

### with Docker

#### with Docker Compose

```
docker compose up -d --build
```

#### Manually

- Build the docker image

```shell
docker build -f dockerfile -t luminakra-sample-app:app .
```

- Run the container

```shell
docker run --name luminakra-sample-app -dp 1080:80 luminakra-sample-app:app
```

The app will be available at `http://localhost:1080`

### Manually

- Install composer dependencies

```shell
composer install
```

- Set `APP_KEY` in `.env`

```shell
php artisan key:generate
```

- Install npm dependencies

```
npm install
```

- Run server

```
npm run dev
```

## API Documentation

The documentation is available at `{{APP_URL}}/docs`. If for some reason it doesn't work, try `{{APP_URL}}/docs/index.html`.

### Generate Documentation

Documentation needs to be manually generated on every update on the API development.

```shell
php artisan scribe:generate
```
