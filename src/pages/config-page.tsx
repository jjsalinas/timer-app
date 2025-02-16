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
    if (currentRound === 1) {
      setConfigTotalRounds(rounds * 2 + 1); // Starting 1 + (1 active + 1 pause) per (round)
      setConfigActiveDuration(activeDuration);
      setConfigWaitDuration(waitDuration);
      setShowCountdown(true);
    }
  };

  const updateRound = (backwards?: boolean) => {
    let newRound = currentRound + 1;
    if (backwards && currentRound > 1) {
      newRound = currentRound - 1;
    }
    if (showCountdown && newRound <= configTotalRounds) {
      setCurrentRound(newRound);
    }
    if (newRound === configTotalRounds + 1) {
      setShowCountdown(false);
      setCurrentRound(1);
    }
  };

  const getRoundType = (roundValue: number) => {
    if (roundValue === 1) {
      return CountdownKind.starting;
    }
    if (roundValue > 1 && roundValue % 2 === 0) {
      return CountdownKind.countdown;
    }
    return CountdownKind.intermission;
  };

  const getRoundSeconds = (roundValue: number) => {
    const roundType = getRoundType(roundValue);
    if (roundType === CountdownKind.starting) {
      return 5;
    }
    if (roundType === CountdownKind.countdown) {
      return configActiveDuration;
    }
    return configWaitDuration;
  };

  const getCountdown = (roundValue: number) => {
    if (!showCountdown) {
      return <></>;
    }

    const newType = getRoundType(roundValue);
    const newSeconds = getRoundSeconds(roundValue);

    return (
      <Countdown
        type={newType}
        seconds={newSeconds}
        currentRound={roundValue}
        totalRounds={configTotalRounds}
        updateCurrentRound={updateRound}
      />
    );
  };

  const countdown = useMemo(() => {
    return getCountdown(currentRound);
  }, [showCountdown, currentRound]);

  return (
    <IonPage className="page-wrapper-center">
      {!showCountdown && <ConfigList onStart={startCountdown} />}
      {showCountdown && countdown}
    </IonPage>
  );
};

export default ConfigPage;
