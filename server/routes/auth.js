import express from 'express'

import { getUser, signin, signup, resetPass, allTasks, update, addTask, finishTask} from '../functions/authentication_fun.js'

const auth_routes = express.Router();

auth_routes.post("/signin", signin);
auth_routes.post("/signup", signup);
auth_routes.get('/get_user', getUser)
auth_routes.post('/reset_pass', resetPass);
auth_routes.get('/all_tasks', allTasks);
auth_routes.post('/add_task', addTask)
auth_routes.get('/update', update)
auth_routes.post('/finish', finishTask)


export default auth_routes;