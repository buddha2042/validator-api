import { greet } from 'prompt-validators';



export default function validateComment(req, res){
    console.log(greet('Alice')); 
    res.send('hi')
}