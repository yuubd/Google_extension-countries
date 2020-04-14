import React, { useState } from 'react';
import './infoRow.css';

type Row = {
  title: string,
  value: string
}

function InfoRow(props: Row) {
  return (
    <div className="infoRow">
      <img src="get it with props.title" alt="rowIcon" />
      <div>{props.title}</div>
      <div>{props.value}</div>
    </div>
  );
}

export default InfoRow;
