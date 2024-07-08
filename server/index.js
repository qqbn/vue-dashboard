const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

const port = 5500;
const tasksRoutes = require('./routes/taskRoutes');
const contactsRoutes = require('./routes/contactsRoutes');
const expensesRoutes = require('./routes/expensesRoutes');
const notesRoutes = require('./routes/notesRoutes');
const remindsRoutes = require('./routes/remindsRoute');
const dashboardRoutes = require('./routes/dashboardRoutes');


app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/tasks', tasksRoutes);
app.use('/contacts', contactsRoutes);
app.use('/expenses', expensesRoutes);
app.use('/notes', notesRoutes);
app.use('/reminds', remindsRoutes);
app.use('/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
    res.send('conn workin');
})

app.listen(port, () => {
    console.log('Server started at port: ', port);
})