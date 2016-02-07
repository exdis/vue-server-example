/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/vue-server/vue-server.d.ts"/>

import * as express from 'express';
import * as VueServer from 'vue-server';

import Page from '../components/Page/Page';

var app = express();

var Vue: VueServer.Renderer = VueServer.renderer();

app.get('/', function (req, res) {
    var vm = new Vue(new Page());

    vm.$on('vueServer.htmlReady', function (html) {
        res.send(html);
    });
});

var port: number = process.env.port || 3000;
app.listen(port, function () {
    console.log('Listening on port 3000');
});
