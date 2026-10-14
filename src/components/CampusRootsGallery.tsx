import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, MapPin, Eye, X, ZoomIn, 
  ShieldCheck, Heart, Clock, ChevronRight, Compass, Flame
} from 'lucide-react';

// Authentic Roots Assets:
import stoneMarkImg from '../assets/HEAVENS GATE STONE MARK.jpg';
import apostleKimaniImg from '../assets/APOSTLE KIMANI.jpg';
import apostleFellowshipImg from '../assets/Apostle-John-Kimani-William-Kingdom-Seekers-Fellowship.jpeg';
import shiloHallImg from '../assets/SHILO HALL.jpg';
import shiloFront2Img from '../assets/SHILO FRONT VIEW 2.jpg';
import shilo3Img from '../assets/SHILO 3.jpg';
import shiloGroundImg from '../assets/SHILO GROUND.jpg';
import shiloRoofImg from '../assets/ROOF AND WALLS SHILO.jpg';
import shiloInFrontImg from '../assets/SHILO IN FRONT VIEW.jpg';
import shiloInnImg from '../assets/SHILO INN.jpg';
import mtSinaiChapelImg from '../assets/MT SINAI CHAPEL.jpg';
import hostelsImg from '../assets/AL HOSTELS.jpg';
import hostel2Img from '../assets/HOSTEL 2.jpg';
import hostel3Img from '../assets/HOSTEL 3.jpg';
import hostel4Img from '../assets/HOSTEL 4.jpg';
import hostelsGeneralImg from '../assets/HOSTELS.jpg';
import kitchenImg from '../assets/KITCHEN AREA.webp';
import entryGateImg from '../assets/ENTRY GATE CLEAR.jpg';
import entry2Img from '../assets/ENTRY 2.jpg';
import entry3Img from '../assets/ENTRY3.jpg';
import gateViewImg from '../assets/GATE VIEW.jpg';
import heavensGateEntryImg from '../assets/HEAVENS GATE ENTRY GATE.jpg';
import fullViewImg from '../assets/HEAVENS GATE FULL VIEW.jpg';
import compoundImg from '../assets/COMPOND.jpg';
import environmentImg from '../assets/ENVIRONMENT.jpg';
import environment2Img from '../assets/ENVIRONMENT2.jpg';
import billboardImg from '../assets/BILL BOARD.jpg';

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'roots' | 'sanctuary' | 'hostels' | 'routes';
  image: string;
  description: string;
  badge: string;
}

