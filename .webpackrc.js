const path = require('path');

export default {
  extraBabelPlugins: [
    ["import", { "libraryName": "antd",  "style": true }]
  ],
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    utils: path.resolve(__dirname, 'src/utils/'),
    imageAssets: path.resolve(__dirname, 'src/assets/')
  },
  hash: true,
  publicPath: '/',
  html: {
    template: './public/index.ejs',
  },
};
