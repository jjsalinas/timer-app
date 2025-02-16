import { useMemo, useState } from "react";
import { barbell, hourglass, reload } from "ionicons/icons";
import { IonPage } from "@ionic/react";
import "./config-page.css";
import ConfigList from "../components/config-list/component";
import Countdown from "../components/countdown/component";
import { CountdownKind } from "../components/countdown/types";

const ConfigPage: React.FC = () => {
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [configTotalRounds, setConfigTotalRounds] = useState<number>(0);
  const [configActiveDuration, setConfigActiveDuration] = useState<number>(0);
  const [configWaitDuration, setConfigWaitDuration] = useState<number>(0);

  const startCountdown = (
    rounds: number,
    activeDuration: number,
    waitDuration: number,
  ) => {
    console.log("START");
    setConfigTotalRounds(rounds * 2 + 1); // Starting 1 + (1 active + 1 pause) per (round)
    setConfigActiveDuration(activeDuration);
    setConfigWaitDuration(configWaitDuration);
    setShowCountdown(true);
  };

  const updateRound = () => {
    const newRound = currentRound + 1;
    setCurrentRound(currentRound + 1);
    if (newRound === configTotalRounds + 1) {
      setShowCountdown(false);
    }
    return newRound;
  };

  const getRoundType = () => {
    if (currentRound === 1) {
      return CountdownKind.starting;
    }
    if (currentRound % 2 === 0) {
      return CountdownKind.countdown;
    }
    return CountdownKind.intermission;
  };

  const getRoundSeconds = () => {
    const roundType = getRoundType();
    if (roundType === CountdownKind.starting) {
      return 10;
    }
    if (roundType === CountdownKind.countdown) {
      return configActiveDuration;
    }
    return configWaitDuration;
  };

  const countDown = useMemo(() => {
    const newType = getRoundType();
    const newSeconds = getRoundSeconds();
    return (
      <Countdown
        type={newType}
        seconds={newSeconds}
        currentRound={currentRound}
        totalRounds={configTotalRounds}
        updateCurrentRound={updateRound}
      />
    );
  }, [showCountdown, currentRound, updateRound]);

  return (
    <IonPage>
      {!showCountdown && <ConfigList onStart={startCountdown} />}
      {showCountdown && countDown}
    </IonPage>
  );
};

export default ConfigPage;
