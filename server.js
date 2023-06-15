const express = require('express');
const app = express();
const mysql = require('mysql');
const methodOverride = require('method-override');
// MySQL database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo_app',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});

// Set up the server to listen on a specific port
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set the path to the views directory
app.set('views', __dirname + '/views');

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Handle the homepage route
app.get('/', (req, res) => {
  connection.query('SELECT * FROM todos', (err, rows) => {
    if (err) {
      console.error('Error retrieving todos from the database: ', err);
      return;
    }
    res.render('index', { todos: rows });
  });
});

// Handle form submission to add a new todo
app.post('/add', (req, res) => {
  const task = req.body.task;
  connection.query('INSERT INTO todos SET ?', { task: task }, (err, result) => {
    if (err) {
      console.error('Error adding todo to the database: ', err);
      return;
    }
    res.redirect('/');
  });
});

// // Handle editing a todo
// app.put('/edit/:id', (req, res) => {
//     const id = req.params.id;
//     const updatedTask = req.body.task;
//     connection.query(
//       'UPDATE todos SET task = ? WHERE id = ?',
//       [updatedTask, id],
//       (err, result) => {
//         if (err) {
//           console.error('Error updating todo in the database: ', err);
//           return;
//         }
//         res.redirect('/');
//       }
//     );
//   });

// Handle editing a todo
app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const updatedTask = req.body.task;
    connection.query(
      'UPDATE todos SET task = ? WHERE id = ?',
      [updatedTask, id],
      (err, result) => {
        if (err) {
          console.error('Error updating todo in the database: ', err);
          return;
        }
        res.redirect('/');
      }
    );
  });

// Handle deleting a todo
app.post('/delete/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM todos WHERE id = ?', id, (err, result) => {
    if (err) {
      console.error('Error deleting todo from the database: ', err);
      return;
    }
    res.redirect('/');
  });
});
