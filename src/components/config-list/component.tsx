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

const ConfigList: React.FC<ConfigListProps> = ({
  onStart,
  initialRounds,
  initialWaitDuration,
  initialActiveDuration,
}: ConfigListProps) => {
  /*
    | Icon-description ------ numberSetter(configItemValue, configItemValueUpdater()) |
    (...)

    [Start button]
  */
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

  const parseItem = (item: ConfigItem) => {
    return (
      <>
        <IonItem>
          <IonIcon icon={item.icon} color="white" slot="start" />
          {item.description && (
            <IonLabel className="config-item-label">
              {item.description}
            </IonLabel>
          )}
          <NumberSetter
            initValue={item.initialValue}
            updateValue={item.valueUpdater}
          />
        </IonItem>
      </>
    );
  };

  return (
    <div className="content-wrapper-center">
      <IonContent>
        <IonList lines="none">
          {parseItem(rounds)}
          {parseItem(activities)}
          {parseItem(inBetweens)}
        </IonList>
        <div className="button-wrapper-center">
          <IonButton
            onClick={() => onStart(roundsValue, activeValue, waitValue)}
            style={{ width: "10rem" }}
          >
            START
          </IonButton>
        </div>
      </IonContent>
    </div>
  );
};

export default ConfigList;
