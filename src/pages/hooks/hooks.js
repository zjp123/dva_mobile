import React, {useState, useLayoutEffect, useEffect} from "react";

function App() {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const title = document.querySelector("#title");
    const titleWidth = title.getBoundingClientRect().width;
    console.log("useLayoutEffect");
    if (width !== titleWidth) {
      setWidth(titleWidth);
    }
  });
  useEffect(() => {
    console.log("useEffect");
  });
  return (
    <div style={{marginTop:'100px'}}>
      <h1 id="title">hello</h1>
      <h2>{width}</h2>
    </div>
  );
}


export default App