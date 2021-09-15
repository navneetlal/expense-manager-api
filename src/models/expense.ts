import { Schema, model, PaginateModel, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface IExpense extends Document {
  type: 'Expense' | 'Income'
  amount: number
  date: Date
  category?: string
  note?: string
  owner: string
  createdAt: Date
  updatedAt: Date
}

const expenseSchema = new Schema<IExpense>({
  type: {
    type: String,
    required: true,
    enum: {
      values: ['Expense', 'Income'],
      message: '{VALUE} is not supported'
    }
  },
  amount: {
    type: Number,
    required: true,
    min: [1, 'Must be at least 1, got {VALUE}']
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    default: 'None'
  },
  note: String,
  owner: {
    type: String,
    required: true
  }
}, { timestamps: true });

expenseSchema.plugin(mongoosePaginate)

interface ExpenseModel<T extends Document> extends PaginateModel<T> {}

const Expense: ExpenseModel<IExpense> = model<IExpense>('Expense', expenseSchema) as ExpenseModel<IExpense>;

export default Expense;