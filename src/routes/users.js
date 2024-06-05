import createUser from "../controller/User/users.js";

export default (app) => {
    app.post('/create-user', createUser )};
