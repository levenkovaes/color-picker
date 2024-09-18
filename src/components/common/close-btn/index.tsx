import { SCloseBtn } from "./styled";
import { ICloseBtnProps } from "./types";

export const CloseBtn: React.FC<ICloseBtnProps> = ({ handleClick }) => {
  return <SCloseBtn onClick={handleClick}>×</SCloseBtn>;
};
