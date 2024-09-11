import {EARTH_PERIMETER, EARTH_RADIUS, TILE_SIZE} from "@/constant";
// 获取某一层级下的分辨率，单位：米/像素
// 一像素代表实地距离多少米
export const getResolution = (zoom: number) => {
    const tileNumsX = Math.pow(2, zoom) // X或Y方向上的瓦片数量
    const tileTotalPx = tileNumsX * TILE_SIZE // X或Y方向上的像素数
    return EARTH_PERIMETER / tileTotalPx
}

// 角度转弧度
const angleToRad = (angle: number) => {
    return angle * (Math.PI / 180)
}

const lngLatToMercator = (lng: number, lat: number) => {
    const result: [number, number] = [0, 0]
    // 经度先转弧度，然后因为 弧度 = 弧长 / 半径 ，得到弧长为 弧长 = 弧度 * 半径
    result[0] = angleToRad(lng) * EARTH_RADIUS
    // 纬度先转弧度
    let rad = angleToRad(lat)
    // TODO:?
    let sin = Math.sin(rad)
    result[1] = (EARTH_RADIUS / 2) * Math.log((1 + sin) / (1 - sin))
    return result
}


// 根据4326坐标及缩放层级计算瓦片行列号
const getTileRowAndCol = (lng: number, lat: number, z: number) => {
    let [mapCenterMercatorX, mapCenterMercatorY] = transformXY(...lngLatToMercator(lng, lat))
    // 分辨率列表
    const resolutions: number[] = []
    for (let i = 0; i <= 18; i++) {
        resolutions.push(getResolution(i))
    }
    let resolution = resolutions[z]
    const pixelCoords = transformMercatorToPixel(mapCenterMercatorX, mapCenterMercatorY, resolution);
    let row = Math.floor(pixelCoords[0] / TILE_SIZE)
    let col = Math.floor(pixelCoords[1] / TILE_SIZE)
    return [row, col]
}
// 指定的地图中心点的原点为中心点的墨卡托坐标转为原点为左上角的瓦片坐标系的墨卡托坐标，单位：米
const transformXY = (mapCenterMercatorX: number, mapCenterMercatorY: number) => {
    mapCenterMercatorX = EARTH_PERIMETER / 2 + mapCenterMercatorX;
    mapCenterMercatorY = EARTH_PERIMETER / 2 - mapCenterMercatorY;
    return [mapCenterMercatorX, mapCenterMercatorY]
}

// mercator坐标转像素坐标
const transformMercatorToPixel = (mercatorX: number, mercatorY: number, resolution: number) => {
    const pixelX = mercatorX / resolution
    const pixelY = mercatorY / resolution
    return [pixelX, pixelY]
}

export {getTileRowAndCol}
