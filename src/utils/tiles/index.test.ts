import {expect, test} from 'vitest'
import {getResolution, getTileRowAndCol} from "@/utils/tiles/index.ts";
import {EARTH_PERIMETER} from "@/constant";

test('根据经纬度和zoom计算瓦片行列号', () => {
    expect(getTileRowAndCol(116.40, 39.91, 15)).toStrictEqual([26978, 12415])
})

test('整个地球一张瓦片的边长===地球周长', () => {
    expect(getResolution(0) * 256).toBe(EARTH_PERIMETER)
})

test('计算投影坐标系分辨率', () => {
    expect(Math.floor(getResolution(0))).toBe(156543)
    expect(Math.floor(getResolution(1))).toBe(78271)
    expect(Math.floor(getResolution(2))).toBe(39135)
})

