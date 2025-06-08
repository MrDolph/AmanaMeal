// src/components/Button.jsx
export default function Button({ children, onClick, variant, size }) {
  const base = 'px-4 py-2 rounded font-semibold focus:outline-none';
  const variants = {
    success: 'bg-green-600 text-white hover:bg-green-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    default: 'bg-gray-300 text-gray-700 hover:bg-gray-400',
  };
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.md}`}
    >
      {children}
    </button>
  );
}
