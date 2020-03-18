var MongoClient = require('mongodb').MongoClient;


var mongoUrl = 'mongodb://localhost:27017';
var dbName = "salad";

async function findAll() {
    try{
        client = await MongoClient.connect(mongoUrl, {useUnifiedTopology: true});
        db = client.db(dbName);
        let dCollection = db.collection('vegies');
        let result = await dCollection.find(); 
        const resArr = result.toArray();//.items || []
        // console.log("BLAH", JSON.stringify(resArr, null, 4))
        return resArr;
     }
     catch(err){ console.error(err); } // catch any mongo error here
     finally{ 
        //  client.close(); 
        } // make sure to close your connection after
}

async function add(vegie) {
    try{
        console.log("AAAAA?", vegie)
        client = await MongoClient.connect(mongoUrl, {useUnifiedTopology: true});
        db = client.db(dbName);
        let dCollection = db.collection('vegies');
        let result = await dCollection.insertOne(vegie);   
        // your other codes ....
     }
     catch(err){ console.error(err); } // catch any mongo error here
     finally{ 
        //  client.close(); 
    } // make sure to close your connection after
}

module.exports = {
    findAll,
    add
}