import { SH1, SLink } from "../../common/styled";
import { SHome } from "./styled";

export const Home = () => {
  return (
    <SHome>
      <SH1>HOME</SH1>
      <SLink to="/playground">Playground</SLink>
      <SLink to="/color-picker">Color Picker</SLink>
      <SLink to="/paint">Paint</SLink>
    </SHome>
  );
};
