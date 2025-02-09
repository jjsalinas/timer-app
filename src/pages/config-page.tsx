import { useState } from "react";
import { barbell, hourglass, reload } from "ionicons/icons";
import { ConfigItem } from "../models";
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import NumberSetter from "../components/number-setter/component";
import "./config-page.css";

const ConfigPage: React.FC = () => {
  /*
    | Icon-description ------ numberSetter(configItemValue, configItemValueUpdater()) |
    (...)

    [Start button]

    TODO: List of items in a separate component,
      this page should handle just rendering that list of items component, and the switch to the countdown
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
    <IonPage>
      <div className="content-wrapper-center">
        <IonContent>
          <IonList lines="none">
            {parseItem(rounds)}
            {parseItem(activities)}
            {parseItem(inBetweens)}
          </IonList>
        </IonContent>
      </div>
    </IonPage>
  );
};

export default ConfigPage;
