import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MultiPlayer from "../../components/PlayerAudio/PlayerAudio";
import useRecorder from "../../hooks/useRecorder";
const PageAnimal = (props) => {
  const [animal, setAnimal] = useState({});
  const [audio, setAudio] = useState();
  const [isRecord, setIsRecord] = useState(false);
  useEffect(() => {
    if (props.match.params.id) {
      setAnimal(
        JSON.parse(localStorage.getItem("animales")).find(
          (as) => as.id === Number(props.match.params.id)
        )
      );
    }
  }, []);
  useEffect(() => {
    if (animal.grabacion) {
      setAudio(animal.grabacion);
    }
  }, [animal]);
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  useEffect(() => {
    setAudio(audioURL);
    if (audioURL) {
      const array = JSON.parse(localStorage.getItem("animales"));
      array.map((as) => {
        if (as.id === animal.id) {
          as.grabacion = audioURL;
        }
      });
      localStorage.setItem("animales", JSON.stringify(array));
    }
  }, [audioURL]);
  useEffect(() => {
    setIsRecord(isRecording);
  }, [isRecording]);
  return (
    <div>
      {Object.keys(animal).length ? (
        <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen rounded-lg mx-0 lg:mx-28">
          <Link
            to="/"
            className="absolute top-0 left-0 text-white font-bold text-3xl ml-4 mt-4"
          >
            Volver
          </Link>
          {
            <img
              src={animal.image}
              style={animal.name === "CHIMPANCE" ? { width: "500px" } : {}}
            />
          }
          <div className="ml-0 lg:ml-48 mt-20 lg:mt-0 text-2xl flex flex-col bg-white p-10 lg:p-20 rounded-lg">
            <div>
              <span className="font-bold ">Nombre: </span> {animal.name}
            </div>
            <div className="mt-3">
              <div className="flex flex-row">
                <span className="font-bold mr-3">Sonido: </span>{" "}
                <MultiPlayer urls={animal.sonido} />
              </div>
            </div>
            <div className="mt-3">
              <div className="App">
                <span className="font-bold">Tu grabación: </span>
                <audio
                  src={audio}
                  controls
                  className={`${audio ? "block" : "hidden"}`}
                />
                <div className="flex flex-col ml-2">
                  {!audio ? (
                    !isRecord ? (
                      <button onClick={startRecording} disabled={isRecording}>
                        Grabar sonido
                      </button>
                    ) : (
                      <button onClick={stopRecording} disabled={!isRecording}>
                        Guardar grabación
                      </button>
                    )
                  ) : (
                    <button onClick={() => setAudio(undefined)}>
                      Borrar grabación
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "no existe"
      )}
    </div>
  );
};

export default PageAnimal;
