import { NextPage } from "next";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import css from "styled-jsx/css";
import Magazine from "../components/decent/magazine/magazine";
import PageCarousel from "../components/decent/pageCarousel";
import Main from "../layouts/main";
import stylingConfig from "../stylingConfig";

const styles = css``;

const DecentPage: NextPage = () => {
  return (
    <Main>
      <PageCarousel
        transitionColorSet={[
          stylingConfig.decentColors.persianRose,
          stylingConfig.decentColors.purple,
          stylingConfig.decentColors.spray,
          stylingConfig.decentColors.coconutCream,
        ]}
      >
        <Magazine
          backgroundColor={stylingConfig.decentColors.blueGem}
          color={stylingConfig.decentColors.coconutCream}
        />
        <Magazine
          backgroundColor={stylingConfig.decentColors.purple}
          color={stylingConfig.decentColors.coconutCream}
        />
        <Magazine
          backgroundColor={stylingConfig.decentColors.persianRose}
          color={stylingConfig.decentColors.coconutCream}
        />
      </PageCarousel>
    </Main>
  );
};

export default DecentPage;
