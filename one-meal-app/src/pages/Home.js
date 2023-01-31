import React from "react";

const Home = (props) => {
  console.log("-------");
  console.log(props);
  return (
    <>
      <h1>{props.userProp.name}</h1>
    </>
  );
};
export default Home;
