const { Router } = require('express');
const { getToDo, addToDo, updateToDo, deleteToDo } = require('../controller/ToDoController');
const router = Router();


router.get('/get', getToDo);
router.post('/add-to-do', addToDo);
router.put('/update', updateToDo);
router.delete('/delete/:id', deleteToDo);
module.exports = router;