const CracoLessPlugin = require('craco-less');
const CracoAlias = require("craco-alias");
const outputWebpackConfigPlugin = require("./output-webpack-config");
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = {
    style: {
        modules: {
            localIdentName: "Yc1-[path]-[name]-[local]-[hash:5]", 
        },
    },
    webpack:{
        configure: (webpackConfig,{env})=>{
            webpackConfig.devtool = env === "development" ? "cheap-module-eval-source-map" : "";
            webpackConfig.output.filename = "static/js/[name].js";
            webpackConfig.optimization = {
                ...webpackConfig.optimization,
                splitChunks: {
                    cacheGroups: {
                        default: false
                    }
                },
                runtimeChunk: false
            };
            return webpackConfig;
        }
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': 'red',
                            // '@font-size-base': '1rem', // 主字号
                        },
                        javascriptEnabled: true
                    }
                },
            }
        },
        {
            plugin: outputWebpackConfigPlugin,
            options: { preText: "Will log the override webpack config:" }
        },{
            plugin: new AntdDayjsWebpackPlugin()
        },{
            plugin: CracoAlias,
            options: {
                // see in examples section
                aliases:{
                    '@base': './src',
                }
            }
        },
    ],
    
}