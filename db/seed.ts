import db from ".";
import { events, type EventInsert } from "./schema/public";

const seedEvents = async () => {
  console.log("seeding...");
  const eventData: EventInsert[] = [
    {
      title:
        "Gelisah Ketika Rezeki Tertunda, Saat Jodoh Sedang di Uji (Sesi 1)",
      posterUrl: "/images/event-1.jpeg",
      description:
        "Gelisah Ketika Rezeki Tertunda, Saat Jodoh Sedang di Uji (Sesi 1)",
      venue: "Grand Ballroom JW Marriott Hotel Medan",
      city: "Medan",
      startTime: "2025-05-31T08:00:00",
      endTime: "2025-05-31T10:00:00",
      ticketStock: {
        reguler: 1800,
        vip: 200,
      },
      price: {
        reguler: 50000,
        vip: 100000,
      },
      gmapUrl: "https://www.google.com",
      faqs: [
        {
          question: "Apakah ada biaya tambahan?",
          answer: "Tidak ada biaya tambahan",
        },
      ],
    },

    {
      title:
        "Gelisah Ketika Rezeki Tertunda, Saat Jodoh Sedang di Uji (Sesi 2)",
      posterUrl: "/images/event-2.jpeg",
      description:
        "Gelisah Ketika Rezeki Tertunda, Saat Jodoh Sedang di Uji (Sesi 2)",
      venue: "Grand Ballroom JW Marriott Hotel Medan",
      city: "Medan",
      startTime: "2025-05-31T13:00:00",
      endTime: "2025-05-31T16:00:00",
      ticketStock: {
        reguler: 1800,
        vip: 200,
      },
      price: {
        reguler: 50000,
        vip: 100000,
      },
      gmapUrl: "https://www.google.com",
      faqs: [
        {
          question: "Apakah ada biaya tambahan?",
          answer: "Tidak ada biaya tambahan",
        },
      ],
    },
  ];

  await db.insert(events).values(eventData);
  console.log("seeding completed.");
};

await seedEvents();
