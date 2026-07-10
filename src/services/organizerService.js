export const getOrganizerDashboard = async () => {
  return {
    events: 12,
    tickets: 350,
    users: 280,
    revenue: 1250000,
    checkins: 220,
    notes: 4.6,

    chart: [
      {
        month: "Jan",
        revenue: 100000,
        users: 80,
        checkins: 60,
        notes: 4.1,
      },
      {
        month: "Fév",
        revenue: 150000,
        users: 100,
        checkins: 75,
        notes: 4.2,
      },
      {
        month: "Mar",
        revenue: 250000,
        users: 140,
        checkins: 110,
        notes: 4.4,
      },
      {
        month: "Avr",
        revenue: 300000,
        users: 180,
        checkins: 145,
        notes: 4.5,
      },
      {
        month: "Mai",
        revenue: 450000,
        users: 220,
        checkins: 180,
        notes: 4.7,
      },
      {
        month: "Juin",
        revenue: 500000,
        users: 280,
        checkins: 220,
        notes: 4.8,
      },
    ],
  };
};