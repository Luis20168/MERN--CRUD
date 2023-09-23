import {Router} from 'express';

import { authRequired } from '../middlewares/validateToken.js'
import{getTasks, getTask, createTask, updateTask, deleteTask} from '../controllers/tasks.controllers.js'


import {validateShema} from '../middlewares/validator.middleware.js';
import {createTaskShema} from '../schemas/task.chema.js';
const router= Router();

router.get('/tasks', authRequired, getTasks)
router.get('/tasks/:id', authRequired, getTask)
router.post('/tasks', authRequired, validateShema(createTaskShema),  createTask)
router.delete('/tasks/:id', authRequired, deleteTask )

router.put('/tasks/:id', authRequired, updateTask)



export default router;