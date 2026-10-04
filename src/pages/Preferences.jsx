import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, MapPin, Heart, Users, ShieldCheck, Sparkles, ArrowRight, ChevronLeft, ChevronRight, Home as HomeIcon, BedDouble } from "lucide-react";
import Layout from "../components/Layout";
import Choice from "../components/Choice";
import { defaultPrefs } from "../App";

function Preferences(){
  const { state } = useLocation();
  const initialPrefs = state ? { ...defaultPrefs, ...state } : defaultPrefs;
  const [prefs,setPrefs]=useState(initialPrefs);
  const navigate=useNavigate();
  const set=(k,v)=>setPrefs({...prefs,[k]:v});
  return <Layout><div className="wizard">
    <div className="wizard-top"><Link to="/"><ChevronLeft size={17}/> Back</Link><span>Step 1 of 2 <ChevronRight size={17}/></span></div>
    <div className="wizard-title"><span className="eyebrow">Your perfect match starts here</span><h1>Tell us what you're looking for</h1><p>This will help us show you the best matches.</p></div>
    <div className="form-grid">
      <label>Location<div className="selectbox"><MapPin size={17}/><select value={prefs.location} onChange={e=>set("location",e.target.value)}><option>Bengaluru</option><option>Delhi</option><option>Gurgaon</option><option>Noida</option><option>Pune</option></select></div></label>
      <label>Budget (per month) - ₹{typeof prefs.budget === 'number' ? prefs.budget : 15000}<div className="range-row"><span>₹5,000</span><span>₹50,000+</span></div><input type="range" min="5000" max="50000" value={typeof prefs.budget === 'number' ? prefs.budget : 15000} onChange={e=>set("budget", Number(e.target.value))}/></label>
      <div className="full"><label>Room type</label><div className="choices"><Choice selected={prefs.roomType==="Shared Flat"} onClick={()=>set("roomType","Shared Flat")} icon={<HomeIcon size={16}/>} >Shared Flat</Choice><Choice selected={prefs.roomType==="PG"} onClick={()=>set("roomType","PG")}>PG</Choice><Choice selected={prefs.roomType==="Private Room"} onClick={()=>set("roomType","Private Room")}>Private Room</Choice></div></div>
      <div className="full"><label>Sharing</label><div className="choices"><Choice selected={prefs.sharing==="Single"} onClick={()=>set("sharing","Single")}><BedDouble size={16}/> Single</Choice><Choice selected={prefs.sharing==="Double"} onClick={()=>set("sharing","Double")}><BedDouble size={16}/> Double</Choice><Choice selected={prefs.sharing==="Triple"} onClick={()=>set("sharing","Triple")}><BedDouble size={16}/> Triple</Choice></div></div>
      <div className="full"><label>Roommate preference</label><div className="choices wrap"><Choice selected={prefs.roommate==="Male"} onClick={()=>set("roommate","Male")} icon="♂">Male</Choice><Choice selected={prefs.roommate==="Female"} onClick={()=>set("roommate","Female")} icon="♀">Female</Choice><Choice selected={prefs.roommate==="Any"} onClick={()=>set("roommate","Any")} icon="👥">Anyone</Choice><Choice selected={prefs.roommate==="LGBTQ+" || prefs.roommate==="LGBTQ+ Friendly"} onClick={()=>set("roommate","LGBTQ+")} icon="♡">LGBTQ+ friendly</Choice></div></div>
    </div>
    <button className="primary wide" onClick={()=>navigate("/lifestyle",{state:{prefs}})}>Next <ArrowRight size={17}/></button>
  </div></Layout>
}

export default Preferences;