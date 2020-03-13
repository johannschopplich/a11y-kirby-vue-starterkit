# Accessible Vue Kirby Starterkit

This project uses [Kirby](https://getkirby.com/) as a headless CMS at the backend and [Vue.js](https://vuejs.org/) as a UI library at the frontend. The communication in between is handled using the [Kirby's Content Representations](https://getkirby.com/docs/guide/templates/content-representations).

The project benefits from all the standard tools used in modern frontend development. For more details you may dive into the [Vue CLI](https://cli.vuejs.org/).

## Requirements

- Node.js with npm (only required to build the project)
- Kirby runs on PHP 7.3+

## Project setup

### Frontend
```bash
cd frontend && npm install
```

### Backend

Out of the box the backend is served using the PHP built-in development server. To start it, run:

```bash
composer serve
```

If another development server or URL is used, update the `VUE_APP_BACKEND_URL` in the [frontend/.env.development](frontend/.env.development) accordingly.

## Usage

### Serve backend & frontend for development

```bash
# Run the Kirby backend using PHP's built-in web server
# This command uses `php -S 127.0.0.1:8080 -t public/ cliserver.php` under the hood
composer serve
# Compile Vue frontend and hot-reload for development
cd frontend && npm run serve
```

### Compile for production

```bash
cd frontend && npm run build
```

Point your web server to the `public` folder.

## Notes

- Vue.js views in in [frontend/src/views](frontend/src/views) folder correspond to Kirby templates and the routes are being automatically resolved.
- If you add a new page with a new blueprint you also need to manually add a new **View** (exactly as you would add a new **Template** if you were working on a frontend in Kirby).
- Vue.js mixin [`page`](frontend/src/components/mixins/page.js) roughly corresponds to the `$page` object in Kirby.

## Credits

Big shoutout to jmheretik's [kirby-json-vue-starterkit](https://github.com/jmheretik/kirby-json-vue-starterkit)!
