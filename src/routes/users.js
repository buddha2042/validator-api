import  userController from '../controller/user/users.js';

export default (app) => {
    app.post('/create-user', userController.addUser )
    app.get('/user-list', userController.getUser)
};