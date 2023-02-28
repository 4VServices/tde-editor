import styled from 'styled-components';

const MainContent = styled.div`
  width: 100%;
`;

export const DefaultLayout = ({ children }) => {
  return (
    <div>
      <MainContent className="container">{children}</MainContent>
    </div>
  );
};
