import type { ReactNode } from "react";
import { ResumeClassic } from "@/components/preview/ResumesClassic";
import { ResumeModern } from "@/components/preview/ResumeModern";
import { ResumeCreative } from "@/components/preview/ResumeCreative";
import { ResumeExperience } from "@/components/preview/ResumeExperience";
import { ResumeSingleColumn } from "@/components/preview/ResumeSingleColumn";
import { ResumeExecutive } from "@/components/preview/ResumeExecutive";
import { ResumeTechStack } from "@/components/preview/ResumeTechStack";
import { ResumeTimeline } from "@/components/preview/ResumeTimeline";
import { ResumeCompact } from "@/components/preview/ResumeCompact";
import { ResumeElegant } from "@/components/preview/ResumeElegant";
import { PortfolioSimple } from "@/components/preview/PortfolioSimple";
import { PortfolioGrid } from "@/components/preview/PortfolioGrid";
import { PortfolioBrand } from "@/components/preview/PortfolioBrand";
import { PortfolioDark } from "@/components/preview/PortfolioDark";
import { PortfolioMinimal } from "@/components/preview/PortfolioMinimal";
import { PortfolioStudio } from "@/components/preview/PortfolioStudio";
import { PortfolioNeon } from "@/components/preview/PortfolioNeon";
import { PortfolioTerminal } from "@/components/preview/PortfolioTerminal";
import { PortfolioWarmth } from "@/components/preview/PortfolioWarmth";
import { PortfolioBlueprint } from "@/components/preview/PortfolioBlueprint";

const registry: Record<string, ReactNode> = {
  "resume-classic": <ResumeClassic />,
  "resume-modern": <ResumeModern />,
  "resume-creative": <ResumeCreative />,
  "resume-experience": <ResumeExperience />,
  "resume-singlecolumn": <ResumeSingleColumn />,
  "resume-executive": <ResumeExecutive />,
  "resume-techstack": <ResumeTechStack />,
  "resume-timeline": <ResumeTimeline />,
  "resume-compact": <ResumeCompact />,
  "resume-elegant": <ResumeElegant />,
  "portfolio-simple": <PortfolioSimple />,
  "portfolio-grid": <PortfolioGrid />,
  "portfolio-brand": <PortfolioBrand />,
  "portfolio-dark": <PortfolioDark />,
  "portfolio-minimal": <PortfolioMinimal />,
  "portfolio-studio": <PortfolioStudio />,
  "portfolio-neon": <PortfolioNeon />,
  "portfolio-terminal": <PortfolioTerminal />,
  "portfolio-warmth": <PortfolioWarmth />,
  "portfolio-blueprint": <PortfolioBlueprint />,
};

export function getTemplateComponent(id?: string): ReactNode {
  if (id && registry[id]) return registry[id];
  return <ResumeClassic />;
}
