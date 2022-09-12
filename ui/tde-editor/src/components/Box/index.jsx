import React from "react";
import styled from "styled-components";

export const Box = styled.div`
  ${({ display }) => display && `display: ${display};`}
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ margin }) => margin && `margin: ${margin};`}
  ${({ marginTop }) => marginTop && `margin-top: ${marginTop};`}
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom};`}
  ${({ marginRight }) => marginRight && `margin-right: ${marginRight};`}
  ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft};`}
  ${({ padding }) => padding && `padding: ${padding};`}
  ${({ paddingTop }) => paddingTop && `padding-top: ${paddingTop};`}
  ${({ paddingLeft }) => paddingLeft && `padding-left: ${paddingLeft};`}
  ${({ paddingRight }) => paddingRight && `padding-right: ${paddingRight};`}
  ${({ width }) => width && `width: ${width};`}
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`}
  ${({ minWidth }) => minWidth && `min-width: ${minWidth};`}
  ${({ overflow }) => overflow && `overflow: ${overflow};`}
  ${({ height }) => height && `height: ${height};`}
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
  ${({ flexDirection }) => flexDirection && `flex-direction: ${flexDirection};`}
  ${({ flexGrow }) => flexGrow && `flex-grow: ${flexGrow};`}
  ${({ background }) => background && `background: ${background};`}
  ${({ border }) => border && `border: ${border};`}
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius};`}
  ${({ gap }) => gap && `gap: ${gap};`}
  ${({ flexWrap }) => (flexWrap ? `flex-wrap: ${flexWrap}` : "flex-wrap: wrap")}
`;

export const FlexBox = props => (
  <Box display="flex" {...props} alignItems={props.alignItems || "center"} />
);
