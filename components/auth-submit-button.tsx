'use client';

import { useFormStatus } from 'react-dom';

type AuthSubmitButtonProps = {
  label: string;
  pendingLabel: string;
};

export function AuthSubmitButton({ label, pendingLabel }: AuthSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn-primary w-full disabled:opacity-60" disabled={pending}>
      {pending ? pendingLabel : label}
    </button>
  );
}
