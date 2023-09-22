import { ScreenTypes } from "@/types/imports";

function Screen({ color, image, title, text }: ScreenTypes) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{ background: color }}
    >
      <div className="flex flex-col items-center gap-6">
        <img className="w-max max-w-[303px]" src={image} alt={title} />
        <div className="flex flex-col items-center gap-4 px-14">
          <p className="text-white font-secondary-semibold  text-4xl leading-[134.5%] text-center">
            {title}
          </p>
          <p className="text-white font-secondary-regular text-xl leading-[145%] text-center">{text}</p>
        </div>
      </div>
    </div>
  );
}
export default Screen;
