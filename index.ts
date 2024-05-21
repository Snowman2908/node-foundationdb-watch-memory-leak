import * as fdb from 'foundationdb';
import bytes = require('bytes');
import * as fs from 'fs';

fdb.setAPIVersion(720);
const db = fdb.open();

startDoTransaction().catch((err) => console.log(err));
startWatch().catch((err) => console.log(err));

setInterval(() => {
    console.log('NodeJS heap:', bytes(process.memoryUsage().heapUsed));

    const stat = fs.readFileSync('/proc/self/status', 'utf8');
    const vmRss = stat
        .split('\n')
        .find((line) => line.startsWith('VmRSS:'))!
        .split(/:\s+/g)[1];

    console.log('Process memory:', bytes(bytes(vmRss)));
}, 10_000);

async function startDoTransaction() {
    for (let i = 0; i < 100; i++) {
        const key = Buffer.from('key' + i);

        doTransaction(key).catch((err) => console.log(err));
    }
}

async function startWatch() {
    for (let i = 0; i < 100; i++) {
        const key = Buffer.from('key' + i);

        watch(key).catch((err) => console.log(err));
    }
}

async function watch(key: Buffer) {
    while (true) {
        const watch = await db.doTn(async (tn) => {
            return tn.watch(key);
        });

        await watch.promise;
    }
}

async function doTransaction(key: Buffer) {
    while (true) {
        const randomValue = Buffer.from(Math.random().toString(36).substring(2, 15));

        await db.doTn(async (tn) => {
            tn.set(key, randomValue);
        });
    }
}