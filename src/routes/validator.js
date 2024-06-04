import validateComment from '../controller/comment/index.js'

export default (app) => {
    app.post('/validate-comment', validateComment )};
