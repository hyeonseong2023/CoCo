import React from 'react';

type Header = {
  name: string;
  work: string;
};

const Header: React.FC<Header> = ({ name,work }) => (
    <div>
    hi, {name} {work}
  </div>
);

Header.defaultProps = {
    work: '!'
};

export default Header;