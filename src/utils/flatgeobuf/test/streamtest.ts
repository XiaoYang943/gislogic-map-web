/* eslint-disable no-undef */
import { geojson } from 'flatgeobuf'
import fetch from 'node-fetch'
import { ReadableStream } from 'web-streams-polyfill'

function nodeToWebTest(nodeStream:any) {
    let destroyed = false;
    const listeners:any = {};

    function start(controller:any) {
        listeners['data'] = onData;
        listeners['end'] = onData;
        listeners['end'] = onDestroy;
        listeners['close'] = onDestroy;
        listeners['error'] = onDestroy;
        for (const name in listeners) nodeStream.on(name, listeners[name]);

        nodeStream.pause();

        function onData(chunk:any) {
            if (destroyed) return;
            controller.enqueue(chunk);
            nodeStream.pause();
        }

        function onDestroy(err:any) {
            if (destroyed) return;
            destroyed = true;

            for (const name in listeners)
                nodeStream.removeListener(name, listeners[name]);

            if (err) controller.error(err);
            else controller.close();
        }
    }

    function pull() {
        if (destroyed) return;
        nodeStream.resume();
    }

    function cancel() {
        destroyed = true;

        for (const name in listeners)
            nodeStream.removeListener(name, listeners[name]);

        nodeStream.push(null);
        nodeStream.pause();
        nodeStream.destroy();
    }

    return new ReadableStream({ start: start, pull: pull, cancel: cancel });
}

async function streamtest() {
    const response = await fetch('https://flatgeobuf.org/test/data/UScounties.fgb')
    for await (let feature of geojson.deserialize(nodeToWebTest(response.body)))
        console.log(JSON.stringify(feature, undefined, 1))
}

streamtest()