import React from 'react';
import '../css/Main.css'
import Banner from '../component/Banner'
type MainProps = {};

const Main: React.FC<MainProps> = ({}) => (
    <div>
        <Banner/>
        <p>main</p>
    </div>
);

export default Main;
