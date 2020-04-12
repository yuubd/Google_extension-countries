import React, { useState } from 'react';
import './infoRow.css';

function InfoRow(props: Row) {
  return (
    <div>
      <img src="get it with props.title" alt="rowIcon" />
      <div>{props.title}</div>
      <div>{props.value}</div>
    </div>
  );
}

export default InfoRow;

type Row = {
  title: string,
  value: string
}