import { expect, test } from 'vitest'
import {getTileRowAndCol} from "@/utils/coords/index.ts";
test('根据经纬度和zoom计算瓦片行列号',() => {
    expect(getTileRowAndCol(116.40,39.91,15)).toStrictEqual([26978, 12415])
})