require('./config/config');


const _ = require('lodash')

//var express = require('express'); 

const express = require('express');

//var bodyParser = require('body-parser');

const bodyParser = require('body-parser');

//var {ObjectID} = require('mongodb');

const {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose');

var {Todo} = require('./models/todo'); 

var {User} = require('./models/user'); 

var {authenticate} = require('./middleware/authenticate');


var app = express();

const port = process.env.PORT;  //|| 3000;

app.use(bodyParser.json()); 

app.post('/todos', (req, res) => {
    
    //console.log(req.body); 

    var todo = new Todo({

        text: req.body.text
}); 

todo.save().then((doc) => {

    res.send(doc);

}, (e) => {

   res.status(400).send(e);
});
});

app.get('/todos', (req, res) => {
    
    Todo.find().then((todos) => {
        
        res.send({todos}); 
    
    }, (e) => {
        
        res.status(400).send(e); 
    });
});

app.get('/todos/:id', (req, res) => {
    
   var id = req.params.id; 


if (!ObjectID.isValid(id)) {
    
    return res.status(404).send(); 
} 

Todo.findById(id).then((todo) => {
    
    if (!todo) {
        
        return res.status(404).send(); 
    } 
    
    res.send({todo}); 

}).catch((e) => {

  res.status(400).send();
});
});

app.delete('/todos/:id', (req, res) => {
    
    var id = req.params.id; 

    // validate the ID -> not valid ? return 404.
    
    if (!ObjectID.isValid(id)) {
        
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        
        if (!todo) {
            
            return res.status(404).send(); 
        }
        
        res.send(todo);

}).catch((e) => {

    res.status(400).send();

});
});

app.patch('/todos/:id', (req, res) => {  // patch ALLOW TO UPDATE todo ITEMS.
    
    var id = req.params.id; 
    
    //var body = _.pick(req.body, ['text', 'completed']);

    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        
        return res.status(404).send(); 
    }
    
    if (_.isBoolean(body.completed) && body.completed) {
        
        body.completedAt = new Date().getTime();

    } else {

        body.completed = false; 
        
        body.completedAt = null;
    
    }
    
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {

        if (!todo) {
            
            return res.status(404).send();
         } 
            
            res.send({todo});

        }).catch((e) => {

            res.status(400).send();
        })
    });

    app.post('/users', (req, res) => {
        
        var body = _.pick(req.body, ['email', 'password']); 
        
        var user = new User(body); 

        
        //user.save().then((user) => {

            user.save().then(() => {

                return user.generateAuthToken();

            }).then((token) => {
                
                res.header('x-auth', token).send(user); 

            //res.send(user); 
        
        }).catch((e) => {
            
            res.status(400).send(e);

// res.header TAKES key value & req.header GETTING VALUE.

        })
    });

//     var authenticate = (req, res, next) => {
        
//         var token = req.header('x-auth'); 
        
//         User.findByToken(token).then((user) => {
        
//         if (!user) {

//             return Promise.reject();
//         }

//         req.user = user;

//         req.token = token;

//     }).catch((e) => {

//         res.status(401).send();
//     });
// };

    app.get('/users/me', authenticate, (req, res) => {

        res.send(req.user);
        
        // var token = req.header('x-auth'); 
        
        // User.findByToken(token).then((user) => {

        //     if (!user) {

        //         return Promise.reject(); 

        //     }
// findByToken TAKE token VALUE & GOING FIND APPROPRIATE USER RELATED TO
// THAT token RETURNING IT INSIDE OF promise callbacks. 

        //     res.send(user);

        // }).catch((e) => {
            
        //     res.status(401).send();
        // });   
    });
 

//app.listen(3000, () => {

    app.listen(port, () => {

    //console.log('Started on port 3000');

    console.log(`Started up at port ${port}`);
});

module.exports = {app};

// mongoose = require('mongoose'); 

//mongoose.Promise = global.Promise; 

//mongoose.connect('mongodb://localhost:27017/TodoApp');

// var Todo = mongoose.model('Todo', {
    
//     text: {
        
//         type: String,

//         required: true,

//         minlength: 1, 

//         trim: true 

// // USING 3 PROPERTIES ABLE CONFIGURE TEXT PROPERTY SETTING UP SOME VALIDATION.
//     }, 
    
//     completed: {
        
//         type: Boolean,
        
//         default: false
//     }, 
    
//     completedAt: {
        
//         type: Number,

//         default: null
//     } 
//});

// var newTodo = new Todo({ 
    
//     text: 'Cook dinner'
//  }); 
 
//  newTodo.save().then((doc) => {
     
//     console.log('Saved todo', doc); 

// }, (e) => {

//     console.log('Unable to save todo')
// });

//var otherTodo = new Todo({ 

    //text: 'Something to do'

    //text: true

    //text: ' Edit this video '
    
    // text: 'Feed the cat', 
    
    // completed: true, 
    
    // completedAt: 123 
//}); 

// otherTodo.save().then((doc) => {
    
//     console.log(JSON.stringify(doc, undefined, 2));

// }, (e) => {

//     console.log('Unable to save', e);
// });

// var User = mongoose.model('User', {
    
//     email: {
        
//         type: String, 
        
//         required: true, 
        
//         trim: true, 
        
//         minlength: 1    
//     } 
// });

// var user = new User({ 
    
//     email: 'andrew@example.com   '
// }); 

// user.save().then((doc) => {
    
//     console.log('User saved', doc); 

// }, (e) => {

//     console.log('Unable to save user', e);
// });
