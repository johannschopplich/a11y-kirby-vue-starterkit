# Accessible Kirby Vue Starterkit

> Heavily based on Jakub Medvecký Heretik's [Kirby API/JSON Vue Starterkit](https://github.com/jmheretik/kirby-json-vue-starterkit). Be sure to check it out!

This project uses [Kirby](https://getkirby.com/) as a headless CMS at the backend and [Vue.js](https://vuejs.org/) as the frontend UI library. The content is fetched via Kirby templates returning data as JSON.

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

Note: Composer dependencies are tracked in this repository by default. `composer install` not needed necessarily.

### Serve backend & frontend for development

```bash
npm run serve
```

### Serve backend

This command spawns the Kirby backend using PHP's built-in web server. You can also serve the backend by a web server of your choice. If done so, please specify host and port in the [`kirby.config.js`](kirby.config.js).

```bash
npm run serve:backend
```

Another way to start the PHP built-in server is to run `./serve`.

### Serve frontend

```bash
npm run serve:frontend
```

### Compile for production

```bash
npm run build
```

This builds the frontend assets and saves them to the `public` directory and the index file as a Kirby snippet to `site/snippets/vue-index.php`.

Finally, deploy your project and point your web server to the `public` folder.

## Notes

- Vue.js mixin [`page`](src/components/mixins/page.js) roughly corresponds to the `$page` object in Kirby.
- Vue.js components inside [src/components](src/components) correspond to Kirby snippets.
- Vue.js views inside [src/views](src/views) correspond to Kirby templates. Routes are being automatically resolved. If you add a new page with a new blueprint you also need to manually add a new **View** (exactly as you would add a new **Template** if you were working on a frontend in Kirby).

## Credits

Big thanks to Jakub Medvecký Heretik for his work on multiple Vue-centered starterkits like [kirby-json-vue-starterkit](https://github.com/jmheretik/kirby-json-vue-starterkit)!
