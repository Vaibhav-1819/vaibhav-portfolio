import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { HeroDashboard } from "@/components/sections/HeroDashboard";
import { FeaturedBuild } from "@/components/sections/FeaturedBuild";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { EngineeringHighlights } from "@/components/sections/EngineeringHighlights";
import { Experiments } from "@/components/sections/Experiments";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { ExperienceSection } from "@/components/sections/Experience";
import { AchievementsSection } from "@/components/sections/Achievements";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col pb-8">
      <LoadingScreen />
      
      {/* 
        This is where we will assemble the Workspace.
        Architecture Flow:
        1. Workspace (Hero)
        2. Featured Build (CricSphere)
        3. Projects (Nexus & AetherAI + Others)
        4. Engineering Highlights
        5. Experiments
        6. Journey Timeline
        7. Experience
        8. Achievements
        9. Footer
      */}
      <div className="max-w-7xl mx-auto px-6 w-full">
         <HeroDashboard />
      </div>

      <FeaturedBuild />
      <ProjectsGrid />
      <EngineeringHighlights />
      <Experiments />
      <JourneyTimeline />
      <ExperienceSection />
      <AchievementsSection />
      <Footer />
    </main>
  );
}
