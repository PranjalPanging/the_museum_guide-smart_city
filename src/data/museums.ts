import { Museum } from "@/types/museum";

export const museums: Museum[] = [
  {
    id: "national-museum-delhi",
    name: "National Museum",
    city: "New Delhi",
    state: "Delhi",
    description: "India's largest museum housing an extensive collection of artifacts spanning 5,000 years of Indian cultural heritage.",
    longDescription: "The National Museum in New Delhi is one of the largest museums in India. Established in 1949, it holds a variety of articles ranging from pre-historic era to modern works of art. The museum has a collection of approximately 2,00,000 works of both Indian and foreign origin. The museum is under the Ministry of Culture, Government of India.",
    imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800",
    openingHours: "10:00 AM - 6:00 PM",
    closedOn: "Monday",
    ticketPrice: { indian: 20, foreigner: 650, student: 10 },
    address: "Janpath, New Delhi, Delhi 110011",
    phone: "+91-11-23019272",
    website: "https://nationalmuseumindia.gov.in",
    category: "Art & History",
    rating: 4.5,
    topExhibits: [
      { id: "nm-1", name: "Dancing Girl of Mohenjo-daro", description: "A bronze statuette from the Indus Valley Civilization, dating back to 2500 BCE. This 10.5 cm figure represents one of the earliest known bronze sculptures.", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400", period: "2500 BCE", origin: "Mohenjo-daro" },
      { id: "nm-2", name: "Nataraja Bronze", description: "An exquisite Chola bronze depicting Lord Shiva as the cosmic dancer, representing the cycle of creation and destruction.", imageUrl: "https://images.unsplash.com/photo-1609609830354-8f615e0d4a06?w=400", period: "11th Century", origin: "Tamil Nadu" },
      { id: "nm-3", name: "Gandhara Buddha", description: "A magnificent stone sculpture showing Greco-Buddhist artistic influence from the ancient Gandhara region.", imageUrl: "https://images.unsplash.com/photo-1609609829875-96a71cf6d6c1?w=400", period: "2nd Century CE", origin: "Gandhara" },
      { id: "nm-4", name: "Miniature Paintings Collection", description: "An extensive collection of Mughal, Rajput, and Pahari miniature paintings showcasing Indian artistic traditions.", imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400", period: "16th-19th Century", origin: "Various" },
      { id: "nm-5", name: "Harappan Artifacts", description: "A comprehensive collection of seals, pottery, and ornaments from the Indus Valley Civilization.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "3300-1300 BCE", origin: "Harappa" }
    ]
  },
  {
    id: "indian-museum-kolkata",
    name: "Indian Museum",
    city: "Kolkata",
    state: "West Bengal",
    description: "The oldest and largest museum in India, featuring rare collections of antiques, armor, ornaments, fossils, and more.",
    longDescription: "Founded in 1814, the Indian Museum is the oldest and largest museum in the Indian subcontinent. It has rare collections of antiques, armor and ornaments, fossils, skeletons, mummies, and Mughal paintings. The museum is known as the 'Mother of all museums' in the Indian subcontinent.",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
    openingHours: "10:00 AM - 5:00 PM",
    closedOn: "Monday",
    ticketPrice: { indian: 75, foreigner: 500, student: 20 },
    address: "27, Jawaharlal Nehru Road, Kolkata 700016",
    phone: "+91-33-22861699",
    website: "https://indianmuseumkolkata.org",
    category: "Natural History & Art",
    rating: 4.6,
    topExhibits: [
      { id: "im-1", name: "Egyptian Mummy", description: "A well-preserved 4,000-year-old Egyptian mummy, one of the museum's most popular attractions.", imageUrl: "https://images.unsplash.com/photo-1553708881-112abc53fe54?w=400", period: "2000 BCE", origin: "Egypt" },
      { id: "im-2", name: "Bharhut Stupa Railings", description: "Exquisitely carved stone railings from the 2nd century BCE Buddhist stupa at Bharhut.", imageUrl: "https://images.unsplash.com/photo-1609609830354-8f615e0d4a06?w=400", period: "2nd Century BCE", origin: "Bharhut" },
      { id: "im-3", name: "Ashoka Pillar Capital", description: "The famous lion capital from Ashoka's pillars, symbolizing the spread of Buddhism.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "3rd Century BCE", origin: "Various" },
      { id: "im-4", name: "Meteorite Collection", description: "One of the world's finest collections of meteorites, including rare lunar and Martian specimens.", imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400", period: "Various", origin: "Space" },
      { id: "im-5", name: "Bird Gallery", description: "An extensive collection of over 2,000 preserved bird specimens from across the Indian subcontinent.", imageUrl: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400", period: "Various", origin: "India" }
    ]
  },
  {
    id: "chhatrapati-shivaji-maharaj-museum",
    name: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya",
    city: "Mumbai",
    state: "Maharashtra",
    description: "A premier art and history museum with outstanding collections of ancient Indian art, artifacts, and decorative arts.",
    longDescription: "Formerly known as the Prince of Wales Museum, this museum was founded in the early 20th century and is one of the premier art and history museums in India. The museum houses approximately 50,000 exhibits of ancient Indian history as well as objects from foreign lands.",
    imageUrl: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800",
    openingHours: "10:15 AM - 6:00 PM",
    closedOn: "Monday",
    ticketPrice: { indian: 85, foreigner: 650, student: 40 },
    address: "159-161, M.G. Road, Fort, Mumbai 400023",
    phone: "+91-22-22844484",
    website: "https://csmvs.in",
    category: "Art & Archaeology",
    rating: 4.7,
    topExhibits: [
      { id: "csmvs-1", name: "Gandhara Sculptures", description: "An impressive collection of Greco-Buddhist sculptures from the ancient Gandhara region.", imageUrl: "https://images.unsplash.com/photo-1609609829875-96a71cf6d6c1?w=400", period: "1st-5th Century CE", origin: "Gandhara" },
      { id: "csmvs-2", name: "Miniature Paintings", description: "Exquisite collection of Indian miniature paintings from various schools.", imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400", period: "15th-19th Century", origin: "India" },
      { id: "csmvs-3", name: "Arms and Armour Gallery", description: "A stunning collection of weapons and armor from the Mughal and Maratha periods.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "16th-19th Century", origin: "India" },
      { id: "csmvs-4", name: "Tanjore Paintings", description: "Beautiful gold leaf paintings from the Thanjavur tradition of South India.", imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400", period: "18th-19th Century", origin: "Tamil Nadu" },
      { id: "csmvs-5", name: "Chinese and Japanese Art", description: "A rare collection of porcelain, jade, and bronzes from East Asia.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Various", origin: "China & Japan" }
    ]
  },
  {
    id: "salar-jung-museum",
    name: "Salar Jung Museum",
    city: "Hyderabad",
    state: "Telangana",
    description: "One of the three national museums of India, housing the largest one-man collection of antiques in the world.",
    longDescription: "The Salar Jung Museum is an art museum located at Dar-ul-Shifa, on the southern bank of the Musi River. It is one of the three National Museums of India. The collection of the museum was largely gathered by Salar Jung III, representing the entire world of antiques.",
    imageUrl: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800",
    openingHours: "10:00 AM - 5:00 PM",
    closedOn: "Friday",
    ticketPrice: { indian: 20, foreigner: 500, student: 10 },
    address: "Salar Jung Road, Darulshifa, Hyderabad 500002",
    phone: "+91-40-24576443",
    website: "https://salarjungmuseum.in",
    category: "Art & Antiques",
    rating: 4.5,
    topExhibits: [
      { id: "sj-1", name: "Veiled Rebecca", description: "An Italian marble sculpture by Giovanni Benzoni depicting Rebecca with a translucent marble veil.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "19th Century", origin: "Italy" },
      { id: "sj-2", name: "Musical Clock", description: "A 19th-century English musical clock featuring automated figures that perform every hour.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "19th Century", origin: "England" },
      { id: "sj-3", name: "Jade Collection", description: "An exquisite collection of Mughal jade artifacts including daggers and cups.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "16th-18th Century", origin: "India" },
      { id: "sj-4", name: "Quran Collection", description: "Rare and beautifully illuminated manuscripts of the Holy Quran.", imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400", period: "Various", origin: "Middle East" },
      { id: "sj-5", name: "European Paintings", description: "A fine collection of European oil paintings from the Renaissance period.", imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400", period: "15th-18th Century", origin: "Europe" }
    ]
  },
  {
    id: "government-museum-chennai",
    name: "Government Museum",
    city: "Chennai",
    state: "Tamil Nadu",
    description: "The second oldest museum in India with a rich collection of archaeological and numismatic artifacts.",
    longDescription: "Also known as the Madras Museum, it is the second oldest museum in India and was established in 1851. The museum complex houses the largest collection of Roman antiquities outside Europe and has excellent bronze, stone, and Buddhist sculptures.",
    imageUrl: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800",
    openingHours: "9:30 AM - 5:00 PM",
    closedOn: "Friday",
    ticketPrice: { indian: 15, foreigner: 250, student: 10 },
    address: "Pantheon Road, Egmore, Chennai 600008",
    phone: "+91-44-28193238",
    website: "https://chennaimuseum.org",
    category: "Archaeology & Bronze",
    rating: 4.4,
    topExhibits: [
      { id: "gmc-1", name: "Chola Bronzes", description: "World-famous collection of Chola dynasty bronze sculptures representing the pinnacle of Indian metalwork.", imageUrl: "https://images.unsplash.com/photo-1609609830354-8f615e0d4a06?w=400", period: "9th-13th Century", origin: "Tamil Nadu" },
      { id: "gmc-2", name: "Amaravati Sculptures", description: "Exquisite Buddhist sculptures from the ancient Amaravati stupa.", imageUrl: "https://images.unsplash.com/photo-1609609829875-96a71cf6d6c1?w=400", period: "2nd Century CE", origin: "Andhra Pradesh" },
      { id: "gmc-3", name: "Roman Antiquities", description: "The largest collection of Roman artifacts outside Europe, evidence of ancient trade.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "1st-3rd Century CE", origin: "Rome" },
      { id: "gmc-4", name: "Pallava Sculptures", description: "Stone sculptures from the Pallava dynasty showing exceptional artistic skill.", imageUrl: "https://images.unsplash.com/photo-1609609829875-96a71cf6d6c1?w=400", period: "7th-9th Century", origin: "Tamil Nadu" },
      { id: "gmc-5", name: "Numismatic Gallery", description: "An extensive collection of ancient and medieval Indian coins.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Various", origin: "India" }
    ]
  },
  {
    id: "albert-hall-museum",
    name: "Albert Hall Museum",
    city: "Jaipur",
    state: "Rajasthan",
    description: "The oldest museum of Rajasthan, showcasing rich artifacts, paintings, and sculptures in a stunning Indo-Saracenic building.",
    longDescription: "The Albert Hall Museum is the oldest museum of the state and functions as the state museum of Rajasthan. The museum displays artifacts like paintings, carpets, ivory, stone, metal sculptures, and crystal works. The building itself is a masterpiece of Indo-Saracenic architecture.",
    imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
    openingHours: "9:00 AM - 5:00 PM",
    closedOn: "Open all days",
    ticketPrice: { indian: 40, foreigner: 300, student: 20 },
    address: "Ram Niwas Garden, Jaipur 302004",
    phone: "+91-141-2570099",
    website: "https://alberthalljaipur.gov.in",
    category: "Art & Culture",
    rating: 4.3,
    topExhibits: [
      { id: "ah-1", name: "Egyptian Mummy", description: "A 2,000-year-old Egyptian mummy, one of the most popular exhibits.", imageUrl: "https://images.unsplash.com/photo-1553708881-112abc53fe54?w=400", period: "1st Century BCE", origin: "Egypt" },
      { id: "ah-2", name: "Miniature Paintings", description: "Exquisite collection of Rajasthani and Mughal miniature paintings.", imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400", period: "17th-19th Century", origin: "Rajasthan" },
      { id: "ah-3", name: "Persian Carpet", description: "A magnificent Persian garden carpet from the 17th century.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "17th Century", origin: "Persia" },
      { id: "ah-4", name: "Arms Gallery", description: "Collection of historical weapons including swords and daggers.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "16th-19th Century", origin: "Rajasthan" },
      { id: "ah-5", name: "Musical Instruments", description: "Traditional Rajasthani musical instruments and folk art.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "18th-20th Century", origin: "Rajasthan" }
    ]
  },
  {
    id: "napier-museum",
    name: "Napier Museum",
    city: "Thiruvananthapuram",
    state: "Kerala",
    description: "A 19th-century natural history and art museum with unique Indo-Saracenic architecture and rare artifacts.",
    longDescription: "The Napier Museum is an art and natural history museum with a unique architectural style that is a blend of Indian, Chinese, and European influences. The museum houses a rare collection of archaeological and historic artifacts, bronze idols, ancient ornaments, and ivory carvings.",
    imageUrl: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800",
    openingHours: "10:00 AM - 5:00 PM",
    closedOn: "Monday",
    ticketPrice: { indian: 20, foreigner: 200, student: 10 },
    address: "Museum Junction, Thiruvananthapuram 695033",
    phone: "+91-471-2318294",
    category: "Natural History & Art",
    rating: 4.2,
    topExhibits: [
      { id: "nm-1", name: "Chola Bronzes", description: "Beautiful bronze sculptures from the Chola period.", imageUrl: "https://images.unsplash.com/photo-1609609830354-8f615e0d4a06?w=400", period: "10th-12th Century", origin: "Tamil Nadu" },
      { id: "nm-2", name: "Temple Car", description: "An ornate wooden temple car used in religious processions.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "18th Century", origin: "Kerala" },
      { id: "nm-3", name: "Japanese Shadow Puppets", description: "Rare collection of Japanese Bunraku puppets.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "19th Century", origin: "Japan" },
      { id: "nm-4", name: "Kathakali Costumes", description: "Traditional costumes and masks used in Kathakali performances.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Various", origin: "Kerala" },
      { id: "nm-5", name: "Ivory Carvings", description: "Intricate ivory carvings depicting religious themes.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "17th-19th Century", origin: "Kerala" }
    ]
  },
  {
    id: "calico-museum-textiles",
    name: "Calico Museum of Textiles",
    city: "Ahmedabad",
    state: "Gujarat",
    description: "One of the world's finest textile museums showcasing India's rich textile heritage and craftsmanship.",
    longDescription: "The Calico Museum of Textiles is one of the most significant textile museums in the world. It houses a stunning collection of textiles and artifacts representing 500 years of Indian textile tradition. The museum showcases rare techniques like zari work, block printing, and embroidery.",
    imageUrl: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800",
    openingHours: "10:30 AM - 12:30 PM & 2:45 PM - 4:30 PM",
    closedOn: "Wednesday & Public Holidays",
    ticketPrice: { indian: 0, foreigner: 0, student: 0 },
    address: "The Retreat, Shahibag, Ahmedabad 380004",
    phone: "+91-79-22868172",
    website: "https://calicomuseum.org",
    category: "Textiles & Crafts",
    rating: 4.8,
    topExhibits: [
      { id: "cm-1", name: "Mughal Court Textiles", description: "Royal textiles from the Mughal courts with intricate gold work.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "16th-18th Century", origin: "Mughal India" },
      { id: "cm-2", name: "Kashmiri Shawls", description: "Exquisite pashmina shawls with detailed embroidery.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "18th-19th Century", origin: "Kashmir" },
      { id: "cm-3", name: "Patola Saris", description: "Double ikat Patola saris from Gujarat's weaving tradition.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Various", origin: "Gujarat" },
      { id: "cm-4", name: "Temple Hangings", description: "Sacred textile hangings used in religious ceremonies.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "17th-19th Century", origin: "Gujarat" },
      { id: "cm-5", name: "Block Printing Tools", description: "Traditional wooden blocks used for fabric printing.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Various", origin: "Gujarat" }
    ]
  },
  {
    id: "city-palace-museum-udaipur",
    name: "City Palace Museum",
    city: "Udaipur",
    state: "Rajasthan",
    description: "A stunning palace complex housing royal artifacts, paintings, and offering breathtaking views of Lake Pichola.",
    longDescription: "The City Palace of Udaipur is a majestic architectural marvel on the east bank of Lake Pichola. The palace complex houses several museums displaying royal artifacts, including the Crystal Gallery, which contains an extensive collection of crystal items ordered from England in the 19th century.",
    imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
    openingHours: "9:30 AM - 5:30 PM",
    closedOn: "Open all days",
    ticketPrice: { indian: 300, foreigner: 300, student: 150 },
    address: "City Palace Complex, Udaipur 313001",
    phone: "+91-294-2419021",
    website: "https://eternalmewarcitypalace.com",
    category: "Royal Heritage",
    rating: 4.6,
    topExhibits: [
      { id: "cpu-1", name: "Crystal Gallery", description: "World's largest private collection of crystal including furniture and chandeliers.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "19th Century", origin: "England" },
      { id: "cpu-2", name: "Royal Weapons", description: "Collection of swords, daggers, and armor used by Mewar rulers.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "16th-19th Century", origin: "Mewar" },
      { id: "cpu-3", name: "Mewar Paintings", description: "Finest examples of Mewar school of miniature painting.", imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400", period: "17th-19th Century", origin: "Udaipur" },
      { id: "cpu-4", name: "Royal Costumes", description: "Ceremonial garments of the Mewar royal family.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "18th-20th Century", origin: "Mewar" },
      { id: "cpu-5", name: "Silver Collection", description: "Exquisite silverware used by the royal household.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Various", origin: "Mewar" }
    ]
  },
  {
    id: "victoria-memorial",
    name: "Victoria Memorial",
    city: "Kolkata",
    state: "West Bengal",
    description: "A grand marble building dedicated to Queen Victoria, housing a museum with British Indian history exhibits.",
    longDescription: "The Victoria Memorial is a large marble building in Kolkata, built between 1906 and 1921. It is now a museum and tourist destination under the Ministry of Culture. The memorial hall contains a vast collection of memorabilia related to Queen Victoria and the British Indian period.",
    imageUrl: "https://images.unsplash.com/photo-1558431382-27e303142255?w=800",
    openingHours: "10:00 AM - 5:00 PM",
    closedOn: "Monday",
    ticketPrice: { indian: 30, foreigner: 500, student: 10 },
    address: "1, Queen's Way, Kolkata 700071",
    phone: "+91-33-22235142",
    website: "https://victoriamemorial-cal.org",
    category: "History & Heritage",
    rating: 4.5,
    topExhibits: [
      { id: "vm-1", name: "Royal Gallery", description: "Paintings and memorabilia of British monarchs and Indian rulers.", imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400", period: "18th-20th Century", origin: "Britain/India" },
      { id: "vm-2", name: "Calcutta Gallery", description: "History of Calcutta from village to metropolis.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "17th-20th Century", origin: "Kolkata" },
      { id: "vm-3", name: "Queen's Hall", description: "Personal items and portraits of Queen Victoria.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "19th Century", origin: "Britain" },
      { id: "vm-4", name: "Arms Gallery", description: "Collection of weapons from the British Indian period.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "18th-20th Century", origin: "India" },
      { id: "vm-5", name: "Oil Paintings", description: "European oil paintings depicting Indian landscapes and life.", imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400", period: "18th-19th Century", origin: "Various" }
    ]
  },
  {
    id: "partition-museum",
    name: "Partition Museum",
    city: "Amritsar",
    state: "Punjab",
    description: "A poignant museum documenting the 1947 partition of British India through personal stories and artifacts.",
    longDescription: "The Partition Museum is the world's first museum dedicated to the victims of the 1947 Partition of British India. Located in the historic Town Hall, it houses a collection of personal belongings, photographs, documents, and oral testimonies of those who witnessed the partition.",
    imageUrl: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800",
    openingHours: "10:00 AM - 6:00 PM",
    closedOn: "Monday",
    ticketPrice: { indian: 10, foreigner: 250, student: 5 },
    address: "Town Hall, Amritsar 143001",
    phone: "+91-183-2540027",
    website: "https://partitionmuseum.org",
    category: "History",
    rating: 4.7,
    topExhibits: [
      { id: "pm-1", name: "Gallery of Hope", description: "Stories of resilience and rebuilding after the partition.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "1947-Present", origin: "India/Pakistan" },
      { id: "pm-2", name: "Letters and Documents", description: "Personal letters, passports, and documents from the partition era.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "1947", origin: "Various" },
      { id: "pm-3", name: "Migration Stories", description: "Oral testimonies and video interviews of survivors.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "1947", origin: "Various" },
      { id: "pm-4", name: "Household Items", description: "Personal belongings carried during the migration.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "1947", origin: "Various" },
      { id: "pm-5", name: "Photographs Gallery", description: "Rare photographs documenting the partition period.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "1947", origin: "Various" }
    ]
  },
  {
    id: "national-rail-museum",
    name: "National Rail Museum",
    city: "New Delhi",
    state: "Delhi",
    description: "A fascinating museum showcasing India's railway heritage with vintage locomotives and royal carriages.",
    longDescription: "The National Rail Museum is a railway museum showcasing over 160 years of Indian railway heritage. It features over 100 exhibits including engines, coaches, and other memorabilia. The museum also has working models and joy rides for visitors.",
    imageUrl: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800",
    openingHours: "10:00 AM - 5:00 PM",
    closedOn: "Monday",
    ticketPrice: { indian: 50, foreigner: 200, student: 20 },
    address: "Chanakyapuri, New Delhi 110021",
    phone: "+91-11-26881816",
    website: "https://nrmindia.com",
    category: "Transport & Technology",
    rating: 4.4,
    topExhibits: [
      { id: "nrm-1", name: "Fairy Queen", description: "The oldest working steam locomotive in the world (1855).", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "1855", origin: "Britain" },
      { id: "nrm-2", name: "Maharaja's Saloon", description: "Luxurious private railway carriage of Indian royalty.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "19th Century", origin: "India" },
      { id: "nrm-3", name: "Toy Train", description: "Working narrow gauge train for visitors to ride.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Various", origin: "India" },
      { id: "nrm-4", name: "Signal Gallery", description: "Collection of historic railway signaling equipment.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Various", origin: "India" },
      { id: "nrm-5", name: "Prince of Wales Saloon", description: "Royal carriage used by the Prince of Wales in 1876.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "1876", origin: "Britain" }
    ]
  },
  {
    id: "crafts-museum-delhi",
    name: "Crafts Museum",
    city: "New Delhi",
    state: "Delhi",
    description: "An extensive collection of traditional Indian handicrafts and folk arts in a village-like setting.",
    longDescription: "The Crafts Museum, also known as the National Handicrafts and Handlooms Museum, is dedicated to traditional Indian handicrafts. The museum complex recreates traditional village environments from different parts of India and houses over 20,000 craft objects.",
    imageUrl: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800",
    openingHours: "10:00 AM - 5:00 PM",
    closedOn: "Monday",
    ticketPrice: { indian: 20, foreigner: 200, student: 10 },
    address: "Pragati Maidan, Bhairon Marg, New Delhi 110001",
    phone: "+91-11-23371641",
    category: "Folk Art & Crafts",
    rating: 4.3,
    topExhibits: [
      { id: "cm-1", name: "Tribal Art Gallery", description: "Art and artifacts from various tribal communities of India.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Various", origin: "India" },
      { id: "cm-2", name: "Textile Gallery", description: "Traditional textiles from different states of India.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Various", origin: "India" },
      { id: "cm-3", name: "Village Complex", description: "Life-size recreations of traditional village houses.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Various", origin: "India" },
      { id: "cm-4", name: "Pottery Collection", description: "Traditional pottery and terracotta works.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Various", origin: "India" },
      { id: "cm-5", name: "Metal Craft", description: "Traditional metal work including brass and bronze items.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Various", origin: "India" }
    ]
  },
  {
    id: "birla-science-museum",
    name: "Birla Science Museum",
    city: "Hyderabad",
    state: "Telangana",
    description: "An interactive science and technology museum with a planetarium and dinosaur exhibits.",
    longDescription: "The Birla Science Museum is part of the B.M. Birla Science Centre and features science exhibits, a planetarium, an archaeology museum, and a dinosaurium. It's designed to make science accessible and engaging for visitors of all ages.",
    imageUrl: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800",
    openingHours: "10:30 AM - 8:00 PM",
    closedOn: "Open all days",
    ticketPrice: { indian: 70, foreigner: 150, student: 40 },
    address: "Adarsh Nagar, Hyderabad 500063",
    phone: "+91-40-23235103",
    website: "https://birlasciencemuseum.org",
    category: "Science & Technology",
    rating: 4.2,
    topExhibits: [
      { id: "bsm-1", name: "Dinosaurium", description: "Life-size dinosaur replicas and fossil exhibits.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Mesozoic Era", origin: "Various" },
      { id: "bsm-2", name: "Space Gallery", description: "Exhibits about space exploration and astronomy.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Modern", origin: "Various" },
      { id: "bsm-3", name: "Human Body Gallery", description: "Interactive exhibits about human anatomy and health.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Modern", origin: "Various" },
      { id: "bsm-4", name: "Physics Gallery", description: "Hands-on experiments demonstrating physics principles.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Modern", origin: "Various" },
      { id: "bsm-5", name: "Planetarium", description: "State-of-the-art planetarium with astronomy shows.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Modern", origin: "Various" }
    ]
  },
  {
    id: "nehru-science-centre",
    name: "Nehru Science Centre",
    city: "Mumbai",
    state: "Maharashtra",
    description: "India's largest interactive science museum with hands-on exhibits and educational programs.",
    longDescription: "The Nehru Science Centre is the largest interactive science centre in the country. It features permanent galleries on various themes of science, a science park, and a planetarium. The centre aims to spread scientific awareness and promote scientific temper among students.",
    imageUrl: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800",
    openingHours: "10:00 AM - 6:00 PM",
    closedOn: "Closed on Holi and Diwali",
    ticketPrice: { indian: 70, foreigner: 200, student: 40 },
    address: "Dr. E. Moses Road, Worli, Mumbai 400018",
    phone: "+91-22-24920482",
    website: "https://nehrusciencecentre.gov.in",
    category: "Science & Technology",
    rating: 4.4,
    topExhibits: [
      { id: "nsc-1", name: "Science on a Sphere", description: "A room-sized global display system showing planetary data.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Modern", origin: "USA" },
      { id: "nsc-2", name: "Sound & Hearing", description: "Interactive exhibits about sound waves and acoustics.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Modern", origin: "Various" },
      { id: "nsc-3", name: "Light & Perception", description: "Exhibits exploring optics and visual perception.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Modern", origin: "Various" },
      { id: "nsc-4", name: "Hall of Evolution", description: "Journey through the evolution of life on Earth.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Various", origin: "Earth" },
      { id: "nsc-5", name: "Energy Gallery", description: "Exhibits about various forms of energy and conservation.", imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400", period: "Modern", origin: "Various" }
    ]
  }
];

export const getMuseumById = (id: string): Museum | undefined => {
  return museums.find(museum => museum.id === id);
};

export const getMuseumsByCategory = (category: string): Museum[] => {
  return museums.filter(museum => museum.category.toLowerCase().includes(category.toLowerCase()));
};

export const getMuseumsByCity = (city: string): Museum[] => {
  return museums.filter(museum => museum.city.toLowerCase() === city.toLowerCase());
};

export const getMuseumsByState = (state: string): Museum[] => {
  return museums.filter(museum => museum.state.toLowerCase() === state.toLowerCase());
};

export const searchMuseums = (query: string): Museum[] => {
  const lowerQuery = query.toLowerCase();
  return museums.filter(museum => 
    museum.name.toLowerCase().includes(lowerQuery) ||
    museum.city.toLowerCase().includes(lowerQuery) ||
    museum.state.toLowerCase().includes(lowerQuery) ||
    museum.category.toLowerCase().includes(lowerQuery) ||
    museum.description.toLowerCase().includes(lowerQuery)
  );
};
