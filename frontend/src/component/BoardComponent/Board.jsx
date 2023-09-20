import React, { useEffect, useState } from "react";
import '../../css/Board.css';
import Post from "./Post";
import axios from "axios";


const Board = () =>{

    return(
        <div className="board">
            <Post></Post>
        </div>
    )
}

export default Board