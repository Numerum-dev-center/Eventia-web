import participantsData from "../data/participantsData";

export async function getParticipants(eventId) {
  console.log("Event ID :", eventId);

  // Simulation d'un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 600));

  return participantsData.filter(
    (participant) => participant.eventId === Number(eventId)
  );
}