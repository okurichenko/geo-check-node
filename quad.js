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
const refQuad = db.ref("/geoQuads");

const p10 = '1023210113';
const p12 = '102321011303';

const start = new Date().getTime();
refQuad.orderByChild('quadtree').startAt(p12).once('value').then(data => {
    console.log(`${data.numChildren()} results in ${new Date().getTime() - start} ms`);
});
