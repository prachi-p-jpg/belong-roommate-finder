import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Search, MapPin, Heart, Users, ShieldCheck, Sparkles, ArrowRight, ChevronLeft, Share2, Check, Bookmark, X } from "lucide-react";
import Layout from "../components/Layout";
import { homes } from "../App";

function Listing(){
 const {id}=useParams(); 
 const [h, setH] = useState(null);
 const [match, setMatch] = useState(null);
 const [contact,setContact]=useState(false);
 const navigate = useNavigate();

 const [gemmaResponse, setGemmaResponse] = useState("This flat matches your preferences based on the lifestyle details.");
 const [gemmaLoading, setGemmaLoading] = useState(false);

 const handleAskGemma = () => {
   const token = localStorage.getItem("belong_token");
   if (!token) {
     alert("Please login first to ask Gemma.");
     return;
   }
   setGemmaLoading(true);
   fetch(`http://localhost:5000/api/gemma/chat`, {
     method: "POST",
     headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
     body: JSON.stringify({ listingId: id, question: `Why is this a ${match !== null ? match : 85}% match?` })
   })
     .then(res => res.json())
     .then(data => {
       if (data.reply) {
         setGemmaResponse(data.reply);
       } else {
         setGemmaResponse("Sorry, couldn't get a response.");
       }
     })
     .catch(err => {
       console.error(err);
       setGemmaResponse("Error connecting to Gemma.");
     })
     .finally(() => setGemmaLoading(false));
 };

 useEffect(() => {
   fetch(`http://localhost:5000/api/listings/${id}`)
     .then(res => res.json())
     .then(data => {
       if(data._id) setH(data);
     })
     .catch(err => console.error(err));

   const token = localStorage.getItem("belong_token");
   if (token) {
     fetch(`http://localhost:5000/api/listings/${id}/match`, {
       headers: { "Authorization": `Bearer ${token}` }
     })
       .then(res => res.json())
       .then(data => {
         if (data.matchPercentage !== undefined) {
           setMatch(data.matchPercentage);
         }
       })
       .catch(err => console.error(err));
   }
 }, [id]);

 const handleSave = () => {
   const token = localStorage.getItem("belong_token");
   if (!token) {
     alert("Please login first to save to wishlist.");
     navigate("/login");
     return;
   }
   
   fetch(`http://localhost:5000/api/saved/${id}`, {
     method: "POST",
     headers: { "Authorization": `Bearer ${token}` }
   })
    .then(res => res.json())
    .then(data => {
      let saved = JSON.parse(localStorage.getItem("belong_saved") || "[]");
      if (!saved.includes(id)) {
        saved.push(id);
        localStorage.setItem("belong_saved", JSON.stringify(saved));
        window.dispatchEvent(new Event("savedChanged"));
      }
      alert("Saved to your wishlist!");
    })
    .catch(err => {
      console.error(err);
      alert("Failed to save.");
    });
 };

 if (!h) return <Layout><div style={{padding:'50px',textAlign:'center'}}>Loading...</div></Layout>;

 return <Layout><div className="listing-page"><div className="listing-top"><Link to="/search-results"><ChevronLeft size={17}/> Back</Link><div><button onClick={handleSave}><Heart/></button><button><Share2/></button></div></div>
   <div className="listing-grid"><div><div className="large-photo"><img src={h.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'} onError={(e)=>{e.target.src='https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'}}/></div><h1>{h.title}</h1><div className="listing-price">₹{h.rent?.toLocaleString()}<small>/month</small></div><p><MapPin size={16}/> {h.location}</p><div className="tags"><span>{h.sharing} sharing</span><span>{h.roommates} roommate</span><span>{h.roomType}</span></div><hr/><h3>About the flat</h3><p>{h.description}</p><h3>About the roommates</h3><div className="roommate"><div className="avatar">R</div><div><b>Roommate</b><small>Current resident</small></div></div><div className="tags"><span>{h.smoking}</span><span>Pets: {h.pets}</span><span>Guests: {h.guests}</span></div></div>
   <aside className="match-panel">
     <div className="match-circle">{match !== null ? match : 85}%</div>
     <h3>{match !== null ? (match>=85?"Great match!":"Good match!") : "Good match!"}</h3>
     <small>Powered by Gemma</small>
     <p>
       {gemmaLoading ? "Gemma is thinking..." : `“${gemmaResponse}”`}
     </p>
     <ul>{["Similar sleep schedule","Both non-smokers","Similar budget","Quiet evenings","LGBTQ+ friendly"].map(x=><li key={x}><Check size={14}/>{x}</li>)}</ul>
     <button className="secondary" onClick={handleAskGemma} disabled={gemmaLoading}>Ask Gemma</button>
     <button className="primary wide" onClick={()=>setContact(true)}>Contact roommate</button>
     <button className="text-btn" onClick={handleSave}><Bookmark size={15}/> Save to wishlist</button>
   </aside>
   </div></div>
   {contact&&<div className="modal-backdrop" onClick={()=>setContact(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-x" onClick={()=>setContact(false)}><X/></button><h2>Contact roommate</h2><p>Send a friendly message about this home.</p><textarea placeholder="Hi! I’m interested in this room..."></textarea><button className="primary wide" onClick={()=>setContact(false)}>Send message</button></div></div>}
 </Layout>
}

export default Listing;