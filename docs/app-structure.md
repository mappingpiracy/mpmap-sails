#App-Structure

Use this as an overview for how code is structured and located within the app. Not all directories and files are described, just the important ones.

- api: back-end code.
    - controllers: handle url requests routed via config/routes.js.
    - lib: contains some reusable libraries and data structures.
    - models: Incident model with properties mapped to the database.
- assets: front-end code.
    - components: each individual "section" of the app. For example, the initial landing page with map, filters, and analysis is considered the "map" component.
    - shared: re-usable pieces of the application.
    - vendor: any third-party libraries. Note: a majority of the third-party js is pulled in from a CDN.
    - index.html: entry point for the Angular.js application. CDN-hosted libraries are declared here, and all application javascript and CSS is injected here via Grunt uglify and Grunt css-min tasks.
- config: all configuration used to build and run sails.
    - env: environment configuration (development and production).
    - connections.js: declares the database connections and credentials.
    - models.js: controls the default database connection and behavior of the Waterline ORM for database-mapped models.
    - routes.js: controls how API urls are routed to controller methods.
- docs: the documentation files you're reading right here
- tasks: Grunt tasks used by the Sails.js to prepare files and run the application.
    - uglify.js: configuration for minifying, combining, compressing JavaScript assets (the front-end) for production.
    - cssmin.js: same as uglify.js, but for css assets.
- utilities: some database scripts used for parsing spreadsheets into SQL to be inserted in the database.
- package.json: defines all app information and application-required node packages.
