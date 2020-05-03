import React, { useState } from 'react';
import './infoRow.css';
import { Grid } from 'semantic-ui-react'

type Row = {
  title: string,
  value: string
}

function InfoRow(props: Row) {
    return (
        <Grid.Row className="infoRow">
            <Grid.Column>
                <img src="get it with props.title" alt="rowIcon" />
            </Grid.Column>
            <Grid.Column>
                <div>{props.title + " : " + props.value}</div>
            </Grid.Column>
        </Grid.Row>
    );
}

export default InfoRow;
