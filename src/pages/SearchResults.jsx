import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, MapPin, Heart, Users, ShieldCheck, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "../components/Layout";
import HomeCard from "../components/HomeCard";
import { homes } from "../App";

function SearchResults() {
  const locationState = useLocation();
  const prefs = locationState.state?.prefs || {};

  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem("belong_saved") || "[]"));
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalListings, setTotalListings] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(null);

  const fetchListings = () => {
    const params = new URLSearchParams();
    if (filters.location) params.append("location", filters.location);
    if (filters.budget) params.append("budget", filters.budget);
    if (filters.roomType) params.append("roomType", filters.roomType);
    if (filters.sharing) params.append("sharing", filters.sharing);
    if (filters.smoking) params.append("smoking", filters.smoking);
    if (filters.pets) params.append("pets", filters.pets);
    if (filters.search) params.append("search", filters.search);
    params.append("page", currentPage);
    params.append("limit", 4);

    fetch(`https://belong-roommate-finder.onrender.com/api/listings?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setError(null);
        if (data.listings) {
          setListings(data.listings);
          setTotalPages(data.totalPages || 1);
          setTotalListings(data.totalListings || 0);
        } else {
          setListings(data.length ? data : []);
          setTotalPages(1);
          setTotalListings(data.length || 0);
        }
      })
      .catch(err => {
        console.error(err);
        setError("Unable to load listings. Please start the backend server.");
      });
  };

  useEffect(() => {
    fetchListings();
  }, [currentPage]); 
  // We trigger it manually in handleFilter and handleSearchClick as well to avoid loop

  // Parse budget string if necessary, or default to 15000
  let initialBudget = 15000;
  if (typeof prefs.budget === "string") {
    if (prefs.budget.includes("10,000")) initialBudget = 10000;
    if (prefs.budget.includes("20,000")) initialBudget = 25000;
  }

  const [filters, setFilters] = useState({
    location: prefs.location || "Bengaluru",
    budget: initialBudget,
    roomType: prefs.roomType || "Shared Flat",
    sharing: prefs.sharing || "Double",
    roommate: prefs.roommate || "Any",
    sleep: prefs.sleep || "",
    smoking: prefs.smoking || "",
    guests: prefs.guests || "",
    pets: prefs.pets || "",
    social: prefs.social || "",
    cleanliness: prefs.cleanliness || "",
    lgbtq: prefs.lgbtq || false,
    search: ""
  });

  useEffect(() => {
    fetchListings();
  }, [filters]);

  const handleFilter = (key, val) => {
    setFilters(prev => ({ ...prev, [key]: val }));
    setCurrentPage(1);
  };
  
  const handleSearchClick = () => {
    setFilters(prev => ({ ...prev, search: searchText }));
    setCurrentPage(1);
  };

  const handleSave = (id) => {
    const token = localStorage.getItem("belong_token");
    if (!token) {
      alert("Please login first to save to wishlist.");
      navigate("/login");
      return;
    }

    let newSaved = [...saved];
    if (newSaved.includes(id)) {
      newSaved = newSaved.filter(x => x !== id);
    } else {
      newSaved.push(id);
      alert("Saved to your wishlist!");
    }

    setSaved(newSaved);
    localStorage.setItem("belong_saved", JSON.stringify(newSaved));
    window.dispatchEvent(new Event("savedChanged"));
  };

  return <Layout><div className="results-layout">
    <aside className="filters">
      <div className="filter-head"><b>Filters</b><button onClick={() => setFilters({ location: "", budget: 15000, roomType: "", sharing: "", roommate: "" })}>Clear all</button></div>
      <label>Budget (per month)</label>
      <input type="range" min="5000" max="50000" step="1000" value={filters.budget} onChange={e => handleFilter("budget", parseInt(e.target.value))} />

      <label>Location</label>
      {["Bengaluru", "Delhi", "Gurgaon", "Noida", "Pune"].map(x => <label className="checkline" key={x}><input type="checkbox" checked={filters.location === x} onChange={() => handleFilter("location", x)} />{x}</label>)}

      <label>Room type</label>
      {["Shared Flat", "PG", "Private Room"].map(x => <label className="checkline" key={x}><input type="checkbox" checked={filters.roomType === x} onChange={() => handleFilter("roomType", x)} />{x}</label>)}

      <label>Sharing</label>
      {["Single", "Double", "Triple"].map(x => <label className="checkline" key={x}><input type="checkbox" checked={filters.sharing === x} onChange={() => handleFilter("sharing", x)} />{x}</label>)}

      <label>Roommate preference</label>
      {["Male", "Female", "Any", "LGBTQ+"].map(x => <label className="checkline" key={x}><input type="checkbox" checked={filters.roommate === x} onChange={() => handleFilter("roommate", x)} />{x === "Any" ? "Anyone" : x === "LGBTQ+" ? "LGBTQ+ friendly" : x}</label>)}

      <label>Sleep schedule</label>
      {["Early sleeper", "Flexible", "Night owl"].map(x => <label className="checkline" key={x}><input type="checkbox" checked={filters.sleep === x} onChange={() => handleFilter("sleep", x)} />{x}</label>)}

      <label>Smoking</label>
      {["Non-smoker", "Smoker", "Doesn't matter"].map(x => <label className="checkline" key={x}><input type="checkbox" checked={filters.smoking === x} onChange={() => handleFilter("smoking", x)} />{x}</label>)}

      <label>Guests</label>
      {["No guests", "Occasional", "Frequent"].map(x => <label className="checkline" key={x}><input type="checkbox" checked={filters.guests === x} onChange={() => handleFilter("guests", x)} />{x}</label>)}

      <label>Pets</label>
      {["Allowed", "Not allowed", "Doesn't matter"].map(x => <label className="checkline" key={x}><input type="checkbox" checked={filters.pets === x} onChange={() => handleFilter("pets", x)} />{x}</label>)}

      <label>Social preference</label>
      {["Quiet", "Balanced", "Social"].map(x => <label className="checkline" key={x}><input type="checkbox" checked={filters.social === x} onChange={() => handleFilter("social", x)} />{x}</label>)}

      <label>Cleanliness</label>
      {["Very tidy", "Usually tidy", "Relaxed"].map(x => <label className="checkline" key={x}><input type="checkbox" checked={filters.cleanliness === x} onChange={() => handleFilter("cleanliness", x)} />{x}</label>)}

    </aside>
    <section className="results">
      <div className="results-toolbar">
        <div className="chips">
          {filters.location && <span><MapPin size={14} /> {filters.location}</span>}
          <span>₹ {Math.floor(filters.budget / 1000)}k max</span>
          {filters.roommate && filters.roommate !== "Anyone" && <span>{filters.roommate}</span>}
          {filters.roomType && <span>{filters.roomType}</span>}
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search flats, areas..." 
            value={searchText} 
            onChange={(e) => setSearchText(e.target.value)} 
            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '8px' }}
          />
          <button className="primary" onClick={handleSearchClick}><Search size={15} /> Search</button>
        </div>
      </div>
      <div className="found"><b>{totalListings} homes found</b><span>Sort by: <b>Most relevant</b></span></div>
      
      {error && (
        <div style={{ textAlign: 'center', padding: '50px 0', color: 'red' }}>
          <h3>{error}</h3>
        </div>
      )}

      {!error && listings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <h3>No homes found</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>Try adjusting your filters to find more results.</p>
          <button className="secondary" onClick={() => {
            setFilters({ location: "", budget: 15000, roomType: "", sharing: "", roommate: "", sleep: "", smoking: "", guests: "", pets: "", social: "", cleanliness: "", lgbtq: false, search: "" });
            setSearchText("");
          }}>Clear all filters</button>
        </div>
      ) : (
        <div className="home-grid">
          {listings.map(h => <HomeCard key={h._id} h={{ id: h._id, title: h.title, city: h.location, area: h.location, price: h.rent, img: h.image, match: 85, sharing: h.sharing, roommates: h.roommates, tags: [h.roomType, h.sharing, h.smoking] }} saved={saved.includes(h._id)} onSave={() => handleSave(h._id)} onOpen={() => navigate("/listing/" + h._id)} />)}
        </div>
      )}

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>Prev</button>
        {Array.from({length: totalPages}, (_, i) => i + 1).map(p => <button key={p} className={currentPage === p ? 'active' : ''} onClick={() => setCurrentPage(p)}>{p}</button>)}
        <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>Next</button>
      </div>
    </section>
  </div></Layout>
}

export default SearchResults;