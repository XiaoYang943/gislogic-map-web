/* eslint-disable no-undef */
import { geojson } from 'flatgeobuf'
import { readFileSync, writeFileSync }  from 'fs'

const expected = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [0, 0]
        }
    }]
}

console.log("Input GeoJSON:")
const geoJSON = JSON.stringify(expected, undefined, 1)
console.log(geoJSON)
console.log(`GeoJSON (${geoJSON.length} bytes)`)
const flatgeobuf = geojson.serialize(expected)
console.log(`Serialized input GeoJson into FlatGeobuf (${flatgeobuf.length} bytes)`)

writeFileSync('C:\\Users\\heyiyang\\Downloads\\flatgeobuf-master\\flatgeobuf-master\\test\\data\\test.fgb', flatgeobuf)
const buffer = readFileSync('C:\\Users\\heyiyang\\Downloads\\flatgeobuf-master\\flatgeobuf-master\\test\\data\\test.fgb')
const actual = geojson.deserialize(new Uint8Array(buffer))

console.log('FlatGeobuf deserialized back into GeoJSON:')
console.log(JSON.stringify(actual, undefined, 1))