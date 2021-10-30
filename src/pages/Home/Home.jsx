import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import background from "../../assets/background.jpg";
import check from "../../assets/check.png";

const Home = ({ className, animales }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("animales")));
  }, []);
  return (
    <div
      className={`${className} flex flex-col`}
      style={{ backgroundImage: `url(${background})` }}
    >
      {items.filter((a) => !a.grabacion).length ? (
        <>
          <span className="text-3xl text-white font-bold text-center mt-24">
            Seleccione un animal
          </span>
          <div className="grid justify-items-center grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 lg:px-24 xl:px-0 mt-14">
            {items?.map((animal) => (
              <Link to={`/animal/${animal.id}`}>
                <div
                  className="p-5 rounded-lg"
                  style={animal.style ? animal.style : null}
                >
                  <img src={animal.image} />
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="min-h-screen">
          <div className="flex flex-col items-center justify-center text-center mx-64 py-10">
            <span className="text-3xl font-bold mt-16 text-white">
              FELICITACIONES TERMINASTE LA ACTIVIDAD
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
