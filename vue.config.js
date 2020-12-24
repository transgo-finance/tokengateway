const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  chainWebpack: (config) => {
    config
    .optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    });
    
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@components", resolve("src/components"));

      
  },
};
