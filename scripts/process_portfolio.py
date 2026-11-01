import os
import json
from PIL import Image

SRC_DIR = r"C:\Users\ASUS\Downloads\ilovepdf_pages-to-jpg (1)"
DEST_DIR = r"E:\OneDrive\Desktop\JAIXO STUDIO\public\portfolio"

os.makedirs(DEST_DIR, exist_ok=True)

# Define metadata for each of the 55 actual designs
PROJECTS_META = [
    {
        "page": 1,
        "filename": "01-shatranj-2-chess-competition.jpg",
        "title": "Shatranj 2.0 — Online Chess Competition",
        "category": "Event & Promotional Posters",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Tournament Registration & Payment Poster",
        "description": "Bold typographic promotional poster for Shatranj 2.0 online chess competition featuring dark-themed 3D chess piece compositions, event fee badges, and payment gateways.",
        "deliverables": ["Digital Poster", "Social Media Broadcast", "Payment Gateways Layout"],
        "toolsUsed": ["Photoshop", "Illustrator"],
        "featured": True
    },
    {
        "page": 2,
        "filename": "02-world-aids-day-hope-awareness.jpg",
        "title": "World AIDS Day — Hope Begins with Awareness",
        "category": "Awareness & Social Campaigns",
        "client": "District Rotaract Organization 2025-26 | RID 3203",
        "year": "2025",
        "designType": "Public Health Awareness Poster",
        "description": "Clean editorial awareness campaign design combining global map watermark, bold red typography, awareness ribbon motif, and youth advocacy illustration.",
        "deliverables": ["Social Awareness Creative", "District Promotional Poster"],
        "toolsUsed": ["Illustrator", "Photoshop"],
        "featured": True
    },
    {
        "page": 3,
        "filename": "03-dudes-footwear-one-day-offer.jpg",
        "title": "Dude's Footwear — One Day Offer (Jordan Edition)",
        "category": "Commercial Advertisements",
        "client": "Dude's Footwear",
        "year": "2025",
        "designType": "Commercial Product Promotion",
        "description": "High-impact retail promotional advertisement featuring bold typography, floating sneaker product spotlight, discount price tags, and urgent call-to-action hooks.",
        "deliverables": ["Instagram Feed Ad", "Discount Promo Creative"],
        "toolsUsed": ["Photoshop"],
        "featured": True
    },
    {
        "page": 4,
        "filename": "04-dudes-deal-clogs-promo.jpg",
        "title": "Dude's Deal — Classic White Clogs Campaign",
        "category": "Commercial Advertisements",
        "client": "Dude's Footwear",
        "year": "2025",
        "designType": "E-Commerce Promotional Ad",
        "description": "Product advertisement featuring warm amber gradient background, floating slip-on clogs, slash-price badge, and direct WhatsApp order links.",
        "deliverables": ["Product Showcase Ad", "Social Promo Graphic"],
        "toolsUsed": ["Photoshop"],
        "featured": True
    },
    {
        "page": 5,
        "filename": "05-world-aids-day-compassion.jpg",
        "title": "World AIDS Day — Global Compassion & Unity",
        "category": "Awareness & Social Campaigns",
        "client": "District Rotaract Organization 2025-26 | RID 3203",
        "year": "2025",
        "designType": "District Awareness Poster",
        "description": "Graphic poster highlighting global compassion, community testing encouragement, and red ribbon awareness with dynamic typography.",
        "deliverables": ["Awareness Campaign Poster", "District Social Graphic"],
        "toolsUsed": ["Illustrator", "Photoshop"],
        "featured": False
    },
    {
        "page": 6,
        "filename": "06-world-aids-day-prevention.jpg",
        "title": "World AIDS Day — Unite in Awareness",
        "category": "Awareness & Social Campaigns",
        "client": "District Rotaract Organization 2025-26 | RID 3203",
        "year": "2025",
        "designType": "Social Action Campaign Poster",
        "description": "Advocacy campaign highlighting stigma eradication, prevention education, and global remembrance with crisp typography and clean composition.",
        "deliverables": ["District Campaign Graphic", "Public Awareness Poster"],
        "toolsUsed": ["Illustrator"],
        "featured": False
    },
    {
        "page": 7,
        "filename": "07-shatranj-2-play-for-education.jpg",
        "title": "Shatranj 2.0 — Move for Education",
        "category": "Event & Promotional Posters",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Official Tournament Schedule Poster",
        "description": "Official event announcement poster with 'Play with Passion & Move for Education' theme, timing schedule, and club executive endorsements.",
        "deliverables": ["Tournament Schedule Poster", "Club Broadcast Graphic"],
        "toolsUsed": ["Photoshop", "Illustrator"],
        "featured": True
    },
    {
        "page": 8,
        "filename": "08-childrens-day-innocent-smiles.jpg",
        "title": "Children's Day — Innocent Smiles",
        "category": "Festival & Celebration Designs",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Celebration Greeting Poster",
        "description": "Joyful Children's Day celebration graphic featuring soft festive background and club executive signatures.",
        "deliverables": ["Celebration Poster", "Social Media Greeting"],
        "toolsUsed": ["Photoshop"],
        "featured": False
    },
    {
        "page": 9,
        "filename": "09-service-through-smiles-community.jpg",
        "title": "Service Through Smiles — Community Initiative",
        "category": "Organisational & Corporate Designs",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Community Project Announcement",
        "description": "Official community service initiative poster highlighting club social welfare projects and leadership coordinators.",
        "deliverables": ["Official Project Notice", "Documentation Graphic"],
        "toolsUsed": ["Illustrator"],
        "featured": False
    },
    {
        "page": 10,
        "filename": "10-executive-leadership-roster.jpg",
        "title": "Executive Administration & Leadership Roster",
        "category": "Organisational & Corporate Designs",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Club Administration Roster Poster",
        "description": "Executive identity poster featuring formal typography, club charter verification, and secretariat contact details.",
        "deliverables": ["Official Club Announcement", "Administration Poster"],
        "toolsUsed": ["Illustrator"],
        "featured": False
    },
    {
        "page": 11,
        "filename": "11-dudes-deal-running-shoes.jpg",
        "title": "Dude's Deal — Performance Footwear at ₹649",
        "category": "Commercial Advertisements",
        "client": "Dude's Footwear",
        "year": "2025",
        "designType": "Commercial Product Creative",
        "description": "Dark aesthetic commercial ad for performance running footwear with high-contrast badge styling and social handle integration.",
        "deliverables": ["Instagram Feed Ad", "Promotional Poster"],
        "toolsUsed": ["Photoshop"],
        "featured": True
    },
    {
        "page": 12,
        "filename": "12-international-mens-day.jpg",
        "title": "International Men's Day Commemoration",
        "category": "Festival & Celebration Designs",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Observance & Celebration Poster",
        "description": "Commemorative poster celebrating positive role models and community contributions on International Men's Day.",
        "deliverables": ["Observance Poster", "Social Greeting"],
        "toolsUsed": ["Illustrator"],
        "featured": False
    },
    {
        "page": 13,
        "filename": "13-77th-republic-day-erode-kalam.jpg",
        "title": "77th Republic Day — Pride of the Nation",
        "category": "Festival & Celebration Designs",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2026",
        "designType": "Patriotic Celebration Poster",
        "description": "Patriotic celebratory poster honoring the Indian Constitution with national tricolor accents and inspirational typography.",
        "deliverables": ["National Day Poster", "Club Broadcast Asset"],
        "toolsUsed": ["Photoshop", "Illustrator"],
        "featured": True
    },
    {
        "page": 14,
        "filename": "14-international-youth-day.jpg",
        "title": "International Youth Day — Shape The Future",
        "category": "Festival & Celebration Designs",
        "client": "District Rotaract Organization | RID 3203",
        "year": "2025",
        "designType": "Motivational Observance Poster",
        "description": "Dynamic typography-led motivational poster inspiring young changemakers on International Youth Day.",
        "deliverables": ["Youth Day Graphic", "District Broadcast Poster"],
        "toolsUsed": ["Illustrator"],
        "featured": False
    },
    {
        "page": 15,
        "filename": "15-shatranj-2-get-ready-teaser.jpg",
        "title": "Shatranj 2.0 — Official Teaser Poster",
        "category": "Event & Promotional Posters",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Event Teaser Graphic",
        "description": "Teaser promotional campaign building anticipation for the club's flagship annual chess tournament.",
        "deliverables": ["Teaser Broadcast Creative", "Social Promo"],
        "toolsUsed": ["Photoshop"],
        "featured": False
    },
    {
        "page": 16,
        "filename": "16-ctrl-art-ai-creative-shortcut.jpg",
        "title": "CTRL + ART + AI: The New Creative Shortcut",
        "category": "Event & Promotional Posters",
        "client": "Rotaract Club of Erode Kalam & Salem Gems",
        "year": "2025",
        "designType": "Webinar & Technical Workshop Poster",
        "description": "Tech-forward collaborative workshop poster exploring generative AI in creative design, featuring guest speaker spotlight and registration info.",
        "deliverables": ["Workshop Poster", "Speaker Announcement Graphic"],
        "toolsUsed": ["Photoshop", "Illustrator"],
        "featured": True
    },
    {
        "page": 17,
        "filename": "17-official-club-meeting-october.jpg",
        "title": "Official Club Assembly & General Meeting",
        "category": "Organisational & Corporate Designs",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Corporate Meeting Notice",
        "description": "Formal administrative announcement poster for the club's monthly review meeting via Google Meet.",
        "deliverables": ["Meeting Notice Poster", "Digital Agenda Broadcast"],
        "toolsUsed": ["Illustrator"],
        "featured": False
    },
    {
        "page": 18,
        "filename": "18-official-board-meeting-february.jpg",
        "title": "Official Executive Board Meeting",
        "category": "Organisational & Corporate Designs",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2026",
        "designType": "Executive Governance Notice",
        "description": "Professional executive board meeting announcement detailing timing, protocol, and virtual meeting links.",
        "deliverables": ["Board Meeting Creative", "Internal Governance Graphic"],
        "toolsUsed": ["Illustrator"],
        "featured": False
    },
    {
        "page": 19,
        "filename": "19-bon-voyage-trip-rid-3011.jpg",
        "title": "Bon Voyage — Goodwill Delegation to RID 3011",
        "category": "Organisational & Corporate Designs",
        "client": "District Rotaract Organization 2025-26 | RID 3203",
        "year": "2025",
        "designType": "Travel & Goodwill Exchange Poster",
        "description": "Official district travel greeting poster designed for goodwill exchange delegates visiting Rotary International District 3011.",
        "deliverables": ["Travel Announcement Poster", "District Social Graphic"],
        "toolsUsed": ["Photoshop", "Illustrator"],
        "featured": False
    },
    {
        "page": 20,
        "filename": "20-pongal-prosperity-wishes.jpg",
        "title": "Happy Pongal — Prosperity, Warmth & Happiness",
        "category": "Festival & Celebration Designs",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2026",
        "designType": "Cultural Festival Greeting Poster",
        "description": "Festive Pongal greeting design featuring harvest earthen pots, sugarcane illustrations, and warm Tamil cultural motifs.",
        "deliverables": ["Cultural Festival Poster", "Social Media Greeting"],
        "toolsUsed": ["Illustrator", "Photoshop"],
        "featured": True
    },
    {
        "page": 21,
        "filename": "21-shadows-of-night-halloween.jpg",
        "title": "Shadows of Night — Halloween Festival",
        "category": "Festival & Celebration Designs",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Themed Festival Poster",
        "description": "Spooky themed Halloween graphic with moody dark lighting, silhouette artwork, and custom eerie typography.",
        "deliverables": ["Theme Party Poster", "Club Event Creative"],
        "toolsUsed": ["Photoshop"],
        "featured": False
    },
    {
        "page": 22,
        "filename": "22-rili-chennai-leadership-departure.jpg",
        "title": "RILI Chennai 2026 — Leadership Contingent Departure",
        "category": "Organisational & Corporate Designs",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2026",
        "designType": "Leadership Conference Departure Poster",
        "description": "Official delegation announcement poster for club representation at the prestigious Rotary Institute of Leadership Information in Chennai.",
        "deliverables": ["Delegation Poster", "Social Broadcast Graphic"],
        "toolsUsed": ["Illustrator"],
        "featured": False
    },
    {
        "page": 23,
        "filename": "23-district-group-representative-banner.jpg",
        "title": "District Group Representative Official Banner",
        "category": "Organisational & Corporate Designs",
        "client": "Rotaract Club of Erode Kalam | Group 1 RID 3203",
        "year": "2025",
        "designType": "Official Governance Identity Poster",
        "description": "Formal organizational banner detailing Group 1 district representation, club ID, and secretarial leadership appointments.",
        "deliverables": ["Governance Banner", "Official Citation"],
        "toolsUsed": ["Illustrator"],
        "featured": False
    },
    {
        "page": 24,
        "filename": "24-disease-prevention-treatment-month.jpg",
        "title": "Disease Prevention & Treatment Month",
        "category": "Awareness & Social Campaigns",
        "client": "District Rotaract Organization 2025-26 | RID 3203",
        "year": "2025",
        "designType": "Public Health Focus Area Poster",
        "description": "Healthcare awareness poster promoting community hygiene, healthcare access, and preventative medicine initiatives.",
        "deliverables": ["Rotary Focus Area Poster", "Public Awareness Graphic"],
        "toolsUsed": ["Illustrator"],
        "featured": False
    },
    {
        "page": 25,
        "filename": "25-rotary-zone-institute-delhi.jpg",
        "title": "Rotary Zone Institute Delhi Delegation",
        "category": "Organisational & Corporate Designs",
        "client": "District Rotaract Organization 2025-26 | RID 3203",
        "year": "2025",
        "designType": "National Institute Travel Poster",
        "description": "Official leadership delegation graphic commemorating RID 3203 executive participation at the national Rotary Zone Institute in Delhi.",
        "deliverables": ["Delegation Notice Poster", "District Announcement"],
        "toolsUsed": ["Illustrator", "Photoshop"],
        "featured": False
    },
    {
        "page": 26,
        "filename": "26-dudes-footwear-flash-sale.jpg",
        "title": "Dude's Footwear — 3-Day Flash Sale",
        "category": "Commercial Advertisements",
        "client": "Dude's Footwear",
        "year": "2025",
        "designType": "Retail Promotion Poster",
        "description": "Bold commercial ad featuring grid typography, discount callouts for casual slippers and shoes, and direct store contact details.",
        "deliverables": ["Flash Deal Creative", "Instagram Story Ad"],
        "toolsUsed": ["Photoshop"],
        "featured": True
    },
    {
        "page": 27,
        "filename": "27-general-body-meeting-october.jpg",
        "title": "Official General Body Meeting Announcement",
        "category": "Organisational & Corporate Designs",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Official Meeting Notice",
        "description": "Formal administrative notice poster announcing the General Body Meeting for club members.",
        "deliverables": ["Meeting Notice Poster", "WhatsApp Broadcast Graphic"],
        "toolsUsed": ["Illustrator"],
        "featured": False
    },
    {
        "page": 28,
        "filename": "28-dudes-footwear-cozy-comfort.jpg",
        "title": "Dude's Footwear — Cozy Comfort in Every Step",
        "category": "Commercial Advertisements",
        "client": "Dude's Footwear",
        "year": "2025",
        "designType": "Product Feature Advertisement",
        "description": "Product advertisement highlighting ergonomic daily footwear, featuring modern typographic framing and pricing badge.",
        "deliverables": ["E-Commerce Promotional Asset", "Social Ad"],
        "toolsUsed": ["Photoshop"],
        "featured": False
    },
    {
        "page": 29,
        "filename": "29-diabetes-mellitus-awareness.jpg",
        "title": "Diabetes Mellitus Awareness & Care Guide",
        "category": "Awareness & Social Campaigns",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Health Infographic Poster",
        "description": "Structured medical infographic poster educating the public on diabetes symptoms, dietary prevention, blood sugar monitoring, and lifestyle care.",
        "deliverables": ["Educational Infographic Poster", "Social Health Card"],
        "toolsUsed": ["Illustrator", "Photoshop"],
        "featured": True
    },
    {
        "page": 30,
        "filename": "30-uzhavar-thirunal-farmers-festival.jpg",
        "title": "Happy Uzhavar Thirunal — Honoring Our Farmers",
        "category": "Festival & Celebration Designs",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2026",
        "designType": "Cultural Festival Greeting Poster",
        "description": "Cultural celebration design dedicated to agriculture and farmers, blending traditional iconography with clean layouts.",
        "deliverables": ["Festival Greeting Poster", "Club Broadcast Asset"],
        "toolsUsed": ["Illustrator"],
        "featured": False
    },
    {
        "page": 31,
        "filename": "31-safexion-road-safety-mirrors.jpg",
        "title": "SafeXion — Blind Spot Convex Road Safety Project",
        "category": "Awareness & Social Campaigns",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Public Safety Campaign Poster",
        "description": "Public community welfare campaign poster promoting installation of convex mirrors at blind turns to reduce accidents and save lives.",
        "deliverables": ["Public Safety Campaign Poster", "Community Project Creative"],
        "toolsUsed": ["Photoshop", "Illustrator"],
        "featured": True
    },
    {
        "page": 32,
        "filename": "32-kalam-quest-champions-appreciation.jpg",
        "title": "Kalam Quest Champions & Participant Appreciation",
        "category": "Calendars & Event Collages",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Activity Recognition Collage",
        "description": "Vibrant participant appreciation poster celebrating active engagement and learning contest winners in the club's weekly Kalam Quest initiative.",
        "deliverables": ["Recognition Collage", "Social Media Spotlight"],
        "toolsUsed": ["Photoshop"],
        "featured": False
    },
    {
        "page": 33,
        "filename": "33-karthigai-deepam-lights-festival.jpg",
        "title": "Happy Karthigai Deepam — Festival of Lights",
        "category": "Festival & Celebration Designs",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Traditional Festival Greeting Poster",
        "description": "Spiritual festival greeting design celebrating Karthigai Deepam with glowing diya oil lamps and traditional celebratory typography.",
        "deliverables": ["Festival Greeting Poster", "Digital Broadcast Card"],
        "toolsUsed": ["Photoshop", "Illustrator"],
        "featured": True
    },
    {
        "page": 34,
        "filename": "34-service-above-self-award-citation.jpg",
        "title": "Service Above Self Award — Congratulatory Citation",
        "category": "Organisational & Corporate Designs",
        "client": "District Rotaract Organization 2025-26 | RID 3203",
        "year": "2025",
        "designType": "Formal Award Citation Poster",
        "description": "Formal congratulatory poster honoring Rotary's highest global award recognition conferred upon senior leadership.",
        "deliverables": ["Formal Citation Poster", "District Announcement"],
        "toolsUsed": ["Illustrator"],
        "featured": False
    },
    {
        "page": 35,
        "filename": "35-international-womens-day.jpg",
        "title": "International Women's Day Celebration",
        "category": "Festival & Celebration Designs",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Commemorative Observance Poster",
        "description": "Commemorative celebration poster honoring women's leadership, resilience, and global achievements.",
        "deliverables": ["Observance Poster", "Social Greeting Graphic"],
        "toolsUsed": ["Illustrator"],
        "featured": True
    },
    {
        "page": 36,
        "filename": "36-pongal-district-greeting.jpg",
        "title": "Thai Pongal Greetings — New Beginnings",
        "category": "Festival & Celebration Designs",
        "client": "District Rotaract Organization 2025-26 | RID 3203",
        "year": "2026",
        "designType": "District Festival Greeting Poster",
        "description": "Traditional Pongal festival poster wishing joy, abundance, and prosperity across all district rotaract clubs.",
        "deliverables": ["District Festival Creative", "Social Greeting"],
        "toolsUsed": ["Illustrator", "Photoshop"],
        "featured": False
    },
    {
        "page": 37,
        "filename": "37-pulse-inter-club-youth-summit.jpg",
        "title": "PULSE — Inter-Club Youth Summit Announcement",
        "category": "Event & Promotional Posters",
        "client": "Rotaract Clubs of Erode Kalam, Tirupur Nexus & Yadhoom Pollachi",
        "year": "2025",
        "designType": "Collaborative Summit Promotional Poster",
        "description": "Dynamic multi-club summit poster uniting three rotaract clubs under the theme 'Get Ready to Feel the Pulse'.",
        "deliverables": ["Collaborative Event Poster", "Multi-Club Social Asset"],
        "toolsUsed": ["Photoshop", "Illustrator"],
        "featured": True
    },
    {
        "page": 38,
        "filename": "38-free-fire-esports-tournament.jpg",
        "title": "Free Fire Esports Championship Tournament",
        "category": "Event & Promotional Posters",
        "client": "Esports Gaming League",
        "year": "2025",
        "designType": "Esports Tournament Promotional Poster",
        "description": "Gaming tournament registration poster detailing entry fees, prize pools, game rules, and registration contact coordinates.",
        "deliverables": ["Gaming Event Poster", "Registration Creative"],
        "toolsUsed": ["Photoshop"],
        "featured": True
    },
    {
        "page": 39,
        "filename": "39-christmas-cheers-yathun-orphanage.jpg",
        "title": "Christmas Cheers at Yathun Orphanage",
        "category": "Organisational & Corporate Designs",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Charity & Community Service Poster",
        "description": "Community outreach campaign poster for stationery distribution and compassionate festive celebration with 31 orphanage children.",
        "deliverables": ["Charity Drive Poster", "Social Service Broadcast"],
        "toolsUsed": ["Photoshop"],
        "featured": False
    },
    {
        "page": 40,
        "filename": "40-anbin-pervazhi-blanket-distribution.jpg",
        "title": "Anbin Pervazhi — Winter Blanket Distribution",
        "category": "Organisational & Corporate Designs",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Community Welfare Initiative Poster",
        "description": "Winter charity drive poster promoting community warmth and blanket donations for underprivileged families.",
        "deliverables": ["Welfare Drive Poster", "Supporters Acknowledgment"],
        "toolsUsed": ["Illustrator"],
        "featured": False
    },
    {
        "page": 41,
        "filename": "41-science-on-wheels-mobile-lab.jpg",
        "title": "Science on Wheels — Mobile Science Lab Project",
        "category": "Organisational & Corporate Designs",
        "client": "District Rotaract Organization 2025-26 | RID 3203",
        "year": "2026",
        "designType": "Global Grants Appeal Poster",
        "description": "Fundraising and sponsorship appeal poster for a mobile science lab delivering hands-on STEM education to rural school students.",
        "deliverables": ["Fundraising Appeal Poster", "Global Grants Brochure Graphic"],
        "toolsUsed": ["Illustrator", "Photoshop"],
        "featured": True
    },
    {
        "page": 42,
        "filename": "42-september-monthly-action-calendar.jpg",
        "title": "September Monthly Action Calendar & Planner",
        "category": "Calendars & Event Collages",
        "client": "District Rotaract Organization 2025-26 | RID 3203",
        "year": "2025",
        "designType": "Monthly District Action Calendar",
        "description": "Editorial calendar and project schedule layout featuring monthly motivation, meeting deadlines, and district initiatives.",
        "deliverables": ["Printable Monthly Calendar", "Digital Event Schedule"],
        "toolsUsed": ["InDesign", "Illustrator"],
        "featured": True
    },
    {
        "page": 43,
        "filename": "43-skct-byte-o-sphere-symposium.jpg",
        "title": "SKCT Byte-O-Sphere — National Level Technical Symposium",
        "category": "College & Technical Event Designs",
        "client": "Sri Krishna College of Technology (SKCT)",
        "year": "2025",
        "designType": "College Technical Symposium Poster",
        "description": "Official Department of CSE technical festival poster featuring CodeAura vibe coding, PPT presentation, MindMesh quiz, and faculty coordinators.",
        "deliverables": ["College Symposium Poster", "Event Registration Circular"],
        "toolsUsed": ["Photoshop", "Illustrator"],
        "featured": True
    },
    {
        "page": 44,
        "filename": "44-skct-byte-o-sphere-competitions.jpg",
        "title": "SKCT Byte-O-Sphere — CSE Competitions & Cash Prizes",
        "category": "College & Technical Event Designs",
        "client": "Sri Krishna College of Technology (SKCT)",
        "year": "2025",
        "designType": "Technical Event Brochure Poster",
        "description": "Promotional collateral highlighting competition guidelines, team parameters, E-Certificates, and cash prizes for engineering students.",
        "deliverables": ["Department Event Poster", "Campus Notice Board Creative"],
        "toolsUsed": ["Photoshop", "Illustrator"],
        "featured": True
    },
    {
        "page": 45,
        "filename": "45-dudes-footwear-collection-showcase.jpg",
        "title": "Dude's Footwear — Signature Collection Showcase",
        "category": "Commercial Advertisements",
        "client": "Dude's Footwear",
        "year": "2025",
        "designType": "Brand Product Advertisement",
        "description": "Clean studio product placement advertisement highlighting modern footwear styling and retail brand presence.",
        "deliverables": ["Product Showcase Ad", "Retail Banner"],
        "toolsUsed": ["Photoshop"],
        "featured": False
    },
    {
        "page": 46,
        "filename": "46-wwf-save-mountain-gorillas.jpg",
        "title": "WWF Wildlife Conservation — Save Mountain Gorillas",
        "category": "Awareness & Social Campaigns",
        "client": "Rotaract & Wildlife Conservation Awareness",
        "year": "2025",
        "designType": "Environmental Awareness Poster",
        "description": "High-impact wildlife conservation campaign poster spotlighting critically endangered mountain gorillas and natural habitat preservation.",
        "deliverables": ["Environmental Campaign Poster", "Social Advocacy Creative"],
        "toolsUsed": ["Photoshop", "Illustrator"],
        "featured": True
    },
    {
        "page": 47,
        "filename": "47-happy-holi-colors-of-joy.jpg",
        "title": "Happy Holi — Colors of Joy & Prosperity",
        "category": "Festival & Celebration Designs",
        "client": "District Rotaract Organization 2025-26 | RID 3203",
        "year": "2025",
        "designType": "Cultural Festival Greeting Poster",
        "description": "Vibrant Holi festival greeting poster celebrating unity, energy, and happiness with dynamic powder color splash aesthetics.",
        "deliverables": ["Festival Greeting Poster", "District Social Graphic"],
        "toolsUsed": ["Photoshop"],
        "featured": True
    },
    {
        "page": 48,
        "filename": "48-star-rotaractor-award-citation.jpg",
        "title": "Star Rotaractor of the Week — Member Recognition",
        "category": "Organisational & Corporate Designs",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Official Recognition Citation Poster",
        "description": "Prestigious club recognition poster honoring outstanding youth performance and participation in club initiatives.",
        "deliverables": ["Award Citation Poster", "Social Recognition Card"],
        "toolsUsed": ["Illustrator"],
        "featured": False
    },
    {
        "page": 49,
        "filename": "49-art-of-public-speaking-influencing.jpg",
        "title": "The Art of Public Speaking and Influencing People",
        "category": "Event & Promotional Posters",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Virtual Workshop & Seminar Poster",
        "description": "Professional speaker webinar poster for a communication and leadership masterclass conducted via Google Meet.",
        "deliverables": ["Webinar Announcement Poster", "Speaker Spotlight Graphic"],
        "toolsUsed": ["Illustrator", "Photoshop"],
        "featured": True
    },
    {
        "page": 50,
        "filename": "50-childrens-day-commemoration.jpg",
        "title": "Children's Day — Celebrating Boundless Energy",
        "category": "Festival & Celebration Designs",
        "client": "Rotaract Club of Erode Kalam",
        "year": "2025",
        "designType": "Observance Greeting Poster",
        "description": "Heartwarming Children's Day celebration graphic highlighting innocent smiles and community support.",
        "deliverables": ["Commemorative Poster", "Social Greeting"],
        "toolsUsed": ["Illustrator"],
        "featured": False
    },
    {
        "page": 51,
        "filename": "51-77th-republic-day-district.jpg",
        "title": "77th Indian Republic Day — District Commemoration",
        "category": "Festival & Celebration Designs",
        "client": "District Rotaract Organization 2025-26 | RID 3203",
        "year": "2026",
        "designType": "National Observance Poster",
        "description": "Official district commemoration poster honoring the 77th Indian Republic Day with patriotic styling and leadership citations.",
        "deliverables": ["District Commemoration Poster", "National Day Graphic"],
        "toolsUsed": ["Illustrator", "Photoshop"],
        "featured": True
    },
    {
        "page": 52,
        "filename": "52-dudes-footwear-steal-deal-599.jpg",
        "title": "Dude's Footwear — Deal Steal at ₹599",
        "category": "Commercial Advertisements",
        "client": "Dude's Footwear",
        "year": "2025",
        "designType": "E-Commerce Promotional Creative",
        "description": "High-conversion commercial advertisement featuring sneaker photography, discount tag badge, and online purchase channels.",
        "deliverables": ["Instagram Story Ad", "E-Commerce Banner"],
        "toolsUsed": ["Photoshop"],
        "featured": True
    },
    {
        "page": 53,
        "filename": "53-winter-solstice-reflection.jpg",
        "title": "Winter Solstice — Peace, Warmth & Reflection",
        "category": "Festival & Celebration Designs",
        "client": "District Rotaract Organization 2025-26 | RID 3203",
        "year": "2025",
        "designType": "Seasonal Observance Poster",
        "description": "Serene winter solstice seasonal graphic conveying warmth, peace, and moments of annual reflection.",
        "deliverables": ["Seasonal Observance Poster", "District Broadcast Card"],
        "toolsUsed": ["Photoshop"],
        "featured": False
    },
    {
        "page": 54,
        "filename": "54-dudes-footwear-woodland-sandals.jpg",
        "title": "Dude's Footwear — Woodland Sandals Promotion",
        "category": "Commercial Advertisements",
        "client": "Dude's Footwear",
        "year": "2025",
        "designType": "Product Advertisement Graphic",
        "description": "Commercial product creative for durable outdoor sandals with bold typography and direct WhatsApp customer ordering.",
        "deliverables": ["Product Promo Creative", "Retail Ad Graphic"],
        "toolsUsed": ["Photoshop"],
        "featured": False
    },
    {
        "page": 55,
        "filename": "55-world-rotaract-week-celebration.jpg",
        "title": "World Rotaract Week — Global Celebration",
        "category": "Organisational & Corporate Designs",
        "client": "District Rotaract Organization | RID 3203",
        "year": "2025",
        "designType": "International Movement Celebration Poster",
        "description": "Official commemorative poster celebrating World Rotaract Week (March 10–16), highlighting global youth fellowship and community impact.",
        "deliverables": ["International Movement Poster", "Social Campaign Graphic"],
        "toolsUsed": ["Illustrator", "Photoshop"],
        "featured": True
    }
]

