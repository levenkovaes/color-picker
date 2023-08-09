import { SCloseBtn } from "./styled";

interface ICloseBtnProps {
  handleClick: () => void;
}

export const CloseBtn: React.FC<ICloseBtnProps> = ({ handleClick }) => {
  return <SCloseBtn onClick={handleClick}>×</SCloseBtn>;
};
