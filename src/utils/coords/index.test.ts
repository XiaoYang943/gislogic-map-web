import {expect, test} from 'vitest'
import {getResolution, getTileRowAndCol} from "@/utils/coords/index.ts";
import {EARTH_PERIMETER} from "@/constant";

test('根据经纬度和zoom计算瓦片行列号', () => {
    expect(getTileRowAndCol(116.40, 39.91, 15)).toStrictEqual([26978, 12415])
})

test('整个地球一张瓦片的边长===地球周长', () => {
    expect(getResolution(0) * 256).toStrictEqual(EARTH_PERIMETER)
})

