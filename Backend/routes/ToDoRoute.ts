import { Router } from 'express';
import { getToDo, addToDo, updateToDo, deleteToDo } from '../controller/ToDoController';
const router = Router();


router.get('/get', getToDo);
router.post('/add-to-do', addToDo);
router.put('/update', updateToDo);
router.delete('/delete/:id', deleteToDo);
export default router;