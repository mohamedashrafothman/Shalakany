//
// ─── 1- IMPORTING DEPENDENCIES ─────────────────────────────────────────────────────
//

'use strict';
var pug                    = require('gulp-pug');
var util                   = require('gulp-util');
var gulp                   = require('gulp');
var sass                   = require('gulp-sass');
var size                   = require('gulp-size');
var cache                  = require('gulp-cache');
var rtlcss                 = require('gulp-rtlcss');
var rename                 = require('gulp-rename');
var prefix                 = require('gulp-autoprefixer');
var uglify                 = require('gulp-uglify');
var buffer                 = require('vinyl-buffer');
var source                 = require('vinyl-source-stream');
var imagemin               = require('gulp-imagemin');
var browserify             = require('browserify');
var sourcemaps             = require('gulp-sourcemaps');
var prettyHtml             = require('gulp-pretty-html');
var browserSync            = require('browser-sync').create();
var tildeImporter          = require('node-sass-tilde-importer');
var imageminZopfli         = require('imagemin-zopfli');
var imageminMozjpeg        = require('imagemin-mozjpeg');
var imageminPngquant       = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');


//
// ─── 2- CONFIGURATIONS ──────────────────────────────────────────────────────────
//

var config = {
	is_prod: !!util.env.production,
	assets_dir: "src",
	build_dir: "build",
	is_arabic_included: false,
	sass: {
		file_path_and_pattern: "sass/style.scss"
	},
	rtl: {
		file_path_and_pattern: "styles/style.min.css"
	},
	js: {
		file_path_and_pattern: "scripts/script.js"
	},
	pug: {
		file_path_and_pattern: "views/**/*.pug"
	},
	html: {
		file_path_and_pattern: "**/*.html"
	},
	images: {
		file_path_and_pattern: "images/**/*.+(png|jpg|gif|svg|ico)"
	},
	fonts: {
		file_path_and_pattern: "fonts/**/*.+(eot|svg|ttf|woff|woff2)"
	}
};


var tasks = ['fonts', 'images', 'sass', config.is_arabic_included ? 'rtl' : undefined, 'js', 'pug'];


//
// ─── 3- GULP TASKS ──────────────────────────────────────────────────────────────
//

gulp.task('pug', function () {
	return gulp
		.src([config.assets_dir + "/" + config.pug.file_path_and_pattern, '!' + config.assets_dir + '/views/**/_*.pug'])
		.pipe(pug({
			pretty: config.is_prod,
			data: {
				lang: "en",
				sitename: {
					en: "Shalakany",
					ar: "الشلقاني"
				}
			}
		}))
		.pipe(gulp.dest(config.build_dir))
		.pipe(browserSync.stream())
});

gulp.task('html-pretty', function () {
	return gulp
		.src([config.build_dir + "/" + config.html.file_path_and_pattern])
		.pipe(prettyHtml({
			indent_size: 4,
			indent_char: ' ',
			indent_with_tabs: true,
		}))
		.pipe(gulp.dest(config.build_dir))
		.pipe(browserSync.stream());
});


gulp.task('sass', function () {
	return gulp
		.src([config.assets_dir + '/' + config.sass.file_path_and_pattern])
		.pipe(!config.is_prod ? sourcemaps.init() : util.noop())
		.pipe(sass.sync({
			includePaths: ['node_modules/'],
			outputStyle: config.is_prod ? "compressed" : "compact",
			importer: tildeImporter
		}).on('error', sass.logError))
		.pipe(prefix('last 2 versions'))
		.pipe(rename(function (path) {
			path.basename += ".min"
		}))
		.pipe(!config.is_prod ? sourcemaps.write() : util.noop())
		.pipe(gulp.dest(config.build_dir + '/styles'))
		.pipe(config.is_prod ? size({
			pretty: true,
			showFiles: true
		}) : util.noop())
		.pipe(browserSync.stream());
});

gulp.task('rtl', function () {
	return gulp
		.src([config.build_dir + '/' + config.rtl.file_path_and_pattern])
		.pipe(config.is_prod ? sourcemaps.init() : util.noop())
		.pipe(rtlcss())
		.pipe(rename(function (path) {
			path.basename = path.basename.split('.');
			path.basename[0] = path.basename[0] + '-rtl';
			path.basename = path.basename.join('.');
		}))
		.pipe(config.is_prod ? util.noop() : sourcemaps.write())
		.pipe(gulp.dest(config.build_dir + '/styles'))
		.pipe(config.is_prod ? size({
			pretty: true,
			showFiles: true
		}) : util.noop())
		.pipe(browserSync.stream());
});

gulp.task('js', function () {
	return browserify({
			entries: config.assets_dir + '/' + config.js.file_path_and_pattern,
			debug: true
		}) // src/scripts/script.js
		.transform('babelify', {
			presets: ['env']
		})
		.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(config.is_prod ? uglify({
			mangle: false,
			output: {
				beautify: false
			}
		}) : util.noop()) // uglify only in is_prod
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(config.build_dir + '/scripts'))
		.pipe(config.is_prod ? size({
			pretty: true,
			showFiles: true
		}) : util.noop())
		.pipe(browserSync.stream());
});

gulp.task('fonts', function () {
	return gulp
		.src([config.assets_dir + '/' + config.fonts.file_path_and_pattern])
		.pipe(gulp.dest(config.build_dir + '/fonts'))
		.pipe(browserSync.stream());
});

gulp.task('images', function () {
	return gulp
		.src([config.assets_dir + '/' + config.images.file_path_and_pattern])
		.pipe(cache(imagemin([
			imageminPngquant({
				speed: 1,
				quality: 98
			}),
			imageminZopfli({
				more: true,
				iterations: config.is_prod ? 50 : 10
			}),
			imagemin.svgo({
				plugins: [{
					removeViewBox: false
				}]
			}),
			imagemin.jpegtran({
				progressive: true
			}),
			imageminJpegRecompress({
				loops: 6,
				min: 40,
				max: 85,
				quality: 'low'
			}),
			imageminMozjpeg({
				quality: 90
			})
		])))
		.pipe(gulp.dest(config.build_dir + '/images'))
		.pipe(browserSync.stream());
});


//
// ─── 4- WATCH TASKS ─────────────────────────────────────────────────────────────
//
gulp.task('dev', gulp.series(...tasks.filter(Boolean), function () {
	browserSync.init({
		server: './' + config.build_dir,
		open: false
	});
	gulp.watch(['src/fonts/**/*.+(eot|svg|ttf|woff|woff2)'], gulp.series('fonts'));
	gulp.watch(['src/images/**/*.+(png|jpg|gif|svg|ico)'], gulp.series('images'));
	gulp.watch(['src/sass/**/*.scss', 'src/sass/*.scss'], gulp.series('sass'));
	if (config.is_arabic_included) {
		gulp.watch(['build/styles/style.min.css'], gulp.series('rtl'));
	}
	gulp.watch(['src/scripts/**/*.js', 'src/scripts/*.js'], gulp.series('js'));
	gulp.watch(['src/views/*.pug', 'src/views/**/*.pug'], gulp.series('pug'));
	gulp.watch('./build/*.html').on('change', browserSync.reload);
}));
gulp.task('prod', gulp.series(...tasks.filter(Boolean)));
