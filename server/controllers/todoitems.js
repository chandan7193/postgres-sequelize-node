const TodoItem = require('../models').TodoItem;

module.exports = {
  create(req, res) {
    console.log(req.body);
    console.log(req.params);
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId,
      })
      .then(todoItem => res.status(201).send(todoItem))
      .catch(error => res.status(400).send(error));
  },
};
