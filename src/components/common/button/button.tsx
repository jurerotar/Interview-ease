import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'confirm' | 'danger';

type ButtonProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
} & HTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'confirm',
    className,
    children,
    ...rest
  } = props;

  return (
    <button
      type="button"
      className={clsx(variant === 'confirm' && 'bg-green-500 hover:bg-green-600', variant === 'danger' && 'bg-red-500 hover:bg-red-600', 'flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 font-semibold text-white transition-colors duration-300', className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
