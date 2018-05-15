const {MongoClient, ObjectID} = require('mongodb'); 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {

        return console.log('Unable to connect to MongoDB server'); 
    }

    console.log('Connected to MongoDB server'); 

    const db = client.db('TodoApp')

     // deleteMany

    //db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
        
        //console.log(result); 

// SCRIPT THAT DELETES ALL todo WHERE TEXT VALUE IS 'Eat lunch'.
    //});

    // deleteOne

    //db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
        
     //   console.log(result); 
    //});

    // findOneAndDelete

    //db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        
    //    console.log(result); 
    //});

    //db.collection('Users').deleteMany({name: 'Andrew'});

    //db.collection('Users').findOneAndDelete({_id: new ObjectID("5af2d11cfe4e541574434f81")}).then((results) =>{

        //db.collection('Users').findOneAndDelete({_id: 123}).then((results) =>{

// can set the id to a regular number like do about ({_id: 123}), but need to use a regular number to query it too.

         db.collection('Users').findOneAndDelete({

         _id: new ObjectID("57ac8d47878a299e5dc21bc8")

         }).then((results) => {


        console.log(JSON.stringify(results, undefined, 2));
    });


    // db.close();
});