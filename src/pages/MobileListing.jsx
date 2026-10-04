import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, Heart, Users, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import { homes } from "../App";

function MobileListing(){ const h=homes[0]; return <div className="mobile-demo"><div className="phone"><Header/><div className="mobile-listing"><div className="mobile-large"><img src={h.img}/></div><h2>{h.title}</h2><b>₹12,500<small>/month</small></b><p><MapPin size={14}/> HSR Layout, Bengaluru</p><div className="match-box"><b>92% match</b><small>Similar sleep schedule · Non-smoker · Quiet evenings</small></div><h3>Why this is a good match?</h3><p>Powered by Gemma. This flat matches your preferences because you both prefer quiet evenings, are non-smokers, and have a similar budget.</p><button className="primary wide">Contact roommate</button></div></div></div> }


export default MobileListing;