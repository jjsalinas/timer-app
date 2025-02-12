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
import ConfigList from "../components/config-list/component";

const ConfigPage: React.FC = () => {
  /*
    TODO: List of items in a separate component,
      this page should handle just rendering that list of items component, and the switch to the countdown
  */
  const startCountdown = (
    rounds: number,
    activeDuration: number,
    waitDuration: number,
  ) => {
    /*
    TODO: flip a flag for countdown screens,
      passing props what was received here,
      and the setter for reseting the flag back, for when countdown finishes
    */
    console.log("START");
  };

  return (
    <IonPage>
      {/* <div className="content-wrapper-center"> */}
      <ConfigList onStart={startCountdown} />
      {/* </div> */}
    </IonPage>
  );
};

export default ConfigPage;
