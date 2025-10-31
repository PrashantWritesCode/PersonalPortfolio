export type JournalEntry = {
  id: string;
  date: string; // ISO date string
  title: string;
  tags?: string[];
  summary?: string;
  content: Array<{ type: "p" | "li" | "h3"; text: string }>;
};

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "first-light",
    date: "2025-08-14",
    title: "First Light: Why a Galaxy?",
    tags: ["vision", "design"],
    summary: "Framing a portfolio as an explorable galaxy and what that unlocks for storytelling.",
    content: [
      { type: "p", text: "I wanted a space where exploration felt native. A galaxy makes curiosity the default, not a detour." },
      { type: "p", text: "Structuring projects as planets gave me a way to encode identity into motion, glow, and orbit. It’s more than a list—it’s a story arc." },
      { type: "h3", text: "Lessons" },
      { type: "li", text: "Interaction gating keeps cinematic moments clean (tour first, explore second)." },
      { type: "li", text: "Motion should explain structure. Orbits and trails aren’t just pretty—they teach layout." },
    ],
  },
  {
    id: "guidance-systems",
    date: "2025-09-05",
    title: "Guidance Systems: Building the Tour",
    tags: ["ux", "camera", "threejs"],
    summary: "A guided path that respects performance, clarity, and wonder.",
    content: [
      { type: "p", text: "The guided tour needed to be confident but not controlling. The path eases in and out, with labels that appear when they have something to say." },
      { type: "p", text: "I added a skip that never scolds—just hands you the helm. First impressions matter, but ownership matters more." },
      { type: "h3", text: "Takeaways" },
      { type: "li", text: "Hysteresis on ambience switching avoids jitter when distance hovers near thresholds." },
      { type: "li", text: "Using live refs means the camera follows true positions, not stale math." },
    ],
  },
  {
    id: "constellations-and-meaning",
    date: "2025-10-12",
    title: "Constellations and Meaning",
    tags: ["gamification", "visual-design"],
    summary: "Achievements become star patterns—earned, not granted.",
    content: [
      { type: "p", text: "I wanted achievements that felt like discoveries, not badges. The line-draw animation respects the reveal: first points, then connections, then a soft glow." },
      { type: "p", text: "When visual polish serves narrative—golden, slow, intentional—it stops being decoration." },
    ],
  },
];
