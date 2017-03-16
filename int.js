const admin = require("firebase-admin");
const serviceAccount = require("./secret.json");
var quadtree = require('quadtree');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vape-907de.firebaseio.com",
    databaseAuthVariableOverride: {
        uid: "vape-service-worker"
    }
});

const db = admin.database();
const refInts = db.ref("/geoInts");

const p10 = 5035000000;
const p12 = 5050000000;

const start = new Date().getTime();
refInts.orderByChild('lat').startAt(p12).once('value').then(data => {
    console.log(`${data.numChildren()} results in ${new Date().getTime() - start} ms`);
});
