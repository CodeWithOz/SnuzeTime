import React from 'react';

const Navbar = props => {
  return (
    <section style={{ fontFamily: 'Arial' }}>
      <p>{props.title}</p>
    </section>
  );
};

export default Navbar;
