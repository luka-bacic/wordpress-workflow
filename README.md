# Workflow for WordPress themes

## Disclaimer
This repository assumes you had previously setup a local server and database with WordPress installed. This repository contains only one **theme** directory which is meant to be placed at `your-project/wp-content/themes/`.

## Why you should use this workflow
This workflow uses [gulp](https://gulpjs.com/) to automate tasks, such as:
- start a local dev server that proxies your website
- automatically inject CSS changes into the browser without the need to refresh the page
- automatically refresh the page if PHP, JS and image files are added or modified
- compile [SCSS](https://sass-lang.com/) to CSS
- [autoprefix](https://github.com/postcss/autoprefixer) your CSS with vendor prefixes for cross-browser compability
- combine all CSS files into one big file (website will load faster as there will be fewer HTTP requests)
- transpile ES6 JavaScript to an older version (enables you to use modern JavaScript without worrying about older browsers)
- combine all of your JavaScript libraries (e.g. Bootstrap bundle, jQuery) into one big file (website will load faster as there will be fewer HTTP requests)
- optimize your images for web (lower bandwidth usage, faster website)

## Requirements
To be able to use this workflow, you need:
- A local web and database server with WordPress installed and configured ([guide](https://www.wpbeginner.com/wp-tutorials/how-to-create-a-local-wordpress-site-using-xampp/))
- basic understanding of using the terminal
- Node.js installed globally ([guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))

## Installation & Quickstart

0. **Important!** You need to install WordPress, set up the database and the database connection!
1. Download this repo as a ZIP, extract files, and copy `example_theme` directory to your WordPress' `themes` folder: `your-project/wp-content/themes/`

2. Open a terminal and navigate to the folder you just copied over (`example_theme`)
```
cd wp-content/themes/example_theme
```

3. Modify `gulpfile.js`, `style.css` and rename your theme as described  [here](#required-config).

4. Then run:
```
npm install
```
This will install all the required dependencies for the workflow. It might take several minutes. When it finishes a new directory will appear called `node_modules`.

5. Activate your theme in the WordPress Admin:
    - Log into the WP admin area by appending `wp-admin/` to your site URL. If your site URL is `127.0.0.1:8080/your-project/`, then the log in URL is `127.0.0.1:8080/your-project/wp-admin`
    - In the left sidebar, navigate to `Appearence` -> `Themes`
    - Find your new custom theme, hover over it and click `Activate`

6. Run the following command in the terminal from your theme's directory:

```
gulp
```

That's it!

This should open your default browser with the dev server. As you make changes to the files in the `prototype` (source files) directory, the dev server will inject CSS changes without reloading, and reload the page if you add or modify PHP, JS and image files.
Leave this terminal open while you are working.  When you are done press `CTRL + C` if you're on Windows and Linux, or `⌘ + C` on Mac.

Happy coding!

## Directory Structure

For the sake of everything making sense, lets look how the default folder structure is organized:

```
example_theme/
|-- dist/
|   |-- css/
|   |   `-- main.min.css
|   |-- images/
|   |   |-- komodo.jpg
|   |   `-- lizard.jpg
|   `-- js/
|       |-- libraries.min.js
|       `-- main.js
|-- node_modules/
|-- prototype/
|   |-- _css/
|   |   |-- bootstrap.min.css
|   |   `-- theme-style.css
|   |-- _img/
|   |   |-- komodo.jpg
|   |   `-- lizard.jpg
|   |-- _js/
|   |   |-- libraries/
|   |   |   |-- bootstrap.bundle.min.js
|   |   |   `-- jquery-3.4.1.min.js
|   |   |-- modules/
|   |   |   `-- alert.js
|   |   `-- main.js
|   `-- _sass/
|       |-- base/
|       |   |-- _global.scss
|       |   `-- _typography.scss
|       |-- components/
|       |   |-- _figure.scss
|       |   `-- _global.scss
|       |-- layout/
|       |   |-- _body.scss
|       |   `-- _global.scss
|       |-- pages/
|       |   |-- _front-page.scss
|       |   `-- _global.scss
|       `-- utils/
|           |-- _global.scss
|           |-- _mixins.scss
|           `-- _variables.scss
|-- style.css
|-- .gitignore
|-- gulpfile.js
|-- package.json
|-- package-lock.json
|-- functions.php
`-- index.php
```
### Directory structure explained

There are 2 main subdirectory in the `example_theme` directory.
1. Source (development) files: `example_theme/prototype/`
2. Production files: `example_theme/dist/`

#### Source/Development files

`prototype/` is the directory where you will work in. It has 4 subdirectories. All subdirectories have an underscore before their name so you know that these files are for developing purposes, and not ready to be served for production. We will go over them in a specific order, to make more sense.

1. `_sass/` - All your SCSS source files should be located here. You can further organize your SCSS files to whatever convention you prefer (e.g. [7-1 Pattern](https://sass-guidelin.es/#the-7-1-pattern)), but make sure the SCSS compiles to one file.

2. `_css/` - This directory should contain all CSS files. Your SCSS code will compile to this directory! That's why there is a file called `theme-style.css`. If your are using any CSS library, make sure to copy the library's CSS into this directory (like Bootstrap, Tailwind CSS, etc.). When you run the command `gulp`, gulp will combine all of the CSS files located in this directory into one big minified CSS file. This is done so fewer HTTP requests are called when a website is loading, which increases its loading speed. You can also place your `*.map.css` files here.

3. `_js/` - This directory contains all of the JavaScript your site needs. Whether its a library like jQuery or just some custom JS you wrote, you place it here. However, there is a structure to be followed:
    - `libraries/` - Here you copy libraries you want to use, like jQuery, Bootstrap bundle, and other libraries.
    - `modules/` - Here is the custom JS you write, but split into modules to increase modularity and readability. For example: you want to create a module to alert something to the user. You would create a new file `alert.js`, write a new class, export it as default, and add a constructor which contains your code:

    ```
    "use strict";

    export default class Alert {
        constructor() {
            alert("Hello world!");
        }
    }
    ```
    - `main.js` - The main JS file which should bootstrap/startup your application. This file should include all of your modules. To insert our `alert.js` module from the previous example, we can do something like this. (this example assumes you are using jQuery)
    
    ```
    "use strict";

    import Alert from './modules/alert.js';

    $(document).ready(function() {
        new Alert();
    });
    ```

4. `_img/` - This directory should contain all of your images - JPG, PNG, GIF and SVG. You can further organize the images in subdirectories - the directory structure will be copied in the production directory when you run `gulp`.


#### Production files
`dist` is the directory where production-ready files are stored. If you are going to display an image in one of your WordPress template files, include a stylesheet or a JavaScript file - you should reference them for here. After gulp processes the files in the `prototype` directory, the files in `dist` are:
 - minified and vendor prefixed stylesheets, combined into 1 file.
 - transpiled scripts so older browsers can understand modern JS, and combined into 2 files for faster loading. It is also [browserified](http://browserify.org/) so all of the JS is in the browser.
 - compressed and optimized images.

The subdirectories are self explanatory:
1. `css/` - there will be one file, called `main.min.css`. You enqueue this stylesheet in your `functions.php` file.

2. `images/` - all your images will be copied here. If you further organized them in subdirectories, it will be copied over.

3. `js/` - you will have 2 files here
    - `libraries.min.js` - all files located in `prototype/_js/libraries/` will be combined in this one file.
    - `main.js` - your custom JS code will be here, including all of the modules you created under `prototype/_js/modules/` (provided you imported them in `prototype/_js/main.js`).
    
[Here are examples](#including-files) on how to include these files in your `functions.php` and WordPress template files. 

#### Node modules
This directory will automatically be created after you run `npm install`. You don't need to do anything with this, and you don't delete it if you want to use gulp.

#### WordPress files
- `index.php` and `style.css` - the 2 files every WordPress theme must have.
- `functions.php` - used to add stylesheets, scripts, fonts and cool WordPress functionalities.

#### .gitignore
If you use Git (which you probably should), this file ignores directories and files you don't want to have in your repository.

#### Workflow files
- `package.json` - this file contains information about your theme and dependencies for npm.
- `package-lock.json` - describes the exact dependency tree, you never modify this file directly.
- `gulpfile.js` - the brain of this repository. This makes your development life easier.

## Configuration

You need to set up some important settings so this will work on your machine. 

### Required config
If you want to start coding immediately and keep the directory structure along with the default names, you only need to configure the bare minimum. There are 3 things to configure:

1. Open `gulpfile.js` and modify the variable `serverUrl` on line 1. You need to insert in the url of how you access your local project in a browser. Depending on your OS and stack, it may look something like this:

```
127.0.0.1:8080/your-project/
```

Copy this URL, then replace it with the `REPLACE_ME` string at line 1 in `gulpfile.js`. After you paste it, it should look like this:

```
var serverURL = '127.0.0.1:8080/your-project/';
```

2. Open `style.css` and add your new theme's details.
3. Rename `example_theme` to your new theme name.

**Note**: steps 2 and 3 are not required for gulp to work properly, but you should still replace the default text with your custom theme details.

Go back to [Instalation and Quickstart](#installation-quickstart)

### Optional config

If you want to change the default file names, the folder structure, or remove some tasks from the default task, feel free to do so. However, you need to update all the new names and file paths in `gulpfile.js`.

At the beginning of `gulpfile.js` you will find 4 variables which you can modify to your needs.

- `root` - if you wish to move the directory where gulp is located, you change this file so every other file reference gets updated. Make sure to move all required files (`package.json`, `gulpfile.js`, etc.)
- `devFiles` - the directory name where the source files are located.
- `prodFiles` - the directory name where the production ready files are located.
- `fileNames` - an object containing file names. These are used when gulp outputs the production files.
- `src` - an object containing file paths for SCSS, CSS, JS, images and PHP files.
- `browsers` - a string containing browsers you want autoprefixer to add vendor prefixes.

## Including files

### Stylesheets and JavaScript

To include the production stylesheet and JavaScript files, you need to hook into the [wp_enqueue_scripts](https://developer.wordpress.org/reference/hooks/wp_enqueue_scripts/) WordPress hook in your `functions.php`, like so:

```
function resources() {
  // Add all JS libraries 
  wp_enqueue_script( 'libraries', get_template_directory_uri() . '/dist/js/libraries.min.js', array(), true , true );
  
  // Custom site scripts
  wp_enqueue_script( 'main', get_template_directory_uri() . '/dist/js/main.js', array(), true , true );

  // Stylesheet 
  wp_enqueue_style( 'theme-style', get_template_directory_uri() . '/dist/css/main.min.css' );
}
add_action('wp_enqueue_scripts', 'resources');
```

The important part here is to reference these files from the `dist/` directory, and **not** the `prototype/` directory!

### Images
If you would like to include an image to a WordPress template file, you can do so like this

```
<img
  src="<?php echo bloginfo( 'template_directory' ) . '/dist/images/lizard.jpg'; ?>"
  alt="pink lizard chilling"
/>
```

If you would like to include an image in you SCSS, you do it like this
```
.bg-image {
  background: url('../images/komodo.jpg');
}
```
Explanation: even though you are writing SCSS from `prototype/_sass/`, the compiled CSS will be located at `dist/css/`. Since both the images and css are in `dist/`, you just go 1 directory up, and then into `images/`.

