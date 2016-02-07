export abstract class Component {
    el: string;
    template: string;
    methods: any;
}

export function asset (path: string): string {
    if (typeof window === 'undefined') {
        path = path.replace(/templates/, 'templates/compiled');
    }

    return path;
}
