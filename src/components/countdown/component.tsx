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
import { audioIds, playAudio, stopAllAudio } from "../../utils/audio-utils";
import { animate, createScope, Scope } from 'animejs';

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
  const styleClassName = `countdown-${type}`;
  const root = useRef(null);
  const scope = useRef<Scope | null>(null);

  const clearTimeouts = () => {
    timeouts.forEach((id) => {
      clearTimeout(id);
    });
    setTimeouts([]);
  };

  const resetCount = async (paramItem?: { stopSounds?: boolean }) => {
    if (tickingSecond !== seconds) {
      clearTimeouts();
      setTickingSecond(seconds);
    }
    if (paramItem?.stopSounds === true) {
      await stopAllAudio();
    }
  };

  const backOneRound = async () => {
    if (currentRound > 1) {
      clearTimeouts();
      updateCurrentRound(true);
      await stopAllAudio();
    }
  };

  const finishCount = async () => {
    setTickingSecond(0);
    await stopAllAudio();
  };

  const tickOneSecond = () => {
    const id = setTimeout(() => setTickingSecond(tickingSecond - 1), 1000);
    setTimeouts([...timeouts, id]);
  };

  const pauseCount = async () => {
    if (timeouts.length > 0) {
      clearTimeouts();
    } else {
      tickOneSecond();
    }
  };

  useEffect(() => {
    scope.current = createScope({ root }).add( self => {
      animate('.second', {
        y: '10rem',
        duration: 1010,
        rotate: 0,
        ease: 'inQuad',
        loop: true,
      });
    });

    // cleanup all anime.js instances declared inside the scope
    return () => scope?.current?.revert()

  }, [tickingSecond]);


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
      playAudio(audioIds.ticTac);
    }
    // Play bell sound when round finishes
    if (tickingSecond === 0 && currentRound !== totalRounds) {
      playAudio(audioIds.bell);
    }
    // Play ending bell sound when last round finishes
    if (tickingSecond === 0 && currentRound === totalRounds) {
      playAudio(audioIds.end);
    }
  }, [tickingSecond]);

  useEffect(() => {
    resetCount();
  }, [currentRound]);

  return (
    <>
      <div className={`countdown-wrapper ${styleClassName}`} ref={root}>
        <IonText className="timecount-text">
          {type === CountdownKind.starting && <h4>Starting in...</h4>}
          {/* {type === CountdownKind.countdown && <h4>GO! GO! GO!</h4>}
          {type === CountdownKind.intermission && <h4>Breathe</h4>} */}
          { tickingSecond.toString().length === 1 && 
            <h1 className="second">{tickingSecond}</h1>
          }
          { tickingSecond.toString().length > 1 && 
          <div className="text-wrapper">
              <h1>{tickingSecond.toString().split('').slice(0, tickingSecond.toString().length - 1)}</h1>
              <h1 className="second">{tickingSecond.toString().split('').at(-1)}</h1>
            </div>
          }
        </IonText>
      </div>
      <IonFooter className="timecount-footer-controls">
        <div className="timecount-footer">
          <IonButton
            shape="round"
            onClick={async () => await resetCount({ stopSounds: true })}
            onDoubleClick={async () => backOneRound()}
          >
            <IonIcon slot="icon-only" icon={playSkipBackOutline}></IonIcon>
          </IonButton>
          <IonText>
            <h3>
              {currentRound} / {totalRounds}
            </h3>
          </IonText>
          <IonButton shape="round" onClick={async () => await finishCount()}>
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
    </>
  );
};

export default Countdown;
