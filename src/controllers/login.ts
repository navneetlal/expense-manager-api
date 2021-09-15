import { Router as expressRouter } from 'express';
import auth from 'basic-auth';

import Status from '../utils/response';
import { jwtSign } from '../utils/token';

import User from '../models/user';
import timeSafeCompare from '../utils/timeSafeCompare';

const router = expressRouter();

router.post('/', async (req, res) => {
  const credential = auth(req);
  if (!credential) return res.status(400).send(Status[400])

  const user = await User.findOne({ username: credential.name })

  if (
    user &&
    timeSafeCompare(credential.name, user.username) &&
    timeSafeCompare(credential.pass, user.password)
  ) {
    try {
      const token = await jwtSign(credential.name)
      return res
        .status(200)
        .send({ access_token: token, token_type: 'Bearer', expires_in: 3600 })
    } catch (error) {
      return res
        .status(500)
        .send(Status[500])
    }
  }
  else return res.status(401).send(Status[401]);
})

export default router;