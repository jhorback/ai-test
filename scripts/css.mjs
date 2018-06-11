import postcss from 'postcss';
import postcssSass from '@csstools/postcss-sass';
import postcssPresetEnv from 'postcss-preset-env';
import glob from 'glob';



function getSassFiles() {
    return new Promise((resolve, reject) => {
        glob("src/**/*.scss", (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
}

async function test() {
    // postcss([postcssSass, postcssPresetEnv]);

    console.log("Testing...");
    try {
        const files = await getSassFiles();
        console.log(files);
        console.log("SUCCESS");
    } catch (error) {
        console.log("ERROR", error);
    }
    
    //console.log(postcssSass);
    // sass.render({
    //     file: "src/my-app-elements/my-app/my-app.scss"
    // }, (err, result) => {
    //     console.log(result.css.toString('utf8'), err);
    // });    
}

/*
try using postcss first for sass, css next, and minification

need to minify
need to pull in all src/*.scss files
for each file need to output the .css.js file
*/


test();


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
    

    NO!!!!! - only have one sass output and target ie11 with hacks/strategies/enhancements to enable modern browers.
        could do an .ie.scss that gets bundled in the index if needed

`;