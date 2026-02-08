import { useState } from "react";

import {
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
} from "@ionic/react";
import { barbell, hourglass, reload } from "ionicons/icons";

import { ConfigItem } from "../../models";
import NumberSetter from "../number-setter/component";
import "./styles.css";
import { ConfigListProps } from "./props";
import { STARTING_ROUND_DURATION } from "../../constants";

const ConfigList: React.FC<ConfigListProps> = ({
  onStart,
  initialRounds,
  initialWaitDuration,
  initialActiveDuration,
}: ConfigListProps) => {
  const [roundsValue, setRoundsValue] = useState<number>(initialRounds ?? 5);
  const [activeValue, setActiveValue] = useState<number>(
    initialActiveDuration ?? 30,
  );
  const [waitValue, setWaitValue] = useState<number>(initialWaitDuration ?? 10);

  const rounds: ConfigItem = {
    icon: reload,
    description: "# rounds",
    initialValue: roundsValue,
    valueUpdater: setRoundsValue,
  };

  const activities: ConfigItem = {
    icon: barbell,
    description: "Active time (s)",
    initialValue: activeValue,
    valueUpdater: setActiveValue,
  };

  const inBetweens: ConfigItem = {
    icon: hourglass,
    description: "Pause time (s)",
    initialValue: waitValue,
    valueUpdater: setWaitValue,
  };

  const totalTimeFormatted = () => {
    const totalInSeconds =
      STARTING_ROUND_DURATION +
      roundsValue * activeValue +
      roundsValue * waitValue -
      waitValue;
    if (totalInSeconds >= 60 * 60) {
      return new Date(totalInSeconds * 1000).toISOString().slice(11, 19);
    }
    return new Date(totalInSeconds * 1000).toISOString().slice(14, 19);
  };

  const parseItem = (item: ConfigItem) => {
    return (
      <>
        <IonItem className="config-item">
          <div className="config-item-wrapper">
          <div className="config-item-label">
          <IonIcon icon={item.icon} color="white" slot="start" />
          {item.description && (
            <IonLabel className="config-item-text">
              {item.description}
            </IonLabel>
            )}
          </div>
          <NumberSetter
            initValue={item.initialValue}
            updateValue={item.valueUpdater}
            />
          </div>
        </IonItem>
      </>
    );
  };

  return (
    <div className="content-wrapper-center">
      <IonContent>
        <IonList lines="none" className="content-list">
          {parseItem(rounds)}
          {parseItem(activities)}
          {parseItem(inBetweens)}
          <div className="list-item-end-position-wrapper">
            <IonItem>
              <div className="list-item-end-position-item">
                <IonLabel>{"Total time "}<span style={{ border: "1px solid white" }}>{totalTimeFormatted()}</span></IonLabel>
              </div>
            </IonItem>
          </div>
        </IonList>
        <div className="button-wrapper-center">
          <IonButton
            onClick={() => onStart(roundsValue, activeValue, waitValue)}
            style={{ width: "10rem", fontSize: "1.5rem" }}
          >
            START
          </IonButton>
        </div>
      </IonContent>
    </div>
  );
};

export default ConfigList;
