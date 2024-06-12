interface Route {
    name: string;
    path: string;
    props?: boolean;
    component?: any;
    children?: Route[];
}