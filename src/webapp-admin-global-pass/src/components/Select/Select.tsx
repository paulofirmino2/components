import { FC, forwardRef, ReactNode } from 'react';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as SelectRadix from '@radix-ui/react-select';
import { findIndex, uniqueId } from 'lodash';

import * as Styled from './Select.styled';
import { Options, SelectProps } from './Select.types';

type SelectItemProps = {
  children: ReactNode;
  value: string;
};

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, ...props }, forwardedRef) => (
    <Styled.StyledItem {...props} ref={forwardedRef}>
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
      <Styled.StyledItemIndicator>
        <CheckIcon />
      </Styled.StyledItemIndicator>
    </Styled.StyledItem>
  )
);

const Select: FC<SelectProps> = ({
  label,
  id,
  sizevariant = 'md',
  placeholder,
  options,
  disabled,
  fullWidth,
  spacing,
  errorMessage,
  value,
  onChangeOption,
  defaultOption,
}) => {
  const handleFindLabelByValue = () => {
    const valueForFind = defaultOption || value;
    if (options) {
      const idx = findIndex(options, ['value', valueForFind]);
      if (idx !== -1) {
        return options[idx].label;
      }
    }
    return '';
  };

  return (
    <Styled.Wrapper spacing={spacing} fullWidth={fullWidth}>
      <Styled.SelectRoot
        value={value}
        onValueChange={onChangeOption}
        defaultValue={defaultOption}
      >
        <Styled.SelectTrigger
          aria-label={value}
          sizevariant={sizevariant}
          disabled={disabled}
          $errorMessage={errorMessage}
        >
          <Styled.SelectValue id="value" placeholder={placeholder}>
            {defaultOption || value ? handleFindLabelByValue() : placeholder}
          </Styled.SelectValue>
          <Styled.SelectIcon>
            <ChevronDownIcon />
          </Styled.SelectIcon>
          {!!label && (
            <Styled.Label sizevariant={sizevariant} htmlFor={id}>
              {label}
            </Styled.Label>
          )}
        </Styled.SelectTrigger>
        <SelectRadix.Portal>
          <Styled.SelectContent
            side="bottom"
            position="popper"
            sideOffset={-5}
            $errorMessage={errorMessage}
          >
            <Styled.SelectViewport>
              <SelectRadix.Group>
                {options &&
                  options.map((option: Options) => (
                    <SelectItem key={uniqueId()} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
              </SelectRadix.Group>
            </Styled.SelectViewport>
          </Styled.SelectContent>
        </SelectRadix.Portal>
      </Styled.SelectRoot>
      {!!errorMessage && <Styled.Error>{errorMessage}</Styled.Error>}
    </Styled.Wrapper>
  );
};
export default Select;
