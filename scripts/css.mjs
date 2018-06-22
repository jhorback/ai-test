import postcss from 'postcss';
//import postcssSass from '@csstools/postcss-sass';
import postcssPresetEnv from 'postcss-preset-env';
import sass from 'node-sass';
import glob from 'glob';
import fs from 'fs';
import path from 'path';


class CSS {
    constructor() {
        //const plugins = [postcssSass, postcssPresetEnv];
        const env = postcssPresetEnv({
            stage: 3,
            browsers: "ie 11"
        });

        const plugins = [env];
        this.postCssProcessor = postcss(plugins);
    }

    async process() {
        try {
            const paths = await this.getSassFilePaths();
            this.processSassFiles(paths);
        } catch (error) {
            console.log("ERROR", error);
        }
    }

    getSassFilePaths() {
        return new Promise((resolve, reject) => {
            glob("src/**/*.scss", {
                ignore: "src/**/_*.scss",
            }, (err, files) => {
                err ? reject(err) : resolve(files);
            });
        });
    }

    processSassFiles(paths) {
        paths.forEach(p => this.processSassFile(p));
    }

    async processSassFile(filePath) {
        console.log("css: processing file", filePath);
        try {
            const css = await this.renderSassFromFile(filePath);
            const result = await this.postCssProcessor.process(css, {
                from: null
            });
            const cssJs = this.getJsTemplate(result.css);
            const dir = path.dirname(filePath);
            const name = path.basename(filePath, ".scss");

            fs.writeFile(`${dir}/${name}-css.js`, cssJs, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
            console.log("POSTCSS RESULT", );        
        } catch (err) {
            console.log("css: ERROR", err);
        }
    }

    renderSassFromFile(file) {
        return new Promise((resolve, reject) => {
            sass.render({
                file
            }, (err, result) => {
                err ? reject(err) : resolve(result.css.toString('utf8'));
            });
        });
    }

    readFile(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                err ? reject(err) : resolve(data.toString('utf8'));
            });
        }); 
    }

    getJsTemplate(style) {
        return `
/**
 * Generated css.
 */
import {html} from '/node_modules/@polymer/polymer/polymer-element.js';

export const style = html\`
<style>
${style}
</style>\`;
        `;
    }
}




const css = new CSS();
css.process();
/*
    why does node-sass not work with a file path?
        if using data need to tell it a hint for imports?!
    Need to pass browserlist options to post css
    need to generate the .css.js file with the correct path
*/


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




/*
try using postcss first for sass, css next, and minification

need to minify
need to pull in all src/*.scss files
for each file need to output the .css.js file
*/
