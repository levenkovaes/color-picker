import { useForm } from "react-hook-form";

import { useAppDispatch } from "../../../hooks/hooks";
import { setImg } from "../../../store/features/color-picker/colorPickerSlice";
import { SError, SGeneralBtn, SInput } from "../../common/styled";
import { btnCss, SForm } from "./style";
import { IFormValues, ILinkFormProps } from "./types";

export const LinkForm: React.FC<ILinkFormProps> = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();
  const dispatch = useAppDispatch();

  return (
    <SForm
      onSubmit={handleSubmit((data) => {
        dispatch(setImg(data.link));
        handleClose();
      })}
    >
      <SInput
        $error={!!errors.link}
        {...register("link", {
          required: true,
          pattern: {
            value:
              /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
            message:
              "Link does not work. Make sure it starts with http:// or https:// and try again.",
          },
        })}
        type="text"
        placeholder="Paste your link here"
      ></SInput>
      <SGeneralBtn type="submit" $additionalCss={btnCss}>
        Upload
      </SGeneralBtn>
      {errors.link && <SError>{errors.link?.message}</SError>}
    </SForm>
  );
};
