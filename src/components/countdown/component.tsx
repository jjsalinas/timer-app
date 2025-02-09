import { useState } from "react";
import { CountdownProps } from "./props";

const Countdown: React.FC<CountdownProps> = ({
  type,
  seconds,
}: CountdownProps) => {
  const [tickingSecond, setTickingSecond] = useState<Number>(seconds);

  return <></>;
};

export default Countdown;
