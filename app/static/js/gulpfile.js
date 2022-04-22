const { src, dest, watch, parallel } = require('gulp');
// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
// JS
const terser = require('gulp-terser-js');
// IMG
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    // Identificar el archivo .scss a compilar
    src('../scss/**/*.scss')
        .pipe( sourcemaps.init() ) // Guardar instancia de archivos originales // // //
        .pipe( plumber() ) // Verificar que no haya errores sin detener la ejecucion del watch //
        // Compilarlo
        .pipe( sass() )
        // minificar css // //
        .pipe( postcss([autoprefixer(), cssnano()]) )
        // Almacenar los archivos originales
        .pipe( sourcemaps.write('.') )
        // Almacenarlo
        .pipe( dest('../css/') );
    //---------------------------------------------
    done();
}

function img_min(done){
    const config = {
        optimizationLevel: 3
    };

    src('../img/*.{png,jpg}')
        .pipe( cache( imagemin(config) ) )
        .pipe( dest('../img/min/') );
    //
    done();
}

function v_webp (done){
    const config = {
        quality: 50
    };

    src('../img/*.{png,jpg}')
        .pipe( webp(config) )
        .pipe( dest('../img/') );
    //
    done();
}

function v_avif (done){
    const config = {
        quality: 50
    };

    src('../img/*.{png,jpg}')
        .pipe( avif(config) )
        .pipe( dest('../img/') );
    //
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

function watch_sass(done) {
    watch('../scss/**/*.scss', css);
    done();
}

exports.css     = css;
exports.v_webp  = v_webp;
exports.v_avif  = v_avif;
exports.img_min = img_min;
exports.watch_sass = watch_sass;
exports.image_conversion = parallel(v_webp, v_avif, img_min);
exports.dev = parallel(img_min, v_avif, v_webp, dev);