import { useEffect, useMemo, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import ConfigList from "../components/config-list/component";
import Countdown from "../components/countdown/component";
import { CountdownKind } from "../components/countdown/types";
import { preloadAllAudio, stopAllAudio } from "../utils/audio-utils";
import {
  DEFAULT_ROUNDS_VALUE,
  DEFAULT_ACTIVE_TIME_VALUE,
  DEFAULT_WAIT_TIME_VALUE,
  STARTING_ROUND_DURATION,
} from "../constants";

const ConfigPage: React.FC = () => {
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [configRounds, setConfigRounds] =
    useState<number>(DEFAULT_ROUNDS_VALUE);
  const [configActiveDuration, setConfigActiveDuration] = useState<number>(
    DEFAULT_ACTIVE_TIME_VALUE,
  );
  const [configWaitDuration, setConfigWaitDuration] = useState<number>(
    DEFAULT_WAIT_TIME_VALUE,
  );

  // Total round count = 2 * number of rounds
  // // It would be +1 for the starting round, but is also -1. Last round finishes after active part
  const totalRounds = () => configRounds * 2;
  const totalRoundsValue = useMemo(() => totalRounds(), [configRounds]);

  const startCountdown = (
    rounds: number,
    activeDuration: number,
    waitDuration: number,
  ) => {
    if (
      currentRound === 1 &&
      rounds > 0 &&
      activeDuration > 0 &&
      waitDuration > 0
    ) {
      setConfigRounds(rounds);
      setConfigActiveDuration(activeDuration);
      setConfigWaitDuration(waitDuration);
      setShowCountdown(true);
    }
  };

  const cancelCountdown = async () => {
    setShowCountdown(false);
    setCurrentRound(1);
    await stopAllAudio();
  };

  const updateRound = (backwards?: boolean) => {
    let newRound = currentRound + 1;
    if (backwards && currentRound > 1) {
      newRound = currentRound - 1;
    }
    if (showCountdown && newRound <= totalRounds()) {
      setCurrentRound(newRound);
    }
    if (newRound === totalRounds() + 1) {
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
      return STARTING_ROUND_DURATION;
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
        totalRounds={totalRoundsValue}
        updateCurrentRound={updateRound}
        cancelAction={cancelCountdown}
      />
    );
  };

  const countdown = useMemo(() => {
    return getCountdown(currentRound);
  }, [showCountdown, currentRound]);

  useEffect(() => {
    // Get native-audio capacitor to load all mp3 audios here
    preloadAllAudio();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        {!showCountdown && (
          <ConfigList
            onStart={startCountdown}
            initialRounds={configRounds}
            initialActiveDuration={configActiveDuration}
            initialWaitDuration={configWaitDuration}
          />
        )}
        {showCountdown && countdown}
      </IonContent>
    </IonPage>
  );
};

export default ConfigPage;
