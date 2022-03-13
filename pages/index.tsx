import React from "react";
import type { NextPage } from "next";
// eslint-disable-next-line import/no-extraneous-dependencies
import BusinessCard from "../components/businessCard";
import Main from "../layouts/main";

const Home: NextPage = () => {
  return (
    <Main>
      <div className="wrapper home">
        <section>
          <BusinessCard />
        </section>
      </div>
    </Main>
  );
};

export default Home;
