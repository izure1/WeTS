const path = require('path')

// npm run serve 명령어 실행 시,
// dist 폴더에 있는 Demo.html 에서 불러올 라이브러리의 설정을 지정합니다.
module.exports = {
    outputDir: path.join(__dirname, 'dist', 'lib'),
    runtimeCompiler: true,
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.json', '.ts', '.d.ts'],
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    },
    chainWebpack: config => {
        // These are some necessary steps changing the default webpack config of the Vue CLI
        // that need to be changed in order for Typescript based components to generate their
        // declaration (.d.ts) files.
        //
        // Discussed here https://github.com/vuejs/vue-cli/issues/1081
        if(process.env.NODE_ENV === 'production') {
            config.module.rule('ts').uses.delete('cache-loader')
            config.module
                .rule('ts')
                .use('ts-loader')
                .loader('ts-loader')
                .tap(opts => {
                    opts.transpileOnly = false
                    opts.happyPackMode = false
                    return opts
                })
        }
    },
    parallel: false,
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
        Youtube: {
            entry: 'pages/Youtube/main.ts',
            template: 'public/index.html',
            title: 'Video',
            chunks: ['chunk-vendors', 'chunk-common', 'Youtube']
        },
        SceneDimension: {
            entry: 'pages/SceneDimension/main.ts',
            template: 'public/index.html',
            title: 'Video',
            chunks: ['chunk-vendors', 'chunk-common', 'SceneDimension']
        },
        Animation: {
            entry: 'pages/Animation/main.ts',
            template: 'public/index.html',
            title: 'Animation',
            chunks: ['chunk-vendors', 'chunk-common', 'Animation']
        },
        Particle: {
            entry: 'pages/Particle/main.ts',
            template: 'public/index.html',
            title: 'Particle',
            chunks: ['chunk-vendors', 'chunk-common', 'Particle']
        },
    }
}