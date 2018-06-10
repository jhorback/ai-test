const sass = require('node-sass');



/*
sass.render({
  file: scss_filename,
  [, options..]
}, function(err, result) { /*...* / });
// OR
var result = sass.renderSync({
  data: scss_content
  [, options..]
});
*/

console.log("Running sass");


const comments = `
    take all .scss files and generate a .css.js file that can be imported
    watch any change to a single .scss file and re-generate that file
    should support multiple configurations
        i.e.
            yarn sass:modern
            yarn sass:ie11
            yarn sass (same as yarn sass:modern)
    since ie11 will be a different output, need to make sure any other scripts behave as expected
        yarn start ()


    yarn start
    yarn start:ie11
    yarn serve - sass:modern
    yarn build - builds ie11 first so modern .css.js is on disk
    yarn sass:ie11 ?
    

    NO!!!!! - only have one sass output and target ie11 with hacks/strategies/enhancements to enable modern browers.

`;