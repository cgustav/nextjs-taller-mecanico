export interface ErrorLabelProps {
  message: string;
}

const ErrorLabel = ({ message }: ErrorLabelProps) => {
  return (
    <div>
      <p className="text-red-500 text-sm italic">{message}</p>
    </div>
  );
};

export default ErrorLabel;
