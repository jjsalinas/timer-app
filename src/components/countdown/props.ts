import { CountdownKind } from "./types";

export interface CountdownProps {
  type: CountdownKind;
  seconds: number;
  currentRound: number;
  totalRounds: number;
  updateCurrentRound: (backwards?: boolean) => void;
  cancelAction: () => void;
}
