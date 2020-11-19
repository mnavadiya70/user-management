import React, { useMemo, useState, useEffect } from "react";
import Axios from 'axios';

import BasicTableComponent from "./Table";

const Genres = ({ values }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    return (
      <>
        {values.map((genre, idx) => {
          return (
            <span key={idx} className="badge">
              {genre}
            </span>
          );
        })}
      </>
    );
  };

  
   

function Application() {

  /* 
    - Columns is a simple array right now, but it will contain some logic later on. It is recommended by react-table to memoize the columns data
    - Here in this example, we have grouped our columns into two headers. react-table is flexible enough to create grouped table headers
  */
//  show.genres = [
//     'Comedy',
//     'Sci-fi',
//    ]
  return (
    <div className="App">
      <BasicTableComponent/>
    </div>
  );
}

export default Application;