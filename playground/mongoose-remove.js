const {ObjectID} = require('mongodb'); 

const {mongoose} = require('./../server/db/mongoose');

const {Todo} = require('./../server/models/todo'); 

const {User} = require('./../server/models/user'); 

// Todo.remove({}).then((result) =>{

//     console.log(result);
// });

Todo.findOneAndRemove({_id: '5afab70743183e336a9a44f8'}).then((todo) => { 


});

// Todo.findByIdAndRemove('5afab70743183e336a9a44f8').then((todo) => { 

//     console.log(todo);

//});

