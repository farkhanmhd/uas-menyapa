import db from ".";
import {
  events,
  eventPrice,
  eventAvailability,
  eventQuestions,
  type EventInsert,
  type EventAvailabilityInsert,
  type EventPriceInsert,
  type EventQuestionInsert,
} from "./schema/public";

const seedEvents = async () => {
  console.log("seeding...");
  const eventData: EventInsert[] = [
    {
      title:
        "Gelisah Ketika Rezeki Tertunda, Saat Jodoh Sedang di Uji (Sesi 1)",
      posterUrl: "/images/event-1.jpeg",
      description:
        "Gelisah Ketika Rezeki Tertunda, Saat Jodoh Sedang di Uji (Sesi 1)",
      venue: "Grand Ballroom JW Marriott Hotel",
      city: "Medan",
      startTime: "2025-05-31T08:00:00",
      endTime: "2025-05-31T10:00:00",
      gmapUrl: "https://www.google.com",
    },

    {
      title:
        "Gelisah Ketika Rezeki Tertunda, Saat Jodoh Sedang di Uji (Sesi 2)",
      posterUrl: "/images/event-2.jpeg",
      description:
        "Gelisah Ketika Rezeki Tertunda, Saat Jodoh Sedang di Uji (Sesi 2)",
      venue: "Grand Ballroom JW Marriott Hotel",
      city: "Medan",
      startTime: "2025-05-31T13:00:00",
      endTime: "2025-05-31T16:00:00",
      gmapUrl: "https://www.google.com",
    },
  ];

  await db.insert(events).values(eventData);

  const eventsDb = await db.select().from(events);

  const eventAvailabilityData: EventAvailabilityInsert[] = eventsDb.map(
    (event) => {
      return {
        eventId: event.id,
        regulerAvailability: 1800,
        vipAvailability: 200,
      };
    },
  );

  const eventPriceData: EventPriceInsert[] = eventsDb.map((event) => {
    return {
      eventId: event.id,
      reguler: 50000,
      vip: 100000,
    };
  });

  const eventQuestionData: EventQuestionInsert[] = eventsDb.map((event) => {
    return {
      eventId: event.id,
      question: `Where is the ${event.title} event held?`,
      answer: `The ${event.title} event is held at ${event.venue}, ${event.city}.`,
    };
  });

  const eventQuestionsData2: EventQuestionInsert[] = eventsDb.map((event) => {
    return {
      eventId: event.id,
      question: `When is the ${event.title} event held?`,
      answer: `The ${event.title} event is held on ${event.startTime}.`,
    };
  });

  await db.insert(eventAvailability).values(eventAvailabilityData);
  await db.insert(eventPrice).values(eventPriceData);
  await db.insert(eventQuestions).values(eventQuestionData);
  await db.insert(eventQuestions).values(eventQuestionsData2);

  console.log("seeding completed.");
};

await seedEvents();
