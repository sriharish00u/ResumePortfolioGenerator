import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBuilder } from "@/contexts/BuilderContext";
import { templates, getResumeTemplates, getPortfolioTemplates } from "@/lib/templates";
import { Check, FileText, Globe, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { TemplatePreviewModal } from "@/components/TemplatePreviewModal";
import type { Template } from "@shared/schema";

export default function Templates() {
  const { userData, updateUserData } = useBuilder();
  const [, setLocation] = useLocation();
  const [selectedId, setSelectedId] = useState(userData.selectedTemplate || "");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedId(templateId);
    updateUserData({ selectedTemplate: templateId });
  };

  const handleContinue = () => {
    if (selectedId) {
      setLocation("/preview");
    }
  };

  const resumeTemplates = getResumeTemplates();
  const portfolioTemplates = getPortfolioTemplates();

  const TemplateCard = ({ template }: { template: typeof templates[0] }) => {
    const isSelected = selectedId === template.id;

    return (
      <>
        <Card
          className={cn(
            "relative overflow-hidden transition-all cursor-pointer group",
            isSelected ? "ring-2 ring-primary shadow-lg" : "hover-elevate"
          )}
          data-testid={`card-template-${template.id}`}
        >
          {/* Template Thumbnail */}
          <div 
            className="aspect-[3/4] bg-muted relative overflow-hidden border-b border-border cursor-pointer"
            onClick={() => handleSelectTemplate(template.id)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {template.type === "resume" ? (
                <FileText className="h-24 w-24 text-muted-foreground/30" />
              ) : (
                <Globe className="h-24 w-24 text-muted-foreground/30" />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {isSelected && (
              <div className="absolute top-3 right-3 h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <Check className="h-5 w-5 text-primary-foreground" />
              </div>
            )}
          </div>

          {/* Template Info */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                {template.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {template.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
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
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Choose Your Template
            </h1>
            <p className="text-muted-foreground">
              Select from professional resume templates or create a portfolio website
            </p>
          </div>

          {selectedId && (
            <div className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <Check className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium text-foreground">
                Template selected: {templates.find(t => t.id === selectedId)?.name}
              </p>
              <Button
                onClick={handleContinue}
                className="ml-auto"
                data-testid="button-continue-to-preview"
              >
                Continue to Preview
              </Button>
            </div>
          )}
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all" data-testid="tab-all">
              All Templates
            </TabsTrigger>
            <TabsTrigger value="resume" data-testid="tab-resume">
              Resume Only
            </TabsTrigger>
            <TabsTrigger value="portfolio" data-testid="tab-portfolio">
              Portfolio Only
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resume">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumeTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portfolio">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setLocation("/builder")}
            data-testid="button-back-to-questions"
          >
            Back to Questions
          </Button>
        </div>
      </div>

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
