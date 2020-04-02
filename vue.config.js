const path = require('path')

// npm run serve 명령어 실행 시,
// dist 폴더에 있는 Demo.html 에서 불러올 라이브러리의 설정을 지정합니다.
module.exports = {
    outputDir: path.join(__dirname, 'dist', 'lib'),
    runtimeCompiler: true,
    configureWebpack: {
        output: {
            library: 'WeJS',
            libraryExport: 'default',
            libraryTarget: 'umd', // 이 파일은 umd 방식의 라이브러리임을 알려줍니다.
            filename: 'WeJS.umd.js', // 이 이름의 파일을 불러옵니다.
        },
    },
    pages: {
        hello: {
            entry: 'pages/HelloWorld/main.ts',
            template: 'public/index.html',
            title: 'Hello, World!',
            chunks: ['chunk-vendors', 'chunk-common', 'hello']
        },
        text: {
            entry: 'pages/Text/main.ts',
            template: 'public/index.html',
            title: 'Text',
            chunks: ['chunk-vendors', 'chunk-common', 'text']
        },
    }
}