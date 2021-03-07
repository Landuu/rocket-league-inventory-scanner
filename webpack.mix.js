// webpack.mix.js

let mix = require('laravel-mix');

mix
    .ts('src/app.ts', 'dist')
    .setPublicPath('dist');