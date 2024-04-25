import { FC, useRef } from 'react';

import * as Styled from './InputFile.styled';
import { InputFileProps } from './InputFile.types';

const InputFile: FC<InputFileProps> = ({
  onChangeFile,
  accept,
  children,
  errorMessage,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Styled.WrapperButton>
      <Styled.Button
        type="button"
        onClick={() => fileInputRef !== null && fileInputRef.current?.click()}
      >
        <img src="/attach-icon.svg" alt="ícone de clips" />
        {children}
        <Styled.VisuallyHiddenInput
          ref={fileInputRef}
          onChange={onChangeFile}
          accept={accept}
          type="file"
        />
      </Styled.Button>
      {!!errorMessage && <Styled.Error>{errorMessage}</Styled.Error>}
    </Styled.WrapperButton>
  );
};

export default InputFile;
