export interface ConfigListProps {
  onStart: (
    rounds: number,
    activeDuration: number,
    waitDuration: number,
  ) => void;
  initialRounds?: number;
  initialActiveDuration?: number;
  initialWaitDuration?: number;
}
