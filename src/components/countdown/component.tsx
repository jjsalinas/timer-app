import { useEffect, useState } from "react";
import { CountdownProps } from "./props";
import { CountdownKind } from "./types";
import {
  IonButton,
  IonFooter,
  IonIcon,
  IonText,
  IonToolbar,
} from "@ionic/react";

const Countdown: React.FC<CountdownProps> = ({
  type,
  seconds,
  currentRound,
  totalRounds,
  updateCurrentRound,
}: CountdownProps) => {
  const [tickingSecond, setTickingSecond] = useState<number>(seconds);
  const styleClassName = `countdown-${type.toString()}`;

  const resetCount = () => {
    setTickingSecond(seconds);
  };

  const finishCount = () => {
    setTickingSecond(0);
  };

  const tickOneSecond = () => {
    return new Promise(() =>
      setTimeout(() => setTickingSecond(tickingSecond - 1), 1000),
    );
  };

  const handleTick = async () => {
    await tickOneSecond();
  };

  useEffect(() => {
    // console.log("tic tac --:", tickingSecond);
    if (tickingSecond === 0) {
      updateCurrentRound();
    }
    if (tickingSecond > 0) {
      handleTick();
    }
  }, [tickingSecond]);

  /*
    TODO: Styling
    Footer on horizontal flex.
  */

  return (
    <>
      <div className={styleClassName}>
        <IonText className="timecount-wrapper">
          <h1>{tickingSecond}</h1>
        </IonText>
        <IonFooter>
          <IonToolbar>
            <IonButton shape="round" size="small" onClick={resetCount}>
              <IonIcon slot="icon-only" name="play-skip-back-outline"></IonIcon>
            </IonButton>
            <IonText>
              <h3>
                {currentRound} / {totalRounds}
              </h3>
            </IonText>
            <IonButton shape="round" size="small" onClick={finishCount}>
              <IonIcon
                slot="icon-only"
                name="play-skip-forward-outline"
              ></IonIcon>
            </IonButton>
          </IonToolbar>
        </IonFooter>
      </div>
    </>
  );
};

export default Countdown;
