const webpack = require('webpack');
const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const sveltePreprocess = require('svelte-preprocess');

module.exports = (env, args) => {
	const isProduction = args && args['mode'] === 'production';
	console.log('');
	console.log(isProduction ? 'PRODUCTION BUILD' : 'DEVELOPMENT BUILD');
	console.log('');

	const sourcePath = path.join(__dirname, './src');
	const outPath = path.join(__dirname, './dist');

	const config = {
		context: sourcePath,
		entry: {
			main: './main.ts'
		},
		output: {
			path: outPath,
			publicPath: '/',
			filename: isProduction ? 'app-[contenthash].js' : 'app.js',
		},
		target: 'web',
		devtool: isProduction ? false : 'source-map',
		stats: {
			assets: true,
			cached: false,
			cachedAssets: false,
			children: false,
			chunks: false,
			chunkModules: false,
			env: true,
			chunkOrigins: false,
			depth: false,
			entrypoints: true,
			errors: true,
			errorDetails: true,
			hash: false,
			modules: true,
			moduleTrace: false,
			performance: false,
			providedExports: false,
			publicPath: false,
			reasons: false,
			source: false,
			colors: true,
			timings: true,
			usedExports: false,
			version: true,
			warnings: true,
		},
		resolve: {
			alias: {
				svelte: path.resolve('node_modules', 'svelte'),
			},
			extensions: ['.mjs', '.js', '.svelte', '.ts'],
			mainFields: ['svelte', 'browser', 'module', 'main']
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					// eslint
					enforce: 'pre',
					use: [
						{
							options: {
								eslintPath: require.resolve('eslint'),
							},
							loader: require.resolve('eslint-loader'),
						},
					],
					exclude: /node_modules/,
				},
				{
					test: /\.ts?$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'ts-loader',
							options: {
								// transpileOnly: true,
								silent: false,
								configFile: path.resolve('./tsconfig.json')
							},
						}
					]
				},
				{
					test: /\.(html|svelte)$/,
					use: {
						loader: 'svelte-loader',
						options: {
							compilerOptions: {
								// Dev mode must be enabled for HMR to work!
								dev: !isProduction
							},
							emitCss: true,
							preprocess: sveltePreprocess({
								less: true
							}),
							hotReload: !isProduction,
							hotOptions: {
								// List of options and defaults: https://www.npmjs.com/package/svelte-loader-hot#usage
								noPreserveState: false,
								optimistic: true,
							},
							onwarn: (warning, handler) => {
								const {
									code,
									frame
								} = warning;
								if (code.includes('a11y')) {
									return;
								}
								if (code === 'css-unused-selector' && frame.includes('app-navigation')) {
									return;
								}

								handler(warning);
							}
						}
					}
				},
				// Required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
				// See: https://github.com/sveltejs/svelte-loader#usage
				// Also: https://github.com/graphql/graphql-js/issues/2721#issuecomment-723008284
				{
					test: /\.m?js/,
					resolve: {
						fullySpecified: false
					}
				},
				// css (less)
				{
					test: /.(le|c)ss$/i,
					use: [
						{
							loader: MiniCssExtractPlugin.loader
						},
						'css-loader',
						{
							loader: 'less-loader',
						}
					]
				},
			]
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					default: {
						minChunks: 1,
						priority: -20,
						reuseExistingChunk: true
					}
				},
			},
			runtimeChunk: false,
		},
		plugins: [
			new webpack.EnvironmentPlugin({
				NODE_ENV: isProduction ? 'production' : 'development',
				DEBUG: !isProduction
			}),

			new MiniCssExtractPlugin({
				filename: isProduction ? '[name]-[contenthash].css' : '[name].css',
			}),

			new HtmlWebpackPlugin({title: 'Gun|Track'}),
			new FaviconsWebpackPlugin('./assets/icons/logo.png'),

			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve('./src/assets/i18n'),
						to: outPath + '/i18n',
						toType: 'dir'
					},
					{
						from: path.resolve('./src/assets/images'),
						to: outPath + '/images',
						toType: 'dir'
					},
				]
			})
		],
		watchOptions: {
			ignored: /node_modules/
		},
		devServer: {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Expose-Headers': 'Content-Length',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
				'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
			},
			contentBase: path.resolve('./dist'),
			clientLogLevel: 'error',
			historyApiFallback: true,
			compress: false,
			port: 3000,
		},
	};

	if (isProduction) {
		config.optimization.minimize = true;
		config.optimization.minimizer = [
			new TerserPlugin({extractComments: false}),
			new OptimizeCSSAssetsPlugin({}),
		]
	}

	return config;
};
