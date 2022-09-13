import styled from 'styled-components';

export const H1 = styled.div`
  font-size: 3.2rem;
  font-weight: 500;
  line-height: 120%;
`;

export const H2 = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 120%;
`;

export const H3 = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 120%;
`;

export const B1Med = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 120%;
`;

export const B1Reg = styled.div`
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 120%;
`;

export const B2Med = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 120%;
`;

export const B2Reg = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 120%;
`;

export const B3Med = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 110%;
`;

export const B3Reg = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 110%;
`;

export const Label = styled.div`
  font-size: 1.2rem;
  margin-bottom: 0.4rem;

  ${props => {
    if (props.required)
      return `
    &:after {
      content: "*";
      margin-left: 0.4rem;
    }`;
  }}
`;