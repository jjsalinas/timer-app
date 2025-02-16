import { useState } from "react";

import {
  IonPage,
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
}: ConfigListProps) => {
  /*
    | Icon-description ------ numberSetter(configItemValue, configItemValueUpdater()) |
    (...)

    [Start button]
  */
  const [roundsValue, setRoundsValue] = useState<number>(5);
  const [activityValue, setActivityValue] = useState<number>(30);
  const [waitValue, setWaitValue] = useState<number>(10);

  const rounds: ConfigItem = {
    icon: reload,
    description: "Number of rounds",
    initialValue: roundsValue,
    valueUpdater: setRoundsValue,
  };

  const activities: ConfigItem = {
    icon: barbell,
    description: "Active time per round",
    initialValue: activityValue,
    valueUpdater: setActivityValue,
  };

  const inBetweens: ConfigItem = {
    icon: hourglass,
    description: "In between time per round",
    initialValue: waitValue,
    valueUpdater: setWaitValue,
  };

  const parseItem = (item: ConfigItem) => {
    return (
      <>
        <IonItem>
          <IonIcon icon={item.icon} color="white" slot="start" />
          {item.description && <IonLabel>{item.description}</IonLabel>}
          <NumberSetter
            initValue={item.initialValue}
            updateValue={item.valueUpdater}
          />
        </IonItem>
      </>
    );
  };

  return (
    // <div>
    <div className="content-wrapper-center">
      <IonContent>
        <IonList lines="none">
          {parseItem(rounds)}
          {parseItem(activities)}
          {parseItem(inBetweens)}
        </IonList>
        <div className="button-wrapper-center">
          <IonButton
            onClick={() => onStart(roundsValue, activityValue, waitValue)}
          >
            START
          </IonButton>
        </div>
      </IonContent>
    </div>
  );
};

export default ConfigList;
