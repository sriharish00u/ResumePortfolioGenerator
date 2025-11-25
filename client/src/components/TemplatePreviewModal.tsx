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
import { PortfolioSimple } from "@/components/preview/PortfolioSimple";
import { PortfolioGrid } from "@/components/preview/PortfolioGrid";
import { PortfolioBrand } from "@/components/preview/PortfolioBrand";
import { PortfolioDark } from "@/components/preview/PortfolioDark";
import { PortfolioMinimal } from "@/components/preview/PortfolioMinimal";
import { BuilderProvider, useBuilder } from "@/contexts/BuilderContext";

interface TemplatePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: Template;
}

function TemplatePreviewContent({ template }: { template: Template }) {
  // Temporarily override builder context with sample data
  const getPreviewComponent = () => {
    switch (template.id) {
      case "resume-classic":
        return <ResumeClassic />;
      case "resume-modern":
        return <ResumeModern />;
      case "resume-creative":
        return <ResumeCreative />;
      case "resume-experience":
        return <ResumeExperience />;
      case "resume-singlecolumn":
        return <ResumeSingleColumn />;
      case "portfolio-simple":
        return <PortfolioSimple />;
      case "portfolio-grid":
        return <PortfolioGrid />;
      case "portfolio-brand":
        return <PortfolioBrand />;
      case "portfolio-dark":
        return <PortfolioDark />;
      case "portfolio-minimal":
        return <PortfolioMinimal />;
      default:
        return null;
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-auto max-h-[60vh] bg-white p-8">
      {getPreviewComponent()}
    </div>
  );
}

export function TemplatePreviewModal({ open, onOpenChange, template }: TemplatePreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">{template.name}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-2">{template.description}</p>
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
          {/* Wrap preview in BuilderProvider with sample data for context */}
          <BuilderProvider>
            <TemplatePreviewContent template={template} />
          </BuilderProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
