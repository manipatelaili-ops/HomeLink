export const initialProperties = [
  {
    id: 1,
    title: "Sunlit 2BHK Near Tech Park & Metro Station",
    description: "Spacious, well-ventilated 2BHK apartment directly from owner. Zero broker fees. Features modular Italian kitchen, high-speed fiber internet ready, 24/7 power backup, and quiet gated community. Ideal for IT professionals and college faculty.",
    propertyType: "APARTMENT",
    furnishing: "FURNISHED",
    address: "402, Green Glen Heights, Bellandur Outer Ring Rd",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560103",
    rentPrice: 32000,
    depositAmount: 64000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 1150,
    isAvailable: true,
    isFavorite: false,
    owner: {
      id: 1,
      name: "Rajesh Sharma (Direct Owner)",
      email: "owner@homelink.com",
      role: "ROLE_OWNER",
      phone: "+91 98765 43210",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["High-Speed WiFi", "24/7 Power Backup", "Gated Security", "Covered Car Parking", "Modular Kitchen", "Gym Access", "Balcony"],
    createdAt: "2026-10-01T10:00:00"
  },
  {
    id: 2,
    title: "Modern 1BHK Studio Apartment with Sea Breeze",
    description: "Fully furnished stylish 1BHK studio located in peaceful residential lane. Within walking distance to cafes and suburban railway. Directly listed by owner without brokerage hassle.",
    propertyType: "STUDIO",
    furnishing: "FURNISHED",
    address: "Flat 3B, Palm View Enclave, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    rentPrice: 42000,
    depositAmount: 84000,
    bedrooms: 1,
    bathrooms: 1,
    areaSqFt: 650,
    isAvailable: true,
    isFavorite: true,
    owner: {
      id: 2,
      name: "Priya Deshmukh (Direct Owner)",
      email: "priya.owner@homelink.com",
      role: "ROLE_OWNER",
      phone: "+91 91234 56789",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
    },
    images: [
      "https://images.unsplash.com/photo-1502005229762-ae1b464002b4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Air Conditioning", "High-Speed WiFi", "Modular Kitchen", "Elevator", "24/7 Security", "Washing Machine"],
    createdAt: "2026-10-03T11:30:00"
  },
  {
    id: 3,
    title: "Premium 3BHK Independent Villa with Private Lawn",
    description: "Serene 3-bedroom independent duplex villa surrounded by greenery. Zero broker involved — deal directly with the owner. Ample parking for 2 cars, solar water heating, and pet friendly.",
    propertyType: "VILLA",
    furnishing: "SEMI_FURNISHED",
    address: "Villa 18, Whispering Palms, Baner Pashan Link Rd",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411045",
    rentPrice: 45000,
    depositAmount: 90000,
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 2200,
    isAvailable: true,
    isFavorite: false,
    owner: {
      id: 1,
      name: "Rajesh Sharma (Direct Owner)",
      email: "owner@homelink.com",
      role: "ROLE_OWNER",
      phone: "+91 98765 43210",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Private Garden", "Covered Car Parking", "Pet Friendly", "Solar Water Heater", "Gated Security", "Power Backup"],
    createdAt: "2026-10-04T15:20:00"
  },
  {
    id: 4,
    title: "Cozy Single Sharing Room in Premium Student Co-Living",
    description: "Hassle-free student & professional accommodation. Includes housekeeping, daily breakfast, 300 Mbps WiFi, and dedicated work desk. No middleman, no brokerage, straightforward owner contract.",
    propertyType: "PG_CO_LIVING",
    furnishing: "FURNISHED",
    address: "Plot 88, Cyber City Road, Madhapur",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    rentPrice: 14500,
    depositAmount: 20000,
    bedrooms: 1,
    bathrooms: 1,
    areaSqFt: 320,
    isAvailable: true,
    isFavorite: false,
    owner: {
      id: 2,
      name: "Priya Deshmukh (Direct Owner)",
      email: "priya.owner@homelink.com",
      role: "ROLE_OWNER",
      phone: "+91 91234 56789",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
    },
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["High-Speed WiFi", "Air Conditioning", "Housekeeping", "Study Desk", "CCTV Security", "Water Purifier"],
    createdAt: "2026-10-05T09:10:00"
  },
  {
    id: 5,
    title: "Elegant 2BHK High-Rise with Panoramic City View",
    description: "Stunning high-floor apartment overlooking golf course green spaces. Zero brokerage direct listing. Modern clubhouse, swimming pool, badminton court, and supermarket within complex.",
    propertyType: "APARTMENT",
    furnishing: "SEMI_FURNISHED",
    address: "Tower 7, Floor 14, Golf Course Extension Rd",
    city: "Delhi NCR",
    state: "Haryana",
    pincode: "122018",
    rentPrice: 36000,
    depositAmount: 72000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 1350,
    isAvailable: true,
    isFavorite: false,
    owner: {
      id: 1,
      name: "Rajesh Sharma (Direct Owner)",
      email: "owner@homelink.com",
      role: "ROLE_OWNER",
      phone: "+91 98765 43210",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Swimming Pool", "Clubhouse", "Gym Access", "24/7 Security", "Covered Car Parking", "Elevator", "Power Backup"],
    createdAt: "2026-10-06T14:40:00"
  }
];

export const initialInquiries = [
  {
    id: 101,
    propertyId: 1,
    propertyTitle: "Sunlit 2BHK Near Tech Park & Metro Station",
    propertyAddress: "402, Green Glen Heights, Bellandur Outer Ring Rd",
    propertyCity: "Bangalore",
    rentPrice: 32000,
    propertyImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    tenant: {
      id: 3,
      name: "Aarav Mehta (Tenant)",
      email: "tenant@homelink.com",
      phone: "+91 98888 77777"
    },
    owner: {
      id: 1,
      name: "Rajesh Sharma (Direct Owner)",
      email: "owner@homelink.com",
      phone: "+91 98765 43210"
    },
    message: "Hi Rajesh, I am an IT engineer working near Bellandur. I saw your listing on HomeLink and love the apartment. Could we schedule a walkthrough this coming Saturday?",
    phone: "+91 98888 77777",
    preferredVisitDate: "2026-10-12",
    status: "PENDING",
    createdAt: "2026-10-07T12:00:00"
  }
];
