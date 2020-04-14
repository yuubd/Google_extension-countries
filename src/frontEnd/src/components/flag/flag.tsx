import React from 'react';
import './flag.css';

function Flag(props: { countryCode: string; }) {
  const srcStr = `https://restcountries.eu/data/${props.countryCode}.svg`;
  return (
    <div className="flag" >
      <img src={srcStr} style = {{width: "100px"}}/>
    </div>
  );
}

export default Flag;
