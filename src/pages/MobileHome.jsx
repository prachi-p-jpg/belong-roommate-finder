import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, Heart, Users, ShieldCheck, Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import Header from "../components/Header";

function MobileHome(){ return <div className="mobile-demo"><div className="phone"><Header/><div className="mobile-content"><span className="eyebrow">More than just a room</span><h1>Find a place where <em>you belong.</em></h1><p>Discover flats and compatible roommates based on your lifestyle, preferences and comfort.</p><div className="mobile-search"><MapPin/> Bengaluru</div><div className="mobile-search">₹ &nbsp; Budget <ChevronRight/></div><div className="mobile-search"><Users/> Any roommate</div><Link className="primary wide" to="/search-results"><Search size={16}/> Search</Link><div className="mini-art"></div></div></div></div> }

export default MobileHome;