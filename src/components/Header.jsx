import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Heart, Home as HomeIcon } from "lucide-react";

function Header(){
  const [open,setOpen]=useState(false);
  const [user, setUser] = useState(null);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem("belong_user");
      setUser(stored ? JSON.parse(stored) : null);
    };
    const updateSavedCount = () => {
      const saved = JSON.parse(localStorage.getItem("belong_saved") || "[]");
      setSavedCount(saved.length);
    };
    
    checkUser();
    updateSavedCount();
    
    window.addEventListener("userLogin", checkUser);
    window.addEventListener("savedChanged", updateSavedCount);
    
    return () => {
      window.removeEventListener("userLogin", checkUser);
      window.removeEventListener("savedChanged", updateSavedCount);
    };
  }, []);
  return <header className="header">
    <Link to="/" className="brand"><HomeIcon size={28} color="var(--purple)" style={{ marginRight: '4px' }} /> Belong</Link>
    <nav className={open?"nav open":"nav"}>
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/preferences">Find roommates</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
    <div className="header-actions">
      <Link className="saved-link" to="/saved">
        <div style={{ position: 'relative' }}>
          <Heart size={16}/>
          {savedCount > 0 && (
            <span style={{ position: 'absolute', top: '-8px', right: '-12px', background: 'var(--pink)', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '2px 5px', borderRadius: '10px' }}>
              {savedCount}
            </span>
          )}
        </div>
        Saved
      </Link>
      {user ? (
        <Link to="/profile" className="login-btn">My Profile</Link>
      ) : (
        <Link className="login-btn" to="/login">Login</Link>
      )}
    </div>
    <button className="menu-btn" onClick={()=>setOpen(!open)}><Menu size={22}/></button>
  </header>
}

export default Header;