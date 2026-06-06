import { useState, useEffect } from "react";

// ─── DATA ─────────────────────────────────────────────────────────
const listings = [
  { id:1,  title:"Mid-Century Walnut Sofa",          price:340, location:"Atlanta, GA",         distance:"1.2 mi", distanceMi:1.2, condition:"Good",     category:"Sofas",   daysAgo:1, seller:"Maya R.",  sellerRating:4.9, sold:false, img:"sofa",   brand:"Article",       colors:["Brown","Walnut"],        tags:["Mid-Century","Walnut","3-Seat"],   weight:"heavy",  dims:'84"W × 34"D × 33"H', widthIn:84, depthIn:34, heightIn:33 },
  { id:2,  title:"IKEA KALLAX Shelf Unit",            price:55,  location:"Decatur, GA",         distance:"3.1 mi", distanceMi:3.1, condition:"Like New", category:"Storage", daysAgo:2, seller:"Tom B.",   sellerRating:4.7, sold:false, img:"shelf",  brand:"IKEA",          colors:["White"],                 tags:["IKEA","White","Bookcase"],         weight:"medium", dims:'57"W × 15"D × 57"H', widthIn:57, depthIn:15, heightIn:57 },
  { id:3,  title:"Marble-Top Dining Table",           price:480, location:"Buckhead, GA",        distance:"4.5 mi", distanceMi:4.5, condition:"Like New", category:"Tables",  daysAgo:0, seller:"Ines L.", sellerRating:5.0, sold:false, img:"table",  brand:"CB2",           colors:["White","Gray","Marble"], tags:["Marble","6-Seat","White"],         weight:"heavy",  dims:'72"W × 36"D × 30"H', widthIn:72, depthIn:36, heightIn:30 },
  { id:4,  title:"Herman Miller Aeron Chair",         price:620, location:"Midtown, GA",         distance:"2.0 mi", distanceMi:2.0, condition:"Good",     category:"Chairs",  daysAgo:3, seller:"Derek N.",sellerRating:4.8, sold:false, img:"chair",  brand:"Herman Miller", colors:["Black"],                 tags:["Ergonomic","Black","Office"],      weight:"light",  dims:'27"W × 16"D × 42"H', widthIn:27, depthIn:16, heightIn:42 },
  { id:5,  title:"King Bed Frame — Oak",               price:295, location:"Sandy Springs, GA",  distance:"6.3 mi", distanceMi:6.3, condition:"Fair",     category:"Beds",    daysAgo:5, seller:"Priya S.",sellerRating:4.6, sold:true,  img:"bed",    brand:"West Elm",      colors:["Brown","Oak","Natural"], tags:["King","Oak","Wood"],               weight:"heavy",  dims:'80"W × 76"D × 48"H', widthIn:80, depthIn:76, heightIn:48 },
  { id:6,  title:"Rattan Accent Chair",               price:125, location:"East Atlanta, GA",    distance:"2.8 mi", distanceMi:2.8, condition:"Like New", category:"Chairs",  daysAgo:1, seller:"Clara W.",sellerRating:4.9, sold:false, img:"rattan", brand:"World Market",  colors:["Brown","Natural","Tan"], tags:["Boho","Rattan","Natural"],         weight:"light",  dims:'30"W × 28"D × 36"H', widthIn:30, depthIn:28, heightIn:36 },
  { id:7,  title:"IKEA EKTORP Loveseat",              price:180, location:"Smyrna, GA",          distance:"5.1 mi", distanceMi:5.1, condition:"Good",     category:"Sofas",   daysAgo:4, seller:"Leon P.", sellerRating:4.5, sold:false, img:"sofa",   brand:"IKEA",          colors:["Gray","Beige"],          tags:["IKEA","Loveseat","Washable"],      weight:"heavy",  dims:'67"W × 34"D × 32"H', widthIn:67, depthIn:34, heightIn:32 },
  { id:8,  title:"RH Nightstand — Brushed Silver",    price:210, location:"Marietta, GA",        distance:"7.2 mi", distanceMi:7.2, condition:"Like New", category:"Storage", daysAgo:1, seller:"Ann T.",  sellerRating:5.0, sold:false, img:"shelf",  brand:"RH",            colors:["Gray","Silver"],         tags:["RH","Nightstand","Metal"],         weight:"medium", dims:'22"W × 18"D × 28"H', widthIn:22, depthIn:18, heightIn:28 },
  { id:9,  title:"West Elm Coffee Table — Walnut",    price:320, location:"Druid Hills, GA",     distance:"3.8 mi", distanceMi:3.8, condition:"Good",     category:"Tables",  daysAgo:2, seller:"Raj S.",  sellerRating:4.8, sold:false, img:"table",  brand:"West Elm",      colors:["Walnut","Brown"],        tags:["Mid-Century","Walnut","Coffee"],   weight:"medium", dims:'46"W × 24"D × 16"H', widthIn:46, depthIn:24, heightIn:16 },
  { id:10, title:"Steelcase Leap Office Chair",       price:490, location:"Brookhaven, GA",      distance:"4.0 mi", distanceMi:4.0, condition:"Good",     category:"Chairs",  daysAgo:6, seller:"Mia F.", sellerRating:4.7, sold:false, img:"chair",  brand:"Steelcase",     colors:["Black","Gray"],          tags:["Ergonomic","Office","Adjustable"], weight:"light",  dims:'25"W × 22"D × 44"H', widthIn:25, depthIn:22, heightIn:44 },
  { id:11, title:"Pottery Barn Queen Bed Frame",      price:550, location:"Virginia-Highland, GA",distance:"2.5 mi", distanceMi:2.5, condition:"Like New", category:"Beds",    daysAgo:0, seller:"Sara K.",sellerRating:4.9, sold:false, img:"bed",    brand:"Pottery Barn",  colors:["White","Cream"],         tags:["Queen","Upholstered","White"],     weight:"heavy",  dims:'65"W × 86"D × 55"H', widthIn:65, depthIn:86, heightIn:55 },
  { id:12, title:"CB2 Rouka Bookcase — Black",        price:390, location:"Grant Park, GA",      distance:"1.8 mi", distanceMi:1.8, condition:"Like New", category:"Storage", daysAgo:1, seller:"Owen J.",sellerRating:4.6, sold:false, img:"shelf",  brand:"CB2",           colors:["Black"],                 tags:["CB2","Modern","Bookcase"],         weight:"medium", dims:'36"W × 13"D × 72"H', widthIn:36, depthIn:13, heightIn:72 },
];

// ─── FILTER HELPERS ───────────────────────────────────────────────
const ALL_BRANDS  = [...new Set(listings.map(l=>l.brand))].sort();
const ALL_COLORS  = [...new Set(listings.flatMap(l=>l.colors))].sort();
const COLOR_SWATCHES = {
  "Black":"#1A1A1A","White":"#F5F5F0","Gray":"#9E9E9E","Brown":"#6D4C41",
  "Walnut":"#7B5E3A","Oak":"#C49A6C","Natural":"#D4B483","Tan":"#D2B48C",
  "Beige":"#D8C8A8","Cream":"#FFF8E7","Marble":"#E8E0D8","Silver":"#C0C0C0",
};
const DEFAULT_FILTERS = { priceMin:"", priceMax:"", colors:[], brands:[], widthMax:"", heightMax:"", sort:"newest" };

const transportProviders = [
  { id:"uhaul",      name:"U-Haul",               tagline:"Rent a truck & do it yourself",       icon:"🚚", color:"#E8A020", darkColor:"#B07010", bgColor:"#FFF8E6",
    url:"https://www.uhaul.com/Trucks/",
    bookingUrl:"https://www.uhaul.com/Trucks/",
    options:[{size:"Cargo Van",basePrice:29,perMile:0.99,capacity:"1–2 items"},{size:"10' Truck",basePrice:49,perMile:0.99,capacity:"Studio/1-bed"},{size:"15' Truck",basePrice:69,perMile:0.99,capacity:"Up to 2 beds"},{size:"20' Truck",basePrice:89,perMile:0.99,capacity:"Up to 3 beds"}],
    perks:["Pads & dollies","One-way rentals","24/7 roadside"], cta:"Reserve a Truck" },
  { id:"twomen",     name:"Two Men and a Truck",   tagline:"Full-service professional movers",    icon:"👷", color:"#C0392B", darkColor:"#922B21", bgColor:"#FEF0EF",
    url:"https://www.twomenandatruck.com/",
    bookingUrl:"https://www.twomenandatruck.com/moving-estimate",
    options:[{size:"2 Movers",basePrice:150,perMile:2.5,capacity:"Studio/1-bed"},{size:"3 Movers",basePrice:200,perMile:3.0,capacity:"2–3 beds"},{size:"4 Movers",basePrice:300,perMile:4.5,capacity:"Large home"}],
    perks:["Licensed & insured","Furniture wrapped","No hidden fees"], cta:"Get a Free Quote" },
  { id:"taskrabbit", name:"TaskRabbit",            tagline:"Local helpers for pickup & assembly", icon:"🐰", color:"#3BAA6E", darkColor:"#2E8756", bgColor:"#EBF8F1",
    url:"https://www.taskrabbit.com/services/furniture-moving",
    bookingUrl:"https://www.taskrabbit.com/services/furniture-moving",
    options:[{size:"1 Helper",basePrice:35,perMile:0,capacity:"Single item"},{size:"2 Helpers",basePrice:65,perMile:0,capacity:"Multiple pieces"},{size:"2 Helpers + Van",basePrice:95,perMile:1.5,capacity:"Full room"}],
    perks:["Background-checked","Same-day available","Assembly included"], cta:"Book a Tasker" },
  { id:"lugg",       name:"Lugg",                  tagline:"On-demand furniture delivery app",    icon:"📦", color:"#5B4CF5", darkColor:"#3D2FCC", bgColor:"#F0EFFE",
    url:"https://www.lugg.com/",
    bookingUrl:"https://www.lugg.com/book",
    options:[{size:"Lugg Small",basePrice:29,perMile:1.2,capacity:"1–2 items"},{size:"Lugg Medium",basePrice:59,perMile:1.5,capacity:"3–5 items"},{size:"Lugg Large",basePrice:99,perMile:2.0,capacity:"Full room"}],
    perks:["Flat-rate pricing","GPS tracking","Within 2 hrs"], cta:"Book on Lugg" },
];

// ─── ILLUSTRATIONS ────────────────────────────────────────────────
const FurnitureIllustration = ({ type, sold, small }) => {
  const palettes = { sofa:{bg:"#E8DDD0",accent:"#8B6F5C",dark:"#5C4A3A"}, shelf:{bg:"#D8E8D8",accent:"#5C7A5C",dark:"#3A5C3A"}, table:{bg:"#E0E8F0",accent:"#4A6A8A",dark:"#2A4A6A"}, chair:{bg:"#E8E0D8",accent:"#7A6A5A",dark:"#4A3A2A"}, bed:{bg:"#F0E8E0",accent:"#8A5A4A",dark:"#5A3A2A"}, rattan:{bg:"#F0ECD8",accent:"#8A7A4A",dark:"#5A4A2A"} };
  const p = palettes[type]||palettes.sofa;
  const shapes = {
    sofa:(<svg viewBox="0 0 200 120" style={{width:"100%",height:"100%"}}><rect x="10" y="60" width="180" height="50" rx="8" fill={p.dark}/><rect x="20" y="40" width="160" height="40" rx="8" fill={p.accent}/><rect x="10" y="40" width="30" height="70" rx="6" fill={p.dark}/><rect x="160" y="40" width="30" height="70" rx="6" fill={p.dark}/><rect x="30" y="55" width="55" height="35" rx="4" fill={p.accent} opacity="0.8"/><rect x="95" y="55" width="55" height="35" rx="4" fill={p.accent} opacity="0.8"/></svg>),
    shelf:(<svg viewBox="0 0 200 120" style={{width:"100%",height:"100%"}}><rect x="30" y="10" width="140" height="100" rx="4" fill={p.accent}/><rect x="30" y="10" width="140" height="8" rx="2" fill={p.dark}/><rect x="30" y="47" width="140" height="8" rx="2" fill={p.dark}/><rect x="30" y="84" width="140" height="8" rx="2" fill={p.dark}/><rect x="40" y="20" width="18" height="24" rx="2" fill={p.dark} opacity="0.6"/><rect x="80" y="18" width="20" height="26" rx="2" fill={p.dark} opacity="0.7"/></svg>),
    table:(<svg viewBox="0 0 200 120" style={{width:"100%",height:"100%"}}><rect x="20" y="45" width="160" height="16" rx="6" fill={p.accent}/><rect x="20" y="45" width="160" height="8" rx="4" fill={p.dark}/><rect x="35" y="61" width="14" height="45" rx="4" fill={p.dark}/><rect x="151" y="61" width="14" height="45" rx="4" fill={p.dark}/></svg>),
    chair:(<svg viewBox="0 0 200 120" style={{width:"100%",height:"100%"}}><rect x="50" y="15" width="100" height="65" rx="8" fill={p.dark}/><rect x="60" y="20" width="80" height="55" rx="6" fill={p.accent}/><rect x="45" y="75" width="110" height="16" rx="6" fill={p.dark}/><rect x="60" y="91" width="16" height="24" rx="4" fill={p.dark}/><rect x="124" y="91" width="16" height="24" rx="4" fill={p.dark}/></svg>),
    bed:(<svg viewBox="0 0 200 120" style={{width:"100%",height:"100%"}}><rect x="20" y="60" width="160" height="45" rx="6" fill={p.dark}/><rect x="20" y="68" width="160" height="37" rx="4" fill={p.accent}/><rect x="20" y="20" width="35" height="60" rx="4" fill={p.dark}/><rect x="145" y="20" width="35" height="60" rx="4" fill={p.dark}/><rect x="30" y="68" width="65" height="35" rx="4" fill={p.accent} opacity="0.7"/><rect x="105" y="68" width="65" height="35" rx="4" fill={p.accent} opacity="0.7"/></svg>),
    rattan:(<svg viewBox="0 0 200 120" style={{width:"100%",height:"100%"}}><ellipse cx="100" cy="55" rx="60" ry="55" fill={p.accent}/><ellipse cx="100" cy="50" rx="50" ry="45" fill={p.bg}/><ellipse cx="100" cy="50" rx="40" ry="35" fill={p.accent} opacity="0.5"/><ellipse cx="100" cy="55" rx="50" ry="18" fill={p.dark}/><rect x="80" y="95" width="14" height="18" rx="3" fill={p.dark}/><rect x="106" y="95" width="14" height="18" rx="3" fill={p.dark}/></svg>),
  };
  return (
    <div style={{background:p.bg,width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:small?"4px":"12px",position:"relative"}}>
      {shapes[type]||shapes.sofa}
      {sold&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{background:"#E05C3A",color:"white",fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:11,letterSpacing:2,padding:"3px 10px",borderRadius:3,transform:"rotate(-12deg)",display:"block"}}>SOLD</span></div>}
    </div>
  );
};

const conditionColor = {"Like New":"#4CAF8A","Good":"#E8A84A","Fair":"#C46A3A"};

// ─── ONBOARDING FLOW ──────────────────────────────────────────────
const OnboardingFlow = ({ onComplete }) => {
  const [step, setStep] = useState(0); // 0=splash, 1=name, 2=email/pass, 3=phone, 4=location, 5=legal, 6=success
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", password:"", phone:"", zip:"", locationPerm:null, tos:false, privacy:false, marketing:false });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [legalModal, setLegalModal] = useState(null); // "tos"|"privacy"|"returns"
  const [verifyCode, setVerifyCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const validate = () => {
    const e = {};
    if (step===1) { if(!form.firstName.trim()) e.firstName="First name required"; if(!form.lastName.trim()) e.lastName="Last name required"; }
    if (step===2) { if(!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email="Valid email required"; if(form.password.length<8) e.password="Min 8 characters"; }
    if (step===3 && !codeSent) { if(!form.phone.match(/^\d{10}$/)) e.phone="10-digit number required"; }
    if (step===4 && !form.zip && form.locationPerm===false) { if(!form.zip.match(/^\d{5}$/)) e.zip="5-digit ZIP required"; }
    if (step===5) { if(!form.tos) e.tos="You must accept the Terms of Service"; if(!form.privacy) e.privacy="You must accept the Privacy Policy"; }
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const next = () => { if(validate()) setStep(s=>s+1); };

  const inputStyle = (err) => ({ width:"100%", border:`1.5px solid ${err?"#C46A3A":"#DDD0C8"}`, borderRadius:12, padding:"13px 16px", fontFamily:"sans-serif", fontSize:15, color:"#2C1810", background:"white", outline:"none", boxSizing:"border-box", transition:"border-color 0.15s" });

  const LegalModal = ({ doc, onClose }) => {
    const content = {
      tos: { title:"Terms of Service", icon:"📋", sections:[
        {h:"1. Acceptance", p:"By using furnish., you agree to these Terms. You must be 18+ to use the Platform."},
        {h:"2. Your Account", p:"You are responsible for keeping your login secure and for all activity under your account. Provide accurate information at all times."},
        {h:"3. Transactions", p:"furnish. connects buyers and sellers. All sales are peer-to-peer. furnish. charges an 8% seller fee and 3% buyer service fee. Funds are held in escrow until pickup is confirmed."},
        {h:"4. Prohibited Conduct", p:"You may not list stolen items, harass other users, take transactions off-Platform, or misrepresent items. Violations may result in immediate account termination."},
        {h:"5. Returns", p:"All sales are final. Disputes for item-not-as-described must be raised within 48 hours of pickup. See our full Return & Dispute Policy for details."},
        {h:"6. Transport Services", p:"furnish. is not liable for loss or damage during third-party transport. Use U-Haul, Two Men and a Truck, and other providers at your own risk."},
        {h:"7. Limitation of Liability", p:"furnish. is not liable for indirect or consequential damages. Our total liability is capped at the greater of your payments in the prior 12 months or $100."},
        {h:"8. Governing Law", p:"These Terms are governed by Delaware law. Disputes resolved through individual binding arbitration. Class actions are waived."},
      ]},
      privacy: { title:"Privacy Policy", icon:"🔒", sections:[
        {h:"What We Collect", p:"Name, email, phone number (for verification), location (zip code or GPS with permission), payment information (processed by Stripe), and listing content."},
        {h:"How We Use It", p:"To operate your account, process transactions, show nearby listings, send notifications, prevent fraud, and improve the Platform."},
        {h:"Location Data", p:"We only use location to show nearby listings. Sellers never see your exact GPS coordinates. You can use a zip code instead of GPS."},
        {h:"Sharing", p:"We share your public profile with other users. We do NOT sell your personal data. We share with payment processors and law enforcement when legally required."},
        {h:"Your Rights", p:"You can access, correct, or delete your data at any time in Account Settings. California (CCPA) and European (GDPR) users have additional rights."},
        {h:"Security", p:"AES-256 encryption at rest, TLS in transit, hashed passwords, 2FA available. No security system is 100% guaranteed."},
        {h:"Children", p:"furnish. is not for users under 18. We do not knowingly collect data from minors."},
        {h:"Contact", p:"Privacy questions: privacy@furnish.app"},
      ]},
      returns: { title:"Return & Dispute Policy", icon:"🔄", sections:[
        {h:"All Sales Are Final", p:"Because items are secondhand and peer-to-peer, all sales are final with limited exceptions."},
        {h:"Eligible Disputes (within 48 hrs)", p:"Item materially different from description, undisclosed major damage, item not received (seller no-show), or wrong item received."},
        {h:"NOT Covered", p:"Change of mind, damage during transport, normal wear on disclosed condition, disputes after 48 hours, or AS-IS items."},
        {h:"How to Dispute", p:"Go to: Profile > Purchase History > Order > Report a Problem. Upload photos and describe the issue. We review in 1–3 business days."},
        {h:"Transport Disclaimer", p:"furnish. is NOT responsible for items damaged during U-Haul, mover, or any other transport. Always photograph items before loading."},
        {h:"Refunds", p:"Approved refunds process in 3–5 business days. Platform fees are non-refundable."},
      ]},
    };
    const c = content[doc];
    return (
      <div style={{position:"fixed",inset:0,background:"rgba(20,10,5,0.7)",zIndex:2000,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(4px)"}} onClick={onClose}>
        <div style={{background:"#FDFAF7",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:520,maxHeight:"80vh",overflow:"hidden",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
          <div style={{background:"#8B4513",padding:"18px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:22}}>{c.icon}</span>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"white"}}>{c.title}</div>
            </div>
            <button onClick={onClose} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:"50%",width:32,height:32,color:"white",cursor:"pointer",fontSize:18}}>×</button>
          </div>
          <div style={{overflowY:"auto",padding:"20px 24px 32px",flex:1}}>
            {c.sections.map((s,i)=>(
              <div key={i} style={{marginBottom:18}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#2C1810",marginBottom:5}}>{s.h}</div>
                <div style={{fontFamily:"sans-serif",fontSize:13,color:"#6B4C3A",lineHeight:1.6}}>{s.p}</div>
              </div>
            ))}
            <div style={{background:"#F5EDE4",borderRadius:12,padding:"12px 16px",marginTop:8,textAlign:"center"}}>
              <div style={{fontFamily:"sans-serif",fontSize:12,color:"#8A6A5A"}}>This is a summary. The full document is available at furnish.app/legal</div>
            </div>
          </div>
          <div style={{padding:"14px 24px 24px",flexShrink:0,borderTop:"1px solid #EDE8E0"}}>
            <button onClick={onClose} style={{width:"100%",background:"#8B4513",color:"white",border:"none",borderRadius:12,padding:14,fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:"pointer"}}>Got It</button>
          </div>
        </div>
      </div>
    );
  };

  // Step renders
  const steps = [
    // 0 — Splash
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:"40px 32px",background:"linear-gradient(160deg, #2C1810 0%, #5C3A20 50%, #8B4513 100%)"}}>
      <div style={{marginBottom:48,textAlign:"center"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:64,fontWeight:900,color:"white",lineHeight:1,letterSpacing:-2}}>
          furnish<span style={{color:"#D4A882"}}>.</span>
        </div>
        <div style={{color:"rgba(255,255,255,0.65)",fontSize:16,fontFamily:"sans-serif",marginTop:8,letterSpacing:0.5}}>Buy & sell furniture near you</div>
      </div>
      <div style={{width:"100%",maxWidth:340}}>
        <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:32}}>
          {[["🛋️","List your furniture in 60 seconds"],["📍","Find pieces within miles of you"],["🚚","Book movers right in the app"],["🔒","Secure payments & buyer protection"]].map(([icon,text])=>(
            <div key={text} style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:36,height:36,background:"rgba(255,255,255,0.12)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{icon}</div>
              <div style={{color:"rgba(255,255,255,0.85)",fontSize:14,fontFamily:"sans-serif"}}>{text}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>setStep(1)} style={{width:"100%",background:"white",color:"#8B4513",border:"none",borderRadius:16,padding:"16px",fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:900,cursor:"pointer",boxShadow:"0 8px 24px rgba(0,0,0,0.25)",marginBottom:12}}>
          Create Free Account
        </button>
        <button onClick={onComplete} style={{width:"100%",background:"rgba(255,255,255,0.12)",color:"white",border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:16,padding:"14px",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:600,cursor:"pointer"}}>
          Sign In
        </button>
        <div style={{textAlign:"center",marginTop:20,color:"rgba(255,255,255,0.4)",fontSize:11,fontFamily:"sans-serif",lineHeight:1.5}}>
          By continuing you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>,

    // 1 — Name
    <div style={{minHeight:"100vh",background:"#FDFAF7",padding:"60px 28px 40px"}}>
      <div style={{maxWidth:380,margin:"0 auto"}}>
        <StepIndicator current={1} total={5}/>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:900,color:"#2C1810",marginBottom:8}}>What's your name?</div>
        <div style={{fontFamily:"sans-serif",fontSize:14,color:"#A08070",marginBottom:32}}>This is how you'll appear to buyers and sellers.</div>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div>
            <div style={{fontSize:11,fontFamily:"sans-serif",fontWeight:700,color:"#8A6A5A",textTransform:"uppercase",marginBottom:6}}>First Name</div>
            <input value={form.firstName} onChange={e=>set("firstName",e.target.value)} placeholder="e.g. Jordan" style={inputStyle(errors.firstName)}/>
            {errors.firstName&&<div style={{color:"#C46A3A",fontSize:12,marginTop:4,fontFamily:"sans-serif"}}>{errors.firstName}</div>}
          </div>
          <div>
            <div style={{fontSize:11,fontFamily:"sans-serif",fontWeight:700,color:"#8A6A5A",textTransform:"uppercase",marginBottom:6}}>Last Name</div>
            <input value={form.lastName} onChange={e=>set("lastName",e.target.value)} placeholder="e.g. Smith" style={inputStyle(errors.lastName)}/>
            {errors.lastName&&<div style={{color:"#C46A3A",fontSize:12,marginTop:4,fontFamily:"sans-serif"}}>{errors.lastName}</div>}
          </div>
        </div>
        <NavButtons onNext={next} onBack={()=>setStep(0)} nextLabel="Continue →"/>
      </div>
    </div>,

    // 2 — Email & Password
    <div style={{minHeight:"100vh",background:"#FDFAF7",padding:"60px 28px 40px"}}>
      <div style={{maxWidth:380,margin:"0 auto"}}>
        <StepIndicator current={2} total={5}/>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:900,color:"#2C1810",marginBottom:8}}>Sign-in details</div>
        <div style={{fontFamily:"sans-serif",fontSize:14,color:"#A08070",marginBottom:32}}>Your email is kept private and only used for account notifications.</div>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div>
            <div style={{fontSize:11,fontFamily:"sans-serif",fontWeight:700,color:"#8A6A5A",textTransform:"uppercase",marginBottom:6}}>Email Address</div>
            <input type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="you@example.com" style={inputStyle(errors.email)}/>
            {errors.email&&<div style={{color:"#C46A3A",fontSize:12,marginTop:4,fontFamily:"sans-serif"}}>{errors.email}</div>}
          </div>
          <div>
            <div style={{fontSize:11,fontFamily:"sans-serif",fontWeight:700,color:"#8A6A5A",textTransform:"uppercase",marginBottom:6}}>Password</div>
            <div style={{position:"relative"}}>
              <input type={showPass?"text":"password"} value={form.password} onChange={e=>set("password",e.target.value)} placeholder="Min 8 characters" style={{...inputStyle(errors.password),paddingRight:48}}/>
              <button onClick={()=>setShowPass(!showPass)} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:18,color:"#A08070"}}>
                {showPass?"🙈":"👁️"}
              </button>
            </div>
            {errors.password&&<div style={{color:"#C46A3A",fontSize:12,marginTop:4,fontFamily:"sans-serif"}}>{errors.password}</div>}
            {form.password.length>0&&<div style={{marginTop:8,display:"flex",gap:6}}>
              {["length","upper","number"].map(c=>{
                const ok = c==="length"?form.password.length>=8:c==="upper"?/[A-Z]/.test(form.password):/\d/.test(form.password);
                const label = c==="length"?"8+ chars":c==="upper"?"Uppercase":"Number";
                return <div key={c} style={{flex:1,background:ok?"#E8F5EC":"#F5EDE4",borderRadius:6,padding:"4px 0",textAlign:"center",fontSize:10,fontFamily:"sans-serif",color:ok?"#3A7A54":"#A08070",fontWeight:600}}>{ok?"✓":""} {label}</div>;
              })}
            </div>}
          </div>
        </div>
        <NavButtons onNext={next} onBack={()=>setStep(1)} nextLabel="Continue →"/>
      </div>
    </div>,

    // 3 — Phone verification
    <div style={{minHeight:"100vh",background:"#FDFAF7",padding:"60px 28px 40px"}}>
      <div style={{maxWidth:380,margin:"0 auto"}}>
        <StepIndicator current={3} total={5}/>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:900,color:"#2C1810",marginBottom:8}}>Verify your phone</div>
        <div style={{fontFamily:"sans-serif",fontSize:14,color:"#A08070",marginBottom:24}}>A verified phone number builds buyer and seller trust and helps protect your account.</div>
        <div style={{background:"#F5EDE4",borderRadius:14,padding:"14px 16px",marginBottom:24,display:"flex",gap:10,alignItems:"flex-start"}}>
          <span style={{fontSize:20,flexShrink:0}}>🔒</span>
          <div style={{fontFamily:"sans-serif",fontSize:13,color:"#6B4C3A",lineHeight:1.5}}>Your phone number is never shown publicly. It's used only for SMS verification and fraud prevention.</div>
        </div>
        {!codeSent ? (
          <div>
            <div style={{fontSize:11,fontFamily:"sans-serif",fontWeight:700,color:"#8A6A5A",textTransform:"uppercase",marginBottom:6}}>Mobile Number (US)</div>
            <div style={{display:"flex",gap:10}}>
              <div style={{background:"#F5EDE4",borderRadius:12,padding:"13px 14px",fontFamily:"sans-serif",fontSize:15,color:"#6B4C3A",fontWeight:600,flexShrink:0}}>+1</div>
              <input value={form.phone} onChange={e=>set("phone",e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="(404) 555-0100" style={{...inputStyle(errors.phone),flex:1}}/>
            </div>
            {errors.phone&&<div style={{color:"#C46A3A",fontSize:12,marginTop:4,fontFamily:"sans-serif"}}>{errors.phone}</div>}
            <button onClick={()=>{if(validate()){setCodeSent(true);setErrors({});}}} style={{width:"100%",background:"#8B4513",color:"white",border:"none",borderRadius:12,padding:14,fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:"pointer",marginTop:20}}>
              Send Verification Code
            </button>
            <div style={{textAlign:"center",marginTop:16}}>
              <span onClick={next} style={{color:"#A08070",fontFamily:"sans-serif",fontSize:13,cursor:"pointer",textDecoration:"underline"}}>Skip for now</span>
            </div>
          </div>
        ) : (
          <div>
            <div style={{background:"#E8F5EC",borderRadius:12,padding:"12px 16px",marginBottom:20,fontFamily:"sans-serif",fontSize:13,color:"#3A7A54"}}>
              ✓ Code sent to +1 {form.phone.replace(/(\d{3})(\d{3})(\d{4})/,"($1) $2-$3")} — for this demo, enter any 6 digits
            </div>
            <div style={{fontSize:11,fontFamily:"sans-serif",fontWeight:700,color:"#8A6A5A",textTransform:"uppercase",marginBottom:6}}>Enter 6-Digit Code</div>
            <input value={verifyCode} onChange={e=>setVerifyCode(e.target.value.replace(/\D/g,"").slice(0,6))} placeholder="123456" maxLength={6} style={{...inputStyle(false),textAlign:"center",fontSize:28,letterSpacing:8,fontFamily:"'Cormorant Garamond',serif"}}/>
            <div style={{textAlign:"center",marginTop:12,fontFamily:"sans-serif",fontSize:13,color:"#A08070"}}>
              Didn't get it? <span onClick={()=>{setCodeSent(false);setVerifyCode("");}} style={{color:"#8B4513",fontWeight:600,cursor:"pointer"}}>Resend</span>
            </div>
            <div style={{marginTop:20,display:"flex",flexDirection:"column",gap:10}}>
              <button onClick={next} disabled={verifyCode.length!==6} style={{width:"100%",background:verifyCode.length===6?"#8B4513":"#DDD0C8",color:"white",border:"none",borderRadius:12,padding:14,fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:verifyCode.length===6?"pointer":"default",transition:"background 0.2s"}}>
                {verifyCode.length===6?"Verify & Continue →":`Enter ${6-verifyCode.length} more digit${6-verifyCode.length===1?"":"s"}`}
              </button>
              <button onClick={next} style={{width:"100%",background:"transparent",color:"#A08070",border:"1px solid #DDD0C8",borderRadius:12,padding:12,fontFamily:"sans-serif",fontSize:13,cursor:"pointer"}}>
                Skip verification
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,

    // 4 — Location
    <div style={{minHeight:"100vh",background:"#FDFAF7",padding:"60px 28px 40px"}}>
      <div style={{maxWidth:380,margin:"0 auto"}}>
        <StepIndicator current={4} total={5}/>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:900,color:"#2C1810",marginBottom:8}}>Find furniture near you</div>
        <div style={{fontFamily:"sans-serif",fontSize:14,color:"#A08070",marginBottom:28}}>Location helps show you listings within driving distance.</div>
        <div style={{background:"#F5EDE4",borderRadius:14,padding:"14px 16px",marginBottom:20,fontFamily:"sans-serif",fontSize:13,color:"#6B4C3A",lineHeight:1.6}}>
          📍 <strong>Your precise location is never shared</strong> with sellers or other users. They only see your general area (city/neighborhood).
        </div>
        {form.locationPerm===null&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <button onClick={()=>set("locationPerm",true)} style={{background:"#8B4513",color:"white",border:"none",borderRadius:14,padding:"16px",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
              <span>📍</span> Allow Location Access
            </button>
            <button onClick={()=>set("locationPerm",false)} style={{background:"#F5EDE4",color:"#8B4513",border:"1.5px solid #D4A882",borderRadius:14,padding:"14px",fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:600,cursor:"pointer"}}>
              Enter ZIP Code Instead
            </button>
          </div>
        )}
        {form.locationPerm===true&&(
          <div>
            <div style={{background:"#E8F5EC",borderRadius:12,padding:"14px 16px",marginBottom:16,textAlign:"center"}}>
              <div style={{fontSize:28}}>📍</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#2C6040",marginTop:6}}>Location Enabled</div>
              <div style={{fontFamily:"sans-serif",fontSize:13,color:"#6A9A7A",marginTop:4}}>Atlanta, GA area detected</div>
            </div>
            <NavButtons onNext={next} onBack={()=>set("locationPerm",null)} nextLabel="Continue →"/>
          </div>
        )}
        {form.locationPerm===false&&(
          <div>
            <div style={{fontSize:11,fontFamily:"sans-serif",fontWeight:700,color:"#8A6A5A",textTransform:"uppercase",marginBottom:6}}>Your ZIP Code</div>
            <input value={form.zip} onChange={e=>set("zip",e.target.value.replace(/\D/,"").slice(0,5))} placeholder="e.g. 30309" maxLength={5} style={inputStyle(errors.zip)}/>
            {errors.zip&&<div style={{color:"#C46A3A",fontSize:12,marginTop:4,fontFamily:"sans-serif"}}>{errors.zip}</div>}
            <NavButtons onNext={next} onBack={()=>set("locationPerm",null)} nextLabel="Continue →"/>
          </div>
        )}
      </div>
    </div>,

    // 5 — Legal agreements
    <div style={{minHeight:"100vh",background:"#FDFAF7",padding:"60px 28px 40px"}}>
      <div style={{maxWidth:380,margin:"0 auto"}}>
        <StepIndicator current={5} total={5}/>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:900,color:"#2C1810",marginBottom:8}}>Almost there!</div>
        <div style={{fontFamily:"sans-serif",fontSize:14,color:"#A08070",marginBottom:28}}>Please review and accept our agreements to continue.</div>

        {[
          { key:"tos", doc:"tos", label:"Terms of Service", sub:"Rules of the platform, fees, liability", required:true, icon:"📋" },
          { key:"privacy", doc:"privacy", label:"Privacy Policy", sub:"How we collect and protect your data", required:true, icon:"🔒" },
          { key:"returns", doc:"returns", label:"Return & Dispute Policy", sub:"Buyer & seller protections", required:false, icon:"🔄", readOnly:true },
          { key:"marketing", doc:null, label:"Marketing Emails", sub:"New features, tips, and local deals (optional)", required:false, icon:"📧" },
        ].map(item=>(
          <div key={item.key} style={{background:"white",borderRadius:14,border:`1.5px solid ${errors[item.key]?"#C46A3A":form[item.key]?"#8B4513":"#EDE8E0"}`,padding:"14px 16px",marginBottom:12,transition:"border-color 0.15s"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div onClick={()=>!item.readOnly&&set(item.key,!form[item.key])} style={{width:24,height:24,borderRadius:6,border:`2px solid ${form[item.key]?"#8B4513":"#DDD0C8"}`,background:form[item.key]?"#8B4513":"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:item.readOnly?"default":"pointer",flexShrink:0,transition:"all 0.15s"}}>
                {form[item.key]&&<span style={{color:"white",fontSize:14,fontWeight:700}}>✓</span>}
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:16}}>{item.icon}</span>
                  <span style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810"}}>{item.label}</span>
                  {item.required&&<span style={{background:"#FEF0EF",color:"#C46A3A",fontSize:10,padding:"1px 6px",borderRadius:8,fontFamily:"sans-serif",fontWeight:700}}>Required</span>}
                </div>
                <div style={{fontFamily:"sans-serif",fontSize:12,color:"#A08070",marginTop:2}}>{item.sub}</div>
              </div>
              {item.doc&&<button onClick={()=>setLegalModal(item.doc)} style={{background:"#F5EDE4",border:"none",borderRadius:8,padding:"6px 12px",fontFamily:"sans-serif",fontSize:12,fontWeight:600,color:"#8B4513",cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>Read</button>}
            </div>
            {errors[item.key]&&<div style={{color:"#C46A3A",fontSize:12,marginTop:8,fontFamily:"sans-serif",paddingLeft:36}}>{errors[item.key]}</div>}
          </div>
        ))}

        <div style={{background:"#F5EDE4",borderRadius:12,padding:"12px 14px",marginBottom:24,fontFamily:"sans-serif",fontSize:12,color:"#8A6A5A",lineHeight:1.6}}>
          By creating an account, you confirm you are <strong>18 years of age or older</strong> and agree to the required documents above.
        </div>
        <NavButtons onNext={next} onBack={()=>setStep(4)} nextLabel="Create My Account →"/>
      </div>
    </div>,

    // 6 — Success
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#2C1810,#5C3A20,#8B4513)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 28px",textAlign:"center"}}>
      <div style={{fontSize:72,marginBottom:20}}>🎉</div>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:34,fontWeight:900,color:"white",marginBottom:8}}>
        Welcome, {form.firstName}!
      </div>
      <div style={{color:"rgba(255,255,255,0.7)",fontSize:16,fontFamily:"sans-serif",marginBottom:40,maxWidth:300}}>
        Your furnish. account is ready. Start browsing furniture near you.
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12,width:"100%",maxWidth:320}}>
        {[["🛋️","Browse listings near you"],["+ Sell","List your first item"],["🚚","Explore moving services"]].map(([icon,label])=>(
          <div key={label} style={{background:"rgba(255,255,255,0.12)",borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:20,width:28,textAlign:"center"}}>{icon}</span>
            <span style={{fontFamily:"sans-serif",fontSize:14,color:"rgba(255,255,255,0.85)"}}>{label}</span>
          </div>
        ))}
      </div>
      <button onClick={onComplete} style={{marginTop:36,background:"white",color:"#8B4513",border:"none",borderRadius:16,padding:"16px 40px",fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:900,cursor:"pointer",boxShadow:"0 8px 24px rgba(0,0,0,0.25)"}}>
        Start Exploring →
      </button>
    </div>,
  ];

  return (
    <div style={{maxWidth:520,margin:"0 auto",position:"relative"}}>
      {legalModal && <LegalModal doc={legalModal} onClose={()=>setLegalModal(null)}/>}
      {steps[step]}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Cormorant+Garamond:wght@400;600;700&display=swap');*{box-sizing:border-box;}`}</style>
    </div>
  );
};

