import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, MapPin, Heart, Users, ShieldCheck, Sparkles, ArrowRight, ChevronLeft, ChevronRight, Moon, Cigarette, PawPrint, MessageCircle } from "lucide-react";
import Layout from "../components/Layout";
import Choice from "../components/Choice";
import { defaultPrefs } from "../App";

function Lifestyle(){
  const location=useLocation(), navigate=useNavigate();
  const [p,setP]=useState({...defaultPrefs,...(location.state?.prefs||{})});
  const set=(k,v)=>setP({...p,[k]:v});
  return <Layout><div className="wizard narrow">
    <div className="wizard-top"><Link to="/preferences"><ChevronLeft size={17}/> Back</Link><span>Step 2 of 2 <ChevronRight size={17}/></span></div>
    <div className="wizard-title"><h1>Your lifestyle & comfort preferences</h1><p>Select what's important to you. You can always change these later.</p></div>
    {[
      ["Sleep schedule", "sleep", ["Early sleeper","Flexible","Night owl"], <Moon size={16}/>],
      ["Smoking", "smoking", ["Non-smoker","Smoker","Doesn't matter"], <Cigarette size={16}/>],
      ["Guests", "guests", ["No guests","Occasional","Frequent"], <Users size={16}/>],
      ["Pets", "pets", ["Allowed","Not allowed","Doesn't matter"], <PawPrint size={16}/>],
      ["Social preference", "social", ["Quiet","Balanced","Social"], <MessageCircle size={16}/>],
      ["Cleanliness", "cleanliness", ["Very tidy","Usually tidy","Relaxed"], <Sparkles size={16}/>]
    ].map(([title,key,opts,icon])=><div className="pref-group" key={key}><label>{icon} {title}</label><div className="choices">{opts.map(o=><Choice key={o} selected={p[key]===o} onClick={()=>set(key,o)}>{o}</Choice>)}</div></div>)}
    <label className="checkline"><input type="checkbox" checked={p.lgbtq} onChange={e=>set("lgbtq",e.target.checked)}/> LGBTQ+ friendly household</label>
    <button className="primary wide" onClick={()=>navigate("/search-results",{state:{prefs:p}})}>Continue <ArrowRight size={17}/></button>
  </div></Layout>
}

export default Lifestyle;