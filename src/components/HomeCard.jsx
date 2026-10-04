import React from "react";
import { Heart, ChevronRight } from "lucide-react";

function HomeCard({ h, saved, onSave, onOpen }) {
    return <article className="home-card"><div className="card-img"><img src={h.img} /><button onClick={onSave} className="heart">{saved ? <Heart fill="#e43d76" /> : <Heart />}</button></div><div className="card-body"><h3>{h.title}</h3><b className="price">₹{h.price.toLocaleString()}/month</b><small>{h.area}, {h.city}</small><div className="tags"><span>{h.sharing} sharing</span><span>{h.roommates} roommate</span></div><div className="tags muted">{h.tags.slice(0, 2).map(t => <span key={t}>{t}</span>)}</div><div className="match"><span>● {h.match}% match</span><button onClick={onOpen}>View details <ChevronRight size={14} /></button></div></div></article>
}

export default HomeCard;