print(f"Total projects defined: {len(PROJECTS_META)}")

# Process images: Copy and optimize
for p in PROJECTS_META:
    page_num = p["page"]
    src_filename = f"PREVIOUS DESIGNS_page-{page_num:04d}.jpg"
    src_path = os.path.join(SRC_DIR, src_filename)
    dest_path = os.path.join(DEST_DIR, p["filename"])
    
    if not os.path.exists(src_path):
        print(f"ERROR: Missing {src_path}")
        continue
    
    # Open image with Pillow, optimize, save
    with Image.open(src_path) as img:
        # Convert to RGB if needed
        if img.mode != "RGB":
            img = img.convert("RGB")
        
        # Max dimension 1800px to maintain exceptional clarity while optimizing byte size
        w, h = img.size
        max_dim = 1800
        if w > max_dim or h > max_dim:
            if w > h:
                new_w = max_dim
                new_h = int(h * (max_dim / w))
            else:
                new_h = max_dim
                new_w = int(w * (max_dim / h))
            img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Save optimized JPEG
        img.save(dest_path, "JPEG", quality=86, progressive=True, optimize=True)
        size_kb = os.path.getsize(dest_path) / 1024
        print(f"Page {page_num:02d} -> {p['filename']} ({img.width}x{img.height}, {size_kb:.1f} KB)")

# Save as JSON for reference
with open(r"E:\OneDrive\Desktop\JAIXO STUDIO\src\data\projectsData.json", "w", encoding="utf-8") as f:
    json.dump(PROJECTS_META, f, indent=2)

print("\nAll 55 images processed and saved to public/portfolio!")
