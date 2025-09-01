"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_1 = require("./constants/message");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)({
    origin: "https://root-hoot-frontend.vercel.app" // your Vite frontend URL
}));
// Mock functions
const getVisitors = () => [
    { id: 1, name: "Name1" },
    { id: 2, name: "Name2" },
    { id: 3, name: "Name3" },
];
const getVisits = () => [
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
app.get("/visits", (req, res) => {
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
        status: 200,
        message: message_1.VISITS_DATA,
        data: result
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
