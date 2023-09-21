import React from "react";

function Navbar() {
  return (
    <nav className='navbar'>
      <div className='logo'>
        {/* Add your Atlan logo here */}
        <img
          width='90'
          height='30'
          src='https://website-assets.atlan.com/img/atlan-blue.svg'
          alt='Atlan Logo'
        />
      </div>
      <div className='app-name'>
        <h2>SQL Query Runner</h2>
      </div>
      <ul className='menu'>
        <li className='selected'>
          <a href='#'>Home</a>
        </li>
        <li>
          <a href='#'>About Us</a>
        </li>
        <li>
          <a href='https://github.com/RonakParmar07/SQL-QUERY-RUNNER.git'>
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
