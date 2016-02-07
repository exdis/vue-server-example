module.exports = {
    resolve: {
        modulesDirectories: [
            'dist'
        ]
    },
    entry: 'client/app.js',
    output: {
        path: 'static/js/',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.jade$/,
                loader: 'html!jade-html'
            }
        ]
    }
};
