const admin = require("firebase-admin");
const serviceAccount = require("./secret.json");
const Promise = require('promise');
var quadtree = require('quadtree');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vape-907de.firebaseio.com",
    databaseAuthVariableOverride: {
        uid: "vape-service-worker"
    }
});
function randomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(8) ;
}

function randomInt(min, max) {
    return randomFloat(min, max) * 100000000;
}

const db = admin.database();
// db.ref("/geoFloat").remove();
// const refFloat = db.ref("/geoFloats");
// const promises = [];
// const startTime = new Date().getTime();
// for (let i = 1; i <= 100000; i++) {
//     promises.push(refFloat.push({
//         lat: randomFloat(50.218, 50.58),
//         lng: randomFloat(30.25, 30.84),
//     }));
// }
//
// Promise.all(promises).then(() => {
//     const endTime = new Date().getTime();
//     console.log(`finished in ${endTime - startTime}ms`);
// });

// const refInts = db.ref("/geoInts");
// const promises = [];
// const startTime = new Date().getTime();
// for (let i = 1; i <= 9000; i++) {
//     promises.push(refInts.push({
//         lat: randomInt(50.218, 50.58),
//         lng: randomInt(30.25, 30.84),
//     }));
// }
//
// Promise.all(promises).then(() => {
//     const endTime = new Date().getTime();
//     console.log(`finished in ${endTime - startTime}ms`);
// });

const refInts = db.ref("/geoInts");
const refQuads = db.ref("/geoQuads");
const promises = [];
const startTime = new Date().getTime();

// refQuads.once('value').then(data => console.log(data.numChildren()));

// const start = quadtree.encode({
//     lat: 50.58,
//     lng: 30.25,
// }, 20);
// console.log(start);
//
// const end = quadtree.encode({
//     lat: 50.218,
//     lng: 30.84,
// }, 20);
// console.log(end);
db.ref("/geoQuads").orderByChild('quadtree').startAt('102321011303').once('value').then((data) => {
    console.log(data.numChildren());
    let fits = 0;
    data.forEach(item => {
        if (item.val().quadtree.startsWith('102321011303')) {
            fits++;
        }
    });

    setTimeout(() => {
        console.log(fits);
    },3000);
});

/*

refQuads.remove().then(() => {
    db.ref("/geoInts").limitToFirst(10000).once('value').then((data) => {
        console.log(`fetched data in ${new Date().getTime() - startTime} ms`);
        let i = 1;
        data.forEach(item => {
            const a = {};
            const val = item.val();
            a.lat = val.lat / 100000000;
            a.lng = val.lng / 100000000;
            const encoded = quadtree.encode(a, 20);
            promises.push(refQuads.push({
                quadtree: encoded,
                floatId: i
            }));
            i++;
        });
        Promise.all(promises).then(() => {
            console.log(`finished in ${new Date().getTime() - startTime}ms`);
        });
    });
});

*/
