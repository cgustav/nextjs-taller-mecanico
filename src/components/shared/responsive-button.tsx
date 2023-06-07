// const ResponsiveOutlinedButton = styled(Button).withConfig({
//     displayName: "responsive-button__ResponsiveOutlinedButton",
//     componentId: "sc-1q2q5x0-0"
// })(["@media (max-width:768px){display:none;}"]);

export interface ResponsiveButtonProps {
  textSm: string;
  text: string;
  onClick?: () => void;
  theme: "success" | "danger" | "warning" | "info" | "muted";
  isDisabled?: boolean;
}

function ResponsiveButton({
  textSm,
  text,
  onClick,
  theme,
  isDisabled = false,
}: ResponsiveButtonProps) {
  const resolveStyleClasses = (theme: string, disablethis: boolean) => {
    switch (theme) {
      case "success":
        return `border border-green-500 rounded text-green-500 ${
          disablethis ? "opacity-50 cursor-not-allowed" : ""
        }`;

      case "warning":
        return `border border-rose-500 rounded text-yellow-500 ${
          disablethis ? "opacity-50 cursor-not-allowed" : ""
        }`;

      case "danger":
        return `border border-rose-500 rounded text-rose-500 ${
          disablethis ? "opacity-50 cursor-not-allowed" : ""
        }`;
      case "info":
        return `border border-blue-500 rounded text-blue-500 ${
          disablethis ? "opacity-50 cursor-not-allowed" : ""
        }`;
      case "muted":
        return `border border-gray-500 rounded text-gray-500 ${
          disablethis ? "opacity-50 cursor-not-allowed" : ""
        }`;
      default:
        return `border border-green-500 rounded text-green-500 ${
          disablethis ? "opacity-50 cursor-not-allowed" : ""
        }`;
    }
  };

  return (
    <div>
      <button
        className={
          "px-4 md:py-2 py-2 " + resolveStyleClasses(theme, isDisabled)
        }
        onClick={onClick}
        disabled={isDisabled}
      >
        <span className="block md:hidden lg:hidden">{textSm}</span>
        <span className="hidden md:block lg:block">{text}</span>
      </button>
    </div>
  );
}

export default ResponsiveButton;
