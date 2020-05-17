# Workflow for WordPress themes

## Disclaimer
This repository assumes you previously installed WordPress on your machine and set up your database. This repository contains only one theme directory which is meant to be placed at `your-project/wp-content/themes/`.

## Why you should use this workflow
This workflow uses [gulp](https://gulpjs.com/) to automate tasks, such as: 
 - automatically injects CSS changes into the browser without the need to refresh the page
 - automatically refreshes the page if PHP or JS files are modified 
 - compiling [SCSS](https://sass-lang.com/) to CSS
 - [autoprefixes](https://github.com/postcss/autoprefixer) your CSS with vendor prefixes for cross-browser compability
 - combines all CSS files into one big file (website will load faster as there will be fewer HTTP requests)
 - transpiling ES6 JavaScript to an older version (enables you to use modern JavaScript without worrying about older browsers)
 - combines all of your JavaScript libraries (e.g. Bootstrap, jQuery) into one big file (website will load faster as there will be fewer HTTP requests)
 - optimizes your images for web (lower bandwidth usage, faster website)

If some parts remain confusing, don't hesitate to contact me at luka.bacic278@gmail.com

## Requirements
To be able to use this workflow, you need:
- A local web and database server with WordPress installed and configured ([guide](https://www.wpbeginner.com/wp-tutorials/how-to-create-a-local-wordpress-site-using-xampp/))
- basic understanding of using the terminal
- Node.js installed globally ([guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))

## Installation

0. **Important!** You need to install WordPress, set up the database and the database connection!
1. Download this repo as a ZIP, extract files, and copy `example_theme` directory to your WordPress' `themes` folder: `your-project/wp-content/themes/`

2. Open a terminal and navigate to the folder you just copied over (`example_theme`)
```
cd wp-content/themes/example_theme
```

3. Then run:
```
npm install
```
This will install all the required dependencies to enable the workflow. It will take several minutes. When it finishes a new folder will appear called `node_modules`.

## Directory Structure

For the sake of everything making sense, lets look how the default folder structure is organized:

```
example_theme/
|-- dist/
|   |-- css/
|   |   `-- all-css.min.css
|   |-- images/
|   `-- js/
|       |-- libraries.min.js
|       `-- main.js
|-- node_modules/
|-- prototype/
|   |-- _css/
|   |   |-- bootstrap.min.css
|   |   `-- theme-style.css
|   |-- _img/
|   |   `-- lizard.jpg
|   |-- _js/
|   |   |-- libraries/
|   |   |   |-- bootstrap.bundle.min.js
|   |   |   `-- jquery-3.4.1.min.js
|   |   |-- modules/
|   |   |   `-- alert.js
|   |   `-- main.js
|   `-- _sass/
|       |-- libraries/
|       `-- theme-style.scss
|
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
1. For development purposes: `example_theme/prototype/`
2. Production files: `example_theme/dist/`

#### Source/Development files

`prototype/` is the directory where you will work in. It has 4 subdirectories. All subdirectories have an underscore before their name so you know that these files are for developing purposes, and not ready to be served for production. We will go over them in a specific order, to make more sense.

1. `_sass/` - All your SCSS source files should be located here. You can further organize your SCSS files to whatever convention you prefer (e.g. [7-1 Pattern](https://sass-guidelin.es/#the-7-1-pattern)), but make sure the SCSS compiles to one file.

2. `_css/` - This directory should contain all CSS files. Your SCSS code will compile to this directory! That's why there is a file called `theme-style.css`. If your are using any CSS library, make sure to copy the library's CSS into this directory (like Bootstrap, Tailwind CSS, etc.). When you run the command `gulp`, gulp will combine all of the CSS files located in this directory into one big minified CSS file. This is done so fewer HTTP requests are called when a website is loading, which increases its loading speed.

3. `_js/` - This directory contains all of the JavaScript your site needs. Whether its a library like jQuery or just some custom JS you wrote, you place it here. However, there is a structure to be followed:
    - `libraries/` - Here you copy libraries you want to use, like jQuery, Bootstrap, and other libraries.
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
 - compressed and optimized images
 - minified and vendor prefixed stylesheets, combined into 1 file
 - compiled scripts so olderbrowsers can understand it, and combined into 2 files for faster loading. It is also [browserified](http://browserify.org/) so all of the JS is in the browser.

The subdirectories are self explanatory:
1. `css/` - there will be one file, called `all-css.min.css`. You enqueue this stylesheet in your `functions.php` file. There is an example below on how to do this.

2. `images/` - all your images will be copied here. If you further organized them in subdirectories, it will be copied over. There is an example below on how to include these images in your template files or stylesheets.

3. `js/` - you will have 2 files here. There is an example below on how to include them in your site.
    - `libraries.min.js` - all files located in `prototype/_js/libraries/` will be combined in this one file.
    - `main.js` - your custom JS code will be here, including all of the modules you created under `prototype/_js/modules/` (provided you imported them in `prototype/_js/main.js`).
    
#### Node modules
This directory will automatically be created after you run `npm install`. You don't need to do anything with this, and you don't delete it if you want to use gulp.

#### WordPress files
- `index.php` and `style.css` - the 2 files every WordPress theme must have.
- `functions.php` - used to add stylesheets, scripts, fonts and cool WordPress functionalities.

#### .gitignore
If you use Git (which you probably should), this file ignores files you don't want to have in your branch.

#### Workflow files
- `package.json` - this file contains information about your theme and dependencies
- `package-lock.json` - describes the exact dependency tree, you never modify this file directly
- `gulpfile.js` - the brain of this repository. This makes your development life easier.

## Configuration

You need to set up some important settings so this will work on your machine. 

### Required config
If you want to start coding immediately and keep the directory structure along with their names, you only need to configure the bare minimum.

1. Open `gulpfile.js` and modify the variable `serverUrl` on line 1. You need to paste in the url of how you access your project on local. Depending on your OS and stack, it may look something like this:

```
127.0.0.1:8080/your-project
```

Then your line 1 in `gulpfile.js` will look like this:

```
var serverURL = '127.0.0.1:8080/wordpress';
```

2. Open `style.css` and add your details.
3. Rename the theme folder.
### Optional config
If you want to change the default file names, the folder structure, or remove some tasks from the default task, feel free to do so. However, you need to update all the new names and file paths in `gulpfile.js`.

At the beginning of `gulpfile.js` you will find 4 variables which you can modify to your needs.

- `root` - if you wish to move the directory where gulp is located, you change this file so every other file reference gets updated. Make sure to move all required files (`package.json`, `gulpfile.js`, etc.)
- `devFiles` - the directory name where the source files are located.
- `prodFiles` - the directory name where the production ready files are located.
- `fileNames` - an object containing file names when gulp outputs the production files
- `src` - an object containing file paths for SCSS, CSS, JS, images and PHP files.

## Adding the stylesheet and JavaScript files
To include the production stylesheet and JavaScript files, you need to hook into the [wp_enqueue_scripts](https://developer.wordpress.org/reference/hooks/wp_enqueue_scripts/) WordPress hook in your `functions.php`, like so:

```
function resources() {
  // Add all JS libraries 
  wp_enqueue_script( 'libraries', get_template_directory_uri() . '/dist/js/libraries.min.js', array(), true , true );
  
  // Custom site scripts
  wp_enqueue_script( 'main', get_template_directory_uri() . '/dist/js/main.js', array(), true , true );

  // Stylesheet 
  wp_enqueue_style( 'theme-style', get_template_directory_uri() . '/dist/css/all-css.min.css' );
}
add_action('wp_enqueue_scripts', 'resources');
```

The important part here is to reference these files from the `dist/` directory, and **not** the `prototype/` directory!

Besides adding your scripts from `dist/`, it is also crucial to add the attribute `type="module"` to the main script being included. Otherwise, you will get weird errors in the console that are hard to debug. We do that in `functions.php` like this:

```
// Add type="module" for the main script
function add_type_attribute($tag, $handle, $src) {
  // if not your script, do nothing and return original $tag
  if ( 'main' !== $handle ) {
    return $tag;
  }
  // change the script tag by adding type="module" and return it.
  $tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
  return $tag;
}
add_filter('script_loader_tag', 'add_type_attribute' , 10, 3);
```
