import { useEffect, useRef, useState } from "react";
import { CountdownProps } from "./props";
import { IonButton, IonFooter, IonIcon, IonText } from "@ionic/react";
import {
  playSkipForwardOutline,
  playSkipBackOutline,
  pauseCircleOutline,
  playCircleOutline,
  stopCircleOutline,
} from "ionicons/icons";
import "./styles.css";
import { CountdownKind } from "./types";
import TICTAC_SOUND from "../../assets/tic-tac.mp3";
import BELL_SOUND from "../../assets/winner-bell-game-show.mp3";

const Countdown: React.FC<CountdownProps> = ({
  type,
  seconds,
  currentRound,
  totalRounds,
  updateCurrentRound,
  cancelAction,
}: CountdownProps) => {
  const [tickingSecond, setTickingSecond] = useState<number>(seconds);
  const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);
  const styleClassName = `countdown-${type}`; // TODO: fix this naming, reads de number value of the enum

  const clearTimeouts = () => {
    timeouts.forEach((id) => {
      clearTimeout(id);
    });
    setTimeouts([]);
  };

  const resetCount = () => {
    if (tickingSecond !== seconds) {
      clearTimeouts();
      setTickingSecond(seconds);
    }
  };

  const backOneRound = () => {
    if (currentRound > 1) {
      clearTimeouts();
      updateCurrentRound(true);
    }
  };

  const finishCount = () => {
    setTickingSecond(0);
  };

  const tickOneSecond = () => {
    const id = setTimeout(() => setTickingSecond(tickingSecond - 1), 1000);
    setTimeouts([...timeouts, id]);
  };

  const pauseCount = () => {
    if (timeouts.length > 0) {
      clearTimeouts();
    } else {
      tickOneSecond();
    }
  };

  const audioTicTacRef = useRef<HTMLAudioElement>(null);
  const audioBellRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (tickingSecond === 0) {
      clearTimeouts();
      updateCurrentRound();
    }
    if (tickingSecond > 0) {
      tickOneSecond();
    }

    // Play clock ticking for last 3 seconds if round is longer than 5
    if (seconds > 5 && tickingSecond === 3) {
      audioTicTacRef.current?.play();
    }
    // Play bell sound when round finishes
    if (tickingSecond === 0) {
      audioBellRef.current?.play();
    }
  }, [tickingSecond]);

  useEffect(() => {
    resetCount();
  }, [currentRound]);

  /*
    TODO:
    - Styling.
    - Add ticky sounds for last 3 seconds,
      ending with a higher pitch sound on 0, on finishing.
  */
  return (
    <>
      <div className={`countdown-wrapper ${styleClassName}`}>
        <IonText className="timecount-text">
          {type === CountdownKind.starting && <h4>Starting in...</h4>}
          {/* {type === CountdownKind.countdown && <h4>GO! GO! GO!</h4>}
          {type === CountdownKind.intermission && <h4>Breathe</h4>} */}
          <h1>{tickingSecond}</h1>
        </IonText>
      </div>
      <IonFooter className="timecount-footer-controls">
        <div className="timecount-footer">
          <IonButton
            shape="round"
            onClick={resetCount}
            onDoubleClick={backOneRound}
          >
            <IonIcon slot="icon-only" icon={playSkipBackOutline}></IonIcon>
          </IonButton>
          <IonText>
            <h3>
              {currentRound} / {totalRounds}
            </h3>
          </IonText>
          <IonButton shape="round" onClick={finishCount}>
            <IonIcon slot="icon-only" icon={playSkipForwardOutline}></IonIcon>
          </IonButton>
        </div>
        <div className="timecount-footer-actions">
          <IonButton onClick={pauseCount} style={{ width: "10rem" }}>
            {timeouts.length > 0 && (
              <>
                <IonText>Pause</IonText>
                <IonIcon slot="end" icon={pauseCircleOutline}></IonIcon>
              </>
            )}
            {timeouts.length === 0 && (
              <>
                <IonIcon slot="end" icon={playCircleOutline}></IonIcon>
                <IonText>Continue</IonText>
              </>
            )}
          </IonButton>
          <IonButton onClick={cancelAction} style={{ width: "10rem" }}>
            Stop
            <IonIcon slot="end" icon={stopCircleOutline}></IonIcon>
          </IonButton>
        </div>
      </IonFooter>
      <>
        <audio src={TICTAC_SOUND} ref={audioTicTacRef} />
        <audio src={BELL_SOUND} ref={audioBellRef} />
      </>
    </>
  );
};

export default Countdown;
