import { Icon } from "@/components/imports";
import { BtnProps } from "@/types/imports";

function Btn({
  text,
  type = "button",
  className,
  image,
  width,
  height,
  icon = false,
  name,
  bgStyle,
  iconNext = false,
  onClick,
}: BtnProps) {
  return (
    <button
      type={type}
      style={{ background: `${bgStyle}` }}
      className={`flex items-center gap-[10px] py-[10px] px-[21px] rounded-[5px] opacity-80 hover:opacity-100 transition-all ${
        className ? className : ""
      }`}
      onClick={onClick} // Attach the onClick function here
    >
      {iconNext && (
        <p className="btn-text text-sm font-secondary-regular text-black">
          {text}
        </p>
      )}
      {icon ? (
        <>
          {" "}
          <Icon
            className="btn-icon"
            icon={name ? name : ""}
            width={width}
            height={height}
          />{" "}
        </>
      ) : (
        ""
      )}

      {image ? (
        <>
          <img
            src={image}
            width={width ? width : 20}
            height={height ? height : 20}
            alt="image"
          />
        </>
      ) : (
        ""
      )}
      {!iconNext && (
        <p className="btn-text text-sm font-secondary-regular text-black">
          {text}
        </p>
      )}
    </button>
  );
}

export default Btn;
