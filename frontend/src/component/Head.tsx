import React from 'react';

type Head = {
  name: string;
  work: string;
};

const Head: React.FC<Head> = ({ name,work }) => (
    <div>
    hi, {name} {work}
  </div>
);

Head.defaultProps = {
    work: '!'
};

export default Head;