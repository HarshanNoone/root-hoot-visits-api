import express, { Request, Response } from "express";
import { VISITS_DATA } from "./constants/message";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(
  cors({
    origin: "*",
  })
);



// Visitor + Visit Interfaces
interface Visitor {
  id: number;
  name: string;
}

interface Visit {
  visitId: number;
  startDateTime: number;
  endDateTime: number;
  visitorId: number;
}

// Mock functions
const getVisitors = (): Visitor[] => [
  { id: 1, name: "Name1" },
  { id: 2, name: "Name2" },
  { id: 3, name: "Name3" },
];

const getVisits = (): Visit[] => [
  { visitId: 1, startDateTime: 1663405200000, endDateTime: 1663408800000, visitorId: 1 },
  { visitId: 2, startDateTime: 1663405200000, endDateTime: 1663408800000, visitorId: 2 },
  { visitId: 3, startDateTime: 1663405200000, endDateTime: 1663408800000, visitorId: 3 },
  { visitId: 4, startDateTime: 1663405200000, endDateTime: 1663408800000, visitorId: 1 },
  { visitId: 5, startDateTime: 1663405200000, endDateTime: 1663408800000, visitorId: 2 },
  { visitId: 6, startDateTime: 1663405200000, endDateTime: 1663408800000, visitorId: 3 },
  { visitId: 7, startDateTime: 1663405200000, endDateTime: 1663408800000, visitorId: 1 },
  { visitId: 8, startDateTime: 1663405200000, endDateTime: 1663408800000, visitorId: 2 },
  { visitId: 9, startDateTime: 1663405200000, endDateTime: 1663408800000, visitorId: 3 },
];

// API endpoint
app.get("/visits", (req: Request, res: Response) => {
  const visitors = getVisitors();
  const visits = getVisits();

  const result = visits.map(v => {
    const visitor = visitors.find(vis => vis.id === v.visitorId);
    const duration = (v.endDateTime - v.startDateTime) / 1000 / 60; // in minutes

    return {
      visitId: v.visitId,
      startDateTime: v.startDateTime,
      endDateTime: v.endDateTime,
      visitorId: v.visitorId,
      name: visitor?.name,
      duration: `${duration} mins`,
    };
  });

  // Sort by startDateTime
  result.sort((a, b) => a.startDateTime - b.startDateTime);

  res.status(200).json({
    status:200,
    message: VISITS_DATA,
    data:result
})
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
