// Karma configuration
// Generated on Wed Jan 24 2018 15:26:49 GMT+0800 (台北標準時間)

module.exports = function (config) {
  config.set({

    // 預設路徑 base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // 選用的 frameworks
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // 要載入的列表
    files: [
      'src/**/*.spec.js'
    ],


    // 排除列表
    exclude: [
      '/*.swp'
    ],


    // 在將其提供給瀏覽器之前，預處理匹配的文件， 可用的預處理器 https://npmjs.org/browse/keyword/karma-preprocessor
    // 測試文件需要處理一下，各框架和庫都不一樣，可以在鏈接中找到你對應的框架的處理器
    // key是文件夾路徑，也是就files的路徑，value是一個數組，也就是預處理器集合
    preprocessors: {
      'src/**/*.spec.js': ['webpack', 'sourcemap']
    },

    // webpack配置 不需要入口(entry)和输出(output)配置
    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [{
          test: /\.js$/,
          use: {
            loader: 'istanbul-instrumenter-loader',
            options: { esModules: true }
          },
          enforce: 'pre',
          exclude: /node_modules|\.spec\.js$/,
        }, {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015'],
              plugins: ['istanbul']
            }
          },
          exclude: /node_modules/
        }]
      }
    },

    // 依賴的外掛套件
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-coverage-istanbul-reporter'
  ],


    // 顯示測試結果
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['coverage-istanbul'],


    // web server port
    port: 9876,


    // 輸出內容(有/不要)顏色 enable / disable colors in the output (reporters and logs)
    colors: true,


    // log 級別
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // 修改文件後(是/否)自動執行測試
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // 啟動的瀏覽器列表
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // 持續集成模式 如果是，Karma啟動瀏覽器，運行測試並退出 默認(false)就好
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // 開發級別，可以啟動多少瀏覽器 (預設無窮大)
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
