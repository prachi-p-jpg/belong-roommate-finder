const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Listing = require('../models/Listing');

const sampleListings = [
  {
    title: "Cozy Private Room in Indiranagar",
    description: "Looking for a chill roommate for a 2BHK in the heart of Indiranagar. Great for someone who loves peace and quiet.",
    location: "Bengaluru",
    rent: 18000,
    roomType: "Private Room",
    sharing: "Single",
    roommates: 1,
    smoking: "Non-smoker",
    pets: "Allowed",
    guests: "Occasional",
    sleepSchedule: "Early sleeper",
    social: "Quiet",
    cleanliness: "Very tidy",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
  },
  {
    title: "Spacious Shared Room in Koregaon Park",
    description: "Shared room available in a 3BHK flat. Walking distance to cafes and parks.",
    location: "Pune",
    rent: 12000,
    roomType: "Shared Flat",
    sharing: "Double",
    roommates: 2,
    smoking: "Smoker",
    pets: "Not allowed",
    guests: "Frequent",
    sleepSchedule: "Night owl",
    social: "Social",
    cleanliness: "Usually tidy",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
  },
  {
    title: "Beautiful Heritage Home near Hawa Mahal",
    description: "Peaceful environment, looking for someone who appreciates quiet. Old world charm.",
    location: "Jaipur",
    rent: 10000,
    roomType: "Private Room",
    sharing: "Single",
    roommates: 1,
    smoking: "Non-smoker",
    pets: "Not allowed",
    guests: "No guests",
    sleepSchedule: "Early sleeper",
    social: "Quiet",
    cleanliness: "Very tidy",
    image: "https://images.unsplash.com/photo-1502672260266-1c1e5240980c"
  },
  {
    title: "Modern Apartment in Gachibowli",
    description: "Close to IT parks. Perfect for techies looking for a hassle-free stay.",
    location: "Hyderabad",
    rent: 22000,
    roomType: "Private Room",
    sharing: "Single",
    roommates: 1,
    smoking: "Doesn't matter",
    pets: "Allowed",
    guests: "Occasional",
    sleepSchedule: "Flexible",
    social: "Balanced",
    cleanliness: "Usually tidy",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
  },
  {
    title: "Vibrant flat in Hauz Khas",
    description: "Artistic vibe, lots of plants. Looking for like-minded people who enjoy art and music.",
    location: "Delhi",
    rent: 20000,
    roomType: "Shared Flat",
    sharing: "Double",
    roommates: 3,
    smoking: "Smoker",
    pets: "Allowed",
    guests: "Frequent",
    sleepSchedule: "Night owl",
    social: "Social",
    cleanliness: "Relaxed",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858"
  },
  {
    title: "Quiet PG in Sector 44",
    description: "Affordable PG accommodation with food included. Very strict rules about noise.",
    location: "Noida",
    rent: 8000,
    roomType: "PG",
    sharing: "Triple",
    roommates: 5,
    smoking: "Non-smoker",
    pets: "Not allowed",
    guests: "No guests",
    sleepSchedule: "Early sleeper",
    social: "Quiet",
    cleanliness: "Very tidy",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb"
  },
  {
    title: "Luxury Condo in Cyber City",
    description: "High-end apartment sharing with professionals. Amazing skyline view.",
    location: "Gurgaon",
    rent: 35000,
    roomType: "Private Room",
    sharing: "Single",
    roommates: 2,
    smoking: "Non-smoker",
    pets: "Doesn't matter",
    guests: "Occasional",
    sleepSchedule: "Flexible",
    social: "Balanced",
    cleanliness: "Very tidy",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
  },
  {
    title: "Sunny Flat in Koramangala",
    description: "Bright and airy flat, fully furnished. Looking for a clean roommate.",
    location: "Bengaluru",
    rent: 15000,
    roomType: "Shared Flat",
    sharing: "Double",
    roommates: 2,
    smoking: "Doesn't matter",
    pets: "Allowed",
    guests: "Occasional",
    sleepSchedule: "Flexible",
    social: "Balanced",
    cleanliness: "Usually tidy",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af"
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected for Seeding");
    await Listing.deleteMany();
    await Listing.insertMany(sampleListings);
    console.log("Data seeded successfully!");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
