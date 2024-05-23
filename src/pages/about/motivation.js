import React from "react";
import bg from "../../assets/Shop1.jpg";

function Motivation() {
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="bg-no-repeat bg-cover"
    >
      <div className="container pt-20 pb-16 mx-auto md:text-lg">
        <h3 className="mt-3 mb-6 text-4xl font-black uppercase main-color">
          Motivation And Passion
        </h3>
        <p>
          With a background in manufacturing engineering and facing
          unemployment, Viola quickly jumped into training for yoghurt
          production and later birthed Stellar Dairyland. The rest is history as
          they say
        </p>
        <p className="mt-5">
          Viola's passion for healthy living for her young family drove her to do
          the same for other families at an affordable cost. Probiotic yogurt is
          packed with stellar benefits such as improved gut health and improved
          immunity, among other benefits. She is passionate about creating
          employment, especially for women who have had a career break for one
          reason or another, and for the youth.
        </p>
      </div>
    </div>
  );
}

export default Motivation;
