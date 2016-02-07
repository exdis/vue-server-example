/// <reference path="../vue/vue.d.ts" />

declare module VueServer {
    interface Renderer {
        new(options?: vuejs.ComponentOption): vuejs.Vue;
    }
    function renderer (logger?: string): Renderer;
}

declare module "vue-server" {
    export = VueServer;
}
