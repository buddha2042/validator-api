export default (app)=>{
  app.post('/health', (req, res)=>{
    res.status(200).json({ message: 'The health check passed' })
  })
};
  