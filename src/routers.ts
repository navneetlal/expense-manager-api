import { Router as expressRouter } from 'express';

import ExpenseRouter from './controllers/expense';
import LoginRouter from './controllers/login';
import StatsRouter from './controllers/stats';

interface IRoutes {
  path: string
  router: expressRouter
}

const router = expressRouter()

const routes: IRoutes[] = [
  {
    path: '/login',
    router: LoginRouter
  },
  {
    path: '/expense',
    router: ExpenseRouter
  },
  {
    path: '/stats',
    router: StatsRouter
  }
]

routes.forEach(r => router.use(r.path, r.router))

export default router;