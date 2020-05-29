### Morrdi

Website: coming soon


### Table of Contents
<a name="table-of-contents"></a>
  1. [Used Technologies](#used-technology)
  1. [Setup](#Local-Setup)
  1. [Scripts](#Available-scripts)
  1. [Folder Structure](#folder-structure)


### Used technologies
<a name="used-technology"></a>
* `Bootstrap 4` (rtl & ltr)
* `FontAwesome`
* `SASS`
* `PUG`
* `ECS6`
* `Gulp`
* list of `gulp` tasks such as gulp-sass, gulp-pug, gulp-cssmin, gulp-uglify, gulp-autoprefixer, gulp-concat, and more.
* `JQuery`
* `animated.css`
* `Swiper.js`

**[⬆ back to top](#table-of-contents)**


### Local Setup
<a name="Local-Setup"></a>
* Clone the repository locally.
* If you don't have Node installed, [install it](https://nodejs.org/en/download/).
* In a console window, navigate to the repository directory and install the dependencies with `npm install`.
* In your console window, execute `npm start` to launch the application.  It will be viewable in your browser at [http://localhost:3000/](http://localhost:3000/).

**[⬆ back to top](#table-of-contents)**


### Available scripts
<a name="Available-scripts"></a>
+ `npm start` - run npm build:dev command.
+ `npm run build:dev` - run gulp for development mode, This enable some functionality belongs to development only, such as sourcemaps files.
+ `npm run build:prod` - run gulp for production mode, This uglify scripts files and minify style files.
+ `npm run clean` - clean build folder.

**[⬆ back to top](#table-of-contents)**

### Folder structure
<a name="folder-structure"></a>

	.
	├── build/                   				# Compiled files (alternatively `dist`).
	├── node_modules/            				# Defines what libraries will be installed into `node_modules` when you run npm install.
	├── src/                     				# Source files (alternatively `lib` or `app`).
	│   ├── fonts/               				# Fonts folder.
	│   ├── images/	            				# Images folder.
	│   ├── sass/                				# Style folder using `SASS`.
	│   │  ├── partials/         				# `SASS`s partials and component folder.
	│   │  ├── helpers/         				# `SASS` Helper files.
	│   │  ├── mixins/         					# `SASS` Mixins files.
	│   │  ├── pages/         					# `SASS` files for each page of the application.
	│   │  ├── components/         				# `SASS` reusable components files.
	│   │  ├── libs/         				    # list of libraries source files, such as bootstrap, swiper, fontawesome and material icons.
	│   │  ├── _custom_style                    # this file meant to exist for overwriting purpose..
    │   │  └── style				            # style root file, importing all style assets.
	│   ├── scripts/             				# Javascript folder using `ECS6`
	│   ├── videos/              				# Videos folder
	│   └── views/               				# `Pug` folder, that compiled to `html`.
	│      ├── partials/         				# `pug`s partials and component folder.
	│      ├── mixins/         					# some of `pugs` usefully mixins.
	│      ├── sections/         				# container for website's sections.
	│      ├── layouts/ 		        		# layouts folder for all pug files.
	│      └── index.pug         				# Entry pug file that compiled into `index.html` file.
	├── gulpfile.js             				# `Gulp` file, starter file of this project.
	├── README.md								# Github README.md file.
	└── LICENSE

**[⬆ back to top](#table-of-contents)**
