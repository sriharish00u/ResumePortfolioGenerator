import { useState, useCallback } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useBuilder } from "@/contexts/BuilderContext";
import { getTemplateById } from "@/lib/templates";
import { Download, FileText, Code, ArrowLeft, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SectionOrder } from "@shared/schema";

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

export default function Preview() {
  const { userData, sectionVisibility, updateSectionVisibility, sectionOrder, updateSectionOrder } = useBuilder();
  const [, setLocation] = useLocation();
  const [isExporting, setIsExporting] = useState(false);
  const [viewMode, setViewMode] = useState("desktop");
  const { toast } = useToast();

  const template = getTemplateById(userData.selectedTemplate || "");

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center space-y-4">
          <p className="text-muted-foreground">No template selected</p>
          <Button onClick={() => setLocation("/templates")}>
            Select a Template
          </Button>
        </Card>
      </div>
    );
  }

  const isPortfolio = template.type === "portfolio";

  const getTemplateComponent = () => {
    switch (userData.selectedTemplate) {
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
      default: return isPortfolio ? <PortfolioSimple /> : <ResumeClassic />;
    }
  };

  const handleExportPDF = useCallback(async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById("resume-preview-content");
      if (!element) throw new Error("Preview content not found");

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        logging: false,
        width: 816,
        height: 1056,
        windowWidth: 816,
        windowHeight: 1056,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const imgWidth = 210;
      const pageHeight = 297;
      const pageCanvasHeight = 1056 * (canvas.width / 816);
      const totalPages = Math.ceil(canvas.height / pageCanvasHeight);

      for (let i = 0; i < totalPages; i++) {
        if (i > 0) pdf.addPage();
        const sourceY = i * pageCanvasHeight;
        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = Math.min(pageCanvasHeight, canvas.height - sourceY);
        const ctx = sliceCanvas.getContext("2d")!;
        ctx.drawImage(canvas, 0, sourceY, canvas.width, sliceCanvas.height, 0, 0, canvas.width, sliceCanvas.height);
        const sliceData = sliceCanvas.toDataURL("image/png");
        const sliceHeight = (sliceCanvas.height * imgWidth) / canvas.width;
        pdf.addImage(sliceData, "PNG", 0, 0, imgWidth, sliceHeight);
      }
      pdf.save(`${userData.fullName || "resume"}_resume.pdf`);
      toast({ title: "PDF exported", description: "Your resume has been downloaded" });
    } catch (error) {
      toast({ title: "Export failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  }, [userData.fullName, toast]);

  const handleExportHTML = useCallback(async () => {
    setIsExporting(true);
    try {
      const zip = new JSZip();
      const element = document.getElementById("portfolio-preview-content");
      if (!element) throw new Error("Preview content not found");

      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${userData.fullName || "Portfolio"} - Portfolio</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  ${element.innerHTML}
</body>
</html>`;

      const cssContent = `* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: Inter, system-ui, -apple-system, sans-serif; line-height:1.6; color:#1a1a1a; }
img { max-width:100%; height:auto; }`;

      zip.file("index.html", htmlContent);
      zip.file("style.css", cssContent);

      const projectImages = userData.projects?.flatMap(p => p.images || []) || [];
      const imagesFolder = zip.folder("images");
      projectImages.forEach((imgData, index) => {
        if (imgData && imagesFolder) {
          const base64Data = imgData.split(",")[1];
          imagesFolder.file(`project-${index}.jpg`, base64Data, { base64: true });
        }
      });

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${userData.fullName || "portfolio"}_portfolio.zip`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "HTML exported", description: "Portfolio downloaded as zip" });
    } catch (error) {
      toast({ title: "Export failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  }, [userData, toast]);

  const moveSection = (index: number, direction: "up" | "down") => {
    const newOrder = [...sectionOrder];
    const swap = direction === "up" ? index - 1 : index + 1;
    if (swap < 0 || swap >= newOrder.length) return;
    [newOrder[index], newOrder[swap]] = [newOrder[swap], newOrder[index]];
    updateSectionOrder(newOrder);
  };

  const sectionLabels: Record<string, string> = {
    summary: "Summary", skills: "Skills", education: "Education",
    projects: "Projects", experience: "Experience", achievements: "Achievements", hobbies: "Hobbies",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">
              Preview & Export
            </h1>
            <p className="text-muted-foreground text-sm">
              Review your {isPortfolio ? "portfolio" : "resume"} and export when ready
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setLocation("/templates")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Change Template
            </Button>

            {/* Download Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button disabled={isExporting}>
                  <Download className="mr-2 h-4 w-4" />
                  {isExporting ? "Exporting..." : "Download"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportPDF} disabled={isPortfolio}>
                  <FileText className="mr-2 h-4 w-4" />
                  Download as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportHTML} disabled={!isPortfolio}>
                  <Code className="mr-2 h-4 w-4" />
                  Download as HTML
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Controls Sidebar */}
          <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
            {/* Section Visibility + Reorder */}
            <Card className="p-6 space-y-3">
              <h3 className="font-semibold text-foreground">Sections</h3>
              <div className="space-y-1">
                {sectionOrder.map((key, index) => (
                  <div key={key} className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col gap-0.5">
                      <button onClick={() => moveSection(index, "up")} className="text-muted-foreground hover:text-foreground disabled:opacity-30" disabled={index === 0}><ArrowUp className="h-3 w-3" /></button>
                      <button onClick={() => moveSection(index, "down")} className="text-muted-foreground hover:text-foreground disabled:opacity-30" disabled={index === sectionOrder.length - 1}><ArrowDown className="h-3 w-3" /></button>
                    </div>
                    <span className="flex-1 text-sm capitalize">
                      {sectionLabels[key] || key}
                    </span>
                    <Switch
                      checked={sectionVisibility[key]}
                      onCheckedChange={(checked) => updateSectionVisibility({ [key]: checked })}
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Template Info */}
            <Card className="p-6 space-y-3">
              <h3 className="font-semibold text-foreground">Template Info</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground"><span className="font-medium text-foreground">Name:</span> {template.name}</p>
                <p className="text-muted-foreground"><span className="font-medium text-foreground">Type:</span> {template.type}</p>
                <p className="text-muted-foreground"><span className="font-medium text-foreground">Category:</span> {template.category}</p>
                {template.profession && (
                  <p className="text-muted-foreground"><span className="font-medium text-foreground">Best for:</span> {template.profession}</p>
                )}
              </div>
            </Card>

            {/* Data */}
            <Card className="p-6 space-y-3">
              <h3 className="font-semibold text-foreground">Profile Data</h3>
              <div className="text-sm space-y-1 text-muted-foreground">
                <p><span className="font-medium text-foreground">Name:</span> {userData.fullName || "—"}</p>
                <p><span className="font-medium text-foreground">Role:</span> {userData.role || "—"}</p>
                <p><span className="font-medium text-foreground">Email:</span> {userData.email || "—"}</p>
                <p><span className="font-medium text-foreground">Skills:</span> {userData.skills?.length || 0}</p>
              </div>
              <Button variant="outline" size="sm" className="w-full" onClick={() => setLocation("/builder")}>
                Edit Data
              </Button>
            </Card>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Card className="p-4 sm:p-6">
              <Tabs value={viewMode} onValueChange={setViewMode}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Live Preview</h3>
                  <TabsList>
                    <TabsTrigger value="desktop">Desktop</TabsTrigger>
                    <TabsTrigger value="tablet">Tablet</TabsTrigger>
                    <TabsTrigger value="mobile">Mobile</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="desktop" className="mt-0">
                  <div className="border border-border rounded-lg overflow-auto max-h-[900px] bg-white">
                    {getTemplateComponent()}
                  </div>
                </TabsContent>

                <TabsContent value="tablet" className="mt-0">
                  <div className="max-w-[768px] mx-auto border border-border rounded-lg overflow-auto max-h-[900px] bg-white">
                    {getTemplateComponent()}
                  </div>
                </TabsContent>

                <TabsContent value="mobile" className="mt-0">
                  <div className="max-w-sm mx-auto border border-border rounded-lg overflow-auto max-h-[900px] bg-white">
                    {getTemplateComponent()}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
