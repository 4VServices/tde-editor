import React from "react";
import { TreeSelect as AntdTreeSelect } from "antd";
import { Label } from "components/common";
import styled from "styled-components";

const Root = styled.div`
  width: ${props => (props.fullWidth ? "100%" : "auto")};
`;

export const TreeSelect = ({
  value,
  label,
  required,
  fullWidth,
  rootStyle,
  treeData,
  treeDefaultExpandAll,
  ...restProps
}) => {
  return (
    <Root fullWidth={fullWidth} style={rootStyle}>
      {label && <Label required={required}>{label}</Label>}
      <AntdTreeSelect
        style={{ width: "100%" }}
        value={value}
        treeData={treeData}
        treeDefaultExpandAll={treeDefaultExpandAll}
        {...restProps}
      />
    </Root>
  );
};
