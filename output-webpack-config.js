const R = require('ramda');
const { getLoader, loaderByName } = require("@craco/craco");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs-extra');
const path = require('path');
const dayjs = require("dayjs");

module.exports = {
    overrideWebpackConfig: ({ webpackConfig, pluginOptions, context: { env } }) => {
        const buildTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
        fs.writeJsonSync(path.join(__dirname, 'src/output.json'), { buildTime });
        if (pluginOptions.preText) {
            // console.log(pluginOptions.preText);
        }
        const index = webpackConfig.plugins.findIndex(item => item instanceof MiniCssExtractPlugin);
        const miniCss = new MiniCssExtractPlugin({
            filename: "static/css/[name].css",
        });
        if (index !== -1) {
            webpackConfig.plugins[index] = miniCss
        } else {
            webpackConfig.plugins.push(miniCss)
        }

        const { oneOf:rulesOneOf } = webpackConfig.module.rules.find(function (rule) {
            return rule.oneOf !== undefined
        });

        const { match: { loader: fileLoader, index: fileLoaderIndex} } = getLoader(webpackConfig, loaderByName("file-loader"))||{};

        if (fileLoader){  
            rulesOneOf[fileLoaderIndex].exclude.push(/\.module\.(le|sc|sa)ss$/);
        } 

        const lessRule = R.find(function (rule) {
            return String(rule.test) === String(/\.less$/)
        }, rulesOneOf);
        let lessUse = R.clone(lessRule.use);

        const _index = R.findIndex(u => u.loader === require.resolve('css-loader'), lessUse );
        if(_index){
            lessUse[_index] = R.mergeDeepRight(lessUse[_index],{options:{
                modules:{
                    // localIdentName: "Yc2-[path][name]---[local]----[hash:5]",
                    localIdentName: "Yc2-[local]-[hash:5]", 
                }
            }})
        }
        const lessModuleRule = {
            test: /\.module\.less$/,
            use: lessUse
        };

        rulesOneOf.push(lessModuleRule); 
        // console.log(JSON.stringify(webpackConfig, null, 4));
        return webpackConfig;
    }
};