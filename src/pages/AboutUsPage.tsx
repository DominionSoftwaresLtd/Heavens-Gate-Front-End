import React, { useState } from 'react';
import { 
  Flame, Clock, MapPin, ExternalLink, ShieldCheck, CheckCircle2, 
  Calendar, Coffee, Heart, Sparkles, BookOpen, Sun, Moon, 
  Users, Building, ArrowRight, AlertTriangle, Radio, Tv, 
  PhoneCall, Bed, Compass, ChevronRight, Info
} from 'lucide-react';

// Real authentic photos from the Heavens Gate prayer sanctuary
import stoneMarkImg from '../assets/HEAVENS GATE STONE MARK.jpg';
import apostleImg from '../assets/Apostle-John-Kimani-William-Kingdom-Seekers-Fellowship.jpeg';
import fullViewImg from '../assets/HEAVENS GATE FULL VIEW.jpg';
import entryGateImg from '../assets/ENTRY GATE CLEAR.jpg';
import shiloFrontImg from '../assets/SHILO FRONT VIEW 2.jpg';
import mtSinaiImg from '../assets/MT SINAI CHAPEL.jpg';
import environmentImg from '../assets/ENVIRONMENT.jpg';
import hostelsImg from '../assets/AL HOSTELS.jpg';
import kitchenImg from '../assets/KITCHEN AREA.webp';

