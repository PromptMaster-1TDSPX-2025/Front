interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FormInput({ label, ...props }: FormInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder-gray-500"
        {...props} 
      />
    </div>
  );
}