const {MongoClient, ObjectID} = require('mongodb'); 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {

        return console.log('Unable to connect to MongoDB server'); 
    }

    console.log('Connected to MongoDB server'); 

    const db = client.db('TodoApp')

    //db.collection('Todos').find({completed: false}).toArray().then((docs) => {

        //db.collection('Todos').find({_id: new ObjectID('5af2cc9ae2a1ba16a86659e5')}).toArray().then((docs) => {

    // QUERING & NEED todo COLLECTION LOOKING FOR ANY RECORDS THAT HAVE AN UNDERSCORE ID 
    // PROPERTY EQUAL TO ID HAVE HERE.
        
    //     console.log('Todos');

    //     console.log(JSON.stringify(docs, undefined, 2));

    // }, (err) => {

    //     console.log('Unable to fetch todos', err); 
    // });

    // db.collection('Todos').find().count().then((count) => {

    //     console.log(`Todos count: ${count}`);

        //console.log(JSON.stringify(docs, undefined, 2));

    // }, (err) => {

    //     console.log('Unable to fetch todos', err); 
    // });

    db.collection('Users').find({name: 'Andrew'}).toArray().then((docs) => {
        
        console.log(JSON.stringify(docs, undefined, 2));
    });

    //client.close();
});
