const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const pwaService = require('../src/base/services/pwa');
const routes = require('../src/routes');

function init(){
  console.log('Compiling...');
  webpack(webpackConfig).run(onCompilationSuccess);
}

function onCompilationSuccess(err, stats){
  if(!err) {
    const assetFilenames = Object.keys(stats.compilation.assets);
    generateServiceWorkerFile(formatAssetFilenames(assetFilenames));
    handleWebfontsPreload(filterAssetsByExtesion(assetFilenames, ['.woff2', '.html']));
    generateManifestFiles();
    console.log('Compiled successfully!');
  }
}

function formatAssetFilenames(assets){
  return JSON.stringify(assets.map(filepath => `/${filepath}`));
}

function generateServiceWorkerFile(assets){
  const originDir = path.resolve(__dirname, '../src/base/workers');
  const filename = '/main-sw.js';
  const data = fs.readFileSync([originDir, filename].join(''), 'utf-8');
  fs.writeFileSync(
    [getTargetDirectoryPath(), filename].join(''),
    data.replace('{version}', Date.now()).replace('const ASSETS = [];', `const ASSETS = ${assets};`)
  );
}

function handleWebfontsPreload([webfontFilenames, htmlFilenames]){
  htmlFilenames.forEach(htmlFilename => {
    const fullFilename = path.resolve(getTargetDirectoryPath(), htmlFilename)
    const html = fs.readFileSync(fullFilename, 'utf-8');
    fs.writeFileSync(
      fullFilename,
      html.replace('<!-- WEBFONT:PRELOAD -->', buildWebfontPreloadTags(webfontFilenames))
    );
  })
}

function filterAssetsByExtesion(assetFilenames, extensions){
  return extensions.map(extension => assetFilenames.filter(filename => filename.includes(extension)))
}

function buildWebfontPreloadTags(webfontFilenames){
  return webfontFilenames.map(filename => `<link rel="preload" href="${filename}" as="font">`).join('');
}

function generateManifestFiles(){
  ['en-US', 'pt-BR'].forEach(locale => {
    fs.writeFileSync(
      `${getTargetDirectoryPath()}/${buildManifestFilename(locale)}`,
      JSON.stringify(pwaService.buildManifestByLocale(locale))
    )
  });
}

function buildManifestFilename(locale){
  return locale == 'en-US' ? 'manifest.json' : `manifest-${locale}.json`;
}

function getTargetDirectoryPath(){
  return path.resolve(__dirname, '../dist');
}

init();
