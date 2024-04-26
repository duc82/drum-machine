import { useEffect, useRef, useState } from "react";
import Heater_1 from "./assets/Heater-1.mp3";
import Heater_2 from "./assets/Heater-2.mp3";
import Heater_3 from "./assets/Heater-3.mp3";
import Heater_4 from "./assets/Heater-4_1.mp3";
import Heater_6 from "./assets/Heater-6.mp3";
import Kick_n_Hat from "./assets/Kick_n_Hat.mp3";
import RP4_KICK_1 from "./assets/RP4_KICK_1.mp3";
import Cev_H2 from "./assets/Cev_H2.mp3";
import Dsc_Oh from "./assets/Dsc_Oh.mp3";

const Switch = ({
  isOpen = false,
  onClick
}: {
  isOpen?: boolean;
  onClick: () => void;
}) => {
  return (
    <div className={`switch ${isOpen ? "on" : ""}`} onClick={onClick}>
      <button type="button" className="thumb"></button>
    </div>
  );
};

const App = () => {
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [volume, setVolume] = useState(0.6);
  const [isBank, setIsBank] = useState(false);
  const [display, setDisplay] = useState("");
  const drumPadsRef = useRef<HTMLDivElement | null>(null);

  const handleDrumPadClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!isPowerOn) return;

    const audio = e.currentTarget.childNodes[0] as HTMLAudioElement;
    audio.volume = volume;
    audio.play();

    setDisplay(e.currentTarget.id);
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const drumPads = drumPadsRef.current;
      if (!drumPads) return;
      const key = e.key.toUpperCase();

      const buttons = [...drumPads.childNodes] as HTMLButtonElement[];

      const audios = buttons.map((btn) => {
        return btn.childNodes[0];
      }) as HTMLAudioElement[];

      const audio = audios.find((audio) => audio.id === key);

      const button = audio?.parentNode as HTMLButtonElement;
      setDisplay(button.id);
      button.classList.add("active");
      button.click();
    };

    const handleKeyup = (e: KeyboardEvent) => {
      const drumPads = drumPadsRef.current;
      if (!drumPads) return;
      const key = e.key.toUpperCase();

      const buttons = [...drumPads.childNodes] as HTMLButtonElement[];

      const audios = buttons.map((btn) => {
        return btn.childNodes[0];
      }) as HTMLAudioElement[];

      const audio = audios.find((audio) => audio.id === key);

      const button = audio?.parentNode as HTMLButtonElement;
      setDisplay(button.id);
      button.classList.remove("active");
    };

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, []);

  return (
    <main className="container">
      <div id="drum-machine">
        <div className="drum-pads" ref={drumPadsRef}>
          <button
            onClick={handleDrumPadClick}
            type="button"
            className="drum-pad"
            id="Heater 1"
          >
            <audio src={Heater_1} className="clip" id="Q" hidden></audio>Q
          </button>
          <button
            onClick={handleDrumPadClick}
            type="button"
            className="drum-pad"
            id="Heater 2"
          >
            <audio src={Heater_2} className="clip" id="W" hidden></audio>W
          </button>
          <button
            onClick={handleDrumPadClick}
            type="button"
            className="drum-pad"
            id="Heater 3"
          >
            <audio src={Heater_3} className="clip" id="E" hidden></audio>E
          </button>
          <button
            onClick={handleDrumPadClick}
            type="button"
            className="drum-pad"
            id="Heater 4"
          >
            <audio src={Heater_4} className="clip" id="A" hidden></audio>A
          </button>
          <button
            onClick={handleDrumPadClick}
            type="button"
            className="drum-pad"
            id="Clap"
          >
            <audio src={Heater_6} className="clip" id="S" hidden></audio>S
          </button>
          <button
            onClick={handleDrumPadClick}
            type="button"
            className="drum-pad"
            id="Open HH"
          >
            <audio src={Dsc_Oh} className="clip" id="D" hidden></audio>D
          </button>
          <button
            onClick={handleDrumPadClick}
            type="button"
            className="drum-pad"
            id="Kick n' Hat"
          >
            <audio src={Kick_n_Hat} className="clip" id="Z" hidden></audio>Z
          </button>
          <button
            onClick={handleDrumPadClick}
            type="button"
            className="drum-pad"
            id="Kick"
          >
            <audio src={RP4_KICK_1} className="clip" id="X" hidden></audio>X
          </button>
          <button
            onClick={handleDrumPadClick}
            type="button"
            className="drum-pad"
            id="Closed HH"
          >
            <audio src={Cev_H2} className="clip" id="C" hidden></audio>C
          </button>
        </div>
        <div className="drum-control">
          <div id="power">
            <p>Power</p>
            <Switch
              isOpen={isPowerOn}
              onClick={() => setIsPowerOn(!isPowerOn)}
            />
          </div>
          <div id="display">{display}</div>
          <div id="volume">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue={volume}
              onChange={(e) => {
                const volume = e.target.value;
                setVolume(+volume);
                setDisplay(`Volume: ${volume}`);
              }}
            />
          </div>
          <div id="bank">
            <p>Bank</p>
            <Switch isOpen={isBank} onClick={() => setIsBank(!isBank)} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
