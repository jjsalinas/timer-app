import { useEffect, useState } from "react";
import { CountdownProps } from "./props";
import {
  IonButton,
  IonFooter,
  IonIcon,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { playSkipForwardOutline, playSkipBackOutline } from "ionicons/icons";
import "./styles.css";

const Countdown: React.FC<CountdownProps> = ({
  type,
  seconds,
  currentRound,
  totalRounds,
  updateCurrentRound,
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

  useEffect(() => {
    if (tickingSecond === 0) {
      clearTimeouts();
      updateCurrentRound();
    }
    if (tickingSecond > 0) {
      tickOneSecond();
    }
  }, [tickingSecond]);

  useEffect(() => {
    resetCount();
  }, [currentRound]);

  /*
    TODO: Styling
    Add ticky sounds for last 3 seconds, ending with a higher pitch sound on 0, on finishing
  */
  return (
    <>
      <div className={styleClassName}>
        <div className="timecount-wrapper">
          <IonText className="timecount-text">
            <h1>{tickingSecond}</h1>
          </IonText>
        </div>
        <IonFooter>
          <IonToolbar>
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
                <IonIcon
                  slot="icon-only"
                  icon={playSkipForwardOutline}
                ></IonIcon>
              </IonButton>
            </div>
          </IonToolbar>
        </IonFooter>
      </div>
    </>
  );
};

export default Countdown;