interface AboutUsPageProps {
  onNavigate: (tabId: string) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate }) => {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const keyMilestones = [
    {
      year: '2002',
      title: 'The Prophetic Burden',
      description: 'God burdened Apostle John Kimani William with a burning vision to establish a dedicated, protected spiritual environment where intercessors could pray and fast without worldly distractions or spiritual harassment.'
    },
    {
      year: '2011',
      title: 'Groundbreaking on 5 Acres',
      description: 'The ministry acquired an initial 5-acre parcel in the serene highlands of Gilgil. On September 10, 2011, the foundational groundbreaking monument was unveiled and dedicated to the Lord.'
    },
    {
      year: '2012',
      title: 'Divine Expansion to 30+ Acres',
      description: 'Prompted by divine guidance to expand territory before massive construction, the ministry cooperatively secured an additional 25 acres, paving the way for the grand prayer city that stands today.'
    },
    {
      year: 'Present',
      title: 'A Global Altar of Intercession',
      description: 'Now spanning over 30 developed acres (and expanding across 70 acres), Heavens Gate hosts over 100,000 pilgrims annually from Kenya, East Africa, and nations across the world.'
    }
  ];

  const spiritualRhythms = [
    {
      icon: Sun,
      title: 'Morning Glory Fellowship',
      time: '5:30 AM — 8:00 AM',
      description: 'A mandatory corporate assembly in Shiloh Cathedral for all resident pilgrims. Begins with soaking worship, corporate repentance, scriptural exhortation, and alignment for the day ahead.'
    },
    {
      icon: Heart,
      title: 'Solitary Prayer in the Gardens',
      time: 'Daytime Hours',
      description: 'Outside corporate services, pilgrims disperse into solitary prayer cubicles, manicured gardens, and rocky prayer trails. Communal loitering and casual socialization are strictly discouraged to protect spiritual focus.'
    },
    {
      icon: Flame,
      title: 'Evening Revival Assembly',
      time: '5:00 PM — 7:30 PM',
      description: 'The second mandatory corporate gathering where all believers unite for intense prayer warfare, prophetic teaching, and intercession for nations, families, and personal breakthroughs.'
    },
    {
      icon: Moon,
      title: 'The Sacred Midnight Watch',
      time: '11:00 PM — 4:00 AM',
      description: 'A signature rhythm of Heavens Gate. Believers awake during the third and fourth night watches for intensive private intercession, breaking ancestral yokes and standing in the gap.'
    }
  ];

  const fastingPillars = [
    {
      title: 'Strict Fasting Sanctuary',
      detail: 'No cooked food, outside snacks, fruits, or sodas are allowed past the entrance gates. All luggage is respectfully inspected at security.'
    },
    {
      title: 'Water & Glucose Only',
      detail: 'Pilgrims sustain their fast with clean tap water and glucose. High spiritual discipline is maintained across the entire campus.'
    },
    {
      title: 'Free Fellowship Tea',
      detail: 'A complimentary cup of hot restorative tea and warm water is traditionally served to all pilgrims after the morning and evening corporate services.'
    },
    {
      title: 'Family & Nursing Care',
      detail: 'Children aged 7 and below are exempt from fasting; mothers have access to a clean on-site lactation suite and basic children\'s provisions.'
    }
  ];

  const accommodationTiers = [
    {
      name: 'Pilgrim Shared Dormitories',
      capacity: 'Large communal halls (50+ pax)',
      price: 'KSh 150 — 200',
      period: 'per night',
      features: ['Clean bunk beds & foam mattresses', 'Communal hot shower facilities', 'Gender-segregated wings', 'Quiet nighttime curfew']
    },
    {
      name: 'Medium Sharing Dorms',
      capacity: 'Semi-private (4 — 6 pax)',
      price: 'KSh 250',
      period: 'per night',
      features: ['Spacious shared cubicle layout', 'Convenient washroom access', 'Dedicated lockable storage', 'Peaceful prayer ambiance']
    },
    {
      name: 'Double Pilgrim Rooms',
      capacity: '2 persons per room',
      price: 'KSh 400',
      period: 'per night',
      features: ['Two single beds with mattresses', 'Private electrical charging outlet', 'Enhanced privacy for prayer partners', 'Close to Shiloh Cathedral']
    },
    {
      name: 'Elohim House Private Rooms',
      capacity: 'Single occupant (Private)',
      price: 'KSh 500 — 700',
      period: 'per night',
      features: ['Complete privacy for deep fasting', 'Study desk & reading lamp', 'En-suite / dedicated modern amenities', 'Quiet secluded corridor']
    }
  ];

  const campusLandmarks = [
    {
      title: 'The 2011 Foundational Stone',
      tag: 'Historical Monument',
      image: stoneMarkImg,
      description: 'Dedicated on September 10, 2011, this foundational stone marks the holy soil where Jacob\'s encounter in Genesis 28:17 was consecrated.'
    },
    {
      title: 'Shiloh Cathedral',
      tag: '3,000+ Seat Sanctuary',
      image: shiloFrontImg,
      description: 'The iconic worship center hosting daily corporate morning glory, evening revival assemblies, and national solemn prayer convocations.'
    },
    {
      title: 'Mount Sinai Chapel',
      tag: 'Hilltop Solitude',
      image: mtSinaiImg,
      description: 'Perched on the higher elevation of the mountain, offering panoramic views of Gilgil hills for private contemplative prayer.'
    },
    {
      title: 'Solitary Prayer Gardens',
      tag: 'Spiritual Wilderness',
      image: environmentImg,
      description: 'Lush acacia trails, flower pathways, and stone prayer booths designed exclusively for undistracted communion between man and God.'
    },
    {
      title: 'Elohim Accommodation Wings',
      tag: 'Resident Lodging',
      image: hostelsImg,
      description: 'Affordable, well-maintained hostels and private rooms providing clean, secure rest for thousands of overnight intercessors.'
    },
    {
      title: 'Community Sustenance Pavilion',
      tag: 'Fellowship Tea Center',
      image: kitchenImg,
      description: 'The kitchen center providing complimentary hot tea and boiling water to fasting pilgrims following corporate morning and evening services.'
    }
  ];

  return (
    <div className="bg-[#FAF8F5] text-slate-800 min-h-screen">
      {/* 1. DIRECT CREATIVE OPENING: OUR STORY & DIVINE FORMATION */}
      <section className="relative pt-8 sm:pt-12 pb-14 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        {/* Story Headline & Editorial Framing */}
        <div className="max-w-4xl mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 text-[#C22F23] font-black text-[10px] sm:text-xs uppercase tracking-widest mb-2 sm:mb-3 break-words">
            <Flame className="w-4 h-4 shrink-0" />
            <span>Sacred History & Divine Formation (2002 — 2011 — Present)</span>
          </div>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black font-brand tracking-tight text-[#173F35] uppercase leading-tight break-words">
            Our Story & <span className="text-[#C22F23]">Divine Formation</span>
          </h1>
          <p className="text-slate-700 text-xs sm:text-base lg:text-lg mt-3 sm:mt-3.5 font-light leading-relaxed">
            A consecrated 30-acre interdenominational prayer city along the Nairobi-Nakuru Highway in Gilgil, Kenya. An altar established out of a prophetic burden for believers from all nations to seek God through fasting, solitary intercession, and corporate revival.
          </p>
        </div>

        {/* 4 Creative Story Milestone Stat Cards (Integrated Elegantly) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-10 sm:mb-16">
          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border-2 border-stone-200 hover:border-[#173F35] transition shadow-xs group">
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">Groundbreaking</span>
              <span className="w-2 h-2 rounded-full bg-[#C22F23] shrink-0"></span>
            </div>
            <div className="text-xl xs:text-2xl sm:text-3xl font-black font-mono text-[#173F35] truncate">2011</div>
            <p className="text-[11px] sm:text-xs text-slate-600 mt-1 line-clamp-2">Sept 10 Consecration Dedication</p>
          </div>

          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border-2 border-stone-200 hover:border-[#173F35] transition shadow-xs group">
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">Sacred Territory</span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
            </div>
            <div className="text-xl xs:text-2xl sm:text-3xl font-black font-mono text-[#173F35] truncate">30+ Acres</div>
            <p className="text-[11px] sm:text-xs text-slate-600 mt-1 line-clamp-2">Expanded from initial 5 acres</p>
          </div>

          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border-2 border-stone-200 hover:border-[#173F35] transition shadow-xs group">
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">Shiloh Cathedral</span>
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0"></span>
            </div>
            <div className="text-xl xs:text-2xl sm:text-3xl font-black font-mono text-[#173F35] truncate">3,000+</div>
            <p className="text-[11px] sm:text-xs text-slate-600 mt-1 line-clamp-2">Seating for corporate assemblies</p>
          </div>

          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border-2 border-stone-200 hover:border-[#173F35] transition shadow-xs group">
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">Global Altar</span>
              <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>
            </div>
            <div className="text-xl xs:text-2xl sm:text-3xl font-black font-mono text-[#173F35] truncate">100,000+</div>
            <p className="text-[11px] sm:text-xs text-slate-600 mt-1 line-clamp-2">Pilgrims seeking God annually</p>
          </div>
        </div>

        {/* Narrative & Photo Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left: The Story Narrative & Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="prose prose-stone text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
              <p className="first-letter:text-4xl first-letter:font-black first-letter:text-[#173F35] first-letter:mr-2 first-letter:float-left">
                Heaven’s Gate Prayer Mountain was established in 2011 out of a powerful spiritual burden given by God to create a safe, distraction-free sanctuary for believers. The prophetic vision traces back to <strong>2002</strong>, inspired by an acute awareness of the need for a protected environment where intercessors could seek God without fear of robbery, wild threats, or worldly interference.
              </p>

              <p>
                The ministry began on a humble <strong>five-acre plot</strong> of land in the serene highlands of Gilgil. Following the historic groundbreaking ceremony on <strong>September 10, 2011</strong>, divine instruction led the ministry to prioritize territory expansion rather than build immediately.
              </p>

              <p>
                Through deep faith, prayer, and sacrificial community cooperation, an additional <strong>25 acres</strong> were acquired. This paved the way for the expansive, serene prayer city that stands today along the Nairobi-Nakuru Highway directly opposite St. Mary’s Mission Hospital.
              </p>
            </div>

            {/* Illuminated Scripture Revelation Card */}
            <div className="bg-[#F8F5EC] border-l-4 border-[#C22F23] p-5 rounded-r-2xl border-y border-r border-[#E8E3D5] shadow-xs my-6">
              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <blockquote className="font-serif italic text-[#173F35] text-base sm:text-lg leading-snug">
                    “How awesome is this place! This is none other than the house of God; this is the gate of heaven.”
                  </blockquote>
                  <div className="text-xs font-mono font-bold text-[#C22F23] mt-2 flex items-center space-x-1.5">
                    <span>— Genesis 28:17</span>
                    <span className="text-stone-400">•</span>
                    <span className="text-slate-600 font-sans font-normal">Foundational Inscription on the Consecration Stone</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Historical Milestones Timeline Cards */}
            <div className="space-y-3 pt-2">
              <h3 className="font-brand font-bold text-sm uppercase tracking-wider text-[#173F35]">
                Key Milestones of the Altar
              </h3>
              {keyMilestones.map((m, idx) => (
                <div key={idx} className="flex items-start space-x-3.5 bg-white p-4 rounded-xl border border-stone-200 shadow-xs hover:border-[#173F35] transition">
                  <span className="font-mono font-bold text-xs bg-[#173F35] text-[#E5C158] px-2.5 py-1 rounded-lg shrink-0">
                    {m.year}
                  </span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#173F35]">{m.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Authentic Historical Photo & Sacred Landmarks Showcase */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Feature: 2011 Consecration Stone */}
            <div className="bg-white p-4 rounded-3xl border-2 border-stone-200 shadow-xl overflow-hidden group">
              <div 
                className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 cursor-pointer" 
                onClick={() => setActivePhoto(stoneMarkImg)}
              >
                <img 
                  src={stoneMarkImg} 
                  alt="Heavens Gate 2011 Groundbreaking Monument Stone"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <span className="bg-[#C22F23] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      Foundational Monument
                    </span>
                    <h3 className="text-white font-bold text-sm sm:text-base mt-1">
                      The Consecration Stone of Sept 10, 2011
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-2 text-xs text-slate-600">
                <p className="italic text-slate-800 font-serif">
                  “The foundational stone monument marking the 2011 groundbreaking dedication. Engraved with Genesis 28:17.”
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-stone-100">
                  <span className="flex items-center space-x-1 font-semibold text-[#173F35]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Gilgil, Nakuru County, Kenya</span>
                  </span>
                  <span className="font-mono text-emerald-800 font-bold">Dedicated 2011</span>
                </div>
              </div>
            </div>

            {/* Secondary Feature: Expansive 30-Acre Campus Panorama */}
            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-md overflow-hidden group">
              <div 
                className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-stone-100 cursor-pointer"
                onClick={() => setActivePhoto(fullViewImg)}
              >
                <img 
                  src={fullViewImg} 
                  alt="Heavens Gate 30-Acre Sacred Campus Panorama"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute top-3 left-3 bg-[#173F35]/90 text-[#E5C158] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                  30+ Consecrated Acres
                </div>
              </div>
              <div className="p-3 text-xs text-slate-600 flex items-center justify-between">
                <span className="font-medium text-slate-800 truncate">Serene Prayer City along Nairobi-Nakuru Hwy</span>
                <button
                  onClick={() => onNavigate('map')}
                  className="text-xs font-bold text-[#173F35] hover:text-[#C22F23] flex items-center space-x-1 shrink-0 ml-2"
                >
                  <span>Explore Grounds</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. OUR FOUNDER & VISION CARRIER */}
      <section className="bg-[#F8F5EC] py-16 sm:py-20 border-y border-[#E8E3D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Apostle Image Card */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative bg-white p-4 rounded-3xl border-2 border-[#D4AF37]/30 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-stone-200">
                  <img 
                    src={apostleImg} 
                    alt="Apostle John Kimani William" 
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#173F35]/90 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                    <div className="inline-block bg-[#E5C158] text-[#173F35] font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1 w-fit">
                      Spiritual Leader & Vision Carrier
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-brand text-white">
                      Apostle John Kimani William
                    </h3>
                    <p className="text-xs text-[#F8F5EC]/80 mt-0.5">
                      Founder, Kingdom Seekers Fellowship & MBCI
                    </p>
                  </div>
                </div>

                {/* Media Badges */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-around text-xs font-semibold text-[#173F35]">
                  <span className="flex items-center space-x-1.5">
                    <Tv className="w-3.5 h-3.5 text-[#C22F23]" />
                    <span>MBCI TV Kenya</span>
                  </span>
                  <span className="text-stone-300">|</span>
                  <span className="flex items-center space-x-1.5">
                    <Radio className="w-3.5 h-3.5 text-[#173F35]" />
                    <span>MBCI Radio (89.5 / 89.3 FM)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Vision Biography */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center space-x-2 text-[#C22F23] font-black text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>The Vision Carrier</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#173F35] font-brand tracking-tight">
                Apostle John Kimani William
              </h2>

              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                The founder and vision carrier of this interdenominational prayer city is <strong>Apostle John Kimani William</strong>, the spiritual leader of <em>Kingdom Seekers Fellowship (KSF)</em> headquartered in Nakuru City. Working in close conjunction with the <em>Mission to the Body of Christ International (MBCI)</em>, Apostle Kimani established Heaven’s Gate not as a private denominational retreat, but as a <strong>global altar where all churches and nations gather</strong> to seek the Kingdom of God.
              </p>

              <div className="space-y-3.5">
                <div className="flex items-start space-x-3 bg-white p-3.5 rounded-xl border border-stone-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Interdenominational Mandate</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Open to Christians of every background—Presbyterian, Pentecostal, Baptist, Catholic, Anglican, and independent ministries alike.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white p-3.5 rounded-xl border border-stone-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Focus on Gates & Spiritual Alignment</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      The ministry’s core apostolic teachings focus on opening spiritual gates, repentance, breaking family altars, and financial and spiritual liberation through absolute devotion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white p-3.5 rounded-xl border border-stone-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">National Prayer Convocations</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Heaven’s Gate serves as the central venue for nationwide 3-day solemn assemblies, cross-over night vigils, and prayer gatherings for the peace of Kenya and the African continent.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR DAILY PROCESSES & SPIRITUAL RHYTHMS */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-[#C22F23] font-black text-xs uppercase tracking-wider mb-2">
            <Clock className="w-4 h-4" />
            <span>Atmosphere of Divine Encounter</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#173F35] font-brand tracking-tight">
            Our Daily Processes & Spiritual Rhythms
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
            To maintain an atmosphere charged for genuine breakthroughs, Heavens Gate operates under disciplined spiritual processes in which every visitor participates.
          </p>
        </div>

        {/* 4 Spiritual Rhythm Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {spiritualRhythms.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:shadow-md transition hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#173F35] text-[#E5C158] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-[11px] font-mono font-bold text-[#C22F23] uppercase mb-1">
                    {r.time}
                  </div>
                  <h3 className="font-bold text-sm text-[#173F35] mb-2">
                    {r.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {r.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* The Culture of Fasting Box */}
        <div className="bg-[#173F35] text-[#F8F5EC] rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-[#D4AF37]/40 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#244E40] mb-8">
              <div>
                <span className="text-[#E5C158] font-bold text-xs uppercase tracking-widest block mb-1">
                  Sacred Discipline of the Mountain
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-brand text-white">
                  The Culture of Fasting & Bodily Subjection
                </h3>
              </div>
              <div className="bg-[#0F2A23] border border-[#244E40] px-3.5 py-1.5 rounded-xl text-xs text-[#E5C158] font-mono">
                No Outside Food Allowed
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {fastingPillars.map((p, idx) => (
                <div key={idx} className="bg-[#0F2A23]/70 p-4 rounded-xl border border-[#244E40]">
                  <h4 className="font-bold text-sm text-[#E5C158] mb-1.5">{p.title}</h4>
                  <p className="text-xs text-[#F8F5EC]/80 leading-relaxed">{p.detail}</p>
                </div>
              ))}
            </div>

            {/* Note on Onsite Shop */}
            <div className="mt-8 pt-6 border-t border-[#244E40] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#F8F5EC]/80">
              <div className="flex items-center space-x-2">
                <Coffee className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  <strong>On-Site Convenience Store:</strong> Available within the campus to purchase glucose, sugar, tea, bottled water, toiletries, towels, slippers, and ladies’ wraps (lessos).
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SACRED GROUNDS & LANDMARKS GALLERY */}
      <section className="bg-stone-100 py-16 sm:py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 text-[#C22F23] font-black text-xs uppercase tracking-wider mb-2">
              <Building className="w-4 h-4" />
              <span>Campus Architecture & Sanctified Spaces</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#173F35] font-brand tracking-tight">
              Sacred Landmarks of Heavens Gate
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
              Every hall, chapel, trail, and garden has been set apart with intentionality for your spiritual transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campusLandmarks.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition group flex flex-col"
              >
                <div 
                  className="aspect-[16/10] overflow-hidden bg-stone-200 relative cursor-pointer"
                  onClick={() => setActivePhoto(item.image)}
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  />
                  <div className="absolute top-3 left-3 bg-[#173F35]/90 backdrop-blur-xs text-[#E5C158] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#D4AF37]/30">
                    {item.tag}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-[#173F35] mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#173F35]">
                    <span className="text-[11px] text-slate-500">Heavens Gate Campus</span>
                    <button 
                      onClick={() => onNavigate('map')}
                      className="text-xs text-[#173F35] hover:text-[#C22F23] flex items-center space-x-1 font-bold"
                    >
                      <span>Locate on Map</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ACCOMMODATION & PRICING STRUCTURE (Direct Booking Link) */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-[#C22F23] font-black text-xs uppercase tracking-wider mb-2">
            <Bed className="w-4 h-4" />
            <span>Affordable Spiritual Retreat Lodging</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#173F35] font-brand tracking-tight">
            Pilgrim Accommodation & Pricing
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
            In keeping with Apostle Kimani's vision, accommodation charges are kept highly subsidised so that financial limitations never prevent any believer from seeking God.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {accommodationTiers.map((tier, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-6 border-2 border-stone-200 hover:border-[#173F35] transition shadow-xs hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-base text-[#173F35] mb-1">{tier.name}</h3>
                <div className="text-xs text-slate-500 mb-4">{tier.capacity}</div>
                
                <div className="bg-[#F8F5EC] p-3 rounded-xl border border-[#E8E3D5] mb-4">
                  <div className="text-xl sm:text-2xl font-black text-[#173F35] font-mono">{tier.price}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">{tier.period}</div>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 mb-6">
                  {tier.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onNavigate('booking')}
                className="w-full bg-[#173F35] hover:bg-[#244E40] text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center space-x-1 shadow-xs"
              >
                <span>Reserve Room</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Accommodation Callout Banner */}
        <div className="bg-gradient-to-r from-[#173F35] to-[#244E40] text-white p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#D4AF37]/30">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-brand text-[#E5C158]">
              Ready to Book Your Prayer Retreat?
            </h3>
            <p className="text-xs sm:text-sm text-[#F8F5EC]/90 max-w-2xl">
              Reserve your bed online, download your instant QR gate pass, and arrive prepared for divine encounters. Online booking allows fast check-in at the security gate.
            </p>
          </div>
          <button
            onClick={() => onNavigate('booking')}
            className="bg-[#E5C158] hover:bg-[#d8b446] text-[#173F35] font-black text-sm px-6 py-3.5 rounded-xl shadow-lg transition transform hover:scale-105 shrink-0 flex items-center space-x-2"
          >
            <span>Go to Accommodations Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 7. STRICT MOUNTAIN POLICIES & PACKING CHECKLIST */}
      <section className="bg-[#F8F5EC] py-16 sm:py-20 border-t border-[#E8E3D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Rules Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 text-[#173F35]">
                <ShieldCheck className="w-6 h-6 text-[#C22F23]" />
                <h3 className="text-xl font-bold font-brand">Campus Holiness & Guidelines</h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start space-x-3">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-900 block font-semibold mb-0.5">Strict Modesty Dress Code:</strong>
                    <span>Ladies must wear long dresses or skirts falling below the knee. No trousers, tight leggings, shorts, or sleeveless tops are allowed. Men must wear long trousers; no shorts or sleeveless vests.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-[#173F35] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold mb-0.5">Gate Hours (5:00 AM — 8:00 PM):</strong>
                    <span>The main gate opens at 5:00 AM for arriving pilgrims and is strictly locked at 8:00 PM for campus security and order. No night arrivals are permitted past 8:00 PM.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start space-x-3">
                  <Info className="w-4 h-4 text-[#173F35] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold mb-0.5">Quiet Solitude & Cleanliness:</strong>
                    <span>Loud music, casual social chatting, and recording corporate services without administrative accreditation are strictly forbidden. Maintain supreme cleanliness across the gardens.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Packing Checklist */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 text-[#173F35]">
                <BookOpen className="w-6 h-6 text-[#173F35]" />
                <h3 className="text-xl font-bold font-brand">What to Carry for Your Stay</h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Gilgil can experience cool highland temperatures especially during the midnight watch. Ensure you pack the following essentials:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Original National ID / Passport</strong> (Compulsory at gate)</span>
                </div>
                <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Warm Blanket / Sleeping Bag</strong> (If in shared dorms)</span>
                </div>
                <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Lesso / Prayer Shawl</strong> (Mandatory for ladies)</span>
                </div>
                <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Warm Jacket & Socks</strong> (For midnight prayer watches)</span>
                </div>
                <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Personal Toiletries & Slippers</strong> (For shower areas)</span>
                </div>
                <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Bible, Notebook & Pen</strong> (For personal revelation)</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-[11px] text-slate-500 bg-stone-50 p-3 rounded-xl border border-stone-200">
                  💡 <em>Items like sugar, glucose, bath towels, and extra lessos are also available for purchase inside the campus tuck-shop.</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. OFFICIAL VERIFICATION & BROADCAST NETWORKS */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#173F35] text-[#F8F5EC] rounded-3xl p-8 sm:p-12 border-2 border-[#D4AF37]/40 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[#E5C158] font-bold text-xs uppercase tracking-wider block">
                Official Ministry Verification
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-brand text-white">
                Stay Connected with Heaven’s Gate Prayer Mountain
              </h2>
              <p className="text-xs sm:text-sm text-[#F8F5EC]/90 leading-relaxed">
                Verify scheduled national prayer assemblies, corporate fasting calendars, emergency communications, and live ministry updates through official verified channels:
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://www.facebook.com/heavensgateprayermountain/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center space-x-2 shadow-xs"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Official Facebook Page (Verified)</span>
                </a>

                <a
                  href="https://www.facebook.com/mbcitvradio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition flex items-center space-x-2"
                >
                  <Tv className="w-4 h-4 text-[#E5C158]" />
                  <span>MBCI TV & Radio Channels</span>
                </a>

                <a
                  href="tel:+254700999111"
                  className="bg-[#0F2A23] hover:bg-[#143930] text-[#E5C158] border border-[#D4AF37]/30 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Gate Helpline: 0700 999 111</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#0F2A23] p-5 rounded-2xl border border-[#244E40] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E5C158] text-[#173F35] font-black flex items-center justify-center mx-auto text-xl shadow-md">
                ✞
              </div>
              <h4 className="font-bold text-sm text-[#E5C158]">Visit Us in Gilgil</h4>
              <p className="text-xs text-[#F8F5EC]/80 leading-relaxed">
                Nairobi-Nakuru Highway, Directly Opposite St. Mary's Mission Hospital, Gilgil, Kenya.
              </p>
              <button
                onClick={() => onNavigate('transport')}
                className="w-full bg-[#244E40] hover:bg-[#2d5f4f] text-[#F8F5EC] border border-[#D4AF37]/40 font-bold text-xs py-2 rounded-xl transition"
              >
                View Bus Routes & Fares
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Photo Viewer */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div className="max-w-4xl max-h-[90vh] relative">
            <img 
              src={activePhoto} 
              alt="Heavens Gate Full Resolution View" 
              className="max-h-[85vh] w-auto object-contain rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 text-xs font-bold transition"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