export const CampusRootsGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'roots' | 'sanctuary' | 'hostels' | 'routes'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const authenticPhotos: GalleryPhoto[] = [
    {
      id: 'stone-mark',
      title: 'Sacred Altar Stone Monument',
      category: 'roots',
      image: stoneMarkImg,
      description: 'The foundational stone monument marking the 2011 groundbreaking dedication. Engraved with Genesis 28:17: "...This is none other than the house of God, and this is the gate of heaven."',
      badge: 'Spiritual Roots • 2011'
    },
    {
      id: 'apostle-kimani',
      title: 'Apostle John Kimani William',
      category: 'roots',
      image: apostleKimaniImg,
      description: 'Visionary Founder and Spiritual Father of Heavens Gate Prayer Mountain, and General Overseer of Kingdom Seekers Fellowship.',
      badge: 'Founding Vision'
    },
    {
      id: 'apostle-fellowship',
      title: 'Kingdom Seekers Fellowship Ministry',
      category: 'roots',
      image: apostleFellowshipImg,
      description: 'Under the spiritual guidance of Apostle John Kimani William, Heavens Gate serves as a non-denominational global altar of prayer.',
      badge: 'Spiritual Heritage'
    },
    {
      id: 'shilo-hall-main',
      title: 'Shiloh Main Prayer Sanctuary',
      category: 'sanctuary',
      image: shiloHallImg,
      description: 'The primary corporate intercession auditorium where continuous prayer watches, spiritual warfare, and worship ascend day and night.',
      badge: '24/7 Corporate Altar'
    },
    {
      id: 'shilo-front-2',
      title: 'Shiloh Sanctuary Altar Steps',
      category: 'sanctuary',
      image: shiloFront2Img,
      description: 'The elevated entrance and steps to Shiloh Sanctuary overlooking the sacred hillside prayer grounds.',
      badge: 'Sanctuary Altar'
    },
    {
      id: 'mt-sinai',
      title: 'Mount Sinai Prayer Chapel',
      category: 'sanctuary',
      image: mtSinaiChapelImg,
      description: 'A serene stone chapel on the higher slopes dedicated to personal fasting, prolonged silence, and seeking the face of God.',
      badge: 'Solitude & Fasting'
    },
    {
      id: 'shilo-3',
      title: 'Shiloh Prayer Hall Side Wing',
      category: 'sanctuary',
      image: shilo3Img,
      description: 'Spacious side pavilions accommodating thousands of believers during major national prayer convocations.',
      badge: 'Auditorium Wing'
    },
    {
      id: 'shilo-ground',
      title: 'Sanctuary Concourse & Grounds',
      category: 'sanctuary',
      image: shiloGroundImg,
      description: 'Paved outdoor gathering concourse between the sanctuaries where pilgrims pray under the open heavens.',
      badge: 'Outdoor Altar'
    },
    {
      id: 'roof-shilo',
      title: 'Shiloh Sanctuary Architecture',
      category: 'sanctuary',
      image: shiloRoofImg,
      description: 'High-vaulted ceiling engineered for acoustic resonance, allowing congregational intercession to echo in unison.',
      badge: 'Holy Architecture'
    },
    {
      id: 'shilo-in-front',
      title: 'Shiloh Forecourt View',
      category: 'sanctuary',
      image: shiloInFrontImg,
      description: 'The welcoming forecourt of the Shiloh sanctuary during early morning prayer watches.',
      badge: 'Sanctuary View'
    },
    {
      id: 'shilo-inn',
      title: 'Intercessors Sanctuary Annex',
      category: 'sanctuary',
      image: shiloInnImg,
      description: 'Designated prayer counseling rooms and intercessory watch stations adjacent to the main hall.',
      badge: 'Watch Station'
    },
    {
      id: 'al-hostels',
      title: 'Pilgrim Accommodation Wings',
      category: 'hostels',
      image: hostelsImg,
      description: 'Multi-storey subsidised accommodation blocks providing clean beds, hot showers, and peaceful quarters for pilgrims.',
      badge: 'Pilgrim Quarters'
    },
    {
      id: 'hostel-2',
      title: 'Hostels Block B Courtyard',
      category: 'hostels',
      image: hostel2Img,
      description: 'Secure, gender-separated dormitory wings with peaceful verandas for reading scripture and personal meditation.',
      badge: 'Accommodation'
    },
    {
      id: 'hostel-3',
      title: 'Executive & Private Rooms Wing',
      category: 'hostels',
      image: hostel3Img,
      description: 'Single and double self-contained rooms designed for ministers and pilgrims on intensive spiritual retreats.',
      badge: 'Private Solitude'
    },
    {
      id: 'hostel-4',
      title: 'Dormitory Hallway & Facilities',
      category: 'hostels',
      image: hostel4Img,
      description: 'Well-maintained ablution blocks and clean corridors supporting long-stay fasting delegations.',
      badge: 'Dormitory Wing'
    },
    {
      id: 'hostels-general',
      title: 'Mount Zion Hostels Complex',
      category: 'hostels',
      image: hostelsGeneralImg,
      description: 'Panoramic view of the hostel facilities nestled peacefully against the Gilgil hillside.',
      badge: 'Living Quarters'
    },
    {
      id: 'kitchen-area',
      title: 'Pilgrim Fasting Refectory',
      category: 'hostels',
      image: kitchenImg,
      description: 'Official campus kitchen serving continuous boiling water, scheduled Kenyan black tea, and quiet dining fellowship.',
      badge: 'Free Hot Water & Tea'
    },
    {
      id: 'billboard-route',
      title: 'Highway Route Landmark Billboard',
      category: 'routes',
      image: billboardImg,
      description: 'The landmark signpost along the Nairobi-Nakuru Highway (A104) at the Gilgil weighbridge turn-off guiding visitors to the prayer mountain.',
      badge: 'Travel Landmark'
    },
    {
      id: 'entry-gate-clear',
      title: 'Official Security Gatehouse',
      category: 'routes',
      image: entryGateImg,
      description: 'The main security check-in entrance where tickets are scanned, IDs are verified, and visitors are welcomed.',
      badge: 'Gatehouse (5 AM - 8 PM)'
    },
    {
      id: 'gate-view',
      title: 'Heavens Gate Access Road',
      category: 'routes',
      image: gateViewImg,
      description: 'The 1.5 km scenic approach road leading from the Gilgil highway directly to the sanctuary gates.',
      badge: 'Approach Route'
    },
    {
      id: 'entry-2',
      title: 'Vehicle Admission Checkpoint',
      category: 'routes',
      image: entry2Img,
      description: 'Designated vehicle screening bay and visitor parking zone at the base of the mountain.',
      badge: 'Secure Parking'
    },
    {
      id: 'entry-3',
      title: 'Pedestrian Welcome Gate',
      category: 'routes',
      image: entry3Img,
      description: 'Dedicated pedestrian gate with security marshals ensuring orderly entry for delegations.',
      badge: 'Pedestrian Portal'
    },
    {
      id: 'full-view-mountain',
      title: 'Heavens Gate Mountain Panorama',
      category: 'routes',
      image: fullViewImg,
      description: 'Sweeping panoramic view of the 2,050-metre elevation prayer grounds in Gilgil, Nakuru County.',
      badge: 'Sacred Elevation'
    },
    {
      id: 'compound-grounds',
      title: 'Campus Compound & Greenery',
      category: 'routes',
      image: compoundImg,
      description: 'Paved walkways and green perimeter lawns providing clean transit between sanctuary halls and hostels.',
      badge: 'Serene Grounds'
    },
    {
      id: 'environment-solitude',
      title: 'Hillside Solitude Path',
      category: 'routes',
      image: environmentImg,
      description: 'Quiet mountain pathways lined with eucalyptus trees where pilgrims walk and pray in personal contemplation.',
      badge: 'Contemplation Walk'
    },
    {
      id: 'environment-rift',
      title: 'Great Rift Valley Horizon',
      category: 'routes',
      image: environment2Img,
      description: 'Crisp mountain air and tranquil skies over the Gilgil plateau, providing an atmosphere free from urban distractions.',
      badge: 'Mountain Horizon'
    }
  ];

  const filteredPhotos = authenticPhotos.filter(photo => {
    if (activeCategory === 'all') return true;
    return photo.category === activeCategory;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* ======================================================== */}
      {/* SECTION HEADER: SPIRITUAL ROOTS & HISTORY                 */}
      {/* ======================================================== */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-5 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100 px-3 py-1 rounded-full mb-2">
            <Flame className="w-3.5 h-3.5 text-orange-600" />
            <span>Spiritual Roots & Authentic Campus Archive</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-slate-900">
            The Roots of Heavens Gate Prayer Mountain
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
            Founded in 2011 by Apostle John Kimani William under divine mandate, Heavens Gate is a consecrated altar of continuous day-and-night prayer overlooking the Great Rift Valley in Gilgil, Kenya.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {[
            { id: 'all', label: `All Photos (${authenticPhotos.length})` },
            { id: 'roots', label: 'Sacred Roots & Altar' },
            { id: 'sanctuary', label: 'Sanctuaries & Halls' },
            { id: 'hostels', label: 'Hostels & Refectory' },
            { id: 'routes', label: 'Highway Routes & Gates' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition text-xs ${
                activeCategory === tab.id
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/25'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-orange-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* THE SPIRITUAL ROOTS FEATURE CARD                          */}
      {/* ======================================================== */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Apostle & Cornerstone Photos */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden border border-orange-500/30 shadow-xl group cursor-pointer"
                 onClick={() => setSelectedPhoto(authenticPhotos[0])}>
              <img
                src={stoneMarkImg}
                alt="Sacred Altar Stone Monument Genesis 28:17"
                className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-bold text-orange-300">2011 Dedicated Stone</span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-orange-500/30 shadow-xl group cursor-pointer"
                 onClick={() => setSelectedPhoto(authenticPhotos[1])}>
              <img
                src={apostleKimaniImg}
                alt="Apostle John Kimani William"
                className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-bold text-orange-300">Apostle John Kimani</span>
              </div>
            </div>
          </div>

          {/* Spiritual Heritage Narrative */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center space-x-2 text-orange-400 font-mono text-xs uppercase font-bold tracking-widest">
              <BookOpen className="w-4 h-4 text-orange-500" />
              <span>Foundational Covenant • Genesis 28:17</span>
            </div>

            <h3 className="font-cinzel text-xl sm:text-2xl font-black text-white leading-snug">
              "How dreadful is this place! This is none other but the house of God, and this is the gate of heaven."
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Heavens Gate Prayer Mountain was birthed out of a burden to establish an uninterrupted, 24-hour altar of prayer in Kenya where believers from every nation could seek God in holiness, intensive fasting, and solitary intercession. Situated in the peaceful hills of Gilgil at an elevation of 2,050 meters, the mountain stands as a consecrated sanctuary dedicated to revival, national repentance, and spiritual breakthrough.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] text-orange-400 font-bold uppercase font-mono">Founding Year</div>
                <div className="text-lg font-black text-white mt-0.5">2011</div>
                <div className="text-[11px] text-slate-400">Gilgil Consecration</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] text-orange-400 font-bold uppercase font-mono">Continuous Altar</div>
                <div className="text-lg font-black text-white mt-0.5">24/7 Watches</div>
                <div className="text-[11px] text-slate-400">3-Hour Intercessions</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] text-orange-400 font-bold uppercase font-mono">Fasting Order</div>
                <div className="text-lg font-black text-white mt-0.5">Strict Sanctity</div>
                <div className="text-[11px] text-slate-400">Free Tea & Boiling Water</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* AUTHENTIC PHOTO GRID (NO PHOTO REMOVED, CRISP FRAMING)   */}
      {/* ======================================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Showing {filteredPhotos.length} authentic campus assets • Click any photo to view full size</span>
          <span className="hidden sm:inline font-mono">100% Genuine Heavens Gate Archives</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map(photo => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="glass-card group rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:border-orange-400 transition flex flex-col justify-between border border-slate-200"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black/70 text-orange-300 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/20">
                    {photo.badge}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-orange-600 text-white p-2 rounded-full shadow-lg">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 group-hover:text-orange-600 transition">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 leading-snug">
                    {photo.description}
                  </p>
                </div>
                <div className="pt-2 flex items-center text-[10px] font-bold text-orange-600 space-x-1">
                  <span>View Details</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* LIGHTBOX MODAL FOR FULL-RESOLUTION INSPECTION            */}
      {/* ======================================================== */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-0"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-900/60">
              <div>
                <span className="text-[10px] font-bold uppercase text-orange-400 bg-orange-950/60 border border-orange-800 px-2.5 py-0.5 rounded-full">
                  {selectedPhoto.badge}
                </span>
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-white mt-1">
                  {selectedPhoto.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-orange-600 text-white flex items-center justify-center transition"
                aria-label="Close photo preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image (Preserves Exact Proportions Without Pixelation or Stretches) */}
            <div className="relative max-h-[60vh] sm:max-h-[65vh] w-full flex items-center justify-center bg-black p-2">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-h-[58vh] max-w-full object-contain rounded-xl"
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 sm:p-5 bg-slate-900/80 border-t border-slate-800">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {selectedPhoto.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  <span>Heavens Gate Prayer Mountain, Gilgil, Nakuru County, Kenya</span>
                </span>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
