import React from "react";
import Hero from "../Home/Hero";
import Creator from "../Home/Creator";
import Devoational from "../Home/Devoational";
import Trending from "../Home/Trending";

function Home() {
  return (
    <div>
      <Hero />
      <Trending />
      <Devoational />
      <Creator />
    </div>
  );
}

export default Home;
