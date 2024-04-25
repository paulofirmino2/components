import {
  FC,
  FocusEvent,
  HTMLInputTypeAttribute,
  useEffect,
  useState,
} from 'react';

import { MaskItens } from '@/types/Mask';
import { masks } from '@/utils/masks';

import * as Styled from './Input.styled';
import { InputProps } from './Input.types';

const icons = {
  search: '/search-icon.svg',
  openEye: '/open-eye-icon.svg',
  closeEye: '/close-eye-icon.svg',
};

const Input: FC<InputProps> = ({
  spacing,
  errorMessage,
  disabled,
  label,
  name,
  value,
  onChange,
  onBlur,
  id,
  mask,
  inputMode,
  autoFocus,
  iconleft,
  iconRight,
  fullWidth,
  sizevariant = 'md',
  type = 'text',
  placeholder,
}) => {
  const [maskPlaceholder, setMaskPlaceholder] = useState<string>('');
  const [maskFormat, setMask] = useState<string>('');
  const [passwordEye, setPasswordEye] = useState<'openEye' | 'closeEye'>(
    'openEye'
  );

  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type);

  useEffect(() => {
    if (mask) {
      setMask(masks[mask].mask);
      setMaskPlaceholder(masks[mask].maskPlaceholder);
    }
  }, [mask]);

  const handleChangePasswordEye = (typeCurrent: HTMLInputTypeAttribute) => {
    setPasswordEye(typeCurrent === 'password' ? 'closeEye' : 'openEye');
    setInputType(typeCurrent === 'password' ? 'text' : 'password');
  };

  return (
    <Styled.Wrapper
      errorMessage={errorMessage}
      disabled={disabled}
      spacing={spacing}
      fullWidth={fullWidth}
    >
      <Styled.InputWrapper sizevariant={sizevariant}>
        <Styled.InputText
          $iconleft={iconleft}
          $iconRight={iconRight}
          sizevariant={sizevariant}
          type={inputType}
          label={label}
          name={name}
          id={id}
          placeholder={(!label && placeholder) || ' '}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onBlur={(e: FocusEvent<HTMLInputElement>) => {
            if (onBlur) {
              onBlur(e);
            }
          }}
          autoComplete={value ? 'no' : ''}
          maskPlaceholder={maskPlaceholder}
          mask={maskFormat as MaskItens}
          aria-label={name}
          inputMode={inputMode}
          autoFocus={autoFocus}
        />
        {!!label && (
          <Styled.Label sizevariant={sizevariant} htmlFor={id}>
            {label}
          </Styled.Label>
        )}
      </Styled.InputWrapper>
      {!!errorMessage && <Styled.Error>{errorMessage}</Styled.Error>}
      {iconleft && (
        <Styled.IconLeftWrapper>
          <img alt="ícone" src={icons[iconleft]} />
        </Styled.IconLeftWrapper>
      )}

      {type === 'password' && (
        <Styled.IconRightWrapper
          style={{ cursor: 'pointer' }}
          onClick={() => handleChangePasswordEye(inputType)}
        >
          <img alt="ícone" src={icons[passwordEye]} />
        </Styled.IconRightWrapper>
      )}

      {type !== 'password' && iconRight && (
        <Styled.IconRightWrapper>
          <img alt="ícone" src={icons[iconRight]} />
        </Styled.IconRightWrapper>
      )}
    </Styled.Wrapper>
  );
};
export default Input;
