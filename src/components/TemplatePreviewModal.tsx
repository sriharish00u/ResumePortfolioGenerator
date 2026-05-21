import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { sampleUserData } from "@/lib/mockData";
import type { Template } from "@shared/schema";

// Template preview components
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
import { BuilderProvider, useBuilder } from "@/contexts/BuilderContext";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

const atsScores: Record<string, number> = {
  "resume-classic": 95,
  "resume-modern": 88,
  "resume-creative": 82,
  "resume-experience": 92,
  "resume-singlecolumn": 96,
  "resume-executive": 93,
  "resume-techstack": 88,
  "resume-timeline": 91,
  "resume-compact": 98,
  "resume-elegant": 89,
};

interface TemplatePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: Template;
}

function TemplatePreviewContent({ template }: { template: Template }) {
  const getPreviewComponent = () => {
    switch (template.id) {
      case "resume-classic": return <ResumeClassic />;
      case "resume-modern": return <ResumeModern />;
      case "resume-creative": return <ResumeCreative />;
      case "resume-experience": return <ResumeExperience />;
      case "resume-singlecolumn": return <ResumeSingleColumn />;
      case "resume-executive": return <ResumeExecutive />;
      case "resume-techstack": return <ResumeTechStack />;
      case "resume-timeline": return <ResumeTimeline />;
      case "resume-compact": return <ResumeCompact />;
      case "resume-elegant": return <ResumeElegant />;
      case "portfolio-simple": return <PortfolioSimple />;
      case "portfolio-grid": return <PortfolioGrid />;
      case "portfolio-brand": return <PortfolioBrand />;
      case "portfolio-dark": return <PortfolioDark />;
      case "portfolio-minimal": return <PortfolioMinimal />;
      case "portfolio-studio": return <PortfolioStudio />;
      case "portfolio-neon": return <PortfolioNeon />;
      case "portfolio-terminal": return <PortfolioTerminal />;
      default: return null;
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-auto max-h-[60vh] bg-white">
      <div style={{ transform: 'scale(0.6)', transformOrigin: 'top left', width: '166%' }}>
        {getPreviewComponent()}
      </div>
    </div>
  );
}

export function TemplatePreviewModal({ open, onOpenChange, template }: TemplatePreviewModalProps) {
  const [, setLocation] = useLocation();
  const { updateUserData } = useBuilder();

  const handleSelect = () => {
    updateUserData({ selectedTemplate: template.id });
    onOpenChange(false);
    setLocation("/preview");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">{template.name}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-2">{template.description}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  {template.category}
                </span>
                {template.type === "resume" && atsScores[template.id] && (
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded",
                    atsScores[template.id] >= 95 ? "bg-green-100 text-green-700" :
                    atsScores[template.id] >= 88 ? "bg-yellow-100 text-yellow-700" : "bg-orange-100 text-orange-700"
                  )}>
                    ATS: {atsScores[template.id]}/100
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {template.features.map((f) => (
                  <span key={f} className="px-2 py-1 bg-muted rounded text-xs font-medium">
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="mt-0"
              data-testid="button-close-preview"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="p-6 pt-4">
          <BuilderProvider>
            <TemplatePreviewContent template={template} />
          </BuilderProvider>
        </div>

        <div className="p-6 pt-0">
          <Button className="w-full" onClick={handleSelect}>
            Select This Template
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
