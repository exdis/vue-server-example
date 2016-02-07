/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/vue-server/vue-server.d.ts"/>

import * as express from 'express';
import * as VueServer from 'vue-server';

var app = express();

var Vue: VueServer.Renderer = VueServer.renderer();

app.get('/', function (req, res) {
    var vm = new Vue({
        template: '<div>{{data}}</div>',
        data: {
            data: 'Hello from server!'
        }
    });

    vm.$on('vueServer.htmlReady', function (html) {
        res.send(html);
    });
});

var port: number = process.env.port || 3000;
app.listen(port, function () {
    console.log('Listening on port 3000');
});
