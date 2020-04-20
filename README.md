# Accessible Kirby Vue Starterkit

> Based on Jakub Medvecký Heretik's [Kirby Vue Starterkit](https://github.com/jmheretik/kirby-vue-starterkit). Be sure to check it out!

**Key features**:
- 🕶 Modern Kirby folder setup
- ♿ Accessible routing
- 🔍 SEO-friendly (server-side [generated meta tags](site/snippets/meta.php))
- 🔌 Offline-first via service worker
- 🤝 Shared .env for frontend & backend

## Introduction

This project uses [Kirby](https://getkirby.com/) as a headless CMS at the backend and [Vue.js](https://vuejs.org/) as the frontend UI library. The content is fetched using the Kirby's [JSON content representation](https://getkirby.com/docs/guide/templates/content-representations).

Snippets, templates and their specific JS/CSS from the Kirby [Starterkit](https://github.com/getkirby/starterkit) have been ported to Vue.js [Single File Components](https://vuejs.org/v2/guide/single-file-components.html) with the least possible modifications done to the original Starterkit in order to serve as a simple starting point for people wanting to use Vue.js with Kirby.

The project benefits from all the standard tools used in modern frontend development. For more details you may dive into the [Vue CLI](https://cli.vuejs.org/).

## Folder structure

All parts of the website can be handled from the root level.
  - `composer.json` for `package.json` dependencies.
  - `.env` for environment variables accessible from both Kirby and Vue.
  - Vue files are located in `src`.

The standard Kirby setup is modified to reflect a modern web project.
- Kirby CMS as well all all other PHP dependencies are located in `vendor`.
- `public` reflects the main entry point of the website. Therefore web servers can only access files based in that directory.

## Prerequisites

- Node.js with npm (only required to build the frontend)
- Kirby requires PHP 7.2+
  - Kirby is **not** a free software. You can try it for free on your local machine but in order to run Kirby on a public server you must purchase a valid license at https://getkirby.com/buy

## Usage

Install npm and composer dependencies.

```bash
npm install
composer install
```

Note: Composer dependencies are tracked in this repository by default. Running `composer install` isn't necessary.

### Serve backend & frontend for development

```bash
npm run serve
```

This command spawns a PHP's built-in web server by Node. Another way to start the PHP built-in server is to run `./serve`. You can also serve the backend by a web server of your choice. If done so, please specify hostname and port in the [`kirby.config.js`](kirby.config.js) if they differ from `127.0.0.1:8000` and more importantly set `serveKirby` to `false` in the Vue config file.

### Compile for production

```bash
npm run build
```

This builds the frontend assets and saves them to the `public` directory and the index file as a Kirby template to `site/templates/default.php`.

Finally, deploy your project and point your web server to the `public` folder.

## Notes

- Vue.js [`page`](src/components/mixins/page.js) mixin roughly corresponds to the Kirby's `$page` object, but only the functionality needed for the starterkit is present.
- Vue.js components in the [src/components](src/components) folder correspond to Kirby snippets.
- Vue.js views in the [src/views](src/views) folder correspond to Kirby templates and the routes are being automatically resolved.
  - If you add a new page in Kirby with a new blueprint you also need to manually add a new Vue view here and as well as a new template in the backend to provide the frontend with the data you require.

## Credits

Big thanks to Jakub Medvecký Heretik for his work on [kirby-vue-starterkit](https://github.com/jmheretik/kirby-vue-starterkit)!
