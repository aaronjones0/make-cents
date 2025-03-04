import { CreateBudget } from '@/components/CreateBudget/CreateBudget';

export default function BudgetsHome() {
  return (
    <div className='h-screen p-4 flex flex-col gap-4'>
      <h1 className='text-4xl font-light'>Budgets</h1>
      <CreateBudget />
    </div>
  );
}
