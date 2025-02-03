import db from ".";
import {
  events,
  eventPrice,
  eventAvailability,
  eventQuestions,
  type Event,
  type EventInsert,
  type EventAvailabilityInsert,
  type EventPriceInsert,
  type EventQuestionInsert,
} from "./schema/public";

const seedEvents = async () => {
  console.log("🚀 Starting seeding...");

  await db.transaction(async (tx) => {
    // 1️⃣ Insert Events
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

    const insertedEvents = await tx.insert(events).values(eventData);
    console.log(`✅ Inserted ${insertedEvents.length} events.`);

    // Fetch inserted events with IDs
    const eventsDb = await tx.select().from(events);

    // 2️⃣ Insert Event Availability
    const eventAvailabilityData: EventAvailabilityInsert[] = eventsDb.map(
      (event: Event) => ({
        eventId: event.id,
        regulerAvailability: 1800,
        vipAvailability: 200,
      }),
    );

    await tx.insert(eventAvailability).values(eventAvailabilityData);
    console.log(
      `✅ Inserted ${eventAvailabilityData.length} event availability records.`,
    );

    // 3️⃣ Insert Event Prices
    const eventPriceData: EventPriceInsert[] = eventsDb.map((event: Event) => ({
      eventId: event.id,
      reguler: 50000,
      vip: 100000,
    }));

    await tx.insert(eventPrice).values(eventPriceData);
    console.log(`✅ Inserted ${eventPriceData.length} event price records.`);

    // 4️⃣ Insert Event Questions
    const eventQuestionsData: EventQuestionInsert[] = eventsDb.flatMap(
      (event: Event) => [
        {
          eventId: event.id,
          question: `Where is the ${event.title} event held?`,
          answer: `The ${event.title} event is held at ${event.venue}, ${event.city}.`,
        },
        {
          eventId: event.id,
          question: `When is the ${event.title} event held?`,
          answer: `The ${event.title} event is held on ${event.startTime}.`,
        },
      ],
    );

    await tx.insert(eventQuestions).values(eventQuestionsData);
    console.log(`✅ Inserted ${eventQuestionsData.length} event questions.`);

    console.log("🎉 Seeding completed successfully!");
  });
};

await seedEvents();
