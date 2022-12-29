const express = require('express');

const db = require('./config/mongoose');
const Task = require('./models/task');
const app = express();

const ejs = require('ejs');
const port = 8000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded());
app.use(express.static('assets'));


app.post('/create-task', function(req, res) {
    Task.create({
        descr: req.body.descr,
        cat: req.body.cat,
        date: req.body.date
    }, function(err, newTask) {
        if(err) {
            console.log('error in creating a new Task', err);
            return;
        }
        console.log('*********', newTask);
        return res.redirect('back');
    })
})
app.get('/', function(req, res) {
    Task.find({}, function(err, tasks) {
        if(err) {
            console.log('Error in fetching data from the database');
            return;
        }
        return res.render('home', {
            task_list: tasks
        });
    });
});

app.get('/delete-task', function(req, res) {
    let id = req.query.id;

    Task.findByIdAndDelete(id, function(err) {
        if(err) {
            console.log('error in deleteing object from database');
            return;
        }
        return res.redirect('/');
    })
})

app.listen(port, function(err) {
    if(err) {
        console.log(`Error connecting to the Server on port: ${port} , Error no: ${err}`);
        return;
    }
    console.log(`Server is up and running on port: ${port}`);
})