import React from "react";
import { Link } from "react-router-dom";

const OtherPage = () => {
  return (
    <>
      <h1>This is the other page for routing display</h1>
      <Link to="/">Home</Link>
    </>
  );
};

export default OtherPage;
