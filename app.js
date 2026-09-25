const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use((req,res,next) => {
    console.log(`${new Date().toLocaleTimeString()} ${req.method} ${req.url}`);
    next();
})

let tasks = [
    {id: 1, text: 'เรียนNode.js', done: false},
    {id:2, text: 'ติดตั้งVs Code', done: true},
];
let nextId = 3;


app.get('/' , (req, res) => {
    res.send("Welcome to Home Page");
});


// GET

app.get('/api/tasks', (req, res) => {
    const { done } = req.query;

    if(done === undefined){
        return res.json(tasks);
    }

    res.json(task.filter(t => String(t.done) === done));
});

app.get('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'ไม่พบรายการน้ี' });
    }
    res.json(task);
});


app.patch('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));

    if(!task){
        return res.status(404).json({error: 'ไม่พบรายการนี้'});
    }

    task.done = !task.done;
    res.json(task);
});


//POST
app.post('/api/tasks', (req, res) => {
    const text = req.body.text;

    if(!text){
        return res.status(400).json({error: 'ต้องระบุ text'});
    }


    const newTask ={id: nextId++,text: text, done: false};
    tasks.push(newTask);
    res.status(201).json(newTask);
});

//DELETE
app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks  = task.filter(task => task.id !== id);
    res.status(204).end();
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});