'use client';
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { PennyButton } from '../UserInput';
import { useState } from 'react';
import { clsx } from 'clsx';

export function CreateBudget() {
  const [creatingBudget, setCreatingBudget] = useState(false);

  return (
    <>
      <PennyButton onClick={() => setCreatingBudget(true)}>
        Create Budget
      </PennyButton>
      <Dialog
        open={creatingBudget}
        onClose={() => setCreatingBudget(false)}
        className='relative z-50'
      >
        <div className='fixed inset-0 bg-neutral-950/50 flex w-screen items-center justify-center p-4'>
          <DialogPanel
            className={clsx(
              'w-full h-full space-y-4 p-12',
              'bg-neutral-700',
              'border-2 border-neutral-950 rounded-xl'
            )}
          >
            <DialogTitle className='font-bold'>Create Budget</DialogTitle>
            <Description>Add Categories to create a new Budget.</Description>
            <p>{`(You can't do anything yet.)`}</p>
            <div className='flex gap-4'>
              <PennyButton onClick={() => setCreatingBudget(false)}>
                Cancel
              </PennyButton>
              <PennyButton onClick={() => setCreatingBudget(false)}>
                Deactivate
              </PennyButton>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
