import React, { useEffect, useState } from "react";
import '../../css/Board.css';
import Post from "./Post";
import axios from "axios";


const Board = () =>{


    const [data, setData] = useState();

    const fetchData = async() => {
            await axios.get('http://localhost:8099/selectpostviews/42/apoquol')
            .then(res => {
                console.log(res.data);
                console.log(res.data[0]);
                setData(res.data[0]);     
            })
        
    }

    useEffect(()=>{
        fetchData()
    }, [])


    return(
        <div className="board">
            {data && <Post data={data}></Post>}
        </div>
    )
}

export default Board