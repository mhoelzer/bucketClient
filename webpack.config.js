// webpack and babel help compile everything into bundle.js
module.exports = {
	devtool: 'source-map',
	// webpack is supplying entry point for the first/root JS file for app
	entry:[
		'./src/index.js'
	],
	output: {
		path: __dirname,
		// says that bundle code will be accessible at
		publicPath: '/',
		// all js code will get bundled up into a file called bundle.js
		filename: 'bundle.js'
	},
	module: {
		// an array w/ object in it. it will not load all of the node modules 
		loaders: [{
			exclude: /node_modules/,
			loader: 'babel',
		      query: {
		      	// point to what we want to load to transpile ffrom es6 to es5
		        presets: ['react', 'es2015', 'stage-1']
		      }
		}]
	},
	resolve: {
		// this will get any files with .js or .jsx extension. the empty string will find files we have in require('./users') that dont have .js/.jsx extensions
		extensions: ['', '.js', '.jsx']
	},
	devServer: {
		// allows the use of html5 histpry api. this api gives developers the ability to modify a websites url w/o a full page refresh
		historyApiFallback: true,
		contentBase: './'
	}
};