import React from 'react';
import './flag.css';

function Flag(props: string) {
  return (
    <div className="flag" >
      <img src="https://restcountries.eu/data/col.svg" style = {{width: "500px"}}/>
    </div>
  );
}

export default Flag;
