# Workflow for WordPress themes
---
This file should provide sufficient instructions on how to get the workflow started.

## Why you should use this workflow
This workflow uses [gulp](https://gulpjs.com/) to automate tasks,such as: 
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

#Installing

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

#Folder Structure

For the sake of everything making sense, lets look how the default folder structure is organized:

```
theme_folder/
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
|-- index.php
`-- style.css
```
Lets break it down!

`assets/` is the folder where you will work in. It has 4 subdirectories. All subdirectories have an underscore before their name so you know that these files are for developing purposes, and not ready to be served for production. We will go over them in a specific order, to make more sense.

1. `_sass/` - This folder **needs** to have a file called `theme-style.scss`. You can further organize your SCSS files to whatever convention you prefer (e.g. [7-1 Pattern](https://sass-guidelin.es/#the-7-1-pattern)), but make sure the SCSS compiles to this one file. You can change the name if you like, but make sure to change it in the `gulpfile.js` too!

2. `_css/` - This folder should contain all CSS files. Your SCSS code will compile to this folder! That's why there is a file called `theme-style.css`. If your are using any CSS library, make sure to copy the library's CSS into this folder (like Bootstrap, Tailwind CSS, etc.). When you run the command `gulp`, gulp will combine all of the CSS files located in this directory into one big minified CSS file. This is done so fewer HTTP requests are called when a website is loading, which increases its loading speed.

3. `_js/` - This folder contains all of the JavaScript your site needs. Whether its a library like jQuery or just some custom JS you wrote, you place it here. However, there is a structure inside of it:
    - `libraries` - Here you copy libraries you want to use, like jQuery, bootstrap, and other libraries
    - `modules` - Here is the custom JS you write, but split into modules to increase modularity and readability. For example: you want to create a module to switch