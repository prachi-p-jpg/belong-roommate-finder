import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import Layout from "../components/Layout";
import { homes } from "../App";

function Saved(){
  const [savedHomes, setSavedHomes] = useState([]);
  
  useEffect(() => {
    const savedIds = JSON.parse(localStorage.getItem("belong_saved") || "[]");
    if (savedIds.length === 0) {
      setSavedHomes([]);
      return;
    }
    
    fetch("http://localhost:5000/api/listings")
      .then(res => res.json())
      .then(data => {
        const backendHomes = data.map(d => ({
          id: d._id,
          title: d.title,
          price: d.rent,
          location: d.location,
          img: d.image
        }));
        
        const localHomes = homes.map(h => ({
          id: h.id,
          title: h.title,
          price: h.price,
          location: `${h.area}, ${h.city}`,
          img: h.img
        }));
        
        const allHomes = [...localHomes, ...backendHomes];
        
        // Filter unique by ID to avoid duplicates just in case
        const uniqueHomesMap = new Map();
        allHomes.forEach(h => {
          if (savedIds.includes(h.id)) {
            uniqueHomesMap.set(h.id, h);
          }
        });
        
        setSavedHomes(Array.from(uniqueHomesMap.values()));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Layout>
      <div className="simple-page">
        <span className="eyebrow">Your shortlist</span>
        <h1>Saved Homes</h1>
        <p>{savedHomes.length} homes saved</p>
        <div className="saved-list">
          {savedHomes.length === 0 && <p style={{ color: "var(--muted)" }}>No homes saved yet.</p>}
          {savedHomes.map(h => (
            <Link to={"/listing/"+h.id} className="saved-item" key={h.id}>
              <img src={h.img}/>
              <div>
                <h3>{h.title}</h3>
                <b>₹{h.price.toLocaleString()}/month</b>
                <small>{h.location}</small>
                <span className="match-pill">85% match</span>
              </div>
              <Heart fill="#e43d76" color="#e43d76" />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Saved;