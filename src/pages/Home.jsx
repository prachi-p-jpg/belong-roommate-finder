import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, Heart, Users, ShieldCheck, Sparkles, ArrowRight, ChevronDown, Home as HomeIcon, Bot, X, Send } from "lucide-react";
import Layout from "../components/Layout";
import "../home.css";

function CustomDropdown({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="field-text custom-dropdown" ref={ref} onClick={() => setIsOpen(!isOpen)}>
      <label>{label}</label>
      <div className="dropdown-trigger">
        <span>{value}</span>
        <ChevronDown size={14} />
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((opt) => (
            <div key={opt} className="dropdown-item" onClick={() => { onChange(opt); setIsOpen(false); }}>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Home(){
  const navigate=useNavigate();
  const [location, setLocation] = useState("Bengaluru");
  const [budgetStr, setBudgetStr] = useState("Any budget");
  const [roommate, setRoommate] = useState("Any");
  const [isGemmaOpen, setIsGemmaOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "user", text: "Why is this a 92% match?" },
    { sender: "bot", text: "You have a strong lifestyle match because you both prefer flexible sleep schedules, non-smoking environments and occasional guests." }
  ]);

  const handleAskGemma = async () => {
    if (!chatInput.trim()) return;
    const token = localStorage.getItem("belong_token");
    if (!token) {
      alert("Please login first to chat with Gemma.");
      return;
    }

    const newMsgs = [...messages, { sender: 'user', text: chatInput }];
    setMessages(newMsgs);
    setChatInput("");
    setIsTyping(true);
    
    try {
      const response = await fetch("https://belong-roommate-finder.onrender.com/api/gemma/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          listingId: null,
          question: chatInput
        })
      });
      const data = await response.json();
      setMessages([...newMsgs, { sender: 'bot', text: data.reply || data.response || data.error || "No response" }]);
    } catch (err) {
      console.error("Gemma Chat Error:", err);
      setMessages([...newMsgs, { sender: 'bot', text: "Gemma is temporarily unavailable. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSearch = () => {
    let budget = 15000;
    if (budgetStr === "Under ₹10,000") budget = 8000;
    else if (budgetStr === "₹10,000 - ₹20,000") budget = 15000;
    else if (budgetStr === "Above ₹20,000") budget = 25000;

    let mappedRoommate = roommate;
    if (roommate === "LGBTQ+ Friendly") mappedRoommate = "LGBTQ+";
    
    navigate("/preferences", { state: { location, budget, roommate: mappedRoommate } });
  };

  return <Layout>
    <section className="new-hero">
      <div className="new-hero-content">
        <div className="new-hero-copy">
          <div className="hero-pill"><Sparkles size={14}/> Better homes. Happier you.</div>
          <h1>Find a place where<br/>you belong.</h1>
          <p>Find flats and roommates that match
your budget, lifestyle and preferences.</p>
          
          <div className="new-search-bar">
            <div className="search-field">
              <MapPin size={18}/>
              <CustomDropdown 
                 label="Location" 
                 options={["Bengaluru", "Mumbai", "Delhi", "Pune", "Hyderabad"]} 
                 value={location} 
                 onChange={setLocation}
              />
            </div>
            <div className="search-field">
              <span>₹</span>
              <CustomDropdown 
                 label="Budget" 
                 options={["Any budget", "Under ₹10,000", "₹10,000 - ₹20,000", "Above ₹20,000"]} 
                 value={budgetStr} 
                 onChange={setBudgetStr}
              />
            </div>
            <div className="search-field">
              <Users size={18}/>
              <CustomDropdown 
                 label="Roommate preference" 
                 options={["Any", "Male", "Female", "LGBTQ+ Friendly", "Couple"]} 
                 value={roommate} 
                 onChange={setRoommate}
              />
            </div>
            <button className="search-btn" onClick={handleSearch}><Search size={18}/> Search</button>
          </div>

          <div className="hero-features">
            <div className="hf-item"><Users size={18}/> Find compatible<br/>roommates</div>
            <div className="hf-item"><ShieldCheck size={18}/> Safe & verified<br/>listings</div>
            <div className="hf-item"><Heart size={18}/> LGBTQ+ friendly<br/>homes</div>
            <div className="hf-item"><Sparkles size={18}/> Lifestyle based<br/>matching</div>
          </div>
        </div>
      </div>
      <div className="handwriting hw-1">Different<br/>people<br/>Same<br/>Home<br/>♥</div>
    </section>

    <section className="why-section">
      <div className="why-header">
        <h2>Why Belong?</h2>
        <p>More than just a room — it's about finding people who fit your vibe.</p>
      </div>
      <div className="why-grid">
        <div className="why-card">
          <div className="why-icon"><HomeIcon size={22}/></div>
          <h3>Find the right place</h3>
          <h4 style={{ fontWeight: 500, margin: '8px 0 4px', color: '#555' }}>Find flats, PGs and private rooms</h4>
          <p>Browse homes based on your location, budget, room type and sharing preference.</p>
        </div>
        <div className="why-card">
          <div className="why-icon green"><Users size={22}/></div>
          <h3>Find compatible roommates</h3>
          <h4 style={{ fontWeight: 500, margin: '8px 0 4px', color: '#555' }}>Match with people who fit your lifestyle</h4>
          <p>Compare preferences like sleep schedule, smoking, guests, pets, cleanliness and social habits.</p>
        </div>
        <div className="why-card">
          <div className="why-icon orange"><Sparkles size={22}/></div>
          <h3>Understand your match</h3>
          <h4 style={{ fontWeight: 500, margin: '8px 0 4px', color: '#555' }}>See your lifestyle compatibility</h4>
          <p>Get a match percentage and see which preferences are compatible and where they differ.</p>
        </div>
        <div className="why-card">
          <div className="why-icon blue"><Bot size={22}/></div>
          <h3>Meet Gemma</h3>
          <h4 style={{ fontWeight: 500, margin: '8px 0 4px', color: '#555' }}>Your compatibility assistant</h4>
          <p>Gemma explains why a home or roommate is a good match based on your preferences.</p>
        </div>
      </div>
    </section>

    <section className="how-section">
      <h2>How it works</h2>
      <div className="steps-container">
        <div className="step">
          <div className="step-num">01</div>
          <h3>Set your preferences</h3>
          <p>Choose your location, budget, room type and roommate preference.</p>
        </div>
        <div className="step">
          <div className="step-num">02</div>
          <h3>Tell us your lifestyle</h3>
          <p>Sleep, smoking, guests, pets, cleanliness and social preferences.</p>
        </div>
        <div className="step">
          <div className="step-num">03</div>
          <h3>Discover compatible homes</h3>
          <p>See flats, PGs and private rooms with your compatibility percentage.</p>
        </div>
        <div className="step">
          <div className="step-num">04</div>
          <h3>Understand your match</h3>
          <p>Gemma explains why the home and roommate match your lifestyle.</p>
        </div>
        <div className="step">
          <div className="step-num">05</div>
          <h3>Connect</h3>
          <p>Save the home or contact your potential roommate.</p>
        </div>
      </div>
    </section>
    <section className="match-section">
      <div className="match-content">
        <h2>Find your perfect match</h2>
        <p>Our compatibility engine compares your lifestyle preferences with potential roommates to ensure a harmonious living experience.</p>
        <button className="search-btn" onClick={()=>navigate("/preferences")}>Check compatibility</button>
      </div>
      <div className="match-card">
        <div className="match-columns">
          <div className="match-col">
            <div className="col-header">YOU</div>
            <div className="match-item"><span>Sleep:</span> Flexible</div>
            <div className="match-item"><span>Smoking:</span> No</div>
            <div className="match-item"><span>Guests:</span> Occasional</div>
            <div className="match-item"><span>Pets:</span> Allowed</div>
            <div className="match-item"><span>Social:</span> Balanced</div>
          </div>
          <div className="match-divider"></div>
          <div className="match-col">
            <div className="col-header">ROOMMATE</div>
            <div className="match-item"><span>Sleep:</span> Flexible <span className="check">✓</span></div>
            <div className="match-item"><span>Smoking:</span> No <span className="check">✓</span></div>
            <div className="match-item"><span>Guests:</span> Occasional <span className="check">✓</span></div>
            <div className="match-item"><span>Pets:</span> Allowed <span className="check">✓</span></div>
            <div className="match-item"><span>Social:</span> Balanced <span className="check">✓</span></div>
          </div>
        </div>
        <div className="match-score">
          <div className="score-circle">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle" strokeDasharray="92, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <text x="18" y="20.35" className="percentage">92%</text>
            </svg>
          </div>
          <div className="score-label">Lifestyle Match</div>
        </div>
      </div>
    </section>

    <section className="gemma-section">
      <div className="gemma-container">
        <div className="gemma-header">
          <h2>Meet Gemma <Sparkles size={24} style={{color: "var(--purple)"}}/></h2>
          <p>Your AI compatibility assistant</p>
        </div>
        <div className="gemma-chat-window">
          <div className="gemma-user-msg">
            "Why is this a 92% match?"
          </div>
          <div className="gemma-bot-msg">
            <div className="gemma-avatar"><Bot size={16}/> Gemma</div>
            <p>Your lifestyle preferences are highly compatible. You both prefer flexible sleep schedules, don't smoke, allow occasional guests and prefer a balanced social environment.</p>
          </div>
          <button className="gemma-btn" onClick={() => setIsGemmaOpen(true)}>Ask Gemma</button>
        </div>
      </div>
    </section>

    <section className="community-section">
       <div className="comm-art">
          <img src="/community_illustration.jpg" alt="Community" />
       </div>
       <div className="comm-stats">
          <h2>Join a growing community</h2>
          <div className="stats-grid">
             <div><h3>5,000+</h3><p>Happy Roommates</p></div>
             <div><h3>1,200+</h3><p>Verified Flats</p></div>
             <div><h3>10+</h3><p>Cities</p></div>
             <div><h3>100%</h3><p>Inclusive Community</p></div>
          </div>
       </div>
       <div className="handwriting hw-2">Different<br/>lives<br/>One community<br/>♥</div>
    </section>

    <section className="cta-section">
      <div className="cta-banner">
        <div className="cta-content">
          <h2>Find your place. Find your people.</h2>
          <p>Tell us what matters to you and discover homes and roommates that fit your lifestyle.</p>
          <button className="cta-btn" onClick={() => navigate("/preferences")}>
            Find my match <ArrowRight size={18}/>
          </button>
        </div>
      </div>
    </section>

    {isGemmaOpen && (
      <div className="gemma-modal-overlay" onClick={() => setIsGemmaOpen(false)}>
        <div className="gemma-modal" onClick={e => e.stopPropagation()}>
          <div className="gemma-modal-header">
            <div className="gm-head-title">
              <Sparkles size={18} color="var(--purple)"/>
              <div>
                <strong>Gemma</strong>
                <span>AI Compatibility Assistant</span>
              </div>
            </div>
            <button className="gm-close" onClick={() => setIsGemmaOpen(false)}><X size={20}/></button>
          </div>
          <div className="gemma-modal-body">
            {messages.map((msg, i) => (
              msg.sender === "user" ? (
                <div key={i} className="gm-msg gm-user">{msg.text}</div>
              ) : (
                <div key={i} className="gm-msg gm-bot">
                  <div className="gm-avatar"><Bot size={14}/> Gemma</div>
                  <p>{msg.text}</p>
                </div>
              )
            ))}
            {isTyping && (
              <div className="gm-msg gm-bot">
                <div className="gm-avatar"><Bot size={14}/> Gemma</div>
                <p>...</p>
              </div>
            )}
          </div>
          <div className="gemma-modal-footer">
            <input type="text" placeholder="Ask Gemma anything..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAskGemma()} />
            <button className="gm-send" onClick={handleAskGemma} disabled={isTyping}><Send size={18}/></button>
          </div>
        </div>
      </div>
    )}
  </Layout>
}

export default Home;