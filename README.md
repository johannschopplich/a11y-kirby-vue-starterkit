# Accessible Kirby Vue Starterkit

> This project is based heavily on Jakub Medvecký Heretik's [Kirby API/JSON Vue Starterkit](https://github.com/jmheretik/kirby-json-vue-starterkit). Be sure to check it out!

This project uses [Kirby](https://getkirby.com/) as a headless CMS at the backend and [Vue.js](https://vuejs.org/) as the UI library at the frontend. The content is fetched via Kirby templates encoding their response data to JSON.

Snippets, templates and their specific JS/CSS from the Kirby [Starterkit](https://github.com/getkirby/starterkit) have been ported to Vue.js [Single File Components](https://vuejs.org/v2/guide/single-file-components.html) with the least possible modifications done to the original Starterkit in order to serve as a nice starting point for people wanting to use Vue.js with Kirby.

The project benefits from all the standard tools used in modern frontend development. For more details you may dive into the [Vue CLI](https://cli.vuejs.org/).

## Prerequisites

- Node.js with npm (only required to build the project)
- Kirby requires PHP 7.2+
  - Kirby is **not** a free software. You can try it for free on your local machine but in order to run Kirby on a public server you must purchase a valid license at https://getkirby.com/buy

## Project setup

```bash
cd frontend && npm install
```

## Usage

Please locate to `frontend` first before running any `npm` commands.

```bash
cd frontend
```

### Serve backend & frontend for development

```bash
npm run serve
```

### Serve backend

This command runs the Kirby backend using PHP's built-in web server. You can serve the backend by a web server of your choice. If done so, specify the host and port in the [`frontend/kirby.config.js`](frontend/kirby.config.js) file.

```bash
npm run serve:backend
```

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

- Vue.js mixin [`page`](frontend/src/components/mixins/page.js) roughly corresponds to the `$page` object in Kirby.
- Vue.js components inside [src/components](src/components) correspond to Kirby snippets.
- Vue.js views inside [frontend/src/views](frontend/src/views) correspond to Kirby templates. Routes are being automatically resolved. If you add a new page with a new blueprint you also need to manually add a new **View** (exactly as you would add a new **Template** if you were working on a frontend in Kirby).

## Credits

Big thanks to Jakub Medvecký Heretik for his work on multiple Vue-centered starterkits like [kirby-json-vue-starterkit](https://github.com/jmheretik/kirby-json-vue-starterkit)!
