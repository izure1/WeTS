const path = require('path')

// npm run serve 명령어 실행 시,
// dist 폴더에 있는 Demo.html 에서 불러올 라이브러리의 설정을 지정합니다.
module.exports = {
    outputDir: path.join(__dirname, 'dist', 'lib'),
    runtimeCompiler: true,
    configureWebpack: {
        // output: {
        //     library: 'WeJS',
        //     libraryExport: 'default',
        //     libraryTarget: 'umd', // 이 파일은 umd 방식의 라이브러리임을 알려줍니다.
        //     filename: 'WeJS.umd.js', // 이 이름의 파일을 불러옵니다.
        // },
    },
    pages: {
        index: {
            entry: 'pages/Home/main.ts',
            template: 'public/index.html',
            title: 'Let\'s start We.JS',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        HelloWorld: {
            entry: 'pages/HelloWorld/main.ts',
            template: 'public/index.html',
            title: 'Hello, World!',
            chunks: ['chunk-vendors', 'chunk-common', 'HelloWorld']
        },
        Text: {
            entry: 'pages/Text/main.ts',
            template: 'public/index.html',
            title: 'Text',
            chunks: ['chunk-vendors', 'chunk-common', 'Text']
        },
        Camera: {
            entry: 'pages/Camera/main.ts',
            template: 'public/index.html',
            title: 'Camera',
            chunks: ['chunk-vendors', 'chunk-common', 'Camera']
        },
        Image: {
            entry: 'pages/Image/main.ts',
            template: 'public/index.html',
            title: 'Image',
            chunks: ['chunk-vendors', 'chunk-common', 'Image']
        },
        Video: {
            entry: 'pages/Video/main.ts',
            template: 'public/index.html',
            title: 'Video',
            chunks: ['chunk-vendors', 'chunk-common', 'Video']
        },
        Audio: {
            entry: 'pages/Audio/main.ts',
            template: 'public/index.html',
            title: 'Video',
            chunks: ['chunk-vendors', 'chunk-common', 'Audio']
        },
        PhysicsSquare: {
            entry: 'pages/PhysicsSquare/main.ts',
            template: 'public/index.html',
            title: 'Video',
            chunks: ['chunk-vendors', 'chunk-common', 'PhysicsSquare']
        },
    }
}