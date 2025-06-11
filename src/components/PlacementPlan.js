import React from 'react';

const placementPlan = {
  "July - Build the Base": [
    "Complete 20–25 easy LeetCode problems (Arrays, Strings, Hashing, Recursion)",
    "Finalize Portfolio (UI polish, responsiveness, resume link, 1 live project)",
    "Create/update your resume (1 page, ATS-friendly)",
    "Begin HR Prep – write 2 STAR responses"
  ],
  "August - Level Up": [
    "Practice 30 medium LeetCode problems: Sliding Window, Stack/Queue, Binary Search, 2 Pointers",
    "Build 1 new project (Node + MongoDB or ML classifier)",
    "Start basic aptitude (percentages, time & work, ratios)",
    "Join a peer group or mock group"
  ],
  "September - Mock Interviews + Resume Polish": [
    "Give 4 mock interviews (Pramp, InterviewBuddy, or friends)",
    "Deep dive: Trees, Graphs, DP (10–15 problems)",
    "Practice 1 system design mini-topic/week",
    "Update GitHub + resume with all projects"
  ],
  "October - Core CS + System Design": [
    "OS: Scheduling, Memory Mgmt, Deadlock",
    "DBMS: Joins, Normalization, Indexes",
    "CN: TCP/IP, Routing, DNS, Protocols",
    "System Design: Load Balancer, Cache, REST vs gRPC",
    "Solve 10 SQL problems (Hackerrank)"
  ],
  "November - Placement Simulation": [
    "LeetCode Mock Contests (Weekly)",
    "Timed practice: 3 questions in 1.5 hours",
    "Campus test-specific prep (MCQs, Debugging, Logical Reasoning)",
    "Revise OS/DBMS short notes"
  ],
  "December - Final Lap": [
    "Push resume to companies, portals, LinkedIn",
    "Continue mock interviews + HR answers",
    "Polish any weak areas (e.g., DP or Graphs)",
    "Continue light problem-solving to stay sharp"
  ]
};

const PlacementPlan = () => {
  return (
    <section className="bg-zinc-950 text-white px-6 py-10" id="placement-plan">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-red-500 mb-6">📆 6-Month Placement Preparation Plan</h2>

        {Object.entries(placementPlan).map(([month, tasks]) => (
          <div key={month} className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">{month}</h3>
            <ul className="list-disc list-inside text-zinc-300">
              {tasks.map((task, idx) => (
                <li key={idx} className="mb-1">{task}</li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mt-8">
          <a
            href="/6_Month_Placement_Plan_Vaibhav.pdf"
            download
            className="inline-block bg-red-600 hover:bg-red-700 transition text-white font-semibold px-6 py-2 rounded-xl"
          >
            📄 Download PDF
          </a>
        </div>
      </div>
    </section>
  );
};

export default PlacementPlan;
