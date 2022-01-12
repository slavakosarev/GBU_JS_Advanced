const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// экспорт плагинов
module.exports = {
  // точка входа
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  // в папку dist собираются файлы на выходе
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './public/template.html'), // шаблон
      filename: 'index.html', // название выходного файла
    }),
  ],
}