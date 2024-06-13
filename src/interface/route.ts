interface Route {
    id: string;
    name: string;
    path: string;
    props?: boolean;
    component?: any;
    children?: Route[];
}