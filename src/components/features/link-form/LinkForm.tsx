import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { setImg } from "../../../store/features/color-picker/colorPickerSlice";
import { SGeneralBtn, SInput } from "../../common/styled";
import { btnCss, SForm } from "./style";

interface IFormValues {
  link: string;
}

interface ILinkFormProps {
  handleClose: () => void;
}

export const LinkForm: React.FC<ILinkFormProps> = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();
  const dispatch = useDispatch();

  return (
    <SForm
      onSubmit={handleSubmit((data) => {
        dispatch(setImg(data.link));
        handleClose();
      })}
    >
      <SInput
        {...register("link", { required: true })}
        type="text"
        placeholder="Paste your link here"
      ></SInput>
      <SGeneralBtn type="submit" $additionalCss={btnCss}>
        Upload
      </SGeneralBtn>
    </SForm>
  );
};
