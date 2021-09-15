import { Router as expressRouter } from 'express';

const router = expressRouter();

router.get('/', (req, res) => {
  console.log(req.ip)
  res.send('expense')
})

export default router;