const StepIndicator = ({ current, total }) => (
  <div style={{marginBottom:32}}>
    <div style={{display:"flex",gap:6,marginBottom:8}}>
      {Array.from({length:total},(_,i)=>(
        <div key={i} style={{flex:1,height:4,borderRadius:2,background:i<current?"#8B4513":i===current-1?"#D4A882":"#EDE8E0",transition:"background 0.3s"}}/>
      ))}
    </div>
    <div style={{fontFamily:"sans-serif",fontSize:12,color:"#A08070"}}>Step {current} of {total}</div>
  </div>
);

const NavButtons = ({ onNext, onBack, nextLabel }) => (
  <div style={{display:"flex",gap:12,marginTop:32}}>
    {onBack&&<button onClick={onBack} style={{flex:1,background:"#F5EDE4",color:"#8B4513",border:"none",borderRadius:12,padding:"14px",fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,cursor:"pointer"}}>← Back</button>}
    <button onClick={onNext} style={{flex:2,background:"#8B4513",color:"white",border:"none",borderRadius:12,padding:"14px",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:"pointer"}}>
      {nextLabel||"Continue →"}
    </button>
  </div>
);

// ─── COST ESTIMATOR ───────────────────────────────────────────────
const CostEstimator = ({ defaultDistance=5, defaultItem=null, compact=false }) => {
  const [distance, setDistance] = useState(defaultDistance);
  const [itemSize, setItemSize] = useState(defaultItem?.weight==="light"?"small":defaultItem?.weight==="medium"?"medium":"large");
  const [floors, setFloors] = useState(1);
  const estimates = transportProviders.map(p=>{
    const optIdx = itemSize==="small"?0:itemSize==="medium"?1:2;
    const opt = p.options[Math.min(optIdx,p.options.length-1)];
    const total = Math.round(opt.basePrice + opt.perMile*distance + (floors-1)*15);
    return { provider:p, opt, low:Math.round(total*0.9), high:Math.round(total*1.15), total };
  });
  const cheapest = [...estimates].sort((a,b)=>a.total-b.total)[0];

  if (compact) return (
    <div style={{background:"#F8F3EC",borderRadius:14,padding:"14px 16px",marginTop:12}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:10}}>🧮 Quick Cost Estimate</div>
      <div style={{display:"flex",gap:8,marginBottom:10,alignItems:"center"}}>
        <span style={{fontSize:12,color:"#8A7A6A",fontFamily:"sans-serif",whiteSpace:"nowrap"}}>Distance:</span>
        <input type="range" min={1} max={30} value={distance} onChange={e=>setDistance(Number(e.target.value))} style={{flex:1,accentColor:"#8B4513"}}/>
        <span style={{fontSize:13,fontWeight:700,color:"#8B4513",fontFamily:"sans-serif",minWidth:40}}>{distance} mi</span>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:12}}>
        {["small","medium","large"].map(s=>(<button key={s} onClick={()=>setItemSize(s)} style={{flex:1,background:itemSize===s?"#8B4513":"#F0E8DC",color:itemSize===s?"white":"#6B4C3A",border:"none",borderRadius:8,padding:"6px 4px",fontFamily:"sans-serif",fontSize:11,fontWeight:600,cursor:"pointer",textTransform:"capitalize"}}>{s}</button>))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {estimates.map(e=>(
          <div key={e.provider.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"white",borderRadius:8,padding:"8px 12px",border:`1.5px solid ${e.provider.id===cheapest.provider.id?"#4CAF8A40":"#EDE8E0"}`}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:18}}>{e.provider.icon}</span>
              <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:12,fontWeight:700,color:"#2C1810"}}>{e.provider.name}</div><div style={{fontFamily:"sans-serif",fontSize:10,color:"#A08070"}}>{e.opt.size}</div></div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:e.provider.darkColor}}>${e.low}–${e.high}</div>
              {e.provider.id===cheapest.provider.id&&<div style={{background:"#4CAF8A20",color:"#3A9A6A",fontSize:10,fontFamily:"sans-serif",fontWeight:700,borderRadius:4,padding:"1px 6px"}}>Best Value</div>}
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:8,fontSize:11,color:"#B0A090",fontFamily:"sans-serif",textAlign:"center"}}>Estimates only · Final price may vary</div>
    </div>
  );

  return (
    <div style={{padding:"20px 16px 100px"}}>
      <div style={{background:"linear-gradient(135deg,#2C1810,#5C3A20)",borderRadius:20,padding:"22px 24px",marginBottom:20,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-10,top:-10,fontSize:70,opacity:0.12}}>🧮</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:"white"}}>Cost Estimator</div>
        <div style={{color:"rgba(255,255,255,0.75)",fontSize:13,fontFamily:"sans-serif",marginTop:4}}>Compare all moving costs instantly</div>
      </div>
      <div style={{background:"white",borderRadius:18,padding:"20px",marginBottom:16,border:"1px solid #EDE8E0"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#2C1810",marginBottom:16}}>Configure Your Move</div>
        <div style={{marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <span style={{fontSize:12,fontFamily:"sans-serif",fontWeight:600,color:"#8A6A5A",textTransform:"uppercase"}}>Distance</span>
            <span style={{fontSize:16,fontWeight:700,color:"#8B4513",fontFamily:"'Cormorant Garamond',serif"}}>{distance} miles</span>
          </div>
          <input type="range" min={1} max={50} value={distance} onChange={e=>setDistance(Number(e.target.value))} style={{width:"100%",accentColor:"#8B4513"}}/>
        </div>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:12,fontFamily:"sans-serif",fontWeight:600,color:"#8A6A5A",textTransform:"uppercase",marginBottom:8}}>Item Size / Load</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            {[{id:"small",label:"Small",sub:"Chair, shelf",icon:"🪑"},{id:"medium",label:"Medium",sub:"Table, dresser",icon:"🛋️"},{id:"large",label:"Large",sub:"Sofa, bed",icon:"🛏️"}].map(s=>(
              <button key={s.id} onClick={()=>setItemSize(s.id)} style={{background:itemSize===s.id?"#8B4513":"#F5EDE4",color:itemSize===s.id?"white":"#6B4C3A",border:`2px solid ${itemSize===s.id?"#8B4513":"transparent"}`,borderRadius:12,padding:"10px 4px",cursor:"pointer",textAlign:"center"}}>
                <div style={{fontSize:22}}>{s.icon}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:12,fontWeight:700,marginTop:2}}>{s.label}</div>
                <div style={{fontSize:10,fontFamily:"sans-serif",opacity:0.8}}>{s.sub}</div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{fontSize:12,fontFamily:"sans-serif",fontWeight:600,color:"#8A6A5A",textTransform:"uppercase",marginBottom:8}}>Floors / Stairs</div>
          <div style={{display:"flex",gap:8}}>
            {[1,2,3,4].map(f=>(<button key={f} onClick={()=>setFloors(f)} style={{flex:1,background:floors===f?"#8B4513":"#F5EDE4",color:floors===f?"white":"#6B4C3A",border:"none",borderRadius:10,padding:"10px",fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:16,cursor:"pointer"}}>{f}{f===4?"+ ":""}</button>))}
          </div>
          {floors>1&&<div style={{fontSize:11,color:"#A08070",fontFamily:"sans-serif",marginTop:6}}>+${(floors-1)*15} stair fee added to estimates</div>}
        </div>
      </div>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#2C1810",marginBottom:12}}>Estimated Costs</div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {estimates.sort((a,b)=>a.total-b.total).map((e,idx)=>(
          <div key={e.provider.id} style={{background:"white",borderRadius:16,overflow:"hidden",border:`2px solid ${idx===0?"#4CAF8A":e.provider.color+"30"}`,boxShadow:idx===0?"0 4px 20px rgba(76,175,138,0.15)":"none"}}>
            {idx===0&&<div style={{background:"#4CAF8A",padding:"4px 16px",textAlign:"center"}}><span style={{color:"white",fontSize:11,fontFamily:"sans-serif",fontWeight:700,letterSpacing:1}}>✦ BEST VALUE</span></div>}
            <div style={{padding:"16px 18px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:44,height:44,background:e.provider.bgColor,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{e.provider.icon}</div>
                  <div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#2C1810"}}>{e.provider.name}</div>
                    <div style={{fontSize:12,color:"#A08070",fontFamily:"sans-serif"}}>{e.opt.size} · {e.opt.capacity}</div>
                  </div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:e.provider.darkColor}}>${e.low}–${e.high}</div>
                  <div style={{fontSize:11,color:"#B0A090",fontFamily:"sans-serif"}}>estimated</div>
                </div>
              </div>
              <div style={{marginTop:10,display:"flex",gap:6,flexWrap:"wrap"}}>
                {e.provider.perks.map(pk=>(<span key={pk} style={{fontSize:11,color:"#6B4C3A",fontFamily:"sans-serif",background:"#F0E8DC",padding:"2px 8px",borderRadius:10}}>✓ {pk}</span>))}
              </div>
              <button style={{width:"100%",marginTop:12,background:e.provider.color,color:"white",border:"none",borderRadius:10,padding:"11px",fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,cursor:"pointer"}}>{e.provider.cta}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── BUNDLE & SAVE ────────────────────────────────────────────────
const BundleSave = () => {
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const toggle = id => setSelected(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const savings = selected.length>1?Math.round((selected.length-1)*18):0;
  const splitCost = selected.length>1?Math.round((55+Math.max(...listings.filter(l=>selected.includes(l.id)).map(l=>l.distanceMi),0)*1.2)/selected.length):0;
  return (
    <div style={{background:"white",borderRadius:18,border:"2px dashed #D4A882",overflow:"hidden",marginTop:16}}>
      <div onClick={()=>setOpen(!open)} style={{background:"linear-gradient(135deg,#F5EDE4,#EDD8C4)",padding:"16px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:28}}>💡</span>
        <div style={{flex:1}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:800,color:"#2C1810"}}>Bundle & Save</div>
          <div style={{color:"#8A6A5A",fontSize:13,fontFamily:"sans-serif"}}>Pick up multiple items in one trip & split costs</div>
        </div>
        <span style={{color:"#8B4513",fontSize:20,fontWeight:700}}>{open?"∧":"∨"}</span>
      </div>
      {open&&(
        <div style={{padding:"16px 18px"}}>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
            {listings.filter(l=>!l.sold).map(l=>(
              <div key={l.id} onClick={()=>toggle(l.id)} style={{display:"flex",alignItems:"center",gap:10,background:selected.includes(l.id)?"#FFF3E8":"#F8F3EC",borderRadius:10,padding:"10px 12px",cursor:"pointer",border:`1.5px solid ${selected.includes(l.id)?"#D4A882":"transparent"}`}}>
                <div style={{width:36,height:36,borderRadius:8,overflow:"hidden",flexShrink:0}}><FurnitureIllustration type={l.img} small/></div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:600,color:"#2C1810",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.title}</div>
                  <div style={{fontSize:11,color:"#A08070",fontFamily:"sans-serif"}}>📍 {l.distance} · ${l.price}</div>
                </div>
                <div style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${selected.includes(l.id)?"#8B4513":"#DDD0C8"}`,background:selected.includes(l.id)?"#8B4513":"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {selected.includes(l.id)&&<span style={{color:"white",fontSize:12}}>✓</span>}
                </div>
              </div>
            ))}
          </div>
          {selected.length>1?(
            <div style={{background:"linear-gradient(135deg,#E8F5EC,#D4EDD8)",borderRadius:14,padding:"16px",border:"1.5px solid #4CAF8A40"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#2C6040",marginBottom:10}}>🎉 Bundle Savings</div>
              <div style={{display:"flex",gap:12,marginBottom:10}}>
                {[["Items",selected.length,"#2C6040"],["You Save","$"+savings,"#4CAF8A"],["Per Person","$"+splitCost,"#2C6040"]].map(([label,val,color])=>(
                  <div key={label} style={{flex:1,background:"white",borderRadius:10,padding:"10px",textAlign:"center"}}>
                    <div style={{fontSize:11,color:"#8A9A8A",fontFamily:"sans-serif",textTransform:"uppercase"}}>{label}</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:700,color}}>{val}</div>
                  </div>
                ))}
              </div>
              <button style={{width:"100%",background:"#4CAF8A",color:"white",border:"none",borderRadius:10,padding:"12px",fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,cursor:"pointer"}}>Find Shared Transport →</button>
            </div>
          ):(
            <div style={{background:"#FFF8F0",borderRadius:10,padding:"12px",textAlign:"center",border:"1px dashed #D4A882"}}>
              <div style={{fontSize:12,color:"#A08070",fontFamily:"sans-serif"}}>Select 2+ items to see bundle savings</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── MOVE TAB ─────────────────────────────────────────────────────
const MoveTab = () => {
  const [view, setView]           = useState("home");
  const [activeProvider, setActiveProvider] = useState(null);

  const openLink = (url) => window.open(url, "_blank", "noopener,noreferrer");

  if (view === "estimator") return (
    <div>
      <div style={{padding:"16px 16px 0"}}>
        <button onClick={()=>setView("home")} style={{background:"none",border:"none",cursor:"pointer",color:"#8B4513",fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,padding:0,display:"flex",alignItems:"center",gap:6}}>← Back to Services</button>
      </div>
      <CostEstimator/>
    </div>
  );

  if (view === "provider" && activeProvider) {
    const p = activeProvider;
    return (
      <div style={{minHeight:"100vh",background:"#F8F3EC",paddingBottom:100}}>
        {/* Header */}
        <div style={{background:"white",padding:"16px 18px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid #EDE8E0",position:"sticky",top:0,zIndex:10}}>
          <button onClick={()=>{setView("home");setActiveProvider(null);}} style={{background:"#F5EDE4",border:"none",borderRadius:10,width:34,height:34,cursor:"pointer",fontSize:18,color:"#8B4513",display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
          <span style={{fontSize:26}}>{p.icon}</span>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:800,color:"#2C1810"}}>{p.name}</div>
            <div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070"}}>{p.tagline}</div>
          </div>
        </div>

        <div style={{padding:"16px 18px"}}>
          {/* Hero CTA */}
          <div style={{background:`linear-gradient(135deg, ${p.darkColor}, ${p.color})`,borderRadius:18,padding:"22px 20px",marginBottom:16,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",right:-10,top:-10,fontSize:70,opacity:0.12}}>{p.icon}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:900,color:"white",marginBottom:6}}>{p.name}</div>
            <div style={{fontFamily:"sans-serif",fontSize:13,color:"rgba(255,255,255,0.8)",marginBottom:16,lineHeight:1.5}}>{p.tagline}</div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>openLink(p.bookingUrl)} style={{flex:1,background:"white",color:p.darkColor,border:"none",borderRadius:12,padding:"12px 16px",fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                🔗 {p.cta}
              </button>
              <button onClick={()=>openLink(p.url)} style={{background:"rgba(255,255,255,0.2)",color:"white",border:"1.5px solid rgba(255,255,255,0.5)",borderRadius:12,padding:"12px 14px",fontFamily:"sans-serif",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
                Visit Site
              </button>
            </div>
          </div>

          {/* Perks */}
          <div style={{background:"white",borderRadius:14,padding:"14px 16px",marginBottom:14,border:"1px solid #EDE8E0"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:10}}>Why {p.name}?</div>
            {p.perks.map(pk=>(
              <div key={pk} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:"1px solid #F5EDE4"}}>
                <div style={{width:24,height:24,borderRadius:"50%",background:p.bgColor,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{color:p.darkColor,fontSize:12,fontWeight:700}}>✓</span>
                </div>
                <span style={{fontFamily:"sans-serif",fontSize:13,color:"#2C1810"}}>{pk}</span>
              </div>
            ))}
          </div>

          {/* Options */}
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#2C1810",marginBottom:10}}>Options & Pricing</div>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
            {p.options.map(opt=>(
              <div key={opt.size} style={{background:"white",borderRadius:14,padding:"14px 16px",border:"1px solid #EDE8E0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810"}}>{opt.size}</div>
                  <div style={{fontFamily:"sans-serif",fontSize:12,color:"#A08070",marginTop:2}}>{opt.capacity}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:p.darkColor}}>${opt.basePrice}+</div>
                  {opt.perMile>0&&<div style={{fontFamily:"sans-serif",fontSize:10,color:"#B0A090"}}>${opt.perMile}/mi</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Cost estimator inline */}
          <div style={{marginBottom:16}}>
            <CostEstimator compact defaultDistance={5}/>
          </div>

          {/* Big book button */}
          <button onClick={()=>openLink(p.bookingUrl)} style={{width:"100%",background:p.color,color:"white",border:"none",borderRadius:14,padding:"16px",fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:800,cursor:"pointer",boxShadow:`0 6px 20px ${p.color}50`,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            🔗 {p.cta} on {p.name}
          </button>
          <div style={{textAlign:"center",marginTop:8,fontFamily:"sans-serif",fontSize:11,color:"#B0A090"}}>
            Opens {p.name}'s official website · furnish. earns a referral commission
          </div>
        </div>
      </div>
    );
  }

  // Home view
  return (
    <div style={{padding:"20px 16px 100px"}}>
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#8B4513,#C4703A)",borderRadius:20,padding:"22px 24px",marginBottom:20,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-20,top:-20,fontSize:80,opacity:0.15}}>🚚</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:"white"}}>Need Help Moving?</div>
        <div style={{color:"rgba(255,255,255,0.8)",fontSize:14,fontFamily:"sans-serif",marginTop:6,marginBottom:16}}>Trucks, movers & delivery — compare and book in one tap.</div>
        <button onClick={()=>setView("estimator")} style={{background:"rgba(255,255,255,0.2)",border:"1.5px solid rgba(255,255,255,0.6)",borderRadius:12,padding:"10px 20px",color:"white",fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>🧮 Open Cost Estimator →</button>
      </div>

      {/* How it works */}
      <div style={{background:"white",borderRadius:16,padding:"16px 18px",marginBottom:20,border:"1px solid #EDE8E0"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:12}}>How it works</div>
        <div style={{display:"flex"}}>{[{icon:"🛋️",label:"Browse & Buy"},{icon:"🧮",label:"Estimate Cost"},{icon:"🔗",label:"Book Direct"},{icon:"🏠",label:"Move In!"}].map((s,i)=>(
          <div key={s.label} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,position:"relative"}}>
            {i<3&&<div style={{position:"absolute",right:0,top:18,width:"50%",height:2,background:"#EDE8E0",zIndex:0}}/>}
            <div style={{width:36,height:36,background:"#F5EDE4",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,zIndex:1,position:"relative"}}>{s.icon}</div>
            <div style={{fontSize:10,color:"#A08070",fontFamily:"sans-serif",textAlign:"center"}}>{s.label}</div>
          </div>
        ))}</div>
      </div>

      {/* Provider cards */}
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#2C1810",marginBottom:12}}>Moving Services</div>
      <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
        {transportProviders.map(p=>(
          <div key={p.id} style={{background:"white",borderRadius:18,overflow:"hidden",boxShadow:"0 2px 12px rgba(60,40,20,0.07)",border:"1.5px solid #EDE8E0"}}>
            {/* Clickable header → detail page */}
            <div onClick={()=>{setActiveProvider(p);setView("provider");}} style={{background:p.bgColor,padding:"14px 18px",display:"flex",alignItems:"center",gap:12,borderBottom:`1px solid ${p.color}20`,cursor:"pointer",transition:"opacity 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.opacity="0.88"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              <span style={{fontSize:32}}>{p.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:800,color:p.darkColor}}>{p.name}</div>
                <div style={{color:"#8A7A6A",fontSize:12,fontFamily:"sans-serif"}}>{p.tagline}</div>
              </div>
              <div style={{color:p.color,fontSize:20,fontWeight:300}}>›</div>
            </div>
            {/* Options preview */}
            <div style={{padding:"10px 18px 12px"}}>
              <div style={{display:"flex",gap:8,marginBottom:10}}>
                {p.options.slice(0,3).map(opt=>(<div key={opt.size} style={{background:"#F8F3EC",borderRadius:8,padding:"6px 8px",flex:1}}>
                  <div style={{fontFamily:"sans-serif",fontSize:10,fontWeight:700,color:"#6B4C3A",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{opt.size}</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:700,color:p.darkColor}}>${opt.basePrice}+</div>
                </div>))}
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <div style={{flex:1,display:"flex",gap:6,flexWrap:"wrap"}}>
                  {p.perks.slice(0,2).map(pk=>(<span key={pk} style={{fontSize:10,color:"#8A7A6A",fontFamily:"sans-serif"}}>✓ {pk}</span>))}
                </div>
                {/* Direct book button */}
                <button onClick={()=>openLink(p.bookingUrl)} style={{background:p.color,color:"white",border:"none",borderRadius:10,padding:"7px 14px",fontFamily:"'Playfair Display',serif",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,display:"flex",alignItems:"center",gap:4}}>
                  🔗 {p.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <BundleSave/>
    </div>
  );
};

// ─── LISTING MODAL ────────────────────────────────────────────────
const Modal = ({ item, onClose }) => {
  const [offered, setOffered] = useState(false);
  const [offerVal, setOfferVal] = useState(Math.round(item.price*0.85));
  const [showTransport, setShowTransport] = useState(false);
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(30,15,5,0.65)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(4px)"}} onClick={onClose}>
      <div style={{background:"#FDFAF7",borderRadius:24,maxWidth:480,width:"100%",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 30px 80px rgba(30,15,5,0.3)"}} onClick={e=>e.stopPropagation()}>
        <div style={{height:220,position:"relative",flexShrink:0}}>
          <FurnitureIllustration type={item.img} sold={item.sold}/>
          <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"rgba(255,255,255,0.85)",border:"none",borderRadius:"50%",width:34,height:34,cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>
        <div style={{padding:"22px 26px 28px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:21,fontWeight:700,color:"#2C1810"}}>{item.title}</div>
              <div style={{color:"#A08070",fontSize:13,fontFamily:"sans-serif",marginTop:3}}>📍 {item.location} · {item.distance}</div>
              {item.dims&&<div style={{color:"#B0A090",fontSize:12,fontFamily:"sans-serif",marginTop:2}}>📐 {item.dims}</div>}
            </div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:30,fontWeight:700,color:"#8B4513"}}>${item.price}</div>
          </div>
          {/* Brand */}
          <div style={{fontFamily:"sans-serif",fontSize:11,fontWeight:700,color:"#A08070",textTransform:"uppercase",letterSpacing:0.5,marginTop:8}}>{item.brand}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:10,alignItems:"center"}}>
            {/* Color swatches */}
            <div style={{display:"flex",gap:5,alignItems:"center",background:"#F5EDE4",borderRadius:20,padding:"4px 10px"}}>
              {item.colors.map(c=>(<span key={c} style={{display:"flex",alignItems:"center",gap:4,fontFamily:"sans-serif",fontSize:12,color:"#6B4C3A"}}><div style={{width:13,height:13,borderRadius:"50%",background:COLOR_SWATCHES[c]||"#C0A890",border:"1px solid rgba(0,0,0,0.15)"}}/>{c}</span>))}
            </div>
            {item.tags.map(t=>(<span key={t} style={{background:"#F0E8DC",color:"#6B4C3A",fontSize:12,padding:"3px 10px",borderRadius:20,fontFamily:"sans-serif",fontWeight:500}}>{t}</span>))}
            <span style={{background:conditionColor[item.condition]+"20",color:conditionColor[item.condition],fontSize:12,padding:"3px 10px",borderRadius:20,fontFamily:"sans-serif",fontWeight:600}}>{item.condition}</span>
          </div>
          <div style={{background:"#F5EDE4",borderRadius:12,padding:"12px 14px",marginTop:14,display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:40,height:40,background:"#D4A882",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontWeight:700,color:"white",fontSize:16}}>{item.seller[0]}</div>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontWeight:600,color:"#2C1810",fontSize:14}}>{item.seller}</div>
              <div style={{color:"#A08070",fontSize:12,fontFamily:"sans-serif"}}>⭐ {item.sellerRating} · Verified Seller</div>
            </div>
          </div>
          <div onClick={()=>setShowTransport(!showTransport)} style={{background:"linear-gradient(135deg,#8B4513,#C4703A)",borderRadius:12,padding:"12px 16px",marginTop:14,cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:22}}>🚚</span>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"white"}}>Need help moving this?</div>
              <div style={{color:"rgba(255,255,255,0.8)",fontSize:12,fontFamily:"sans-serif"}}>U-Haul · Two Men and a Truck · TaskRabbit · Lugg</div>
            </div>
            <span style={{color:"white",fontSize:18}}>{showTransport?"∧":"∨"}</span>
          </div>
          {showTransport&&(
            <div style={{marginTop:10}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                {transportProviders.map(p=>(<div key={p.id} style={{background:p.bgColor,border:`1.5px solid ${p.color}40`,borderRadius:10,padding:"10px 12px",cursor:"pointer"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=p.color} onMouseLeave={e=>e.currentTarget.style.borderColor=`${p.color}40`}>
                  <div style={{fontSize:22}}>{p.icon}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:p.darkColor,marginTop:2}}>{p.name}</div>
                  <div style={{color:"#8A7A6A",fontSize:11,fontFamily:"sans-serif"}}>From ${p.options[0].basePrice}</div>
                </div>))}
              </div>
              <CostEstimator defaultDistance={item.distanceMi} defaultItem={item} compact/>
            </div>
          )}
          {!item.sold&&(
            <div style={{marginTop:16,display:"flex",flexDirection:"column",gap:10}}>
              {offered?(<div style={{background:"#E8F5EC",borderRadius:12,padding:"14px",textAlign:"center",color:"#3A7A54",fontFamily:"'Playfair Display',serif",fontWeight:600}}>✓ Offer of ${offerVal} sent!</div>):(
                <>
                  <button style={{background:"#8B4513",color:"white",border:"none",borderRadius:12,padding:"14px",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"'Playfair Display',serif"}}>Message Seller</button>
                  <div style={{display:"flex",gap:10}}>
                    <input type="number" value={offerVal} onChange={e=>setOfferVal(e.target.value)} style={{flex:1,border:"1.5px solid #DDD0C8",borderRadius:10,padding:"11px 14px",fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:"#5C3A20",background:"white",outline:"none"}}/>
                    <button onClick={()=>setOffered(true)} style={{background:"#F5EDE4",color:"#8B4513",border:"1.5px solid #D4A882",borderRadius:10,padding:"11px 16px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'Playfair Display',serif",whiteSpace:"nowrap"}}>Make Offer</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SELL_CATEGORIES = [
  { id:"Sofas",       icon:"🛋️", label:"Sofas & Sectionals" },
  { id:"Chairs",      icon:"🪑", label:"Chairs & Seating"   },
  { id:"Tables",      icon:"🪵", label:"Tables & Desks"      },
  { id:"Beds",        icon:"🛏️", label:"Beds & Frames"       },
  { id:"Storage",     icon:"🗄️", label:"Storage & Shelving"  },
  { id:"Dressers",    icon:"🪞", label:"Dressers & Wardrobes"},
  { id:"Outdoor",     icon:"⛱️", label:"Outdoor & Patio"     },
  { id:"Office",      icon:"🖥️", label:"Office Furniture"    },
  { id:"Lighting",    icon:"💡", label:"Lamps & Lighting"    },
  { id:"Rugs",        icon:"🪣", label:"Rugs & Mats"         },
  { id:"Decor",       icon:"🖼️", label:"Décor & Art"         },
  { id:"Baby",        icon:"🧸", label:"Kids & Baby"         },
  { id:"Appliances",  icon:"🧺", label:"Appliances"          },
  { id:"Other",       icon:"📦", label:"Other"               },
];

const CONDITIONS = [
  { id:"Like New", color:"#4CAF8A", desc:"Barely used, no visible wear" },
  { id:"Good",     color:"#E8A84A", desc:"Light use, minor cosmetic marks" },
  { id:"Fair",     color:"#C46A3A", desc:"Visible wear, fully functional" },
  { id:"AS-IS",    color:"#9E9E9E", desc:"Damage present — buyer accepts as-is" },
];

const SellModal = ({onClose}) => {
  const [step,      setStep]      = useState(0);
  const [category,  setCategory]  = useState(null);
  const [condition, setCondition] = useState(null);
  const [photos,    setPhotos]    = useState([]);   // array of { url, name }
  const [form,      setForm]      = useState({ title:"", brand:"", dims:"", description:"", price:"", acceptOffers:true });
  const [published, setPublished] = useState(false);
  const setF = (k,v) => setForm(f=>({...f,[k]:v}));

  const steps = ["Category","Photos","Details","Price"];

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files || []);
    const remaining = 8 - photos.length;
    files.slice(0, remaining).forEach(file => {
      const url = URL.createObjectURL(file);
      setPhotos(prev => [...prev, { url, name:file.name }]);
    });
  };

  const removePhoto = (idx) => setPhotos(prev => prev.filter((_,i)=>i!==idx));

  if (published) return (
    <div style={{position:"fixed",inset:0,background:"rgba(30,15,5,0.75)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={onClose}>
      <div style={{background:"#FDFAF7",borderRadius:24,maxWidth:360,width:"100%",padding:"36px 28px",textAlign:"center",boxShadow:"0 30px 80px rgba(30,15,5,0.3)"}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:64,marginBottom:16}}>🎉</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:900,color:"#2C1810",marginBottom:8}}>Listing Published!</div>
        <div style={{fontFamily:"sans-serif",fontSize:14,color:"#8A7A6A",lineHeight:1.6,marginBottom:24}}>Your <strong>{form.title||category}</strong> is now live and visible to buyers near Atlanta.</div>
        {photos.length>0&&<div style={{width:"100%",height:140,borderRadius:14,overflow:"hidden",marginBottom:20}}><img src={photos[0].url} alt="listing" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>}
        <button onClick={onClose} style={{width:"100%",background:"#8B4513",color:"white",border:"none",borderRadius:14,padding:"14px",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:"pointer"}}>View My Listing →</button>
      </div>
    </div>
  );

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(30,15,5,0.65)",zIndex:1000,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(4px)"}} onClick={onClose}>
      <div style={{background:"#FDFAF7",borderRadius:"24px 24px 0 0",maxWidth:520,width:"100%",maxHeight:"92vh",display:"flex",flexDirection:"column",boxShadow:"0 -16px 60px rgba(30,15,5,0.3)"}} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{background:"#8B4513",padding:"18px 22px",flexShrink:0,borderRadius:"24px 24px 0 0"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:800,color:"white"}}>List Your Furniture</div>
            <button onClick={onClose} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:"50%",width:32,height:32,color:"white",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          </div>
          {/* Progress */}
          <div style={{display:"flex",gap:6}}>
            {steps.map((s,i)=>(
              <div key={s} style={{flex:1}}>
                <div style={{height:3,borderRadius:2,background:i<=step?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.28)",transition:"background 0.3s"}}/>
                <div style={{color:i<=step?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.45)",fontSize:10,marginTop:4,fontFamily:"sans-serif",textAlign:"center"}}>{s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{overflowY:"auto",flex:1,padding:"20px 22px"}}>

          {/* STEP 0 — Category */}
          {step===0&&(
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:"#2C1810",marginBottom:4,fontWeight:700}}>What are you selling?</div>
              <div style={{fontFamily:"sans-serif",fontSize:12,color:"#A08070",marginBottom:16}}>Choose the best fit — you can adjust later.</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {SELL_CATEGORIES.map(c=>(
                  <button key={c.id} onClick={()=>setCategory(c.id)} style={{background:category===c.id?"#8B4513":"#F5EDE4",color:category===c.id?"white":"#5C3A20",border:`2px solid ${category===c.id?"#8B4513":"transparent"}`,borderRadius:12,padding:"10px 12px",fontFamily:"sans-serif",fontSize:13,cursor:"pointer",fontWeight:category===c.id?700:500,transition:"all 0.14s",display:"flex",alignItems:"center",gap:8,textAlign:"left"}}>
                    <span style={{fontSize:18,flexShrink:0}}>{c.icon}</span>
                    <span style={{lineHeight:1.3}}>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 — Photos */}
          {step===1&&(
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:"#2C1810",marginBottom:4,fontWeight:700}}>Add Photos</div>
              <div style={{fontFamily:"sans-serif",fontSize:12,color:"#A08070",marginBottom:16}}>Up to 8 photos. First photo is your cover shot. Clear, well-lit photos sell faster!</div>

              {/* Photo grid */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
                {photos.map((ph,i)=>(
                  <div key={i} style={{position:"relative",aspectRatio:"1",borderRadius:12,overflow:"hidden",border:"1.5px solid #D4A882"}}>
                    <img src={ph.url} alt={ph.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    {i===0&&<div style={{position:"absolute",top:4,left:4,background:"#8B4513",color:"white",fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:6,fontFamily:"sans-serif"}}>COVER</div>}
                    <button onClick={()=>removePhoto(i)} style={{position:"absolute",top:4,right:4,background:"rgba(0,0,0,0.55)",border:"none",borderRadius:"50%",width:20,height:20,color:"white",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>×</button>
                  </div>
                ))}
                {photos.length<8&&(
                  <label style={{aspectRatio:"1",borderRadius:12,border:"2px dashed #D4A882",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",background:"#FFF8F0",gap:4}}>
                    <span style={{fontSize:28}}>📷</span>
                    <span style={{fontFamily:"sans-serif",fontSize:10,color:"#8B4513",fontWeight:700}}>{photos.length===0?"Add Photo":"Add More"}</span>
                    <span style={{fontFamily:"sans-serif",fontSize:9,color:"#B0A090"}}>{photos.length}/8</span>
                    <input type="file" accept="image/*" multiple onChange={handleFileInput} style={{display:"none"}}/>
                  </label>
                )}
              </div>

              {/* Tips */}
              <div style={{background:"#F5EDE4",borderRadius:12,padding:"12px 14px"}}>
                <div style={{fontFamily:"sans-serif",fontSize:12,color:"#6B4C3A",fontWeight:700,marginBottom:6}}>📸 Photo Tips</div>
                {["Shoot in natural light near a window","Include all angles: front, back, sides","Show any damage or wear clearly","Use a clean, uncluttered background"].map(tip=>(
                  <div key={tip} style={{fontFamily:"sans-serif",fontSize:11,color:"#8A7A6A",padding:"2px 0"}}>· {tip}</div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — Details */}
          {step===2&&(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:"#2C1810",fontWeight:700}}>Tell buyers about it</div>

              {/* Title */}
              <div>
                <div style={{fontSize:11,color:"#8A6A5A",fontFamily:"sans-serif",fontWeight:700,marginBottom:5,textTransform:"uppercase",letterSpacing:0.4}}>Title *</div>
                <input value={form.title} onChange={e=>setF("title",e.target.value)} placeholder="e.g. West Elm Mid-Century Dining Table" style={{width:"100%",border:"1.5px solid #DDD0C8",borderRadius:10,padding:"11px 14px",fontFamily:"sans-serif",fontSize:14,color:"#2C1810",outline:"none",boxSizing:"border-box"}}/>
              </div>

              {/* Brand */}
              <div>
                <div style={{fontSize:11,color:"#8A6A5A",fontFamily:"sans-serif",fontWeight:700,marginBottom:5,textTransform:"uppercase",letterSpacing:0.4}}>Brand / Maker</div>
                <input value={form.brand} onChange={e=>setF("brand",e.target.value)} placeholder="e.g. IKEA, West Elm, Pottery Barn, Unknown" style={{width:"100%",border:"1.5px solid #DDD0C8",borderRadius:10,padding:"11px 14px",fontFamily:"sans-serif",fontSize:14,color:"#2C1810",outline:"none",boxSizing:"border-box"}}/>
              </div>

              {/* Condition */}
              <div>
                <div style={{fontSize:11,color:"#8A6A5A",fontFamily:"sans-serif",fontWeight:700,marginBottom:8,textTransform:"uppercase",letterSpacing:0.4}}>Condition *</div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {CONDITIONS.map(c=>(
                    <button key={c.id} onClick={()=>setCondition(c.id)} style={{display:"flex",alignItems:"center",gap:10,background:condition===c.id?c.color+"18":"#F5EDE4",border:`2px solid ${condition===c.id?c.color:"transparent"}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",textAlign:"left",transition:"all 0.14s"}}>
                      <div style={{width:12,height:12,borderRadius:"50%",background:c.color,flexShrink:0}}/>
                      <div>
                        <div style={{fontFamily:"sans-serif",fontSize:13,fontWeight:700,color:"#2C1810"}}>{c.id}</div>
                        <div style={{fontFamily:"sans-serif",fontSize:11,color:"#8A7A6A"}}>{c.desc}</div>
                      </div>
                      {condition===c.id&&<div style={{marginLeft:"auto",color:c.color,fontSize:16}}>✓</div>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions */}
              <div>
                <div style={{fontSize:11,color:"#8A6A5A",fontFamily:"sans-serif",fontWeight:700,marginBottom:5,textTransform:"uppercase",letterSpacing:0.4}}>Dimensions</div>
                <input value={form.dims} onChange={e=>setF("dims",e.target.value)} placeholder='e.g. 72"W × 36"D × 30"H' style={{width:"100%",border:"1.5px solid #DDD0C8",borderRadius:10,padding:"11px 14px",fontFamily:"sans-serif",fontSize:14,color:"#2C1810",outline:"none",boxSizing:"border-box"}}/>
              </div>

              {/* Description */}
              <div>
                <div style={{fontSize:11,color:"#8A6A5A",fontFamily:"sans-serif",fontWeight:700,marginBottom:5,textTransform:"uppercase",letterSpacing:0.4}}>Description</div>
                <textarea value={form.description} onChange={e=>setF("description",e.target.value)} placeholder="Describe the item — age, material, any wear or quirks buyers should know..." rows={3} style={{width:"100%",border:"1.5px solid #DDD0C8",borderRadius:10,padding:"11px 14px",fontFamily:"sans-serif",fontSize:14,color:"#2C1810",outline:"none",resize:"none",boxSizing:"border-box"}}/>
              </div>
            </div>
          )}

          {/* STEP 3 — Price & Post */}
          {step===3&&(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:"#2C1810",fontWeight:700}}>Set your price</div>

              {/* Price input */}
              <div>
                <div style={{fontSize:11,color:"#8A6A5A",fontFamily:"sans-serif",fontWeight:700,marginBottom:5,textTransform:"uppercase",letterSpacing:0.4}}>Asking Price *</div>
                <div style={{position:"relative"}}>
                  <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:"#8B4513"}}>$</span>
                  <input type="number" value={form.price} onChange={e=>setF("price",e.target.value)} placeholder="0" style={{width:"100%",border:"2px solid #D4A882",borderRadius:12,padding:"13px 14px 13px 34px",fontFamily:"'Cormorant Garamond',serif",fontSize:28,color:"#2C1810",outline:"none",boxSizing:"border-box"}}/>
                </div>
              </div>

              {/* Accept offers toggle */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"#F5EDE4",borderRadius:12,padding:"12px 14px"}}>
                <div>
                  <div style={{fontFamily:"sans-serif",fontSize:13,fontWeight:600,color:"#2C1810"}}>Accept Offers</div>
                  <div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070"}}>Buyers can send you offers below your asking price</div>
                </div>
                <div onClick={()=>setF("acceptOffers",!form.acceptOffers)} style={{width:44,height:24,background:form.acceptOffers?"#8B4513":"#DDD0C8",borderRadius:12,cursor:"pointer",position:"relative",transition:"background 0.2s",flexShrink:0}}>
                  <div style={{width:20,height:20,background:"white",borderRadius:"50%",position:"absolute",top:2,left:form.acceptOffers?22:2,transition:"left 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/>
                </div>
              </div>

              {/* Listing summary */}
              <div style={{background:"white",borderRadius:14,padding:"14px 16px",border:"1px solid #EDE8E0"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:"#2C1810",marginBottom:10}}>Listing Summary</div>
                {[
                  ["Category",   SELL_CATEGORIES.find(c=>c.id===category)?.label||category||"—"],
                  ["Condition",  condition||"—"],
                  ["Title",      form.title||"—"],
                  ["Brand",      form.brand||"—"],
                  ["Dimensions", form.dims||"—"],
                  ["Photos",     `${photos.length} photo${photos.length!==1?"s":""} added`],
                  ["Location",   "Atlanta, GA 📍"],
                ].map(([k,v])=>(
                  <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #F5EDE4"}}>
                    <span style={{fontFamily:"sans-serif",fontSize:12,color:"#A08070"}}>{k}</span>
                    <span style={{fontFamily:"sans-serif",fontSize:12,fontWeight:600,color:"#2C1810",maxWidth:"60%",textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Fee note */}
              <div style={{background:"#FFF8F0",borderRadius:10,padding:"10px 12px",display:"flex",gap:8,alignItems:"flex-start"}}>
                <span style={{fontSize:16,flexShrink:0}}>💡</span>
                <div style={{fontFamily:"sans-serif",fontSize:11,color:"#8A7A6A",lineHeight:1.5}}>furnish. charges an <strong>8% seller fee</strong> only when your item sells. Listing is always free.</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div style={{padding:"14px 22px 28px",borderTop:"1px solid #EDE8E0",flexShrink:0,display:"flex",gap:10}}>
          {step>0&&<button onClick={()=>setStep(s=>s-1)} style={{flex:1,background:"#F5EDE4",color:"#8B4513",border:"none",borderRadius:12,padding:"13px",fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,cursor:"pointer"}}>← Back</button>}
          {step<3&&(
            <button onClick={()=>{
              if(step===0&&!category) return;
              setStep(s=>s+1);
            }} style={{flex:2,background:(!category&&step===0)?"#DDD0C8":"#8B4513",color:"white",border:"none",borderRadius:12,padding:"13px",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:(!category&&step===0)?"not-allowed":"pointer"}}>
              Continue →
            </button>
          )}
          {step===3&&(
            <button onClick={()=>{ if(form.price) setPublished(true); }} style={{flex:2,background:form.price?"#8B4513":"#DDD0C8",color:"white",border:"none",borderRadius:12,padding:"13px",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:form.price?"pointer":"not-allowed"}}>
              🎉 Publish Listing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


// ─── PROFILE DATA ────────────────────────────────────────────────
const PROFILE_USER = {
  name:"Jordan Smith", handle:"@jordansmithatl",
  bio:"Downsizing my home office & living room. Everything priced to move! Based in Atlanta 🍑",
  joinedDate:"March 2024", location:"Atlanta, GA",
  followers:142, following:87, rating:4.9, reviewCount:34, verified:true,
  stats:{ sold:28, active:6, purchases:11, likes:47 },
};
const PROFILE_REVIEWS = [
  { id:1, author:"Maya R.",  rating:5, date:"May 2026",  text:"Super easy to work with! Item was exactly as described and Jordan even helped load it into my car. Highly recommend 🙌", avatar:"M" },
  { id:2, author:"Derek N.", rating:5, date:"Apr 2026",  text:"Flawless transaction. The chair was in perfect condition — way better than the photos showed. Fast replies too.", avatar:"D" },
  { id:3, author:"Clara W.", rating:4, date:"Apr 2026",  text:"Great seller, very communicative. Item had a tiny scuff but Jordan knocked $10 off without me even asking.", avatar:"C" },
  { id:4, author:"Ines L.",  rating:5, date:"Mar 2026",  text:"Bought the dining table and it's gorgeous. Jordan was flexible on pickup time and even threw in the chair pads. 10/10!", avatar:"I" },
  { id:5, author:"Raj S.",   rating:5, date:"Mar 2026",  text:"Honest, punctual, and friendly. Exactly what you want from a private seller. Will buy from Jordan again.", avatar:"R" },
];
const PROFILE_SOLD = [
  { id:101, title:"Leather Ottoman — Cognac", price:95,  img:"table",  brand:"Crate & Barrel", dims:'24"W × 24"D × 17"H', colors:["Brown"],         sold:true, soldDate:"May 15", earnings:87 },
  { id:102, title:"IKEA BILLY Bookcase",      price:45,  img:"shelf",  brand:"IKEA",           dims:'31"W × 11"D × 79"H', colors:["White"],         sold:true, soldDate:"May 8",  earnings:41 },
  { id:103, title:"Brass Floor Lamp",         price:75,  img:"rattan", brand:"West Elm",       dims:'12"W × 12"D × 60"H', colors:["Brown","Natural"],sold:true, soldDate:"Apr 28", earnings:69 },
  { id:104, title:"Velvet Accent Chair",      price:210, img:"chair",  brand:"Article",        dims:'28"W × 30"D × 34"H', colors:["Gray"],           sold:true, soldDate:"Apr 19", earnings:193 },
];
const PROFILE_PURCHASES = [
  { id:201, title:"Herman Miller Aeron",      price:480, img:"chair",  brand:"Herman Miller", purchaseDate:"May 20" },
  { id:202, title:"Marble Nightstand",        price:130, img:"table",  brand:"Unknown",       purchaseDate:"Apr 15" },
  { id:203, title:"IKEA KALLAX — Oak",        price:60,  img:"shelf",  brand:"IKEA",          purchaseDate:"Mar 30" },
];
const PROFILE_LIKES = listings.filter(l=>!l.sold).slice(0,6);
const PROFILE_LISTINGS_ACTIVE = listings.filter(l=>!l.sold);
const EARNINGS_MONTHLY = [
  { month:"Nov", amount:0   },{ month:"Dec", amount:45  },{ month:"Jan", amount:120 },
  { month:"Feb", amount:95  },{ month:"Mar", amount:279 },{ month:"Apr", amount:390 },{ month:"May", amount:190 },
];

// ─── SHARED PROFILE SUB-COMPONENTS ───────────────────────────────
const StarRating = ({ rating, size=14 }) => (
  <div style={{display:"flex",gap:2}}>
    {[1,2,3,4,5].map(s=>(
      <svg key={s} width={size} height={size} viewBox="0 0 20 20" fill={s<=Math.round(rating)?"#E8A020":"#EDE8E0"}>
        <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78z"/>
      </svg>
    ))}
  </div>
);

const MiniCard = ({ item, badge=null, badgeColor="#4CAF8A", sub=null }) => (
  <div style={{background:"white",borderRadius:12,overflow:"hidden",border:"1px solid #EDE8E0",position:"relative"}}>
    <div style={{height:90}}><FurnitureIllustration type={item.img} sold={item.sold}/></div>
    {badge&&<div style={{position:"absolute",top:5,left:5,background:badgeColor,color:"white",fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:8,fontFamily:"sans-serif"}}>{badge}</div>}
    <div style={{padding:"7px 9px"}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:11,fontWeight:700,color:"#2C1810",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.title}</div>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontWeight:700,color:item.sold?"#A08070":"#8B4513",marginTop:1}}>${item.price}</div>
      {sub&&<div style={{fontFamily:"sans-serif",fontSize:9,color:"#A08070",marginTop:1}}>{sub}</div>}
    </div>
  </div>
);

// ─── SETTINGS PAGE ────────────────────────────────────────────────
// ─── ACCOUNT EDIT FORM ───────────────────────────────────────────
const AccountEditForm = ({ onSave }) => {
  const [fields, setFields] = useState({
    firstName:"Jordan", lastName:"Smith", username:"@jordansmithatl",
    email:"jordan@example.com", phone:"(404) 555-0182",
    city:"Atlanta", state:"GA", zip:"30309",
    dob:"", bio:"Downsizing my home office & living room. Everything priced to move! Based in Atlanta 🍑",
    twoFA:true, emailVerified:true, phoneVerified:true,
  });
  const [editing, setEditing] = useState(null);
  const [saved, setSaved] = useState(false);
  const set = (k,v) => setFields(f=>({...f,[k]:v}));

  const Field = ({ icon, label, fieldKey, type="text", placeholder="" }) => {
    const isEditing = editing===fieldKey;
    return (
      <div style={{padding:"12px 0",borderBottom:"1px solid #F5EDE4"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:18,width:26,textAlign:"center",flexShrink:0}}>{icon}</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"sans-serif",fontSize:10,color:"#A08070",textTransform:"uppercase",fontWeight:700,letterSpacing:0.4,marginBottom:2}}>{label}</div>
            {isEditing ? (
              <input autoFocus type={type} value={fields[fieldKey]} onChange={e=>set(fieldKey,e.target.value)}
                placeholder={placeholder}
                style={{width:"100%",border:"1.5px solid #D4A882",borderRadius:8,padding:"7px 10px",fontFamily:"sans-serif",fontSize:14,color:"#2C1810",outline:"none",boxSizing:"border-box"}}/>
            ) : (
              <div style={{fontFamily:"sans-serif",fontSize:14,color:fields[fieldKey]?"#2C1810":"#B0A090",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                {fields[fieldKey]||"Not set"}
              </div>
            )}
          </div>
          <button onClick={()=>setEditing(isEditing?null:fieldKey)}
            style={{background:isEditing?"#8B4513":"#F5EDE4",color:isEditing?"white":"#8B4513",border:"none",borderRadius:8,padding:"5px 12px",fontFamily:"sans-serif",fontSize:12,fontWeight:700,cursor:"pointer",flexShrink:0}}>
            {isEditing?"Save":"Edit"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{paddingBottom:20}}>
      {/* Personal info */}
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:8}}>Personal Information</div>
      <div style={{background:"white",borderRadius:16,padding:"4px 16px",marginBottom:14,border:"1px solid #EDE8E0"}}>
        <Field icon="👤" label="First Name"    fieldKey="firstName" placeholder="First name"/>
        <Field icon="👤" label="Last Name"     fieldKey="lastName"  placeholder="Last name"/>
        <Field icon="🏷️" label="Username"      fieldKey="username"  placeholder="@yourhandle"/>
        <Field icon="📧" label="Email Address" fieldKey="email"     type="email" placeholder="you@email.com"/>
        <Field icon="📱" label="Phone Number"  fieldKey="phone"     type="tel"  placeholder="(555) 000-0000"/>
        <Field icon="🎂" label="Date of Birth" fieldKey="dob"       type="date"/>
      </div>
      {/* Location */}
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:8}}>Location</div>
      <div style={{background:"white",borderRadius:16,padding:"4px 16px",marginBottom:14,border:"1px solid #EDE8E0"}}>
        <Field icon="🏙️" label="City"     fieldKey="city"  placeholder="Atlanta"/>
        <Field icon="🗺️" label="State"    fieldKey="state" placeholder="GA"/>
        <Field icon="📮" label="ZIP Code" fieldKey="zip"   placeholder="30309"/>
      </div>
      {/* Bio */}
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:8}}>Bio</div>
      <div style={{background:"white",borderRadius:16,padding:"14px 16px",marginBottom:14,border:"1px solid #EDE8E0"}}>
        <textarea value={fields.bio} onChange={e=>set("bio",e.target.value)} rows={3}
          style={{width:"100%",border:"1.5px solid #DDD0C8",borderRadius:10,padding:"10px 12px",fontFamily:"sans-serif",fontSize:13,color:"#2C1810",resize:"none",outline:"none",boxSizing:"border-box"}}/>
        <div style={{textAlign:"right",fontFamily:"sans-serif",fontSize:11,color:"#B0A090",marginTop:4}}>{fields.bio.length}/160</div>
      </div>
      {/* Security */}
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:8}}>Security</div>
      <div style={{background:"white",borderRadius:16,padding:"14px 16px",marginBottom:14,border:"1px solid #EDE8E0"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0",borderBottom:"1px solid #F5EDE4"}}>
          <span style={{fontSize:18,width:26,textAlign:"center"}}>🔑</span>
          <div style={{flex:1}}>
            <div style={{fontFamily:"sans-serif",fontSize:14,fontWeight:600,color:"#2C1810"}}>Password</div>
            <div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070"}}>Last changed 3 months ago</div>
          </div>
          <button style={{background:"#F5EDE4",color:"#8B4513",border:"none",borderRadius:8,padding:"5px 12px",fontFamily:"sans-serif",fontSize:12,fontWeight:700,cursor:"pointer"}}>Change</button>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid #F5EDE4"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:18,width:26,textAlign:"center"}}>🛡️</span>
            <div>
              <div style={{fontFamily:"sans-serif",fontSize:14,fontWeight:600,color:"#2C1810"}}>Two-Factor Auth</div>
              <div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070"}}>SMS verification is {fields.twoFA?"ON":"OFF"}</div>
            </div>
          </div>
          <div onClick={()=>set("twoFA",!fields.twoFA)} style={{width:44,height:24,background:fields.twoFA?"#8B4513":"#DDD0C8",borderRadius:12,cursor:"pointer",position:"relative",transition:"background 0.2s",flexShrink:0}}>
            <div style={{width:20,height:20,background:"white",borderRadius:"50%",position:"absolute",top:2,left:fields.twoFA?22:2,transition:"left 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/>
          </div>
        </div>
        <div style={{padding:"12px 0"}}>
          <button style={{width:"100%",background:"#FEF5E4",color:"#8A6010",border:"1px solid #F0D890",borderRadius:10,padding:"10px",fontFamily:"sans-serif",fontSize:12,fontWeight:600,cursor:"pointer"}}>📄 Download My Data (GDPR/CCPA)</button>
        </div>
      </div>
      {/* Danger zone */}
      <div style={{background:"white",borderRadius:16,padding:"4px 16px",marginBottom:14,border:"1px solid #EDE8E0"}}>
        {[{icon:"🚪",label:"Sign Out",color:"#C46A3A"},{icon:"🗑️",label:"Delete Account",color:"#C0392B"}].map(a=>(
          <div key={a.label} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 0",borderBottom:"1px solid #F5EDE4",cursor:"pointer"}}>
            <div style={{width:36,height:36,background:"#FEF0EF",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{a.icon}</div>
            <div style={{fontFamily:"sans-serif",fontSize:14,fontWeight:600,color:a.color,flex:1}}>{a.label}</div>
            <span style={{color:"#D0A0A0",fontSize:18}}>›</span>
          </div>
        ))}
      </div>
      <button onClick={()=>{setSaved(true);setTimeout(()=>{setSaved(false);onSave();},1200);}}
        style={{width:"100%",background:"#8B4513",color:"white",border:"none",borderRadius:14,padding:"14px",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:"pointer",transition:"background 0.2s"}}>
        {saved?"✓ Saved!":"Save Changes"}
      </button>
    </div>
  );
};

// ─── EDIT PROFILE MODAL ───────────────────────────────────────────
const EditProfileModal = ({ onClose, onSave }) => {
  const [tab, setTab] = useState("photo"); // photo | username
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [username, setUsername] = useState("@jordansmithatl");
  const [displayName, setDisplayName] = useState("Jordan Smith");
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const checkUsername = (val) => {
    setUsername(val);
    setUsernameAvailable(null);
    if (val.length > 3) {
      setCheckingUsername(true);
      setTimeout(() => {
        setCheckingUsername(false);
        setUsernameAvailable(!["@admin","@furnish","@support"].includes(val.toLowerCase()));
      }, 800);
    }
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(20,10,5,0.7)",zIndex:1200,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(4px)"}} onClick={onClose}>
      <div style={{background:"#FDFAF7",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:520,maxHeight:"88vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{background:"#8B4513",padding:"18px 22px",borderRadius:"24px 24px 0 0",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:800,color:"white"}}>Edit Profile</div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:"50%",width:32,height:32,color:"white",cursor:"pointer",fontSize:18}}>×</button>
        </div>
        {/* Tabs */}
        <div style={{display:"flex",background:"white",borderBottom:"1px solid #EDE8E0",flexShrink:0}}>
          {[{id:"photo",label:"📷 Photo"},{ id:"username",label:"🏷️ Username & Name"}].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,background:"none",border:"none",borderBottom:`3px solid ${tab===t.id?"#8B4513":"transparent"}`,padding:"13px 8px",cursor:"pointer",fontFamily:"sans-serif",fontSize:13,fontWeight:tab===t.id?700:400,color:tab===t.id?"#8B4513":"#A08070"}}>
              {t.label}
            </button>
          ))}
        </div>
        {/* Body */}
        <div style={{overflowY:"auto",flex:1,padding:"24px 22px"}}>

          {/* PHOTO TAB */}
          {tab==="photo"&&(
            <div>
              {/* Current avatar */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:24}}>
                <div style={{position:"relative",marginBottom:12}}>
                  <div style={{width:110,height:110,borderRadius:"50%",background:photoUploaded?"#C4883A":"linear-gradient(135deg,#8B4513,#C4703A)",display:"flex",alignItems:"center",justifyContent:"center",border:"4px solid #EDE8E0",overflow:"hidden",boxShadow:"0 4px 20px rgba(60,30,10,0.15)"}}>
                    {photoUploaded
                      ? <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:50}}>😊</div>
                      : <span style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:36,color:"white"}}>JS</span>
                    }
                  </div>
                  <label style={{position:"absolute",bottom:4,right:4,width:32,height:32,background:"#8B4513",borderRadius:"50%",border:"2px solid white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:16}}>
                    📷
                    <input type="file" accept="image/*" onChange={()=>setPhotoUploaded(true)} style={{display:"none"}}/>
                  </label>
                </div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"#2C1810"}}>Jordan Smith</div>
                <div style={{fontFamily:"sans-serif",fontSize:13,color:"#A08070"}}>{username}</div>
              </div>
              {/* Upload options */}
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <label style={{display:"flex",alignItems:"center",gap:12,background:"#F5EDE4",borderRadius:14,padding:"14px 16px",cursor:"pointer",border:"1.5px solid #D4A882"}}>
                  <span style={{fontSize:24,flexShrink:0}}>📷</span>
                  <div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810"}}>Upload from Camera Roll</div>
                    <div style={{fontFamily:"sans-serif",fontSize:11,color:"#8A7A6A"}}>JPG, PNG, HEIC up to 10MB</div>
                  </div>
                  <input type="file" accept="image/*" onChange={()=>setPhotoUploaded(true)} style={{display:"none"}}/>
                </label>
                <label style={{display:"flex",alignItems:"center",gap:12,background:"white",borderRadius:14,padding:"14px 16px",cursor:"pointer",border:"1.5px solid #EDE8E0"}}>
                  <span style={{fontSize:24,flexShrink:0}}>📂</span>
                  <div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810"}}>Choose from Files</div>
                    <div style={{fontFamily:"sans-serif",fontSize:11,color:"#8A7A6A"}}>Browse your device storage</div>
                  </div>
                  <input type="file" accept="image/*" onChange={()=>setPhotoUploaded(true)} style={{display:"none"}}/>
                </label>
                {photoUploaded&&(
                  <button onClick={()=>setPhotoUploaded(false)} style={{background:"#FEF0EF",color:"#C46A3A",border:"1px solid #F0C0B0",borderRadius:12,padding:"11px",fontFamily:"sans-serif",fontSize:13,fontWeight:600,cursor:"pointer"}}>
                    🗑️ Remove Current Photo
                  </button>
                )}
              </div>
              {/* Tips */}
              <div style={{background:"#F5EDE4",borderRadius:12,padding:"12px 14px",marginTop:16}}>
                <div style={{fontFamily:"sans-serif",fontSize:12,color:"#6B4C3A",lineHeight:1.6}}>
                  💡 <strong>Tips:</strong> Use a clear, well-lit face photo. Sellers with profile photos get <strong>3x more buyer trust</strong> on furnish.
                </div>
              </div>
            </div>
          )}

          {/* USERNAME TAB */}
          {tab==="username"&&(
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {/* Display Name */}
              <div>
                <div style={{fontFamily:"sans-serif",fontSize:11,color:"#8A6A5A",fontWeight:700,textTransform:"uppercase",letterSpacing:0.4,marginBottom:6}}>Display Name</div>
                <input value={displayName} onChange={e=>setDisplayName(e.target.value)} placeholder="Your full name" style={{width:"100%",border:"1.5px solid #DDD0C8",borderRadius:12,padding:"12px 14px",fontFamily:"sans-serif",fontSize:15,color:"#2C1810",outline:"none",boxSizing:"border-box"}}/>
                <div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070",marginTop:4}}>This is shown on your listings and reviews.</div>
              </div>
              {/* Username */}
              <div>
                <div style={{fontFamily:"sans-serif",fontSize:11,color:"#8A6A5A",fontWeight:700,textTransform:"uppercase",letterSpacing:0.4,marginBottom:6}}>Username</div>
                <div style={{position:"relative"}}>
                  <input value={username} onChange={e=>checkUsername(e.target.value)} placeholder="@yourhandle"
                    style={{width:"100%",border:`1.5px solid ${usernameAvailable===true?"#4CAF8A":usernameAvailable===false?"#C46A3A":"#DDD0C8"}`,borderRadius:12,padding:"12px 14px",fontFamily:"sans-serif",fontSize:15,color:"#2C1810",outline:"none",boxSizing:"border-box"}}/>
                  <div style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:16}}>
                    {checkingUsername?"⏳":usernameAvailable===true?"✅":usernameAvailable===false?"❌":""}
                  </div>
                </div>
                {usernameAvailable===true&&<div style={{fontFamily:"sans-serif",fontSize:11,color:"#4CAF8A",marginTop:4}}>✓ Username is available!</div>}
                {usernameAvailable===false&&<div style={{fontFamily:"sans-serif",fontSize:11,color:"#C46A3A",marginTop:4}}>✗ Username is taken. Try another.</div>}
                <div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070",marginTop:4}}>Usernames can only be changed once every 30 days.</div>
              </div>
              {/* Rules */}
              <div style={{background:"#F5EDE4",borderRadius:12,padding:"12px 14px"}}>
                <div style={{fontFamily:"sans-serif",fontSize:12,color:"#6B4C3A",fontWeight:700,marginBottom:6}}>Username Rules</div>
                {["3–30 characters","Letters, numbers, underscores only","No spaces or special characters","Must start with a letter"].map(rule=>(
                  <div key={rule} style={{fontFamily:"sans-serif",fontSize:11,color:"#8A7A6A",padding:"2px 0"}}>· {rule}</div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Footer */}
        <div style={{padding:"14px 22px 28px",borderTop:"1px solid #EDE8E0",flexShrink:0}}>
          <button onClick={()=>{onSave({photoUploaded,username,displayName});onClose();}}
            style={{width:"100%",background:"#8B4513",color:"white",border:"none",borderRadius:14,padding:"14px",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:"pointer"}}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── LEGAL DOCUMENTS ─────────────────────────────────────────────
const LEGAL_DOCS = {
  tos: {
    title: "Terms of Service",
    icon: "📋",
    docNumber: "TOS-2026-001",
    effectiveDate: "May 26, 2026",
    color: "#8B4513",
    bgColor: "#FFF8F2",
    sections: [
      {
        num: "1", heading: "Acceptance of Terms",
        body: `By downloading, accessing, or using the furnish. mobile application and platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree, you are prohibited from using this Service. Furnish Technologies, Inc. ("we", "us") reserves the right to modify these Terms at any time with notice via the Platform or email.`,
      },
      {
        num: "2", heading: "Eligibility & Account Registration",
        subsections: [
          { sub: "2.1 Age Requirements", text: "You must be at least 18 years of age to use this Platform. By creating an account, you confirm you meet this requirement." },
          { sub: "2.2 Account Responsibilities", text: "You agree to: (a) provide accurate and complete registration information; (b) keep your password secure and confidential; (c) notify us immediately of any unauthorized account access; and (d) accept responsibility for all activity under your account." },
          { sub: "2.3 Identity Verification", text: "We may require phone verification, ID verification, or other methods at any time. Unverified accounts may be suspended or terminated." },
        ],
      },
      {
        num: "3", heading: "Platform Rules & Prohibited Conduct",
        subsections: [
          { sub: "3.1 Permitted Use", text: "The Platform is for peer-to-peer buying and selling of secondhand furniture and home goods within the United States only." },
          { sub: "3.2 Prohibited Listings", text: "You may NOT list: stolen, counterfeit, or fraudulently obtained items; items violating intellectual property rights; hazardous materials; items prohibited by law; or items with intentionally misleading descriptions or photos." },
          { sub: "3.3 Prohibited Conduct", text: "You may NOT: harass, threaten, or abuse other users; take transactions off-Platform to avoid fees; create multiple accounts to evade bans; or scrape, reverse-engineer, or disrupt Platform systems." },
        ],
      },
      {
        num: "4", heading: "Transactions, Payments & Fees",
        subsections: [
          { sub: "4.1 Peer-to-Peer Nature", text: "furnish. connects buyers and sellers but is not a party to any transaction. All sale contracts are directly between users." },
          { sub: "4.2 Platform Fees", text: "Listing is FREE. furnish. charges an 8% seller transaction fee (deducted from seller payout) and a 3% buyer service fee added at checkout. Payment processing is 2.9% + $0.30 per transaction. Fees are subject to change with 30 days' notice." },
          { sub: "4.3 Escrow & Payout", text: "Funds are held in escrow until the buyer confirms receipt of the item, at which point the seller is paid within 1–2 business days. Disputes must be raised within 48 hours of confirmed pickup." },
        ],
      },
      {
        num: "5", heading: "Return Policy & Disputes",
        subsections: [
          { sub: "5.1 All Sales Are Final", text: "All transactions are final unless a specific covered exception applies." },
          { sub: "5.2 Covered Disputes (48-Hour Window)", text: "A buyer may open a dispute within 48 hours of pickup if: the item is materially different from the listing; there is undisclosed significant damage; the item was not received (seller no-show); or the wrong item was received." },
          { sub: "5.3 NOT Covered", text: "The following are ineligible for refunds: change of mind; damage during buyer-arranged transport; normal wear consistent with disclosed condition; disputes raised after 48 hours; and AS-IS items." },
          { sub: "5.4 Dispute Process", text: "To open a dispute: Profile → Purchase History → Select Order → Report a Problem. Upload photos and a written description. Our team reviews within 3 business days. Decisions by furnish. are final. Appeals may be submitted within 7 days by emailing support@furnish.app." },
        ],
      },
      {
        num: "6", heading: "Third-Party Transport Services",
        body: "furnish. provides referrals to transport providers (U-Haul, Two Men and a Truck, TaskRabbit, Lugg, and others). furnish. is NOT affiliated with these providers and is NOT liable for any loss, damage, injury, or dispute arising from their services. Transport cost estimates are for informational purposes only. Always confirm pricing directly with the provider. furnish. earns a referral commission on transport bookings.",
      },
      {
        num: "7", heading: "Limitation of Liability",
        body: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, FURNISH TECHNOLOGIES, INC. SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM, ANY TRANSACTION, ITEM LOSS OR DAMAGE DURING TRANSPORT, PERSONAL INJURY DURING ITEM EXCHANGE, OR THIRD-PARTY SERVICE CONDUCT. OUR TOTAL LIABILITY SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNTS YOU PAID US IN THE PRIOR 12 MONTHS, OR (B) $100.",
        warning: true,
      },
      {
        num: "8", heading: "Indemnification",
        body: "You agree to indemnify, defend, and hold harmless Furnish Technologies, Inc. and its affiliates, officers, agents, and employees from any claims, damages, losses, liabilities, costs, and expenses (including attorneys' fees) arising from: (a) your use of the Platform; (b) your violation of these Terms; (c) your listings, purchases, or interactions with other users; or (d) your violation of any applicable law.",
      },
      {
        num: "9", heading: "Intellectual Property",
        body: "All Platform content including the furnish. name, logo, software, and design is owned by Furnish Technologies, Inc. and protected by intellectual property laws. By posting listings, you grant furnish. a non-exclusive, royalty-free, worldwide license to display your listing content for the purpose of operating and promoting the Platform.",
      },
      {
        num: "10", heading: "Governing Law & Arbitration",
        body: "These Terms are governed by the laws of the State of Delaware. ARBITRATION: You and furnish. agree to resolve disputes through binding individual arbitration under the American Arbitration Association Consumer Rules. YOU WAIVE ANY RIGHT TO A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION.",
        warning: true,
      },
      {
        num: "11", heading: "Contact",
        body: "Legal / Terms: legal@furnish.app · Privacy: privacy@furnish.app · Support: support@furnish.app · Mailing address: Furnish Technologies, Inc., 1234 Peachtree St NE, Atlanta, GA 30309",
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    icon: "🔒",
    docNumber: "PP-2026-001",
    effectiveDate: "May 26, 2026",
    color: "#3D6B8C",
    bgColor: "#F0F8FF",
    sections: [
      {
        num: "1", heading: "Introduction",
        body: "Furnish Technologies, Inc. (\"furnish.\", \"we\", \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use the furnish. app and related services. By using our Service, you consent to the practices described in this Policy.",
      },
      {
        num: "2", heading: "Information We Collect",
        subsections: [
          { sub: "2.1 Information You Provide", text: "Full name (account identity), email address (account creation, notifications), phone number (SMS verification, fraud prevention, 2FA), password — stored as a secure hash, never in plain text, profile photo (optional), payment information (processed via Stripe; we do not store full card numbers), and listing content (photos, descriptions, prices you post)." },
          { sub: "2.2 Automatically Collected", text: "Device information (type, OS, unique identifiers), location data (approximate zip code by default; GPS only with your explicit permission), usage data (features used, search queries, time spent), log data (IP address, app/browser type, error logs), and session tokens for authentication." },
          { sub: "2.3 From Third Parties", text: "Payment processors (Stripe) provide transaction confirmation data. Social login providers (Apple ID, Google) provide basic profile info if you use social sign-in. Transport partners may share booking confirmation data for order tracking." },
        ],
      },
      {
        num: "3", heading: "How We Use Your Information",
        subsections: [
          { sub: "3.1 Core Platform Operations", text: "Creating and managing your account; processing and facilitating buy/sell transactions; displaying your listings to nearby users; enabling in-app messaging; processing payments and disbursing seller funds; and facilitating transport service referrals." },
          { sub: "3.2 Safety & Trust", text: "Verifying user identity to prevent fraud; detecting and investigating prohibited activity; enforcing our Terms of Service; and complying with legal obligations and law enforcement requests." },
          { sub: "3.3 Communications", text: "Sending transaction emails and SMS notifications; dispute, offer, and message alerts; promotional emails (you may opt out at any time); and policy update announcements." },
          { sub: "3.4 Analytics & Improvement", text: "Analyzing usage patterns to improve features; A/B testing to optimize user experience; and generating aggregate, anonymized analytics that are not personally identifiable." },
        ],
      },
      {
        num: "4", heading: "Location Data",
        body: "furnish. requests location access ONLY to show you nearby listings. We do NOT share your precise location with sellers or other users — they see only your general area (city/neighborhood), never your exact GPS coordinates. You can disable location access in your device settings at any time and enter your ZIP code manually instead. We do not collect background location data unless you explicitly enable it for delivery tracking.",
        highlight: "📍 Your exact GPS location is NEVER shared with other users.",
      },
      {
        num: "5", heading: "Sharing Your Information",
        subsections: [
          { sub: "5.1 Who We Share With", text: "Other users (your public display name, profile photo, listings, and seller rating only); payment processors (name, email, payment details to complete transactions); transport partners (booking info if you book transport); analytics providers (anonymized usage data only); law enforcement (data required by valid legal process); and business successors (in event of merger or acquisition)." },
          { sub: "5.2 We Do NOT Sell Your Data", text: "furnish. does not sell, rent, or trade your personal information to third parties for their own marketing purposes. Ever. Your data is used only to operate this Platform." },
        ],
        highlight: "🔒 furnish. does NOT sell your personal data.",
      },
      {
        num: "6", heading: "Your Rights & Choices",
        subsections: [
          { sub: "6.1 All Users", text: "Access and review your personal data via Account Settings; correct inaccurate information at any time; request account and data deletion; opt out of marketing emails via the unsubscribe link; and disable location access in device settings." },
          { sub: "6.2 California Residents (CCPA)", text: "You have the right to: know what personal data is collected, used, shared, or sold; delete personal data we have collected; opt out of the sale of personal data (we do not sell data); and non-discrimination for exercising CCPA rights. To submit a CCPA request, email legal@furnish.app with subject line 'CCPA Request'." },
          { sub: "6.3 European Users (GDPR)", text: "If you are in the European Economic Area, you have rights including: access, rectification, erasure, restriction of processing, data portability, and objection. Our legal bases for processing are performance of contract, legitimate interests, and consent where applicable." },
        ],
      },
      {
        num: "7", heading: "Data Security",
        body: "We implement industry-standard security measures including: AES-256 encryption for data at rest; TLS 1.3 for all data in transit; bcrypt hashing for passwords (never stored in plain text); two-factor authentication available for all accounts; regular security audits and penetration testing; and strict employee access controls. While we take reasonable measures to protect your data, no method of transmission over the internet is 100% secure.",
      },
      {
        num: "8", heading: "Data Retention",
        body: "Active account data is retained for the duration of your account plus 30 days after a deletion request. Transaction records are kept for 7 years (tax and legal compliance). Message history is retained for 2 years from the last message. Deleted account data is anonymized and purged within 90 days of a deletion request.",
      },
      {
        num: "9", heading: "Children's Privacy",
        body: "The furnish. Platform is NOT directed at or intended for children under 18. We do not knowingly collect personal information from anyone under 18. If we learn that we have collected data from a minor, we will promptly delete it. To report a concern, contact legal@furnish.app.",
        warning: true,
      },
      {
        num: "10", heading: "Changes to This Policy",
        body: "We may update this Privacy Policy periodically. We will notify you of material changes by posting the new Policy on the Platform and sending an email notification. Continued use of the Platform after changes constitutes acceptance of the updated Policy.",
      },
      {
        num: "11", heading: "Contact Us",
        body: "Privacy questions: privacy@furnish.app · Data deletion requests: legal@furnish.app · CCPA / GDPR requests: legal@furnish.app · Mailing address: Furnish Technologies, Inc., 1234 Peachtree St NE, Atlanta, GA 30309",
      },
    ],
  },

  returns: {
    title: "Return & Dispute Policy",
    icon: "🔄",
    docNumber: "RDP-2026-001",
    effectiveDate: "May 26, 2026",
    color: "#2E7A46",
    bgColor: "#F0FAF4",
    sections: [
      {
        num: "1", heading: "Overview",
        body: "furnish. is a peer-to-peer secondhand furniture marketplace. Our policy balances seller protection (final sales) with buyer confidence (fraud and misrepresentation coverage). CORE PRINCIPLE: All sales on furnish. are FINAL — with specific, limited exceptions.",
        highlight: "All sales are FINAL with limited exceptions.",
      },
      {
        num: "2", heading: "Seller Responsibilities",
        subsections: [
          { sub: "2.1 Accurate Listings", text: "All sellers agree to: provide honest, accurate descriptions of condition, dimensions, and materials; upload clear, current photos showing all sides and any existing damage; disclose all defects, stains, repairs, missing parts, or structural issues; accurately select the condition tier; and NOT use stock or manufacturer photos." },
          { sub: "2.2 Condition Definitions", text: "Like New — no visible wear, looks and functions as new. Good — light signs of use, minor cosmetic imperfections, fully functional. Fair — noticeable wear or scuffs, all damage must be disclosed. AS-IS / For Parts — significant damage or non-functional, sold with zero returns, buyer must explicitly acknowledge." },
          { sub: "2.3 Seller Liability", text: "Sellers who misrepresent items face: mandatory refund to buyer, account suspension or permanent ban, removal of all listings, and potential fraud liability." },
        ],
      },
      {
        num: "3", heading: "Buyer Protections",
        body: "Buyers may open a dispute within 48 hours of item pickup or delivery for: (a) item materially different from listing description; (b) undisclosed major damage; (c) item not received (seller no-show); (d) wrong item received; or (e) item non-functional and not disclosed. Required evidence: photos and written description of the issue.",
      },
      {
        num: "4", heading: "Non-Refundable Situations",
        body: "The following will NOT result in a refund: change of mind after purchase; item fits the disclosed condition description; buyer inspected item at pickup and did not raise issues; damage caused during buyer-arranged transport; normal wear consistent with disclosed condition; disputes filed after the 48-hour window; AS-IS items; and size issues when accurate measurements were provided.",
        warning: true,
      },
      {
        num: "5", heading: "Transport Disclaimer",
        body: "furnish. is NOT responsible for items damaged or lost during transport. If you use U-Haul, Two Men and a Truck, TaskRabbit, Lugg, or any other mover, any damage or loss is solely between you and that provider. STRONGLY RECOMMENDED: photograph the item before loading and purchase moving insurance from your transport provider. furnish. earns a referral commission on transport bookings. This does NOT create any responsibility for furnish. regarding the transport itself.",
        warning: true,
      },
      {
        num: "6", heading: "Dispute Process",
        body: "Step 1: Go to Profile → Purchase History → Select Order → Report a Problem (within 48 hrs of pickup). Step 2: Select dispute reason from the dropdown. Step 3: Upload photos/video evidence and a written description (within 24 hrs of opening). Step 4: Seller is notified and given 24 hrs to respond. Step 5: furnish. reviews evidence from both parties (1–3 business days). Step 6: Decision issued; funds released or refunded within 24 hrs of decision.",
      },
      {
        num: "7", heading: "Refund Processing",
        body: "Disputes resolved in buyer's favor: 3–5 business days to original payment method. Partial refunds: 3–5 business days. Seller-initiated voluntary refunds: 2–3 business days. Platform fees (seller transaction fee, buyer service fee) are non-refundable in all cases except verified fraud or platform error.",
      },
      {
        num: "8", heading: "Appeals",
        body: "If you disagree with a dispute decision, you may appeal once within 7 days of the decision by emailing support@furnish.app with subject line 'Dispute Appeal — [Order #]'. Include any new evidence not previously submitted. Appeal decisions are final. For disputes involving amounts over $500, either party may elect binding arbitration under AAA Consumer Rules.",
      },
    ],
  },
};

const LegalDocViewer = ({ doc, onBack }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const d = LEGAL_DOCS[doc];
  if (!d) return null;

  return (
    <div style={{minHeight:"100vh",background:"#F8F3EC"}}>
      {/* Sticky header */}
      <div style={{background:"white",padding:"0",position:"sticky",top:0,zIndex:50,boxShadow:"0 2px 8px rgba(60,30,10,0.08)"}}>
        {/* Color band */}
        <div style={{background:`linear-gradient(135deg, ${d.color}, ${d.color}CC)`,padding:"16px 20px 14px",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.4)",borderRadius:10,width:34,height:34,cursor:"pointer",fontSize:18,color:"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>‹</button>
          <span style={{fontSize:26}}>{d.icon}</span>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900,color:"white"}}>{d.title}</div>
            <div style={{fontFamily:"sans-serif",fontSize:11,color:"rgba(255,255,255,0.75)"}}>Doc #{d.docNumber} · Effective {d.effectiveDate}</div>
          </div>
        </div>
        {/* Disclaimer banner */}
        <div style={{background:"#FFF8E6",padding:"10px 18px",display:"flex",gap:8,alignItems:"flex-start",borderBottom:"1px solid #F0D890"}}>
          <span style={{fontSize:16,flexShrink:0}}>⚠️</span>
          <div style={{fontFamily:"sans-serif",fontSize:11,color:"#7A5A10",lineHeight:1.5}}>This is a summary for informational purposes only. Consult a licensed attorney before launching commercially. Full legal document available at <strong>furnish.app/legal</strong></div>
        </div>
      </div>

      {/* Table of contents */}
      <div style={{background:"white",margin:"12px 16px 0",borderRadius:14,overflow:"hidden",border:"1px solid #EDE8E0"}}>
        <div style={{padding:"12px 16px 8px",borderBottom:"1px solid #F5EDE4"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:"#2C1810"}}>Table of Contents</div>
        </div>
        <div style={{padding:"6px 0"}}>
          {d.sections.map((sec,i)=>(
            <div key={i} onClick={()=>setExpandedSection(expandedSection===i?null:i)} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 16px",cursor:"pointer",borderBottom:i<d.sections.length-1?"1px solid #FAF5F0":"none"}}
              onMouseEnter={e=>e.currentTarget.style.background="#FAF3EC"}
              onMouseLeave={e=>e.currentTarget.style.background=""}>
              <div style={{width:24,height:24,background:d.color+"18",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontFamily:"sans-serif",fontSize:10,fontWeight:700,color:d.color}}>{sec.num}</span>
              </div>
              <div style={{flex:1,fontFamily:"sans-serif",fontSize:13,color:"#2C1810",fontWeight:expandedSection===i?700:400}}>{sec.heading}</div>
              <span style={{color:d.color,fontSize:14,transition:"transform 0.2s",transform:expandedSection===i?"rotate(90deg)":"rotate(0deg)"}}>›</span>
            </div>
          ))}
        </div>
      </div>

      {/* Full sections */}
      <div style={{padding:"14px 16px 100px",display:"flex",flexDirection:"column",gap:10}}>
        {d.sections.map((sec,i)=>(
          <div key={i} style={{background:"white",borderRadius:14,overflow:"hidden",border:`1px solid ${expandedSection===i?d.color+"50":"#EDE8E0"}`,transition:"border-color 0.2s",boxShadow:expandedSection===i?`0 4px 16px ${d.color}18`:"none"}}>
            {/* Section header */}
            <div onClick={()=>setExpandedSection(expandedSection===i?null:i)} style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",background:expandedSection===i?d.bgColor:"white",transition:"background 0.2s"}}>
              <div style={{width:32,height:32,background:expandedSection===i?d.color:d.color+"18",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background 0.2s"}}>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:expandedSection===i?"white":d.color}}>{sec.num}</span>
              </div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#2C1810",flex:1}}>{sec.heading}</div>
              <span style={{color:d.color,fontSize:18,fontWeight:300,transition:"transform 0.2s",transform:expandedSection===i?"rotate(90deg)":"none"}}>›</span>
            </div>

            {/* Section body */}
            {expandedSection===i&&(
              <div style={{padding:"0 16px 16px",borderTop:`1px solid ${d.color}20`}}>
                {/* Highlight badge */}
                {sec.highlight&&(
                  <div style={{background:d.color+"14",borderLeft:`3px solid ${d.color}`,borderRadius:"0 8px 8px 0",padding:"8px 12px",margin:"12px 0",fontFamily:"sans-serif",fontSize:12,fontWeight:700,color:d.color}}>
                    {sec.highlight}
                  </div>
                )}
                {/* Warning box */}
                {sec.warning&&!sec.highlight&&(
                  <div style={{background:"#FFF5E6",border:"1px solid #F0C870",borderRadius:10,padding:"10px 12px",margin:"12px 0",fontFamily:"sans-serif",fontSize:12,color:"#7A5A10",lineHeight:1.5}}>
                    ⚠️ Please read this section carefully.
                  </div>
                )}
                {/* Main body paragraph */}
                {sec.body&&(
                  <p style={{fontFamily:"sans-serif",fontSize:13,color:"#3C2810",lineHeight:1.75,margin:"12px 0 0"}}>{sec.body}</p>
                )}
                {/* Subsections */}
                {sec.subsections&&sec.subsections.map((sub,j)=>(
                  <div key={j} style={{marginTop:14,background:"#FAF5F0",borderRadius:10,padding:"12px 14px"}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:d.color,marginBottom:5}}>{sub.sub}</div>
                    <div style={{fontFamily:"sans-serif",fontSize:13,color:"#3C2810",lineHeight:1.7}}>{sub.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Footer */}
        <div style={{background:"white",borderRadius:14,padding:"16px",border:"1px solid #EDE8E0",textAlign:"center"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:6}}>Need Help?</div>
          <div style={{fontFamily:"sans-serif",fontSize:12,color:"#A08070",lineHeight:1.6,marginBottom:12}}>Questions about this document? Our legal team is here to help.</div>
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            <div style={{background:d.bgColor,border:`1px solid ${d.color}30`,borderRadius:20,padding:"5px 14px",fontFamily:"sans-serif",fontSize:12,color:d.color,fontWeight:600}}>📧 legal@furnish.app</div>
            <div style={{background:"#F5EDE4",border:"1px solid #D4A882",borderRadius:20,padding:"5px 14px",fontFamily:"sans-serif",fontSize:12,color:"#8B4513",fontWeight:600}}>🌐 furnish.app/legal</div>
          </div>
          <div style={{fontFamily:"sans-serif",fontSize:10,color:"#C0A890",marginTop:12}}>Document #{d.docNumber} · Last updated {d.effectiveDate}</div>
        </div>
      </div>
    </div>
  );
};

const SettingsPage = ({ onBack }) => {
  const [notifs, setNotifs]     = useState({ messages:true,  offers:true,   sold:true,  newNearby:false, marketing:false, priceDrops:true });
  const [privacy, setPrivacy]   = useState({ showLocation:true, showPhone:false, publicProfile:true });
  const [payment, setPayment]   = useState({ method:"Bank Account •••• 4821", autoPayouts:true });
  const [saved, setSaved]       = useState(false);
  const [section, setSection]   = useState("main"); // main|notifs|privacy|payment|account|shipping|accountEdit|tos|privacyPolicy|returns

  const toggle = (state, setState, key) => setState(s=>({...s,[key]:!s[key]}));

  const ToggleRow = ({ label, sub, value, onChange, icon }) => (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 0",borderBottom:"1px solid #F5EDE4"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {icon&&<span style={{fontSize:18,width:26,textAlign:"center"}}>{icon}</span>}
        <div>
          <div style={{fontFamily:"sans-serif",fontSize:14,fontWeight:600,color:"#2C1810"}}>{label}</div>
          {sub&&<div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070",marginTop:1}}>{sub}</div>}
        </div>
      </div>
      <div onClick={onChange} style={{width:44,height:24,background:value?"#8B4513":"#DDD0C8",borderRadius:12,cursor:"pointer",position:"relative",transition:"background 0.2s",flexShrink:0}}>
        <div style={{width:20,height:20,background:"white",borderRadius:"50%",position:"absolute",top:2,left:value?22:2,transition:"left 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/>
      </div>
    </div>
  );

  const NavRow = ({ icon, label, sub, onClick, danger=false }) => (
    <div onClick={onClick} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 0",borderBottom:"1px solid #F5EDE4",cursor:"pointer"}}
      onMouseEnter={e=>e.currentTarget.style.background="#FDFAF7"}
      onMouseLeave={e=>e.currentTarget.style.background=""}>
      <div style={{width:36,height:36,background:danger?"#FEF0EF":"#F5EDE4",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{icon}</div>
      <div style={{flex:1}}>
        <div style={{fontFamily:"sans-serif",fontSize:14,fontWeight:600,color:danger?"#C46A3A":"#2C1810"}}>{label}</div>
        {sub&&<div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070",marginTop:1}}>{sub}</div>}
      </div>
      {!danger&&<span style={{color:"#C0A890",fontSize:18}}>›</span>}
    </div>
  );

  const SubPage = ({ title, children }) => (
    <div style={{minHeight:"100vh",background:"#F8F3EC"}}>
      <div style={{background:"white",padding:"18px 20px 14px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid #EDE8E0",position:"sticky",top:0,zIndex:10}}>
        <button onClick={()=>setSection("main")} style={{background:"#F5EDE4",border:"none",borderRadius:10,width:34,height:34,cursor:"pointer",fontSize:18,color:"#8B4513",display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:800,color:"#2C1810"}}>{title}</div>
      </div>
      <div style={{padding:"16px 20px"}}>{children}</div>
    </div>
  );

  if (section==="notifs") return (
    <SubPage title="Notifications">
      <div style={{background:"white",borderRadius:16,padding:"4px 16px",border:"1px solid #EDE8E0"}}>
        <ToggleRow label="New Messages"     sub="When a buyer or seller messages you"     icon="💬" value={notifs.messages}   onChange={()=>toggle(notifs,setNotifs,"messages")}/>
        <ToggleRow label="Offers Received"  sub="When someone makes an offer on your item" icon="🤝" value={notifs.offers}     onChange={()=>toggle(notifs,setNotifs,"offers")}/>
        <ToggleRow label="Item Sold"        sub="Confirmation when your listing sells"      icon="✅" value={notifs.sold}       onChange={()=>toggle(notifs,setNotifs,"sold")}/>
        <ToggleRow label="New Nearby Items" sub="Fresh listings within 5 miles"            icon="📍" value={notifs.newNearby}  onChange={()=>toggle(notifs,setNotifs,"newNearby")}/>
        <ToggleRow label="Price Drops"      sub="When a liked item drops in price"          icon="💰" value={notifs.priceDrops} onChange={()=>toggle(notifs,setNotifs,"priceDrops")}/>
        <ToggleRow label="Marketing Emails" sub="Tips, features, and local deals"          icon="📧" value={notifs.marketing}  onChange={()=>toggle(notifs,setNotifs,"marketing")}/>
      </div>
    </SubPage>
  );

  if (section==="privacy") return (
    <SubPage title="Privacy & Safety">
      <div style={{background:"white",borderRadius:16,padding:"4px 16px",marginBottom:16,border:"1px solid #EDE8E0"}}>
        <ToggleRow label="Show General Location"  sub="Buyers see your city/neighborhood only"   icon="📍" value={privacy.showLocation}   onChange={()=>toggle(privacy,setPrivacy,"showLocation")}/>
        <ToggleRow label="Public Profile"         sub="Anyone can view your listings & reviews"  icon="👤" value={privacy.publicProfile}   onChange={()=>toggle(privacy,setPrivacy,"publicProfile")}/>
        <ToggleRow label="Show Phone to Buyers"   sub="Only shown after a confirmed transaction"  icon="📱" value={privacy.showPhone}       onChange={()=>toggle(privacy,setPrivacy,"showPhone")}/>
      </div>
      <div style={{background:"#FEF5E4",borderRadius:12,padding:"12px 14px",fontFamily:"sans-serif",fontSize:12,color:"#8A6A3A",lineHeight:1.6,border:"1px solid #F0D8A0"}}>
        🔒 Your exact GPS location is <strong>never</strong> shared with other users. Sellers and buyers only see your general neighborhood.
      </div>
    </SubPage>
  );

  if (section==="payment") return (
    <SubPage title="Payment Settings">
      {/* Saved payment methods */}
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:8}}>Payout Method</div>
      <div style={{background:"white",borderRadius:16,padding:"14px 16px",marginBottom:14,border:"1px solid #EDE8E0"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,background:"#F5EDE4",borderRadius:12,padding:"12px 14px",marginBottom:10}}>
          <span style={{fontSize:24}}>🏦</span>
          <div style={{flex:1}}>
            <div style={{fontFamily:"sans-serif",fontSize:13,fontWeight:700,color:"#2C1810"}}>{payment.method}</div>
            <div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070"}}>Primary payout account · Verified ✓</div>
          </div>
          <span style={{background:"#4CAF8A20",color:"#3A9A6A",fontSize:11,fontFamily:"sans-serif",fontWeight:700,padding:"3px 8px",borderRadius:8}}>Active</span>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button style={{flex:1,background:"#F5EDE4",color:"#8B4513",border:"1.5px solid #D4A882",borderRadius:10,padding:"9px",fontFamily:"sans-serif",fontSize:12,fontWeight:600,cursor:"pointer"}}>Edit Bank Details</button>
          <button style={{flex:1,background:"#F5EDE4",color:"#8B4513",border:"1.5px dashed #D4A882",borderRadius:10,padding:"9px",fontFamily:"sans-serif",fontSize:12,fontWeight:600,cursor:"pointer"}}>+ Add Method</button>
        </div>
      </div>
      {/* Saved cards for buying */}
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:8}}>Saved Payment Cards</div>
      <div style={{background:"white",borderRadius:16,padding:"14px 16px",marginBottom:14,border:"1px solid #EDE8E0"}}>
        {[{brand:"Visa",last4:"4242",exp:"08/27",icon:"💳"},{brand:"Mastercard",last4:"5678",exp:"12/25",icon:"💳"}].map(card=>(
          <div key={card.last4} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid #F5EDE4"}}>
            <span style={{fontSize:22}}>{card.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontFamily:"sans-serif",fontSize:13,fontWeight:600,color:"#2C1810"}}>{card.brand} •••• {card.last4}</div>
              <div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070"}}>Expires {card.exp}</div>
            </div>
            <button style={{background:"#FEF0EF",color:"#C46A3A",border:"none",borderRadius:8,padding:"4px 10px",fontFamily:"sans-serif",fontSize:11,fontWeight:600,cursor:"pointer"}}>Remove</button>
          </div>
        ))}
        <button style={{width:"100%",marginTop:10,background:"#F5EDE4",color:"#8B4513",border:"1.5px dashed #D4A882",borderRadius:10,padding:"10px",fontFamily:"sans-serif",fontSize:12,fontWeight:600,cursor:"pointer"}}>+ Add New Card</button>
      </div>
      {/* Payout preferences */}
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:8}}>Payout Preferences</div>
      <div style={{background:"white",borderRadius:16,padding:"4px 16px",marginBottom:14,border:"1px solid #EDE8E0"}}>
        <ToggleRow label="Automatic Payouts"  sub="Released 24h after buyer confirms receipt" icon="⚡" value={payment.autoPayouts} onChange={()=>toggle(payment,setPayment,"autoPayouts")}/>
        <ToggleRow label="Instant Pay (1.5% fee)" sub="Get paid within minutes instead of 1–2 days" icon="🚀" value={false} onChange={()=>{}}/>
      </div>
      {/* Fee breakdown */}
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:8}}>Fee Breakdown</div>
      <div style={{background:"white",borderRadius:16,padding:"14px 16px",border:"1px solid #EDE8E0"}}>
        {[
          ["Listing Fee",            "Always free"],
          ["Seller Transaction Fee", "8% of sale price"],
          ["Buyer Service Fee",      "3% (charged to buyer)"],
          ["Payment Processing",     "2.9% + $0.30 per txn"],
          ["Standard Payout",        "1–2 business days"],
          ["Instant Pay",            "Minutes (1.5% fee)"],
        ].map(([k,v])=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #F5EDE4"}}>
            <span style={{fontFamily:"sans-serif",fontSize:13,color:"#6B4C3A"}}>{k}</span>
            <span style={{fontFamily:"sans-serif",fontSize:13,fontWeight:600,color:"#2C1810"}}>{v}</span>
          </div>
        ))}
      </div>
    </SubPage>
  );

  if (section==="shipping") return (
    <SubPage title="Shipping Settings">
      <div style={{background:"#FFF8E6",borderRadius:12,padding:"12px 14px",marginBottom:16,border:"1px solid #F0D890",fontFamily:"sans-serif",fontSize:12,color:"#7A6020",lineHeight:1.6}}>
        📦 furnish. is primarily a local pickup marketplace. Shipping lets you reach buyers outside your city.
      </div>
      {/* Offer shipping toggle */}
      <div style={{background:"white",borderRadius:16,padding:"4px 16px",marginBottom:14,border:"1px solid #EDE8E0"}}>
        <ToggleRow label="Offer Shipping on Listings" sub="Let buyers outside your area purchase items" icon="📦" value={true} onChange={()=>{}}/>
        <ToggleRow label="Free Shipping Option"       sub="Absorb shipping cost to attract more buyers"  icon="🎁" value={false} onChange={()=>{}}/>
        <ToggleRow label="Shipping Insurance"         sub="Auto-add insurance on shipments over $100"    icon="🛡️" value={true} onChange={()=>{}}/>
      </div>
      {/* Default from address */}
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:8}}>From Address</div>
      <div style={{background:"white",borderRadius:16,padding:"14px 16px",marginBottom:14,border:"1px solid #EDE8E0"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
          <span style={{fontSize:20}}>📍</span>
          <div style={{flex:1}}>
            <div style={{fontFamily:"sans-serif",fontSize:13,fontWeight:600,color:"#2C1810"}}>Jordan Smith</div>
            <div style={{fontFamily:"sans-serif",fontSize:12,color:"#A08070"}}>1234 Peachtree St NE, Atlanta, GA 30309</div>
          </div>
          <button style={{background:"#F5EDE4",color:"#8B4513",border:"none",borderRadius:8,padding:"5px 10px",fontFamily:"sans-serif",fontSize:11,fontWeight:700,cursor:"pointer"}}>Edit</button>
        </div>
        <button style={{width:"100%",background:"#F5EDE4",color:"#8B4513",border:"1.5px dashed #D4A882",borderRadius:10,padding:"9px",fontFamily:"sans-serif",fontSize:12,fontWeight:600,cursor:"pointer"}}>+ Add Another Address</button>
      </div>
      {/* Carriers */}
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:8}}>Preferred Carriers</div>
      <div style={{background:"white",borderRadius:16,padding:"4px 16px",marginBottom:14,border:"1px solid #EDE8E0"}}>
        {[{icon:"📬",name:"USPS",  sub:"Best for small items under 70 lbs",   active:true},
          {icon:"📦",name:"UPS",   sub:"Reliable for furniture & large items",  active:true},
          {icon:"🚚",name:"FedEx", sub:"Fast shipping, wide coverage",          active:false},
          {icon:"🏠",name:"Curbside Pickup",sub:"Local buyers collect in person",active:true}
        ].map(c=>(
          <div key={c.name} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:"1px solid #F5EDE4"}}>
            <span style={{fontSize:20}}>{c.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontFamily:"sans-serif",fontSize:13,fontWeight:600,color:"#2C1810"}}>{c.name}</div>
              <div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070"}}>{c.sub}</div>
            </div>
            <div onClick={()=>{}} style={{width:40,height:22,background:c.active?"#8B4513":"#DDD0C8",borderRadius:11,cursor:"pointer",position:"relative",transition:"background 0.2s",flexShrink:0}}>
              <div style={{width:18,height:18,background:"white",borderRadius:"50%",position:"absolute",top:2,left:c.active?20:2,transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/>
            </div>
          </div>
        ))}
      </div>
      {/* Packaging */}
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:8}}>Packaging Defaults</div>
      <div style={{background:"white",borderRadius:16,padding:"14px 16px",border:"1px solid #EDE8E0"}}>
        {[["Default box size","Medium (18×12×8 in)"],["Weight unit","lbs"],["Handling time","1–2 business days"],["Returns accepted","Within 48 hrs (item not as described)"]].map(([k,v])=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #F5EDE4"}}>
            <span style={{fontFamily:"sans-serif",fontSize:13,color:"#6B4C3A"}}>{k}</span>
            <span style={{fontFamily:"sans-serif",fontSize:12,fontWeight:600,color:"#2C1810"}}>{v}</span>
          </div>
        ))}
      </div>
    </SubPage>
  );

  if (section==="account") return (
    <SubPage title="Account Details">
      <AccountEditForm onSave={()=>setSection("main")}/>
    </SubPage>
  );

  if (section==="tos")           return <LegalDocViewer doc="tos"     onBack={()=>setSection("main")}/>;
  if (section==="privacyPolicy") return <LegalDocViewer doc="privacy" onBack={()=>setSection("main")}/>;
  if (section==="returns")       return <LegalDocViewer doc="returns" onBack={()=>setSection("main")}/>;

  // Main settings menu
  return (
    <div style={{minHeight:"100vh",background:"#F8F3EC"}}>
      <div style={{background:"white",padding:"18px 20px 14px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid #EDE8E0",position:"sticky",top:0,zIndex:10}}>
        <button onClick={onBack} style={{background:"#F5EDE4",border:"none",borderRadius:10,width:34,height:34,cursor:"pointer",fontSize:18,color:"#8B4513",display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:800,color:"#2C1810"}}>Settings</div>
      </div>
      <div style={{padding:"16px 20px 100px"}}>
        <div style={{background:"white",borderRadius:16,padding:"4px 16px",marginBottom:14,border:"1px solid #EDE8E0"}}>
          <NavRow icon="👤" label="Account Details"   sub="Name, username, email, phone, DOB"  onClick={()=>setSection("account")}/>
          <NavRow icon="💳" label="Payment Settings"  sub="Cards, bank account, payouts"       onClick={()=>setSection("payment")}/>
          <NavRow icon="📦" label="Shipping Settings" sub="Carriers, addresses, preferences"   onClick={()=>setSection("shipping")}/>
          <NavRow icon="🔔" label="Notifications"     sub="Messages, offers, price drops"      onClick={()=>setSection("notifs")}/>
          <NavRow icon="🔒" label="Privacy & Safety"  sub="Location, profile visibility"       onClick={()=>setSection("privacy")}/>
        </div>
        <div style={{background:"white",borderRadius:16,padding:"4px 16px",marginBottom:14,border:"1px solid #EDE8E0"}}>
          <NavRow icon="📋" label="Terms of Service"  sub="furnish. user agreement · TOS-2026-001"       onClick={()=>setSection("tos")}/>
          <NavRow icon="🔏" label="Privacy Policy"    sub="How we collect & protect your data · PP-2026-001"  onClick={()=>setSection("privacyPolicy")}/>
          <NavRow icon="🔄" label="Return & Dispute Policy" sub="Buyer & seller protections · RDP-2026-001"    onClick={()=>setSection("returns")}/>
          <NavRow icon="💬" label="Help & Support"    sub="Chat with us · FAQ"                 onClick={()=>{}}/>
          <NavRow icon="⭐" label="Rate the App"      sub="Leave a review on the App Store"    onClick={()=>{}}/>
        </div>
        <div style={{background:"white",borderRadius:16,padding:"4px 16px",border:"1px solid #EDE8E0"}}>
          <NavRow icon="🚪" label="Sign Out" onClick={()=>{}} danger/>
        </div>
        <div style={{textAlign:"center",marginTop:20,fontFamily:"sans-serif",fontSize:11,color:"#C0A890"}}>
          furnish. v1.0.0 · Atlanta, GA · legal@furnish.app
        </div>
      </div>
      {saved&&<div style={{position:"fixed",bottom:90,left:"50%",transform:"translateX(-50%)",background:"#4CAF8A",color:"white",borderRadius:20,padding:"10px 24px",fontFamily:"sans-serif",fontSize:13,fontWeight:700,boxShadow:"0 4px 16px rgba(76,175,138,0.4)"}}>✓ Settings saved</div>}
    </div>
  );
};

// ─── EARNINGS DASHBOARD ───────────────────────────────────────────
const EarningsDashboard = ({ onBack }) => {
  const [period, setPeriod] = useState("month");
  const totalEarned     = PROFILE_SOLD.reduce((s,i)=>s+i.price,0);
  const totalFees       = Math.round(totalEarned * 0.08);
  const netEarned       = totalEarned - totalFees;
  const pending         = 87;
  const maxBar          = Math.max(...EARNINGS_MONTHLY.map(m=>m.amount));

  return (
    <div style={{minHeight:"100vh",background:"#F8F3EC"}}>
      <div style={{background:"white",padding:"18px 20px 14px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid #EDE8E0",position:"sticky",top:0,zIndex:10}}>
        <button onClick={onBack} style={{background:"#F5EDE4",border:"none",borderRadius:10,width:34,height:34,cursor:"pointer",fontSize:18,color:"#8B4513",display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:800,color:"#2C1810"}}>Earnings & Payouts</div>
      </div>
      <div style={{padding:"16px 20px 100px"}}>

        {/* Hero balance */}
        <div style={{background:"linear-gradient(135deg,#2C1810,#8B4513)",borderRadius:20,padding:"24px",marginBottom:16,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",right:-20,top:-20,fontSize:80,opacity:0.08}}>💰</div>
          <div style={{fontFamily:"sans-serif",fontSize:12,color:"rgba(255,255,255,0.65)",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Net Earnings (All Time)</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:48,fontWeight:700,color:"white",lineHeight:1}}>${netEarned.toLocaleString()}</div>
          <div style={{display:"flex",gap:16,marginTop:16}}>
            {[["Gross Sales","$"+totalEarned],["Fees Paid","$"+totalFees],["Pending","$"+pending]].map(([label,val])=>(
              <div key={label}>
                <div style={{fontFamily:"sans-serif",fontSize:10,color:"rgba(255,255,255,0.55)",textTransform:"uppercase",letterSpacing:0.5}}>{label}</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700,color:"rgba(255,255,255,0.9)",marginTop:2}}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending payout banner */}
        {pending>0&&(
          <div style={{background:"#FFF8E6",borderRadius:14,padding:"14px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:12,border:"1.5px solid #F0D890"}}>
            <span style={{fontSize:24}}>⏳</span>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#5C4A10"}}>Pending Payout</div>
              <div style={{fontFamily:"sans-serif",fontSize:12,color:"#8A7A3A"}}>Releases to your bank in ~18 hours</div>
            </div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"#8B6A10"}}>${pending}</div>
          </div>
        )}

        {/* Earnings chart */}
        <div style={{background:"white",borderRadius:16,padding:"16px",marginBottom:14,border:"1px solid #EDE8E0"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#2C1810"}}>Monthly Earnings</div>
          </div>
          <div style={{display:"flex",alignItems:"flex-end",gap:8,height:100}}>
            {EARNINGS_MONTHLY.map((m,i)=>{
              const h = maxBar>0?Math.round((m.amount/maxBar)*100):0;
              const isLast = i===EARNINGS_MONTHLY.length-1;
              return (
                <div key={m.month} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  {m.amount>0&&<div style={{fontFamily:"sans-serif",fontSize:8,color:"#8B4513",fontWeight:700}}>${m.amount}</div>}
                  <div style={{width:"100%",background:isLast?"#8B4513":m.amount>0?"#D4A882":"#F0E8DC",borderRadius:"4px 4px 0 0",height:`${Math.max(h,4)}%`,transition:"height 0.4s",minHeight:4}}/>
                  <div style={{fontFamily:"sans-serif",fontSize:9,color:isLast?"#8B4513":"#A08070",fontWeight:isLast?700:400}}>{m.month}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats grid */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          {[
            {icon:"📦",label:"Items Sold",    val:PROFILE_SOLD.length,  sub:"all time"},
            {icon:"⭐",label:"Avg Rating",    val:"4.9★",               sub:"34 reviews"},
            {icon:"⚡",label:"Avg Sell Time", val:"3.2 days",            sub:"listing to sale"},
            {icon:"💬",label:"Response Rate", val:"98%",                 sub:"within 2 hrs"},
          ].map(s=>(
            <div key={s.label} style={{background:"white",borderRadius:14,padding:"14px",border:"1px solid #EDE8E0"}}>
              <div style={{fontSize:22,marginBottom:4}}>{s.icon}</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:700,color:"#2C1810"}}>{s.val}</div>
              <div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070",marginTop:1}}>{s.label}</div>
              <div style={{fontFamily:"sans-serif",fontSize:10,color:"#C0A890"}}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Transaction history */}
        <div style={{background:"white",borderRadius:16,padding:"14px 16px",border:"1px solid #EDE8E0"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#2C1810",marginBottom:14}}>Transaction History</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {PROFILE_SOLD.map(item=>(
              <div key={item.id} style={{display:"flex",alignItems:"center",gap:12,paddingBottom:10,borderBottom:"1px solid #F5EDE4"}}>
                <div style={{width:44,height:44,borderRadius:10,overflow:"hidden",flexShrink:0}}>
                  <FurnitureIllustration type={item.img} small/>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:"#2C1810",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.title}</div>
                  <div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070"}}>{item.soldDate} · Sold for ${item.price}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"#4CAF8A"}}>+${item.earnings}</div>
                  <div style={{fontFamily:"sans-serif",fontSize:9,color:"#B0A090"}}>after fees</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:"#F8F3EC",borderRadius:10,padding:"10px 14px",marginTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810"}}>Net Total</span>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"#8B4513"}}>${PROFILE_SOLD.reduce((s,i)=>s+i.earnings,0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── PROFILE TAB ─────────────────────────────────────────────────
const ProfileTab = () => {
  const [activeSection, setActiveSection] = useState("shop");
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [following, setFollowing] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState(PROFILE_USER.bio);
  const [expandReviews, setExpandReviews] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showEarnings, setShowEarnings] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({ name:PROFILE_USER.name, username:PROFILE_USER.handle, photo:null });
  const u = PROFILE_USER;

  if (showSettings) return <SettingsPage onBack={()=>setShowSettings(false)}/>;
  if (showEarnings) return <EarningsDashboard onBack={()=>setShowEarnings(false)}/>;

  const tabs = [
    { id:"shop",      label:"Shop",      icon:"🛋️", count:PROFILE_LISTINGS_ACTIVE.length },
    { id:"sold",      label:"Sold",      icon:"✓",  count:PROFILE_SOLD.length },
    { id:"purchases", label:"Purchases", icon:"🛍️", count:PROFILE_PURCHASES.length },
    { id:"likes",     label:"Likes",     icon:"♡",  count:PROFILE_LIKES.length },
  ];

  return (
    <div style={{paddingBottom:100}}>

      {/* Cover + Avatar */}
      <div style={{position:"relative",marginBottom:56}}>
        <div style={{height:130,background:"linear-gradient(135deg,#2C1810 0%,#8B4513 60%,#C4703A 100%)",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,opacity:0.07,backgroundImage:"repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 20px)",backgroundSize:"20px 20px"}}/>
          {/* Settings gear */}
          <button onClick={()=>setShowSettings(true)} style={{position:"absolute",top:12,right:14,background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.35)",borderRadius:20,padding:"5px 12px",color:"white",fontFamily:"sans-serif",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
            ⚙️ Settings
          </button>
        </div>
        <div style={{position:"absolute",bottom:-44,left:20}}>
          <div style={{position:"relative",width:88,height:88}}>
            <div onClick={()=>setPhotoUploaded(!photoUploaded)} style={{width:88,height:88,borderRadius:"50%",border:"4px solid white",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(60,30,10,0.2)",overflow:"hidden",cursor:"pointer",background:photoUploaded?"#C4883A":"linear-gradient(135deg,#8B4513,#C4703A)"}}>
              {photoUploaded
                ? <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>😊</div>
                : <span style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:28,color:"white"}}>JS</span>
              }
            </div>
            <div onClick={()=>setPhotoUploaded(!photoUploaded)} style={{position:"absolute",bottom:2,right:2,width:26,height:26,background:"#8B4513",borderRadius:"50%",border:"2px solid white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:13}}>📷</div>
          </div>
        </div>
        <div style={{position:"absolute",bottom:-40,right:18,display:"flex",gap:8}}>
          <button onClick={()=>setShowEarnings(true)} style={{background:"#F5EDE4",color:"#8B4513",border:"1.5px solid #D4A882",borderRadius:20,padding:"7px 14px",fontFamily:"'Playfair Display',serif",fontSize:12,fontWeight:700,cursor:"pointer"}}>💰 Earnings</button>
          <button onClick={()=>setShowEditProfile(true)} style={{background:"#8B4513",color:"white",border:"none",borderRadius:20,padding:"7px 14px",fontFamily:"'Playfair Display',serif",fontSize:12,fontWeight:700,cursor:"pointer"}}>✏️ Edit Profile</button>
        </div>
      </div>

      {/* Name + info */}
      <div style={{padding:"0 20px 16px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:"#2C1810"}}>{u.name}</div>
          {u.verified&&<span style={{background:"#8B4513",color:"white",fontSize:10,padding:"2px 7px",borderRadius:10,fontFamily:"sans-serif",fontWeight:700}}>✓ Verified</span>}
        </div>
        <div style={{color:"#A08070",fontSize:13,fontFamily:"sans-serif",marginBottom:4}}>{u.handle} · 📍 {u.location}</div>
        <div style={{color:"#B0A090",fontSize:11,fontFamily:"sans-serif",marginBottom:10}}>Member since {u.joinedDate}</div>

        {editingBio ? (
          <div style={{marginBottom:12}}>
            <textarea value={bio} onChange={e=>setBio(e.target.value)} style={{width:"100%",border:"1.5px solid #D4A882",borderRadius:10,padding:"10px 12px",fontFamily:"sans-serif",fontSize:13,color:"#2C1810",resize:"none",outline:"none",boxSizing:"border-box"}} rows={3}/>
            <div style={{display:"flex",gap:8,marginTop:4}}>
              <button onClick={()=>setEditingBio(false)} style={{background:"#8B4513",color:"white",border:"none",borderRadius:8,padding:"6px 16px",fontFamily:"sans-serif",fontSize:12,fontWeight:700,cursor:"pointer"}}>Save</button>
              <button onClick={()=>setEditingBio(false)} style={{background:"#F5EDE4",color:"#8B4513",border:"none",borderRadius:8,padding:"6px 14px",fontFamily:"sans-serif",fontSize:12,cursor:"pointer"}}>Cancel</button>
            </div>
          </div>
        ) : (
          <div style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:12}}>
            <div style={{fontFamily:"sans-serif",fontSize:13,color:"#5C4A3A",lineHeight:1.6,flex:1}}>{bio}</div>
            <span onClick={()=>setEditingBio(true)} style={{fontSize:15,cursor:"pointer",flexShrink:0,marginTop:2}}>✏️</span>
          </div>
        )}

        {/* Rating */}
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
          <StarRating rating={u.rating}/>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"#8B4513"}}>{u.rating}</span>
          <span style={{color:"#A08070",fontFamily:"sans-serif",fontSize:13}}>({u.reviewCount} reviews)</span>
        </div>

        {/* Stats bar */}
        <div style={{display:"flex",background:"#F8F3EC",borderRadius:14,overflow:"hidden",border:"1px solid #EDE8E0",marginBottom:14}}>
          {[{label:"Followers",val:u.followers},{label:"Following",val:u.following},{label:"Listings",val:u.stats.active},{label:"Sold",val:u.stats.sold}].map((s,i)=>(
            <div key={s.label} style={{flex:1,padding:"12px 4px",textAlign:"center",borderRight:i<3?"1px solid #EDE8E0":"none",cursor:"pointer"}}
              onMouseEnter={e=>e.currentTarget.style.background="#F0E8DC"}
              onMouseLeave={e=>e.currentTarget.style.background=""}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"#2C1810"}}>{s.val}</div>
              <div style={{fontFamily:"sans-serif",fontSize:9,color:"#A08070",fontWeight:600,textTransform:"uppercase",letterSpacing:0.3}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Follow / Message */}
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setFollowing(!following)} style={{flex:1,background:following?"#F5EDE4":"#8B4513",color:following?"#8B4513":"white",border:`2px solid #8B4513`,borderRadius:12,padding:"10px",fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,cursor:"pointer",transition:"all 0.15s"}}>
            {following?"✓ Following":"+ Follow"}
          </button>
          <button style={{flex:1,background:"white",color:"#2C1810",border:"1.5px solid #EDE8E0",borderRadius:12,padding:"10px",fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:600,cursor:"pointer"}}>
            💬 Message
          </button>
        </div>
      </div>

      {/* Sub-nav tabs */}
      <div style={{background:"white",borderBottom:"1px solid #EDE8E0",position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex"}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setActiveSection(t.id)} style={{flex:1,background:"none",border:"none",borderBottom:`3px solid ${activeSection===t.id?"#8B4513":"transparent"}`,padding:"12px 4px 10px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:1,transition:"border-color 0.15s"}}>
              <span style={{fontSize:16}}>{t.icon}</span>
              <span style={{fontFamily:"sans-serif",fontSize:11,fontWeight:activeSection===t.id?700:400,color:activeSection===t.id?"#8B4513":"#A08070"}}>{t.label}</span>
              <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,fontWeight:700,color:activeSection===t.id?"#8B4513":"#B0A090"}}>{t.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{padding:"14px 14px 0"}}>
        {activeSection==="shop"&&(
          PROFILE_LISTINGS_ACTIVE.length===0
            ? <div style={{textAlign:"center",padding:"40px",color:"#B0A090"}}><div style={{fontSize:40}}>🛋️</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:16,marginTop:10}}>No active listings</div></div>
            : <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                {PROFILE_LISTINGS_ACTIVE.map(item=><MiniCard key={item.id} item={item}/>)}
              </div>
        )}
        {activeSection==="sold"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
              {PROFILE_SOLD.map(item=><MiniCard key={item.id} item={{...item,price:item.earnings}} badge="SOLD" sub={item.soldDate}/>)}
            </div>
            <div style={{background:"linear-gradient(135deg,#F5EDE4,#EDD8C4)",borderRadius:14,padding:"14px 18px",display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:28}}>💰</span>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810"}}>Total Earned (Net)</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:700,color:"#8B4513"}}>${PROFILE_SOLD.reduce((s,i)=>s+i.earnings,0)}</div>
              </div>
              <button onClick={()=>setShowEarnings(true)} style={{marginLeft:"auto",background:"#8B4513",color:"white",border:"none",borderRadius:10,padding:"8px 14px",fontFamily:"sans-serif",fontSize:12,fontWeight:700,cursor:"pointer"}}>Details →</button>
            </div>
          </div>
        )}
        {activeSection==="purchases"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
              {PROFILE_PURCHASES.map(item=><MiniCard key={item.id} item={item} sub={item.purchaseDate}/>)}
            </div>
            <div style={{background:"#F0F8F4",borderRadius:14,padding:"14px 18px",display:"flex",alignItems:"center",gap:12,border:"1px solid #C8E8D8"}}>
              <span style={{fontSize:28}}>🛍️</span>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810"}}>Total Spent</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:700,color:"#3A7A54"}}>${PROFILE_PURCHASES.reduce((s,i)=>s+i.price,0)}</div>
              </div>
            </div>
          </div>
        )}
        {activeSection==="likes"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
            {PROFILE_LIKES.map(item=>(
              <div key={item.id} style={{position:"relative"}}>
                <MiniCard item={item}/>
                <div style={{position:"absolute",top:5,right:5,fontSize:15}}>❤️</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reviews */}
      <div style={{padding:"22px 16px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:"#2C1810"}}>Reviews</div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <StarRating rating={u.rating} size={13}/>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:700,color:"#8B4513"}}>{u.rating}</span>
            <span style={{color:"#A08070",fontSize:12,fontFamily:"sans-serif"}}>({u.reviewCount})</span>
          </div>
        </div>
        {/* Rating bars */}
        <div style={{background:"white",borderRadius:14,padding:"12px 14px",marginBottom:12,border:"1px solid #EDE8E0"}}>
          {[[5,28],[4,4],[3,1],[2,0],[1,1]].map(([star,count])=>{
            const pct = Math.round((count/u.reviewCount)*100);
            return (
              <div key={star} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                <span style={{fontFamily:"sans-serif",fontSize:11,color:"#6B4C3A",minWidth:10,textAlign:"right"}}>{star}</span>
                <span style={{fontSize:11}}>★</span>
                <div style={{flex:1,height:6,background:"#F0E8DC",borderRadius:3,overflow:"hidden"}}>
                  <div style={{width:`${pct}%`,height:"100%",background:star>=4?"#8B4513":star===3?"#E8A020":"#C46A3A",borderRadius:3}}/>
                </div>
                <span style={{fontFamily:"sans-serif",fontSize:10,color:"#A08070",minWidth:18}}>{count}</span>
              </div>
            );
          })}
        </div>
        {/* Review cards */}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {(expandReviews?PROFILE_REVIEWS:PROFILE_REVIEWS.slice(0,3)).map(r=>(
            <div key={r.id} style={{background:"white",borderRadius:14,padding:"14px 15px",border:"1px solid #EDE8E0"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <div style={{width:36,height:36,background:"linear-gradient(135deg,#D4A882,#C4883A)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontWeight:700,color:"white",fontSize:15,flexShrink:0}}>{r.avatar}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810"}}>{r.author}</div>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginTop:2}}>
                    <StarRating rating={r.rating} size={11}/>
                    <span style={{color:"#B0A090",fontSize:11,fontFamily:"sans-serif"}}>{r.date}</span>
                  </div>
                </div>
              </div>
              <div style={{fontFamily:"sans-serif",fontSize:13,color:"#5C4A3A",lineHeight:1.6}}>{r.text}</div>
            </div>
          ))}
        </div>
        {PROFILE_REVIEWS.length>3&&(
          <button onClick={()=>setExpandReviews(!expandReviews)} style={{width:"100%",background:"#F5EDE4",color:"#8B4513",border:"none",borderRadius:12,padding:"11px",fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,cursor:"pointer",marginTop:10}}>
            {expandReviews?`Show Less ∧`:`See All ${PROFILE_REVIEWS.length} Reviews ∨`}
          </button>
        )}
        <div style={{height:20}}/>
      </div>

      {/* ── Account Management Cards ────────────────── */}
      <div style={{padding:"8px 16px 0"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:"#2C1810",marginBottom:12}}>Account Management</div>

        {/* Account Details */}
        <div onClick={()=>setShowSettings(true)} style={{background:"white",borderRadius:16,padding:"16px",marginBottom:10,border:"1px solid #EDE8E0",cursor:"pointer",display:"flex",alignItems:"center",gap:14,boxShadow:"0 2px 8px rgba(60,30,10,0.05)",transition:"transform 0.15s,box-shadow 0.15s"}}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 6px 20px rgba(60,30,10,0.12)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 8px rgba(60,30,10,0.05)";}}>
          <div style={{width:46,height:46,background:"linear-gradient(135deg,#F5EDE4,#EDD8C4)",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>👤</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#2C1810"}}>Account Details</div>
            <div style={{fontFamily:"sans-serif",fontSize:12,color:"#A08070",marginTop:2}}>Name · username · email · phone · DOB · password · 2FA</div>
          </div>
          <span style={{color:"#C0A890",fontSize:20}}>›</span>
        </div>

        {/* Payment Settings */}
        <div onClick={()=>setShowSettings(true)} style={{background:"white",borderRadius:16,padding:"16px",marginBottom:10,border:"1px solid #EDE8E0",cursor:"pointer",display:"flex",alignItems:"center",gap:14,boxShadow:"0 2px 8px rgba(60,30,10,0.05)",transition:"transform 0.15s,box-shadow 0.15s"}}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 6px 20px rgba(60,30,10,0.12)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 8px rgba(60,30,10,0.05)";}}>
          <div style={{width:46,height:46,background:"linear-gradient(135deg,#EBF8F1,#D4EDD8)",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>💳</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#2C1810"}}>Payment Settings</div>
            <div style={{fontFamily:"sans-serif",fontSize:12,color:"#A08070",marginTop:2}}>Bank account · saved cards · payout preferences · fees</div>
            <div style={{display:"flex",gap:6,marginTop:6}}>
              <span style={{background:"#4CAF8A20",color:"#3A9A6A",fontSize:10,fontFamily:"sans-serif",fontWeight:700,padding:"2px 8px",borderRadius:8}}>Visa ••4242</span>
              <span style={{background:"#E8F4EC",color:"#3A9A6A",fontSize:10,fontFamily:"sans-serif",fontWeight:700,padding:"2px 8px",borderRadius:8}}>Bank ••4821</span>
            </div>
          </div>
          <span style={{color:"#C0A890",fontSize:20}}>›</span>
        </div>

        {/* Shipping Settings */}
        <div onClick={()=>setShowSettings(true)} style={{background:"white",borderRadius:16,padding:"16px",marginBottom:10,border:"1px solid #EDE8E0",cursor:"pointer",display:"flex",alignItems:"center",gap:14,boxShadow:"0 2px 8px rgba(60,30,10,0.05)",transition:"transform 0.15s,box-shadow 0.15s"}}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 6px 20px rgba(60,30,10,0.12)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 8px rgba(60,30,10,0.05)";}}>
          <div style={{width:46,height:46,background:"linear-gradient(135deg,#F0EFFE,#DDD8FC)",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>📦</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#2C1810"}}>Shipping Settings</div>
            <div style={{fontFamily:"sans-serif",fontSize:12,color:"#A08070",marginTop:2}}>Pickup addresses · carriers · packaging · handling time</div>
            <div style={{display:"flex",gap:6,marginTop:6}}>
              {["USPS","UPS","Curbside"].map(c=><span key={c} style={{background:"#F0EFFE",color:"#3D2FCC",fontSize:10,fontFamily:"sans-serif",fontWeight:700,padding:"2px 8px",borderRadius:8}}>{c}</span>)}
            </div>
          </div>
          <span style={{color:"#C0A890",fontSize:20}}>›</span>
        </div>

        {/* Quick Edit Profile */}
        <div onClick={()=>setShowEditProfile(true)} style={{background:"linear-gradient(135deg,#8B4513,#C4703A)",borderRadius:16,padding:"16px",marginBottom:10,cursor:"pointer",display:"flex",alignItems:"center",gap:14,boxShadow:"0 4px 16px rgba(139,69,19,0.25)"}}>
          <div style={{width:46,height:46,background:"rgba(255,255,255,0.2)",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>✏️</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"white"}}>Edit Profile</div>
            <div style={{fontFamily:"sans-serif",fontSize:12,color:"rgba(255,255,255,0.75)",marginTop:2}}>Update photo · username · display name · bio</div>
          </div>
          <span style={{color:"rgba(255,255,255,0.7)",fontSize:20}}>›</span>
        </div>

        <div style={{height:24}}/>
      </div>

      {showEditProfile&&<EditProfileModal onClose={()=>setShowEditProfile(false)} onSave={data=>{setProfileData(d=>({...d,...data}));setPhotoUploaded(data.photoUploaded);}}/>}
    </div>
  );
};

// ─── MESSAGES & NOTIFICATIONS DATA ──────────────────────────────
const CONVERSATIONS = [
  {
    id:1, name:"Maya R.",       avatar:"M", avatarColor:"#C4703A",
    item:"Mid-Century Walnut Sofa", itemPrice:340, itemImg:"sofa",
    lastMsg:"Does it come with the throw pillows?", lastTime:"2m",
    unread:2, online:true,
    messages:[
      { id:1, from:"them", text:"Hi! Is the sofa still available?", time:"10:12 AM", date:"Today" },
      { id:2, from:"me",   text:"Yes it is! Just listed it this morning.", time:"10:14 AM", date:"Today" },
      { id:3, from:"them", text:"Perfect. Would you take $300 for it?", time:"10:20 AM", date:"Today" },
      { id:4, from:"me",   text:"Best I can do is $320 — it's in great shape.", time:"10:22 AM", date:"Today" },
      { id:5, from:"them", text:"Deal! Can I pick up Saturday morning?", time:"10:25 AM", date:"Today" },
      { id:6, from:"me",   text:"Saturday works great — say 10am?", time:"10:26 AM", date:"Today" },
      { id:7, from:"them", text:"Does it come with the throw pillows?", time:"10:31 AM", date:"Today" },
    ],
  },
  {
    id:2, name:"Derek N.",      avatar:"D", avatarColor:"#4A6A8A",
    item:"Herman Miller Aeron Chair", itemPrice:620, itemImg:"chair",
    lastMsg:"I can do $580, firm. It retails for $1,400.", lastTime:"1h",
    unread:0, online:false,
    messages:[
      { id:1, from:"them", text:"Hey, is the Aeron still available?", time:"9:05 AM", date:"Today" },
      { id:2, from:"me",   text:"It is! Great condition, barely used.", time:"9:10 AM", date:"Today" },
      { id:3, from:"them", text:"Would you go $550?", time:"9:15 AM", date:"Today" },
      { id:4, from:"me",   text:"I can do $580, firm. It retails for $1,400.", time:"9:18 AM", date:"Today" },
    ],
  },
  {
    id:3, name:"Clara W.",      avatar:"C", avatarColor:"#4A8C5C",
    item:"Rattan Accent Chair", itemPrice:125, itemImg:"rattan",
    lastMsg:"See you then! I'll Venmo you when I arrive 🙌", lastTime:"3h",
    unread:0, online:true,
    messages:[
      { id:1, from:"them", text:"Love this chair! Is $110 ok?", time:"Yesterday", date:"Yesterday" },
      { id:2, from:"me",   text:"Sure, $110 works for me!", time:"Yesterday", date:"Yesterday" },
      { id:3, from:"them", text:"Amazing. Can I come by tomorrow around 2pm?", time:"Yesterday", date:"Yesterday" },
      { id:4, from:"me",   text:"Yes, 2pm is perfect. I'm in East Atlanta near Glenwood.", time:"Yesterday", date:"Yesterday" },
      { id:5, from:"them", text:"See you then! I'll Venmo you when I arrive 🙌", time:"Yesterday", date:"Yesterday" },
    ],
  },
  {
    id:4, name:"Ines L.",       avatar:"I", avatarColor:"#8A4A8A",
    item:"Marble-Top Dining Table", itemPrice:480, itemImg:"table",
    lastMsg:"Can you hold it until Friday?", lastTime:"Yesterday",
    unread:1, online:false,
    messages:[
      { id:1, from:"them", text:"Hi! Saw your dining table listing — it's beautiful.", time:"Yesterday", date:"Yesterday" },
      { id:2, from:"me",   text:"Thank you! It's a real centerpiece piece.", time:"Yesterday", date:"Yesterday" },
      { id:3, from:"them", text:"Can you hold it until Friday?", time:"Yesterday", date:"Yesterday" },
    ],
  },
  {
    id:5, name:"Tom B.",        avatar:"T", avatarColor:"#5C7A5C",
    item:"IKEA KALLAX Shelf", itemPrice:55, itemImg:"shelf",
    lastMsg:"Picked it up, thanks so much! ⭐⭐⭐⭐⭐", lastTime:"2d",
    unread:0, online:false,
    messages:[
      { id:1, from:"them", text:"Is the KALLAX still available?", time:"2 days ago", date:"2 days ago" },
      { id:2, from:"me",   text:"Yep, come grab it anytime!", time:"2 days ago", date:"2 days ago" },
      { id:3, from:"them", text:"Picked it up, thanks so much! ⭐⭐⭐⭐⭐", time:"2 days ago", date:"2 days ago" },
    ],
  },
];

const NOTIFICATIONS = [
  { id:1,  type:"offer",    icon:"🤝", title:"New Offer Received",      body:"Maya R. offered $300 on your Mid-Century Walnut Sofa",          time:"2m ago",   read:false, action:"View Offer",   color:"#8B4513" },
  { id:2,  type:"message",  icon:"💬", title:"New Message",             body:"Derek N.: 'I can do $580, firm. It retails for $1,400.'",        time:"1h ago",   read:false, action:"Reply",        color:"#4A6A8A" },
  { id:3,  type:"sold",     icon:"✅", title:"Item Sold! 🎉",           body:"Your Rattan Accent Chair sold for $110. Payout in ~24 hrs.",     time:"3h ago",   read:false, action:"View Sale",    color:"#4CAF8A" },
  { id:4,  type:"pricedrop",icon:"💰", title:"Price Drop Alert",        body:"West Elm Coffee Table you liked dropped from $380 → $320",       time:"5h ago",   read:true,  action:"View Item",    color:"#E8A020" },
  { id:5,  type:"message",  icon:"💬", title:"New Message",             body:"Ines L.: 'Can you hold it until Friday?'",                      time:"Yesterday",read:true,  action:"Reply",        color:"#4A6A8A" },
  { id:6,  type:"nearby",   icon:"📍", title:"New Listing Near You",   body:"Pottery Barn Queen Bed Frame listed 2.5 mi away — $550",         time:"Yesterday",read:true,  action:"View Listing", color:"#C4703A" },
  { id:7,  type:"review",   icon:"⭐", title:"New Review",              body:"Tom B. left you a 5-star review: 'Flawless transaction!'",       time:"2d ago",   read:true,  action:"View Review",  color:"#E8A020" },
  { id:8,  type:"payout",   icon:"🏦", title:"Payout Sent",            body:"$87.00 is on its way to your Bank •••• 4821 (1–2 business days)",time:"2d ago",   read:true,  action:"View Details", color:"#4CAF8A" },
  { id:9,  type:"follow",   icon:"👤", title:"New Follower",           body:"Raj S. is now following you",                                    time:"3d ago",   read:true,  action:"View Profile", color:"#8B4513" },
  { id:10, type:"nearby",   icon:"📍", title:"New Listing Near You",   body:"Herman Miller Aeron listed 4 mi away — $490",                    time:"3d ago",   read:true,  action:"View Listing", color:"#C4703A" },
];

// ─── NOTIFICATION CENTER ─────────────────────────────────────────
const NotificationCenter = ({ onClose, onNavigate }) => {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const unreadCount = notifs.filter(n=>!n.read).length;
  const markAllRead = () => setNotifs(n=>n.map(x=>({...x,read:true})));
  const markRead = (id) => setNotifs(n=>n.map(x=>x.id===id?{...x,read:true}:x));
  const dismiss  = (id) => setNotifs(n=>n.filter(x=>x.id!==id));

  const typeGroups = { offer:"Offers", message:"Messages", sold:"Sales", payout:"Payouts", pricedrop:"Price Drops", nearby:"Nearby", review:"Reviews", follow:"Following" };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(20,10,5,0.65)",zIndex:800,display:"flex",flexDirection:"column",alignItems:"flex-end",backdropFilter:"blur(3px)"}} onClick={onClose}>
      <div style={{background:"#FDFAF7",width:"100%",maxWidth:520,height:"100vh",display:"flex",flexDirection:"column",boxShadow:"-8px 0 40px rgba(30,15,5,0.2)"}} onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{background:"white",padding:"20px 20px 14px",borderBottom:"1px solid #EDE8E0",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:800,color:"#2C1810"}}>Notifications</div>
              {unreadCount>0&&<div style={{background:"#8B4513",color:"white",borderRadius:"50%",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,fontFamily:"sans-serif"}}>{unreadCount}</div>}
            </div>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              {unreadCount>0&&<button onClick={markAllRead} style={{background:"none",border:"none",color:"#8B4513",fontFamily:"sans-serif",fontSize:12,fontWeight:600,cursor:"pointer",textDecoration:"underline"}}>Mark all read</button>}
              <button onClick={onClose} style={{background:"#F5EDE4",border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:18,color:"#8B4513"}}>×</button>
            </div>
          </div>
        </div>

        {/* List */}
        <div style={{overflowY:"auto",flex:1}}>
          {notifs.length===0&&(
            <div style={{textAlign:"center",padding:"60px 24px",color:"#B0A090"}}>
              <div style={{fontSize:48,marginBottom:12}}>🔔</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"#2C1810"}}>All caught up!</div>
              <div style={{fontFamily:"sans-serif",fontSize:13,marginTop:6}}>No new notifications</div>
            </div>
          )}
          {notifs.map((n,i)=>(
            <div key={n.id} onClick={()=>markRead(n.id)} style={{display:"flex",gap:12,padding:"14px 18px",background:n.read?"white":"#FFF8F2",borderBottom:"1px solid #F5EDE4",cursor:"pointer",transition:"background 0.15s",position:"relative"}}
              onMouseEnter={e=>e.currentTarget.style.background="#FAF3EC"}
              onMouseLeave={e=>e.currentTarget.style.background=n.read?"white":"#FFF8F2"}>
              {/* Unread dot */}
              {!n.read&&<div style={{position:"absolute",left:6,top:"50%",transform:"translateY(-50%)",width:6,height:6,borderRadius:"50%",background:"#8B4513"}}/>}
              {/* Icon */}
              <div style={{width:44,height:44,borderRadius:12,background:n.color+"18",border:`1.5px solid ${n.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{n.icon}</div>
              {/* Content */}
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:n.read?600:700,color:"#2C1810"}}>{n.title}</div>
                  <span style={{fontFamily:"sans-serif",fontSize:10,color:"#B0A090",whiteSpace:"nowrap",flexShrink:0}}>{n.time}</span>
                </div>
                <div style={{fontFamily:"sans-serif",fontSize:12,color:"#6B4C3A",marginTop:3,lineHeight:1.5}}>{n.body}</div>
                <div style={{display:"flex",gap:8,marginTop:8,alignItems:"center"}}>
                  <button onClick={e=>{e.stopPropagation();markRead(n.id);}} style={{background:n.color,color:"white",border:"none",borderRadius:8,padding:"4px 12px",fontFamily:"sans-serif",fontSize:11,fontWeight:700,cursor:"pointer"}}>{n.action}</button>
                  <button onClick={e=>{e.stopPropagation();dismiss(n.id);}} style={{background:"none",border:"none",color:"#B0A090",fontFamily:"sans-serif",fontSize:11,cursor:"pointer"}}>Dismiss</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── MESSAGES TAB ─────────────────────────────────────────────────
const MessagesTab = ({ onOpenNotifs }) => {
  const [activeConv, setActiveConv] = useState(null);
  const [searchQ, setSearchQ] = useState("");
  const [msgInput, setMsgInput] = useState("");
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerVal, setOfferVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sentStatus, setSentStatus] = useState({}); // msgId -> "sent"|"delivered"|"read"

  const totalUnread = conversations.reduce((s,c)=>s+c.unread,0);

  const sendMessage = () => {
    if (!msgInput.trim() || !activeConv) return;
    const msgId = Date.now();
    const newMsg = { id:msgId, from:"me", text:msgInput.trim(), time:"Now", date:"Today" };
    setConversations(prev => prev.map(c =>
      c.id===activeConv.id
        ? {...c, messages:[...c.messages,newMsg], lastMsg:msgInput.trim(), lastTime:"now", unread:0}
        : c
    ));
    setActiveConv(prev => ({...prev, messages:[...prev.messages,newMsg], lastMsg:msgInput.trim()}));
    setSentStatus(s=>({...s,[msgId]:"sent"}));
    setMsgInput("");
    // Simulate delivery → read
    setTimeout(()=>setSentStatus(s=>({...s,[msgId]:"delivered"})), 800);
    setTimeout(()=>{
      setSentStatus(s=>({...s,[msgId]:"read"}));
      // Simulate typing indicator then auto-reply
      setIsTyping(true);
    }, 2000);
    setTimeout(()=>{
      setIsTyping(false);
      const replies = ["Sounds good! Let me know when works for you 😊","That works! See you then.","Okay, I can do that.","Can we do a little lower? How about $" + Math.round(activeConv?.itemPrice * 0.8) + "?","Is it still available this weekend?","Great, I'll message you when I'm on my way!"];
      const reply = { id:Date.now()+1, from:"them", text:replies[Math.floor(Math.random()*replies.length)], time:"Now", date:"Today" };
      setConversations(prev => prev.map(c =>
        c.id===activeConv?.id ? {...c, messages:[...c.messages,reply], lastMsg:reply.text, lastTime:"now", unread:1} : c
      ));
      setActiveConv(prev => prev ? {...prev, messages:[...prev.messages,reply]} : prev);
    }, 3500);
  };

  const filteredConvs = conversations.filter(c =>
    !searchQ || c.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    c.item.toLowerCase().includes(searchQ.toLowerCase())
  );

  // Conversation detail view
  if (activeConv) {
    const conv = conversations.find(c=>c.id===activeConv.id) || activeConv;
    return (
      <div style={{display:"flex",flexDirection:"column",height:"100vh",background:"#F8F3EC",maxWidth:520,margin:"0 auto"}}>
        {/* Conv header */}
        <div style={{background:"white",padding:"14px 16px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid #EDE8E0",flexShrink:0,boxShadow:"0 2px 8px rgba(60,30,10,0.06)"}}>
          <button onClick={()=>setActiveConv(null)} style={{background:"#F5EDE4",border:"none",borderRadius:10,width:34,height:34,cursor:"pointer",fontSize:18,color:"#8B4513",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>‹</button>
          <div style={{width:42,height:42,borderRadius:"50%",background:conv.avatarColor,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontWeight:700,color:"white",fontSize:17,flexShrink:0,position:"relative"}}>
            {conv.avatar}
            {conv.online&&<div style={{position:"absolute",bottom:1,right:1,width:10,height:10,background:"#4CAF8A",borderRadius:"50%",border:"2px solid white"}}/>}
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#2C1810"}}>{conv.name}</div>
            <div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070"}}>{conv.online?"🟢 Online":"Last seen recently"}</div>
          </div>
          {/* Item chip */}
          <div style={{background:"#F5EDE4",borderRadius:10,padding:"5px 10px",flexShrink:0,maxWidth:130}}>
            <div style={{fontFamily:"sans-serif",fontSize:10,color:"#8B4513",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{conv.item}</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontWeight:700,color:"#8B4513"}}>${conv.itemPrice}</div>
          </div>
        </div>

        {/* Item preview card */}
        <div style={{background:"white",margin:"10px 14px 0",borderRadius:14,padding:"10px 12px",display:"flex",gap:10,alignItems:"center",border:"1px solid #EDE8E0",flexShrink:0}}>
          <div style={{width:50,height:50,borderRadius:10,overflow:"hidden",flexShrink:0}}>
            <FurnitureIllustration type={conv.itemImg} small/>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:"#2C1810",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{conv.item}</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:700,color:"#8B4513"}}>${conv.itemPrice}</div>
          </div>
          <div style={{display:"flex",gap:6,flexShrink:0}}>
            <button onClick={()=>setShowOfferModal(true)} style={{background:"#F5EDE4",color:"#8B4513",border:"1px solid #D4A882",borderRadius:8,padding:"6px 10px",fontFamily:"sans-serif",fontSize:11,fontWeight:700,cursor:"pointer"}}>Make Offer</button>
            <button style={{background:"#8B4513",color:"white",border:"none",borderRadius:8,padding:"6px 10px",fontFamily:"sans-serif",fontSize:11,fontWeight:700,cursor:"pointer"}}>Buy Now</button>
          </div>
        </div>

        {/* Messages */}
        <div style={{flex:1,overflowY:"auto",padding:"12px 14px",display:"flex",flexDirection:"column",gap:8}}>
          {conv.messages.map((msg,i)=>{
            const isMe = msg.from==="me";
            const showDate = i===0 || conv.messages[i-1].date!==msg.date;
            return (
              <div key={msg.id}>
                {showDate&&<div style={{textAlign:"center",fontFamily:"sans-serif",fontSize:11,color:"#B0A090",margin:"8px 0"}}>{msg.date}</div>}
                <div style={{display:"flex",justifyContent:isMe?"flex-end":"flex-start"}}>
                  {!isMe&&<div style={{width:28,height:28,borderRadius:"50%",background:conv.avatarColor,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"white",fontFamily:"'Playfair Display',serif",marginRight:8,flexShrink:0,alignSelf:"flex-end"}}>{conv.avatar}</div>}
                  <div style={{maxWidth:"72%"}}>
                    {msg.from==="system" ? (
                      <div style={{background:"#E8F5EC",border:"1px solid #B0D8BC",borderRadius:12,padding:"10px 14px",fontFamily:"sans-serif",fontSize:12,color:"#2E7A46",textAlign:"center",maxWidth:"100%"}}>{msg.text}</div>
                    ) : msg.imgUrl ? (
                      <div style={{borderRadius:isMe?"18px 18px 4px 18px":"18px 18px 18px 4px",overflow:"hidden",border:"2px solid "+( isMe?"#8B4513":"#EDE8E0")}}>
                        <img src={msg.imgUrl} alt="shared" style={{width:"100%",maxWidth:220,height:160,objectFit:"cover",display:"block"}}/>
                      </div>
                    ) : (
                    <div style={{background:isMe?"#8B4513":msg.isOffer?"#FFF8E6":"white",color:isMe?"white":"#2C1810",borderRadius:isMe?"18px 18px 4px 18px":"18px 18px 18px 4px",padding:"10px 14px",fontFamily:"sans-serif",fontSize:14,lineHeight:1.5,border:isMe?"none":msg.isOffer?"1.5px solid #E8A020":"1px solid #EDE8E0",boxShadow:isMe?"0 2px 8px rgba(139,69,19,0.25)":"0 1px 4px rgba(60,30,10,0.06)"}}>
                      {msg.text}
                    </div>
                    )}
                    {msg.from!=="system"&&<div style={{fontFamily:"sans-serif",fontSize:10,color:"#B0A090",marginTop:3,textAlign:isMe?"right":"left",display:"flex",alignItems:"center",justifyContent:isMe?"flex-end":"flex-start",gap:4}}>
                      <span>{msg.time}</span>
                      {isMe&&sentStatus[msg.id]&&<span style={{fontSize:11,color:sentStatus[msg.id]==="read"?"#4A8BC4":"#B0A090"}}>{sentStatus[msg.id]==="read"?"✓✓":sentStatus[msg.id]==="delivered"?"✓✓":"✓"}</span>}
                      {isMe&&sentStatus[msg.id]==="read"&&<span style={{fontSize:9,color:"#4A8BC4"}}>Seen</span>}
                    </div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Typing indicator */}
        {isTyping&&(
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"4px 14px 0"}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:conv.avatarColor,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"white",fontFamily:"'Playfair Display',serif",flexShrink:0}}>{conv.avatar}</div>
            <div style={{background:"white",borderRadius:"18px 18px 18px 4px",padding:"10px 16px",border:"1px solid #EDE8E0",display:"flex",gap:4,alignItems:"center"}}>
              {[0,1,2].map(i=>(
                <div key={i} style={{width:7,height:7,borderRadius:"50%",background:"#C0A890",animation:"bounce 1.2s infinite",animationDelay:`${i*0.2}s`}}/>
              ))}
            </div>
          </div>
        )}

        {/* Smart quick replies */}
        <div style={{padding:"6px 14px 6px",display:"flex",gap:6,overflowX:"auto",scrollbarWidth:"none",flexShrink:0}}>
          {["Is it still available?","Can I pick up today?","Would you take less?","What are the exact dimensions?","Can I see more photos?","Is there any damage?"].map(q=>(
            <button key={q} onClick={()=>setMsgInput(q)} style={{background:"white",border:"1.5px solid #D4A882",borderRadius:20,padding:"5px 12px",fontFamily:"sans-serif",fontSize:11,fontWeight:600,color:"#8B4513",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>{q}</button>
          ))}
        </div>

        {/* Action bar */}
        <div style={{padding:"4px 14px 6px",display:"flex",gap:8,overflowX:"auto",scrollbarWidth:"none",flexShrink:0}}>
          <button onClick={()=>setShowOfferModal(true)} style={{display:"flex",alignItems:"center",gap:5,background:"#F5EDE4",border:"1.5px solid #D4A882",borderRadius:20,padding:"6px 14px",fontFamily:"sans-serif",fontSize:11,fontWeight:700,color:"#8B4513",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
            💰 Make Offer
          </button>
          <label style={{display:"flex",alignItems:"center",gap:5,background:"#F0F8F4",border:"1.5px solid #C0E0D0",borderRadius:20,padding:"6px 14px",fontFamily:"sans-serif",fontSize:11,fontWeight:700,color:"#3A7A54",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
            📷 Send Photo
            <input type="file" accept="image/*" onChange={e=>{
              if(e.target.files[0]){
                const url = URL.createObjectURL(e.target.files[0]);
                const imgMsg = { id:Date.now(), from:"me", text:"📷 Photo", imgUrl:url, time:"Now", date:"Today" };
                setConversations(prev=>prev.map(c=>c.id===activeConv.id?{...c,messages:[...c.messages,imgMsg],lastMsg:"📷 Sent a photo",lastTime:"now"}:c));
                setActiveConv(prev=>({...prev,messages:[...prev.messages,imgMsg]}));
              }
            }} style={{display:"none"}}/>
          </label>
          <button onClick={()=>{
            const sysMsg = { id:Date.now(), from:"system", text:`✅ Pickup confirmed for ${conv.item}. Payment will be released to the seller.`, time:"Now", date:"Today" };
            setConversations(prev=>prev.map(c=>c.id===activeConv.id?{...c,messages:[...c.messages,sysMsg],lastMsg:"Pickup confirmed",lastTime:"now"}:c));
            setActiveConv(prev=>({...prev,messages:[...prev.messages,sysMsg]}));
          }} style={{display:"flex",alignItems:"center",gap:5,background:"#E8F5EC",border:"1.5px solid #B0D8BC",borderRadius:20,padding:"6px 14px",fontFamily:"sans-serif",fontSize:11,fontWeight:700,color:"#2E7A46",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
            ✅ Confirm Pickup
          </button>
          <button style={{display:"flex",alignItems:"center",gap:5,background:"#FEF0EF",border:"1.5px solid #F0C0B0",borderRadius:20,padding:"6px 14px",fontFamily:"sans-serif",fontSize:11,fontWeight:700,color:"#C46A3A",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
            🚨 Report Issue
          </button>
        </div>

        {/* Input bar */}
        <div style={{background:"white",padding:"8px 14px 24px",display:"flex",gap:8,alignItems:"flex-end",borderTop:"1px solid #EDE8E0",flexShrink:0}}>
          <div style={{flex:1,background:"#F8F3EC",borderRadius:22,padding:"10px 16px",display:"flex",alignItems:"center",gap:8}}>
            <input value={msgInput} onChange={e=>setMsgInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()} placeholder="Type a message..." style={{flex:1,background:"none",border:"none",outline:"none",fontFamily:"sans-serif",fontSize:14,color:"#2C1810"}}/>
          </div>
          <button onClick={sendMessage} disabled={!msgInput.trim()} style={{width:44,height:44,borderRadius:"50%",background:msgInput.trim()?"#8B4513":"#DDD0C8",border:"none",cursor:msgInput.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,transition:"background 0.15s",boxShadow:msgInput.trim()?"0 3px 10px rgba(139,69,19,0.35)":"none"}}>➤</button>
        </div>

        {/* Offer modal */}
        {showOfferModal&&(
          <div style={{position:"fixed",inset:0,background:"rgba(20,10,5,0.6)",zIndex:1200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setShowOfferModal(false)}>
            <div style={{background:"#FDFAF7",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:520,padding:"24px"}} onClick={e=>e.stopPropagation()}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:800,color:"#2C1810",marginBottom:4}}>Make an Offer</div>
              <div style={{fontFamily:"sans-serif",fontSize:13,color:"#A08070",marginBottom:18}}>Listed at <strong>${conv.itemPrice}</strong>. The seller will accept, counter, or decline.</div>
              <div style={{position:"relative",marginBottom:14}}>
                <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:"#8B4513"}}>$</span>
                <input autoFocus type="number" value={offerVal} onChange={e=>setOfferVal(e.target.value)} placeholder={Math.round(conv.itemPrice*0.85).toString()} style={{width:"100%",border:"2px solid #D4A882",borderRadius:12,padding:"14px 14px 14px 34px",fontFamily:"'Cormorant Garamond',serif",fontSize:28,color:"#2C1810",outline:"none",boxSizing:"border-box"}}/>
              </div>
              {/* Offer presets */}
              <div style={{display:"flex",gap:8,marginBottom:14}}>
                {[0.7,0.8,0.9].map(pct=>(
                  <button key={pct} onClick={()=>setOfferVal(Math.round(conv.itemPrice*pct).toString())} style={{flex:1,background:offerVal===Math.round(conv.itemPrice*pct).toString()?"#8B4513":"#F5EDE4",color:offerVal===Math.round(conv.itemPrice*pct).toString()?"white":"#6B4C3A",border:"none",borderRadius:8,padding:"8px 4px",fontFamily:"sans-serif",fontSize:11,fontWeight:600,cursor:"pointer"}}>
                    {Math.round(pct*100)}%<br/>${Math.round(conv.itemPrice*pct)}
                  </button>
                ))}
              </div>
              {/* Offer note */}
              {offerVal&&Number(offerVal)<conv.itemPrice*0.6&&(
                <div style={{background:"#FEF5E4",borderRadius:10,padding:"8px 12px",marginBottom:10,fontFamily:"sans-serif",fontSize:12,color:"#8A6010"}}>
                  ⚠️ Offers below 60% are rarely accepted. Consider increasing your offer.
                </div>
              )}
              <button onClick={()=>{
                if(offerVal) {
                  const offerMsg = { id:Date.now(), from:"me", text:`💰 Offer Sent: $${offerVal} (listed at $${conv.itemPrice})`, time:"Now", date:"Today", isOffer:true, offerAmt:offerVal };
                  setConversations(prev=>prev.map(c=>c.id===activeConv.id?{...c,messages:[...c.messages,offerMsg],lastMsg:`Offer: $${offerVal}`,lastTime:"now"}:c));
                  setActiveConv(prev=>({...prev,messages:[...prev.messages,offerMsg]}));
                  setShowOfferModal(false); setOfferVal("");
                  // Simulate seller response
                  setTimeout(()=>{
                    setIsTyping(true);
                  }, 1500);
                  setTimeout(()=>{
                    setIsTyping(false);
                    const accepted = Number(offerVal)>=conv.itemPrice*0.85;
                    const replyMsg = { id:Date.now()+1, from:"them", time:"Now", date:"Today",
                      text: accepted
                        ? `✅ Offer accepted! $${offerVal} works for me. When can you pick it up?`
                        : `Hmm, I can do $${Math.round(conv.itemPrice*0.9)} — that's the lowest I can go.`
                    };
                    setConversations(prev=>prev.map(c=>c.id===activeConv?.id?{...c,messages:[...c.messages,replyMsg],lastMsg:replyMsg.text,lastTime:"now",unread:1}:c));
                    setActiveConv(prev=>prev?{...prev,messages:[...prev.messages,replyMsg]}:prev);
                  }, 3500);
                }
              }} disabled={!offerVal} style={{width:"100%",background:offerVal?"#8B4513":"#DDD0C8",color:"white",border:"none",borderRadius:12,padding:"14px",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:offerVal?"pointer":"not-allowed"}}>
                Send Offer of ${offerVal||"—"} →
              </button>
              <div style={{textAlign:"center",marginTop:10,fontFamily:"sans-serif",fontSize:11,color:"#B0A090"}}>Payment is only charged when the seller accepts and you confirm.</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Inbox list view
  return (
    <div style={{background:"#F8F3EC",minHeight:"100vh",paddingBottom:100}}>
      {/* Header */}
      <div style={{background:"white",padding:"20px 18px 0",position:"sticky",top:0,zIndex:10,boxShadow:"0 2px 8px rgba(60,30,10,0.06)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:"#2C1810"}}>Messages</div>
            {totalUnread>0&&<div style={{background:"#8B4513",color:"white",borderRadius:"50%",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,fontFamily:"sans-serif"}}>{totalUnread}</div>}
          </div>
          {/* Notification bell */}
          <button onClick={onOpenNotifs} style={{position:"relative",background:"#F5EDE4",border:"none",borderRadius:"50%",width:38,height:38,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>
            🔔
            {NOTIFICATIONS.filter(n=>!n.read).length>0&&<div style={{position:"absolute",top:6,right:6,width:8,height:8,background:"#C46A3A",borderRadius:"50%",border:"1.5px solid white"}}/>}
          </button>
        </div>
        {/* Search */}
        <div style={{position:"relative",marginBottom:14}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14}}>🔍</span>
          <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search conversations..." style={{width:"100%",background:"#F8F3EC",border:"1.5px solid #EDE8E0",borderRadius:20,padding:"9px 14px 9px 34px",fontFamily:"sans-serif",fontSize:13,color:"#2C1810",outline:"none",boxSizing:"border-box"}}/>
        </div>
      </div>

      {/* Conversation list */}
      <div style={{background:"white",margin:"0"}}>
        {filteredConvs.length===0&&(
          <div style={{textAlign:"center",padding:"60px 24px",color:"#B0A090"}}>
            <div style={{fontSize:48,marginBottom:12}}>💬</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"#2C1810"}}>No conversations yet</div>
            <div style={{fontFamily:"sans-serif",fontSize:13,marginTop:6}}>Messages with buyers & sellers will appear here</div>
          </div>
        )}
        {filteredConvs.map((conv,i)=>(
          <div key={conv.id} onClick={()=>setActiveConv(conv)} style={{display:"flex",gap:12,padding:"14px 18px",borderBottom:"1px solid #F5EDE4",cursor:"pointer",background:conv.unread>0?"#FFF8F2":"white",transition:"background 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.background="#FAF3EC"}
            onMouseLeave={e=>e.currentTarget.style.background=conv.unread>0?"#FFF8F2":"white"}>
            {/* Avatar */}
            <div style={{position:"relative",flexShrink:0}}>
              <div style={{width:52,height:52,borderRadius:"50%",background:conv.avatarColor,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontWeight:700,color:"white",fontSize:20}}>
                {conv.avatar}
              </div>
              {conv.online&&<div style={{position:"absolute",bottom:2,right:2,width:12,height:12,background:"#4CAF8A",borderRadius:"50%",border:"2px solid white"}}/>}
            </div>
            {/* Content */}
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:conv.unread>0?800:600,color:"#2C1810"}}>{conv.name}</div>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontFamily:"sans-serif",fontSize:11,color:"#B0A090"}}>{conv.lastTime}</span>
                  {conv.unread>0&&<div style={{background:"#8B4513",color:"white",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,fontFamily:"sans-serif"}}>{conv.unread}</div>}
                </div>
              </div>
              <div style={{fontFamily:"sans-serif",fontSize:12,color:"#8B4513",fontWeight:500,marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>Re: {conv.item} · ${conv.itemPrice}</div>
              <div style={{fontFamily:"sans-serif",fontSize:12,color:conv.unread>0?"#5C3A20":"#A08070",fontWeight:conv.unread>0?600:400,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{conv.lastMsg}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── SAVED TAB DATA ──────────────────────────────────────────────
const SAVED_COLLECTIONS = [
  { id:"all",       label:"All Saved",   icon:"♡" },
  { id:"sofas",     label:"Sofas",       icon:"🛋️" },
  { id:"chairs",    label:"Chairs",      icon:"🪑" },
  { id:"tables",    label:"Tables",      icon:"🪵" },
  { id:"beds",      label:"Beds",        icon:"🛏️" },
  { id:"storage",   label:"Storage",     icon:"🗄️" },
];

// ─── SAVED TAB ────────────────────────────────────────────────────
const SavedTab = ({ onViewItem }) => {
  const [savedItems, setSavedItems]   = useState(
    listings.map(l => ({ ...l, savedAt: Date.now() - Math.random()*7*86400000, note:"" }))
  );
  const [activeCol, setActiveCol]     = useState("all");
  const [sortBy, setSortBy]           = useState("newest");
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText]       = useState("");
  const [searchQ, setSearchQ]         = useState("");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const removeItem  = (id) => setSavedItems(s => s.filter(x => x.id !== id));
  const updateNote  = (id, text) => setSavedItems(s => s.map(x => x.id===id ? {...x,note:text} : x));

  let filtered = savedItems.filter(i => {
    const catMatch = activeCol==="all" || i.category.toLowerCase()===activeCol;
    const srchMatch = !searchQ || i.title.toLowerCase().includes(searchQ.toLowerCase()) || i.brand.toLowerCase().includes(searchQ.toLowerCase());
    return catMatch && srchMatch;
  });
  if (sortBy==="priceLow")  filtered = [...filtered].sort((a,b)=>a.price-b.price);
  if (sortBy==="priceHigh") filtered = [...filtered].sort((a,b)=>b.price-a.price);
  if (sortBy==="distance")  filtered = [...filtered].sort((a,b)=>a.distanceMi-b.distanceMi);

  const totalValue = filtered.reduce((s,i)=>s+i.price,0);

  return (
    <div style={{background:"#F8F3EC",minHeight:"100vh",paddingBottom:100}}>

      {/* Header */}
      <div style={{background:"white",padding:"20px 18px 0",position:"sticky",top:0,zIndex:50,boxShadow:"0 2px 8px rgba(60,30,10,0.06)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:"#2C1810"}}>Saved Items</div>
            <div style={{fontFamily:"sans-serif",fontSize:12,color:"#A08070",marginTop:1}}>{savedItems.length} saved · Est. value ${totalValue.toLocaleString()}</div>
          </div>
          <div style={{position:"relative"}}>
            <button onClick={()=>setShowSortMenu(!showSortMenu)} style={{background:"#F5EDE4",border:"none",borderRadius:12,padding:"8px 14px",fontFamily:"sans-serif",fontSize:12,fontWeight:700,color:"#8B4513",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
              ⇅ {sortBy==="newest"?"Newest":sortBy==="priceLow"?"Price ↑":sortBy==="priceHigh"?"Price ↓":"Closest"}
            </button>
            {showSortMenu&&(
              <div style={{position:"absolute",right:0,top:42,background:"white",borderRadius:12,boxShadow:"0 8px 24px rgba(60,30,10,0.15)",zIndex:200,overflow:"hidden",minWidth:150,border:"1px solid #EDE8E0"}}>
                {[["newest","🕐 Newest First"],["priceLow","💰 Price: Low → High"],["priceHigh","💎 Price: High → Low"],["distance","📍 Closest First"]].map(([id,label])=>(
                  <div key={id} onClick={()=>{setSortBy(id);setShowSortMenu(false);}} style={{padding:"11px 16px",fontFamily:"sans-serif",fontSize:13,fontWeight:sortBy===id?700:400,color:sortBy===id?"#8B4513":"#2C1810",background:sortBy===id?"#FFF5EE":"white",cursor:"pointer",borderBottom:"1px solid #F5EDE4"}}>
                    {label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div style={{position:"relative",marginBottom:10}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14}}>🔍</span>
          <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search saved items..." style={{width:"100%",background:"#F8F3EC",border:"1.5px solid #EDE8E0",borderRadius:20,padding:"9px 14px 9px 34px",fontFamily:"sans-serif",fontSize:13,color:"#2C1810",outline:"none",boxSizing:"border-box"}}/>
        </div>

        {/* Collection filter pills */}
        <div style={{display:"flex",gap:8,overflowX:"auto",scrollbarWidth:"none",paddingBottom:12}}>
          {SAVED_COLLECTIONS.map(col=>(
            <button key={col.id} onClick={()=>setActiveCol(col.id)} style={{background:activeCol===col.id?"#8B4513":"#F5EDE4",color:activeCol===col.id?"white":"#6B4C3A",border:"none",borderRadius:20,padding:"6px 14px",fontFamily:"'Playfair Display',serif",fontWeight:activeCol===col.id?700:400,fontSize:12,cursor:"pointer",flexShrink:0,whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:5}}>
              <span>{col.icon}</span> {col.label}
              {col.id==="all"&&<span style={{background:activeCol==="all"?"rgba(255,255,255,0.3)":"#E0D0C0",borderRadius:10,padding:"1px 6px",fontSize:10,fontWeight:700}}>{savedItems.length}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Value summary card */}
      {filtered.length>0&&(
        <div style={{margin:"14px 16px 0",background:"linear-gradient(135deg,#2C1810,#8B4513)",borderRadius:16,padding:"14px 18px",display:"flex",alignItems:"center",gap:14}}>
          <div style={{flex:1}}>
            <div style={{fontFamily:"sans-serif",fontSize:11,color:"rgba(255,255,255,0.65)",textTransform:"uppercase",letterSpacing:0.5}}>Total Saved Value</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,fontWeight:700,color:"white",lineHeight:1.1}}>${totalValue.toLocaleString()}</div>
            <div style={{fontFamily:"sans-serif",fontSize:11,color:"rgba(255,255,255,0.6)",marginTop:2}}>{filtered.length} item{filtered.length!==1?"s":""} in this view</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"sans-serif",fontSize:11,color:"rgba(255,255,255,0.65)",marginBottom:4}}>Avg price</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"rgba(255,255,255,0.9)"}}>${Math.round(totalValue/Math.max(filtered.length,1))}</div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {filtered.length===0&&(
        <div style={{textAlign:"center",padding:"60px 24px"}}>
          <div style={{fontSize:56,marginBottom:14}}>♡</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"#2C1810",marginBottom:8}}>
            {searchQ?"No results found":"Nothing saved yet"}
          </div>
          <div style={{fontFamily:"sans-serif",fontSize:13,color:"#A08070",lineHeight:1.6}}>
            {searchQ?"Try a different search or clear filters":"Tap the ♡ heart on any listing\nto save it here for later."}
          </div>
        </div>
      )}

      {/* Saved items list */}
      <div style={{padding:"12px 16px 0",display:"flex",flexDirection:"column",gap:12}}>
        {filtered.map(item=>(
          <div key={item.id} style={{background:"white",borderRadius:18,overflow:"hidden",boxShadow:"0 2px 10px rgba(60,40,20,0.07)",border:"1px solid #EDE8E0"}}>
            <div style={{display:"flex",gap:0}}>
              {/* Thumbnail */}
              <div onClick={()=>onViewItem(item)} style={{width:110,flexShrink:0,cursor:"pointer"}}>
                <FurnitureIllustration type={item.img} sold={item.sold}/>
              </div>
              {/* Info */}
              <div style={{flex:1,padding:"12px 14px 10px",minWidth:0}}>
                {/* Brand */}
                <div style={{fontFamily:"sans-serif",fontSize:10,fontWeight:700,color:"#A08070",textTransform:"uppercase",letterSpacing:0.4,marginBottom:2}}>{item.brand}</div>
                {/* Title + Price */}
                <div onClick={()=>onViewItem(item)} style={{cursor:"pointer"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",lineHeight:1.3,marginBottom:2}}>{item.title}</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700,color:item.sold?"#A08070":"#8B4513"}}>${item.price}</div>
                </div>
                {/* Meta row */}
                <div style={{display:"flex",alignItems:"center",gap:6,marginTop:5,flexWrap:"wrap"}}>
                  <span style={{background:conditionColor[item.condition]+"20",color:conditionColor[item.condition],fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:10,fontFamily:"sans-serif"}}>{item.condition}</span>
                  <span style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070"}}>📍 {item.distance}</span>
                  {item.sold&&<span style={{background:"#F0E0D8",color:"#C46A3A",fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:10,fontFamily:"sans-serif"}}>SOLD</span>}
                </div>
                {/* Color swatches */}
                <div style={{display:"flex",gap:4,marginTop:6}}>
                  {item.colors.map(c=>(
                    <div key={c} title={c} style={{width:10,height:10,borderRadius:"50%",background:COLOR_SWATCHES[c]||"#C0A890",border:"1px solid rgba(0,0,0,0.12)"}}/>
                  ))}
                </div>
              </div>
              {/* Right actions */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",flexShrink:0}}>
                <button onClick={()=>removeItem(item.id)} style={{background:"#FEF0EF",border:"none",borderRadius:"50%",width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:14,color:"#C46A3A"}}>×</button>
                <div onClick={()=>onViewItem(item)} style={{background:"#8B4513",borderRadius:10,padding:"6px 10px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{fontSize:14}}>›</span>
                </div>
              </div>
            </div>

            {/* Note section */}
            <div style={{borderTop:"1px solid #F5EDE4",padding:"8px 14px"}}>
              {editingNote===item.id ? (
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <input autoFocus value={noteText} onChange={e=>setNoteText(e.target.value)}
                    placeholder="Add a private note (e.g. 'fits living room wall')"
                    style={{flex:1,border:"1.5px solid #D4A882",borderRadius:8,padding:"6px 10px",fontFamily:"sans-serif",fontSize:12,color:"#2C1810",outline:"none"}}
                    onKeyDown={e=>{if(e.key==="Enter"){updateNote(item.id,noteText);setEditingNote(null);}}}
                  />
                  <button onClick={()=>{updateNote(item.id,noteText);setEditingNote(null);}} style={{background:"#8B4513",color:"white",border:"none",borderRadius:8,padding:"6px 12px",fontFamily:"sans-serif",fontSize:12,fontWeight:700,cursor:"pointer"}}>Save</button>
                  <button onClick={()=>setEditingNote(null)} style={{background:"#F5EDE4",color:"#8B4513",border:"none",borderRadius:8,padding:"6px 10px",fontFamily:"sans-serif",fontSize:12,cursor:"pointer"}}>Cancel</button>
                </div>
              ) : (
                <div style={{display:"flex",alignItems:"center",gap:8}} onClick={()=>{setEditingNote(item.id);setNoteText(item.note||"");}}>
                  <span style={{fontSize:13}}>📝</span>
                  <span style={{fontFamily:"sans-serif",fontSize:12,color:item.note?"#5C3A20":"#B0A090",flex:1,cursor:"pointer"}}>
                    {item.note||"Add a note..."}
                  </span>
                  <span style={{fontSize:11,color:"#8B4513",fontFamily:"sans-serif",fontWeight:600,cursor:"pointer"}}>Edit</span>
                </div>
              )}
            </div>

            {/* CTA buttons */}
            {!item.sold&&(
              <div style={{padding:"0 14px 12px",display:"flex",gap:8}}>
                <button onClick={()=>onViewItem(item)} style={{flex:1,background:"#8B4513",color:"white",border:"none",borderRadius:10,padding:"9px",fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,cursor:"pointer"}}>View Listing</button>
                <button onClick={()=>onViewItem(item)} style={{flex:1,background:"#F5EDE4",color:"#8B4513",border:"1px solid #D4A882",borderRadius:10,padding:"9px",fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:600,cursor:"pointer"}}>Message Seller</button>
              </div>
            )}
            {item.sold&&(
              <div style={{padding:"0 14px 12px"}}>
                <div style={{background:"#F5EDE4",borderRadius:10,padding:"8px 12px",fontFamily:"sans-serif",fontSize:12,color:"#A08070",textAlign:"center"}}>
                  This item has sold — <span style={{color:"#8B4513",fontWeight:600,cursor:"pointer"}}>Find similar →</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── FULL CHAT SYSTEM ─────────────────────────────────────────────
const CHAT_CONVERSATIONS = [
  {
    id:1, name:"Maya R.", role:"buyer", avatar:"M", avatarColor:"#C4703A",
    item:"Mid-Century Walnut Sofa", itemPrice:340, itemImg:"sofa", itemId:1,
    lastMsg:"Does it come with the throw pillows?", lastTime:"2m",
    unread:2, online:true, verified:true,
    messages:[
      { id:1,  from:"them", text:"Hi! Is the sofa still available?",                                          time:"10:12 AM", date:"Today"     },
      { id:2,  from:"me",   text:"Yes it is! Just listed it this morning 😊",                                 time:"10:14 AM", date:"Today"     },
      { id:3,  from:"them", text:"It's beautiful. Would you take $300 for it?",                               time:"10:20 AM", date:"Today"     },
      { id:4,  from:"me",   text:"Best I can do is $320 — it's in really great shape, only 2 years old.",     time:"10:22 AM", date:"Today"     },
      { id:5,  from:"them", text:"Deal! Can I pick up this Saturday morning?",                                 time:"10:25 AM", date:"Today"     },
      { id:6,  from:"me",   text:"Saturday works great — how does 10am sound?",                               time:"10:26 AM", date:"Today"     },
      { id:7,  from:"them", text:"Does it come with the throw pillows?",                                      time:"10:31 AM", date:"Today"     },
    ],
  },
  {
    id:2, name:"Derek N.", role:"buyer", avatar:"D", avatarColor:"#4A6A8A",
    item:"Herman Miller Aeron Chair", itemPrice:620, itemImg:"chair", itemId:4,
    lastMsg:"I can do $580 — that's my best.", lastTime:"1h",
    unread:0, online:false, verified:true,
    messages:[
      { id:1,  from:"them", text:"Hey, is the Aeron still available?",                                        time:"9:05 AM",  date:"Today"     },
      { id:2,  from:"me",   text:"It is! Great condition, barely used — still has the original packaging.",   time:"9:10 AM",  date:"Today"     },
      { id:3,  from:"them", text:"Nice. Any reason you're selling it?",                                       time:"9:12 AM",  date:"Today"     },
      { id:4,  from:"me",   text:"Switching to a standing desk setup. Don't need it anymore.",                time:"9:14 AM",  date:"Today"     },
      { id:5,  from:"them", text:"Makes sense. Would you go $550?",                                           time:"9:16 AM",  date:"Today"     },
      { id:6,  from:"me",   text:"I can do $580 — that's my best.",                                          time:"9:18 AM",  date:"Today"     },
    ],
  },
  {
    id:3, name:"Clara W.", role:"buyer", avatar:"C", avatarColor:"#4A8C5C",
    item:"Rattan Accent Chair", itemPrice:125, itemImg:"rattan", itemId:6,
    lastMsg:"See you at 2pm! 🙌", lastTime:"3h",
    unread:0, online:true, verified:false,
    messages:[
      { id:1,  from:"them", text:"Love this chair! Is $110 ok?",                                              time:"8:00 AM",  date:"Yesterday" },
      { id:2,  from:"me",   text:"Sure, $110 works for me!",                                                  time:"8:05 AM",  date:"Yesterday" },
      { id:3,  from:"them", text:"Awesome. Can I come by tomorrow around 2pm?",                               time:"8:10 AM",  date:"Yesterday" },
      { id:4,  from:"me",   text:"Yes! I'm near Glenwood Ave in East Atlanta. I'll send the exact address.",  time:"8:14 AM",  date:"Yesterday" },
      { id:5,  from:"them", text:"Perfect, thank you so much!",                                               time:"8:16 AM",  date:"Yesterday" },
      { id:6,  from:"me",   text:"See you at 2pm! 🙌",                                                       time:"8:18 AM",  date:"Yesterday" },
    ],
  },
  {
    id:4, name:"Ines L.", role:"buyer", avatar:"I", avatarColor:"#8A4A8A",
    item:"Marble-Top Dining Table", itemPrice:480, itemImg:"table", itemId:3,
    lastMsg:"Can you hold it until Friday?", lastTime:"Yesterday",
    unread:1, online:false, verified:true,
    messages:[
      { id:1,  from:"them", text:"Hi! Saw your dining table — it's stunning.",                                time:"3:00 PM",  date:"Yesterday" },
      { id:2,  from:"me",   text:"Thank you! It really is a statement piece. Pure marble top.",               time:"3:05 PM",  date:"Yesterday" },
      { id:3,  from:"them", text:"What are the exact dimensions?",                                            time:"3:08 PM",  date:"Yesterday" },
      { id:4,  from:"me",   text:'72" wide × 36" deep × 30" tall. Seats 6 comfortably.',                    time:"3:10 PM",  date:"Yesterday" },
      { id:5,  from:"them", text:"Perfect for my dining room. Can you hold it until Friday?",                 time:"3:12 PM",  date:"Yesterday" },
    ],
  },
  {
    id:5, name:"Tom B.", role:"buyer", avatar:"T", avatarColor:"#5C7A5C",
    item:"IKEA KALLAX Shelf Unit", itemPrice:55, itemImg:"shelf", itemId:2,
    lastMsg:"⭐⭐⭐⭐⭐ Left you a 5-star review!", lastTime:"2d",
    unread:0, online:false, verified:true,
    messages:[
      { id:1,  from:"them", text:"Is the KALLAX still available?",                                            time:"Mon",      date:"Monday"    },
      { id:2,  from:"me",   text:"Yes! $55 firm. Easy disassembly.",                                          time:"Mon",      date:"Monday"    },
      { id:3,  from:"them", text:"I'll take it! Can I come Monday evening?",                                  time:"Mon",      date:"Monday"    },
      { id:4,  from:"me",   text:"Monday at 6pm works perfectly.",                                            time:"Mon",      date:"Monday"    },
      { id:5,  from:"system", text:"✅ Pickup confirmed. Payment of $55 released to seller.",                  time:"Mon",      date:"Monday"    },
      { id:6,  from:"them", text:"⭐⭐⭐⭐⭐ Left you a 5-star review!",                                      time:"Tue",      date:"Tuesday"   },
    ],
  },
];

const ChatTab = ({ onOpenNotifs }) => {
  const [conversations, setConversations]   = useState(CHAT_CONVERSATIONS);
  const [activeConv,    setActiveConv]       = useState(null);
  const [msgInput,      setMsgInput]         = useState("");
  const [searchQ,       setSearchQ]          = useState("");
  const [isTyping,      setIsTyping]         = useState(false);
  const [sentStatus,    setSentStatus]       = useState({});
  const [showOffer,     setShowOffer]        = useState(false);
  const [offerVal,      setOfferVal]         = useState("");
  const [showActions,   setShowActions]      = useState(false);
  const [filter,        setFilter]           = useState("all"); // all|unread|buying|selling
  const totalUnread = conversations.reduce((s,c)=>s+c.unread,0);

  const sendMsg = (text, extra={}) => {
    if (!text.trim() && !extra.imgUrl) return;
    const id = Date.now();
    const msg = { id, from:"me", text:text.trim(), time:"Now", date:"Today", ...extra };
    setConversations(prev=>prev.map(c=>
      c.id===activeConv.id ? {...c, messages:[...c.messages,msg], lastMsg:text||"📷 Photo", lastTime:"now", unread:0} : c
    ));
    setActiveConv(prev=>({...prev, messages:[...prev.messages,msg]}));
    setSentStatus(s=>({...s,[id]:"sent"}));
    setMsgInput("");
    setTimeout(()=>setSentStatus(s=>({...s,[id]:"delivered"})),900);
    setTimeout(()=>{
      setSentStatus(s=>({...s,[id]:"read"}));
      setIsTyping(true);
    },2200);
    setTimeout(()=>{
      setIsTyping(false);
      const pool = [
        "Sounds good, thanks!",
        "That works for me 😊",
        "Great! When can I come by?",
        "Can we do a little lower?",
        "Is it still in good condition?",
        "Perfect — I'll be there!",
        "Do you have any other photos?",
        "What's the best you can do on price?",
      ];
      const reply = { id:Date.now()+1, from:"them", text:pool[Math.floor(Math.random()*pool.length)], time:"Now", date:"Today" };
      setConversations(prev=>prev.map(c=>
        c.id===activeConv?.id ? {...c, messages:[...c.messages,reply], lastMsg:reply.text, lastTime:"now", unread:1} : c
      ));
      setActiveConv(prev=>prev?{...prev, messages:[...prev.messages,reply]}:prev);
    },3800);
  };

  const filteredConvs = conversations.filter(c=>{
    const q = searchQ.toLowerCase();
    const matchSearch = !searchQ || c.name.toLowerCase().includes(q) || c.item.toLowerCase().includes(q);
    const matchFilter = filter==="all" || (filter==="unread"&&c.unread>0);
    return matchSearch && matchFilter;
  });

  // ── CONVERSATION VIEW ──────────────────────────────────────────
  if (activeConv) {
    const conv = conversations.find(c=>c.id===activeConv.id)||activeConv;
    const listing = listings.find(l=>l.id===conv.itemId);

    return (
      <div style={{display:"flex",flexDirection:"column",height:"100vh",background:"#F8F3EC",maxWidth:520,margin:"0 auto",position:"relative"}}>

        {/* Top bar */}
        <div style={{background:"white",padding:"12px 14px",display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid #EDE8E0",flexShrink:0,boxShadow:"0 2px 6px rgba(60,30,10,0.06)"}}>
          <button onClick={()=>{setActiveConv(null);setShowActions(false);}} style={{background:"#F5EDE4",border:"none",borderRadius:10,width:34,height:34,cursor:"pointer",fontSize:18,color:"#8B4513",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>‹</button>
          <div style={{position:"relative",flexShrink:0}}>
            <div style={{width:40,height:40,borderRadius:"50%",background:conv.avatarColor,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontWeight:700,color:"white",fontSize:16}}>
              {conv.avatar}
            </div>
            {conv.online&&<div style={{position:"absolute",bottom:1,right:1,width:10,height:10,background:"#4CAF8A",borderRadius:"50%",border:"2px solid white"}}/>}
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#2C1810"}}>{conv.name}</div>
              {conv.verified&&<span style={{background:"#8B4513",color:"white",fontSize:9,padding:"1px 5px",borderRadius:8,fontFamily:"sans-serif",fontWeight:700}}>✓</span>}
            </div>
            <div style={{fontFamily:"sans-serif",fontSize:11,color:conv.online?"#4CAF8A":"#A08070"}}>{conv.online?"Online now":"Last seen recently"}</div>
          </div>
          <button onClick={()=>setShowActions(!showActions)} style={{background:"#F5EDE4",border:"none",borderRadius:10,width:34,height:34,cursor:"pointer",fontSize:18,color:"#8B4513",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>⋯</button>
        </div>

        {/* Actions dropdown */}
        {showActions&&(
          <div style={{position:"absolute",top:60,right:14,background:"white",borderRadius:14,boxShadow:"0 8px 24px rgba(60,30,10,0.15)",zIndex:100,overflow:"hidden",minWidth:180,border:"1px solid #EDE8E0"}}>
            {[["🔇","Mute Conversation"],["🚨","Report User"],["🗑️","Delete Chat"],["⭐","Leave a Review"]].map(([icon,label])=>(
              <div key={label} onClick={()=>setShowActions(false)} style={{padding:"12px 16px",fontFamily:"sans-serif",fontSize:13,color:"#2C1810",cursor:"pointer",display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid #F5EDE4"}}
                onMouseEnter={e=>e.currentTarget.style.background="#FAF3EC"}
                onMouseLeave={e=>e.currentTarget.style.background=""}>
                <span>{icon}</span>{label}
              </div>
            ))}
          </div>
        )}

        {/* Listing context card */}
        <div style={{background:"white",margin:"10px 12px 0",borderRadius:14,padding:"10px 12px",display:"flex",gap:10,alignItems:"center",border:"1px solid #EDE8E0",flexShrink:0}}>
          <div style={{width:52,height:52,borderRadius:10,overflow:"hidden",flexShrink:0}}>
            <FurnitureIllustration type={conv.itemImg} small/>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:"#2C1810",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{conv.item}</div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:2}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"#8B4513"}}>${conv.itemPrice}</div>
              {listing&&<span style={{background:conditionColor[listing.condition]+"20",color:conditionColor[listing.condition],fontSize:10,padding:"1px 6px",borderRadius:8,fontFamily:"sans-serif",fontWeight:600}}>{listing.condition}</span>}
            </div>
          </div>
          <div style={{display:"flex",gap:6,flexShrink:0}}>
            <button onClick={()=>setShowOffer(true)} style={{background:"#F5EDE4",color:"#8B4513",border:"1px solid #D4A882",borderRadius:8,padding:"6px 9px",fontFamily:"sans-serif",fontSize:11,fontWeight:700,cursor:"pointer"}}>💰 Offer</button>
            <button style={{background:"#8B4513",color:"white",border:"none",borderRadius:8,padding:"6px 9px",fontFamily:"sans-serif",fontSize:11,fontWeight:700,cursor:"pointer"}}>Buy Now</button>
          </div>
        </div>

        {/* Message thread */}
        <div style={{flex:1,overflowY:"auto",padding:"12px 12px 4px",display:"flex",flexDirection:"column",gap:6}}>
          {conv.messages.map((msg,i)=>{
            const isMe = msg.from==="me";
            const isSys = msg.from==="system";
            const showDate = i===0||conv.messages[i-1].date!==msg.date;
            return (
              <div key={msg.id}>
                {showDate&&<div style={{textAlign:"center",fontFamily:"sans-serif",fontSize:11,color:"#B0A090",padding:"8px 0"}}>{msg.date}</div>}
                {isSys ? (
                  <div style={{background:"#E8F5EC",border:"1px solid #B0D8BC",borderRadius:12,padding:"9px 14px",fontFamily:"sans-serif",fontSize:12,color:"#2E7A46",textAlign:"center",margin:"4px 0"}}>{msg.text}</div>
                ) : (
                  <div style={{display:"flex",justifyContent:isMe?"flex-end":"flex-start",alignItems:"flex-end",gap:7}}>
                    {!isMe&&(
                      <div style={{width:26,height:26,borderRadius:"50%",background:conv.avatarColor,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"white",fontFamily:"'Playfair Display',serif",flexShrink:0}}>{conv.avatar}</div>
                    )}
                    <div style={{maxWidth:"74%"}}>
                      {msg.imgUrl ? (
                        <div style={{borderRadius:isMe?"16px 16px 4px 16px":"16px 16px 16px 4px",overflow:"hidden",border:`2px solid ${isMe?"#8B4513":"#EDE8E0"}`}}>
                          <img src={msg.imgUrl} alt="photo" style={{width:"100%",maxWidth:220,height:160,objectFit:"cover",display:"block"}}/>
                        </div>
                      ) : (
                        <div style={{background:isMe?"#8B4513":msg.isOffer?"#FFF8E6":"white",color:isMe?"white":"#2C1810",borderRadius:isMe?"18px 18px 4px 18px":"18px 18px 18px 4px",padding:"10px 14px",fontFamily:"sans-serif",fontSize:14,lineHeight:1.5,border:isMe?"none":msg.isOffer?"1.5px solid #E8A020":"1px solid #EDE8E0",boxShadow:isMe?"0 2px 8px rgba(139,69,19,0.2)":"0 1px 3px rgba(60,30,10,0.06)"}}>
                          {msg.text}
                        </div>
                      )}
                      <div style={{fontFamily:"sans-serif",fontSize:10,color:"#C0A890",marginTop:3,textAlign:isMe?"right":"left",display:"flex",gap:3,justifyContent:isMe?"flex-end":"flex-start",alignItems:"center"}}>
                        <span>{msg.time}</span>
                        {isMe&&sentStatus[msg.id]&&<span style={{color:sentStatus[msg.id]==="read"?"#4A8BC4":"#C0A890"}}>{sentStatus[msg.id]==="read"||sentStatus[msg.id]==="delivered"?"✓✓":"✓"}</span>}
                        {isMe&&sentStatus[msg.id]==="read"&&<span style={{fontSize:9,color:"#4A8BC4"}}>Seen</span>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {/* Typing indicator */}
          {isTyping&&(
            <div style={{display:"flex",alignItems:"center",gap:8,padding:"2px 0"}}>
              <div style={{width:26,height:26,borderRadius:"50%",background:conv.avatarColor,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"white",fontFamily:"'Playfair Display',serif",flexShrink:0}}>{conv.avatar}</div>
              <div style={{background:"white",borderRadius:"18px 18px 18px 4px",padding:"10px 16px",border:"1px solid #EDE8E0",display:"flex",gap:4,alignItems:"center"}}>
                {[0,1,2].map(i=>(
                  <div key={i} style={{width:7,height:7,borderRadius:"50%",background:"#C0A890",animation:"bounce 1.2s infinite",animationDelay:`${i*0.2}s`}}/>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Smart quick replies */}
        <div style={{padding:"6px 12px 4px",display:"flex",gap:6,overflowX:"auto",scrollbarWidth:"none",flexShrink:0}}>
          {["Still available?","Can I pick up today?","Best price?","Send more photos?","What are the dims?","Hold for me?"].map(q=>(
            <button key={q} onClick={()=>setMsgInput(q)} style={{background:"white",border:"1.5px solid #D4A882",borderRadius:20,padding:"5px 11px",fontFamily:"sans-serif",fontSize:11,fontWeight:600,color:"#8B4513",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>{q}</button>
          ))}
        </div>

        {/* Transaction action strip */}
        <div style={{padding:"2px 12px 6px",display:"flex",gap:7,overflowX:"auto",scrollbarWidth:"none",flexShrink:0}}>
          <button onClick={()=>setShowOffer(true)} style={{display:"flex",alignItems:"center",gap:5,background:"#FFF5E6",border:"1.5px solid #E8A020",borderRadius:16,padding:"5px 12px",fontFamily:"sans-serif",fontSize:11,fontWeight:700,color:"#B07010",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>💰 Make Offer</button>
          <label style={{display:"flex",alignItems:"center",gap:5,background:"#F0F8F4",border:"1.5px solid #B0D8BC",borderRadius:16,padding:"5px 12px",fontFamily:"sans-serif",fontSize:11,fontWeight:700,color:"#2E7A46",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
            📷 Photo
            <input type="file" accept="image/*" onChange={e=>{
              if(e.target.files[0]){
                const url=URL.createObjectURL(e.target.files[0]);
                sendMsg("",{imgUrl:url});
              }
            }} style={{display:"none"}}/>
          </label>
          <button onClick={()=>{
            const sysMsg={id:Date.now(),from:"system",text:`✅ Pickup confirmed for "${conv.item}". Payment of $${conv.itemPrice} released to seller.`,time:"Now",date:"Today"};
            setConversations(prev=>prev.map(c=>c.id===conv.id?{...c,messages:[...c.messages,sysMsg],lastMsg:"Pickup confirmed",lastTime:"now"}:c));
            setActiveConv(prev=>({...prev,messages:[...prev.messages,sysMsg]}));
          }} style={{display:"flex",alignItems:"center",gap:5,background:"#E8F5EC",border:"1.5px solid #B0D8BC",borderRadius:16,padding:"5px 12px",fontFamily:"sans-serif",fontSize:11,fontWeight:700,color:"#2E7A46",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>✅ Confirm Pickup</button>
          <button style={{display:"flex",alignItems:"center",gap:5,background:"#FEF0EF",border:"1.5px solid #F0C0B0",borderRadius:16,padding:"5px 12px",fontFamily:"sans-serif",fontSize:11,fontWeight:700,color:"#C46A3A",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>🚨 Report</button>
        </div>

        {/* Input bar */}
        <div style={{background:"white",padding:"8px 12px 24px",display:"flex",gap:8,alignItems:"center",borderTop:"1px solid #EDE8E0",flexShrink:0}}>
          <div style={{flex:1,background:"#F8F3EC",borderRadius:22,padding:"10px 16px",display:"flex",alignItems:"center"}}>
            <input value={msgInput} onChange={e=>setMsgInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg(msgInput)}
              placeholder={`Message ${conv.name}...`}
              style={{flex:1,background:"none",border:"none",outline:"none",fontFamily:"sans-serif",fontSize:14,color:"#2C1810"}}/>
          </div>
          <button onClick={()=>sendMsg(msgInput)} disabled={!msgInput.trim()} style={{width:44,height:44,borderRadius:"50%",background:msgInput.trim()?"#8B4513":"#DDD0C8",border:"none",cursor:msgInput.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,transition:"background 0.15s",boxShadow:msgInput.trim()?"0 3px 10px rgba(139,69,19,0.35)":"none"}}>➤</button>
        </div>

        {/* Offer sheet */}
        {showOffer&&(
          <div style={{position:"fixed",inset:0,background:"rgba(20,10,5,0.6)",zIndex:1200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setShowOffer(false)}>
            <div style={{background:"#FDFAF7",borderRadius:"22px 22px 0 0",width:"100%",maxWidth:520,padding:"24px 24px 36px"}} onClick={e=>e.stopPropagation()}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:800,color:"#2C1810",marginBottom:4}}>Make an Offer</div>
              <div style={{fontFamily:"sans-serif",fontSize:13,color:"#A08070",marginBottom:18}}>Listed at <strong>${conv.itemPrice}</strong>. The seller can accept, counter, or decline.</div>
              <div style={{position:"relative",marginBottom:12}}>
                <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:"#8B4513"}}>$</span>
                <input autoFocus type="number" value={offerVal} onChange={e=>setOfferVal(e.target.value)}
                  placeholder={String(Math.round(conv.itemPrice*0.85))}
                  style={{width:"100%",border:"2px solid #D4A882",borderRadius:12,padding:"14px 14px 14px 34px",fontFamily:"'Cormorant Garamond',serif",fontSize:30,color:"#2C1810",outline:"none",boxSizing:"border-box"}}/>
              </div>
              <div style={{display:"flex",gap:8,marginBottom:16}}>
                {[0.7,0.8,0.9].map(pct=>(
                  <button key={pct} onClick={()=>setOfferVal(String(Math.round(conv.itemPrice*pct)))}
                    style={{flex:1,background:offerVal===String(Math.round(conv.itemPrice*pct))?"#8B4513":"#F5EDE4",color:offerVal===String(Math.round(conv.itemPrice*pct))?"white":"#6B4C3A",border:"none",borderRadius:10,padding:"9px 4px",fontFamily:"sans-serif",fontSize:11,fontWeight:600,cursor:"pointer",transition:"all 0.15s"}}>
                    {Math.round(pct*100)}%<br/><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:700}}>${Math.round(conv.itemPrice*pct)}</span>
                  </button>
                ))}
              </div>
              {offerVal&&Number(offerVal)<conv.itemPrice*0.6&&(
                <div style={{background:"#FEF5E4",borderRadius:10,padding:"8px 12px",marginBottom:10,fontFamily:"sans-serif",fontSize:12,color:"#8A6010"}}>⚠️ Offers below 60% are rarely accepted.</div>
              )}
              <button onClick={()=>{
                if(!offerVal) return;
                const offerMsg={id:Date.now(),from:"me",text:`💰 Offer: $${offerVal} (listed at $${conv.itemPrice})`,time:"Now",date:"Today",isOffer:true};
                setConversations(prev=>prev.map(c=>c.id===conv.id?{...c,messages:[...c.messages,offerMsg],lastMsg:`Offer: $${offerVal}`,lastTime:"now"}:c));
                setActiveConv(prev=>({...prev,messages:[...prev.messages,offerMsg]}));
                setShowOffer(false); setOfferVal("");
                setTimeout(()=>setIsTyping(true),1500);
                setTimeout(()=>{
                  setIsTyping(false);
                  const accepted=Number(offerVal)>=conv.itemPrice*0.85;
                  const reply={id:Date.now()+1,from:"them",text:accepted?`✅ Deal! $${offerVal} works. When can you pick it up?`:`I appreciate the offer but the lowest I can go is $${Math.round(conv.itemPrice*0.9)}.`,time:"Now",date:"Today"};
                  setConversations(prev=>prev.map(c=>c.id===conv.id?{...c,messages:[...c.messages,reply],lastMsg:reply.text,lastTime:"now",unread:1}:c));
                  setActiveConv(prev=>prev?{...prev,messages:[...prev.messages,reply]}:prev);
                },3500);
              }} disabled={!offerVal} style={{width:"100%",background:offerVal?"#8B4513":"#DDD0C8",color:"white",border:"none",borderRadius:14,padding:"14px",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:offerVal?"pointer":"not-allowed"}}>
                Send Offer of ${offerVal||"—"} →
              </button>
              <div style={{textAlign:"center",marginTop:8,fontFamily:"sans-serif",fontSize:11,color:"#B0A090"}}>Payment only charged when seller accepts & you confirm.</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── INBOX LIST ────────────────────────────────────────────────
  return (
    <div style={{background:"#F8F3EC",minHeight:"100vh",paddingBottom:100}}>

      {/* Header */}
      <div style={{background:"white",padding:"20px 18px 0",position:"sticky",top:0,zIndex:50,boxShadow:"0 2px 8px rgba(60,30,10,0.06)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:"#2C1810"}}>Messages</div>
            {totalUnread>0&&<div style={{background:"#8B4513",color:"white",borderRadius:"50%",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,fontFamily:"sans-serif"}}>{totalUnread}</div>}
          </div>
          <button onClick={onOpenNotifs} style={{position:"relative",background:"#F5EDE4",border:"none",borderRadius:"50%",width:38,height:38,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>
            🔔
            {NOTIFICATIONS.filter(n=>!n.read).length>0&&<div style={{position:"absolute",top:6,right:6,width:8,height:8,background:"#C46A3A",borderRadius:"50%",border:"1.5px solid white"}}/>}
          </button>
        </div>

        {/* Search */}
        <div style={{position:"relative",marginBottom:10}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14}}>🔍</span>
          <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search conversations..."
            style={{width:"100%",background:"#F8F3EC",border:"1.5px solid #EDE8E0",borderRadius:20,padding:"9px 14px 9px 34px",fontFamily:"sans-serif",fontSize:13,color:"#2C1810",outline:"none",boxSizing:"border-box"}}/>
        </div>

        {/* Filter pills */}
        <div style={{display:"flex",gap:8,paddingBottom:12,overflowX:"auto",scrollbarWidth:"none"}}>
          {[["all","All"],["unread","Unread"]].map(([id,label])=>(
            <button key={id} onClick={()=>setFilter(id)} style={{background:filter===id?"#8B4513":"#F5EDE4",color:filter===id?"white":"#6B4C3A",border:"none",borderRadius:20,padding:"6px 16px",fontFamily:"sans-serif",fontSize:12,fontWeight:filter===id?700:500,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",gap:5}}>
              {label}{id==="unread"&&totalUnread>0&&<span style={{background:filter==="unread"?"rgba(255,255,255,0.3)":"#E0D0C0",borderRadius:10,padding:"1px 6px",fontSize:10,fontWeight:700}}>{totalUnread}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation rows */}
      <div style={{background:"white"}}>
        {filteredConvs.length===0&&(
          <div style={{textAlign:"center",padding:"60px 24px",color:"#B0A090"}}>
            <div style={{fontSize:48,marginBottom:12}}>💬</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"#2C1810"}}>{searchQ?"No results":"No conversations yet"}</div>
            <div style={{fontFamily:"sans-serif",fontSize:13,marginTop:6}}>When you message a seller or buyer, it'll show up here.</div>
          </div>
        )}
        {filteredConvs.map(conv=>(
          <div key={conv.id} onClick={()=>setActiveConv(conv)} style={{display:"flex",gap:12,padding:"14px 18px",borderBottom:"1px solid #F5EDE4",cursor:"pointer",background:conv.unread>0?"#FFF9F5":"white",transition:"background 0.12s"}}
            onMouseEnter={e=>e.currentTarget.style.background="#FAF3EC"}
            onMouseLeave={e=>e.currentTarget.style.background=conv.unread>0?"#FFF9F5":"white"}>
            <div style={{position:"relative",flexShrink:0}}>
              <div style={{width:52,height:52,borderRadius:"50%",background:conv.avatarColor,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontWeight:700,color:"white",fontSize:20}}>{conv.avatar}</div>
              {conv.online&&<div style={{position:"absolute",bottom:2,right:2,width:12,height:12,background:"#4CAF8A",borderRadius:"50%",border:"2px solid white"}}/>}
              {conv.unread>0&&<div style={{position:"absolute",top:-2,right:-2,background:"#8B4513",color:"white",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,fontFamily:"sans-serif"}}>{conv.unread}</div>}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:conv.unread>0?800:600,color:"#2C1810"}}>{conv.name}</div>
                  {conv.verified&&<span style={{background:"#F5EDE4",color:"#8B4513",fontSize:9,padding:"1px 5px",borderRadius:8,fontFamily:"sans-serif",fontWeight:700}}>✓</span>}
                </div>
                <span style={{fontFamily:"sans-serif",fontSize:11,color:"#B0A090",flexShrink:0,marginLeft:8}}>{conv.lastTime}</span>
              </div>
              <div style={{fontFamily:"sans-serif",fontSize:11,color:"#8B4513",fontWeight:500,marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                📦 {conv.item} · <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,fontWeight:700}}>${conv.itemPrice}</span>
              </div>
              <div style={{fontFamily:"sans-serif",fontSize:12,color:conv.unread>0?"#3C2010":"#A08070",fontWeight:conv.unread>0?600:400,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                {conv.lastMsg}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// ─── FEATURE 1: AI PRICE SUGGESTER ──────────────────────────────
// ═══════════════════════════════════════════════════════════════

const PRICE_DATA = {
  "Sofas":     { "Like New":[320,680], "Good":[180,420], "Fair":[80,200],  brands:{"Article":[350,680],"IKEA":[120,280],"West Elm":[380,720],"Pottery Barn":[420,820],"CB2":[360,700],"Unknown":[120,300]} },
  "Chairs":    { "Like New":[120,480], "Good":[60,280],  "Fair":[30,120],  brands:{"Herman Miller":[450,820],"Steelcase":[380,700],"Article":[160,380],"IKEA":[40,120],"West Elm":[180,420],"Unknown":[50,160]} },
  "Tables":    { "Like New":[200,620], "Good":[110,380], "Fair":[50,180],  brands:{"CB2":[280,620],"West Elm":[240,580],"IKEA":[80,220],"Pottery Barn":[320,700],"RH":[500,1100],"Unknown":[80,280]} },
  "Beds":      { "Like New":[280,720], "Good":[150,420], "Fair":[70,210],  brands:{"West Elm":[380,780],"Pottery Barn":[420,920],"IKEA":[120,280],"RH":[600,1400],"Unknown":[100,300]} },
  "Storage":   { "Like New":[80,380],  "Good":[45,220],  "Fair":[20,100],  brands:{"IKEA":[40,160],"CB2":[160,420],"RH":[280,680],"West Elm":[180,480],"Unknown":[30,120]} },
  "Dressers":  { "Like New":[160,520], "Good":[90,300],  "Fair":[40,140],  brands:{"IKEA":[80,200],"West Elm":[220,580],"Pottery Barn":[280,680],"Unknown":[60,200]} },
  "Office":    { "Like New":[180,600], "Good":[90,340],  "Fair":[40,160],  brands:{"Herman Miller":[500,1100],"Steelcase":[420,900],"IKEA":[60,180],"Unknown":[60,200]} },
  "Outdoor":   { "Like New":[120,480], "Good":[60,260],  "Fair":[30,120],  brands:{"West Elm":[180,480],"Pottery Barn":[200,520],"Unknown":[50,180]} },
  "Lighting":  { "Like New":[60,280],  "Good":[30,150],  "Fair":[15,70],   brands:{"West Elm":[80,280],"CB2":[90,320],"IKEA":[20,80],"Unknown":[20,90]} },
  "Rugs":      { "Like New":[80,420],  "Good":[40,220],  "Fair":[20,100],  brands:{"West Elm":[120,420],"Pottery Barn":[140,480],"IKEA":[30,100],"Unknown":[30,120]} },
  "Decor":     { "Like New":[30,180],  "Good":[15,90],   "Fair":[8,40],    brands:{"CB2":[40,180],"West Elm":[35,160],"Unknown":[10,60]} },
  "Other":     { "Like New":[40,200],  "Good":[20,110],  "Fair":[10,55],   brands:{"Unknown":[10,80]} },
};

const getPriceSuggestion = (category, condition, brand, dims) => {
  const cat   = PRICE_DATA[category] || PRICE_DATA["Other"];
  const cond  = cat[condition]       || cat["Good"];
  const [lo, hi] = cond;
  // Brand adjustment
  const brandRanges = cat.brands || {};
  let brandMult = 1.0;
  const normalizedBrand = Object.keys(brandRanges).find(b => brand?.toLowerCase().includes(b.toLowerCase()));
  if (normalizedBrand) {
    const [bLo, bHi] = brandRanges[normalizedBrand];
    brandMult = ((bLo + bHi) / 2) / ((lo + hi) / 2);
  }
  const base   = Math.round(((lo + hi) / 2) * brandMult);
  const adjLo  = Math.round(lo  * brandMult);
  const adjHi  = Math.round(hi  * brandMult);
  const sweet  = Math.round(base * 0.92); // "sweet spot" slightly below midpoint
  // Comps (simulated)
  const comps = [
    { label:"Sold 3d ago",  price: Math.round(sweet * (0.88 + Math.random()*0.18)), dist:"1.4 mi" },
    { label:"Sold 1wk ago", price: Math.round(sweet * (0.82 + Math.random()*0.22)), dist:"3.2 mi" },
    { label:"Active now",   price: Math.round(sweet * (0.90 + Math.random()*0.20)), dist:"2.7 mi" },
    { label:"Active now",   price: Math.round(sweet * (1.00 + Math.random()*0.15)), dist:"0.9 mi" },
  ];
  const sellSpeed = adjLo < 150 ? "1–3 days" : adjLo < 400 ? "3–7 days" : "7–14 days";
  return { lo: adjLo, hi: adjHi, sweet, comps, sellSpeed, brandMult };
};

const AIPriceSuggester = ({ category, condition, brand, onAccept, onClose }) => {
  const [loading,  setLoading]  = useState(true);
  const [result,   setResult]   = useState(null);
  const [chosen,   setChosen]   = useState(null);
  const [custom,   setCustom]   = useState("");
  const [tab,      setTab]      = useState("suggest"); // suggest | comps | tips

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setResult(getPriceSuggestion(category, condition, brand));
      setLoading(false);
    }, 1800);
    return () => clearTimeout(t);
  }, [category, condition, brand]);

  const priceOpts = result ? [
    { id:"low",    label:"Quick Sale",   price: result.lo,    tag:"Sells fastest",    color:"#4CAF8A",  desc:"Price to move it this weekend" },
    { id:"sweet",  label:"Sweet Spot",   price: result.sweet, tag:"Recommended ⭐",   color:"#8B4513",  desc:"Best balance of speed & value" },
    { id:"high",   label:"Top Dollar",   price: result.hi,    tag:"Max value",         color:"#5B4CF5",  desc:"May take longer — worth the wait" },
  ] : [];

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(20,10,5,0.72)",zIndex:1500,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(5px)"}} onClick={onClose}>
      <div style={{background:"#FDFAF7",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:520,maxHeight:"90vh",display:"flex",flexDirection:"column",boxShadow:"0 -16px 60px rgba(30,15,5,0.3)"}} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{background:"linear-gradient(135deg,#2C1810,#8B4513)",padding:"18px 22px 16px",borderRadius:"24px 24px 0 0",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <div style={{width:40,height:40,background:"rgba(255,255,255,0.15)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🤖</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900,color:"white"}}>AI Price Suggester</div>
              <div style={{fontFamily:"sans-serif",fontSize:11,color:"rgba(255,255,255,0.65)"}}>Analyzing {category} · {condition} · {brand||"Unknown brand"}</div>
            </div>
            <button onClick={onClose} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:30,height:30,color:"white",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          </div>
          {/* Tabs */}
          <div style={{display:"flex",gap:6}}>
            {[["suggest","💡 Suggest"],["comps","📊 Comps"],["tips","🏷️ Tips"]].map(([id,label])=>(
              <button key={id} onClick={()=>setTab(id)} style={{flex:1,background:tab===id?"rgba(255,255,255,0.2)":"transparent",border:`1px solid ${tab===id?"rgba(255,255,255,0.5)":"rgba(255,255,255,0.15)"}`,borderRadius:20,padding:"5px 0",color:"white",fontFamily:"sans-serif",fontSize:11,fontWeight:tab===id?700:400,cursor:"pointer"}}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{overflowY:"auto",flex:1,padding:"18px 20px 24px"}}>
          {/* Loading state */}
          {loading && (
            <div style={{textAlign:"center",padding:"40px 20px"}}>
              <div style={{fontSize:48,marginBottom:16,animation:"bounce 1s infinite"}}>🔍</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:"#2C1810",marginBottom:8}}>Analyzing the market…</div>
              <div style={{fontFamily:"sans-serif",fontSize:13,color:"#A08070",lineHeight:1.7}}>
                Scanning recent sales of {category?.toLowerCase()} in Atlanta…<br/>
                Checking {brand||"comparable"} brand pricing…<br/>
                Factoring in condition & local demand…
              </div>
              <div style={{marginTop:20,display:"flex",gap:6,justifyContent:"center"}}>
                {[0,1,2].map(i=>(
                  <div key={i} style={{width:8,height:8,borderRadius:"50%",background:"#D4A882",animation:"bounce 1.2s infinite",animationDelay:`${i*0.2}s`}}/>
                ))}
              </div>
            </div>
          )}

          {!loading && result && tab==="suggest" && (
            <div>
              {/* Market range bar */}
              <div style={{background:"white",borderRadius:16,padding:"16px",marginBottom:16,border:"1px solid #EDE8E0"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:12}}>Atlanta Market Range</div>
                <div style={{position:"relative",height:10,background:"#F0E8DC",borderRadius:5,marginBottom:6}}>
                  <div style={{position:"absolute",left:"15%",right:"15%",top:0,height:"100%",background:"linear-gradient(90deg,#4CAF8A,#8B4513,#5B4CF5)",borderRadius:5}}/>
                  <div style={{position:"absolute",left:`${Math.round(((result.sweet-result.lo)/(result.hi-result.lo))*70+15)}%`,top:-4,width:18,height:18,background:"#8B4513",borderRadius:"50%",border:"3px solid white",transform:"translateX(-50%)",boxShadow:"0 2px 8px rgba(139,69,19,0.4)"}}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontFamily:"sans-serif",fontSize:11,color:"#A08070"}}>
                  <span>Low ${result.lo}</span>
                  <span style={{fontWeight:700,color:"#8B4513"}}>Sweet Spot ${result.sweet}</span>
                  <span>High ${result.hi}</span>
                </div>
                <div style={{marginTop:10,background:"#F5EDE4",borderRadius:10,padding:"8px 12px",fontFamily:"sans-serif",fontSize:12,color:"#6B4C3A"}}>
                  📍 Based on <strong>{result.comps.length} comparable listings</strong> in Atlanta · Avg sell time: <strong>{result.sellSpeed}</strong>
                </div>
              </div>

              {/* Price option cards */}
              <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
                {priceOpts.map(opt=>(
                  <div key={opt.id} onClick={()=>setChosen(opt.id)} style={{background:"white",borderRadius:14,padding:"14px 16px",border:`2px solid ${chosen===opt.id?opt.color:"#EDE8E0"}`,cursor:"pointer",transition:"all 0.15s",boxShadow:chosen===opt.id?`0 4px 16px ${opt.color}30`:"none"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{width:36,height:36,background:opt.color+"18",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          <div style={{width:14,height:14,borderRadius:"50%",background:chosen===opt.id?opt.color:opt.color+"60",transition:"background 0.15s"}}/>
                        </div>
                        <div>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810"}}>{opt.label}</div>
                            <span style={{background:opt.color+"18",color:opt.color,fontSize:10,fontFamily:"sans-serif",fontWeight:700,padding:"2px 7px",borderRadius:10}}>{opt.tag}</span>
                          </div>
                          <div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070",marginTop:1}}>{opt.desc}</div>
                        </div>
                      </div>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:700,color:opt.color}}>${opt.price}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom price */}
              <div style={{background:"white",borderRadius:14,padding:"14px 16px",marginBottom:16,border:"1px solid #EDE8E0"}}>
                <div style={{fontFamily:"sans-serif",fontSize:12,fontWeight:700,color:"#8A6A5A",textTransform:"uppercase",letterSpacing:0.4,marginBottom:8}}>Set Your Own Price</div>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{position:"relative",flex:1}}>
                    <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"#8B4513"}}>$</span>
                    <input type="number" value={custom} onChange={e=>{setCustom(e.target.value);setChosen("custom");}}
                      placeholder="Enter price"
                      style={{width:"100%",border:`1.5px solid ${chosen==="custom"?"#8B4513":"#DDD0C8"}`,borderRadius:10,padding:"10px 14px 10px 30px",fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:"#2C1810",outline:"none",boxSizing:"border-box"}}/>
                  </div>
                  {custom && Number(custom) < result.lo * 0.6 && (
                    <div style={{fontFamily:"sans-serif",fontSize:11,color:"#C46A3A",maxWidth:100,lineHeight:1.4}}>⚠️ Below market — may undersell</div>
                  )}
                  {custom && Number(custom) > result.hi * 1.4 && (
                    <div style={{fontFamily:"sans-serif",fontSize:11,color:"#5B4CF5",maxWidth:100,lineHeight:1.4}}>💎 Above market — may sit longer</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {!loading && result && tab==="comps" && (
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#2C1810",marginBottom:12}}>Comparable Sales Near You</div>
              <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
                {result.comps.map((comp,i)=>(
                  <div key={i} style={{background:"white",borderRadius:12,padding:"12px 16px",border:"1px solid #EDE8E0",display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:44,height:44,borderRadius:10,overflow:"hidden",flexShrink:0}}>
                      <FurnitureIllustration type={["sofa","chair","table","shelf","rattan","bed"][i%6]}/>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:"#2C1810"}}>Similar {category}</div>
                      <div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070"}}>{comp.dist} away · {comp.label}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700,color:comp.label.includes("Sold")?"#4CAF8A":"#8B4513"}}>${comp.price}</div>
                      <div style={{fontFamily:"sans-serif",fontSize:9,color:"#B0A090"}}>{comp.label.includes("Sold")?"sold":"listed"}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{background:"#F5EDE4",borderRadius:12,padding:"12px 14px",fontFamily:"sans-serif",fontSize:12,color:"#6B4C3A",lineHeight:1.6}}>
                📊 Market average: <strong>${Math.round(result.comps.reduce((s,c)=>s+c.price,0)/result.comps.length)}</strong> · Your sweet spot ${result.sweet} is <strong>{result.sweet > Math.round(result.comps.reduce((s,c)=>s+c.price,0)/result.comps.length) ? "above" : "below"} average</strong>, which means {result.sweet > Math.round(result.comps.reduce((s,c)=>s+c.price,0)/result.comps.length) ? "it may take a little longer to sell but maximizes your return." : "it should sell quickly."}
              </div>
            </div>
          )}

          {!loading && tab==="tips" && (
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#2C1810",marginBottom:14}}>Selling Tips for {category}</div>
              {[
                { icon:"📸", title:"Photos sell furniture", tip:"Listings with 5+ clear, natural-light photos get 4× more views. Show all angles, any wear, and the item in a styled setting." },
                { icon:"📐", title:"Always include dimensions", tip:"Buyers won't message about items without measurements. Include width, depth, and height in inches." },
                { icon:"🏷️", title:"Brand names matter", tip:`"${brand||"Name-brand"}" in your title drives 60% more search traffic. Always include the brand and model name.` },
                { icon:"⏱️", title:"Post on Thursday–Saturday", tip:"70% of furniture pickups happen on weekends. Listing Thursday gives buyers time to plan." },
                { icon:"💬", title:"Reply within 2 hours", tip:"Sellers who respond quickly get 3× more completed transactions. Enable push notifications." },
                { icon:"🤝", title:"Price to negotiate", tip:"List 10–15% above your minimum to leave room for offers. Buyers expect to negotiate on furniture." },
              ].map((t,i)=>(
                <div key={i} style={{background:"white",borderRadius:12,padding:"14px",marginBottom:10,border:"1px solid #EDE8E0",display:"flex",gap:12,alignItems:"flex-start"}}>
                  <div style={{width:36,height:36,background:"#F5EDE4",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{t.icon}</div>
                  <div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:3}}>{t.title}</div>
                    <div style={{fontFamily:"sans-serif",fontSize:12,color:"#6B4C3A",lineHeight:1.6}}>{t.tip}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer CTA */}
        {!loading && result && tab==="suggest" && (
          <div style={{padding:"12px 20px 32px",borderTop:"1px solid #EDE8E0",flexShrink:0}}>
            <button onClick={()=>{
              const price = chosen==="custom" ? custom : priceOpts.find(p=>p.id===chosen)?.price || result.sweet;
              onAccept(String(price));
            }} disabled={!chosen && !custom} style={{width:"100%",background:chosen||custom?"#8B4513":"#DDD0C8",color:"white",border:"none",borderRadius:14,padding:"15px",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:chosen||custom?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              Use ${chosen==="custom"?custom:(priceOpts.find(p=>p.id===chosen)?.price||result?.sweet||"—")} as My Price →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// ─── FEATURE 2: MOVING SALE COORDINATOR ──────────────────────
// ═══════════════════════════════════════════════════════════════

const MovingSaleCoordinator = ({ onClose, onNavigate }) => {
  const [step,       setStep]       = useState(0); // 0=intro,1=select,2=schedule,3=share
  const [selected,   setSelected]   = useState([]);
  const [moveDate,   setMoveDate]   = useState("");
  const [discount,   setDiscount]   = useState(10);
  const [shareLink,  setShareLink]  = useState("");
  const toggle = id => setSelected(p => p.includes(id) ? p.filter(x=>x!==id) : [...p, id]);
  const selItems = listings.filter(l=>!l.sold&&selected.includes(l.id));
  const totalValue = selItems.reduce((s,i)=>s+i.price,0);
  const discountedValue = Math.round(totalValue*(1-discount/100));

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(20,10,5,0.72)",zIndex:1500,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(5px)"}} onClick={onClose}>
      <div style={{background:"#FDFAF7",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:520,maxHeight:"92vh",display:"flex",flexDirection:"column",boxShadow:"0 -16px 60px rgba(30,15,5,0.3)"}} onClick={e=>e.stopPropagation()}>

        <div style={{background:"linear-gradient(135deg,#3D6B8C,#4A8CAA)",padding:"18px 22px 16px",borderRadius:"24px 24px 0 0",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
            <span style={{fontSize:28}}>📦</span>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900,color:"white"}}>Moving Sale Planner</div>
              <div style={{fontFamily:"sans-serif",fontSize:11,color:"rgba(255,255,255,0.7)"}}>Bundle your furniture · Set a date · Share one link</div>
            </div>
            <button onClick={onClose} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:30,height:30,color:"white",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          </div>
          {/* Step dots */}
          <div style={{display:"flex",gap:6,marginTop:10}}>
            {["Pick Items","Schedule","Share"].map((s,i)=>(
              <div key={s} style={{flex:1,height:3,borderRadius:2,background:i<=step-0?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.25)"}}/>
            ))}
          </div>
        </div>

        <div style={{overflowY:"auto",flex:1,padding:"18px 20px"}}>
          {step===0 && (
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:"#2C1810",marginBottom:4}}>Select items for your moving sale</div>
              <div style={{fontFamily:"sans-serif",fontSize:12,color:"#A08070",marginBottom:16}}>Buyers can purchase multiple items from your sale in one pickup trip.</div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {listings.filter(l=>!l.sold).map(l=>(
                  <div key={l.id} onClick={()=>toggle(l.id)} style={{display:"flex",alignItems:"center",gap:10,background:selected.includes(l.id)?"#FFF3E8":"white",borderRadius:12,padding:"10px 14px",border:`1.5px solid ${selected.includes(l.id)?"#8B4513":"#EDE8E0"}`,cursor:"pointer",transition:"all 0.15s"}}>
                    <div style={{width:48,height:48,borderRadius:8,overflow:"hidden",flexShrink:0}}><FurnitureIllustration type={l.img} small/></div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:"#2C1810",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.title}</div>
                      <div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070"}}>{l.brand} · {l.condition}</div>
                    </div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"#8B4513",marginRight:8}}>${l.price}</div>
                    <div style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${selected.includes(l.id)?"#8B4513":"#DDD0C8"}`,background:selected.includes(l.id)?"#8B4513":"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {selected.includes(l.id)&&<span style={{color:"white",fontSize:12}}>✓</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step===1 && (
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:"#2C1810",marginBottom:4}}>Schedule your sale</div>
              <div style={{fontFamily:"sans-serif",fontSize:12,color:"#A08070",marginBottom:16}}>Set a pickup window and optional bundle discount to attract more buyers.</div>
              <div style={{marginBottom:16}}>
                <div style={{fontSize:11,fontFamily:"sans-serif",fontWeight:700,color:"#8A6A5A",textTransform:"uppercase",marginBottom:6}}>Moving Date (approx.)</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {["This Weekend","Next Weekend","2 Weeks Out","Custom"].map(d=>(
                    <button key={d} onClick={()=>setMoveDate(d)} style={{background:moveDate===d?"#3D6B8C":"#F0F4F8",color:moveDate===d?"white":"#2C4A6A",border:`1.5px solid ${moveDate===d?"#3D6B8C":"#C8D8E8"}`,borderRadius:10,padding:"8px 14px",fontFamily:"sans-serif",fontSize:12,fontWeight:600,cursor:"pointer"}}>{d}</button>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:16}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,fontFamily:"sans-serif",fontWeight:700,color:"#8A6A5A",textTransform:"uppercase",marginBottom:6}}>
                  <span>Bundle Discount</span><span style={{color:"#3D6B8C"}}>{discount}% off for multi-item buyers</span>
                </div>
                <input type="range" min={0} max={30} value={discount} onChange={e=>setDiscount(Number(e.target.value))} style={{width:"100%",accentColor:"#3D6B8C"}}/>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:4,fontFamily:"sans-serif",fontSize:10,color:"#A08070"}}><span>No discount</span><span>30% off</span></div>
              </div>
              <div style={{background:"#F0F4F8",borderRadius:14,padding:"14px 16px",border:"1px solid #C8D8E8"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C4A6A",marginBottom:10}}>Sale Summary</div>
                {[
                  ["Items",`${selItems.length} pieces`],
                  ["Total Value",`$${totalValue}`],
                  ["With ${discount}% Bundle Discount",`$${discountedValue}`],
                  ["Pickup Window",moveDate||"Not set"],
                ].map(([k,v])=>(
                  <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #D8E4EC",fontFamily:"sans-serif",fontSize:12}}>
                    <span style={{color:"#6A8AA0"}}>{k}</span><span style={{fontWeight:700,color:"#2C4A6A"}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step===2 && (
            <div style={{textAlign:"center",padding:"10px 0"}}>
              <div style={{fontSize:56,marginBottom:12}}>🎉</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:"#2C1810",marginBottom:8}}>Your Moving Sale is Live!</div>
              <div style={{fontFamily:"sans-serif",fontSize:13,color:"#A08070",lineHeight:1.7,marginBottom:20}}>Share this link and buyers can browse all your items and reserve multiple pieces for one pickup.</div>
              <div style={{background:"#F0F4F8",borderRadius:14,padding:"14px 16px",marginBottom:16,border:"1px dashed #3D6B8C"}}>
                <div style={{fontFamily:"sans-serif",fontSize:11,color:"#6A8AA0",marginBottom:6}}>Your sale link</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#3D6B8C"}}>furnish.app/sale/jordan-atl-2026</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {[["📋 Copy Link","Copy"],["📱 Share to Contacts","Share"],["📘 Post to Neighborhood FB Group","Post"],["🐦 Tweet Your Sale","Tweet"]].map(([label])=>(
                  <button key={label} style={{background:"white",border:"1.5px solid #C8D8E8",borderRadius:12,padding:"12px",fontFamily:"sans-serif",fontSize:13,fontWeight:600,color:"#3D6B8C",cursor:"pointer"}}>{label}</button>
                ))}
              </div>
              <div style={{marginTop:16,background:"#FFF8F0",borderRadius:12,padding:"12px 14px",fontFamily:"sans-serif",fontSize:12,color:"#8A7A6A",lineHeight:1.6}}>
                💡 Moving sales with bundle discounts sell <strong>73% faster</strong> than individual listings.
              </div>
            </div>
          )}
        </div>

        <div style={{padding:"12px 20px 32px",borderTop:"1px solid #EDE8E0",flexShrink:0,display:"flex",gap:10}}>
          {step>0&&<button onClick={()=>setStep(s=>s-1)} style={{flex:1,background:"#F5EDE4",color:"#8B4513",border:"none",borderRadius:12,padding:"13px",fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,cursor:"pointer"}}>← Back</button>}
          {step<2&&<button onClick={()=>{if(step===0&&selected.length===0)return;setStep(s=>s+1);}} style={{flex:2,background:step===0&&selected.length===0?"#DDD0C8":"#3D6B8C",color:"white",border:"none",borderRadius:12,padding:"13px",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:step===0&&selected.length===0?"not-allowed":"pointer"}}>
            {step===0?`Continue with ${selected.length} item${selected.length!==1?"s":""}`:step===1?"Create My Moving Sale →":""}
          </button>}
          {step===2&&<button onClick={onClose} style={{flex:2,background:"#3D6B8C",color:"white",border:"none",borderRadius:12,padding:"13px",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:"pointer"}}>Done ✓</button>}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// ─── FEATURE 3: SELLER TRUST BADGE SYSTEM ────────────────────
// ═══════════════════════════════════════════════════════════════

const TRUST_TIERS = [
  { id:"new",    label:"New Seller",    icon:"🌱", color:"#78909C", req:"0 sales",       desc:"Just getting started",                   minSales:0,  minRating:0   },
  { id:"rising", label:"Rising Seller", icon:"📈", color:"#26A69A", req:"3+ sales",      desc:"Building a reputation",                  minSales:3,  minRating:4.0 },
  { id:"trusted",label:"Trusted Seller",icon:"✅", color:"#43A047", req:"5+ sales, 4.5★", desc:"Consistent & reliable",                 minSales:5,  minRating:4.5 },
  { id:"power",  label:"Power Seller",  icon:"⚡", color:"#F57C00", req:"20+ sales, 4.7★","desc":"Top performer on furnish.",            minSales:20, minRating:4.7 },
  { id:"elite",  label:"Elite Seller",  icon:"👑", color:"#8B4513", req:"50+ sales, 4.9★","desc":"The best of furnish.",                minSales:50, minRating:4.9 },
];

const getTrustTier = (sales, rating) => {
  const tiers = [...TRUST_TIERS].reverse();
  return tiers.find(t => sales >= t.minSales && rating >= t.minRating) || TRUST_TIERS[0];
};

const SellerTrustBadge = ({ sales=4, rating=4.9, size="medium", showDetails=false }) => {
  const tier = getTrustTier(sales, rating);
  const sizes = { small:{badge:18,icon:12,font:10}, medium:{badge:28,icon:18,font:12}, large:{badge:44,icon:28,font:14} };
  const s = sizes[size];
  if (!showDetails) return (
    <div style={{display:"flex",alignItems:"center",gap:5}}>
      <div style={{width:s.badge,height:s.badge,borderRadius:"50%",background:`${tier.color}18`,border:`1.5px solid ${tier.color}60`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:s.icon}}>{tier.icon}</div>
      <span style={{fontFamily:"sans-serif",fontSize:s.font,fontWeight:700,color:tier.color}}>{tier.label}</span>
    </div>
  );
  // Full badge detail card
  const nextTier = TRUST_TIERS[TRUST_TIERS.indexOf(tier)+1];
  return (
    <div style={{background:"white",borderRadius:16,border:`1.5px solid ${tier.color}30`,overflow:"hidden"}}>
      <div style={{background:`linear-gradient(135deg,${tier.color},${tier.color}CC)`,padding:"16px 18px",display:"flex",alignItems:"center",gap:14}}>
        <div style={{width:54,height:54,background:"rgba(255,255,255,0.2)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>{tier.icon}</div>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900,color:"white"}}>{tier.label}</div>
          <div style={{fontFamily:"sans-serif",fontSize:12,color:"rgba(255,255,255,0.8)"}}>{tier.desc}</div>
        </div>
      </div>
      <div style={{padding:"14px 18px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          {[["Sales",sales],["Rating",`${rating}⭐`],["Response","98%"],["Verified","Yes ✓"]].map(([k,v])=>(
            <div key={k} style={{background:"#F8F3EC",borderRadius:10,padding:"10px 12px"}}>
              <div style={{fontFamily:"sans-serif",fontSize:10,color:"#A08070",textTransform:"uppercase",letterSpacing:0.3}}>{k}</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700,color:"#2C1810",marginTop:2}}>{v}</div>
            </div>
          ))}
        </div>
        {nextTier && (
          <div style={{background:`${nextTier.color}10`,borderRadius:10,padding:"10px 12px",border:`1px solid ${nextTier.color}30`}}>
            <div style={{fontFamily:"sans-serif",fontSize:11,color:"#8A7A6A",marginBottom:4}}>Next tier: <strong style={{color:nextTier.color}}>{nextTier.icon} {nextTier.label}</strong></div>
            <div style={{fontFamily:"sans-serif",fontSize:11,color:"#8A7A6A"}}>Need: {nextTier.req}</div>
            <div style={{marginTop:8,height:4,background:"#EDE8E0",borderRadius:2,overflow:"hidden"}}>
              <div style={{width:`${Math.min(100,Math.round((sales/nextTier.minSales)*100))}%`,height:"100%",background:nextTier.color,borderRadius:2,transition:"width 0.5s"}}/>
            </div>
            <div style={{fontFamily:"sans-serif",fontSize:10,color:"#B0A090",marginTop:3}}>{sales}/{nextTier.minSales} sales · {rating}/{nextTier.minRating}★</div>
          </div>
        )}
        {!nextTier && <div style={{background:"#F5EDE4",borderRadius:10,padding:"10px 12px",textAlign:"center",fontFamily:"sans-serif",fontSize:12,color:"#8B4513",fontWeight:700}}>🏆 Maximum tier achieved!</div>}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// ─── FEATURE 4: NEIGHBORHOOD HEAT MAP ────────────────────────
// ═══════════════════════════════════════════════════════════════

const NEIGHBORHOODS = [
  { id:1, name:"Midtown",           lat:33.783, lng:-84.383, count:14, avgPrice:380, hotness:0.95, color:"#C46A3A" },
  { id:2, name:"Buckhead",          lat:33.838, lng:-84.378, count:9,  avgPrice:520, hotness:0.78, color:"#E8A020" },
  { id:3, name:"East Atlanta",      lat:33.726, lng:-84.341, count:11, avgPrice:145, hotness:0.88, color:"#C46A3A" },
  { id:4, name:"Decatur",           lat:33.773, lng:-84.297, count:7,  avgPrice:190, hotness:0.55, color:"#4CAF8A" },
  { id:5, name:"Virginia-Highland", lat:33.771, lng:-84.352, count:5,  avgPrice:340, hotness:0.42, color:"#4CAF8A" },
  { id:6, name:"Grant Park",        lat:33.736, lng:-84.369, count:8,  avgPrice:220, hotness:0.66, color:"#E8A020" },
  { id:7, name:"Sandy Springs",     lat:33.924, lng:-84.385, count:4,  avgPrice:450, hotness:0.30, color:"#78909C" },
  { id:8, name:"Marietta",          lat:33.954, lng:-84.549, count:3,  avgPrice:310, hotness:0.22, color:"#78909C" },
];

const NeighborhoodHeatMap = ({ onClose, onNavigate }) => {
  const [selected, setSelected] = useState(null);
  const [filter,   setFilter]   = useState("all"); // all|budget|premium|hot
  const [planMode, setPlanMode] = useState(false);
  const [trip,     setTrip]     = useState([]);

  const toggleTrip = id => setTrip(p => p.includes(id) ? p.filter(x=>x!==id) : [...p, id]);
  const filtered = NEIGHBORHOODS.filter(n => {
    if (filter==="budget")  return n.avgPrice < 250;
    if (filter==="premium") return n.avgPrice >= 350;
    if (filter==="hot")     return n.hotness >= 0.70;
    return true;
  });

  const hotnessLabel = h => h>=0.8?"🔥 Very Hot":h>=0.6?"♨️ Warm":h>=0.4?"🟡 Moderate":"❄️ Cool";

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(20,10,5,0.72)",zIndex:1500,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(5px)"}} onClick={onClose}>
      <div style={{background:"#FDFAF7",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:520,maxHeight:"92vh",display:"flex",flexDirection:"column",boxShadow:"0 -16px 60px rgba(30,15,5,0.3)"}} onClick={e=>e.stopPropagation()}>

        <div style={{background:"linear-gradient(135deg,#2C4A2A,#3A7A3A)",padding:"18px 22px 14px",borderRadius:"24px 24px 0 0",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <span style={{fontSize:26}}>🗺️</span>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900,color:"white"}}>Neighborhood Heat Map</div>
              <div style={{fontFamily:"sans-serif",fontSize:11,color:"rgba(255,255,255,0.7)"}}>Find furniture hotspots · Plan your Saturday haul</div>
            </div>
            <button onClick={onClose} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:30,height:30,color:"white",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          </div>
          <div style={{display:"flex",gap:6}}>
            {[["all","All"],["hot","🔥 Hot"],["budget","💰 Budget"],["premium","💎 Premium"]].map(([id,label])=>(
              <button key={id} onClick={()=>setFilter(id)} style={{flex:1,background:filter===id?"rgba(255,255,255,0.2)":"transparent",border:`1px solid ${filter===id?"rgba(255,255,255,0.5)":"rgba(255,255,255,0.2)"}`,borderRadius:20,padding:"5px 0",color:"white",fontFamily:"sans-serif",fontSize:11,fontWeight:filter===id?700:400,cursor:"pointer"}}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Stylized map grid */}
        <div style={{padding:"14px 18px",flexShrink:0,background:"#F0F8F0",borderBottom:"1px solid #D8ECD8"}}>
          <div style={{position:"relative",height:160,background:"linear-gradient(160deg,#E8F4E8,#D0E8D0)",borderRadius:14,overflow:"hidden",border:"1px solid #C0DCC0"}}>
            {/* Simulated road lines */}
            <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.3}} viewBox="0 0 400 160">
              <line x1="0" y1="80" x2="400" y2="80" stroke="#8AAA8A" strokeWidth="3"/>
              <line x1="200" y1="0" x2="200" y2="160" stroke="#8AAA8A" strokeWidth="3"/>
              <line x1="0" y1="40" x2="400" y2="120" stroke="#8AAA8A" strokeWidth="1.5"/>
              <line x1="0" y1="120" x2="400" y2="40" stroke="#8AAA8A" strokeWidth="1.5"/>
            </svg>
            {/* Neighborhood bubbles on the map */}
            {filtered.map((n,i)=>{
              const x = 10 + ((n.lng+84.6)/0.35)*380;
              const y = 10 + ((33.97-n.lat)/0.25)*140;
              const r = 12 + Math.round(n.hotness*16);
              const isInTrip = trip.includes(n.id);
              return (
                <div key={n.id} onClick={()=>{setSelected(n.id===selected?null:n.id);}} style={{
                  position:"absolute", left:`${Math.min(Math.max(x/400*100,5),88)}%`, top:`${Math.min(Math.max(y/160*100,5),85)}%`,
                  width:r*2, height:r*2, borderRadius:"50%",
                  background:isInTrip?"#8B4513":n.color+"CC",
                  border:selected===n.id?"3px solid #2C1810":isInTrip?"3px solid #8B4513":"2px solid rgba(255,255,255,0.8)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  cursor:"pointer", transform:"translate(-50%,-50%)",
                  boxShadow:`0 2px 8px ${n.color}50`,
                  transition:"all 0.2s",
                  zIndex:selected===n.id?10:1,
                }}>
                  <span style={{fontFamily:"sans-serif",fontSize:10,fontWeight:700,color:"white",textShadow:"0 1px 2px rgba(0,0,0,0.4)"}}>{n.count}</span>
                </div>
              );
            })}
            {/* You are here */}
            <div style={{position:"absolute",left:"47%",top:"52%",transform:"translate(-50%,-50%)",width:14,height:14,background:"#2196F3",borderRadius:"50%",border:"2px solid white",boxShadow:"0 0 0 4px rgba(33,150,243,0.3)"}}/>
          </div>
          {/* Legend */}
          <div style={{display:"flex",gap:12,marginTop:8,justifyContent:"center"}}>
            {[["🔴","Very Hot (15+ items)"],["🟡","Warm (8–14)"],["🟢","Cool (< 8)"],["🔵","You"]].map(([dot,label])=>(
              <div key={label} style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:10}}>{dot}</span><span style={{fontFamily:"sans-serif",fontSize:9,color:"#6A8A6A"}}>{label}</span></div>
            ))}
          </div>
        </div>

        <div style={{overflowY:"auto",flex:1,padding:"12px 18px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#2C1810"}}>Neighborhoods ({filtered.length})</div>
            <button onClick={()=>setPlanMode(!planMode)} style={{background:planMode?"#8B4513":"#F5EDE4",color:planMode?"white":"#8B4513",border:`1.5px solid #8B4513`,borderRadius:20,padding:"5px 14px",fontFamily:"sans-serif",fontSize:11,fontWeight:700,cursor:"pointer"}}>
              {planMode?"✓ Planning Mode":"🗺 Plan Trip"}
            </button>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {filtered.sort((a,b)=>b.hotness-a.hotness).map(n=>(
              <div key={n.id} onClick={()=>{setSelected(n.id===selected?null:n.id);if(planMode)toggleTrip(n.id);}} style={{background:"white",borderRadius:12,padding:"12px 14px",border:`1.5px solid ${selected===n.id?n.color:trip.includes(n.id)?"#8B4513":"#EDE8E0"}`,cursor:"pointer",transition:"all 0.15s",boxShadow:selected===n.id?`0 3px 12px ${n.color}25`:"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:40,height:40,borderRadius:"50%",background:n.color+"18",border:`1.5px solid ${n.color}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontSize:18}}>{hotnessLabel(n.hotness).split(" ")[0]}</span>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810"}}>{n.name}</div>
                      {trip.includes(n.id)&&<span style={{background:"#8B4513",color:"white",fontSize:9,padding:"1px 6px",borderRadius:8,fontFamily:"sans-serif",fontWeight:700}}>On your trip</span>}
                    </div>
                    <div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070"}}>{n.count} listings · avg ${n.avgPrice} · {hotnessLabel(n.hotness).split(" ").slice(1).join(" ")}</div>
                  </div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700,color:n.color}}>{n.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{padding:"12px 18px 32px",borderTop:"1px solid #EDE8E0",flexShrink:0}}>
          {trip.length>0?(
            <button onClick={onClose} style={{width:"100%",background:"#8B4513",color:"white",border:"none",borderRadius:12,padding:"13px",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:"pointer"}}>
              Plan Trip to {trip.length} Neighborhood{trip.length!==1?"s":""}  →
            </button>
          ):(
            <button onClick={onClose} style={{width:"100%",background:"#F5EDE4",color:"#8B4513",border:"none",borderRadius:12,padding:"13px",fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:600,cursor:"pointer"}}>
              Browse Listings Near Me →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// ─── FEATURE 5: PICKUP SCHEDULER ─────────────────────────────
// ═══════════════════════════════════════════════════════════════

const PickupScheduler = ({ item, seller, onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [note,         setNote]         = useState("");
  const [confirmed,    setConfirmed]    = useState(false);

  const today = new Date();
  const days  = Array.from({length:7},(_,i)=>{
    const d = new Date(today); d.setDate(d.getDate()+i+1);
    return { label:d.toLocaleDateString("en",{weekday:"short"}), date:d.toLocaleDateString("en",{month:"short",day:"numeric"}), full:d };
  });
  const slots = ["8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM"];
  const unavailable = new Set([2, 5, 8]); // simulate some taken slots

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(20,10,5,0.72)",zIndex:1500,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(5px)"}} onClick={onClose}>
      <div style={{background:"#FDFAF7",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:520,maxHeight:"90vh",display:"flex",flexDirection:"column",boxShadow:"0 -16px 60px rgba(30,15,5,0.3)"}} onClick={e=>e.stopPropagation()}>

        <div style={{background:"linear-gradient(135deg,#4A6A8A,#3D8A6A)",padding:"18px 22px 14px",borderRadius:"24px 24px 0 0",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:26}}>📅</span>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900,color:"white"}}>Schedule Pickup</div>
              <div style={{fontFamily:"sans-serif",fontSize:11,color:"rgba(255,255,255,0.7)"}}>Agree on a time with the seller — no back-and-forth needed</div>
            </div>
            <button onClick={onClose} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:30,height:30,color:"white",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          </div>
        </div>

        <div style={{overflowY:"auto",flex:1,padding:"16px 20px"}}>
          {!confirmed ? (
            <>
              {/* Item card */}
              <div style={{background:"white",borderRadius:12,padding:"10px 14px",marginBottom:16,border:"1px solid #EDE8E0",display:"flex",gap:10,alignItems:"center"}}>
                <div style={{width:48,height:48,borderRadius:8,overflow:"hidden",flexShrink:0}}><FurnitureIllustration type={item?.img||"sofa"} small/></div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810"}}>{item?.title||"Furniture Item"}</div>
                  <div style={{fontFamily:"sans-serif",fontSize:11,color:"#A08070"}}>{seller||"Seller"} · {item?.location||"Atlanta, GA"}</div>
                </div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700,color:"#8B4513"}}>${item?.price||"—"}</div>
              </div>

              {/* Date picker */}
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:10}}>Pick a Day</div>
              <div style={{display:"flex",gap:8,marginBottom:18,overflowX:"auto",scrollbarWidth:"none",paddingBottom:4}}>
                {days.map((d,i)=>(
                  <button key={i} onClick={()=>{setSelectedDate(i);setSelectedSlot(null);}} style={{flexShrink:0,width:58,background:selectedDate===i?"linear-gradient(135deg,#4A6A8A,#3D8A6A)":"white",color:selectedDate===i?"white":"#2C1810",border:`1.5px solid ${selectedDate===i?"transparent":"#EDE8E0"}`,borderRadius:12,padding:"10px 4px",cursor:"pointer",textAlign:"center",boxShadow:selectedDate===i?"0 4px 12px rgba(74,106,138,0.3)":"none"}}>
                    <div style={{fontFamily:"sans-serif",fontSize:11,fontWeight:600,marginBottom:2}}>{d.label}</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:700}}>{d.full.getDate()}</div>
                    <div style={{fontFamily:"sans-serif",fontSize:9,marginTop:2,opacity:0.8}}>{d.full.toLocaleDateString("en",{month:"short"})}</div>
                  </button>
                ))}
              </div>

              {/* Time slots */}
              {selectedDate!==null && (
                <>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:10}}>Pick a Time</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:16}}>
                    {slots.map((slot,i)=>{
                      const taken = unavailable.has(i);
                      const sel   = selectedSlot===i;
                      return (
                        <button key={slot} disabled={taken} onClick={()=>setSelectedSlot(i)} style={{background:sel?"linear-gradient(135deg,#4A6A8A,#3D8A6A)":taken?"#F5EDE4":"white",color:sel?"white":taken?"#C0A890":"#2C1810",border:`1.5px solid ${sel?"transparent":taken?"#EDE8E0":"#D8C8B8"}`,borderRadius:10,padding:"9px 4px",cursor:taken?"not-allowed":"pointer",fontFamily:"sans-serif",fontSize:12,fontWeight:sel?700:400,transition:"all 0.15s",position:"relative"}}>
                          {slot}
                          {taken&&<div style={{position:"absolute",bottom:2,left:"50%",transform:"translateX(-50%)",fontFamily:"sans-serif",fontSize:8,color:"#C0A890"}}>Taken</div>}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Note */}
              {selectedSlot!==null && (
                <div style={{marginBottom:16}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2C1810",marginBottom:8}}>Add a Note (Optional)</div>
                  <textarea value={note} onChange={e=>setNote(e.target.value)} rows={2} placeholder="e.g. 'I'll bring a truck' or 'Please disassemble if possible'" style={{width:"100%",border:"1.5px solid #DDD0C8",borderRadius:10,padding:"10px 12px",fontFamily:"sans-serif",fontSize:13,color:"#2C1810",resize:"none",outline:"none",boxSizing:"border-box"}}/>
                </div>
              )}
            </>
          ) : (
            <div style={{textAlign:"center",padding:"20px 0"}}>
              <div style={{fontSize:60,marginBottom:14}}>✅</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:"#2C1810",marginBottom:8}}>Pickup Scheduled!</div>
              <div style={{fontFamily:"sans-serif",fontSize:13,color:"#A08070",lineHeight:1.8,marginBottom:20}}>
                <strong>{days[selectedDate]?.date}</strong> at <strong>{slots[selectedSlot]}</strong><br/>
                with {seller||"the seller"}<br/>
                {item?.location||"Atlanta, GA"}
              </div>
              <div style={{background:"#F0F8F4",borderRadius:14,padding:"14px 16px",marginBottom:16,border:"1px solid #C0D8C8"}}>
                <div style={{fontFamily:"sans-serif",fontSize:12,color:"#3A7A54",lineHeight:1.8}}>
                  ✅ Both you and the seller will receive a reminder 24 hrs before.<br/>
                  ✅ Payment will be released after you confirm pickup in the app.<br/>
                  ✅ Need to reschedule? You have up to 2 hours before pickup.
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{padding:"12px 20px 32px",borderTop:"1px solid #EDE8E0",flexShrink:0}}>
          {!confirmed?(
            <button onClick={()=>{if(selectedDate!==null&&selectedSlot!==null)setConfirmed(true);}} disabled={selectedDate===null||selectedSlot===null} style={{width:"100%",background:selectedDate!==null&&selectedSlot!==null?"linear-gradient(135deg,#4A6A8A,#3D8A6A)":"#DDD0C8",color:"white",border:"none",borderRadius:14,padding:"14px",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:selectedDate!==null&&selectedSlot!==null?"pointer":"not-allowed"}}>
              {selectedDate!==null&&selectedSlot!==null?`Confirm: ${days[selectedDate]?.date} at ${slots[selectedSlot]}`:"Select a day and time above"}
            </button>
          ):(
            <button onClick={onClose} style={{width:"100%",background:"#4CAF8A",color:"white",border:"none",borderRadius:14,padding:"14px",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:"pointer"}}>Done ✓</button>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── FILTER DRAWER ───────────────────────────────────────────────
const FilterDrawer = ({ filters, setFilters, onClose, resultCount }) => {
  const [local, setLocal] = useState({ ...filters });
  const set = (k, v) => setLocal(f => ({ ...f, [k]: v }));
  const toggleArr = (k, v) => setLocal(f => ({ ...f, [k]: f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v] }));
  const activeCount = [
    local.priceMin || local.priceMax,
    local.colors.length,
    local.brands.length,
    local.widthMax,
    local.heightMax,
    local.sort !== "newest",
  ].filter(Boolean).length;

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(20,10,5,0.65)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(3px)"}} onClick={onClose}>
      <div style={{background:"#FDFAF7",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:520,maxHeight:"88vh",display:"flex",flexDirection:"column",boxShadow:"0 -8px 40px rgba(30,15,5,0.2)"}} onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{padding:"18px 24px 14px",borderBottom:"1px solid #EDE8E0",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:800,color:"#2C1810"}}>Filter & Sort</div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <button onClick={()=>setLocal({...DEFAULT_FILTERS})} style={{background:"none",border:"none",color:"#A08070",fontFamily:"sans-serif",fontSize:13,cursor:"pointer",textDecoration:"underline"}}>Reset all</button>
            <button onClick={onClose} style={{background:"#F5EDE4",border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:18,color:"#8B4513"}}>×</button>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{overflowY:"auto",flex:1,padding:"20px 24px"}}>

          {/* SORT */}
          <div style={{marginBottom:24}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#2C1810",marginBottom:12}}>Sort By</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[
                {id:"newest",   label:"Newest First",    icon:"🕐"},
                {id:"oldest",   label:"Oldest First",    icon:"📅"},
                {id:"priceLow", label:"Price: Low → High",icon:"💰"},
                {id:"priceHigh",label:"Price: High → Low",icon:"💎"},
                {id:"closest",  label:"Closest First",   icon:"📍"},
                {id:"rating",   label:"Top Rated",       icon:"⭐"},
              ].map(s=>(
                <button key={s.id} onClick={()=>set("sort",s.id)} style={{background:local.sort===s.id?"#8B4513":"#F5EDE4",color:local.sort===s.id?"white":"#6B4C3A",border:`2px solid ${local.sort===s.id?"#8B4513":"transparent"}`,borderRadius:10,padding:"9px 10px",fontFamily:"sans-serif",fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6,transition:"all 0.15s"}}>
                  <span>{s.icon}</span>{s.label}
                </button>
              ))}
            </div>
          </div>

          {/* PRICE */}
          <div style={{marginBottom:24}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#2C1810",marginBottom:12}}>Price Range</div>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <div style={{position:"relative",flex:1}}>
                <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#8B4513",fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700}}>$</span>
                <input type="number" value={local.priceMin} onChange={e=>set("priceMin",e.target.value)} placeholder="Min" style={{width:"100%",border:"1.5px solid #DDD0C8",borderRadius:10,padding:"11px 12px 11px 26px",fontFamily:"sans-serif",fontSize:14,color:"#2C1810",outline:"none",boxSizing:"border-box"}}/>
              </div>
              <div style={{color:"#C0A890",fontFamily:"sans-serif",fontSize:16}}>—</div>
              <div style={{position:"relative",flex:1}}>
                <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#8B4513",fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700}}>$</span>
                <input type="number" value={local.priceMax} onChange={e=>set("priceMax",e.target.value)} placeholder="Max" style={{width:"100%",border:"1.5px solid #DDD0C8",borderRadius:10,padding:"11px 12px 11px 26px",fontFamily:"sans-serif",fontSize:14,color:"#2C1810",outline:"none",boxSizing:"border-box"}}/>
              </div>
            </div>
            <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
              {[["Under $100",0,100],["$100–$300",100,300],["$300–$500",300,500],["$500+",500,""]].map(([label,mn,mx])=>(
                <button key={label} onClick={()=>setLocal(f=>({...f,priceMin:String(mn),priceMax:String(mx)}))} style={{background:local.priceMin===String(mn)&&local.priceMax===String(mx)?"#8B4513":"#F5EDE4",color:local.priceMin===String(mn)&&local.priceMax===String(mx)?"white":"#6B4C3A",border:"none",borderRadius:20,padding:"5px 12px",fontFamily:"sans-serif",fontSize:12,fontWeight:600,cursor:"pointer"}}>{label}</button>
              ))}
            </div>
          </div>

          {/* COLOR */}
          <div style={{marginBottom:24}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#2C1810",marginBottom:12}}>Color</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
              {ALL_COLORS.map(color=>{
                const swatch = COLOR_SWATCHES[color]||"#C0A890";
                const active = local.colors.includes(color);
                return (
                  <button key={color} onClick={()=>toggleArr("colors",color)} style={{display:"flex",alignItems:"center",gap:7,background:active?"#8B4513":"#F5EDE4",color:active?"white":"#5C3A20",border:`2px solid ${active?"#8B4513":"transparent"}`,borderRadius:20,padding:"5px 12px 5px 7px",cursor:"pointer",transition:"all 0.15s",fontFamily:"sans-serif",fontSize:12,fontWeight:600}}>
                    <div style={{width:16,height:16,borderRadius:"50%",background:swatch,border:"1.5px solid rgba(0,0,0,0.15)",flexShrink:0}}/>
                    {color}
                  </button>
                );
              })}
            </div>
          </div>

          {/* BRAND */}
          <div style={{marginBottom:24}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#2C1810",marginBottom:12}}>Brand</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {ALL_BRANDS.map(brand=>{
                const active = local.brands.includes(brand);
                return (
                  <button key={brand} onClick={()=>toggleArr("brands",brand)} style={{background:active?"#8B4513":"#F5EDE4",color:active?"white":"#6B4C3A",border:`2px solid ${active?"#8B4513":"transparent"}`,borderRadius:20,padding:"6px 14px",fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:active?700:400,cursor:"pointer",transition:"all 0.15s"}}>
                    {brand}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DIMENSIONS */}
          <div style={{marginBottom:8}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#2C1810",marginBottom:4}}>Dimensions</div>
            <div style={{fontFamily:"sans-serif",fontSize:12,color:"#A08070",marginBottom:12}}>Filter by maximum size — great for spaces with tight constraints.</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {[
                {key:"widthMax", label:"Max Width (inches)", icon:"↔️"},
                {key:"heightMax",label:"Max Height (inches)",icon:"↕️"},
              ].map(d=>(
                <div key={d.key}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span style={{fontSize:12,fontFamily:"sans-serif",fontWeight:600,color:"#8A6A5A"}}>{d.icon} {d.label}</span>
                    {local[d.key]&&<span style={{fontSize:12,fontWeight:700,color:"#8B4513",fontFamily:"sans-serif"}}>≤ {local[d.key]}"</span>}
                  </div>
                  <input type="range" min={12} max={120} value={local[d.key]||120} onChange={e=>set(d.key,e.target.value===String(120)?"":e.target.value)} style={{width:"100%",accentColor:"#8B4513"}}/>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
                    <span style={{fontSize:10,color:"#C0A890",fontFamily:"sans-serif"}}>12"</span>
                    <span style={{fontSize:10,color:"#C0A890",fontFamily:"sans-serif"}}>120" {!local[d.key]&&"(any)"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{padding:"14px 24px 28px",borderTop:"1px solid #EDE8E0",flexShrink:0}}>
          <button onClick={()=>{setFilters(local);onClose();}} style={{width:"100%",background:"#8B4513",color:"white",border:"none",borderRadius:14,padding:"15px",fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(139,69,19,0.3)"}}>
            Show {resultCount} Result{resultCount!==1?"s":""}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── APPLY FILTERS & SORT ─────────────────────────────────────────
function applyFilters(items, cat, search, filters) {
  let r = items.filter(l => {
    if (cat !== "All" && l.category !== cat) return false;
    if (search) {
      const q = search.toLowerCase();
      const hit = l.title.toLowerCase().includes(q) ||
        l.tags.some(t=>t.toLowerCase().includes(q)) ||
        l.brand.toLowerCase().includes(q) ||
        l.colors.some(c=>c.toLowerCase().includes(q));
      if (!hit) return false;
    }
    if (filters.priceMin !== "" && l.price < Number(filters.priceMin)) return false;
    if (filters.priceMax !== "" && l.price > Number(filters.priceMax)) return false;
    if (filters.colors.length && !filters.colors.some(c => l.colors.includes(c))) return false;
    if (filters.brands.length && !filters.brands.includes(l.brand)) return false;
    if (filters.widthMax  !== "" && l.widthIn  > Number(filters.widthMax))  return false;
    if (filters.heightMax !== "" && l.heightIn > Number(filters.heightMax)) return false;
    return true;
  });
  switch (filters.sort) {
    case "priceLow":  r = [...r].sort((a,b)=>a.price-b.price); break;
    case "priceHigh": r = [...r].sort((a,b)=>b.price-a.price); break;
    case "closest":   r = [...r].sort((a,b)=>a.distanceMi-b.distanceMi); break;
    case "rating":    r = [...r].sort((a,b)=>b.sellerRating-a.sellerRating); break;
    case "oldest":    r = [...r].sort((a,b)=>b.daysAgo-a.daysAgo); break;
    default:          r = [...r].sort((a,b)=>a.daysAgo-b.daysAgo);
  }
  return r;
}

const ACTIVE_FILTER_LABELS = {
  priceLow:"Price ↑", priceHigh:"Price ↓", closest:"Closest", rating:"Top Rated", oldest:"Oldest",
};

// ─── MAIN APP ─────────────────────────────────────────────────────
const categories = ["All","Sofas","Tables","Chairs","Beds","Storage"];

const MainApp = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedCat, setSelectedCat] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSell, setShowSell] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS });
  const [showFilters, setShowFilters] = useState(false);
  const [showNotifs, setShowNotifs]   = useState(false);

  const filtered = applyFilters(listings, selectedCat, search, filters);

  // Count active non-default filters for badge
  const activeFilterCount = [
    filters.priceMin || filters.priceMax,
    filters.colors.length,
    filters.brands.length,
    filters.widthMax,
    filters.heightMax,
    filters.sort !== "newest",
  ].filter(Boolean).length;

  // Active filter chips for display
  const chips = [];
  if (filters.sort !== "newest") chips.push({ label: ACTIVE_FILTER_LABELS[filters.sort] || filters.sort, clear: () => setFilters(f=>({...f,sort:"newest"})) });
  if (filters.priceMin || filters.priceMax) chips.push({ label: `$${filters.priceMin||"0"}–${filters.priceMax?"$"+filters.priceMax:"∞"}`, clear: () => setFilters(f=>({...f,priceMin:"",priceMax:""})) });
  filters.colors.forEach(c => chips.push({ label: c, swatch: COLOR_SWATCHES[c], clear: () => setFilters(f=>({...f,colors:f.colors.filter(x=>x!==c)})) }));
  filters.brands.forEach(b => chips.push({ label: b, clear: () => setFilters(f=>({...f,brands:f.brands.filter(x=>x!==b)})) }));
  if (filters.widthMax)  chips.push({ label: `W ≤ ${filters.widthMax}"`, clear: () => setFilters(f=>({...f,widthMax:""})) });
  if (filters.heightMax) chips.push({ label: `H ≤ ${filters.heightMax}"`, clear: () => setFilters(f=>({...f,heightMax:""})) });

  const previewCount = applyFilters(listings, selectedCat, search, filters).length;

  return (
    <div style={{minHeight:"100vh",background:"#F8F3EC",fontFamily:"sans-serif",maxWidth:520,margin:"0 auto",position:"relative"}}>
      <div style={{background:"white",padding:"20px 24px 0",boxShadow:"0 2px 12px rgba(60,30,10,0.06)",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:900,color:"#2C1810",letterSpacing:-0.5}}>furnish<span style={{color:"#8B4513"}}>.</span></div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <span style={{fontSize:13,color:"#A08070",fontFamily:"sans-serif"}}>📍 Atlanta</span>
            <div onClick={()=>setShowNotifs(true)} style={{position:"relative",width:36,height:36,background:"#F5EDE4",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:18}}>
            🔔
            <div style={{position:"absolute",top:6,right:6,width:8,height:8,background:"#C46A3A",borderRadius:"50%",border:"1.5px solid white"}}/>
          </div>
          </div>
        </div>
        {activeTab==="browse"&&<>
          <div style={{margin:"14px 0 10px",display:"flex",gap:8}}>
            <div style={{position:"relative",flex:1}}>
              <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:16}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search furniture near you..." style={{width:"100%",border:"1.5px solid #EDE8E0",borderRadius:12,padding:"11px 14px 11px 40px",fontFamily:"sans-serif",fontSize:14,background:"#FAF7F4",outline:"none",boxSizing:"border-box",color:"#2C1810"}}/>
            </div>
            <button onClick={()=>setShowFilters(true)} style={{background:activeFilterCount>0?"#8B4513":"#F5EDE4",color:activeFilterCount>0?"white":"#6B4C3A",border:`2px solid ${activeFilterCount>0?"#8B4513":"transparent"}`,borderRadius:12,padding:"0 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,flexShrink:0,fontFamily:"sans-serif",fontSize:13,fontWeight:700,position:"relative"}}>
              <span style={{fontSize:16}}>⚙️</span>
              {activeFilterCount>0&&<span style={{background:"white",color:"#8B4513",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900}}>{activeFilterCount}</span>}
            </button>
          </div>
          <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:10,scrollbarWidth:"none"}}>
            {categories.map(c=>(<button key={c} onClick={()=>setSelectedCat(c)} style={{background:selectedCat===c?"#8B4513":"#F5EDE4",color:selectedCat===c?"white":"#6B4C3A",border:"none",borderRadius:20,padding:"7px 16px",whiteSpace:"nowrap",fontFamily:"'Playfair Display',serif",fontWeight:selectedCat===c?700:400,fontSize:13,cursor:"pointer",flexShrink:0}}>{c}</button>))}
          </div>
          {chips.length>0&&(
            <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:12,scrollbarWidth:"none",alignItems:"center"}}>
              {chips.map((chip,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:5,background:"#8B4513",color:"white",borderRadius:20,padding:"4px 10px 4px 8px",flexShrink:0,fontFamily:"sans-serif",fontSize:12,fontWeight:600}}>
                  {chip.swatch&&<div style={{width:12,height:12,borderRadius:"50%",background:chip.swatch,border:"1px solid rgba(255,255,255,0.4)",flexShrink:0}}/>}
                  {chip.label}
                  <span onClick={chip.clear} style={{cursor:"pointer",opacity:0.8,marginLeft:2,fontSize:14,lineHeight:1}}>×</span>
                </div>
              ))}
              <button onClick={()=>setFilters({...DEFAULT_FILTERS})} style={{background:"#F5EDE4",color:"#8B4513",border:"none",borderRadius:20,padding:"4px 12px",fontFamily:"sans-serif",fontSize:12,fontWeight:600,cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>Clear all</button>
            </div>
          )}
        </>}
        {activeTab==="move"&&<div style={{paddingBottom:14,marginTop:10}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#2C1810"}}>Moving Services</div><div style={{color:"#A08070",fontSize:13,fontFamily:"sans-serif",marginTop:2}}>Trucks, movers & instant cost estimates</div></div>}
      </div>

      {activeTab==="browse"&&(
        <div style={{padding:"16px 16px 100px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"#2C1810"}}>{selectedCat==="All"?"Near You":selectedCat}</div>
            <div style={{color:"#A08070",fontSize:13}}>{filtered.length} item{filtered.length!==1?"s":""}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {filtered.map(item=>(
              <div key={item.id} onClick={()=>setSelectedItem(item)} style={{background:"white",borderRadius:16,overflow:"hidden",cursor:"pointer",boxShadow:"0 2px 12px rgba(60,40,20,0.08)",border:"1px solid #EDE8E0",transition:"transform 0.18s,box-shadow 0.18s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 10px 30px rgba(60,40,20,0.15)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 12px rgba(60,40,20,0.08)"}}>
                <div style={{height:150}}><FurnitureIllustration type={item.img} sold={item.sold}/></div>
                <div style={{padding:"11px 13px"}}>
                  {/* Brand */}
                  <div style={{fontFamily:"sans-serif",fontSize:10,fontWeight:700,color:"#A08070",textTransform:"uppercase",letterSpacing:0.5,marginBottom:3}}>{item.brand}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:4}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:"#2C1810",lineHeight:1.3,flex:1}}>{item.title}</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"#8B4513",whiteSpace:"nowrap"}}>${item.price}</div>
                  </div>
                  {/* Color swatches */}
                  <div style={{display:"flex",alignItems:"center",gap:4,marginTop:7}}>
                    <div style={{display:"flex",gap:3,marginRight:4}}>
                      {item.colors.slice(0,3).map(c=>(
                        <div key={c} title={c} style={{width:11,height:11,borderRadius:"50%",background:COLOR_SWATCHES[c]||"#C0A890",border:"1px solid rgba(0,0,0,0.12)",flexShrink:0}}/>
                      ))}
                    </div>
                    <span style={{background:conditionColor[item.condition]+"20",color:conditionColor[item.condition],fontSize:10,fontWeight:600,padding:"2px 6px",borderRadius:20,fontFamily:"sans-serif"}}>{item.condition}</span>
                    <span style={{color:"#B0A090",fontSize:10,fontFamily:"sans-serif",marginLeft:"auto"}}>📍{item.distance}</span>
                  </div>
                  {/* Dims */}
                  <div style={{fontSize:10,color:"#C0A890",fontFamily:"sans-serif",marginTop:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.dims}</div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length===0&&(
            <div style={{textAlign:"center",padding:"60px 20px",color:"#B0A090"}}>
              <div style={{fontSize:48}}>🔍</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,marginTop:12,color:"#2C1810"}}>No results found</div>
              <div style={{fontSize:13,marginTop:6,fontFamily:"sans-serif"}}>Try different filters or a broader search</div>
              <button onClick={()=>{setFilters({...DEFAULT_FILTERS});setSearch("");setSelectedCat("All");}} style={{marginTop:16,background:"#8B4513",color:"white",border:"none",borderRadius:12,padding:"10px 22px",fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,cursor:"pointer"}}>Clear All Filters</button>
            </div>
          )}
        </div>
      )}
      {activeTab==="move"&&<MoveTab/>}
      {activeTab==="saved"&&<SavedTab onViewItem={(item)=>setSelectedItem(item)}/>}
      {activeTab==="messages"&&<ChatTab onOpenNotifs={()=>setShowNotifs(true)}/>}
      {activeTab==="profile"&&<ProfileTab/>}

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:520,background:"white",boxShadow:"0 -4px 20px rgba(60,30,10,0.1)",display:"flex",alignItems:"center",padding:"10px 14px 16px",zIndex:200,gap:2}}>
        {[{id:"browse",icon:"🏠",label:"Browse"},{id:"move",icon:"🚚",label:"Move"},{id:"saved",icon:"♡",label:"Saved"},{id:"messages",icon:"💬",label:"Chat",badge:CHAT_CONVERSATIONS.reduce((s,c)=>s+c.unread,0)},{id:"profile",icon:"👤",label:"Profile"}].map(tab=>(
          <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,color:activeTab===tab.id?"#8B4513":"#B0A090",position:"relative",padding:"4px 0"}}>
            <div style={{position:"relative"}}>
              <span style={{fontSize:17}}>{tab.icon}</span>
              {tab.badge>0&&<div style={{position:"absolute",top:-4,right:-6,background:"#C46A3A",color:"white",borderRadius:"50%",width:14,height:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,fontFamily:"sans-serif"}}>{tab.badge}</div>}
            </div>
            <span style={{fontSize:9,fontFamily:"sans-serif",fontWeight:activeTab===tab.id?700:400}}>{tab.label}</span>
            {activeTab===tab.id&&<div style={{position:"absolute",bottom:-4,width:16,height:2.5,background:"#8B4513",borderRadius:2}}/>}
          </button>
        ))}
        <button onClick={()=>setShowSell(true)} style={{background:"#8B4513",color:"white",border:"none",borderRadius:14,padding:"9px 16px",fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(139,69,19,0.4)",flexShrink:0}}>+ Sell</button>
      </div>

      {selectedItem&&<Modal item={selectedItem} onClose={()=>setSelectedItem(null)}/>}
      {showSell&&<SellModal onClose={()=>setShowSell(false)}/>}
      {showFilters&&<FilterDrawer filters={filters} setFilters={setFilters} onClose={()=>setShowFilters(false)} resultCount={previewCount}/>}
      {showNotifs&&<NotificationCenter onClose={()=>setShowNotifs(false)} onNavigate={(tab)=>{setActiveTab(tab);setShowNotifs(false);}}/>}
    </div>
  );
};

// ─── ROOT ─────────────────────────────────────────────────────────
export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  return (
    <div style={{maxWidth:520,margin:"0 auto"}}>
      {!onboarded
        ? <OnboardingFlow onComplete={()=>setOnboarded(true)}/>
        : <MainApp/>
      }
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Cormorant+Garamond:wght@400;600;700&display=swap');*{box-sizing:border-box;}::-webkit-scrollbar{display:none;}@keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}`}</style>
    </div>
  );
}
