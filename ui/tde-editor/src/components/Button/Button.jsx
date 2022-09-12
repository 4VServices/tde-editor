import React, { useCallback, useState } from 'react';
import { Button as AntdButton } from 'antd';
import styled from 'styled-components';

const Root = styled(AntdButton)`
  width: ${(props) => props.fullWidth && '100%'};
`;

export const Button = ({ type, icon, onClick, loading: loadingProp, showLoading, fullWidth, ...restProps }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(
    async (e) => {
      if (!onClick) return;

      if (showLoading) {
        setLoading(true);
      }

      try {
        await onClick(e);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    },
    [onClick, showLoading]
  );

  return (
    <Root
      type={type}
      icon={icon}
      loading={loadingProp || loading}
      onClick={handleClick}
      fullWidth={fullWidth}
      {...restProps}
    />
  );
};
