import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import { useRouter } from "next/router";

export interface FormHeaderProps {
  id?: string;
  text: string;
  includeRoute?: boolean;
}

function FormHeader(props: FormHeaderProps) {
  const router = useRouter();

  const { id, text, includeRoute } = props;

  const style = {
    marginBottom: "4rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #d8d8d8",
  };

  const iconStyle = {
    width: "2rem",
    height: "2rem",
    marginRight: "0.5rem",
    // color: "#d8d8d8",
  };

  return (
    <div className="flex md:px-20 px-6 text-3xl" style={style}>
      {includeRoute && (
        <div className="text-zinc-700" style={iconStyle}>
          <FontAwesomeIcon
            icon={solid("arrow-left")}
            onClick={() => router.back()}
          />
        </div>
      )}
      <h2 id={id} className="text-zinc-700 font-black">
        {text}
      </h2>
    </div>
  );
}

export default FormHeader;
