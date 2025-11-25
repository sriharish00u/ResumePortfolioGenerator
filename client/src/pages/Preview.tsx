import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useBuilder } from "@/contexts/BuilderContext";
import { getTemplateById } from "@/lib/templates";
import { Download, FileText, Code, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import JSZip from "jszip";
// Resume Templates
import { ResumeClassic } from "@/components/preview/ResumesClassic";
import { ResumeModern } from "@/components/preview/ResumeModern";
import { ResumeCreative } from "@/components/preview/ResumeCreative";
import { ResumeExperience } from "@/components/preview/ResumeExperience";
import { ResumeSingleColumn } from "@/components/preview/ResumeSingleColumn";
// Portfolio Templates
import { PortfolioSimple } from "@/components/preview/PortfolioSimple";
import { PortfolioGrid } from "@/components/preview/PortfolioGrid";
import { PortfolioBrand } from "@/components/preview/PortfolioBrand";
import { PortfolioDark } from "@/components/preview/PortfolioDark";
import { PortfolioMinimal } from "@/components/preview/PortfolioMinimal";

export default function Preview() {
  const { userData, sectionVisibility, updateSectionVisibility } = useBuilder();
  const [, setLocation] = useLocation();
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const template = getTemplateById(userData.selectedTemplate || "");

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center space-y-4">
          <p className="text-muted-foreground">No template selected</p>
          <Button onClick={() => setLocation("/templates")} data-testid="button-select-template">
            Select a Template
          </Button>
        </Card>
      </div>
    );
  }

  const isPortfolio = template.type === "portfolio";

  // Select the correct template component based on template ID
  const getTemplateComponent = () => {
    switch (userData.selectedTemplate) {
      // Resume Templates
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
      // Portfolio Templates
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
        return isPortfolio ? <PortfolioSimple /> : <ResumeClassic />;
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById("resume-preview-content");
      if (!element) throw new Error("Preview content not found");

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${userData.fullName || "resume"}_resume.pdf`);

      toast({
        title: "PDF exported successfully",
        description: "Your resume has been downloaded",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportHTML = async () => {
    setIsExporting(true);
    try {
      const zip = new JSZip();

      // Get the preview HTML
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

      // Basic CSS for portfolio
      const cssContent = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Inter, system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
}

img {
  max-width: 100%;
  height: auto;
}
      `;

      zip.file("index.html", htmlContent);
      zip.file("style.css", cssContent);

      // Add project images if any
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

      toast({
        title: "HTML exported successfully",
        description: "Your portfolio has been downloaded as a zip file",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export HTML. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Preview & Export
            </h1>
            <p className="text-muted-foreground">
              Review your {isPortfolio ? "portfolio" : "resume"} and export when ready
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setLocation("/templates")}
            data-testid="button-back"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Change Template
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Controls Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Export Options</h3>
              <div className="space-y-3">
                {!isPortfolio && (
                  <Button
                    className="w-full justify-start"
                    onClick={handleExportPDF}
                    disabled={isExporting}
                    data-testid="button-export-pdf"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {isExporting ? "Exporting..." : "Download as PDF"}
                  </Button>
                )}
                {isPortfolio && (
                  <Button
                    className="w-full justify-start"
                    onClick={handleExportHTML}
                    disabled={isExporting}
                    data-testid="button-export-html"
                  >
                    <Code className="mr-2 h-4 w-4" />
                    {isExporting ? "Exporting..." : "Download as HTML"}
                  </Button>
                )}
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Section Visibility</h3>
              <div className="space-y-3">
                {Object.entries(sectionVisibility).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-sm font-medium capitalize cursor-pointer">
                      {key}
                    </label>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        updateSectionVisibility({ [key]: checked })
                      }
                      data-testid={`switch-${key}`}
                    />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 space-y-3">
              <h3 className="font-semibold text-foreground">Template Info</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Name:</span> {template.name}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Type:</span> {template.type}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Category:</span> {template.category}
                </p>
              </div>
            </Card>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <Tabs defaultValue="desktop">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">
                    Live Preview
                  </h3>
                  <TabsList>
                    <TabsTrigger value="desktop" data-testid="tab-desktop">
                      Desktop
                    </TabsTrigger>
                    <TabsTrigger value="mobile" data-testid="tab-mobile">
                      Mobile
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="desktop" className="mt-0">
                  <div className="border border-border rounded-lg overflow-auto max-h-[800px] bg-white">
                    {getTemplateComponent()}
                  </div>
                </TabsContent>

                <TabsContent value="mobile" className="mt-0">
                  <div className="max-w-sm mx-auto border border-border rounded-lg overflow-auto max-h-[800px] bg-white">
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
