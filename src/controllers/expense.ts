import { Router as expressRouter } from 'express';
import { isValidObjectId, PaginateOptions } from 'mongoose';
import Expense from '../models/expense';

import Status from '../utils/response';

import expensesSampleData from '../data/expenses.json';
import incomeSampleData from '../data/income.json';

interface IGetExpenseQuery {
  page: number
  perPage: number
  type?: string
}

const router = expressRouter();

router.get('/', async (req, res) => {
  const { page = 1, perPage = 10 } = req.query as unknown as IGetExpenseQuery
  try {
    const options: PaginateOptions = {
      page,
      limit: perPage,
      sort: { _id: -1 }
    }
    const username = res.locals.user?.preferred_username ?? ''
    const result = await Expense
      .paginate({ owner: username }, options)
    return res
      .status(200)
      .send({ page: result.page, perPage, total: result.totalDocs, result: result.docs })
  } catch (error) {
    console.log(error)
    return res.status(500).send(Status[500])
  }
})

router.post('/', async (req, res) => {
  const body = req.body
  const username = res.locals.user?.preferred_username ?? ''
  try {
    const expense = new Expense({ ...body, owner: username })
    const errors = expense.validateSync()
    if (!errors) {
      await expense.save()
      return res.status(201).send(body)
    } else return res
      .status(400)
      .send({ ...Status[400], error: { name: errors.name, message: errors.message } })
  } catch (error) {
    console.log(error)
    return res.status(500).send(Status[500])
  }
})

router.put('/:id', async (req, res) => {
  const expenseId: string = req.params.id;
  if (!isValidObjectId(expenseId)) return res
    .status(400)
    .send({
      ...Status[400],
      error: {
        name: 'TypeError',
        message: 'Invalid Expense Id: ExpenseId must be of type ObjectId()'
      }
    })
  try {
    const username = res.locals.user?.preferred_username ?? ''
    const body = req.body
    const expense = await Expense.updateOne({ _id: expenseId, owner: username }, body)
    if (expense.matchedCount === 0) return res.status(404).send(Status[404])
    return res.status(200).send(body)
  } catch (error) {
    console.log(error)
    return res.status(500).send(Status[500])
  }
})

router.delete('/:id', async (req, res) => {
  const expenseId: string = req.params.id;
  if (!isValidObjectId(expenseId)) return res
    .status(400)
    .send({
      ...Status[400],
      error: {
        name: 'TypeError',
        message: 'Invalid Expense Id: ExpenseId must be of type ObjectId()'
      }
    })
  try {
    const username = res.locals.user?.preferred_username ?? ''
    const body = req.body
    const expense = await Expense.deleteOne({ _id: expenseId, owner: username })
    if (expense.deletedCount === 0) return res.status(404).send(Status[404])
    return res.status(200).send(body)
  } catch (error) {
    console.log(error)
    return res.status(500).send(Status[500])
  }
})

router.post('/feed', async (_, res) => {
  const username = res.locals.user?.preferred_username ?? ''
  try {
    const count = await Expense.find({ owner: username }).countDocuments()
    if (count > 20) return res.status(202).send({ message: 'Data already in place' })
    const expense = expensesSampleData.map(e => ({ ...e, owner: username }))
    const income = incomeSampleData.map(i => ({ ...i, owner: username }))
    await Expense.insertMany([...expense, ...income])
    return res.status(201).send({ message: 'Data feed success' })
  } catch (error) {
    console.log(error)
    return res.status(500).send(Status[500])
  }
})

export default router;