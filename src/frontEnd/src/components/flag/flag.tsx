import React from 'react';
import './flag.css';

function Flag(props: { flagUrl: string; }) {
  return (
    <div className="flag">
        <img className="flag-img" src={props.flagUrl} style = {{height: "60px"}}/>
    </div>
  );
}

export default Flag;
