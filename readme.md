# Webpack Setup
(with babel, react, eslint(airbnb))

## Core concepts

* **Entry**
* **Output**
* **Loaders**
* **Plugins**

(Even though webpack starting v4 is config-less, but it's still easier to setup all four core elements by using a config file)

## Steps to setup

1. npm initiate project
`npm init`

2. create **.gitignore** in the root directory
~~~~
## Mac OS
.DS_store

##npm packages
node_modules/

##webpack default output folder
public/
~~~~

3. install webpack 4
`npm install webpack webpack-cli --save-dev`

4. change script to run webpack --watch in **package.json**
~~~~
"dev": "webpack -d --watch",
~~~~

5. install babel
`npm install --save-dev babel-core babel-loader babel-plugin-transform-object-rest-spread babel-preset-env babel-preset-react`
('babel-plugin-transform-object-rest-spread' plugin is for using *rest and spread operators*, optional)

6. install html webpack plugins
`npm install html-webpack-plugin html-loader --save-dev`

7. install css related plugins
`npm install css-loader mini-css-extract-plugin --save-dev`

8. install react related npm
`npm install --save react react-dom`

9. install eslint related npm
run this command to see what eslint-config-airbnb's correct dependency versions are (latest one will have incompatiblity issue)
`npm info "eslint-config-airbnb@latest" peerDependencies`
Then copy and paste the dependency packages and their versions in your dev dependency in package.json:
~~~~
"eslint": "^4.9.0",
"eslint-plugin-import": "^2.7.0",
"eslint-plugin-jsx-a11y": "^6.0.2",
"eslint-plugin-react": "^7.4.0",
~~~~
save and run npm install again to install the required dependencies
`npm install`
`npm install eslint-config-airbnb eslint-loader babel-eslint --save-dev`

10. create **.babelrc** in the root directory
~~~~
{
    "presets": [
        "env", "react"
    ],
    "plugins": ["transform-object-rest-spread"]
}
~~~~

11. create **.eslintrc** in the root directory
~~~~
{
  "parser": "babel-eslint",
  "plugins": ["react", "import", "jsx-a11y"],
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "react/prop-types": [2]
  },
  "extends": ["airbnb"]
}
~~~~
<br/>
(using react environments, so inside 'rules', "prop-types" must be prefixed with "react/", prop-types [2] must be assigned.)


(Might want to do step 12 & 13 at the same time)

12. create **webpack.config.js** in the root directory
~~~~
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcFolder = path.join(__dirname, '/client/src/');

module.exports = {
  entry: {
    main: [path.join(srcFolder, '/js/index.jsx')],
  },
  resolve: { extensions: ['.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcFolder, '/index.html'),
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
~~~~

(**Rules Template**
~~~~
{
        test: /\.YOUR_FILE_EXTENSION$/,
        exclude: /SOMETHING THAT IS THAT EXTENSION BUT SHOULD NOT BE PROCESSED/,
        use: {
          loader: "loader for your file extension  or a group of loaders"
        }
}
~~~~
)

13. layout the folder and file structures:
~~~~
project:
    -> client:
        -> src:
            -> js:
                -> index.jsx
                -> components:
                    -> App.jsx
                    -> Component2.jsx
                    -> Component3.jsx
            -> index.html
            -> css:
                -> main.css
    -> public:
        -> the output transpiled files
~~~~

14. set up the template index html
~~~~
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Title</title>
        <meta name="description" content="description" >
    </head>
    <body>
        <header>
            <h1>Title</h1>
        </header>
        <main>
            <div id="app">
                <span>Will not show this if React Component App is rendered correctly</span>
            </div>
        </main>
    </body>
</html>
~~~~
(using 'html-loader' enables taking the source html as a template and not inserting the css file or js script links; also it can minify the html)

15. import css style files in .js script
~~~~~
import style from '../main.css';
~~~~~
('mini-css-extract-plugin' can load the required css file from each individual js files)

16. run webpack watch in terminal
`npm run dev`
('dev' script is predefined in step 4. index.html and main.css, main.js files will be exported to 'public' folder as user defined.)
