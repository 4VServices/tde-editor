import React, { useMemo } from "react";
import { Select as AntdSelect } from "antd";
import { Label } from "components/common";
import styled from "styled-components";

const Root = styled.div`
  width: ${props => (props.fullwidth ? "100%" : "auto")};
`;

export const Select = ({
  options: optionsProps,
  hasEmpty = false,
  onChange,
  value,
  width,
  label,
  required,
  fullwidth,
  mode,
  showSearch,
  onSearch,
  filterOption,
  allowClear = true,
  dropdownMatchSelectWidth = false,
  rootStyle,
  disabled,
  ...restProps
}) => {
  const options = useMemo(() => {
    const ops = optionsProps || [];
    if (hasEmpty) {
      return [
        {
          value: "",
        },
        ...optionsProps,
      ];
    }
    return ops;
  }, [hasEmpty, optionsProps]);

  return (
    <Root fullwidth={fullwidth} style={rootStyle}>
      {label && <Label required={required}>{label}</Label>}
      <AntdSelect
        showSearch={showSearch}
        mode={mode}
        allowClear={allowClear}
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        disabled={disabled}
        {...restProps}
        style={{ width: width || fullwidth ? "100%" : "15rem" }}
        dropdownMatchSelectWidth={dropdownMatchSelectWidth}
      >
        {options.map((option, index) => {
          if (option.group) {
            return (
              <AntdSelect.OptGroup label={option.group}>
                {option.value.map((op, idx) => {
                  return (
                    <AntdSelect.Option
                      key={`select-${index}-grp-${idx}`}
                      value={op.value}
                    >
                      {op.label || op.value}
                    </AntdSelect.Option>
                  );
                })}
              </AntdSelect.OptGroup>
            );
          }
          return (
            <AntdSelect.Option key={`select-${index}`} value={option.value}>
              {option.label || option.value}
            </AntdSelect.Option>
          );
        })}
      </AntdSelect>
    </Root>
  );
};
