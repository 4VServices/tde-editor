import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Input, InputNumber } from 'antd';
import styled from 'styled-components';
import { Label } from 'components/common';
// import TextArea from 'antd/lib/input/TextArea';

const Root = styled.div`
  width: ${(props) => (props.fullWidth ? '100%' : props.width || 'auto')};
`;

const StyledInputNumber = styled(InputNumber)`
  width: ${(props) => (props.fullwidth === 'true' ? '100%' : props.width || '90px')};
`;

export const TextEdit = ({
  label = '',
  value,
  onChange,
  onChangeDebounced,
  fullWidth,
  type,
  required,
  disabled,
  rows,
  onBlur,
  width,
  rootStyle,
  ...restProps
}) => {
  const [localValue, setLocalValue] = useState();
  const timer = useRef(undefined);

  useEffect(() => {
    setLocalValue(value);
    console.log(`TextEdit; local value for ${label} is ${value}`);
    if (type === 'number' && value !== undefined && value !== null) {
      const vv = parseFloat(value);
      if (value !== vv) {
        if (onChange) {
          onChange(vv);
        }
        if (onChangeDebounced) {
          onChangeDebounced(vv);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, value]);

  const handleChangeInput = useCallback(
    (e) => {
      const value = type === 'number' ? e : e.target.value;
      setLocalValue(value);

      if (onChange) onChange(value);

      if (onChangeDebounced) {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          onChangeDebounced(value);
        }, 300);
      }
    },
    [onChange, onChangeDebounced, type]
  );

  const handleBlur = useCallback(
    (e) => {
      const vv = e.target.value;
      setLocalValue(vv);

      let value = vv;
      if (type === 'number') {
        value = parseFloat(vv);
      }

      if (onBlur) onBlur(value);
    },
    [onBlur, type]
  );

  return (
    <Root fullWidth={fullWidth} width={width} style={rootStyle}>
      {label && <Label required={required}>{label}</Label>}
      {type === 'textarea' ? (
        <Input.TextArea
          rows={rows || 3}
          value={localValue}
          onChange={handleChangeInput}
          onBlur={handleBlur}
          disabled={disabled}
          {...restProps}
        />
      ) : type === 'number' ? (
        <StyledInputNumber
          value={localValue}
          onChange={handleChangeInput}
          disabled={disabled}
          onBlur={handleBlur}
          fullwidth={fullWidth ? 'true' : 'false'}
          width={width}
          {...restProps}
        />
      ) : (
        <Input
          value={localValue}
          onChange={handleChangeInput}
          type={type}
          disabled={disabled}
          onBlur={handleBlur}
          {...restProps}
        />
      )}
    </Root>
  );
};
