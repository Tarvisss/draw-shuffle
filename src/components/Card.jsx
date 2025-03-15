import React, { useState } from "react";


/** Single card: just renders the card as received from deck. */

function Card({ name, image }) {
  // get these once; it will never be updated for the same card



  return <img
      alt={name}
      src={image}
      />;
}

export default Card;