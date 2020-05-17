# Workflow for WordPress themes
This file should provide sufficient instructions on how to get the workflow started.

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
 - basic understanding of using terminal commands
 - Node.js installed globally

If you don't have Node.js installed, you can install it from [here](https://nodejs.org/en/).

When you finish installing, you can check if it was installed successfully by opening a new terminal and running `node -v` and `npm -v`. Your output should be similar to this:

```
$ node -v
v10.19.0

$ npm -v
6.13.4
```

## Installing

1. Open a terminal and navigate to your WordPress theme's folder. Example: 
```
cd path/to/xampp/your-project/wp-content/themes/your-theme
```
`path/to/xampp` is where you installed your Apache PHP and MySQL stack, this depends if you used xampp, mamp, lamp, and which operating system your are using.

`your-project` is the name of the whole WordPress project which contains your theme.

`your-theme` is the custom theme you created 

2. When you are in your theme's directory, run:
```
$ npm install
```
This will install all the required dependencies to enable the workflow. It will take several minutes. When it finishes a new folder will appear called `node_modules`.

## Folder Structure

For the sake of everything making sense, lets look how the default folder structure is organized:

```
example_theme/
|-- assets/
|   |-- _css/
|   |   |-- bootstrap.min.css
|   |   `-- theme-style.css
|   |-- _img/
|   |-- _js/
|   |   |-- libraries/
|   |   |-- modules/
|   |   `-- main.js
|   `-- _sass/
|       `-- theme-style.scss
|-- dist/
|   |-- css/
|   |   `-- all-css.min.css
|   |-- images/
|   `-- js/
|       |-- libraries.min.js
|       `-- main.js
|-- node_modules/
|
|-- style.css
|-- .gitignore
|-- gulpfile.js
|-- package.json
|-- package-lock.json
|-- functions.php
`-- index.php
```
### Folder structure explained

There are 2 main subfolders in the `example_theme`.
1. For development purposes: `example_theme/assets/`
2. Production files: `example_theme/dist/`

#### Source/Development files

`assets/` is the folder where you will work in. It has 4 subdirectories. All subdirectories have an underscore before their name so you know that these files are for developing purposes, and not ready to be served for production. We will go over them in a specific order, to make more sense.

1. `_sass/` - This folder **needs** to have a file called `theme-style.scss`. You can further organize your SCSS files to whatever convention you prefer (e.g. [7-1 Pattern](https://sass-guidelin.es/#the-7-1-pattern)), but make sure the SCSS compiles to this one file. You can change the name if you like, but make sure to change it in the `gulpfile.js` too!

2. `_css/` - This folder should contain all CSS files. Your SCSS code will compile to this folder! That's why there is a file called `theme-style.css`. If your are using any CSS library, make sure to copy the library's CSS into this folder (like Bootstrap, Tailwind CSS, etc.). When you run the command `gulp`, gulp will combine all of the CSS files located in this directory into one big minified CSS file. This is done so fewer HTTP requests are called when a website is loading, which increases its loading speed.

3. `_js/` - This folder contains all of the JavaScript your site needs. Whether its a library like jQuery or just some custom JS you wrote, you place it here. However, there is a structure to be followed:
    - `libraries/` - Here you copy libraries you want to use, like jQuery, Bootstrap, and other libraries.
    - `modules/` - Here is the custom JS you write, but split into modules to increase modularity and readability. For example: you want to create a module to alert something to the user. You would create a new file `alert.js`, create a new class, export it as default, and add a constructor which contains your code:

    ```
    "use strict";

    export default class Alert {
        constructor() {
            alert("Hello world!");
        }
    }
    ```
    - `main.js` - The main JS file which should power your application. This file should include all of your modules. To insert our `alert.js` module from the previous example, we can do something like this. (this example assumes you are using jQuery)
    
    ```
    "use strict";

    import Alert from './modules/alert.js';

    $(document).ready(function() {
        new Alert();
    });
    ```

4. `_img/` - This folder should contain all of your images - JPG, PNG, GIF and SVG. You can further organize the images in subfolders, the folder structure will be copied in the production folder when you run `gulp`


#### Production files
`dist` is the folder where production ready files are stored. If you are going to display an image in one of your WordPress template files, include a stylesheet or a JavaScript file - you should reference them for here. After gulp processes the files in the `assets` folder, the files in `dist` are:
 - compressed and optimized images
 - minified and vendor prefixed stylesheets, combined into 1 file
 - compiled scripts so olderbrowsers can understand it, and combined into 2 files for faster loading. It is also [browserified](http://browserify.org/) so all of the JS is in the browser.

The subdirectories are self explanatory:
1. `css/` - there will be one file, called `all-css.min.css`. You enqueue this stylesheet in your `functions.php` file. There is an example below on how to do this.

2. `images/` - all your images will be copied here. If you further organized them in subdirectories, it will be copied over. There is an example below on how to include these images in your template files or stylesheets.

3. `js/` - you will have 2 files here. There is an example below on how to include them in your `functions.php`.
    - `libraries.min.js` - all files located in `assets/_js/libraries/` will be combined in this one file.
    - `main.js` - your custom JS code will be here, including all of the modules you created under `assets/_js/modules/` (provided you imported them in `assets/_js/main.js`).
    
#### Node modules
This folder will automatically be created after you run `npm install`. You don't need to do anything with this, and you don't delete it if you want to use gulp.

### WordPress files
The 2 files every theme must have are `index.php` and `style.css`, and a very basic version of them is included in this example theme. However, if you want to make a custom theme you probably want to add the other [template files](https://developer.wordpress.org/themes/basics/template-hierarchy/).

#### Adding the stylesheet and JavaScript files
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

The important part here is to reference these files from the `dist/` directory, and **not** the `assets/` directory!

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

