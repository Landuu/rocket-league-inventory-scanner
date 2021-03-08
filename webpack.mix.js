// webpack.mix.js

let mix = require('laravel-mix');

mix
    .ts('src/app.ts', 'dist')
    .ts('src/lib.ts', 'dist')
    .ts('src/bootstrap.ts', 'dist')
    .sass('src/app.scss', 'dist')