
const Todo = require('../models').Todo;


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

// Todo Api
  app.post('/api/todos',(req,res) => {
    return Todo
      .create({
        title: req.body.title,
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  });

  app.get('/api/todos', (req,res)=>{
    return Todo
  .all()
  .then(todos => res.status(200).send(todos))
  .catch(error => res.status(400).send(error));
});

 app.get('/api/todos/:todoId', (req,res)=>{
   return Todo
   .findById(req.params.todoId)
   .then(todo => {
     if (!todo) {
       return res.status(404).send({
         message: 'Todo Not Found',
       });
     }
     return res.status(200).send(todo);
   })
   .catch(error => res.status(400).send(error));

 });

 app.put('/api/todos/:todoId',(req,res)=>{
  return Todo
    .findById(req.params.todoId)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: 'Todo Not Found',
        });
      }
      return todo
        .update({
          title: req.body.title || todo.title,
        })
        .then(() => res.status(200).send(todo))  // Send back the updated todo.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
});



  // For any other request method on todo items, we're going to return "Method Not Allowed"

};
