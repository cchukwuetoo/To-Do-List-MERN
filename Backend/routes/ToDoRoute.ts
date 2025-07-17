import { Router } from 'express';
import { getToDo, addToDo, updateToDo, deleteToDo, toggleToDo, CompletedToDos, IncompleteToDos } from '../controller/ToDoController';
const router = Router();


router.get('/get', getToDo);
router.get('/completed-to-dos', CompletedToDos);
router.get('/incomplete-to-dos', IncompleteToDos)
router.post('/add-to-do', addToDo);
router.put('/update', updateToDo);
router.patch('/toggle/:id', toggleToDo);
router.delete('/delete/:id', deleteToDo);
export default router;