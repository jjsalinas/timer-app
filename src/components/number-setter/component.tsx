import React, { useState, useRef, useEffect } from "react";
import {
  IonButton,
  IonIcon,
  IonInput,
  HTMLIonInputElement,
} from "@ionic/react";
import { add, remove } from "ionicons/icons";
import "./styles.css";

import { NumberSetterProps } from "./props";

const NumberSetter: React.FC<NumberSetterProps> = ({
  initValue,
  updateValue,
}: NumberSetterProps) => {
  const [value, setValue] = useState<number>(initValue ?? 0);
  const numberInput = useRef<HTMLIonInputElement>(null);

  const onInput = (event: Event) => {
    const value = (event.target as HTMLIonInputElement).value as string;

    // Removes non numeric characters
    const filteredValue = value.replace(/[^0-9]+/g, "");
    setValue(Number(filteredValue));

    const inputCmp = numberInput.current;
    if (inputCmp !== null) {
      inputCmp.value = filteredValue;
    }
  };

  useEffect(() => {
    // If value comes from parent, call parent update method
    if (updateValue) {
      updateValue(value);
    }
  }, [value]);

  return (
    <div id="container">
      <IonButton
        shape="round"
        size="small"
        onClick={() => (value > 0 ? setValue(value - 1) : null)}
      >
        <IonIcon slot="icon-only" icon={remove} color="white"></IonIcon>
      </IonButton>
      <IonInput
        ref={numberInput}
        onIonInput={onInput}
        class="custom"
        placeholder="000"
        value={value}
      ></IonInput>
      <IonButton shape="round" size="small" onClick={() => setValue(value + 1)}>
        <IonIcon slot="icon-only" icon={add}></IonIcon>
      </IonButton>
    </div>
  );
};

export default NumberSetter;
