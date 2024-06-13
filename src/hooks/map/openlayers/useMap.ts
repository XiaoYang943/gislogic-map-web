import "ol/ol.css";
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import {XYZ} from "ol/source";

export const useMap = (element: HTMLElement) => {
    const map = new Map({
        target: element,
        layers: [
            new TileLayer({
                source: new XYZ({
                    url: 'http://t4.tianditu.com/DataServer?T=vec_w&tk=a9bbec302f2213e1fe33e9775187d021&x={x}&y={y}&l={z}',
                }),
                zIndex: 0,
            }),

            new TileLayer({
                source: new XYZ({
                    url: 'http://t4.tianditu.com/DataServer?T=cva_w&tk=81b9a9cf3e4be1df181e7bf54c5949fc&x={x}&y={y}&l={z}',
                }),
                zIndex: 1,
            })
        ],
        view: new View({
            center: [0, 0],
            zoom: 0,
        }),
    });
    return {
        map
    }
}
