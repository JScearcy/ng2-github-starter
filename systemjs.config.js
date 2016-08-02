(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'main':                       'src/',
    '@angular':                   'node_modules/@angular',
    'rxjs':                       'node_modules/rxjs',
    'tiny-ng-store':              'node_modules/tiny-ng-store',
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'main':                       { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'tiny-ng-store':              { defaultExtension: 'min.js' },
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
  ];
  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {
    packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js',  defaultExtension: 'js' };
  });
  var config = {
    map: map,
    packages: packages,
    paths: {
          'tether': 'https://cdnjs.cloudflare.com/ajax/libs/tether/1.2.0/js/tether.js'
        },
  }
  System.config(config);
})(this);