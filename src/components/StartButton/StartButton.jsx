import button from "../../assets/Imagen1.png";
const StartButton = ({ className, onClick }) => {
  return (
    <div
      className={`min-h-screen flex justify-center items-center flex-col ${className}`}
      aria-hidden="true"
      onClick={() => {
        onClick(true);
        localStorage.setItem("buttonActive", true);
      }}
    >
      <span className="font-bold text-2xl -mb-10 text-white mt-20">
        Empezar actividad
      </span>
      <img src={button} className="cursor-pointer" />
    </div>
  );
};

export default StartButton;
