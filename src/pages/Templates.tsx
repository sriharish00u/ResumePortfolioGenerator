import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBuilder } from "@/contexts/BuilderContext";
import { templates, getResumeTemplates, getPortfolioTemplates } from "@/lib/templates";
import { sampleUserData } from "@/lib/mockData";
import { Check, Eye, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { TemplatePreviewModal } from "@/components/TemplatePreviewModal";
import { BuilderProvider } from "@/contexts/BuilderContext";
import { storage } from "@/lib/storage";
import type { Template } from "@shared/schema";

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

const professions = ["all", "engineering", "design", "business", "healthcare", "law", "media", "creative", "executive", "architecture", "general"];

function getTemplateComponent(id: string) {
  switch (id) {
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
    case "portfolio-warmth": return <PortfolioWarmth />;
    case "portfolio-blueprint": return <PortfolioBlueprint />;
    default: return <ResumeClassic />;
  }
}

function TemplateWithSampleData({ templateId }: { templateId: string }) {
  const { updateUserData } = useBuilder();

  useEffect(() => {
    const current = storage.getUserData();
    if (!current || !current.fullName) {
      updateUserData(sampleUserData);
    }
  }, []);

  return getTemplateComponent(templateId);
}

function TemplateThumbnail({ templateId }: { templateId: string }) {
  return (
    <BuilderProvider>
      <TemplateWithSampleData templateId={templateId} />
    </BuilderProvider>
  );
}

export default function Templates() {
  const { userData, updateUserData } = useBuilder();
  const [, setLocation] = useLocation();
  const [selectedId, setSelectedId] = useState(userData.selectedTemplate || "");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [typeTab, setTypeTab] = useState("all");
  const [professionFilter, setProfessionFilter] = useState("all");

  const handleSelectTemplate = (templateId: string) => {
    setSelectedId(templateId);
    updateUserData({ selectedTemplate: templateId });
  };

  const handleContinue = () => {
    if (!selectedId) return;
    const hasData = !!storage.getUserData()?.fullName;
    setLocation(hasData ? "/preview" : "/builder");
  };

  const resumeTemplates = getResumeTemplates();
  const portfolioTemplates = getPortfolioTemplates();

  const filteredTemplates = (() => {
    let list = templates;
    if (typeTab === "resume") list = resumeTemplates;
    else if (typeTab === "portfolio") list = portfolioTemplates;
    if (professionFilter !== "all") {
      list = list.filter(t => t.profession === professionFilter);
    }
    return list;
  })();

  const TemplateCard = ({ template }: { template: typeof templates[0] }) => {
    const isSelected = selectedId === template.id;

    return (
      <Card
        className={cn(
          "relative overflow-hidden transition-all cursor-pointer group",
          isSelected ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
        )}
        data-testid={`card-template-${template.id}`}
      >
        <div
          className="aspect-[3/4] bg-white relative overflow-hidden border-b border-border cursor-pointer"
          onClick={() => handleSelectTemplate(template.id)}
        >
          <div
            style={{
              transform: "scale(0.18)",
              transformOrigin: "top left",
              width: "555%",
              height: "555%",
              pointerEvents: "none",
            }}
          >
            <TemplateThumbnail templateId={template.id} />
          </div>
          {isSelected && (
            <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-primary flex items-center justify-center z-10 shadow-lg">
              <Check className="h-4 w-4 text-primary-foreground" />
            </div>
          )}
        </div>
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-foreground text-sm truncate">
              {template.name}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
              {template.description}
            </p>
          </div>

          {template.type === "resume" && atsScores[template.id] && (
            <div className="flex items-center gap-1.5 text-xs">
              <div className={cn(
                "h-1.5 w-1.5 rounded-full",
                atsScores[template.id] >= 95 ? "bg-green-500" :
                atsScores[template.id] >= 88 ? "bg-yellow-500" : "bg-orange-400"
              )} />
              <span className="text-muted-foreground">
                ATS: <span className="font-semibold text-foreground">{atsScores[template.id]}/100</span>
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {template.features.slice(0, 3).map((feature) => (
              <Badge key={feature} variant="secondary" className="text-[10px] px-1.5 py-0">
                {feature}
              </Badge>
            ))}
          </div>

          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              setPreviewTemplate(template);
            }}
            data-testid={`button-preview-${template.id}`}
          >
            <Eye className="mr-1 h-3 w-3" />
            Preview
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Choose Your Template
          </h1>
          <p className="text-muted-foreground">
            Pick a template and dive right in — your data stays in your browser
          </p>
        </div>

        {/* Type Tabs */}
        <Tabs value={typeTab} onValueChange={setTypeTab} className="w-full mb-4">
          <TabsList>
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Profession Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {professions.map((p) => (
            <button
              key={p}
              onClick={() => setProfessionFilter(p)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-full transition-colors capitalize",
                professionFilter === p
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {p === "all" ? "All Professions" : p}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No templates found for this filter.
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar */}
      {selectedId && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium">
                <span className="hidden sm:inline">Selected: </span>
                {templates.find(t => t.id === selectedId)?.name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedId("")}
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
              <Button
                onClick={handleContinue}
                data-testid="button-continue"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}

      {previewTemplate && (
        <TemplatePreviewModal
          open={!!previewTemplate}
          onOpenChange={(open) => !open && setPreviewTemplate(null)}
          template={previewTemplate}
        />
      )}
    </div>
  );
}
