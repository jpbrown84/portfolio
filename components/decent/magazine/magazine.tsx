import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import css from "styled-jsx/css";
import useViewportHeight from "../../../helpers/useViewportHeight";
import stylingConfig from "../../../stylingConfig";

const styles = css`
  .wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text {
    text-transform: uppercase;
    font-family: ${stylingConfig.decentFonts.senilita};
    font-size: 300px;
  }
  @media screen and (max-width: ${stylingConfig.breakpoints.xxl}px) {
    .text {
      font-size: 240px;
    }
  }
  @media screen and (max-width: ${stylingConfig.breakpoints.xl}px) {
    .text {
      font-size: 200px;
    }
  }
  @media screen and (max-width: ${stylingConfig.breakpoints.l}px) {
    .text {
      font-size: 140px;
    }
  }
  @media screen and (max-width: ${stylingConfig.breakpoints.m}px) {
    .text {
      font-size: 120px;
    }
  }
  @media screen and (max-width: ${stylingConfig.breakpoints.s}px) {
    .text {
      font-size: 100px;
    }
  }
  @media screen and (max-width: ${stylingConfig.breakpoints.xs}px) {
    .text {
      font-size: 90px;
    }
  }
  @media screen and (max-width: ${stylingConfig.breakpoints.xxs}px) {
    .text {
      font-size: 70px;
    }
  }
`;

const Magazine = ({
  backgroundColor,
  color,
}: {
  backgroundColor: string;
  color: string;
}) => {
  const vh = useViewportHeight();
  return (
    <div className="wrapper" style={{ backgroundColor, minHeight: vh }}>
      <div className="text" style={{ color }}>
        Decent.
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

export default Magazine;
