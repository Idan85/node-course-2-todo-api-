//const MongoClient = require('mongodb').MongoClient; 

const {MongoClient, ObjectID} = require('mongodb'); 

// var obj = new ObjectID();

// console.log(obj);

// var user = {name: 'andrew', age: 25}; 

// var {name} = user; 

// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

// IN MongoDB UNLIKE OTHER DATABASE PROGRAMS DON'T NEED CREATE DATABASE BEFORE START USING IT (TodoApp).

if (err) {

    return console.log('Unable to connect to MongoDB server'); 
}

console.log('Connected to MongoDB server'); 

    const db = client.db('TodoApp')

//     db.collection('Todos').insertOne({ 
        
//         text: 'Something to do', 
        
//         completed: false
    
//     }, (err, result) => { 
        
//         if (err) {

// return console.log('Unable to insert todo', err);
// } 

// console.log(JSON.stringify(result.ops, undefined, 2));
// });

// Insert new doc into Users (name, age, location)

// db.collection('Users').insertOne({ 

    //_id: 123,
    
//     name: 'Andrew', 
    
//     age: 25, 
    
//     locations: 'Philadelphia'
//  }, (err, result) => {
     
//     if(err) {

//         console.log('Unable to insert user', err); 
//     }
//     console.log(result.ops[0]._id.getTimestamp()); 
// })

client.close();
});