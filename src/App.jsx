import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Preferences from "./pages/Preferences";
import Lifestyle from "./pages/Lifestyle";
import SearchResults from "./pages/SearchResults";
import Listing from "./pages/Listing";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import MobileHome from "./pages/MobileHome";
import MobileListing from "./pages/MobileListing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

export const homes = [
  {id:1,title:"Sunny room in HSR Layout",city:"Bengaluru",area:"HSR Layout",price:12500,img:"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",match:92,sharing:"Double",roommates:1,tags:["Non-smoking","Quiet home","LGBTQ+ friendly","Pet friendly"]},
  {id:2,title:"Cozy 2BHK in Indiranagar",city:"Bengaluru",area:"Indiranagar",price:14000,img:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",match:86,sharing:"Triple",roommates:2,tags:["Non-smoking","Social home","Guest friendly"]},
  {id:3,title:"Spacious flat in Koramangala",city:"Bengaluru",area:"Koramangala",price:15000,img:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",match:80,sharing:"Double",roommates:1,tags:["Quiet home","Pet friendly"]},
  {id:4,title:"Modern 2BHK in Whitefield",city:"Bengaluru",area:"Whitefield",price:10500,img:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",match:69,sharing:"Triple",roommates:3,tags:["Non-smoking","Social home"]},
];

export const defaultPrefs = {
  location:"Bengaluru", budget:"₹8,000 - ₹15,000", roomType:"Shared Flat", roommate:"Any", sharing:"Double",
  sleep:"Flexible", smoking:"Non-smoker", guests:"Occasional", pets:"Allowed",
  social:"Balanced", cleanliness:"Usually tidy", lgbtq:true
};

function App(){
 return <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/preferences" element={<Preferences/>}/>
  <Route path="/lifestyle" element={<Lifestyle/>}/>
  <Route path="/search-results" element={<SearchResults/>}/>
  <Route path="/listing/:id" element={<Listing/>}/>
  <Route path="/saved" element={<Saved/>}/>
  <Route path="/profile" element={<Profile/>}/>
  <Route path="/about" element={<About/>}/>
  <Route path="/contact" element={<Contact/>}/>
  <Route path="/help" element={<Help/>}/>
  <Route path="/signup" element={<SignUp/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/privacy" element={<Privacy/>}/>
  <Route path="/terms" element={<Terms/>}/>
  <Route path="/mobile-home" element={<MobileHome/>}/>
  <Route path="/mobile-listing" element={<MobileListing/>}/>
 </Routes>
}
export default App;