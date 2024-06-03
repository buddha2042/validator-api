export default (app)=>{
  app.post('/health', (req, res)=>{
    res.status(200).send('health check passed !')
  })
};
