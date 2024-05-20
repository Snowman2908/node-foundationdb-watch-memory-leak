import * as fdb from 'foundationdb';
import bytes = require('bytes');
import * as fs from 'fs';

fdb.setAPIVersion(620);

main().catch((err) => console.log(err));

setInterval(() => {
    console.log('NodeJS heap:', bytes(process.memoryUsage().heapUsed));

    const stat = fs.readFileSync('/proc/self/status', 'utf8');
    const vmRss = stat
        .split('\n')
        .find((line) => line.startsWith('VmRSS:'))!
        .split(/:\s+/g)[1];

    console.log('Process memory:', bytes(bytes(vmRss)));
}, 10_000);

async function main() {
    const db = fdb.open();

    while (true) {
        await db.doTn(async (tn) => {
            await tn.get('');
        });
    }
}