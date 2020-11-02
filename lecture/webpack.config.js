const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development', //배포할때는 development를 production으로 바꾼다.
    devtool: 'eval', //배포할때 mode에 development를 production으로 바꾸면서 devtool도 hidden-source-map으로 바꾼다.
    resolve: {
        extensions: ['.jsx', '.js', '.tsx', '.ts'],//이거는 웹팩에서 처리해주는 확장자들을 입력해주는 곳이다.
    },

    entry: {
        app: './client', //메인파일이 되는곳, client.tsx를 통해서 app.jsx를 만들게 될거다.
    },
    module: { //module과 plugins에 적힌 처리과정을 client.tsx에서 적용해서 최종적으로 app.jsx를 만들어지게 된다.
        rules: [{ //여기서 바벨대신에 ts를 설정할 수 있다. 안에 있는 내용을 정리하면 ts파일이나 tsx파일을 awesome-typescript-loader를 통해서 옛날문법으로 변환하겠다. 이런뜻이다
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader', //awesome-typescript-loader는 바벨과 함께 사용할 수 있다.
        }]
    },
    plugins: [ //module과 plugins에 적힌 처리과정을 client.tsx에서 적용해서 최종적으로 app.jsx를 만들어지게 된다.

    ],
    output: { //그렇게 위의 과정을 거쳐서 만들어진 app.jsx를 뽑아낸다. 뽑아내는건 output설정에서 한다.
        filename: 'app.js',
        path: path.join(__dirname, 'dist'), //path를 이렇게하고 npx webpack으로 웹팩을 실행하면 client.tsx가 위에 설명한 과정을 거치고 웹팩처리가 되어서 dist라는 폴더가 생기고 dist폴더안에 app.jsx가 들어있을 것이다.
        publicPath: './dist',
    }
}