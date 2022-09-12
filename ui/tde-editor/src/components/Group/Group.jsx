import styled from 'styled-components';

const Root = styled.div`
  position: relative;
  border: 1px solid #000;
  border-radius: 10px;
  margin-top: 1rem;
  padding: 2rem;
`;

const Title = styled.div`
  position: absolute;
  background: #fff;
  font-size: 2rem;
  font-weight: 500;
  line-height: 100%;
  left: 2rem;
  top: -1rem;
  padding: 0 1rem;
`;

export const Group = ({ title, children, ...rest }) => {
  return (
    <Root {...rest}>
      <Title>{title}</Title>
      {children}
    </Root>
  );
};
