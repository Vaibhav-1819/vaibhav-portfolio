import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { HeroDashboard } from "@/components/sections/HeroDashboard";
import dynamic from 'next/dynamic';

const FeaturedBuild = dynamic(() => import('@/components/sections/FeaturedBuild').then(mod => mod.FeaturedBuild));
const ProjectsGrid = dynamic(() => import('@/components/sections/ProjectsGrid').then(mod => mod.ProjectsGrid));
const EngineeringHighlights = dynamic(() => import('@/components/sections/EngineeringHighlights').then(mod => mod.EngineeringHighlights));
const JourneyTimeline = dynamic(() => import('@/components/sections/JourneyTimeline').then(mod => mod.JourneyTimeline));
const ExperienceSection = dynamic(() => import('@/components/sections/Experience').then(mod => mod.ExperienceSection));
const AchievementsSection = dynamic(() => import('@/components/sections/Achievements').then(mod => mod.AchievementsSection));
const Footer = dynamic(() => import('@/components/layout/Footer').then(mod => mod.Footer));

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
      <JourneyTimeline />
      <ExperienceSection />
      <AchievementsSection />
      <Footer />
    </main>
  );
}
