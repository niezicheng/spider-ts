import gulp from 'gulp';
import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
const gulpclean = require('gulp-clean');

const tsProject = ts.createProject("tsconfig.json", {});
const { src, dest, series } = gulp;

const compileFiles = ['./src/**/*.js', './src/**/*.ts'];
const assetFiles = ['./src/**/*.json'];

const outDir = 'dist';

const compile = () => {
  return src(compileFiles)
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write('../maps'))
    .pipe(dest(outDir))
};

const copyAsset = () => {
  return src(assetFiles)
    .pipe(dest(outDir))
}

const clean = () => {
  return src('dist/**', { read: false })
    .pipe(gulpclean());
}

const watch = () => {
  gulp.watch(compileFiles, compile);
  gulp.watch(assetFiles, copyAsset);
}

export const dev = series(copyAsset, compile, watch);

export default series(clean, copyAsset, compile);