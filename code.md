# Codebase Export


---

## File: `client/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />

    <!-- Primary Meta -->
    <title>Resume & Portfolio Builder — Free Templates for Every Career | No Login</title>
    <meta name="description" content="Build a professional resume or portfolio in 3 minutes. 20 templates for developers, doctors, teachers, lawyers, designers & more. Free, no login, no AI, export as PDF." />
    <meta name="keywords" content="free resume builder, portfolio builder, resume templates, ATS resume, no login resume maker, PDF resume, student resume, professional resume" />
    <meta name="author" content="Resume & Portfolio Builder" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://yoursite.com/" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://yoursite.com/" />
    <meta property="og:title" content="Free Resume Builder — 20 Templates for Every Career" />
    <meta property="og:description" content="Build a stunning resume or portfolio in 3 minutes. Free templates for developers, doctors, teachers, designers & more. No login required." />
    <meta property="og:image" content="https://yoursite.com/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Free Resume Builder — 20 Templates for Every Career" />
    <meta name="twitter:description" content="Build a stunning resume in 3 minutes. 20 free templates. No login, no AI, export as PDF." />
    <meta name="twitter:image" content="https://yoursite.com/og-image.png" />

    <!-- Structured Data: WebApplication -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Resume & Portfolio Builder",
      "url": "https://yoursite.com",
      "description": "Free resume and portfolio builder with 20 templates for every profession",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
    </script>

    <!-- Performance & PWA -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#4f46e5" />

    <!-- Fonts (all in one request) -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&family=DM+Sans:wght@400;500;700&family=Lato:wght@400;700&family=Rajdhani:wght@500;600;700&family=Merriweather:wght@400;700&family=Source+Serif+4:wght@400;600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <link rel="icon" type="image/png" href="/favicon.png" />
    <meta name="google-adsense-account" content="ca-pub-2642508269663537">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```


---

## File: `client/public/manifest.json`

```json
{
  "name": "Resume & Portfolio Builder",
  "short_name": "ResumeBuilder",
  "description": "Free resume and portfolio builder with 20 templates",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f0c29",
  "theme_color": "#4f46e5",
  "icons": [
    { "src": "/favicon.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/favicon.png", "sizes": "512x512", "type": "image/png" }
  ]
}

```


---

## File: `client/src/App.tsx`

```tsx
import { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { BuilderProvider } from "@/contexts/BuilderContext";
import { Moon, Sun } from "lucide-react";
import Landing from "@/pages/Landing";
import Builder from "@/pages/Builder";
import Templates from "@/pages/Templates";
import Preview from "@/pages/Preview";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/builder" component={Builder} />
      <Route path="/templates" component={Templates} />
      <Route path="/preview" component={Preview} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BuilderProvider>
          {/* Theme Toggle */}
          <div className="fixed top-4 right-4 z-[100]">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
          <Toaster />
          <Router />
        </BuilderProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

```


---

## File: `client/src/components/DataManagement.tsx`

```tsx
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Upload, AlertCircle } from "lucide-react";
import { useBuilder } from "@/contexts/BuilderContext";
import { exportUserData, importUserData, downloadFile } from "@/lib/dataExport";
import { useToast } from "@/hooks/use-toast";

export function DataManagement() {
  const { userData, updateUserData, clearUserData } = useBuilder();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleExportData = () => {
    try {
      const jsonData = exportUserData(userData);
      const filename = `resume-portfolio-backup-${new Date().toISOString().split("T")[0]}.json`;
      downloadFile(jsonData, filename);
      toast({
        title: "Data exported successfully",
        description: "Your data has been downloaded as JSON",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export data",
        variant: "destructive",
      });
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = importUserData(content);
        
        if (importedData) {
          updateUserData(importedData);
          toast({
            title: "Data imported successfully",
            description: "Your backup has been restored",
          });
        } else {
          toast({
            title: "Import failed",
            description: "Invalid backup file format",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Import failed",
          description: "Error reading file",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Data Management</h3>
        <p className="text-sm text-muted-foreground">
          Backup and restore your resume and portfolio data
        </p>
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleExportData}
          className="w-full justify-start"
          variant="outline"
          data-testid="button-export-data"
        >
          <Download className="mr-2 h-4 w-4" />
          Export Data as JSON
        </Button>

        <Button
          onClick={handleImportClick}
          className="w-full justify-start"
          variant="outline"
          data-testid="button-import-data"
        >
          <Upload className="mr-2 h-4 w-4" />
          Import Data from JSON
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          className="hidden"
          data-testid="input-import-file"
        />
      </div>

      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3">
        <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-yellow-700">
          Exported data includes all text, images, and settings. Keep your backups safe!
        </p>
      </div>
    </Card>
  );
}

```


---

## File: `client/src/components/ImageUpload.tsx`

```tsx
import { useState, useRef } from "react";
import { Upload, X, User, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { storage } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value?: string;
  onChange: (base64: string) => void;
  type?: "profile" | "project";
  label?: string;
  maxSize?: number;
}

export function ImageUpload({
  value,
  onChange,
  type = "profile",
  label,
  maxSize = 5 * 1024 * 1024,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const isProfile = type === "profile";

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSize / 1024 / 1024}MB`,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const base64 = await storage.resizeImage(file, isProfile ? 400 : 800);
      onChange(base64);
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to process image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2" data-testid={`image-upload-${type}`}>
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-lg transition-all overflow-hidden",
          isDragging ? "border-primary bg-accent/50" : "border-border",
          isProfile ? "w-32 h-32" : "w-full aspect-video",
          value ? "border-solid" : ""
        )}
      >
        {value ? (
          <div className="relative w-full h-full group">
            <img
              src={value}
              alt="Uploaded"
              className={cn(
                "w-full h-full object-cover",
                isProfile && "rounded-full"
              )}
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                data-testid="button-change-image"
              >
                <Upload className="h-4 w-4 mr-2" />
                Change
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={handleRemove}
                data-testid="button-remove-image"
              >
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className={cn(
              "w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground hover-elevate active-elevate-2 transition-all",
              isProcessing && "opacity-50 cursor-not-allowed"
            )}
            data-testid="button-upload-image"
          >
            {isProfile ? (
              <User className="h-12 w-12" />
            ) : (
              <ImageIcon className="h-12 w-12" />
            )}
            <div className="text-sm text-center px-4">
              <p className="font-medium">
                {isProcessing ? "Processing..." : "Drop image here or click to upload"}
              </p>
              <p className="text-xs mt-1">JPG, PNG up to 5MB</p>
            </div>
          </button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        data-testid="input-file-hidden"
      />
    </div>
  );
}

```


---

## File: `client/src/components/MultiImageUpload.tsx`

```tsx
import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { storage } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

interface MultiImageUploadProps {
  value: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  label?: string;
}

export function MultiImageUpload({
  value = [],
  onChange,
  maxImages = 5,
  label,
}: MultiImageUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive",
      });
      return;
    }

    if (value.length >= maxImages) {
      toast({
        title: "Maximum images reached",
        description: `You can upload up to ${maxImages} images`,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const base64 = await storage.resizeImage(file, 800);
      onChange([...value, base64]);
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to process image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3" data-testid="multi-image-upload">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {value.map((image, index) => (
          <div
            key={index}
            className="relative aspect-video rounded-lg border border-border overflow-hidden group"
            data-testid={`uploaded-image-${index}`}
          >
            <img
              src={image}
              alt={`Project image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={() => handleRemove(index)}
                data-testid={`button-remove-image-${index}`}
              >
                <X className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        ))}

        {value.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className={cn(
              "aspect-video rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover-elevate active-elevate-2 transition-all",
              isProcessing && "opacity-50 cursor-not-allowed"
            )}
            data-testid="button-add-image"
          >
            <Plus className="h-8 w-8" />
            <span className="text-xs font-medium">Add Image</span>
          </button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        {value.length} / {maxImages} images uploaded
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        data-testid="input-file-hidden"
      />
    </div>
  );
}

```


---

## File: `client/src/components/ProgressStepper.tsx`

```tsx
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function ProgressStepper({ steps, currentStep, onStepClick }: ProgressStepperProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6" data-testid="progress-stepper">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = index <= currentStep && onStepClick;

          return (
            <div key={step.id} className="flex flex-1 items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => isClickable && onStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                    isCompleted && "bg-primary border-primary text-primary-foreground",
                    isCurrent && "bg-background border-primary text-primary",
                    !isCompleted && !isCurrent && "bg-muted border-border text-muted-foreground",
                    isClickable && "hover-elevate cursor-pointer"
                  )}
                  data-testid={`step-${step.id}`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </button>
                <div className="hidden sm:flex flex-col items-center text-center max-w-[120px]">
                  <span
                    className={cn(
                      "text-xs font-medium",
                      isCurrent ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5 hidden md:block">
                    {step.description}
                  </span>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-[2px] mx-2 sm:mx-4">
                  <div
                    className={cn(
                      "h-full transition-all",
                      isCompleted ? "bg-primary" : "bg-border"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

```


---

## File: `client/src/components/TemplatePreviewModal.tsx`

```tsx
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

```


---

## File: `client/src/components/builder-steps/AchievementsHobbies.tsx`

```tsx
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useBuilder } from "@/contexts/BuilderContext";
import { ArrowRight, ArrowLeft, Plus, X } from "lucide-react";
import { useState } from "react";
import { nanoid } from "nanoid";

const achievementItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Achievement title is required"),
  description: z.string().optional(),
});

const achievementsHobbiesSchema = z.object({
  achievements: z.array(achievementItemSchema).optional(),
  hobbies: z.array(z.string()).optional(),
  portfolioHero: z.string().optional(),
});

interface AchievementsHobbiesProps {
  onNext: () => void;
  onBack: () => void;
}

export function AchievementsHobbies({ onNext, onBack }: AchievementsHobbiesProps) {
  const { userData, updateUserData } = useBuilder();
  const [hobbyInput, setHobbyInput] = useState("");

  const form = useForm({
    resolver: zodResolver(achievementsHobbiesSchema),
    defaultValues: {
      achievements: userData.achievements || [],
      hobbies: userData.hobbies || [],
      portfolioHero: userData.portfolioHero || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "achievements",
  });

  const addHobby = () => {
    if (hobbyInput.trim()) {
      const currentHobbies = form.getValues("hobbies") || [];
      form.setValue("hobbies", [...currentHobbies, hobbyInput.trim()]);
      setHobbyInput("");
    }
  };

  const removeHobby = (index: number) => {
    const currentHobbies = form.getValues("hobbies") || [];
    form.setValue(
      "hobbies",
      currentHobbies.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data: z.infer<typeof achievementsHobbiesSchema>) => {
    updateUserData({
      achievements: data.achievements || [],
      hobbies: data.hobbies || [],
      portfolioHero: data.portfolioHero || "",
    });
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Final Touches
        </h1>
        <p className="text-muted-foreground">
          Add achievements, certifications, and personal interests (all optional)
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Achievements & Certifications (Optional)
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    id: nanoid(),
                    title: "",
                    description: "",
                  })
                }
                data-testid="button-add-achievement"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Achievement
              </Button>
            </div>

            {fields.length === 0 && (
              <Card className="p-6">
                <p className="text-sm text-muted-foreground text-center">
                  No achievements added yet. Click "Add Achievement" to get started.
                </p>
              </Card>
            )}

            {fields.map((field, index) => (
              <Card key={field.id} className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">
                    Achievement {index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    data-testid={`button-remove-achievement-${index}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name={`achievements.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="NPTEL Certification in Data Structures"
                          {...field}
                          data-testid={`input-achievement-title-${index}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`achievements.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Completed with 95% score..."
                          className="min-h-20 resize-none"
                          {...field}
                          data-testid={`input-achievement-description-${index}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>
            ))}
          </div>

          <Card className="p-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Hobbies & Interests (Optional)
              </h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a hobby (e.g., Photography, Reading)"
                  value={hobbyInput}
                  onChange={(e) => setHobbyInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addHobby();
                    }
                  }}
                  data-testid="input-hobby"
                />
                <Button
                  type="button"
                  onClick={addHobby}
                  data-testid="button-add-hobby"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              <FormDescription className="mt-2">
                Press Enter or click Add to add each hobby
              </FormDescription>

              <div className="mt-4 flex flex-wrap gap-2">
                {(form.watch("hobbies") || []).map((hobby, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm"
                    data-testid={`hobby-badge-${index}`}
                  >
                    {hobby}
                    <button
                      type="button"
                      onClick={() => removeHobby(index)}
                      className="ml-2 hover:text-destructive"
                      data-testid={`button-remove-hobby-${index}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <FormField
              control={form.control}
              name="portfolioHero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio Hero Introduction (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Hi! I'm a passionate developer who loves building innovative solutions..."
                      className="min-h-32 resize-none"
                      {...field}
                      data-testid="input-portfolioHero"
                    />
                  </FormControl>
                  <FormDescription>
                    This will be used as the hero section text if you create a portfolio website
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <div className="flex justify-between gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              data-testid="button-back"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button type="submit" data-testid="button-next">
              Choose Template
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

```


---

## File: `client/src/components/builder-steps/BasicInfo.tsx`

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "@/components/ImageUpload";
import { useBuilder } from "@/contexts/BuilderContext";
import { ArrowRight, ArrowLeft } from "lucide-react";

const basicInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  role: z.string().min(1, "Role/Career objective is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  profileImage: z.string().optional(),
  github: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  portfolio: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  summary: z.string().min(10, "Summary should be at least 10 characters"),
});

interface BasicInfoProps {
  onNext: () => void;
  onBack: () => void;
}

export function BasicInfo({ onNext, onBack }: BasicInfoProps) {
  const { userData, updateUserData } = useBuilder();

  const form = useForm({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      fullName: userData.fullName || "",
      role: userData.role || "",
      email: userData.email || "",
      phone: userData.phone || "",
      profileImage: userData.profileImage || "",
      github: userData.links?.github || "",
      linkedin: userData.links?.linkedin || "",
      portfolio: userData.links?.portfolio || "",
      summary: userData.summary || "",
    },
  });

  const onSubmit = (data: z.infer<typeof basicInfoSchema>) => {
    updateUserData({
      fullName: data.fullName,
      role: data.role,
      email: data.email,
      phone: data.phone,
      profileImage: data.profileImage,
      links: {
        github: data.github,
        linkedin: data.linkedin,
        portfolio: data.portfolio,
      },
      summary: data.summary,
    });
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Let's Start with the Basics
        </h1>
        <p className="text-muted-foreground">
          Tell us about yourself and upload a professional photo
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="p-6 space-y-6">
            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Photo</FormLabel>
                  <FormControl>
                    <ImageUpload
                      type="profile"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a professional headshot (optional but recommended)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        data-testid="input-fullName"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role / Career Objective *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Software Developer"
                        {...field}
                        data-testid="input-role"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        {...field}
                        data-testid="input-phone"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Professional Links (Optional)
            </h3>

            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/johndoe"
                        {...field}
                        data-testid="input-github"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://linkedin.com/in/johndoe"
                        {...field}
                        data-testid="input-linkedin"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="portfolio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio Website</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://johndoe.com"
                        {...field}
                        data-testid="input-portfolio"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <Card className="p-6">
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Summary *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A passionate software developer with 3 years of experience in building web applications..."
                      className="min-h-32 resize-none"
                      {...field}
                      data-testid="input-summary"
                    />
                  </FormControl>
                  <FormDescription>
                    Write 2-4 lines about yourself, your experience, and what you're looking for
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <div className="flex justify-between gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              data-testid="button-back"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button type="submit" data-testid="button-next">
              Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

```


---

## File: `client/src/components/builder-steps/ProjectsExperience.tsx`

```tsx
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultiImageUpload } from "@/components/MultiImageUpload";
import { useBuilder } from "@/contexts/BuilderContext";
import { ArrowRight, ArrowLeft, Plus, X } from "lucide-react";
import { nanoid } from "nanoid";

const projectItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Project title is required"),
  tools: z.string().min(1, "Tools/technologies are required"),
  description: z.string().min(10, "Description should be at least 10 characters"),
  images: z.array(z.string()).max(5).default([]),
});

const experienceItemSchema = z.object({
  id: z.string(),
  role: z.string().min(1, "Role is required"),
  organization: z.string().min(1, "Organization is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().min(10, "Description should be at least 10 characters"),
});

const projectsExperienceSchema = z.object({
  projects: z.array(projectItemSchema).min(1, "At least one project is required"),
  hasExperience: z.boolean(),
  experience: z.array(experienceItemSchema).optional(),
}).refine(
  (data) => {
    // If hasExperience is true, experience array must have at least one valid entry
    if (data.hasExperience) {
      return data.experience && data.experience.length > 0;
    }
    return true;
  },
  {
    message: "Please add at least one experience entry or disable work experience",
    path: ["experience"],
  }
);

interface ProjectsExperienceProps {
  onNext: () => void;
  onBack: () => void;
}

export function ProjectsExperience({ onNext, onBack }: ProjectsExperienceProps) {
  const { userData, updateUserData } = useBuilder();

  const form = useForm({
    resolver: zodResolver(projectsExperienceSchema),
    defaultValues: {
      projects: userData.projects || [
        {
          id: nanoid(),
          title: "",
          tools: "",
          description: "",
          images: [],
        },
      ],
      hasExperience: userData.hasExperience || false,
      experience: userData.experience || [],
    },
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const hasExperience = form.watch("hasExperience");

  const onSubmit = (data: z.infer<typeof projectsExperienceSchema>) => {
    updateUserData({
      projects: data.projects,
      hasExperience: data.hasExperience,
      experience: data.experience,
    });
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Projects & Experience
        </h1>
        <p className="text-muted-foreground">
          Showcase your work with images and descriptions
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Projects * (Add images to showcase)
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  appendProject({
                    id: nanoid(),
                    title: "",
                    tools: "",
                    description: "",
                    images: [],
                  })
                }
                data-testid="button-add-project"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </div>

            {projectFields.map((field, index) => (
              <Card key={field.id} className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">
                    Project {index + 1}
                  </h4>
                  {projectFields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProject(index)}
                      data-testid={`button-remove-project-${index}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name={`projects.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Task Management App"
                          {...field}
                          data-testid={`input-project-title-${index}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`projects.${index}.tools`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tools/Technologies *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="React, Node.js, MongoDB"
                          {...field}
                          data-testid={`input-project-tools-${index}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`projects.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Built a full-stack task management application with real-time updates..."
                          className="min-h-24 resize-none"
                          {...field}
                          data-testid={`input-project-description-${index}`}
                        />
                      </FormControl>
                      <FormDescription>Write 3-5 lines about the project</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`projects.${index}.images`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Images (Up to 5)</FormLabel>
                      <FormControl>
                        <MultiImageUpload
                          value={field.value || []}
                          onChange={field.onChange}
                          maxImages={5}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload screenshots or images of your project
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>
            ))}
          </div>

          <Card className="p-6 space-y-4">
            <FormField
              control={form.control}
              name="hasExperience"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel>Do you have work experience?</FormLabel>
                    <FormDescription>
                      Toggle if you want to add professional experience
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      data-testid="switch-hasExperience"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {hasExperience && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">Experience Entries</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendExperience({
                        id: nanoid(),
                        role: "",
                        organization: "",
                        duration: "",
                        description: "",
                      })
                    }
                    data-testid="button-add-experience"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </div>

                {experienceFields.map((field, index) => (
                  <Card key={field.id} className="p-4 space-y-4 bg-muted/50">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-medium">Experience {index + 1}</h5>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(index)}
                        data-testid={`button-remove-experience-${index}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <FormField
                      control={form.control}
                      name={`experience.${index}.role`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Software Engineer"
                              {...field}
                              data-testid={`input-experience-role-${index}`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`experience.${index}.organization`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Tech Company Inc."
                                {...field}
                                data-testid={`input-experience-organization-${index}`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`experience.${index}.duration`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Jan 2022 - Present"
                                {...field}
                                data-testid={`input-experience-duration-${index}`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name={`experience.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Developed and maintained web applications..."
                              className="min-h-20 resize-none"
                              {...field}
                              data-testid={`input-experience-description-${index}`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Card>
                ))}
              </div>
            )}
          </Card>

          <div className="flex justify-between gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              data-testid="button-back"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button type="submit" data-testid="button-next">
              Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

```


---

## File: `client/src/components/builder-steps/SkillsEducation.tsx`

```tsx
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useBuilder } from "@/contexts/BuilderContext";
import { ArrowRight, ArrowLeft, Plus, X } from "lucide-react";
import { useState } from "react";
import { nanoid } from "nanoid";

const educationItemSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().min(1, "Field of study is required"),
  startYear: z.string().min(1, "Start year is required"),
  endYear: z.string().min(1, "End year is required"),
  grade: z.string().optional(),
});

const skillsEducationSchema = z.object({
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  education: z.array(educationItemSchema).min(1, "At least one education entry is required"),
});

interface SkillsEducationProps {
  onNext: () => void;
  onBack: () => void;
}

export function SkillsEducation({ onNext, onBack }: SkillsEducationProps) {
  const { userData, updateUserData } = useBuilder();
  const [skillInput, setSkillInput] = useState("");

  const form = useForm({
    resolver: zodResolver(skillsEducationSchema),
    defaultValues: {
      skills: userData.skills || [],
      education: userData.education || [
        {
          id: nanoid(),
          institution: "",
          degree: "",
          field: "",
          startYear: "",
          endYear: "",
          grade: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const addSkill = () => {
    if (skillInput.trim()) {
      const currentSkills = form.getValues("skills");
      form.setValue("skills", [...currentSkills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (index: number) => {
    const currentSkills = form.getValues("skills");
    form.setValue(
      "skills",
      currentSkills.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data: z.infer<typeof skillsEducationSchema>) => {
    updateUserData({
      skills: data.skills,
      education: data.education,
    });
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Skills & Education
        </h1>
        <p className="text-muted-foreground">
          Highlight your expertise and academic background
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Your Skills *
              </h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill (e.g., JavaScript, Python, React)"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  data-testid="input-skill"
                />
                <Button
                  type="button"
                  onClick={addSkill}
                  data-testid="button-add-skill"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              <FormDescription className="mt-2">
                Press Enter or click Add to add each skill
              </FormDescription>

              <div className="mt-4 flex flex-wrap gap-2">
                {form.watch("skills").map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm"
                    data-testid={`skill-badge-${index}`}
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="ml-2 hover:text-destructive"
                      data-testid={`button-remove-skill-${index}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              {form.formState.errors.skills && (
                <p className="text-sm text-destructive mt-2">
                  {form.formState.errors.skills.message}
                </p>
              )}
            </div>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Education *
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    id: nanoid(),
                    institution: "",
                    degree: "",
                    field: "",
                    startYear: "",
                    endYear: "",
                    grade: "",
                  })
                }
                data-testid="button-add-education"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </div>

            {fields.map((field, index) => (
              <Card key={field.id} className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">
                    Education Entry {index + 1}
                  </h4>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      data-testid={`button-remove-education-${index}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name={`education.${index}.institution`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="University of Technology"
                            {...field}
                            data-testid={`input-institution-${index}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`education.${index}.degree`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Degree *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Bachelor of Science"
                              {...field}
                              data-testid={`input-degree-${index}`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`education.${index}.field`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Field of Study *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Computer Science"
                              {...field}
                              data-testid={`input-field-${index}`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`education.${index}.startYear`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Year *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="2020"
                              {...field}
                              data-testid={`input-startYear-${index}`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`education.${index}.endYear`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Year *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="2024"
                              {...field}
                              data-testid={`input-endYear-${index}`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`education.${index}.grade`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Grade (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="3.8 GPA"
                              {...field}
                              data-testid={`input-grade-${index}`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-between gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              data-testid="button-back"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button type="submit" data-testid="button-next">
              Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

```


---

## File: `client/src/components/preview/PortfolioBlueprint.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";

export function PortfolioBlueprint() {
  const { userData, sectionVisibility } = useBuilder();

  const styles = {
    page: {
      fontFamily: "'DM Sans', 'Lato', sans-serif",
      background: "#e8f4f8",
      color: "#1a365d",
      minHeight: "100vh",
      width: "100%",
      position: "relative" as const,
    },
    gridOverlay: {
      position: "fixed" as const,
      inset: 0,
      pointerEvents: "none" as const,
      zIndex: 0,
      opacity: 0.15,
      backgroundImage:
        "linear-gradient(#1a365d 1px, transparent 1px), linear-gradient(90deg, #1a365d 1px, transparent 1px)",
      backgroundSize: "40px 40px, 40px 40px",
    },
    content: {
      position: "relative" as const,
      zIndex: 1,
    },
    hero: {
      padding: "80px 24px 48px",
      textAlign: "center" as const,
      position: "relative" as const,
      borderBottom: "3px solid #1a365d",
    },
    heroCornerTL: {
      position: "absolute" as const,
      top: "16px",
      left: "16px",
      width: "24px",
      height: "24px",
      borderTop: "3px solid #ff6b35",
      borderLeft: "3px solid #ff6b35",
    },
    heroCornerBR: {
      position: "absolute" as const,
      bottom: "-3px",
      right: "16px",
      width: "24px",
      height: "24px",
      borderBottom: "3px solid #ff6b35",
      borderRight: "3px solid #ff6b35",
    },
    specLabel: {
      fontSize: "10px",
      textTransform: "uppercase" as const,
      letterSpacing: "2px",
      color: "#ff6b35",
      fontWeight: 700,
      marginBottom: "8px",
    },
    name: {
      fontSize: "clamp(32px, 5vw, 48px)",
      fontWeight: 700,
      color: "#1a365d",
      margin: "0 0 4px",
      fontFamily: "'DM Sans', sans-serif",
    },
    role: {
      fontSize: "16px",
      color: "#ff6b35",
      fontWeight: 600,
      margin: "0 0 4px",
      letterSpacing: "1px",
      textTransform: "uppercase" as const,
    },
    section: {
      padding: "40px 24px",
      maxWidth: "960px",
      margin: "0 auto",
    },
    specCard: {
      background: "#fff",
      border: "2px solid #1a365d",
      padding: "28px",
      marginBottom: "20px",
      position: "relative" as const,
    },
    specCorner: {
      position: "absolute" as const,
      bottom: "-2px",
      right: "-2px",
      width: "16px",
      height: "16px",
      borderBottom: "3px solid #ff6b35",
      borderRight: "3px solid #ff6b35",
    },
    heading: {
      fontSize: "18px",
      fontWeight: 700,
      color: "#1a365d",
      margin: "0 0 16px",
      textTransform: "uppercase" as const,
      letterSpacing: "1.5px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      borderBottom: "2px solid #1a365d",
      paddingBottom: "8px",
    },
    headingMarker: {
      width: "12px",
      height: "12px",
      background: "#ff6b35",
      flexShrink: 0,
    },
    tag: {
      display: "inlineBlock",
      padding: "4px 14px",
      border: "1.5px solid #1a365d",
      color: "#1a365d",
      fontSize: "12px",
      fontWeight: 600,
      margin: "0 6px 8px 0",
      background: "rgba(26,54,93,0.04)",
    },
    orangeTag: {
      display: "inlineBlock",
      padding: "4px 14px",
      border: "1.5px solid #ff6b35",
      color: "#ff6b35",
      fontSize: "12px",
      fontWeight: 700,
      margin: "0 6px 8px 0",
      background: "rgba(255,107,53,0.06)",
    },
    measurement: {
      fontSize: "10px",
      color: "#ff6b35",
      fontWeight: 700,
      letterSpacing: "1px",
      marginBottom: "4px",
    },
  };

  return (
    <div id="portfolio-preview-content" style={styles.page}>
      <style>{`
        @media print {
          body { background: #e8f4f8; }
          .bp-card { break-inside: avoid; border: 1px solid #1a365d; }
        }
        .bp-card { transition: box-shadow 0.2s; }
        .bp-card:hover { box-shadow: 4px 4px 0 rgba(26,54,93,0.1); }
      `}</style>

      {/* Grid Overlay */}
      <div style={styles.gridOverlay} />

      <div style={styles.content}>
        {/* Hero */}
        <section style={styles.hero}>
          <div style={styles.heroCornerTL} />
          <div style={styles.heroCornerBR} />
          <p style={styles.specLabel}>Specification Sheet</p>
          <h1 style={styles.name}>{userData.fullName || "Your Name"}</h1>
          <p style={styles.role}>{userData.role || "Your Role"}</p>
          {userData.portfolioHero && (
            <p style={{ fontSize: "14px", color: "#4a6a8a", maxWidth: "500px", margin: "12px auto 0", fontStyle: "italic" }}>
              "{userData.portfolioHero}"
            </p>
          )}
          <div style={{ marginTop: "16px", display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", fontSize: "13px", color: "#1a365d" }}>
            {userData.email && <span>✉ {userData.email}</span>}
            {userData.phone && <span>☎ {userData.phone}</span>}
          </div>
        </section>

        {/* Summary */}
        {sectionVisibility.summary && userData.summary && (
          <section style={styles.section}>
            <div style={styles.specCard} className="bp-card">
              <div style={styles.specCorner} />
              <p style={styles.measurement}>SPEC-001 // Overview</p>
              <h2 style={styles.heading}><span style={styles.headingMarker} />Profile</h2>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#2d4a6a", margin: 0 }}>{userData.summary}</p>
            </div>
          </section>
        )}

        {/* Skills */}
        {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
          <section style={styles.section}>
            <div style={styles.specCard} className="bp-card">
              <div style={styles.specCorner} />
              <p style={styles.measurement}>SPEC-002 // Competencies</p>
              <h2 style={styles.heading}><span style={styles.headingMarker} />Technical Specifications</h2>
              <div>
                {userData.skills.map((s, i) => (
                  <span key={i} style={i % 2 === 0 ? styles.orangeTag : styles.tag}>{s}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experience */}
        {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
          <section style={styles.section}>
            <div style={styles.specCard} className="bp-card">
              <div style={styles.specCorner} />
              <p style={styles.measurement}>SPEC-003 // Employment History</p>
              <h2 style={styles.heading}><span style={styles.headingMarker} />Experience Timeline</h2>
              {userData.experience.map((e, i) => (
                <div key={i} style={{ marginBottom: i < (userData.experience?.length ?? 0) - 1 ? "16px" : 0, paddingLeft: "20px", borderLeft: "2px solid #1a365d", position: "relative" }}>
                  <div style={{ position: "absolute", left: "-5px", top: "4px", width: "8px", height: "8px", background: "#ff6b35", borderRadius: "50%" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 2px", color: "#1a365d" }}>{e.role}</h3>
                    <span style={{ fontSize: "11px", color: "#ff6b35", fontWeight: 700 }}>{e.duration}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#4a6a8a", fontWeight: 600, margin: "0 0 4px" }}>{e.organization}</p>
                  <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#2d4a6a", margin: 0 }}>{e.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
          <section style={styles.section}>
            <div style={styles.specCard} className="bp-card">
              <div style={styles.specCorner} />
              <p style={styles.measurement}>SPEC-004 // Deliverables</p>
              <h2 style={styles.heading}><span style={styles.headingMarker} />Projects</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                {userData.projects.map((p, i) => (
                  <div key={i} style={{ border: "1.5px solid #1a365d", padding: "20px", background: "rgba(26,54,93,0.02)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flexStart", marginBottom: "6px" }}>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0, color: "#1a365d" }}>{p.title}</h3>
                      <span style={{ fontSize: "10px", color: "#ff6b35", fontWeight: 700 }}>{`PRJ-${String(i + 1).padStart(3, "0")}`}</span>
                    </div>
                    <p style={{ fontSize: "11px", color: "#ff6b35", fontWeight: 600, margin: "0 0 6px" }}>Tech: {p.tools}</p>
                    <p style={{ fontSize: "13px", lineHeight: 1.5, color: "#2d4a6a", margin: 0 }}>{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Education */}
        {sectionVisibility.education && userData.education && userData.education.length > 0 && (
          <section style={styles.section}>
            <div style={styles.specCard} className="bp-card">
              <div style={styles.specCorner} />
              <p style={styles.measurement}>SPEC-005 // Credentials</p>
              <h2 style={styles.heading}><span style={styles.headingMarker} />Education</h2>
              {userData.education.map((e, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < (userData.education?.length ?? 0) - 1 ? "1px dashed #1a365d" : "none" }}>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 700, margin: 0, color: "#1a365d" }}>{e.degree} in {e.field}</p>
                    <p style={{ fontSize: "13px", color: "#4a6a8a", margin: "1px 0 0" }}>{e.institution}{e.grade ? ` — GPA: ${e.grade}` : ""}</p>
                  </div>
                  <span style={{ fontSize: "11px", color: "#ff6b35", fontWeight: 700, whiteSpace: "nowrap" }}>{e.startYear} – {e.endYear}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
          <section style={styles.section}>
            <div style={styles.specCard} className="bp-card">
              <div style={styles.specCorner} />
              <p style={styles.measurement}>SPEC-006 // Milestones</p>
              <h2 style={styles.heading}><span style={styles.headingMarker} />Achievements</h2>
              {userData.achievements.map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flexStart", gap: "10px", marginBottom: i < (userData.achievements?.length ?? 0) - 1 ? "10px" : 0 }}>
                  <span style={{ color: "#ff6b35", fontSize: "14px", marginTop: "2px" }}>◆</span>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, margin: 0, color: "#1a365d" }}>{a.title}</p>
                    {a.description && <p style={{ fontSize: "12px", color: "#4a6a8a", margin: "2px 0 0" }}>{a.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hobbies */}
        {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
          <section style={styles.section}>
            <div style={styles.specCard} className="bp-card">
              <div style={styles.specCorner} />
              <p style={styles.measurement}>SPEC-007 // Personal</p>
              <h2 style={styles.heading}><span style={styles.headingMarker} />Interests</h2>
              <div>
                {userData.hobbies.map((h, i) => (
                  <span key={i} style={styles.tag}>{h}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "32px 24px", borderTop: "2px solid #1a365d", marginTop: "20px", position: "relative" }}>
          <div style={{ position: "absolute", top: "-2px", left: "24px", width: "16px", height: "16px", borderTop: "3px solid #ff6b35", borderLeft: "3px solid #ff6b35" }} />
          <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#ff6b35", fontWeight: 700, marginBottom: "8px" }}>End of Specification</p>
          <p style={{ fontSize: "12px", color: "#4a6a8a", margin: 0 }}>
            {userData.email && <span>{userData.email} &nbsp;|&nbsp; </span>}
            {userData.phone && <span>{userData.phone}</span>}
          </p>
        </footer>
      </div>
    </div>
  );
}

```


---

## File: `client/src/components/preview/PortfolioBrand.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";

const coral = '#e85d4f';
const terracotta = '#f4a261';
const cream = '#fff8f0';
const dark = '#2d1b14';

export function PortfolioBrand() {
  const { userData, sectionVisibility } = useBuilder();

  const s = {
    root: { fontFamily: "'Nunito', system-ui, sans-serif", background: cream, minHeight: '100vh', color: dark, overflowX: 'hidden' as const },
    inner: { maxWidth: '960px', margin: '0 auto', width: '100%' },
    section: { padding: '100px 24px' } as React.CSSProperties,
    sectionAlt: { padding: '100px 24px', background: '#ffffff' } as React.CSSProperties,
    hero: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${coral} 0%, ${terracotta} 100%)`, position: 'relative' as const, overflow: 'hidden', padding: '48px 24px' },
    heroOverlay: { position: 'absolute' as const, inset: 0, opacity: 0.08, background: 'radial-gradient(circle at 30% 50%, #fff 0%, transparent 60%), radial-gradient(circle at 70% 50%, #fff 0%, transparent 60%)' },
    heroContent: { position: 'relative' as const, zIndex: 1, textAlign: 'center' as const, maxWidth: '600px', animation: 'brandFadeIn 1s ease' },
    heroName: { fontSize: 'clamp(42px, 7vw, 72px)', fontWeight: 800, color: '#ffffff', margin: '0 0 8px', letterSpacing: '-1px', lineHeight: 1.05 },
    heroRole: { fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'rgba(255,255,255,0.9)', fontWeight: 600, margin: '0 0 12px' },
    heroTagline: { fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, margin: '0 auto', maxWidth: '480px' },
    profileImg: { width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' as const, margin: '0 auto 24px', border: '5px solid rgba(255,255,255,0.3)', boxShadow: `0 0 0 8px rgba(255,255,255,0.08), 0 16px 48px rgba(0,0,0,0.15)` },
    heading: { fontSize: '28px', fontWeight: 800, color: dark, margin: '0 0 8px', letterSpacing: '-0.5px' },
    headingDecorated: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' },
    headingLine: { flex: 1, height: '2px', background: `linear-gradient(90deg, ${coral}, ${terracotta})`, maxWidth: '60px' },
    storyText: { fontSize: '16px', lineHeight: 1.8, color: '#5c4033', margin: 0, maxWidth: '700px', fontStyle: 'italic' } as React.CSSProperties,
    tag: { padding: '8px 20px', background: '#ffffff', color: coral, borderRadius: '24px', fontSize: '14px', fontWeight: 600, border: `2px solid ${coral}22` },
    projectCard: { background: '#ffffff', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 20px rgba(232,93,79,0.08)', border: '1px solid rgba(232,93,79,0.1)', transition: 'transform 0.3s, box-shadow 0.3s' } as React.CSSProperties,
    projectTitle: { fontSize: '20px', fontWeight: 700, color: dark, margin: '0 0 6px' },
    toolTag: { fontSize: '12px', padding: '4px 12px', background: `${coral}11`, color: coral, borderRadius: '12px', fontWeight: 600 },
    eduCard: { padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid rgba(232,93,79,0.08)', boxShadow: '0 2px 12px rgba(232,93,79,0.06)' },
    experienceCard: { padding: '24px', background: '#ffffff', borderRadius: '16px', borderLeft: `4px solid ${coral}`, boxShadow: '0 2px 12px rgba(232,93,79,0.06)' } as React.CSSProperties,
    achievementItem: { padding: '16px 24px', background: '#ffffff', borderRadius: '12px', border: `1px solid rgba(232,93,79,0.1)`, boxShadow: '0 1px 6px rgba(232,93,79,0.04)' },
    hobbyTag: { padding: '10px 24px', background: '#ffffff', color: coral, borderRadius: '24px', fontSize: '14px', fontWeight: 600, border: `2px solid ${coral}22`, boxShadow: '0 2px 8px rgba(232,93,79,0.06)' },
    contact: { padding: '80px 24px', background: dark, color: '#ffffff', textAlign: 'center' as const },
    footerLink: { color: terracotta, textDecoration: 'none', fontSize: '15px', fontWeight: 600, transition: 'color 0.2s' } as React.CSSProperties,
    circleDeco: { position: 'absolute', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' } as React.CSSProperties,
  };

  return (
    <div id="portfolio-preview-content" style={s.root}>
      <style>{`
        html { scroll-behavior: smooth; }
        @media print {
          body { background: #fff !important; }
          section { page-break-inside: avoid; }
        }
        @keyframes brandFadeIn { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes heroGlow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes brandShimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .brand-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .brand-card:hover { transform: translateY(-8px); box-shadow: 0 20px 48px -12px rgba(232,93,79,0.2); }
        .brand-tag { transition: all 0.2s; }
        .brand-tag:hover { background: ${coral} !important; color: #fff !important; border-color: ${coral} !important; }
        .brand-hobby { transition: all 0.2s; }
        .brand-hobby:hover { background: ${coral} !important; color: #fff !important; }
        footer a:hover { color: #ffffff !important; }
      `}</style>

      <section style={s.hero}>
        <div style={s.heroOverlay} />
        <div style={{ ...s.circleDeco, width: '400px', height: '400px', top: '-100px', right: '-100px', animation: 'float 8s ease-in-out infinite' }} />
        <div style={{ ...s.circleDeco, width: '300px', height: '300px', bottom: '-80px', left: '-80px', animation: 'float 10s ease-in-out infinite reverse' }} />
        <div style={s.heroContent}>
          {userData.profileImage && (
            <img src={userData.profileImage} alt={userData.fullName} style={s.profileImg} />
          )}
          <h1 style={s.heroName}>{userData.fullName || 'Your Name'}</h1>
          <p style={s.heroRole}>{userData.role || 'Your Role'}</p>
          {userData.portfolioHero && (
            <p style={s.heroTagline}>{userData.portfolioHero}</p>
          )}
        </div>
      </section>

      {sectionVisibility?.summary !== false && userData.summary && (
        <section id="about" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingDecorated}>
              <div style={s.headingLine} />
              <h2 style={s.heading}>My Story</h2>
              <div style={s.headingLine} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <p style={s.storyText}>{userData.summary}</p>
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.experience !== false && userData.experience && userData.experience.length > 0 && (
        <section id="experience" style={s.sectionAlt}>
          <div style={s.inner}>
            <div style={s.headingDecorated}>
              <div style={s.headingLine} />
              <h2 style={s.heading}>Work</h2>
              <div style={s.headingLine} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '700px', margin: '0 auto' }}>
              {userData.experience.map((exp, i) => (
                <div key={i} className="brand-card" style={s.experienceCard}>
                  <div style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: dark, margin: 0 }}>{exp.role}</h3>
                    <span style={{ fontSize: '13px', color: coral, fontWeight: 600 }}>{exp.duration}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: coral, fontWeight: 700, margin: '2px 0 8px' }}>{exp.organization}</p>
                  <p style={{ fontSize: '14px', color: '#5c4033', lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.projects !== false && userData.projects && userData.projects.length > 0 && (
        <section id="projects" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingDecorated}>
              <div style={s.headingLine} />
              <h2 style={s.heading}>Projects</h2>
              <div style={s.headingLine} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '700px', margin: '0 auto' }}>
              {userData.projects.map((proj, i) => (
                <div key={i} className="brand-card" style={s.projectCard}>
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                    {proj.images && proj.images[0] && (
                      <img src={proj.images[0]} alt={proj.title} style={{ width: '160px', height: '120px', objectFit: 'cover', borderRadius: '12px', flexShrink: 0 }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <h3 style={s.projectTitle}>{proj.title}</h3>
                      {proj.tools && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                          {proj.tools.split(',').map((t, ti) => (
                            <span key={ti} style={s.toolTag}>{t.trim()}</span>
                          ))}
                        </div>
                      )}
                      <p style={{ fontSize: '14px', color: '#5c4033', lineHeight: 1.6, margin: 0 }}>{proj.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.skills !== false && userData.skills && userData.skills.length > 0 && (
        <section id="skills" style={s.sectionAlt}>
          <div style={s.inner}>
            <div style={s.headingDecorated}>
              <div style={s.headingLine} />
              <h2 style={s.heading}>Expertise</h2>
              <div style={s.headingLine} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', maxWidth: '700px', margin: '0 auto' }}>
              {userData.skills.map((skill, i) => (
                <span key={i} className="brand-tag" style={s.tag}>{skill}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.education !== false && userData.education && userData.education.length > 0 && (
        <section id="education" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingDecorated}>
              <div style={s.headingLine} />
              <h2 style={s.heading}>Education</h2>
              <div style={s.headingLine} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', maxWidth: '700px', margin: '0 auto' }}>
              {userData.education.map((edu, i) => (
                <div key={i} className="brand-card" style={s.eduCard}>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: dark, margin: '0 0 2px' }}>{edu.degree}</h3>
                  <p style={{ fontSize: '14px', color: coral, fontWeight: 700, margin: '0 0 4px' }}>{edu.institution}</p>
                  <p style={{ fontSize: '13px', color: '#5c4033', margin: '0 0 2px' }}>{edu.field}</p>
                  <p style={{ fontSize: '12px', color: '#a08070', margin: 0 }}>{edu.startYear} – {edu.endYear}{edu.grade ? ` · ${edu.grade}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.achievements !== false && userData.achievements && userData.achievements.length > 0 && (
        <section id="achievements" style={s.sectionAlt}>
          <div style={s.inner}>
            <div style={s.headingDecorated}>
              <div style={s.headingLine} />
              <h2 style={s.heading}>Achievements</h2>
              <div style={s.headingLine} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '600px', margin: '0 auto' }}>
              {userData.achievements.map((a, i) => (
                <div key={i} className="brand-card" style={s.achievementItem}>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: dark, margin: '0 0 4px' }}>{a.title}</p>
                  {a.description && <p style={{ fontSize: '13px', color: '#5c4033', lineHeight: 1.5, margin: 0 }}>{a.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.hobbies !== false && userData.hobbies && userData.hobbies.length > 0 && (
        <section id="hobbies" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingDecorated}>
              <div style={s.headingLine} />
              <h2 style={s.heading}>Beyond the Code</h2>
              <div style={s.headingLine} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
              {userData.hobbies.map((h, i) => (
                <span key={i} className="brand-hobby" style={s.hobbyTag}>{h}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer style={s.contact}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 6px' }}>Let's Connect</h2>
          <p style={{ fontSize: '15px', color: terracotta, margin: '0 0 24px', opacity: 0.8 }}>I'd love to hear from you</p>
          {userData.email && <p style={{ fontSize: '16px', margin: '0 0 6px', color: terracotta }}>{userData.email}</p>}
          {userData.phone && <p style={{ fontSize: '16px', margin: '0 0 6px', color: '#a08070' }}>{userData.phone}</p>}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '28px', marginTop: '24px' }}>
            {userData.links?.github && <a href={userData.links.github} target="_blank" rel="noopener noreferrer" style={s.footerLink}>GitHub</a>}
            {userData.links?.linkedin && <a href={userData.links.linkedin} target="_blank" rel="noopener noreferrer" style={s.footerLink}>LinkedIn</a>}
            {userData.links?.portfolio && <a href={userData.links.portfolio} target="_blank" rel="noopener noreferrer" style={s.footerLink}>Website</a>}
          </div>
        </div>
      </footer>
    </div>
  );
}

```


---

## File: `client/src/components/preview/PortfolioDark.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";

export function PortfolioDark() {
  const { userData, sectionVisibility } = useBuilder();

  const glow = '#8b5cf6';
  const glowRgb = '139, 92, 246';
  const bg = '#0a0a0a';
  const surface = '#111111';
  const border = '#1a1a1a';
  const textMuted = '#888888';

  const glowShadow = `0 0 40px rgba(${glowRgb},0.3), 0 0 80px rgba(${glowRgb},0.15), 0 0 120px rgba(${glowRgb},0.05)`;

  const s = {
    root: { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: bg, color: '#f1f1f1', minHeight: '100vh', position: 'relative' as const, overflowX: 'hidden' as const },
    inner: { maxWidth: '960px', margin: '0 auto', width: '100%' },
    section: { padding: '100px 24px', position: 'relative' as const } as React.CSSProperties,
    sectionBorder: { borderTop: `1px solid ${border}` },
    hero: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' as const, overflow: 'hidden', padding: '48px 24px' },
    heroGlow: { position: 'absolute' as const, width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle, rgba(${glowRgb},0.1) 0%, transparent 70%)`, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' as const },
    heroName: { fontSize: 'clamp(44px, 7vw, 72px)', fontWeight: 800, color: '#ffffff', margin: '0 0 8px', letterSpacing: '-1.5px', textShadow: `0 0 40px rgba(${glowRgb},0.4), 0 0 80px rgba(${glowRgb},0.2)` },
    heroRole: { fontSize: 'clamp(18px, 2.5vw, 24px)', color: textMuted, fontWeight: 500, margin: '0 0 16px' },
    heroTagline: { fontSize: '15px', color: '#666', lineHeight: 1.6, margin: '0 auto', maxWidth: '500px' },
    profileImg: { width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' as const, margin: '0 auto 24px', border: `3px solid ${glow}44`, boxShadow: `0 0 30px rgba(${glowRgb},0.2)` },
    heading: { fontSize: '14px', fontWeight: 700, color: glow, margin: '0 0 24px', textTransform: 'uppercase' as const, letterSpacing: '3px' },
    headingBar: { width: '40px', height: '2px', background: glow, marginBottom: '20px', boxShadow: `0 0 10px rgba(${glowRgb},0.3)` },
    badge: { padding: '8px 20px', background: surface, border: `1px solid ${border}`, borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: '#ccc', boxShadow: `0 0 15px rgba(${glowRgb},0.05)` },
    badgeGlow: { padding: '8px 20px', background: surface, border: `1px solid ${glow}44`, borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: '#ffffff', boxShadow: `0 0 20px rgba(${glowRgb},0.1), 0 0 0 1px ${glow}22 inset` },
    projectCard: { background: surface, border: `1px solid ${border}`, borderRadius: '12px', padding: '28px', transition: 'border-color 0.3s, box-shadow 0.3s' } as React.CSSProperties,
    projectTitle: { fontSize: '18px', fontWeight: 700, color: '#f1f1f1', margin: '0 0 6px' },
    toolTag: { fontSize: '11px', padding: '3px 10px', background: `${glow}15`, color: glow, borderRadius: '4px', fontWeight: 500, border: `1px solid ${glow}22` },
    eduCard: { background: surface, border: `1px solid ${border}`, borderRadius: '12px', padding: '24px', transition: 'border-color 0.3s' } as React.CSSProperties,
    experienceCard: { background: surface, border: `1px solid ${border}`, borderRadius: '12px', padding: '24px', borderLeft: `3px solid ${glow}66` } as React.CSSProperties,
    timelineDot: { width: '14px', height: '14px', borderRadius: '50%', background: glow, boxShadow: `0 0 16px rgba(${glowRgb},0.4)`, flexShrink: 0 },
    timelineLine: { position: 'absolute' as const, left: '6px', top: '4px', bottom: '4px', width: '2px', background: border },
    achievementItem: { padding: '16px 20px', background: surface, border: `1px solid ${border}`, borderRadius: '8px', borderLeft: `3px solid ${glow}66` },
    hobbyTag: { padding: '8px 20px', background: surface, border: `1px solid ${border}`, borderRadius: '20px', fontSize: '13px', fontWeight: 500, color: textMuted },
    contact: { padding: '80px 24px', borderTop: `1px solid ${border}`, textAlign: 'center' as const, background: '#050505' },
    footerLink: { color: textMuted, textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' } as React.CSSProperties,
    starfield: { position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' } as React.CSSProperties,
  };

  return (
    <div id="portfolio-preview-content" style={s.root}>
      <style>{`
        html { scroll-behavior: smooth; }
        @media print {
          body { background: #fff !important; color: #000 !important; }
          #portfolio-preview-content { background: #fff !important; color: #000 !important; }
          .void-star, .void-glow { display: none !important; }
        }
        @keyframes voidPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes voidDrift { 0% { transform: translateY(0) translateX(0); } 25% { transform: translateY(-20px) translateX(10px); } 50% { transform: translateY(-10px) translateX(-10px); } 75% { transform: translateY(-30px) translateX(5px); } 100% { transform: translateY(0) translateX(0); } }
        @keyframes voidTwinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.8; } }
        @keyframes voidFadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .void-star { position: absolute; border-radius: 50%; background: #fff; animation: voidTwinkle var(--duration, 3s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
        .void-card { transition: border-color 0.3s ease, box-shadow 0.3s ease; }
        .void-card:hover { border-color: ${glow}66 !important; box-shadow: 0 0 30px rgba(${glowRgb},0.08), 0 0 0 1px ${glow}22 inset !important; }
        .void-edu:hover { border-color: ${glow}66 !important; }
        .void-link:hover { color: ${glow} !important; }
      `}</style>

      <div className="void-starfield" style={s.starfield} aria-hidden="true">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="void-star"
            style={{
              width: `${0.5 + Math.random() * 2}px`,
              height: `${0.5 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              '--duration': `${2 + Math.random() * 4}s`,
              '--delay': `${Math.random() * 5}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <section style={{ ...s.hero, zIndex: 1 }}>
        <div className="void-glow" style={s.heroGlow} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', animation: 'voidFadeIn 1s ease' }}>
          {userData.profileImage && (
            <img src={userData.profileImage} alt={userData.fullName} style={s.profileImg} />
          )}
          <h1 style={s.heroName}>{userData.fullName || 'Your Name'}</h1>
          <p style={s.heroRole}>{userData.role || 'Your Role'}</p>
          {(userData.portfolioHero || userData.summary) && (
            <p style={s.heroTagline}>{userData.portfolioHero || userData.summary}</p>
          )}
        </div>
      </section>

      {sectionVisibility?.summary !== false && userData.summary && (
        <section id="about" style={{ ...s.section, ...s.sectionBorder, zIndex: 1 }}>
          <div style={s.inner}>
            <div style={s.headingBar} />
            <h2 style={s.heading}>About</h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: textMuted, margin: 0, maxWidth: '700px' }}>{userData.summary}</p>
          </div>
        </section>
      )}

      {sectionVisibility?.skills !== false && userData.skills && userData.skills.length > 0 && (
        <section id="skills" style={{ ...s.section, ...s.sectionBorder, zIndex: 1, background: '#080808' }}>
          <div style={s.inner}>
            <div style={s.headingBar} />
            <h2 style={s.heading}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {userData.skills.map((skill, i) => (
                <span key={i} className="void-card" style={i % 3 === 0 ? s.badgeGlow : s.badge}>{skill}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.experience !== false && userData.experience && userData.experience.length > 0 && (
        <section id="experience" style={{ ...s.section, ...s.sectionBorder, zIndex: 1 }}>
          <div style={s.inner}>
            <div style={s.headingBar} />
            <h2 style={s.heading}>Experience</h2>
            <div style={{ position: 'relative', paddingLeft: '32px' }}>
              <div style={s.timelineLine} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {userData.experience.map((exp, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px' }}>
                    <div style={s.timelineDot} />
                    <div className="void-card" style={{ flex: 1, ...s.experienceCard }}>
                      <div style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#f1f1f1', margin: '0 0 4px' }}>{exp.role}</h3>
                        <span style={{ fontSize: '12px', color: glow, fontWeight: 500 }}>{exp.duration}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: glow, fontWeight: 600, margin: '0 0 8px' }}>{exp.organization}</p>
                      <p style={{ fontSize: '13px', color: textMuted, lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.projects !== false && userData.projects && userData.projects.length > 0 && (
        <section id="projects" style={{ ...s.section, ...s.sectionBorder, zIndex: 1, background: '#080808' }}>
          <div style={s.inner}>
            <div style={s.headingBar} />
            <h2 style={s.heading}>Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {userData.projects.map((proj, i) => (
                <article key={i} className="void-card" style={s.projectCard}>
                  {proj.images && proj.images[0] && (
                    <img src={proj.images[0]} alt={proj.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }} />
                  )}
                  <h3 style={s.projectTitle}>{proj.title}</h3>
                  {proj.tools && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                      {proj.tools.split(',').map((t, ti) => (
                        <span key={ti} style={s.toolTag}>{t.trim()}</span>
                      ))}
                    </div>
                  )}
                  <p style={{ fontSize: '13px', color: textMuted, lineHeight: 1.6, margin: 0 }}>{proj.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.education !== false && userData.education && userData.education.length > 0 && (
        <section id="education" style={{ ...s.section, ...s.sectionBorder, zIndex: 1 }}>
          <div style={s.inner}>
            <div style={s.headingBar} />
            <h2 style={s.heading}>Education</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {userData.education.map((edu, i) => (
                <div key={i} className="void-edu" style={s.eduCard}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f1f1', margin: '0 0 2px' }}>{edu.degree}</h3>
                  <p style={{ fontSize: '14px', color: glow, fontWeight: 600, margin: '0 0 4px' }}>{edu.institution}</p>
                  <p style={{ fontSize: '13px', color: textMuted, margin: '0 0 2px' }}>{edu.field}</p>
                  <p style={{ fontSize: '12px', color: '#555', margin: 0 }}>{edu.startYear} – {edu.endYear}{edu.grade ? ` | ${edu.grade}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.achievements !== false && userData.achievements && userData.achievements.length > 0 && (
        <section id="achievements" style={{ ...s.section, ...s.sectionBorder, zIndex: 1, background: '#080808' }}>
          <div style={s.inner}>
            <div style={s.headingBar} />
            <h2 style={s.heading}>Achievements</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {userData.achievements.map((a, i) => (
                <div key={i} className="void-card" style={s.achievementItem}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#f1f1f1', margin: '0 0 4px' }}>{a.title}</p>
                  {a.description && <p style={{ fontSize: '13px', color: textMuted, lineHeight: 1.5, margin: 0 }}>{a.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.hobbies !== false && userData.hobbies && userData.hobbies.length > 0 && (
        <section id="hobbies" style={{ ...s.section, ...s.sectionBorder, zIndex: 1 }}>
          <div style={s.inner}>
            <div style={s.headingBar} />
            <h2 style={s.heading}>Interests</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {userData.hobbies.map((h, i) => (
                <span key={i} className="void-card" style={s.hobbyTag}>{h}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer style={{ ...s.contact, zIndex: 1 }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: glow, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '3px' }}>Connect</h2>
          <p style={{ fontSize: '13px', color: textMuted, margin: '0 0 20px' }}>Let's build something</p>
          {userData.email && <p style={{ fontSize: '15px', margin: '0 0 4px', color: '#aaa' }}>{userData.email}</p>}
          {userData.phone && <p style={{ fontSize: '15px', margin: '0 0 4px', color: textMuted }}>{userData.phone}</p>}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '28px', marginTop: '20px' }}>
            {userData.links?.github && <a href={userData.links.github} target="_blank" rel="noopener noreferrer" className="void-link" style={s.footerLink}>GitHub</a>}
            {userData.links?.linkedin && <a href={userData.links.linkedin} target="_blank" rel="noopener noreferrer" className="void-link" style={s.footerLink}>LinkedIn</a>}
            {userData.links?.portfolio && <a href={userData.links.portfolio} target="_blank" rel="noopener noreferrer" className="void-link" style={s.footerLink}>Website</a>}
          </div>
        </div>
      </footer>
    </div>
  );
}

```


---

## File: `client/src/components/preview/PortfolioGrid.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";
import { useState, useMemo } from "react";

export function PortfolioGrid() {
  const { userData, sectionVisibility } = useBuilder();
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const allSkills = userData.skills || [];
  const allProjects = userData.projects || [];

  const filteredProjects = useMemo(() => {
    if (!activeSkill) return allProjects;
    return allProjects.filter(p =>
      p.tools.toLowerCase().includes(activeSkill.toLowerCase())
    );
  }, [activeSkill, allProjects]);

  const s = {
    root: { fontFamily: "'DM Sans', system-ui, sans-serif", background: '#ffffff', minHeight: '100vh', color: '#0f172a' },
    inner: { maxWidth: '1100px', margin: '0 auto', width: '100%' },
    section: { padding: '80px 24px' } as React.CSSProperties,
    sectionAlt: { padding: '80px 24px', background: '#f8faff' } as React.CSSProperties,
    hero: { padding: '100px 24px 60px', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', textAlign: 'center' as const, position: 'relative' as const, overflow: 'hidden' },
    heroBg: { position: 'absolute' as const, inset: 0, background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)' },
    heroName: { fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: '#ffffff', margin: '0 0 6px', letterSpacing: '-1px', position: 'relative' as const, zIndex: 1 },
    heroRole: { fontSize: 'clamp(16px, 2vw, 20px)', color: '#bfdbfe', fontWeight: 500, margin: '0 0 12px', position: 'relative' as const, zIndex: 1 },
    heroTagline: { fontSize: '15px', color: '#93c5fd', lineHeight: 1.6, margin: '0 auto', maxWidth: '560px', position: 'relative' as const, zIndex: 1 },
    profileImg: { width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover' as const, margin: '0 auto 16px', border: '4px solid rgba(255,255,255,0.2)', boxShadow: '0 8px 32px rgba(37,99,235,0.3)', position: 'relative' as const, zIndex: 1 },
    heading: { fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: '0 0 20px', letterSpacing: '-0.3px' },
    headingAccent: { display: 'inlineBlock', width: '36px', height: '4px', background: '#2563eb', borderRadius: '2px', marginBottom: '14px' },
    tag: { padding: '6px 14px', background: '#e0efff', color: '#2563eb', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' as const, transition: 'all 0.15s', border: `2px solid transparent` },
    tagActive: { padding: '6px 14px', background: '#2563eb', color: '#ffffff', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' as const, transition: 'all 0.15s', border: '2px solid #2563eb' },
    projectCard: { background: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)', border: '1px solid #eef2f6', transition: 'transform 0.2s, box-shadow 0.2s', breakInside: 'avoid' as any, marginBottom: '20px' },
    timelineLine: { position: 'absolute' as const, left: '8px', top: '4px', bottom: '4px', width: '2px', background: '#dbeafe' },
    timelineDot: { width: '18px', height: '18px', borderRadius: '50%', background: '#2563eb', border: '4px solid #dbeafe', flexShrink: 0 },
    eduCard: { padding: '20px', background: '#ffffff', borderRadius: '10px', border: '1px solid #eef2f6', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' },
    contact: { padding: '60px 24px', background: '#0f172a', color: '#ffffff', textAlign: 'center' as const },
    footerLink: { color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: 500, transition: 'color 0.2s' } as React.CSSProperties,
    toolTag: { fontSize: '11px', padding: '2px 8px', background: '#eff6ff', color: '#2563eb', borderRadius: '4px', fontWeight: 500 },
    achievementItem: { padding: '14px 18px', background: '#f8faff', borderRadius: '8px', borderLeft: '3px solid #2563eb' },
    hobbyTag: { padding: '6px 16px', background: '#eff6ff', color: '#2563eb', borderRadius: '16px', fontSize: '12px', fontWeight: 500 },
    experienceItem: { padding: '20px', background: '#ffffff', borderRadius: '10px', border: '1px solid #eef2f6', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' },
  };

  return (
    <div id="portfolio-preview-content" style={s.root}>
      <style>{`
        html { scroll-behavior: smooth; }
        @media print {
          body { background: #fff !important; }
          #portfolio-preview-content { padding: 0 !important; }
          section { page-break-inside: avoid; }
        }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .metro-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .metro-card:hover { transform: translateY(-6px); box-shadow: 0 16px 32px -8px rgba(37,99,235,0.12); }
        .metro-tag:hover { background: #2563eb !important; color: #fff !important; }
        .project-grid { columns: 2; column-gap: 20px; }
        @media (max-width: 768px) { .project-grid { columns: 1; } }
        a { transition: color 0.2s; }
        footer a:hover { color: #60a5fa !important; }
      `}</style>

      <section style={s.hero}>
        <div style={s.heroBg} />
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1, animation: 'fadeInUp 0.6s ease' }}>
          {userData.profileImage && (
            <img src={userData.profileImage} alt={userData.fullName} style={s.profileImg} />
          )}
          <h1 style={s.heroName}>{userData.fullName || 'Your Name'}</h1>
          <p style={s.heroRole}>{userData.role || 'Your Role'}</p>
          {userData.portfolioHero && <p style={s.heroTagline}>{userData.portfolioHero}</p>}
        </div>
      </section>

      {sectionVisibility?.summary !== false && userData.summary && (
        <section id="about" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>About</h2>
            <div style={{ maxWidth: '800px' }}>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#475569', margin: 0 }}>{userData.summary}</p>
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.skills !== false && allSkills.length > 0 && (
        <section id="skills" style={s.sectionAlt}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: activeSkill ? '12px' : 0 }}>
              {allSkills.map((skill, i) => (
                <span
                  key={i}
                  className="metro-tag"
                  style={activeSkill === skill ? s.tagActive : s.tag}
                  onClick={() => setActiveSkill(activeSkill === skill ? null : skill)}
                >
                  {skill}
                </span>
              ))}
            </div>
            {activeSkill && (
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                Showing projects using <strong style={{ color: '#2563eb' }}>{activeSkill}</strong> — <span style={{ cursor: 'pointer', color: '#2563eb', textDecoration: 'underline' }} onClick={() => setActiveSkill(null)}>Clear filter</span>
              </p>
            )}
          </div>
        </section>
      )}

      {sectionVisibility?.projects !== false && filteredProjects.length > 0 && (
        <section id="projects" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Projects</h2>
            <div className="project-grid">
              {filteredProjects.map((proj, i) => (
                <article key={i} className="metro-card" style={s.projectCard}>
                  {proj.images && proj.images[0] && (
                    <img src={proj.images[0]} alt={proj.title} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                  )}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>{proj.title}</h3>
                    {proj.tools && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                        {proj.tools.split(',').map((t, ti) => (
                          <span key={ti} style={s.toolTag}>{t.trim()}</span>
                        ))}
                      </div>
                    )}
                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, margin: 0 }}>{proj.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.experience !== false && userData.experience && userData.experience.length > 0 && (
        <section id="experience" style={s.sectionAlt}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Experience</h2>
            <div style={{ position: 'relative', paddingLeft: '36px' }}>
              <div style={s.timelineLine} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {userData.experience.map((exp, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flexStart' }}>
                    <div style={s.timelineDot} />
                    <div style={s.experienceItem}>
                      <div style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>{exp.role}</h3>
                        <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 500 }}>{exp.duration}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, margin: '0 0 8px' }}>{exp.organization}</p>
                      <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.education !== false && userData.education && userData.education.length > 0 && (
        <section id="education" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Education</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {userData.education.map((edu, i) => (
                <div key={i} style={s.eduCard}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>{edu.degree}</h3>
                  <p style={{ fontSize: '14px', color: '#2563eb', fontWeight: 600, margin: '0 0 2px' }}>{edu.institution}</p>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 2px' }}>{edu.field}</p>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{edu.startYear} – {edu.endYear}{edu.grade ? ` | ${edu.grade}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.achievements !== false && userData.achievements && userData.achievements.length > 0 && (
        <section id="achievements" style={s.sectionAlt}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Achievements</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {userData.achievements.map((a, i) => (
                <div key={i} style={s.achievementItem}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', margin: '0 0 2px' }}>{a.title}</p>
                  {a.description && <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>{a.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.hobbies !== false && userData.hobbies && userData.hobbies.length > 0 && (
        <section id="hobbies" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Interests</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {userData.hobbies.map((h, i) => (
                <span key={i} style={s.hobbyTag}>{h}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer style={s.contact}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 4px' }}>Let's Connect</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 20px' }}>Available for opportunities</p>
          {userData.email && <p style={{ fontSize: '15px', margin: '0 0 4px', color: '#93c5fd' }}>{userData.email}</p>}
          {userData.phone && <p style={{ fontSize: '15px', margin: '0 0 4px', color: '#94a3b8' }}>{userData.phone}</p>}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '20px' }}>
            {userData.links?.github && <a href={userData.links.github} target="_blank" rel="noopener noreferrer" style={s.footerLink}>GitHub</a>}
            {userData.links?.linkedin && <a href={userData.links.linkedin} target="_blank" rel="noopener noreferrer" style={s.footerLink}>LinkedIn</a>}
            {userData.links?.portfolio && <a href={userData.links.portfolio} target="_blank" rel="noopener noreferrer" style={s.footerLink}>Website</a>}
          </div>
        </div>
      </footer>
    </div>
  );
}

```


---

## File: `client/src/components/preview/PortfolioMinimal.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";

export function PortfolioMinimal() {
  const { userData, sectionVisibility } = useBuilder();

  const s = {
    root: { fontFamily: "'Lato', system-ui, sans-serif", background: '#ffffff', color: '#111111', minHeight: '100vh' },
    inner: { maxWidth: '800px', margin: '0 auto', width: '100%' },
    section: { padding: '120px 40px' } as React.CSSProperties,
    sectionBorder: { padding: '120px 40px', borderTop: '1px solid #eee' } as React.CSSProperties,
    hero: { padding: '140px 40px 100px', textAlign: 'center' as const, maxWidth: '700px', margin: '0 auto' },
    displayText: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 4vw, 42px)', fontStyle: 'italic', fontWeight: 400, color: '#111', lineHeight: 1.4, letterSpacing: '-0.3px' } as React.CSSProperties,
    displayLarge: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 400, color: '#111', lineHeight: 1, letterSpacing: '-2px', margin: '0 0 24px' },
    role: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(20px, 3vw, 32px)', fontStyle: 'italic', fontWeight: 400, color: '#999', margin: '0 0 32px' },
    subtitle: { fontSize: '14px', color: '#999', fontWeight: 400, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 12px' },
    body: { fontSize: '15px', lineHeight: 1.8, color: '#444', margin: 0, maxWidth: '600px' },
    heading: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 400, color: '#111', margin: '0 0 32px', lineHeight: 1.15 },
    headingSmall: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 400, fontStyle: 'italic', color: '#999', margin: '0 0 16px' },
    smallText: { fontSize: '12px', color: '#bbb', letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 32px' },
    line: { width: '40px', height: '1px', background: '#ddd', marginBottom: '32px' },
    tag: { fontSize: '13px', color: '#777', border: '1px solid #e0e0e0', padding: '6px 16px', borderRadius: '0', fontWeight: 400, letterSpacing: '0.5px' },
    projectCard: { borderBottom: '1px solid #f0f0f0', paddingBottom: '32px', marginBottom: '32px' } as React.CSSProperties,
    projectTitle: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 400, color: '#111', margin: '0 0 8px' },
    eduItem: { borderBottom: '1px solid #f0f0f0', paddingBottom: '24px', marginBottom: '24px' } as React.CSSProperties,
    expItem: { borderBottom: '1px solid #f0f0f0', paddingBottom: '24px', marginBottom: '24px' } as React.CSSProperties,
    achievementItem: { borderBottom: '1px solid #f0f0f0', paddingBottom: '16px', marginBottom: '16px' } as React.CSSProperties,
    hobbyTag: { fontSize: '13px', color: '#888', border: '1px solid #eee', padding: '8px 20px', borderRadius: '0', fontWeight: 400 },
    contact: { padding: '100px 40px', textAlign: 'center' as const, borderTop: '1px solid #eee' } as React.CSSProperties,
    footerLink: { fontSize: '13px', color: '#999', textDecoration: 'none', letterSpacing: '1px', textTransform: 'uppercase' as const, fontWeight: 400, transition: 'color 0.2s' } as React.CSSProperties,
    toolTag: { fontSize: '11px', color: '#aaa', letterSpacing: '0.5px' },
  };

  return (
    <div id="portfolio-preview-content" style={s.root}>
      <style>{`
        html { scroll-behavior: smooth; }
        @media print {
          body { background: #fff !important; }
          section { page-break-inside: avoid; }
        }
        @keyframes minimalFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes minimalReveal { 0% { opacity: 0; } 100% { opacity: 1; } }
        .minimal-fade { animation: minimalFade 0.8s ease forwards; opacity: 0; }
        .minimal-fade:nth-child(1) { animation-delay: 0s; }
        .minimal-fade:nth-child(2) { animation-delay: 0.15s; }
        .minimal-fade:nth-child(3) { animation-delay: 0.3s; }
        a { transition: color 0.2s ease; }
        a:hover { color: #111 !important; }
        .minimal-link { transition: color 0.2s ease; }
        .minimal-link:hover { color: #111 !important; }
        @media (max-width: 600px) {
          section { padding: 60px 24px !important; }
        }
      `}</style>

      <section style={s.hero}>
        <div style={{ animation: 'minimalFade 0.8s ease' }}>
          <p style={s.subtitle}>{userData.role || 'Your Role'}</p>
          <h1 style={s.displayLarge}>{userData.fullName || 'Your Name'}</h1>
          {(userData.portfolioHero || userData.summary) && (
            <p style={s.displayText}>
              &ldquo;{userData.portfolioHero || userData.summary}&rdquo;
            </p>
          )}
        </div>
      </section>

      {sectionVisibility?.summary !== false && userData.summary && (
        <section id="about" style={s.section}>
          <div style={s.inner}>
            <p style={s.smallText}>About</p>
            <div style={s.line} />
            <p style={s.body}>{userData.summary}</p>
          </div>
        </section>
      )}

      {sectionVisibility?.skills !== false && userData.skills && userData.skills.length > 0 && (
        <section id="skills" style={s.sectionBorder}>
          <div style={s.inner}>
            <p style={s.smallText}>Skills</p>
            <div style={s.line} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {userData.skills.map((skill, i) => (
                <span key={i} style={s.tag}>{skill}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.experience !== false && userData.experience && userData.experience.length > 0 && (
        <section id="experience" style={s.section}>
          <div style={s.inner}>
            <p style={s.smallText}>Experience</p>
            <div style={s.line} />
            <div style={{ maxWidth: '600px' }}>
              {userData.experience.map((exp, i) => (
                <div key={i} style={s.expItem}>
                  <div style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 400, color: '#111', margin: '0 0 2px' }}>{exp.role}</h3>
                    <span style={{ fontSize: '12px', color: '#bbb', letterSpacing: '1px' }}>{exp.duration}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#888', margin: '0 0 10px', letterSpacing: '0.5px' }}>{exp.organization}</p>
                  <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.7, margin: 0 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.projects !== false && userData.projects && userData.projects.length > 0 && (
        <section id="projects" style={s.sectionBorder}>
          <div style={s.inner}>
            <p style={s.smallText}>Projects</p>
            <div style={s.line} />
            <div style={{ maxWidth: '600px' }}>
              {userData.projects.map((proj, i) => (
                <div key={i} style={s.projectCard}>
                  <h3 style={s.projectTitle}>{proj.title}</h3>
                  {proj.tools && (
                    <p style={{ ...s.toolTag, margin: '0 0 8px' }}>{proj.tools}</p>
                  )}
                  <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.7, margin: 0 }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.education !== false && userData.education && userData.education.length > 0 && (
        <section id="education" style={s.section}>
          <div style={s.inner}>
            <p style={s.smallText}>Education</p>
            <div style={s.line} />
            <div style={{ maxWidth: '500px' }}>
              {userData.education.map((edu, i) => (
                <div key={i} style={s.eduItem}>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 400, color: '#111', margin: '0 0 2px' }}>{edu.degree}</h3>
                  <p style={{ fontSize: '13px', color: '#888', margin: '0 0 2px' }}>{edu.institution}</p>
                  <p style={{ fontSize: '12px', color: '#aaa', margin: 0 }}>{edu.field} &middot; {edu.startYear}–{edu.endYear}{edu.grade ? ` &middot; ${edu.grade}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.achievements !== false && userData.achievements && userData.achievements.length > 0 && (
        <section id="achievements" style={s.sectionBorder}>
          <div style={s.inner}>
            <p style={s.smallText}>Achievements</p>
            <div style={s.line} />
            <div style={{ maxWidth: '500px' }}>
              {userData.achievements.map((a, i) => (
                <div key={i} style={s.achievementItem}>
                  <p style={{ fontSize: '15px', fontWeight: 400, color: '#111', margin: '0 0 2px' }}>{a.title}</p>
                  {a.description && <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.5, margin: 0 }}>{a.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.hobbies !== false && userData.hobbies && userData.hobbies.length > 0 && (
        <section id="hobbies" style={s.section}>
          <div style={s.inner}>
            <p style={s.smallText}>Interests</p>
            <div style={s.line} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {userData.hobbies.map((h, i) => (
                <span key={i} style={s.hobbyTag}>{h}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer style={s.contact}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          {userData.email && <p style={{ fontSize: '14px', color: '#777', margin: '0 0 4px' }}>{userData.email}</p>}
          {userData.phone && <p style={{ fontSize: '14px', color: '#999', margin: '0 0 24px' }}>{userData.phone}</p>}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px' }}>
            {userData.links?.github && <a href={userData.links.github} target="_blank" rel="noopener noreferrer" className="minimal-link" style={s.footerLink}>GitHub</a>}
            {userData.links?.linkedin && <a href={userData.links.linkedin} target="_blank" rel="noopener noreferrer" className="minimal-link" style={s.footerLink}>LinkedIn</a>}
            {userData.links?.portfolio && <a href={userData.links.portfolio} target="_blank" rel="noopener noreferrer" className="minimal-link" style={s.footerLink}>Website</a>}
          </div>
        </div>
      </footer>
    </div>
  );
}

```


---

## File: `client/src/components/preview/PortfolioNeon.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";
import { useEffect, useRef } from "react";

function GlitchText({ text }: { text: string }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', animation: 'glitchAnim 3s infinite' }}>
      {text}
      <style>{`
        @keyframes glitchAnim {
          0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          20% { clip-path: inset(30% 0 50% 0); transform: translate(-4px, 2px); }
          40% { clip-path: inset(60% 0 20% 0); transform: translate(4px, -2px); }
          60% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, 4px); }
          80% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -4px); }
        }
      `}</style>
    </span>
  );
}

function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.98 ? '#fff' : '#00ff0044';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} />;
}

export function PortfolioNeon() {
  const { userData } = useBuilder();

  const neonPink = '#ff00ff';
  const neonCyan = '#00ffff';

  return (
    <div id="portfolio-preview-content" style={{ fontFamily: "'Rajdhani', 'Orbitron', system-ui, sans-serif", background: '#0a0a0f', color: '#fff', minHeight: '100vh', position: 'relative' }}>
      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '48px', position: 'relative', overflow: 'hidden' }}>
        <MatrixCanvas />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: '64px', fontWeight: 700, margin: '0 0 8px', letterSpacing: '0.05em' }}>
            <GlitchText text={userData.fullName || "Your Name"} />
          </h1>
          <p style={{
            fontSize: '22px',
            fontWeight: 600,
            margin: '0 0 24px',
            background: `linear-gradient(90deg, ${neonPink}, ${neonCyan}, ${neonPink})`,
            backgroundSize: '400% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'rainbowShift 4s linear infinite',
          }}>
            {userData.role || "Your Role"}
          </p>
          <p style={{ fontSize: '16px', color: '#888', maxWidth: '500px', lineHeight: 1.6, margin: '0 auto' }}>
            {userData.portfolioHero || userData.summary || "Full-stack developer & creative technologist"}
          </p>
        </div>
        <style>{`
          @keyframes rainbowShift {
            0% { background-position: 0% 50%; }
            100% { background-position: 400% 50%; }
          }
        `}</style>
      </section>

      {/* Projects */}
      {userData.projects && userData.projects.length > 0 && (
        <section style={{ padding: '80px 48px', borderTop: `1px solid ${neonPink}22` }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 40px', color: neonCyan, letterSpacing: '0.08em' }}>./projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '24px' }}>
              {userData.projects.map((p, i) => (
                <article key={i} style={{ border: `1px solid ${neonPink}33`, padding: '24px', borderRadius: '4px', background: 'rgba(255,0,255,0.03)', transition: 'box-shadow 0.3s, transform 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 20px ${neonPink}66`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                >
                  <p style={{ fontSize: '12px', color: neonCyan, fontFamily: "'Courier New', monospace", margin: '0 0 12px' }}>
                    $ open project --name "{p.title}"
                  </p>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 8px', color: '#fff' }}>{p.title}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                    {p.tools.split(',').map((t, ti) => (
                      <span key={ti} style={{ fontSize: '11px', color: neonPink, border: `1px solid ${neonPink}44`, padding: '1px 8px', borderRadius: '2px', fontFamily: "'Courier New', monospace" }}>{t.trim()}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '13px', color: '#aaa', lineHeight: 1.5, margin: 0 }}>{p.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {userData.skills && userData.skills.length > 0 && (
        <section style={{ padding: '80px 48px', borderTop: `1px solid ${neonPink}22` }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 40px', color: neonCyan, letterSpacing: '0.08em' }}>./skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {userData.skills.map((s, i) => (
                <span key={i} style={{ fontSize: '13px', padding: '6px 16px', border: `1px solid ${i % 2 === 0 ? neonPink : neonCyan}44`, color: i % 2 === 0 ? neonPink : neonCyan, borderRadius: '2px', fontFamily: "'Courier New', monospace" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section style={{ padding: '80px 48px', borderTop: `1px solid ${neonPink}22`, position: 'relative', overflow: 'hidden', minHeight: '300px' }}>
        <MatrixCanvas />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 24px', color: neonCyan, letterSpacing: '0.08em' }}>./contact</h2>
          {userData.email && (
            <p style={{ fontSize: '18px', color: neonPink, margin: '0 0 8px', fontFamily: "'Courier New', monospace" }}>
              $ echo "{userData.email}"
            </p>
          )}
          {userData.phone && <p style={{ fontSize: '16px', color: '#aaa', margin: '0 0 16px' }}>{userData.phone}</p>}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            {userData.links?.github && <a href={userData.links.github} style={{ color: neonCyan, fontSize: '14px', textDecoration: 'none' }}>[github]</a>}
            {userData.links?.linkedin && <a href={userData.links.linkedin} style={{ color: neonCyan, fontSize: '14px', textDecoration: 'none' }}>[linkedin]</a>}
          </div>
        </div>
      </section>
    </div>
  );
}

```


---

## File: `client/src/components/preview/PortfolioPreview.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";

export function PortfolioPreview() {
  const { userData } = useBuilder();

  return (
    <div id="portfolio-preview-content" className="bg-white min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {userData.profileImage && (
            <img
              src={userData.profileImage}
              alt={userData.fullName}
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-xl"
            />
          )}
          <h1 className="text-5xl font-bold mb-4">
            {userData.fullName || "Your Name"}
          </h1>
          <p className="text-2xl mb-6 text-blue-100">
            {userData.role || "Your Role"}
          </p>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto text-blue-50">
            {userData.portfolioHero || userData.summary || "Welcome to my portfolio"}
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            {userData.email && (
              <a href={`mailto:${userData.email}`} className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
                Contact Me
              </a>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            About Me
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {userData.summary || "Tell us about yourself..."}
          </p>
          <div className="mt-8 flex items-center justify-center gap-6 text-gray-600">
            {userData.email && <span>{userData.email}</span>}
            {userData.phone && <span>•</span>}
            {userData.phone && <span>{userData.phone}</span>}
          </div>
          {userData.links && (
            <div className="flex items-center justify-center gap-6 mt-4">
              {userData.links.github && (
                <a href={userData.links.github} className="text-blue-600 hover:underline">
                  GitHub
                </a>
              )}
              {userData.links.linkedin && (
                <a href={userData.links.linkedin} className="text-blue-600 hover:underline">
                  LinkedIn
                </a>
              )}
              {userData.links.portfolio && (
                <a href={userData.links.portfolio} className="text-blue-600 hover:underline">
                  Portfolio
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      {userData.skills && userData.skills.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 bg-blue-50 text-blue-700 rounded-lg text-center font-semibold"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {userData.projects && userData.projects.length > 0 && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {userData.projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  {project.images && project.images.length > 0 && (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-blue-600 mb-3 font-medium">
                      {project.tools}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {project.description}
                    </p>
                    {project.images && project.images.length > 1 && (
                      <div className="grid grid-cols-3 gap-2">
                        {project.images.slice(1, 4).map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img}
                            alt={`${project.title} screenshot ${imgIndex + 2}`}
                            className="w-full h-20 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {userData.hasExperience && userData.experience && userData.experience.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Experience
            </h2>
            <div className="space-y-6">
              {userData.experience.map((exp, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {exp.role}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {exp.organization}
                      </p>
                    </div>
                    <span className="text-gray-600 text-sm">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements Section */}
      {userData.achievements && Array.isArray(userData.achievements) && userData.achievements.length > 0 && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Achievements & Certifications
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {userData.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {achievement.title}
                  </h3>
                  {achievement.description && (
                    <p className="text-gray-700">
                      {achievement.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {userData.education && userData.education.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Education
            </h2>
            <div className="space-y-6">
              {userData.education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-right text-gray-600">
                      <p>{edu.startYear} - {edu.endYear}</p>
                      {edu.grade && (
                        <p className="font-semibold">{edu.grade}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Let's Work Together
          </h2>
          <p className="text-lg mb-8 text-blue-50">
            I'm always open to discussing new projects and opportunities
          </p>
          <div className="flex items-center justify-center gap-6">
            {userData.email && (
              <a
                href={`mailto:${userData.email}`}
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Get in Touch
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

```


---

## File: `client/src/components/preview/PortfolioSimple.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";

export function PortfolioSimple() {
  const { userData, sectionVisibility } = useBuilder();

  const s = {
    root: { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: '#f8fafc', minHeight: '100vh', color: '#0f172a' },
    nav: { position: 'sticky', top: 0, zIndex: 50, background: 'rgba(248,250,252,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #e2e8f0', padding: '0 24px' } as React.CSSProperties,
    navInner: { maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' } as React.CSSProperties,
    navName: { fontWeight: 700, fontSize: '18px', color: '#0d9488', letterSpacing: '-0.3px' },
    navLinks: { display: 'flex', gap: '24px', fontSize: '13px', fontWeight: 500 },
    navLink: { color: '#475569', textDecoration: 'none', transition: 'color 0.2s' } as React.CSSProperties,
    section: { padding: '80px 24px' },
    sectionAlt: { padding: '80px 24px', background: '#ffffff' },
    inner: { maxWidth: '1000px', margin: '0 auto', width: '100%' },
    hero: { padding: '120px 24px 80px', background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)', textAlign: 'center' as const },
    heroName: { fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-1.5px', lineHeight: 1.1 },
    heroRole: { fontSize: 'clamp(18px, 2.5vw, 24px)', color: '#0d9488', fontWeight: 600, margin: '0 0 16px' },
    heroTagline: { fontSize: '15px', color: '#64748b', lineHeight: 1.6, margin: '0 auto', maxWidth: '560px' },
    card: { background: '#ffffff', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' },
    heading: { fontSize: '24px', fontWeight: 700, color: '#0f172a', margin: '0 0 24px', letterSpacing: '-0.5px' },
    headingAccent: { display: 'inlineBlock', width: '40px', height: '3px', background: '#0d9488', borderRadius: '2px', marginBottom: '16px' },
    tag: { padding: '6px 16px', background: '#f0fdfa', color: '#0d9488', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: '1px solid #ccfbf1' },
    projectCard: { background: '#ffffff', borderRadius: '12px', padding: '24px', borderLeft: '4px solid #0d9488', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' } as React.CSSProperties,
    timelineDot: { width: '12px', height: '12px', borderRadius: '50%', background: '#0d9488', flexShrink: 0, marginTop: '4px' },
    contact: { padding: '80px 24px', background: '#0f172a', color: '#f8fafc', textAlign: 'center' as const },
    footerLink: { color: '#94a3b8', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' } as React.CSSProperties,
    achievementItem: { padding: '16px 20px', background: '#f8fafc', borderRadius: '10px', borderLeft: '3px solid #0d9488' },
    hobbyTag: { padding: '8px 18px', background: '#ffffff', color: '#0d9488', borderRadius: '20px', fontSize: '13px', fontWeight: 500, border: '1.5px solid #ccfbf1' },
    eduCard: { background: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' },
    experienceCard: { background: '#ffffff', borderRadius: '12px', padding: '24px', borderLeft: '4px solid #0d9488', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' } as React.CSSProperties,
    profileImg: { width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' as const, margin: '0 auto 20px', border: '4px solid #ccfbf1', boxShadow: '0 4px 20px rgba(13,148,136,0.15)' },
  };

  const navItems = [
    ...(sectionVisibility?.summary !== false && userData.summary ? [{ key: 'about', label: 'About' }] : []),
    ...(sectionVisibility?.skills !== false && userData.skills?.length ? [{ key: 'skills', label: 'Skills' }] : []),
    ...(sectionVisibility?.experience !== false && userData.experience?.length ? [{ key: 'experience', label: 'Experience' }] : []),
    ...(sectionVisibility?.projects !== false && userData.projects?.length ? [{ key: 'projects', label: 'Projects' }] : []),
    ...(sectionVisibility?.education !== false && userData.education?.length ? [{ key: 'education', label: 'Education' }] : []),
  ];

  return (
    <div id="portfolio-preview-content" style={s.root}>
      <style>{`
        html { scroll-behavior: smooth; }
        @media print {
          body { background: #fff !important; }
          nav { display: none !important; }
          #portfolio-preview-content { padding: 0 !important; }
        }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .coastal-fade { animation: fadeInUp 0.6s ease forwards; opacity: 0; }
        .coastal-fade:nth-child(2) { animation-delay: 0.1s; }
        .coastal-fade:nth-child(3) { animation-delay: 0.2s; }
        .coastal-fade:nth-child(4) { animation-delay: 0.3s; }
        a { transition: color 0.2s; }
        nav a:hover { color: #0d9488 !important; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
        }
      `}</style>

      <nav style={s.nav}>
        <div style={s.navInner}>
          <span style={s.navName}>{userData.fullName || 'Portfolio'}</span>
          <div className="nav-links" style={s.navLinks}>
            {navItems.map(item => (
              <a key={item.key} href={`#${item.key}`} style={s.navLink}>{item.label}</a>
            ))}
          </div>
        </div>
      </nav>

      <section style={s.hero}>
        <div style={{ maxWidth: '700px', margin: '0 auto', animation: 'fadeInUp 0.6s ease' }}>
          {userData.profileImage && (
            <img src={userData.profileImage} alt={userData.fullName} style={s.profileImg} />
          )}
          <h1 style={s.heroName}>{userData.fullName || 'Your Name'}</h1>
          <p style={s.heroRole}>{userData.role || 'Your Role'}</p>
          {(userData.portfolioHero || userData.summary) && (
            <p style={s.heroTagline}>{userData.portfolioHero || userData.summary}</p>
          )}
        </div>
      </section>

      {sectionVisibility?.summary !== false && userData.summary && (
        <section id="about" style={s.section}>
          <div style={s.inner}>
            <div style={s.card}>
              <div style={s.headingAccent} />
              <h2 style={s.heading}>About</h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#475569', margin: 0 }}>{userData.summary}</p>
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.skills !== false && userData.skills && userData.skills.length > 0 && (
        <section id="skills" style={s.sectionAlt}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {userData.skills.map((skill, i) => (
                <span key={i} style={s.tag}>{skill}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.experience !== false && userData.experience && userData.experience.length > 0 && (
        <section id="experience" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Experience</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {userData.experience.map((exp, i) => (
                <div key={i} style={s.experienceCard}>
                  <div style={{ display: 'flex', alignItems: 'flexStart', gap: '12px' }}>
                    <div style={s.timelineDot} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>{exp.role}</h3>
                        <span style={{ fontSize: '12px', color: '#0d9488', fontWeight: 500 }}>{exp.duration}</span>
                      </div>
                      <p style={{ fontSize: '14px', color: '#0d9488', fontWeight: 600, margin: '0 0 8px' }}>{exp.organization}</p>
                      <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.projects !== false && userData.projects && userData.projects.length > 0 && (
        <section id="projects" style={s.sectionAlt}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Projects</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {userData.projects.map((proj, i) => (
                <div key={i} style={s.projectCard}>
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {proj.images && proj.images[0] && (
                      <img src={proj.images[0]} alt={proj.title} style={{ width: '180px', height: '120px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>{proj.title}</h3>
                      {proj.tools && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                          {proj.tools.split(',').map((t, ti) => (
                            <span key={ti} style={{ fontSize: '11px', padding: '2px 10px', background: '#f0fdfa', color: '#0d9488', borderRadius: '4px', fontWeight: 500 }}>{t.trim()}</span>
                          ))}
                        </div>
                      )}
                      <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0 }}>{proj.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.education !== false && userData.education && userData.education.length > 0 && (
        <section id="education" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Education</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {userData.education.map((edu, i) => (
                <div key={i} style={s.eduCard}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>{edu.degree}</h3>
                  <p style={{ fontSize: '14px', color: '#0d9488', fontWeight: 600, margin: '0 0 4px' }}>{edu.institution}</p>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 2px' }}>{edu.field}</p>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{edu.startYear} – {edu.endYear}{edu.grade ? ` | ${edu.grade}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.achievements !== false && userData.achievements && userData.achievements.length > 0 && (
        <section id="achievements" style={s.sectionAlt}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Achievements</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {userData.achievements.map((a, i) => (
                <div key={i} style={s.achievementItem}>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', margin: '0 0 4px' }}>{a.title}</p>
                  {a.description && <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>{a.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.hobbies !== false && userData.hobbies && userData.hobbies.length > 0 && (
        <section id="hobbies" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Interests & Hobbies</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {userData.hobbies.map((h, i) => (
                <span key={i} style={s.hobbyTag}>{h}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer style={s.contact}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#f8fafc', margin: '0 0 8px' }}>Get in Touch</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 24px', lineHeight: 1.6 }}>Let's create something together</p>
          {userData.email && <p style={{ fontSize: '16px', margin: '0 0 6px', color: '#5eead4' }}>{userData.email}</p>}
          {userData.phone && <p style={{ fontSize: '16px', margin: '0 0 6px', color: '#94a3b8' }}>{userData.phone}</p>}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
            {userData.links?.github && <a href={userData.links.github} target="_blank" rel="noopener noreferrer" style={s.footerLink}>GitHub</a>}
            {userData.links?.linkedin && <a href={userData.links.linkedin} target="_blank" rel="noopener noreferrer" style={s.footerLink}>LinkedIn</a>}
            {userData.links?.portfolio && <a href={userData.links.portfolio} target="_blank" rel="noopener noreferrer" style={s.footerLink}>Portfolio</a>}
          </div>
        </div>
      </footer>
    </div>
  );
}

```


---

## File: `client/src/components/preview/PortfolioStudio.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";
import { useRef, useEffect } from "react";

function Marquee({ text }: { text: string }) {
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>
      <div style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: 'marquee 20s linear infinite' }}>
        <span>{text}</span>
        <span style={{ marginLeft: '0' }}>{text}</span>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export function PortfolioStudio() {
  const { userData } = useBuilder();

  const accentColor = '#ff6b35';

  return (
    <div id="portfolio-preview-content" style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif", background: '#080808', color: '#fff', minHeight: '100vh' }}>
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 48px', position: 'relative' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
          <h1 style={{ fontSize: '72px', fontWeight: 700, lineHeight: 1.05, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
            {userData.fullName || "Your Name"}
          </h1>
          <p style={{ fontSize: '18px', color: '#999', fontStyle: 'italic', margin: '0 0 40px' }}>
            {userData.role || "Your Role"}
          </p>
          <p style={{ fontSize: '16px', color: '#ccc', maxWidth: '600px', lineHeight: 1.6, margin: 0 }}>
            {userData.portfolioHero || userData.summary || "Building exceptional digital experiences"}
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: '40px', left: 0, right: 0, color: accentColor, fontSize: '13px', letterSpacing: '0.1em' }}>
          <Marquee text="AVAILABLE FOR WORK · OPEN TO OPPORTUNITIES · LET'S BUILD SOMETHING · " />
        </div>
      </section>

      {userData.summary && (
        <section style={{ padding: '80px 48px', borderTop: '1px solid #1a1a1a' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '60px', alignItems: 'flex-start' }}>
            {userData.profileImage && (
              <div style={{ width: '300px', flexShrink: 0 }}>
                <img
                  src={userData.profileImage}
                  alt={userData.fullName}
                  style={{ width: '100%', borderRadius: '4px', transform: 'rotate(-2deg)', transition: 'transform 0.3s ease', display: 'block' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'rotate(0deg)'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'rotate(-2deg)'; }}
                />
              </div>
            )}
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '28px', fontWeight: 600, margin: '0 0 20px', color: accentColor }}>About</h2>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#bbb', margin: 0 }}>{userData.summary}</p>
            </div>
          </div>
        </section>
      )}

      {userData.projects && userData.projects.length > 0 && (
        <section style={{ padding: '80px 48px', borderTop: '1px solid #1a1a1a' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, margin: '0 0 48px', color: accentColor }}>Work</h2>
            {userData.projects.map((p, i) => (
              <article key={i} style={{ display: 'flex', gap: '40px', marginBottom: '60px', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }}>
                {p.images && p.images[0] && (
                  <div style={{ flex: 1 }}>
                    <img src={p.images[0]} alt={p.title} style={{ width: '100%', borderRadius: '4px', display: 'block' }} />
                  </div>
                )}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 8px', color: '#fff' }}>{p.title}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                    {p.tools.split(',').map((t, ti) => (
                      <span key={ti} style={{ fontSize: '11px', color: accentColor, border: `1px solid ${accentColor}33`, padding: '2px 10px', borderRadius: '2px' }}>{t.trim()}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#bbb', margin: 0 }}>{p.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {userData.skills && userData.skills.length > 0 && (
        <section style={{ padding: '80px 48px', borderTop: '1px solid #1a1a1a' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, margin: '0 0 32px', color: accentColor }}>Skills</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
              {userData.skills.map((s, i) => (
                <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid #1a1a1a', fontSize: '14px', color: '#ccc' }}>{s}</div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: '120px 48px', borderTop: '1px solid #1a1a1a', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '64px', fontWeight: 700, margin: '0 0 16px', color: '#fff' }}>Let's Talk</h2>
          {userData.email && (
            <a href={`mailto:${userData.email}`} style={{ fontSize: '20px', color: accentColor, textDecoration: 'none', display: 'block', marginBottom: '12px' }}>
              {userData.email}
            </a>
          )}
          {userData.phone && <p style={{ fontSize: '16px', color: '#999', margin: 0 }}>{userData.phone}</p>}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
            {userData.links?.github && <a href={userData.links.github} style={{ color: '#ccc', fontSize: '14px', textDecoration: 'none' }}>GitHub</a>}
            {userData.links?.linkedin && <a href={userData.links.linkedin} style={{ color: '#ccc', fontSize: '14px', textDecoration: 'none' }}>LinkedIn</a>}
          </div>
        </div>
      </section>
    </div>
  );
}

```


---

## File: `client/src/components/preview/PortfolioTerminal.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";
import { useState, useEffect, useRef } from "react";

interface Line {
  text: string;
  type: 'system' | 'command' | 'output' | 'input' | 'prompt';
}

function buildAutoPlayLines(userData: ReturnType<typeof useBuilder>['userData']): Line[] {
  const lines: Line[] = [];
  const name = userData.fullName || "Your Name";
  const role = userData.role || "Your Role";

  lines.push({ text: `whoami`, type: 'command' });
  lines.push({ text: `${name} — ${role}`, type: 'output' });

  if (userData.summary) {
    lines.push({ text: `cat about.txt`, type: 'command' });
    lines.push({ text: userData.summary, type: 'output' });
  }

  if (userData.skills && userData.skills.length > 0) {
    lines.push({ text: `ls skills/`, type: 'command' });
    lines.push({ text: userData.skills.join('  '), type: 'output' });
  }

  if (userData.experience && userData.experience.length > 0) {
    lines.push({ text: `cat experience.md`, type: 'command' });
    userData.experience.forEach(e => {
      lines.push({ text: `  ${e.role} @ ${e.organization} (${e.duration})`, type: 'output' });
      lines.push({ text: `  ${e.description}`, type: 'output' });
    });
  }

  if (userData.projects && userData.projects.length > 0) {
    lines.push({ text: `ls projects/`, type: 'command' });
    userData.projects.forEach(p => {
      lines.push({ text: `  ${p.title}/`, type: 'output' });
    });
    lines.push({ text: `cat projects/README.md`, type: 'command' });
    userData.projects.forEach(p => {
      lines.push({ text: `${p.title} — ${p.tools}`, type: 'output' });
      lines.push({ text: `  ${p.description}`, type: 'output' });
    });
  }

  if (userData.email || userData.links) {
    lines.push({ text: `echo "Contact me:"`, type: 'command' });
    const contact = [userData.email, userData.links?.github, userData.links?.linkedin].filter(Boolean).join(' | ');
    lines.push({ text: contact, type: 'output' });
  }

  return lines;
}

const commandResponses: Record<string, (userData: ReturnType<typeof useBuilder>['userData']) => Line[]> = {
  help: () => [
    { text: 'Available commands:', type: 'output' },
    { text: '  whoami      — Display name and role', type: 'output' },
    { text: '  skills      — List technical skills', type: 'output' },
    { text: '  projects    — List project titles', type: 'output' },
    { text: '  contact     — Show contact info', type: 'output' },
    { text: '  experience  — Show work experience', type: 'output' },
    { text: '  clear       — Clear terminal', type: 'output' },
    { text: '  help        — Show this message', type: 'output' },
  ],
  whoami: (u) => [{ text: `${u.fullName || "Your Name"} — ${u.role || "Your Role"}`, type: 'output' as const }],
  skills: (u) => u.skills && u.skills.length > 0
    ? [{ text: u.skills.join(', '), type: 'output' as const }]
    : [{ text: 'No skills listed.', type: 'output' as const }],
  projects: (u) => u.projects && u.projects.length > 0
    ? u.projects.map(p => ({ text: p.title, type: 'output' as const }))
    : [{ text: 'No projects listed.', type: 'output' as const }],
  contact: (u) => {
    const parts = [u.email, u.links?.github, u.links?.linkedin].filter(Boolean);
    return parts.length > 0
      ? parts.map(p => ({ text: p || '', type: 'output' as const }))
      : [{ text: 'No contact info.', type: 'output' as const }];
  },
  experience: (u) => u.experience && u.experience.length > 0
    ? u.experience.flatMap(e => [
        { text: `${e.role} @ ${e.organization} (${e.duration})`, type: 'output' as const },
        { text: `  ${e.description}`, type: 'output' as const },
      ])
    : [{ text: 'No experience listed.', type: 'output' as const }],
  clear: () => [],
};

export function PortfolioTerminal() {
  const { userData } = useBuilder();
  const [displayedLines, setDisplayedLines] = useState<Line[]>([]);
  const [autoPlaying, setAutoPlaying] = useState(true);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const autoPlayLines = buildAutoPlayLines(userData);

  useEffect(() => {
    if (!autoPlaying || currentLineIndex >= autoPlayLines.length) {
      if (autoPlaying && currentLineIndex >= autoPlayLines.length) {
        setAutoPlaying(false);
      }
      return;
    }

    const line = autoPlayLines[currentLineIndex];
    const timer = setTimeout(() => {
      if (currentChar < line.text.length) {
        setCurrentChar(c => c + 1);
      } else {
        setDisplayedLines(prev => [...prev, line]);
        setCurrentLineIndex(i => i + 1);
        setCurrentChar(0);
      }
    }, line.type === 'command' ? 80 : 15);

    return () => clearTimeout(timer);
  }, [autoPlaying, currentLineIndex, currentChar, autoPlayLines]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedLines, autoPlaying, currentChar]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const responseFn = commandResponses[trimmed];
    if (responseFn) {
      const output = responseFn(userData);
      if (trimmed === 'clear') {
        setDisplayedLines([]);
      } else {
        setDisplayedLines(prev => [...prev, { text: `$ ${cmd}`, type: 'input' as const }, ...output]);
      }
    } else if (trimmed === '') {
      setDisplayedLines(prev => [...prev, { text: `$`, type: 'input' as const }]);
    } else {
      setDisplayedLines(prev => [
        ...prev,
        { text: `$ ${cmd}`, type: 'input' as const },
        { text: `Command not found: ${cmd}. Type 'help' for available commands.`, type: 'output' as const },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = userInput;
      setHistory(prev => [...prev, cmd]);
      setHistoryIndex(-1);
      setUserInput('');
      handleCommand(cmd);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIdx);
        setUserInput(history[newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIdx = historyIndex + 1;
        if (newIdx >= history.length) {
          setHistoryIndex(-1);
          setUserInput('');
        } else {
          setHistoryIndex(newIdx);
          setUserInput(history[newIdx]);
        }
      }
    }
  };

  const currentLine = autoPlaying && currentLineIndex < autoPlayLines.length
    ? autoPlayLines[currentLineIndex]
    : null;

  return (
    <div id="portfolio-preview-content" style={{ background: '#1e1e1e', color: '#d4d4d4', fontFamily: "'Courier New', 'JetBrains Mono', monospace", minHeight: '100vh', fontSize: '14px', lineHeight: 1.6 }}>
      {/* Terminal window chrome */}
      <div style={{ background: '#323233', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '6px', position: 'sticky', top: 0, zIndex: 10 }}>
        <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
        <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
        <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
        <span style={{ marginLeft: '12px', fontSize: '12px', color: '#999' }}>portfolio — bash</span>
      </div>

      {/* Terminal body */}
      <div style={{ padding: '16px 20px', minHeight: 'calc(100vh - 38px)' }} onClick={() => inputRef.current?.focus()}>
        {displayedLines.map((line, i) => (
          <div key={i} style={{
            color: line.type === 'command' ? '#7ee787' : line.type === 'output' ? '#d4d4d4' : line.type === 'input' ? '#7ee787' : '#d4d4d4',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            {line.type === 'command' ? `$ ${line.text}` : line.type === 'input' ? line.text : line.text}
          </div>
        ))}

        {/* Auto-typing current line */}
        {currentLine && (
          <div style={{ color: currentLine.type === 'command' ? '#7ee787' : '#d4d4d4' }}>
            {currentLine.type === 'command' && '$ '}
            {currentLine.text.slice(0, currentChar)}
            <span style={{ animation: 'blink 1s step-end infinite', color: '#d4d4d4' }}>▊</span>
          </div>
        )}

        {/* User input area */}
        {!autoPlaying && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#7ee787' }}>$ </span>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              style={{
                background: 'transparent',
                border: 'none',
                color: '#d4d4d4',
                fontFamily: "'Courier New', 'JetBrains Mono', monospace",
                fontSize: '14px',
                outline: 'none',
                flex: 1,
                caretColor: '#d4d4d4',
              }}
            />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

```


---

## File: `client/src/components/preview/PortfolioWarmth.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";

export function PortfolioWarmth() {
  const { userData, sectionVisibility } = useBuilder();

  const styles = {
    page: {
      fontFamily: "'Nunito', sans-serif",
      background: "#faf3e0",
      color: "#3d2c2a",
      minHeight: "100vh",
      width: "100%",
    },
    hero: {
      textAlign: "center" as const,
      padding: "80px 24px 60px",
      position: "relative" as const,
      overflow: "hidden" as const,
      background: "linear-gradient(135deg, #faf3e0 0%, #f5e6d0 50%, #faf3e0 100%)",
    },
    blob1: {
      position: "absolute" as const,
      top: "-60px",
      right: "-40px",
      width: "280px",
      height: "280px",
      borderRadius: "60% 40% 50% 50% / 45% 55% 50% 50%",
      background: "radial-gradient(circle, rgba(204,107,74,0.15) 0%, transparent 70%)",
      pointerEvents: "none" as const,
    },
    blob2: {
      position: "absolute" as const,
      bottom: "-40px",
      left: "-30px",
      width: "220px",
      height: "220px",
      borderRadius: "50% 60% 45% 55% / 55% 45% 55% 45%",
      background: "radial-gradient(circle, rgba(224,122,95,0.12) 0%, transparent 70%)",
      pointerEvents: "none" as const,
    },
    name: {
      fontSize: "clamp(36px, 6vw, 52px)",
      fontWeight: 700,
      color: "#3d2c2a",
      margin: "0 0 4px",
      letterSpacing: "-0.02em",
    },
    role: {
      fontSize: "18px",
      color: "#cc6b4a",
      fontWeight: 600,
      margin: "0 0 8px",
    },
    tagline: {
      fontSize: "15px",
      color: "#7a6b68",
      maxWidth: "500px",
      margin: "0 auto",
      lineHeight: 1.6,
    },
    section: {
      padding: "48px 24px",
      maxWidth: "900px",
      margin: "0 auto",
    },
    card: {
      background: "#fff",
      borderRadius: "20px",
      padding: "32px",
      boxShadow: "0 4px 20px rgba(61,44,42,0.08)",
      marginBottom: "24px",
      border: "1px solid rgba(204,107,74,0.1)",
    },
    heading: {
      fontSize: "22px",
      fontWeight: 700,
      color: "#3d2c2a",
      margin: "0 0 20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    headingDot: {
      display: "inlineBlock",
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: "#cc6b4a",
      flexShrink: 0,
    },
    footer: {
      textAlign: "center" as const,
      padding: "40px 24px",
      borderTop: "1px solid rgba(204,107,74,0.15)",
    },
    tag: {
      display: "inlineBlock",
      padding: "6px 16px",
      borderRadius: "20px",
      background: "#f5e6d0",
      color: "#3d2c2a",
      fontSize: "13px",
      fontWeight: 600,
      margin: "0 6px 8px 0",
    },
    terracottaTag: {
      display: "inlineBlock",
      padding: "6px 16px",
      borderRadius: "20px",
      background: "#cc6b4a",
      color: "#fff",
      fontSize: "13px",
      fontWeight: 600,
      margin: "0 6px 8px 0",
    },
    contactBtn: {
      display: "inlineBlock",
      padding: "12px 28px",
      borderRadius: "30px",
      background: "#cc6b4a",
      color: "#fff",
      fontSize: "14px",
      fontWeight: 600,
      textDecoration: "none",
      margin: "4px 8px",
    },
  };

  return (
    <div id="portfolio-preview-content" style={styles.page}>
      <style>{`
        @media print {
          body { background: #faf3e0; }
          .warmth-card { break-inside: avoid; }
        }
        @keyframes floatBlob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        .warmth-blob { animation: floatBlob 6s ease-in-out infinite; }
        .warmth-card { transition: transform 0.2s; }
        .warmth-card:hover { transform: translateY(-2px); }
      `}</style>

      {/* Hero */}
      <section style={styles.hero}>
        <div className="warmth-blob" style={styles.blob1} />
        <div className="warmth-blob" style={styles.blob2} />
        <div style={{ position: "relative", zIndex: 1 }}>
          {userData.profileImage && (
            <img
              src={userData.profileImage}
              alt=""
              style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginBottom: "16px", border: "3px solid #cc6b4a" }}
            />
          )}
          <h1 style={styles.name}>{userData.fullName || "Your Name"}</h1>
          <p style={styles.role}>{userData.role || "Your Role"}</p>
          {userData.portfolioHero && <p style={styles.tagline}>{userData.portfolioHero}</p>}
        </div>
      </section>

      {/* Summary */}
      {sectionVisibility.summary && userData.summary && (
        <section style={styles.section}>
          <div style={styles.card} className="warmth-card">
            <h2 style={styles.heading}><span style={styles.headingDot} />About Me</h2>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#5a4b48", margin: 0 }}>{userData.summary}</p>
          </div>
        </section>
      )}

      {/* Skills */}
      {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
        <section style={styles.section}>
          <div style={styles.card} className="warmth-card">
            <h2 style={styles.heading}><span style={styles.headingDot} />Things I'm Good At</h2>
            <div>
              {userData.skills.map((s, i) => (
                <span key={i} style={i % 3 === 0 ? styles.terracottaTag : styles.tag}>{s}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
        <section style={styles.section}>
          <div style={styles.card} className="warmth-card">
            <h2 style={styles.heading}><span style={styles.headingDot} />Where I've Been</h2>
            {userData.experience.map((e, i) => (
              <div key={i} style={{ marginBottom: i < (userData.experience?.length ?? 0) - 1 ? "20px" : 0, paddingLeft: "16px", borderLeft: "2px solid #f5e6d0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 2px", color: "#3d2c2a" }}>{e.role}</h3>
                  <span style={{ fontSize: "12px", color: "#7a6b68" }}>{e.duration}</span>
                </div>
                <p style={{ fontSize: "13px", color: "#cc6b4a", fontWeight: 600, margin: "0 0 4px" }}>{e.organization}</p>
                <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#5a4b48", margin: 0 }}>{e.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
        <section style={styles.section}>
          <div style={styles.card} className="warmth-card">
            <h2 style={styles.heading}><span style={styles.headingDot} />Projects</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
              {userData.projects.map((p, i) => (
                <div key={i} style={{ background: "#faf3e0", borderRadius: "14px", padding: "20px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 4px", color: "#3d2c2a" }}>{p.title}</h3>
                  <p style={{ fontSize: "12px", color: "#cc6b4a", fontWeight: 600, margin: "0 0 8px" }}>{p.tools}</p>
                  <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#5a4b48", margin: 0 }}>{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education */}
      {sectionVisibility.education && userData.education && userData.education.length > 0 && (
        <section style={styles.section}>
          <div style={styles.card} className="warmth-card">
            <h2 style={styles.heading}><span style={styles.headingDot} />Education</h2>
            {userData.education.map((e, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < (userData.education?.length ?? 0) - 1 ? "1px solid #f5e6d0" : "none" }}>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 700, margin: 0, color: "#3d2c2a" }}>{e.degree} in {e.field}</p>
                  <p style={{ fontSize: "13px", color: "#7a6b68", margin: "2px 0 0" }}>{e.institution}{e.grade ? ` — ${e.grade}` : ""}</p>
                </div>
                <span style={{ fontSize: "12px", color: "#cc6b4a", fontWeight: 600, whiteSpace: "nowrap" }}>{e.startYear} – {e.endYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
        <section style={styles.section}>
          <div style={styles.card} className="warmth-card">
            <h2 style={styles.heading}><span style={styles.headingDot} />Achievements</h2>
            {userData.achievements.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flexStart", gap: "10px", marginBottom: i < (userData.achievements?.length ?? 0) - 1 ? "12px" : 0 }}>
                <span style={{ color: "#cc6b4a", fontSize: "16px", marginTop: "2px" }}>✦</span>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, margin: 0, color: "#3d2c2a" }}>{a.title}</p>
                  {a.description && <p style={{ fontSize: "13px", color: "#5a4b48", margin: "2px 0 0" }}>{a.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hobbies */}
      {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
        <section style={styles.section}>
          <div style={styles.card} className="warmth-card">
            <h2 style={styles.heading}><span style={styles.headingDot} />Outside of Work</h2>
            <div>
              {userData.hobbies.map((h, i) => (
                <span key={i} style={styles.tag}>{h}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Footer */}
      <footer style={styles.footer}>
        <p style={{ color: "#7a6b68", marginBottom: "16px", fontSize: "14px" }}>Let's connect</p>
        <div>
          {userData.email && <a href={`mailto:${userData.email}`} style={styles.contactBtn}>{userData.email}</a>}
          {userData.phone && <span style={{ ...styles.contactBtn, background: "#3d2c2a" }}>{userData.phone}</span>}
          {userData.links?.linkedin && <a href={userData.links.linkedin} target="_blank" rel="noopener noreferrer" style={{ ...styles.contactBtn, background: "#f5e6d0", color: "#3d2c2a" }}>LinkedIn</a>}
          {userData.links?.github && <a href={userData.links.github} target="_blank" rel="noopener noreferrer" style={{ ...styles.contactBtn, background: "#f5e6d0", color: "#3d2c2a" }}>GitHub</a>}
          {userData.links?.portfolio && <a href={userData.links.portfolio} target="_blank" rel="noopener noreferrer" style={{ ...styles.contactBtn, background: "#f5e6d0", color: "#3d2c2a" }}>Portfolio</a>}
        </div>
        <p style={{ fontSize: "12px", color: "#a0908d", marginTop: "24px" }}>Built with warmth</p>
      </footer>
    </div>
  );
}

```


---

## File: `client/src/components/preview/ResumeCompact.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";

export function ResumeCompact() {
  const { userData, sectionVisibility } = useBuilder();

  const contactParts = [
    userData.email,
    userData.phone,
    userData.links?.linkedin,
    userData.links?.github,
  ].filter(Boolean);

  return (
    <div
      id="resume-preview-content"
      role="document"
      style={{
        fontFamily: "'Arial', 'Helvetica', sans-serif",
        width: '816px',
        minHeight: '1056px',
        background: '#ffffff',
        color: '#000000',
        fontSize: '10.5px',
        lineHeight: 1.3,
      }}
    >
      <style>{`@media print{@page{margin:0;}}`}</style>
      <div style={{ padding: '20px 28px 16px' }}>
        <div style={{ marginBottom: '8px' }}>
          <h1 style={{ fontSize: '16px', fontWeight: 700, margin: 0, textAlign: 'center' }}>
            {userData.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '11px', margin: '0 0 2px', textAlign: 'center' }}>
            {userData.role || 'Your Role'}
          </p>
          {contactParts.length > 0 && (
            <p style={{ margin: 0, textAlign: 'center' }}>
              {contactParts.join(' | ')}
            </p>
          )}
        </div>

        {sectionVisibility.summary && userData.summary && (
          <section style={{ marginBottom: '6px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 700, margin: 0 }}>Summary</h2>
            <p style={{ margin: '1px 0 0' }}>{userData.summary}</p>
          </section>
        )}

        {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
          <section style={{ marginBottom: '6px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 700, margin: 0 }}>Skills</h2>
            <p style={{ margin: '1px 0 0' }}>{userData.skills.join(' | ')}</p>
          </section>
        )}

        {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
          <section style={{ marginBottom: '6px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 700, margin: 0 }}>Experience</h2>
            {userData.experience.map((e, i) => (
              <div key={i} style={{ marginTop: '3px' }}>
                <p style={{ margin: 0 }}>
                  <strong>{e.role}</strong>, {e.organization} | {e.duration}
                </p>
                <p style={{ margin: '1px 0 0' }}>{e.description}</p>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
          <section style={{ marginBottom: '6px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 700, margin: 0 }}>Projects</h2>
            {userData.projects.map((p, i) => (
              <div key={i} style={{ marginTop: '3px' }}>
                <p style={{ margin: 0 }}>
                  <strong>{p.title}</strong> | {p.tools}
                </p>
                <p style={{ margin: '1px 0 0' }}>{p.description}</p>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.education && userData.education && userData.education.length > 0 && (
          <section style={{ marginBottom: '6px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 700, margin: 0 }}>Education</h2>
            {userData.education.map((e, i) => (
              <p key={i} style={{ margin: '2px 0 0' }}>
                <strong>{e.degree}</strong> in {e.field}, {e.institution}
                {e.grade ? ` - ${e.grade}` : ''} | {e.startYear} – {e.endYear}
              </p>
            ))}
          </section>
        )}

        {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
          <section style={{ marginBottom: '6px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 700, margin: 0 }}>Achievements</h2>
            <p style={{ margin: '1px 0 0' }}>
              {userData.achievements.map(a => a.title).join(' | ')}
            </p>
          </section>
        )}

        {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
          <section>
            <h2 style={{ fontSize: '11px', fontWeight: 700, margin: 0 }}>Interests</h2>
            <p style={{ margin: '1px 0 0' }}>{userData.hobbies.join(', ')}</p>
          </section>
        )}
      </div>
    </div>
  );
}

```


---

## File: `client/src/components/preview/ResumeCreative.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";

const PURPLE_1 = '#7c3aed';
const PURPLE_2 = '#a855f7';
const DARK = '#1e1b4b';

export function ResumeCreative() {
  const { userData, sectionVisibility } = useBuilder();

  return (
    <div id="resume-preview-content" role="document" style={{ fontFamily: "'Nunito', 'system-ui', sans-serif", width: '816px', minHeight: '1056px', background: '#fff', color: '#374151' }}>
      <style>{`@media print{.gradient-header{background:linear-gradient(135deg,#7c3aed,#a855f7)!important;color:#fff!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}.card-bg{background:#faf5ff!important}.accent-dot{color:#7c3aed!important}}`}</style>

      <header className="gradient-header" style={{ background: `linear-gradient(135deg, ${PURPLE_1}, ${PURPLE_2})`, padding: '34px 44px 28px', textAlign: 'center', color: '#fff' }}>
        {userData.profileImage && (
          <img src={userData.profileImage} alt={userData.fullName} style={{ width: '82px', height: '82px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)', marginBottom: '6px' }} />
        )}
        <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>{userData.fullName || "Your Name"}</h1>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', fontWeight: 500, margin: '2px 0 10px' }}>{userData.role || "Your Role"}</p>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {[userData.email, userData.phone, userData.links?.linkedin, userData.links?.github, userData.links?.portfolio].filter(Boolean).map((item, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>{item}</span>
          ))}
        </div>
      </header>

      {sectionVisibility.summary && userData.summary && (
        <div style={{ padding: '22px 44px 6px' }}>
          <section style={{ background: '#faf5ff', borderRadius: '12px', padding: '16px 20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: DARK, margin: '0 0 4px' }}>About Me</h2>
            <p style={{ fontSize: '12.5px', lineHeight: 1.55, color: '#4b5563', margin: 0 }}>{userData.summary}</p>
          </section>
        </div>
      )}

      <div style={{ padding: '16px 44px 32px', display: 'flex', gap: '28px' }}>
        <div style={{ flex: 1 }}>
          {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
            <section style={{ marginBottom: '22px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK, margin: '0 0 8px' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {userData.skills.map((s, i) => (
                  <span key={i} style={{ background: '#ede9fe', color: PURPLE_1, borderRadius: '9999px', padding: '3px 12px', fontSize: '12px', fontWeight: 600 }}>{s}</span>
                ))}
              </div>
            </section>
          )}

          {sectionVisibility.education && userData.education && userData.education.length > 0 && (
            <section style={{ marginBottom: '22px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK, margin: '0 0 8px' }}>Education</h2>
              {userData.education.map((e, i) => (
                <div key={i} style={{ marginBottom: '8px', padding: '12px 14px', background: '#faf5ff', borderRadius: '10px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: DARK, margin: 0 }}>{e.degree} in {e.field}</h3>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '1px 0 2px' }}>{e.institution}{e.grade ? ` — ${e.grade}` : ''}</p>
                  <span style={{ fontSize: '11px', color: PURPLE_1, fontWeight: 600 }}>{e.startYear} – {e.endYear}</span>
                </div>
              ))}
            </section>
          )}

          {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
            <section style={{ marginBottom: '22px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK, margin: '0 0 8px' }}>Achievements</h2>
              {userData.achievements.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: PURPLE_2, display: 'inline-block', flexShrink: 0 }} />
                  <p style={{ fontSize: '12px', color: '#4b5563', margin: 0 }}>{a.title}</p>
                </div>
              ))}
            </section>
          )}

          {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
            <section>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK, margin: '0 0 6px' }}>Interests</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {userData.hobbies.map((h, i) => (
                  <span key={i} style={{ background: '#fef3c7', color: '#92400e', borderRadius: '8px', padding: '2px 10px', fontSize: '11.5px', fontWeight: 500 }}>{h}</span>
                ))}
              </div>
            </section>
          )}
        </div>

        <div style={{ flex: 1 }}>
          {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
            <section style={{ marginBottom: '22px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK, margin: '0 0 8px' }}>Experience</h2>
              {userData.experience.map((e, i) => (
                <article key={i} style={{ marginBottom: '10px', padding: '12px 14px', background: '#faf5ff', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 700, color: DARK, margin: 0 }}>{e.role}</h3>
                    <span style={{ fontSize: '11px', color: PURPLE_1, fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>{e.duration}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: PURPLE_2, fontWeight: 500, margin: '1px 0 3px' }}>{e.organization}</p>
                  <p style={{ fontSize: '12px', lineHeight: 1.5, color: '#4b5563', margin: 0 }}>{e.description}</p>
                </article>
              ))}
            </section>
          )}

          {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
            <section>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK, margin: '0 0 8px' }}>Projects</h2>
              {userData.projects.map((p, i) => (
                <article key={i} style={{ marginBottom: '10px', padding: '12px 14px', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: DARK, margin: 0 }}>{p.title}</h3>
                  <p style={{ fontSize: '11px', color: '#16a34a', fontWeight: 500, margin: '1px 0 3px' }}>{p.tools}</p>
                  <p style={{ fontSize: '12px', lineHeight: 1.45, color: '#4b5563', margin: 0 }}>{p.description}</p>
                </article>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

```


---

## File: `client/src/components/preview/ResumeElegant.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";

export function ResumeElegant() {
  const { userData, sectionVisibility } = useBuilder();

  const contactItems = [
    userData.email,
    userData.phone,
    userData.links?.linkedin,
    userData.links?.github,
  ].filter(Boolean);

  const sectionHeading = (title: string) => (
    <div style={{ marginBottom: '14px' }}>
      <h2
        style={{
          fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
          fontSize: '18px',
          fontWeight: 400,
          fontStyle: 'italic',
          color: '#5c3d0e',
          margin: '0 0 4px',
          textAlign: 'center',
        }}
      >
        {title}
      </h2>
      <div
        style={{
          width: '50px',
          borderBottom: '1px solid #b8860b',
          margin: '0 auto',
        }}
      />
    </div>
  );

  return (
    <div
      id="resume-preview-content"
      role="document"
      style={{
        fontFamily: "'Lato', 'Inter', system-ui, sans-serif",
        width: '816px',
        minHeight: '1056px',
        background: '#fdf8f0',
        color: '#3d3d3a',
        fontSize: '13px',
        lineHeight: 1.55,
      }}
    >
      <style>{`@media print{@page{margin:0;}*{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}`}</style>
      <div style={{ padding: '48px 56px 40px' }}>
        <header style={{ textAlign: 'center', marginBottom: '36px' }}>
          {userData.profileImage && (
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto 18px',
                border: '2px solid #b8860b',
                padding: '3px',
              }}
            >
              <img
                src={userData.profileImage}
                alt={userData.fullName}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
              fontSize: '44px',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#2d2d28',
              margin: 0,
              letterSpacing: '-0.3px',
            }}
          >
            {userData.fullName || 'Your Name'}
          </h1>
          <p
            style={{
              fontSize: '12px',
              fontVariant: 'small-caps',
              color: '#b8860b',
              letterSpacing: '0.18em',
              marginTop: '6px',
              marginBottom: 0,
              fontWeight: 500,
            }}
          >
            {userData.role || 'Your Role'}
          </p>
          {contactItems.length > 0 && (
            <div
              style={{
                fontSize: '12px',
                color: '#6b6863',
                marginTop: '12px',
                display: 'flex',
                justifyContent: 'center',
                gap: '14px',
                flexWrap: 'wrap',
              }}
            >
              {contactItems.map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </div>
          )}
        </header>

        {sectionVisibility.summary && userData.summary && (
          <section style={{ marginBottom: '32px' }}>
            {sectionHeading('Professional Summary')}
            <p
              style={{
                fontSize: '13px',
                lineHeight: 1.6,
                color: '#5a5853',
                margin: 0,
                textAlign: 'center',
                maxWidth: '620px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {userData.summary}
            </p>
          </section>
        )}

        {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            {sectionHeading('Technical Skills')}
            <p
              style={{
                fontSize: '13px',
                color: '#5a5853',
                margin: 0,
                lineHeight: 1.7,
                textAlign: 'center',
              }}
            >
              {userData.skills.join('  \u2022  ')}
            </p>
          </section>
        )}

        {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            {sectionHeading('Work Experience')}
            {userData.experience.map((e, i) => (
              <div
                key={i}
                style={{
                  marginBottom: '16px',
                  padding: '16px 20px',
                  background: '#ffffff',
                  border: '1px solid #e8e4da',
                  borderRadius: '2px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#2d2d28',
                      margin: 0,
                    }}
                  >
                    {e.role}
                  </h3>
                  <span style={{ fontSize: '11px', color: '#b8860b', fontStyle: 'italic' }}>
                    {e.duration}
                  </span>
                </div>
                <p style={{ fontSize: '12.5px', color: '#b8860b', fontWeight: 500, margin: '2px 0 0' }}>
                  {e.organization}
                </p>
                <p style={{ fontSize: '12.5px', color: '#5a5853', marginTop: '6px', marginBottom: 0, lineHeight: 1.55 }}>
                  {e.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            {sectionHeading('Projects')}
            {userData.projects.map((p, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '14px',
                  padding: '14px 18px',
                  background: '#ffffff',
                  border: '1px solid #e8e4da',
                  borderRadius: '2px',
                }}
              >
                {p.images && p.images[0] && (
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      flexShrink: 0,
                      overflow: 'hidden',
                      borderRadius: '2px',
                    }}
                  >
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#2d2d28',
                      margin: '0 0 2px',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '11.5px', color: '#b8860b', fontStyle: 'italic', margin: '0 0 4px' }}>
                    {p.tools}
                  </p>
                  <p style={{ fontSize: '12.5px', color: '#5a5853', margin: 0, lineHeight: 1.55 }}>
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.education && userData.education && userData.education.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            {sectionHeading('Education')}
            {userData.education.map((e, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 18px',
                  background: '#ffffff',
                  border: '1px solid #e8e4da',
                  borderRadius: '2px',
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#2d2d28',
                      margin: 0,
                    }}
                  >
                    {e.degree} in {e.field}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#5a5853', margin: '2px 0 0' }}>
                    {e.institution}{e.grade ? ` \u2014 ${e.grade}` : ''}
                  </p>
                </div>
                <span style={{ fontSize: '11px', color: '#b8860b', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
                  {e.startYear} – {e.endYear}
                </span>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            {sectionHeading('Certifications & Achievements')}
            <ul
              style={{
                margin: 0,
                paddingLeft: '24px',
                fontSize: '12.5px',
                color: '#5a5853',
                lineHeight: 1.7,
              }}
            >
              {userData.achievements.map((a, i) => (
                <li key={i}>{a.title}</li>
              ))}
            </ul>
          </section>
        )}

        {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
          <section>
            {sectionHeading('Interests')}
            <p
              style={{
                fontSize: '12.5px',
                color: '#5a5853',
                margin: 0,
                textAlign: 'center',
              }}
            >
              {userData.hobbies.join('  \u2022  ')}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

```


---

## File: `client/src/components/preview/ResumeExecutive.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";

export function ResumeExecutive() {
  const { userData, sectionVisibility } = useBuilder();

  const contactItems = [
    userData.email,
    userData.phone,
    userData.links?.linkedin,
    userData.links?.github,
  ].filter(Boolean);

  const sectionTitle = (title: string) => ({
    fontFamily: "'Source Serif 4', Georgia, serif",
    fontSize: '15px',
    fontWeight: 700,
    color: '#0f141e',
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
    margin: '0 0 12px',
  });

  return (
    <div
      id="resume-preview-content"
      role="document"
      style={{
        fontFamily: "'Lato', 'Inter', Verdana, sans-serif",
        width: '816px',
        minHeight: '1056px',
        background: '#ffffff',
        color: '#1e293b',
        fontSize: '13px',
        lineHeight: 1.5,
      }}
    >
      <style>{`@media print{@page{margin:0;}*{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}`}</style>
      <header
        style={{
          background: '#0f141e',
          color: '#ffffff',
          padding: '44px 52px 36px',
        }}
      >
        <h1
          style={{
            fontFamily: "'Merriweather', Georgia, 'Times New Roman', serif",
            fontSize: '44px',
            fontWeight: 700,
            margin: 0,
            letterSpacing: '-0.5px',
          }}
        >
          {userData.fullName || 'Your Name'}
        </h1>
        <div
          style={{
            borderBottom: '2px solid #d4a843',
            width: '64px',
            marginTop: '14px',
          }}
        />
        <p
          style={{
            fontSize: '17px',
            color: '#94a3b8',
            marginTop: '12px',
            marginBottom: 0,
            fontWeight: 300,
          }}
        >
          {userData.role || 'Your Role'}
        </p>
        {contactItems.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '6px',
              fontSize: '12px',
              color: '#cbd5e1',
              marginTop: '18px',
              flexWrap: 'wrap',
            }}
          >
            {contactItems.map((item, i) => (
              <span key={i}>
                {item}
                {i < contactItems.length - 1 && (
                  <span style={{ color: '#d4a843', margin: '0 8px' }}>|</span>
                )}
              </span>
            ))}
          </div>
        )}
      </header>

      <div style={{ padding: '32px 52px 44px' }}>
        {sectionVisibility.summary && userData.summary && (
          <section style={{ marginBottom: '28px' }}>
            <h2 style={sectionTitle('IMPACT SUMMARY')}>IMPACT SUMMARY</h2>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#475569', margin: 0 }}>
              {userData.summary}
            </p>
          </section>
        )}

        {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <h2 style={sectionTitle('IMPACT DRIVEN EXPERIENCE')}>IMPACT DRIVEN EXPERIENCE</h2>
            {userData.experience.map((e, i) => (
              <div key={i} style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f141e', margin: 0 }}>
                    {e.role}
                  </h3>
                  <span style={{ fontSize: '11.5px', color: '#64748b' }}>{e.duration}</span>
                </div>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 4px', fontWeight: 500 }}>
                  {e.organization}
                </p>
                <p style={{ fontSize: '12.5px', lineHeight: 1.55, color: '#475569', margin: 0 }}>
                  {e.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <h2 style={sectionTitle('STRATEGIC SKILL SET')}>STRATEGIC SKILL SET</h2>
            <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.7 }}>
              {userData.skills.join('  \u00b7  ')}
            </p>
          </section>
        )}

        {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <h2 style={sectionTitle('STRATEGIC PROJECTS')}>STRATEGIC PROJECTS</h2>
            {userData.projects.map((p, i) => (
              <div key={i} style={{ marginBottom: '14px' }}>
                <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f141e', margin: 0 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '12px', color: '#d4a843', margin: '1px 0 4px', fontWeight: 600 }}>
                  {p.tools}
                </p>
                <p style={{ fontSize: '12.5px', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  {p.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.education && userData.education && userData.education.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <h2 style={sectionTitle('ACADEMIC EXCELLENCE')}>ACADEMIC EXCELLENCE</h2>
            {userData.education.map((e, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0f141e', margin: 0 }}>
                    {e.degree} in {e.field}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#475569', margin: 0 }}>
                    {e.institution}{e.grade ? ` \u2014 ${e.grade}` : ''}
                  </p>
                </div>
                <span style={{ fontSize: '11.5px', color: '#64748b', whiteSpace: 'nowrap' }}>
                  {e.startYear} – {e.endYear}
                </span>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <h2 style={sectionTitle('CERTIFICATIONS & ACHIEVEMENTS')}>CERTIFICATIONS & ACHIEVEMENTS</h2>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', fontSize: '12.5px', color: '#475569', lineHeight: 1.7 }}>
              {userData.achievements.map((a, i) => (
                <li key={i} style={{ position: 'relative', paddingLeft: '20px', marginBottom: '4px' }}>
                  <span style={{ position: 'absolute', left: 0, top: '5px', width: '7px', height: '7px', borderRadius: '50%', background: '#d4a843' }} />
                  {a.title}
                </li>
              ))}
            </ul>
          </section>
        )}

        {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
          <section>
            <h2 style={sectionTitle('INTERESTS & LEADERSHIP')}>INTERESTS & LEADERSHIP</h2>
            <p style={{ fontSize: '12.5px', color: '#475569', margin: 0 }}>
              {userData.hobbies.join('  \u00b7  ')}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

```


---

## File: `client/src/components/preview/ResumeExperience.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";

const CHARCOAL = '#2d3748';
const CREAM = '#faf5eb';
const WARM_BROWN = '#7b5e4a';
const DARK = '#1a202c';

export function ResumeExperience() {
  const { userData, sectionVisibility } = useBuilder();

  const timelineDot: React.CSSProperties = {
    position: 'absolute',
    left: '-10px',
    top: '5px',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    background: CHARCOAL,
    border: '3px solid #fff',
    zIndex: 1,
  };

  return (
    <div id="resume-preview-content" role="document" style={{ fontFamily: "'Source Serif 4', 'Lato', 'Georgia', serif", width: '816px', minHeight: '1056px', background: '#fff', color: DARK, borderLeft: `4px solid ${CHARCOAL}` }}>
      <style>{`@media print{body{color:#1a202c!important}.cream-bg{background:#faf5eb!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}.timeline-line{border-color:#d4c5b0!important}}`}</style>

      <header style={{ padding: '38px 44px 16px 40px', borderBottom: '1px solid #e8ddd0' }}>
        <h1 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '32px', fontWeight: 700, color: CHARCOAL, margin: 0, letterSpacing: '-0.01em' }}>{userData.fullName || "Your Name"}</h1>
        <p style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '15px', color: WARM_BROWN, fontWeight: 500, margin: '2px 0 8px' }}>{userData.role || "Your Role"}</p>
        <div style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '11.5px', color: '#6b7280', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          {userData.email && <span>{userData.email}</span>}
          {userData.phone && <span>{userData.phone}</span>}
          {userData.links?.linkedin && <span>{userData.links.linkedin}</span>}
          {userData.links?.github && <span>{userData.links.github}</span>}
          {userData.links?.portfolio && <span>{userData.links.portfolio}</span>}
        </div>
      </header>

      <div style={{ padding: '22px 44px 36px 40px' }}>
        {sectionVisibility.summary && userData.summary && (
          <section style={{ marginBottom: '24px', padding: '16px 20px', background: CREAM, borderRadius: '6px' }}>
            <h2 style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: WARM_BROWN, margin: '0 0 6px' }}>Summary</h2>
            <p style={{ fontSize: '13px', lineHeight: 1.55, color: '#4a5568', margin: 0 }}>{userData.summary}</p>
          </section>
        )}

        {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
          <section style={{ marginBottom: '26px' }}>
            <h2 style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: CHARCOAL, margin: '0 0 12px', padding: '0 0 4px', borderBottom: '2px solid #e8ddd0' }}>Experience</h2>
            <div style={{ position: 'relative', paddingLeft: '22px' }}>
              <div style={{ position: 'absolute', left: '0', top: '8px', bottom: '8px', width: '2px', background: '#d4c5b0' }} />
              {userData.experience.map((e, i) => (
                <article key={i} style={{ position: 'relative', marginBottom: '18px', paddingLeft: '8px' }}>
                  <div style={timelineDot} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '15px', fontWeight: 700, color: CHARCOAL, margin: 0 }}>{e.role}</h3>
                  </div>
                  <p style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '12px', color: WARM_BROWN, fontWeight: 600, margin: '1px 0 2px' }}>{e.organization}</p>
                  <p style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '11px', color: '#9ca3af', margin: '0 0 4px', fontWeight: 500 }}>{e.duration}</p>
                  <p style={{ fontSize: '12.5px', lineHeight: 1.5, color: '#4a5568', margin: 0 }}>{e.description}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {sectionVisibility.education && userData.education && userData.education.length > 0 && (
          <section style={{ marginBottom: '24px', padding: '16px 20px', background: CREAM, borderRadius: '6px' }}>
            <h2 style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: WARM_BROWN, margin: '0 0 10px' }}>Education</h2>
            {userData.education.map((e, i) => (
              <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <h3 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '13px', fontWeight: 700, color: CHARCOAL, margin: 0 }}>{e.degree} in {e.field}</h3>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '1px 0 0' }}>{e.institution}{e.grade ? ` — ${e.grade}` : ''}</p>
                </div>
                <span style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '11px', color: '#9ca3af', whiteSpace: 'nowrap' }}>{e.startYear} – {e.endYear}</span>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h2 style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: CHARCOAL, margin: '0 0 8px', padding: '0 0 4px', borderBottom: '2px solid #e8ddd0' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {userData.skills.map((s, i) => (
                <span key={i} style={{ background: CREAM, color: CHARCOAL, padding: '3px 10px', fontSize: '12px', borderRadius: '4px', fontWeight: 500 }}>{s}</span>
              ))}
            </div>
          </section>
        )}

        {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
          <section style={{ marginBottom: '24px', padding: '16px 20px', background: CREAM, borderRadius: '6px' }}>
            <h2 style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: WARM_BROWN, margin: '0 0 10px' }}>Projects</h2>
            <div style={{ position: 'relative', paddingLeft: '16px' }}>
              <div style={{ position: 'absolute', left: '0', top: '6px', bottom: '6px', width: '1.5px', background: '#d4c5b0' }} />
              {userData.projects.map((p, i) => (
                <article key={i} style={{ position: 'relative', marginBottom: '12px', paddingLeft: '6px' }}>
                  <div style={{ ...timelineDot, width: '10px', height: '10px', left: '-8px', top: '4px', background: WARM_BROWN, border: '2px solid #fff' }} />
                  <h3 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '13.5px', fontWeight: 700, color: CHARCOAL, margin: 0 }}>{p.title}</h3>
                  <p style={{ fontSize: '11.5px', color: WARM_BROWN, fontWeight: 500, margin: '1px 0 3px' }}>{p.tools}</p>
                  <p style={{ fontSize: '12px', lineHeight: 1.45, color: '#4a5568', margin: 0 }}>{p.description}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <h2 style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: CHARCOAL, margin: '0 0 8px', padding: '0 0 4px', borderBottom: '2px solid #e8ddd0' }}>Achievements</h2>
            {userData.achievements.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                <span style={{ color: WARM_BROWN, fontSize: '14px' }}>▸</span>
                <p style={{ fontSize: '12px', color: '#4a5568', margin: 0 }}>{a.title}</p>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
          <section>
            <h2 style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: CHARCOAL, margin: '0 0 6px', padding: '0 0 4px', borderBottom: '2px solid #e8ddd0' }}>Interests</h2>
            <p style={{ fontSize: '12px', color: '#4a5568', margin: 0, lineHeight: 1.6 }}>{userData.hobbies.join('  ·  ')}</p>
          </section>
        )}
      </div>
    </div>
  );
}

```


---

## File: `client/src/components/preview/ResumeModern.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";

const NAVY = '#1a2744';
const SKY = '#7dd3fc';
const DARK_TEXT = '#1e293b';

export function ResumeModern() {
  const { userData, sectionVisibility } = useBuilder();

  const sidebarItem = (label: string, value: string | undefined | null) => (
    value ? <div style={{ marginBottom: '8px' }}>
      <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#94a3b8', margin: '0 0 1px' }}>{label}</p>
      <p style={{ fontSize: '12px', color: '#f1f5f9', margin: 0, lineHeight: 1.4 }}>{value}</p>
    </div> : null
  );

  return (
    <div id="resume-preview-content" role="document" style={{ fontFamily: "'DM Sans', 'Lato', 'system-ui', sans-serif", width: '816px', minHeight: '1056px', display: 'flex' }}>
      <style>{`@media print{.sidebar-bg{background:#1a2744!important}.sidebar-text{color:#f1f5f9!important}.accent-sky{color:#7dd3fc!important}}`}</style>

      <aside style={{ width: '30%', background: NAVY, color: '#e2e8f0', padding: '36px 22px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {userData.profileImage && (
          <div style={{ textAlign: 'center', marginBottom: '14px' }}>
            <img src={userData.profileImage} alt={userData.fullName} style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(125, 211, 252, 0.3)' }} />
          </div>
        )}

        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', margin: '0 0 1px', lineHeight: 1.2 }}>{userData.fullName || "Your Name"}</h1>
        <p style={{ fontSize: '13px', color: SKY, fontWeight: 500, margin: '0 0 18px' }}>{userData.role || "Your Role"}</p>

        <h2 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: SKY, borderBottom: '1px solid rgba(125, 211, 252, 0.2)', paddingBottom: '5px', margin: '0 0 8px' }}>Contact</h2>
        {sidebarItem('Email', userData.email)}
        {sidebarItem('Phone', userData.phone)}
        {sidebarItem('LinkedIn', userData.links?.linkedin)}
        {sidebarItem('GitHub', userData.links?.github)}
        {sidebarItem('Portfolio', userData.links?.portfolio)}

        <div style={{ flex: 1 }} />

        {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
          <div>
            <h2 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: SKY, borderBottom: '1px solid rgba(125, 211, 252, 0.2)', paddingBottom: '5px', margin: '0 0 8px' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {userData.skills.map((s, i) => (
                <span key={i} style={{ background: 'rgba(125, 211, 252, 0.12)', color: '#e0f2fe', borderRadius: '3px', padding: '2px 8px', fontSize: '11px', fontWeight: 400 }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: SKY, borderBottom: '1px solid rgba(125, 211, 252, 0.2)', paddingBottom: '5px', margin: '0 0 8px' }}>Interests</h2>
            <p style={{ fontSize: '11.5px', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>{userData.hobbies.join(', ')}</p>
          </div>
        )}
      </aside>

      <main style={{ width: '70%', padding: '36px 32px', background: '#fff' }}>
        {sectionVisibility.summary && userData.summary && (
          <section style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span style={{ width: '4px', height: '18px', background: SKY, borderRadius: '2px', display: 'inline-block' }} />
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK_TEXT, margin: 0, letterSpacing: '0.01em' }}>About</h2>
            </div>
            <p style={{ fontSize: '12.5px', lineHeight: 1.55, color: '#475569', margin: '6px 0 0' }}>{userData.summary}</p>
          </section>
        )}

        {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span style={{ width: '4px', height: '18px', background: SKY, borderRadius: '2px', display: 'inline-block' }} />
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK_TEXT, margin: 0, letterSpacing: '0.01em' }}>Experience</h2>
            </div>
            {userData.experience.map((e, i) => (
              <article key={i} style={{ marginBottom: '14px', padding: '12px 14px', background: '#f8fafc', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: DARK_TEXT, margin: 0 }}>{e.role}</h3>
                  <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: "'Lato', sans-serif" }}>{e.duration}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, margin: '1px 0 4px' }}>{e.organization}</p>
                <p style={{ fontSize: '12px', lineHeight: 1.5, color: '#475569', margin: 0 }}>{e.description}</p>
              </article>
            ))}
          </section>
        )}

        {sectionVisibility.education && userData.education && userData.education.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span style={{ width: '4px', height: '18px', background: SKY, borderRadius: '2px', display: 'inline-block' }} />
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK_TEXT, margin: 0, letterSpacing: '0.01em' }}>Education</h2>
            </div>
            {userData.education.map((e, i) => (
              <div key={i} style={{ marginBottom: '8px', padding: '10px 14px', background: '#f8fafc', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '12.5px', fontWeight: 600, color: DARK_TEXT, margin: 0 }}>{e.degree} in {e.field}</h3>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '1px 0 0' }}>{e.institution}{e.grade ? ` — ${e.grade}` : ''}</p>
                </div>
                <span style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', fontFamily: "'Lato', sans-serif" }}>{e.startYear} – {e.endYear}</span>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span style={{ width: '4px', height: '18px', background: SKY, borderRadius: '2px', display: 'inline-block' }} />
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK_TEXT, margin: 0, letterSpacing: '0.01em' }}>Projects</h2>
            </div>
            {userData.projects.map((p, i) => (
              <article key={i} style={{ marginBottom: '10px', padding: '10px 14px', background: '#f8fafc', borderRadius: '6px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 600, color: DARK_TEXT, margin: '0 0 1px' }}>{p.title}</h3>
                <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 3px' }}>{p.tools}</p>
                <p style={{ fontSize: '12px', lineHeight: 1.45, color: '#475569', margin: 0 }}>{p.description}</p>
              </article>
            ))}
          </section>
        )}

        {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span style={{ width: '4px', height: '18px', background: SKY, borderRadius: '2px', display: 'inline-block' }} />
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK_TEXT, margin: 0, letterSpacing: '0.01em' }}>Achievements</h2>
            </div>
            <ul style={{ margin: '6px 0 0', paddingLeft: '18px', fontSize: '12px', color: '#475569', lineHeight: 1.7 }}>
              {userData.achievements.map((a, i) => (
                <li key={i}>{a.title}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

```


---

## File: `client/src/components/preview/ResumePreview.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";

export function ResumePreview() {
  const { userData, sectionVisibility } = useBuilder();

  return (
    <div id="resume-preview-content" className="bg-white p-12 min-h-[1122px] w-[794px]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div className="mb-8 text-center">
        {userData.profileImage && (
          <img
            src={userData.profileImage}
            alt={userData.fullName}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-gray-200"
          />
        )}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {userData.fullName || "Your Name"}
        </h1>
        <p className="text-xl text-gray-600 mb-3">
          {userData.role || "Your Role"}
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
          {userData.email && <span>{userData.email}</span>}
          {userData.phone && <span>•</span>}
          {userData.phone && <span>{userData.phone}</span>}
        </div>
        {userData.links && (
          <div className="flex items-center justify-center gap-4 text-sm text-blue-600 mt-2">
            {userData.links.github && <a href={userData.links.github}>GitHub</a>}
            {userData.links.linkedin && <a href={userData.links.linkedin}>LinkedIn</a>}
            {userData.links.portfolio && <a href={userData.links.portfolio}>Portfolio</a>}
          </div>
        )}
      </div>

      {/* Summary */}
      {sectionVisibility.summary && userData.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-blue-600 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {userData.summary}
          </p>
        </div>
      )}

      {/* Skills */}
      {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-blue-600 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {userData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {sectionVisibility.education && userData.education && userData.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
            Education
          </h2>
          {userData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{edu.startYear} - {edu.endYear}</p>
                  {edu.grade && <p className="font-medium">{edu.grade}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
            Projects
          </h2>
          {userData.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold text-gray-900">{project.title}</h3>
              <p className="text-sm text-blue-600 mb-1">{project.tools}</p>
              <p className="text-gray-700 leading-relaxed mb-2">{project.description}</p>
              {project.images && project.images.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {project.images.slice(0, 3).map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={img}
                      alt={`${project.title} screenshot ${imgIndex + 1}`}
                      className="w-32 h-20 object-cover rounded border border-gray-200"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {sectionVisibility.experience && userData.hasExperience && userData.experience && userData.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
            Experience
          </h2>
          {userData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{exp.role}</h3>
                  <p className="text-gray-700">{exp.organization}</p>
                </div>
                <p className="text-sm text-gray-600">{exp.duration}</p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {sectionVisibility.achievements && userData.achievements && Array.isArray(userData.achievements) && userData.achievements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
            Achievements & Certifications
          </h2>
          {userData.achievements.map((achievement, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
              {achievement.description && (
                <p className="text-gray-700 text-sm">{achievement.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Hobbies */}
      {sectionVisibility.hobbies && userData.hobbies && Array.isArray(userData.hobbies) && userData.hobbies.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-blue-600 pb-1">
            Hobbies & Interests
          </h2>
          <p className="text-gray-700">
            {userData.hobbies.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

```


---

## File: `client/src/components/preview/ResumeSingleColumn.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";

const RED = '#e53e3e';
const DARK = '#171717';
const BODY = '#404040';
const MUTED = '#a3a3a3';

export function ResumeSingleColumn() {
  const { userData, sectionVisibility } = useBuilder();

  const sectionHeading = (title: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: RED, flexShrink: 0 }} />
      <h2 style={{ fontFamily: "'Plus Jakarta Sans', 'system-ui', sans-serif", fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: MUTED, margin: 0 }}>{title}</h2>
      <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
    </div>
  );

  return (
    <div id="resume-preview-content" role="document" style={{ fontFamily: "'Plus Jakarta Sans', 'system-ui', sans-serif", width: '816px', minHeight: '1056px', background: '#fff', color: BODY }}>
      <style>{`@media print{body{color:#404040!important}.swiss-dot{background:#e53e3e!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}}`}</style>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '48px 20px' }}>
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', 'system-ui', sans-serif", fontSize: '32px', fontWeight: 700, color: DARK, margin: '0 0 1px', letterSpacing: '-0.03em' }}>{userData.fullName || "Your Name"}</h1>
          <p style={{ fontSize: '15px', color: MUTED, fontWeight: 500, margin: '0 0 12px', fontFamily: "'Plus Jakarta Sans', 'system-ui', sans-serif" }}>{userData.role || "Your Role"}</p>
          <div style={{ fontSize: '12px', color: MUTED, display: 'flex', gap: '8px', flexWrap: 'wrap', fontFamily: "'Plus Jakarta Sans', 'system-ui', sans-serif" }}>
            {[userData.email, userData.phone, userData.links?.linkedin, userData.links?.github, userData.links?.portfolio].filter(Boolean).map((item, i, arr) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {item}
                {i < arr.length - 1 && <span style={{ color: RED, opacity: 0.5, marginLeft: '4px' }}>|</span>}
              </span>
            ))}
          </div>
        </header>

        {sectionVisibility.summary && userData.summary && (
          <section style={{ marginBottom: '28px' }}>
            {sectionHeading('Summary')}
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: BODY, margin: 0 }}>{userData.summary}</p>
          </section>
        )}

        {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            {sectionHeading('Experience')}
            {userData.experience.map((e, i) => (
              <article key={i} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: DARK, margin: 0 }}>{e.role}</h3>
                  <span style={{ fontSize: '11px', color: MUTED, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.01em' }}>{e.duration}</span>
                </div>
                <p style={{ fontSize: '12px', color: RED, fontWeight: 500, margin: '1px 0 3px' }}>{e.organization}</p>
                <p style={{ fontSize: '12.5px', lineHeight: 1.5, color: BODY, margin: 0 }}>{e.description}</p>
              </article>
            ))}
          </section>
        )}

        {sectionVisibility.education && userData.education && userData.education.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            {sectionHeading('Education')}
            {userData.education.map((e, i) => (
              <div key={i} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 600, color: DARK, margin: 0 }}>{e.degree} in {e.field}</h3>
                  <p style={{ fontSize: '12px', color: MUTED, margin: '1px 0 0' }}>{e.institution}{e.grade ? ` – ${e.grade}` : ''}</p>
                </div>
                <span style={{ fontSize: '11px', color: MUTED, whiteSpace: 'nowrap', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{e.startYear} – {e.endYear}</span>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            {sectionHeading('Skills')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
              {(userData.skills ?? []).map((s, i) => (
                <span key={i} style={{ fontSize: '12.5px', color: BODY, lineHeight: 1.8 }}>{s}{i < (userData.skills?.length ?? 0) - 1 ? <span style={{ color: RED, opacity: 0.4, marginLeft: '8px' }}>/</span> : ''}</span>
              ))}
            </div>
          </section>
        )}

        {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            {sectionHeading('Projects')}
            {userData.projects.map((p, i) => (
              <article key={i} style={{ marginBottom: '12px' }}>
                <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: DARK, margin: '0 0 1px' }}>{p.title}</h3>
                <p style={{ fontSize: '11.5px', color: MUTED, margin: '0 0 3px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.tools}</p>
                <p style={{ fontSize: '12.5px', lineHeight: 1.5, color: BODY, margin: 0 }}>{p.description}</p>
              </article>
            ))}
          </section>
        )}

        {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            {sectionHeading('Achievements')}
            <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none', fontSize: '12.5px', color: BODY, lineHeight: 1.7 }}>
              {userData.achievements.map((a, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ color: RED, fontSize: '10px' }}>●</span>
                  {a.title}
                </li>
              ))}
            </ul>
          </section>
        )}

        {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
          <section>
            {sectionHeading('Interests')}
            <p style={{ fontSize: '12.5px', color: BODY, margin: 0, lineHeight: 1.6 }}>{userData.hobbies.join('  ·  ')}</p>
          </section>
        )}
      </div>
    </div>
  );
}

```


---

## File: `client/src/components/preview/ResumeTechStack.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";

const frontendKW = ['react', 'vue', 'angular', 'html', 'css', 'tailwind', 'next', 'svelte', 'typescript', 'javascript', 'jquery', 'bootstrap', 'redux', 'webpack', 'vite'];
const backendKW = ['node', 'express', 'django', 'flask', 'fastapi', 'spring', 'rust', 'go', 'graphql', 'rest', 'api', 'python', 'java', 'c#', '.net', 'php', 'laravel', 'ruby', 'rails'];
const databaseKW = ['sql', 'mysql', 'postgres', 'mongodb', 'redis', 'firebase', 'supabase', 'dynamodb', 'couchdb', 'mariadb', 'sqlite', 'prisma', 'orm'];
const devopsKW = ['docker', 'git', 'aws', 'azure', 'ci/cd', 'linux', 'kubernetes', 'gcp', 'jenkins', 'terraform', 'ansible', 'github actions', 'gitlab ci'];

function categorizeSkill(skill: string): string {
  const lower = skill.toLowerCase();
  if (frontendKW.some(k => lower.includes(k))) return 'Frontend';
  if (backendKW.some(k => lower.includes(k))) return 'Backend';
  if (databaseKW.some(k => lower.includes(k))) return 'Database';
  if (devopsKW.some(k => lower.includes(k))) return 'DevOps';
  return 'General';
}

export function ResumeTechStack() {
  const { userData, sectionVisibility } = useBuilder();

  const categorized: Record<string, string[]> = {};
  (userData.skills || []).forEach(s => {
    const cat = categorizeSkill(s);
    if (!categorized[cat]) categorized[cat] = [];
    categorized[cat].push(s);
  });

  const contactItems = [
    userData.email,
    userData.phone,
    userData.links?.github,
    userData.links?.linkedin,
  ].filter(Boolean);

  const commentHead = (text: string) => (
    <h2 style={{ color: '#8b949e', fontSize: '12px', fontWeight: 400, margin: '0 0 10px' }}>
      <span style={{ color: '#3fb950' }}>//</span> {text}
    </h2>
  );

  return (
    <div
      id="resume-preview-content"
      role="document"
      style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        width: '816px',
        minHeight: '1056px',
        background: '#0d1117',
        color: '#c9d1d9',
        fontSize: '12.5px',
        lineHeight: 1.5,
      }}
    >
      <style>{`@media print{@page{margin:0;}*{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}`}</style>
      <header style={{ padding: '36px 44px 28px', borderBottom: '1px solid #21262d' }}>
        <div style={{ color: '#8b949e', fontSize: '13px', marginBottom: '6px' }}>{'{'}</div>
        <div style={{ paddingLeft: '20px' }}>
          <span style={{ color: '#7ee787' }}>"name"</span>
          <span style={{ color: '#8b949e' }}>: </span>
          <span style={{ color: '#ffa657' }}>"{userData.fullName || 'Your Name'}"</span>
        </div>
        <div style={{ paddingLeft: '20px', marginTop: '2px' }}>
          <span style={{ color: '#7ee787' }}>"role"</span>
          <span style={{ color: '#8b949e' }}>: </span>
          <span style={{ color: '#ffa657' }}>"{userData.role || 'Your Role'}"</span>
        </div>
        {contactItems.length > 0 && (
          <div style={{ paddingLeft: '20px', marginTop: '2px' }}>
            <span style={{ color: '#7ee787' }}>"contact"</span>
            <span style={{ color: '#8b949e' }}>: </span>
            <span style={{ color: '#ffa657' }}>"{contactItems.join(' | ')}"</span>
          </div>
        )}
        <div style={{ color: '#8b949e', marginTop: '6px' }}>{'}'}</div>
      </header>

      <div style={{ padding: '28px 44px' }}>
        {sectionVisibility.summary && userData.summary && (
          <section style={{ marginBottom: '24px' }}>
            {commentHead('Summary')}
            <p style={{ color: '#c9d1d9', margin: 0, lineHeight: 1.6 }}>
              {userData.summary}
            </p>
          </section>
        )}

        {sectionVisibility.skills && Object.keys(categorized).length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            {commentHead('Skills')}
            {Object.entries(categorized).map(([cat, skills]) => (
              <div key={cat} style={{ marginBottom: '8px', fontSize: '12px' }}>
                <span style={{ color: '#8b949e' }}>{cat}: </span>
                {skills.map((s, i) => (
                  <span key={i}>
                    <span
                      style={{
                        color: '#c9d1d9',
                        background: '#161b22',
                        padding: '1px 8px',
                        borderRadius: '4px',
                        fontSize: '11.5px',
                        border: '1px solid #30363d',
                      }}
                    >
                      {s}
                    </span>
                    {i < skills.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            {commentHead('Experience')}
            {userData.experience.map((e, i) => (
              <div
                key={i}
                style={{
                  marginBottom: '14px',
                  padding: '14px 16px',
                  background: '#161b22',
                  border: '1px solid #30363d',
                  borderRadius: '6px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <span style={{ color: '#ffa657', fontWeight: 700 }}>{e.role}</span>
                  <span style={{ color: '#8b949e', fontSize: '11px' }}>{e.duration}</span>
                </div>
                <p style={{ color: '#7ee787', margin: '0 0 4px', fontSize: '12px' }}>
                  {e.organization}
                </p>
                <p style={{ color: '#c9d1d9', margin: 0, lineHeight: 1.5, fontSize: '12px' }}>
                  {e.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            {commentHead('Projects')}
            {userData.projects.map((p, i) => (
              <div
                key={i}
                style={{
                  marginBottom: '14px',
                  padding: '14px 16px',
                  background: '#161b22',
                  border: '1px solid #30363d',
                  borderRadius: '6px',
                }}
              >
                <h3 style={{ color: '#ffa657', fontSize: '13px', fontWeight: 700, margin: '0 0 4px' }}>
                  {p.title}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                  {p.tools.split(',').filter(Boolean).map((t, ti) => (
                    <span
                      key={ti}
                      style={{
                        fontSize: '10.5px',
                        background: '#0d1117',
                        color: '#58a6ff',
                        padding: '1px 8px',
                        borderRadius: '4px',
                        border: '1px solid #30363d',
                      }}
                    >
                      {t.trim()}
                    </span>
                  ))}
                </div>
                <p style={{ color: '#c9d1d9', margin: 0, lineHeight: 1.5, fontSize: '12px' }}>
                  {p.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.education && userData.education && userData.education.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            {commentHead('Education')}
            {userData.education.map((e, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  padding: '12px 16px',
                  background: '#161b22',
                  border: '1px solid #30363d',
                  borderRadius: '6px',
                }}
              >
                <div>
                  <span style={{ color: '#ffa657', fontWeight: 700, fontSize: '12.5px' }}>
                    {e.degree} in {e.field}
                  </span>
                  <p style={{ color: '#8b949e', margin: '2px 0 0', fontSize: '12px' }}>
                    {e.institution}{e.grade ? ` \u2014 ${e.grade}` : ''}
                  </p>
                </div>
                <span style={{ color: '#8b949e', fontSize: '11px', whiteSpace: 'nowrap' }}>
                  {e.startYear} – {e.endYear}
                </span>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            {commentHead('Achievements')}
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#c9d1d9', lineHeight: 1.7, fontSize: '12px' }}>
              {userData.achievements.map((a, i) => (
                <li key={i}>{a.title}</li>
              ))}
            </ul>
          </section>
        )}

        {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
          <section>
            {commentHead('Interests')}
            <p style={{ color: '#c9d1d9', margin: 0, fontSize: '12px' }}>
              {userData.hobbies.join('  \u00b7  ')}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

```


---

## File: `client/src/components/preview/ResumeTimeline.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";

function TimelineSection({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section style={{ marginBottom: '36px' }}>
      <h2
        style={{
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize: '16px',
          fontWeight: 700,
          color: '#1e1b4b',
          margin: '0 0 20px',
          letterSpacing: '0.02em',
          textAlign: 'center',
        }}
      >
        {title}
      </h2>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: 'calc(50% - 1.5px)',
            top: 0,
            bottom: 0,
            width: '3px',
            background: 'linear-gradient(to bottom, #4f46e5, #7c3aed)',
            zIndex: 0,
          }}
        />
        {children}
      </div>
    </section>
  );
}

function TimelineItem({ index, children }: { index: number; children: React.ReactNode }) {
  const isLeft = index % 2 === 0;
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        zIndex: 1,
        marginBottom: '28px',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          width: 'calc(50% - 32px)',
          paddingRight: isLeft ? '0' : '32px',
          paddingLeft: isLeft ? '0' : '0',
          order: isLeft ? 0 : 2,
        }}
      >
        {isLeft && children}
      </div>
      <div
        style={{
          width: '64px',
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '16px',
          order: 1,
        }}
      >
        <div
          style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            border: '3px solid #ffffff',
            boxShadow: '0 0 0 2px #4f46e5',
          }}
        />
      </div>
      <div
        style={{
          width: 'calc(50% - 32px)',
          paddingLeft: isLeft ? '32px' : '0',
          paddingRight: isLeft ? '0' : '0',
          order: isLeft ? 2 : 0,
        }}
      >
        {!isLeft && children}
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '10px',
        padding: '16px 18px',
        border: '1px solid #ede9fe',
        boxShadow: '0 2px 8px rgba(79, 70, 229, 0.06)',
      }}
    >
      {children}
    </div>
  );
}

export function ResumeTimeline() {
  const { userData, sectionVisibility } = useBuilder();

  const contactItems = [
    userData.email,
    userData.phone,
    userData.links?.linkedin,
    userData.links?.github,
  ].filter(Boolean);

  return (
    <div
      id="resume-preview-content"
      role="document"
      style={{
        fontFamily: "'Lato', 'Inter', system-ui, sans-serif",
        width: '816px',
        minHeight: '1056px',
        background: '#faf9ff',
        color: '#334155',
        fontSize: '13px',
        lineHeight: 1.5,
      }}
    >
      <style>{`@media print{@page{margin:0;}*{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}`}</style>
      <header
        style={{
          padding: '40px 48px 28px',
          background: 'linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)',
          borderBottom: '1px solid #e0e7ff',
        }}
      >
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            fontSize: '36px',
            fontWeight: 700,
            color: '#1e1b4b',
            margin: 0,
            letterSpacing: '-0.3px',
          }}
        >
          {userData.fullName || 'Your Name'}
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: '#6b7280',
            marginTop: '4px',
            marginBottom: 0,
          }}
        >
          {userData.role || 'Your Role'}
        </p>
        {contactItems.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '16px',
              fontSize: '12.5px',
              color: '#6b7280',
              marginTop: '12px',
              flexWrap: 'wrap',
            }}
          >
            {contactItems.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        )}
      </header>

      <div style={{ padding: '28px 44px 40px' }}>
        {sectionVisibility.summary && userData.summary && (
          <section style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: 700,
                color: '#1e1b4b',
                margin: '0 0 10px',
              }}
            >
              Origin Story
            </h2>
            <p
              style={{
                fontSize: '13px',
                lineHeight: 1.6,
                color: '#475569',
                margin: 0,
                maxWidth: '620px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {userData.summary}
            </p>
          </section>
        )}

        {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
          <section style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: 700,
                color: '#1e1b4b',
                margin: '0 0 10px',
              }}
            >
              Core Competencies
            </h2>
            <p
              style={{
                fontSize: '13px',
                color: '#475569',
                margin: 0,
                lineHeight: 1.7,
              }}
            >
              {userData.skills.join('  \u00b7  ')}
            </p>
          </section>
        )}

        {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
          <TimelineSection title="Career Arc">
            {userData.experience.map((e, i) => (
              <TimelineItem key={i} index={i}>
                <Card>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: '14px', fontWeight: 700, color: '#1e1b4b', margin: 0 }}>
                      {e.role}
                    </h3>
                    <span style={{ fontSize: '11px', color: '#8b5cf6', fontWeight: 600 }}>{e.duration}</span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#8b5cf6', fontWeight: 500, margin: '2px 0 4px' }}>
                    {e.organization}
                  </p>
                  <p style={{ fontSize: '12.5px', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                    {e.description}
                  </p>
                </Card>
              </TimelineItem>
            ))}
          </TimelineSection>
        )}

        {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
          <TimelineSection title="Project Portfolio">
            {userData.projects.map((p, i) => (
              <TimelineItem key={i} index={i}>
                <Card>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: '13.5px', fontWeight: 700, color: '#1e1b4b', margin: '0 0 2px' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#8b5cf6', fontStyle: 'italic', margin: '0 0 4px' }}>
                    {p.tools}
                  </p>
                  <p style={{ fontSize: '12.5px', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                    {p.description}
                  </p>
                </Card>
              </TimelineItem>
            ))}
          </TimelineSection>
        )}

        {sectionVisibility.education && userData.education && userData.education.length > 0 && (
          <TimelineSection title="Education Foundation">
            {userData.education.map((e, i) => (
              <TimelineItem key={i} index={i}>
                <Card>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: '#1e1b4b', margin: 0 }}>
                      {e.degree} in {e.field}
                    </h3>
                    <span style={{ fontSize: '11px', color: '#8b5cf6', whiteSpace: 'nowrap' }}>
                      {e.startYear} – {e.endYear}
                    </span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#475569', margin: '4px 0 0' }}>
                    {e.institution}{e.grade ? ` \u2014 ${e.grade}` : ''}
                  </p>
                </Card>
              </TimelineItem>
            ))}
          </TimelineSection>
        )}

        {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: 700,
                color: '#1e1b4b',
                textAlign: 'center',
                margin: '0 0 12px',
              }}
            >
              Milestones
            </h2>
            <ul style={{ margin: 0, paddingLeft: '24px', fontSize: '12.5px', color: '#475569', lineHeight: 1.7 }}>
              {userData.achievements.map((a, i) => (
                <li key={i}>{a.title}</li>
              ))}
            </ul>
          </section>
        )}

        {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
          <section>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: 700,
                color: '#1e1b4b',
                textAlign: 'center',
                margin: '0 0 8px',
              }}
            >
              Personal Dimension
            </h2>
            <p style={{ fontSize: '12.5px', color: '#475569', margin: 0, textAlign: 'center' }}>
              {userData.hobbies.join('  \u00b7  ')}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

```


---

## File: `client/src/components/preview/ResumesClassic.tsx`

```tsx
import { useBuilder } from "@/contexts/BuilderContext";

const GOLD = '#c9a84c';
const GOLD_LIGHT = '#f5edd6';
const DARK = '#1e1e1e';
const BODY = '#3c3c3c';

export function ResumeClassic() {
  const { userData, sectionVisibility } = useBuilder();

  return (
    <div id="resume-preview-content" role="document" style={{ fontFamily: "'Merriweather', 'Georgia', 'Times New Roman', serif", width: '816px', minHeight: '1056px', background: '#fff', color: BODY, lineHeight: 1.6 }}>
      <style>{`@media print{body{color:#3c3c3c!important}.gold-color{color:#c9a84c!important}.gold-border{border-color:#c9a84c!important}}`}</style>
      <div style={{ borderTop: `4px solid ${GOLD}` }}>
        <header style={{ padding: '44px 52px 24px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '30px', fontWeight: 700, color: DARK, margin: '0 0 2px', letterSpacing: '0.01em' }}>{userData.fullName || "Your Name"}</h1>
          <div style={{ width: '48px', height: '2px', background: GOLD, margin: '8px auto' }} />
          <p style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '15px', color: GOLD, fontWeight: 600, margin: '0 0 12px', fontStyle: 'italic' }}>{userData.role || "Your Role"}</p>
          <div style={{ fontSize: '11.5px', color: '#6b7280', display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {[userData.email, userData.phone, userData.links?.linkedin, userData.links?.github].filter(Boolean).map((item, i, arr) => (
              <span key={i}>{item}{i < arr.length - 1 ? <span style={{ margin: '0 6px', color: GOLD }}>•</span> : null}</span>
            ))}
          </div>
        </header>

        <div style={{ padding: '0 52px 40px' }}>
          {sectionVisibility.summary && userData.summary && (
            <section style={{ marginBottom: '22px', paddingLeft: '14px', borderLeft: `3px solid ${GOLD}` }}>
              <h2 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '17px', fontWeight: 700, color: DARK, margin: '0 0 6px' }}>Professional Summary</h2>
              <p style={{ fontSize: '12.5px', lineHeight: 1.65, color: BODY, margin: 0 }}>{userData.summary}</p>
            </section>
          )}

          {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
            <section style={{ marginBottom: '22px', paddingLeft: '14px', borderLeft: `3px solid ${GOLD}` }}>
              <h2 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '17px', fontWeight: 700, color: DARK, margin: '0 0 10px' }}>Experience</h2>
              {userData.experience.map((e, i) => (
                <article key={i} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: DARK, margin: 0 }}>{e.role}</h3>
                    <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: "'Lato', 'Arial', sans-serif" }}>{e.duration}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: GOLD, fontWeight: 600, margin: '1px 0 4px' }}>{e.organization}</p>
                  <p style={{ fontSize: '12px', lineHeight: 1.55, color: BODY, margin: 0 }}>{e.description}</p>
                </article>
              ))}
            </section>
          )}

          {sectionVisibility.education && userData.education && userData.education.length > 0 && (
            <section style={{ marginBottom: '22px', paddingLeft: '14px', borderLeft: `3px solid ${GOLD}` }}>
              <h2 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '17px', fontWeight: 700, color: DARK, margin: '0 0 10px' }}>Education</h2>
              {userData.education.map((e, i) => (
                <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '12.5px', fontWeight: 700, color: DARK, margin: 0 }}>{e.degree} in {e.field}</h3>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '1px 0 0' }}>{e.institution}{e.grade ? ` — ${e.grade}` : ''}</p>
                  </div>
                  <span style={{ fontSize: '11px', color: '#9ca3af', whiteSpace: 'nowrap', fontFamily: "'Lato', 'Arial', sans-serif" }}>{e.startYear} – {e.endYear}</span>
                </div>
              ))}
            </section>
          )}

          {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
            <section style={{ marginBottom: '22px', paddingLeft: '14px', borderLeft: `3px solid ${GOLD}` }}>
              <h2 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '17px', fontWeight: 700, color: DARK, margin: '0 0 6px' }}>Skills</h2>
              <p style={{ fontSize: '12.5px', lineHeight: 1.7, color: BODY, margin: 0 }}>{userData.skills.join('  •  ')}</p>
            </section>
          )}

          {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
            <section style={{ marginBottom: '22px', paddingLeft: '14px', borderLeft: `3px solid ${GOLD}` }}>
              <h2 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '17px', fontWeight: 700, color: DARK, margin: '0 0 10px' }}>Projects</h2>
              {userData.projects.map((p, i) => (
                <article key={i} style={{ marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: DARK, margin: '0 0 2px' }}>{p.title}</h3>
                  <p style={{ fontSize: '11.5px', color: GOLD, fontWeight: 500, margin: '0 0 3px' }}>{p.tools}</p>
                  <p style={{ fontSize: '12px', lineHeight: 1.5, color: BODY, margin: 0 }}>{p.description}</p>
                </article>
              ))}
            </section>
          )}

          {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
            <section style={{ marginBottom: '20px', paddingLeft: '14px', borderLeft: `3px solid ${GOLD}` }}>
              <h2 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '17px', fontWeight: 700, color: DARK, margin: '0 0 6px' }}>Achievements</h2>
              {userData.achievements.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '3px' }}>
                  <span style={{ color: GOLD, fontSize: '14px' }}>✦</span>
                  <p style={{ fontSize: '12px', color: BODY, margin: 0, lineHeight: 1.5 }}>{a.title}</p>
                </div>
              ))}
            </section>
          )}

          {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
            <section style={{ paddingLeft: '14px', borderLeft: `3px solid ${GOLD}` }}>
              <h2 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '17px', fontWeight: 700, color: DARK, margin: '0 0 6px' }}>Interests</h2>
              <p style={{ fontSize: '12px', color: BODY, margin: 0, lineHeight: 1.6 }}>{userData.hobbies.join('  •  ')}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

```


---

## File: `client/src/components/ui/accordion.tsx`

```tsx
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

```


---

## File: `client/src/components/ui/alert-dialog.tsx`

```tsx
import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

```


---

## File: `client/src/components/ui/alert.tsx`

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }

```


---

## File: `client/src/components/ui/aspect-ratio.tsx`

```tsx
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }

```


---

## File: `client/src/components/ui/avatar.tsx`

```tsx
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(`
      after:content-[''] after:block after:absolute after:inset-0 after:rounded-full after:pointer-events-none after:border after:border-black/10 dark:after:border-white/10
      relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full`,
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

```


---

## File: `client/src/components/ui/badge.tsx`

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // Whitespace-nowrap: Badges should never wrap.
  "whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" +
  " hover-elevate " ,
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-xs",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-xs",

        outline: " border [border-color:var(--badge-outline)] shadow-xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants }

```


---

## File: `client/src/components/ui/breadcrumb.tsx`

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

```


---

## File: `client/src/components/ui/button.tsx`

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0" +
  " hover-elevate active-elevate-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-primary-border",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive-border",
        outline:
          // Shows the background color of whatever card / sidebar / accent background it is inside of.
          // Inherits the current text color.
          " border [border-color:var(--button-outline)]  shadow-xs active:shadow-none ",
        secondary: "border bg-secondary text-secondary-foreground border border-secondary-border ",
        // Add a transparent border so that when someone toggles a border on later, it doesn't shift layout/size.
        ghost: "border border-transparent",
      },
      // Heights are set as "min" heights, because sometimes Ai will place large amount of content
      // inside buttons. With a min-height they will look appropriate with small amounts of content,
      // but will expand to fit large amounts of content.
      size: {
        default: "min-h-9 px-4 py-2",
        sm: "min-h-8 rounded-md px-3 text-xs",
        lg: "min-h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

```


---

## File: `client/src/components/ui/calendar.tsx`

```tsx
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

```


---

## File: `client/src/components/ui/card.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "shadcn-card rounded-xl border bg-card border-card-border text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
}

```


---

## File: `client/src/components/ui/carousel.tsx`

```tsx
import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}

```


---

## File: `client/src/components/ui/chart.tsx`

```tsx
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}

```


---

## File: `client/src/components/ui/checkbox.tsx`

```tsx
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

```


---

## File: `client/src/components/ui/collapsible.tsx`

```tsx
"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

```


---

## File: `client/src/components/ui/command.tsx`

```tsx
import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}

```


---

## File: `client/src/components/ui/context-menu.tsx`

```tsx
import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 max-h-[--radix-context-menu-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}

```


---

## File: `client/src/components/ui/dialog.tsx`

```tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

```


---

## File: `client/src/components/ui/drawer.tsx`

```tsx
"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}

```


---

## File: `client/src/components/ui/dropdown-menu.tsx`

```tsx
import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}

```


---

## File: `client/src/components/ui/form.tsx`

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```


---

## File: `client/src/components/ui/hover-card.tsx`

```tsx
"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-hover-card-content-transform-origin]",
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }

```


---

## File: `client/src/components/ui/input-otp.tsx`

```tsx
import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }

```


---

## File: `client/src/components/ui/input.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    // h-9 to match icon buttons and default buttons.
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```


---

## File: `client/src/components/ui/label.tsx`

```tsx
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```


---

## File: `client/src/components/ui/menubar.tsx`

```tsx
"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}

```


---

## File: `client/src/components/ui/navigation-menu.tsx`

```tsx
import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}

```


---

## File: `client/src/components/ui/pagination.tsx`

```tsx
import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}

```


---

## File: `client/src/components/ui/popover.tsx`

```tsx
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }

```


---

## File: `client/src/components/ui/progress.tsx`

```tsx
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

```


---

## File: `client/src/components/ui/radio-group.tsx`

```tsx
import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }

```


---

## File: `client/src/components/ui/resizable.tsx`

```tsx
"use client"

import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

```


---

## File: `client/src/components/ui/scroll-area.tsx`

```tsx
import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }

```


---

## File: `client/src/components/ui/select.tsx`

```tsx
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

```


---

## File: `client/src/components/ui/separator.tsx`

```tsx
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

```


---

## File: `client/src/components/ui/sheet.tsx`

```tsx
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```


---

## File: `client/src/components/ui/sidebar.tsx`

```tsx
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-[var(--sidebar-width)] flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-[var(--sidebar-width)] p-0 [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+var(--spacing-4))]"
            : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]"
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+var(--spacing-4)+2px)]"
            : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  // Note: Tailwind v3.4 doesn't support "in-" selectors. So the rail won't work perfectly.
  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:w-8! group-data-[collapsible=icon]:h-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-[var(--skeleton-width)] flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline outline-2 outline-transparent outline-offset-2 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}

```


---

## File: `client/src/components/ui/skeleton.tsx`

```tsx
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }

```


---

## File: `client/src/components/ui/slider.tsx`

```tsx
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }

```


---

## File: `client/src/components/ui/switch.tsx`

```tsx
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

```


---

## File: `client/src/components/ui/table.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```


---

## File: `client/src/components/ui/tabs.tsx`

```tsx
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

```


---

## File: `client/src/components/ui/textarea.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

```


---

## File: `client/src/components/ui/toast.tsx`

```tsx
import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}

```


---

## File: `client/src/components/ui/toaster.tsx`

```tsx
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

```


---

## File: `client/src/components/ui/toggle-group.tsx`

```tsx
"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }

```


---

## File: `client/src/components/ui/toggle.tsx`

```tsx
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3 min-w-10",
        sm: "h-9 px-2.5 min-w-9",
        lg: "h-11 px-5 min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }

```


---

## File: `client/src/components/ui/tooltip.tsx`

```tsx
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

```


---

## File: `client/src/contexts/BuilderContext.tsx`

```tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { UserData, SectionVisibility, SectionOrder } from "@shared/schema";
import { storage } from "@/lib/storage";

interface BuilderContextType {
  userData: Partial<UserData>;
  updateUserData: (data: Partial<UserData>) => void;
  clearUserData: () => void;
  sectionVisibility: SectionVisibility;
  updateSectionVisibility: (visibility: Partial<SectionVisibility>) => void;
  sectionOrder: SectionOrder;
  updateSectionOrder: (order: SectionOrder) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isSaving: boolean;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<Partial<UserData>>({});
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>(
    storage.getSectionVisibility()
  );
  const [sectionOrder, setSectionOrder] = useState<SectionOrder>(
    storage.getSectionOrder()
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Load data on mount
  useEffect(() => {
    const savedData = storage.getUserData();
    if (savedData) {
      setUserData(savedData);
    }
  }, []);

  const updateUserData = (data: Partial<UserData>) => {
    setIsSaving(true);
    setUserData((prev) => {
      // Deep merge for nested objects and arrays
      const updated: Partial<UserData> = { ...prev };
      
      // Handle nested links object
      if (data.links) {
        updated.links = { ...prev.links, ...data.links };
      }
      
      // Handle arrays - replace completely when provided
      if (data.skills !== undefined) updated.skills = data.skills;
      if (data.education !== undefined) updated.education = data.education;
      if (data.projects !== undefined) updated.projects = data.projects;
      if (data.experience !== undefined) updated.experience = data.experience;
      if (data.achievements !== undefined) updated.achievements = data.achievements;
      if (data.hobbies !== undefined) updated.hobbies = data.hobbies;
      
      // Handle other scalar values
      if (data.fullName !== undefined) updated.fullName = data.fullName;
      if (data.role !== undefined) updated.role = data.role;
      if (data.email !== undefined) updated.email = data.email;
      if (data.phone !== undefined) updated.phone = data.phone;
      if (data.profileImage !== undefined) updated.profileImage = data.profileImage;
      if (data.summary !== undefined) updated.summary = data.summary;
      if (data.hasExperience !== undefined) updated.hasExperience = data.hasExperience;
      if (data.portfolioHero !== undefined) updated.portfolioHero = data.portfolioHero;
      if (data.selectedTemplate !== undefined) updated.selectedTemplate = data.selectedTemplate;
      
      storage.saveUserData(updated);
      return updated;
    });
    setTimeout(() => setIsSaving(false), 500);
  };

  const clearUserData = () => {
    storage.clearUserData();
    setUserData({});
    setSectionVisibility(storage.getSectionVisibility());
    setSectionOrder(storage.getSectionOrder());
    setCurrentStep(0);
  };

  const updateSectionVisibility = (visibility: Partial<SectionVisibility>) => {
    setSectionVisibility((prev) => {
      const updated = { ...prev, ...visibility };
      storage.saveSectionVisibility(updated);
      return updated;
    });
  };

  const updateSectionOrder = (order: SectionOrder) => {
    setSectionOrder(order);
    storage.saveSectionOrder(order);
  };

  return (
    <BuilderContext.Provider
      value={{
        userData,
        updateUserData,
        clearUserData,
        sectionVisibility,
        updateSectionVisibility,
        sectionOrder,
        updateSectionOrder,
        currentStep,
        setCurrentStep,
        isSaving,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within BuilderProvider");
  }
  return context;
}

```


---

## File: `client/src/hooks/use-mobile.tsx`

```tsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

```


---

## File: `client/src/hooks/use-toast.ts`

```ts
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }

```


---

## File: `client/src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* LIGHT MODE */
:root {
  --button-outline: rgba(0,0,0, .10);
  --badge-outline: rgba(0,0,0, .05);
  --opaque-button-border-intensity: -8;
  --elevate-1: rgba(0,0,0, .03);
  --elevate-2: rgba(0,0,0, .08);
  --background: 220 20% 98%;
  --foreground: 224 71% 4%;
  --border: 0 0% 90%;
  --card: 0 0% 100%;
  --card-foreground: 224 71% 4%;
  --card-border: 220 13% 91%;
  --sidebar: 0 0% 96%;
  --sidebar-foreground: 224 71% 4%;
  --sidebar-border: 0 0% 92%;
  --sidebar-primary: 238 84% 67%;
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-accent: 0 0% 92%;
  --sidebar-accent-foreground: 224 71% 4%;
  --sidebar-ring: 238 84% 67%;
  --popover: 0 0% 94%;
  --popover-foreground: 224 71% 4%;
  --popover-border: 0 0% 90%;
  --primary: 238 84% 67%;
  --primary-foreground: 0 0% 100%;
  --secondary: 0 0% 90%;
  --secondary-foreground: 224 71% 4%;
  --muted: 220 14% 94%;
  --muted-foreground: 220 9% 46%;
  --accent: 238 15% 92%;
  --accent-foreground: 224 71% 4%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --input: 0 0% 80%;
  --ring: 238 84% 67%;
  --chart-1: 217 91% 45%;
  --chart-2: 142 76% 36%;
  --chart-3: 262 83% 58%;
  --chart-4: 32 95% 44%;
  --chart-5: 340 82% 52%;
  --font-sans: Inter, system-ui, -apple-system, sans-serif;
  --font-serif: Georgia, serif;
  --font-mono: 'Courier New', monospace;
  --radius: .5rem;
  --shadow-2xs: 0px 2px 0px 0px hsl(0 0% 0% / 0.00);
  --shadow-xs: 0px 2px 0px 0px hsl(0 0% 0% / 0.00);
  --shadow-sm: 0px 2px 0px 0px hsl(0 0% 0% / 0.00), 0px 1px 2px -1px hsl(0 0% 0% / 0.00);
  --shadow: 0px 2px 0px 0px hsl(0 0% 0% / 0.00), 0px 1px 2px -1px hsl(0 0% 0% / 0.00);
  --shadow-md: 0px 2px 0px 0px hsl(0 0% 0% / 0.00), 0px 2px 4px -1px hsl(0 0% 0% / 0.00);
  --shadow-lg: 0px 2px 0px 0px hsl(0 0% 0% / 0.00), 0px 4px 6px -1px hsl(0 0% 0% / 0.00);
  --shadow-xl: 0px 2px 0px 0px hsl(0 0% 0% / 0.00), 0px 8px 10px -1px hsl(0 0% 0% / 0.00);
  --shadow-2xl: 0px 2px 0px 0px hsl(0 0% 0% / 0.00);
  --tracking-normal: 0em;
  --spacing: 0.25rem;

/* Fallback for older browsers */
  --sidebar-primary-border: hsl(var(--sidebar-primary));
  --sidebar-primary-border: hsl(from hsl(var(--sidebar-primary)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);

  /* Fallback for older browsers */
  --sidebar-accent-border: hsl(var(--sidebar-accent));
  --sidebar-accent-border: hsl(from hsl(var(--sidebar-accent)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);

  /* Fallback for older browsers */
  --primary-border: hsl(var(--primary));
  --primary-border: hsl(from hsl(var(--primary)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);

  /* Fallback for older browsers */
  --secondary-border: hsl(var(--secondary));
  --secondary-border: hsl(from hsl(var(--secondary)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);

  /* Fallback for older browsers */
  --muted-border: hsl(var(--muted));
  --muted-border: hsl(from hsl(var(--muted)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);

  /* Fallback for older browsers */
  --accent-border: hsl(var(--accent));
  --accent-border: hsl(from hsl(var(--accent)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);

  /* Fallback for older browsers */
  --destructive-border: hsl(var(--destructive));
  --destructive-border: hsl(from hsl(var(--destructive)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);
}

.dark {
  --button-outline: rgba(255,255,255, .10);
  --badge-outline: rgba(255,255,255, .05);
  --opaque-button-border-intensity: 9;
  --elevate-1: rgba(255,255,255, .04);
  --elevate-2: rgba(255,255,255, .09);
  --background: 224 71% 4%;
  --foreground: 220 20% 98%;
  --border: 0 0% 18%;
  --card: 0 0% 10%;
  --card-foreground: 220 20% 98%;
  --card-border: 0 0% 14%;
  --sidebar: 0 0% 12%;
  --sidebar-foreground: 220 20% 98%;
  --sidebar-border: 0 0% 16%;
  --sidebar-primary: 238 84% 67%;
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-accent: 0 0% 16%;
  --sidebar-accent-foreground: 220 20% 98%;
  --sidebar-ring: 238 84% 67%;
  --popover: 0 0% 14%;
  --popover-foreground: 220 20% 98%;
  --popover-border: 0 0% 18%;
  --primary: 238 84% 67%;
  --primary-foreground: 0 0% 100%;
  --secondary: 0 0% 18%;
  --secondary-foreground: 220 20% 98%;
  --muted: 0 0% 17%;
  --muted-foreground: 0 0% 65%;
  --accent: 238 15% 18%;
  --accent-foreground: 220 20% 98%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --input: 0 0% 28%;
  --ring: 238 84% 67%;
  --chart-1: 217 91% 65%;
  --chart-2: 142 76% 65%;
  --chart-3: 262 83% 70%;
  --chart-4: 32 95% 65%;
  --chart-5: 340 82% 65%;
  --shadow-2xs: 0px 2px 0px 0px hsl(0 0% 100% / 0.00);
  --shadow-xs: 0px 2px 0px 0px hsl(0 0% 100% / 0.00);
  --shadow-sm: 0px 2px 0px 0px hsl(0 0% 100% / 0.00), 0px 1px 2px -1px hsl(0 0% 100% / 0.00);
  --shadow: 0px 2px 0px 0px hsl(0 0% 100% / 0.00), 0px 1px 2px -1px hsl(0 0% 100% / 0.00);
  --shadow-md: 0px 2px 0px 0px hsl(0 0% 100% / 0.00), 0px 2px 4px -1px hsl(0 0% 100% / 0.00);
  --shadow-lg: 0px 2px 0px 0px hsl(0 0% 100% / 0.00), 0px 4px 6px -1px hsl(0 0% 100% / 0.00);
  --shadow-xl: 0px 2px 0px 0px hsl(0 0% 100% / 0.00), 0px 8px 10px -1px hsl(0 0% 100% / 0.00);
  --shadow-2xl: 0px 2px 0px 0px hsl(0 0% 100% / 0.00);

/* Fallback for older browsers */
  --sidebar-primary-border: hsl(var(--sidebar-primary));
  --sidebar-primary-border: hsl(from hsl(var(--sidebar-primary)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);

  /* Fallback for older browsers */
  --sidebar-accent-border: hsl(var(--sidebar-accent));
  --sidebar-accent-border: hsl(from hsl(var(--sidebar-accent)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);

  /* Fallback for older browsers */
  --primary-border: hsl(var(--primary));
  --primary-border: hsl(from hsl(var(--primary)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);

  /* Fallback for older browsers */
  --secondary-border: hsl(var(--secondary));
  --secondary-border: hsl(from hsl(var(--secondary)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);

  /* Fallback for older browsers */
  --muted-border: hsl(var(--muted));
  --muted-border: hsl(from hsl(var(--muted)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);

  /* Fallback for older browsers */
  --accent-border: hsl(var(--accent));
  --accent-border: hsl(from hsl(var(--accent)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);

  /* Fallback for older browsers */
  --destructive-border: hsl(var(--destructive));
  --destructive-border: hsl(from hsl(var(--destructive)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);
}

@layer base {
  * {
    border-color: hsl(var(--border));
  }

  body {
    font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: hsl(var(--background));
    color: hsl(var(--foreground));
  }
}

/**
 * Using the elevate system.
 * Automatic contrast adjustment.
 *
 * <element className="hover-elevate" />
 * <element className="active-elevate-2" />
 *
 * // Using the tailwind utility when a data attribute is "on"
 * <element className="toggle-elevate data-[state=on]:toggle-elevated" />
 * // Or manually controlling the toggle state
 * <element className="toggle-elevate toggle-elevated" />
 *
 * Elevation systems have to handle many states.
 * - not-hovered, vs. hovered vs. active  (three mutually exclusive states)
 * - toggled or not
 * - focused or not (this is not handled with these utilities)
 *
 * Even without handling focused or not, this is six possible combinations that
 * need to be distinguished from eachother visually.
 */
@layer utilities {

  /* Hide ugly search cancel button in Chrome until we can style it properly */
  input[type="search"]::-webkit-search-cancel-button {
    @apply hidden;
  }

  /* Placeholder styling for contentEditable div */
  [contenteditable][data-placeholder]:empty::before {
    content: attr(data-placeholder);
    color: hsl(var(--muted-foreground));
    pointer-events: none;
  }

  /* .no-default-hover-elevate/no-default-active-elevate is an escape hatch so consumers of
   * buttons/badges can remove the automatic brightness adjustment on interactions
   * and program their own. */
  .no-default-hover-elevate {}

  .no-default-active-elevate {}


  /**
   * Toggleable backgrounds go behind the content. Hoverable/active goes on top.
   * This way they can stack/compound. Both will overlap the parent's borders!
   * So borders will be automatically adjusted both on toggle, and hover/active,
   * and they will be compounded.
   */
  .toggle-elevate::before,
  .toggle-elevate-2::before {
    content: "";
    pointer-events: none;
    position: absolute;
    inset: 0px;
    /*border-radius: inherit;   match rounded corners */
    border-radius: inherit;
    z-index: -1;
    /* sits behind content but above backdrop */
  }

  .toggle-elevate.toggle-elevated::before {
    background-color: var(--elevate-2);
  }

  /* If there's a 1px border, adjust the inset so that it covers that parent's border */
  .border.toggle-elevate::before {
    inset: -1px;
  }

  /* Does not work on elements with overflow:hidden! */
  .hover-elevate:not(.no-default-hover-elevate),
  .active-elevate:not(.no-default-active-elevate),
  .hover-elevate-2:not(.no-default-hover-elevate),
  .active-elevate-2:not(.no-default-active-elevate) {
    position: relative;
    z-index: 0;
  }

  .hover-elevate:not(.no-default-hover-elevate)::after,
  .active-elevate:not(.no-default-active-elevate)::after,
  .hover-elevate-2:not(.no-default-hover-elevate)::after,
  .active-elevate-2:not(.no-default-active-elevate)::after {
    content: "";
    pointer-events: none;
    position: absolute;
    inset: 0px;
    /*border-radius: inherit;   match rounded corners */
    border-radius: inherit;
    z-index: 999;
    /* sits in front of content */
  }

  .hover-elevate:hover:not(.no-default-hover-elevate)::after,
  .active-elevate:active:not(.no-default-active-elevate)::after {
    background-color: var(--elevate-1);
  }

  .hover-elevate-2:hover:not(.no-default-hover-elevate)::after,
  .active-elevate-2:active:not(.no-default-active-elevate)::after {
    background-color: var(--elevate-2);
  }

  /* If there's a 1px border, adjust the inset so that it covers that parent's border */
  .border.hover-elevate:not(.no-hover-interaction-elevate)::after,
  .border.active-elevate:not(.no-active-interaction-elevate)::after,
  .border.hover-elevate-2:not(.no-hover-interaction-elevate)::after,
  .border.active-elevate-2:not(.no-active-interaction-elevate)::after,
  .border.hover-elevate:not(.no-hover-interaction-elevate)::after {
    inset: -1px;
  }
}

```


---

## File: `client/src/lib/dataExport.ts`

```ts
import type { UserData } from "@shared/schema";

export const exportUserData = (userData: Partial<UserData>): string => {
  // Create exportable data with all images
  const exportData = {
    version: "1.0",
    exportDate: new Date().toISOString(),
    data: userData,
  };
  return JSON.stringify(exportData, null, 2);
};

export const importUserData = (jsonString: string): Partial<UserData> | null => {
  try {
    const parsed = JSON.parse(jsonString);
    // Validate basic structure
    if (parsed.data && typeof parsed.data === "object") {
      return parsed.data;
    }
    // If it's just the data object without wrapper
    if (parsed.fullName) {
      return parsed;
    }
    return null;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
};

export const downloadFile = (content: string, filename: string) => {
  const element = document.createElement("a");
  element.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

```


---

## File: `client/src/lib/mockData.ts`

```ts
import type { UserData } from "@shared/schema";

export const sampleUserData: Partial<UserData> = {
  fullName: "Alex Morgan",
  role: "Senior Product Manager",
  email: "alex.morgan@example.com",
  phone: "+1 (555) 234-5678",
  summary: "Strategic product leader with 6+ years driving product vision, cross-functional team leadership, and data-informed decision making. PMP certified with a track record of delivering SaaS products from zero to 50k users.",
  skills: ["Product Strategy", "Roadmapping", "Agile", "Data Analysis", "A/B Testing", "Figma", "SQL", "Python"],
  links: {
    github: "https://github.com/alexmorgan",
    linkedin: "https://linkedin.com/in/alexmorgan",
    portfolio: "https://alexmorgan.dev",
  },
  education: [
    {
      id: "1",
      institution: "Stanford University",
      degree: "Master of Business Administration",
      field: "Product Management",
      startYear: "2018",
      endYear: "2020",
      grade: "3.9",
    },
    {
      id: "2",
      institution: "UC Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science & Economics",
      startYear: "2013",
      endYear: "2017",
      grade: "3.7",
    },
  ],
  projects: [
    {
      id: "1",
      title: "GrowthPlay — Revenue Intelligence Platform",
      tools: "React, Python, PostgreSQL, AWS, Stripe",
      description: "Led product from concept to 10k MRR within 12 months. Defined OKRs, ran 50+ user interviews, and shipped 3 major releases improving activation by 34%.",
      images: [],
    },
    {
      id: "2",
      title: "TeamFlow — OKR & Collaboration Tool",
      tools: "Next.js, TypeScript, Supabase, Tailwind",
      description: "Designed and shipped an internal OKR tracking tool adopted by 12 teams. Iterated based on NPS feedback loops with bi-weekly ship cycles.",
      images: [],
    },
  ],
  experience: [
    {
      id: "1",
      role: "Senior Product Manager",
      organization: "ScaleUp SaaS Inc.",
      duration: "2022 - Present",
      description: "Own platform-wide product roadmap serving 50k+ users. Drove 3 consecutive quarters of 20%+ ARR growth through pricing experiments and feature discovery.",
    },
    {
      id: "2",
      role: "Product Manager",
      organization: "Launchpad Technologies",
      duration: "2020 - 2022",
      description: "Managed the full product lifecycle for a B2B analytics product. Introduced continuous discovery habits, reducing time-to-validation by 40%.",
    },
  ],
  achievements: [
    {
      id: "1",
      title: "PMP Certified (Project Management Professional)",
      description: undefined,
    },
    {
      id: "2",
      title: "Product School Graduate — Product Leadership Certificate",
      description: undefined,
    },
    {
      id: "3",
      title: "Speaker at ProductCon 2024 — \"Data-Driven Roadmaps\"",
      description: undefined,
    },
  ],
  hobbies: ["Product analytics meetups", "Mentoring PMs", "Trail running", "Jazz piano"],
  hasExperience: true,
  portfolioHero: "Turning ambitious ideas into products people love",
};

```


---

## File: `client/src/lib/queryClient.ts`

```ts
import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

```


---

## File: `client/src/lib/storage.ts`

```ts
import type { UserData, SectionVisibility, SectionOrder } from "@shared/schema";

const STORAGE_KEY = "resume_builder_data";
const VISIBILITY_KEY = "resume_builder_visibility";
const ORDER_KEY = "resume_builder_order";

export const storage = {
  // User data operations
  getUserData(): UserData | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error reading user data from localStorage:", error);
      return null;
    }
  },

  saveUserData(data: Partial<UserData>): void {
    try {
      const existing = this.getUserData() || {};
      const updated = { ...existing, ...data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error saving user data to localStorage:", error);
    }
  },

  clearUserData(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(VISIBILITY_KEY);
      localStorage.removeItem(ORDER_KEY);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },

  // Section visibility operations
  getSectionVisibility(): SectionVisibility {
    try {
      const data = localStorage.getItem(VISIBILITY_KEY);
      return data ? JSON.parse(data) : {
        summary: true,
        skills: true,
        education: true,
        projects: true,
        experience: true,
        achievements: true,
        hobbies: true,
      };
    } catch (error) {
      console.error("Error reading visibility data:", error);
      return {
        summary: true,
        skills: true,
        education: true,
        projects: true,
        experience: true,
        achievements: true,
        hobbies: true,
      };
    }
  },

  saveSectionVisibility(visibility: SectionVisibility): void {
    try {
      localStorage.setItem(VISIBILITY_KEY, JSON.stringify(visibility));
    } catch (error) {
      console.error("Error saving visibility data:", error);
    }
  },

  // Section order operations
  getSectionOrder(): SectionOrder {
    try {
      const data = localStorage.getItem(ORDER_KEY);
      return data ? JSON.parse(data) : [
        "summary",
        "skills",
        "education",
        "projects",
        "experience",
        "achievements",
        "hobbies",
      ];
    } catch (error) {
      console.error("Error reading order data:", error);
      return [
        "summary",
        "skills",
        "education",
        "projects",
        "experience",
        "achievements",
        "hobbies",
      ];
    }
  },

  saveSectionOrder(order: SectionOrder): void {
    try {
      localStorage.setItem(ORDER_KEY, JSON.stringify(order));
    } catch (error) {
      console.error("Error saving order data:", error);
    }
  },

  // Image utilities
  async imageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  async resizeImage(file: File, maxWidth: number = 800, maxHeight: number = 800): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.85));
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
};

```


---

## File: `client/src/lib/templates.ts`

```ts
import type { Template } from "@shared/schema";

export const templates: Template[] = [
  // ── RESUME TEMPLATES (10) ──
  {
    id: "resume-classic",
    name: "Classic Timeless",
    description: "Traditional ATS-friendly layout with gold accents — ideal for law, finance & consulting",
    type: "resume",
    thumbnail: "",
    category: "Professional",
    profession: "law",
    features: ["ATS-Optimized", "Gold Accents", "Serif Typography", "Harvard Law Style"],
  },
  {
    id: "resume-modern",
    name: "Clean Sidebar Pro",
    description: "Navy sidebar layout with clean typography — great for corporate & admin roles",
    type: "resume",
    thumbnail: "",
    category: "Modern",
    profession: "business",
    features: ["Sidebar Layout", "Navy Accent", "ATS-Friendly", "Modern Sans"],
  },
  {
    id: "resume-creative",
    name: "Bold Creative Splash",
    description: "Purple gradient header with vibrant two-column layout for students & creatives",
    type: "resume",
    thumbnail: "",
    category: "Creative",
    profession: "creative",
    features: ["Gradient Header", "Two-Column", "Student-Friendly", "Colorful"],
  },
  {
    id: "resume-experience",
    name: "Executive Timeline",
    description: "Charcoal left-border timeline with warm cards — made for experienced professionals",
    type: "resume",
    thumbnail: "",
    category: "Professional",
    profession: "executive",
    features: ["Timeline Layout", "Warm Palette", "Experience-First", "C-Suite Ready"],
  },
  {
    id: "resume-singlecolumn",
    name: "Minimalist Swiss",
    description: "Swiss-grid single-column layout with single red accent dot — print perfection",
    type: "resume",
    thumbnail: "",
    category: "Modern",
    profession: "design",
    features: ["Swiss Grid", "Single Column", "Minimalist", "Print Ready"],
  },
  {
    id: "resume-executive",
    name: "C-Suite Impact",
    description: "Midnight navy & gold boardroom-quality resume for C-level executives",
    type: "resume",
    thumbnail: "",
    category: "Professional",
    profession: "executive",
    features: ["Executive Style", "Gold Foil Accents", "Boardroom Grade", "FAANG-Ready"],
  },
  {
    id: "resume-techstack",
    name: "Dev Aesthetic Dark",
    description: "GitHub-dark theme with green syntax highlights and JSON-style header for developers",
    type: "resume",
    thumbnail: "",
    category: "Tech",
    profession: "engineering",
    features: ["Dark Theme", "Syntax Highlighting", "JSON Header", "Monospace Code"],
  },
  {
    id: "resume-timeline",
    name: "Story Arc",
    description: "Indigo/violet gradient progression timeline for a narrative-driven career story",
    type: "resume",
    thumbnail: "",
    category: "Creative",
    profession: "creative",
    features: ["Progression Timeline", "Gradient Accents", "Story Focus", "Visual Narrative"],
  },
  {
    id: "resume-compact",
    name: "ATS Maximizer",
    description: "Zero-decoration, maximum-density ATS resume — built to pass automated scanners",
    type: "resume",
    thumbnail: "",
    category: "ATS Optimized",
    profession: "general",
    features: ["98/100 ATS Score", "Zero Decoration", "Max Density", "Taleo & Workday Safe"],
  },
  {
    id: "resume-elegant",
    name: "Editorial Luxe",
    description: "Cream editorial layout with Playfair Display italics — for publishing & media roles",
    type: "resume",
    thumbnail: "",
    category: "Creative",
    profession: "media",
    features: ["Playfair Display", "Editorial Style", "Cream Palette", "Refined Serif"],
  },

  // ── PORTFOLIO TEMPLATES (10) ──
  {
    id: "portfolio-simple",
    name: "Coastal Clean",
    description: "Off-white background with teal accents and sticky navigation for a calm, professional vibe",
    type: "portfolio",
    thumbnail: "",
    category: "Minimal",
    profession: "design",
    features: ["One-Page", "Teal Accents", "Sticky Nav", "Responsive"],
  },
  {
    id: "portfolio-grid",
    name: "Metro Grid",
    description: "Blue & white masonry grid layout with skill-based project filter for developers",
    type: "portfolio",
    thumbnail: "",
    category: "Modern",
    profession: "engineering",
    features: ["Masonry Grid", "Skill Filter", "Project Cards", "Timeline"],
  },
  {
    id: "portfolio-brand",
    name: "Personal Brand Story",
    description: "Coral/terracotta palette with animated gradient hero for personal branding",
    type: "portfolio",
    thumbnail: "",
    category: "Creative",
    profession: "creative",
    features: ["Animated Hero", "Coral Palette", "Personal Brand", "Gradient Effects"],
  },
  {
    id: "portfolio-dark",
    name: "Void Dark",
    description: "Black background with purple glow and starfield canvas for dramatic impact",
    type: "portfolio",
    thumbnail: "",
    category: "Modern",
    profession: "engineering",
    features: ["Dark Theme", "Purple Glow", "Starfield", "Dramatic"],
  },
  {
    id: "portfolio-minimal",
    name: "Type-First Minimal",
    description: "Black/white/gray typographic portfolio with Playfair Display quote moments",
    type: "portfolio",
    thumbnail: "",
    category: "Minimal",
    profession: "design",
    features: ["Typography First", "Black & White", "Playfair Quotes", "High Impact"],
  },
  {
    id: "portfolio-studio",
    name: "Agency Studio",
    description: "Near-black with burnt orange accent, full-viewport marquee for agency pros",
    type: "portfolio",
    thumbnail: "",
    category: "Dark/Creative",
    profession: "creative",
    features: ["Dark Theme", "Burnt Orange", "Marquee Hero", "Full-Screen"],
  },
  {
    id: "portfolio-neon",
    name: "Neon Synthwave",
    description: "Pink/cyan dual-neon with glitch effects, CRT scanline and code aesthetic for devs",
    type: "portfolio",
    thumbnail: "",
    category: "Modern/Tech",
    profession: "engineering",
    features: ["Cyberpunk", "Pink/Cyan Neon", "Glitch FX", "CRT Scanline"],
  },
  {
    id: "portfolio-terminal",
    name: "Interactive CLI",
    description: "Fully interactive terminal portfolio that auto-types your profile and accepts commands",
    type: "portfolio",
    thumbnail: "",
    category: "Unique/Developer",
    profession: "engineering",
    features: ["Interactive", "Terminal Style", "Typewriter FX", "JS Commands"],
  },
  {
    id: "portfolio-warmth",
    name: "Human & Warm",
    description: "Parchment background with terracotta blobs and handwritten accents for human-centered roles",
    type: "portfolio",
    thumbnail: "",
    category: "Creative",
    profession: "healthcare",
    features: ["Parchment", "Terracotta", "Blob Shapes", "Handcrafted Feel"],
  },
  {
    id: "portfolio-blueprint",
    name: "Technical Blueprint",
    description: "Blueprint grid background with spec-sheet layout for architects & engineers",
    type: "portfolio",
    thumbnail: "",
    category: "Modern",
    profession: "architecture",
    features: ["Blueprint Grid", "Spec Sheet", "Technical", "Measurement Lines"],
  },
];

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find((t) => t.id === id);
};

export const getResumeTemplates = (): Template[] => {
  return templates.filter((t) => t.type === "resume");
};

export const getPortfolioTemplates = (): Template[] => {
  return templates.filter((t) => t.type === "portfolio");
};

export const getTemplateProfessions = (): string[] => {
  const professions = new Set(templates.map((t) => t.profession).filter((p): p is string => !!p));
  return Array.from(professions);
};


```


---

## File: `client/src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```


---

## File: `client/src/main.tsx`

```tsx
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

```


---

## File: `client/src/pages/Builder.tsx`

```tsx
import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { useBuilder } from "@/contexts/BuilderContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Check, Eye, X } from "lucide-react";
import { templates } from "@/lib/templates";
import { cn } from "@/lib/utils";

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

const stepTitles = [
  "What's your name?",
  "What's your career title?",
  "How can they reach you?",
  "Write a professional summary",
  "What are your skills?",
  "Add your education",
  "Showcase your projects",
  "Do you have work experience?",
  "Tell us about your experience",
  "List your achievements",
  "What are your hobbies?",
  "Add links & review",
] as const;

function getTemplateComponent(id?: string) {
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

export default function Builder() {
  const { userData, updateUserData } = useBuilder();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const templateId = userData.selectedTemplate || "resume-classic";
  const totalSteps = stepTitles.length;

  /* field values for the current step (free-form, committed on advance) */
  const [fieldVal, setFieldVal] = useState("");
  const [extraFields, setExtraFields] = useState<Record<string, string>>({});
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  /* seed field from userData when entering a step */
  useEffect(() => {
    setFieldVal("");
    setExtraFields({});
    setTags([]);
    setTagInput("");
  }, [step]);

  const commitStep = () => {
    switch (step) {
      case 0: updateUserData({ fullName: fieldVal || userData.fullName }); break;
      case 1: updateUserData({ role: fieldVal || userData.role }); break;
      case 2: updateUserData({ email: fieldVal || userData.email, phone: extraFields.phone || userData.phone }); break;
      case 3: updateUserData({ summary: fieldVal || userData.summary }); break;
      case 4: if (tags.length) updateUserData({ skills: tags }); break;
      case 5: updateUserData({ education: [{ id: "1", institution: fieldVal || userData.education?.[0]?.institution || "", degree: extraFields.degree || userData.education?.[0]?.degree || "", field: extraFields.field || userData.education?.[0]?.field || "", startYear: extraFields.startYear || userData.education?.[0]?.startYear || "", endYear: extraFields.endYear || userData.education?.[0]?.endYear || "", grade: extraFields.grade || userData.education?.[0]?.grade }] }); break;
      case 6: updateUserData({ projects: [{ id: "1", title: fieldVal || userData.projects?.[0]?.title || "", tools: extraFields.tools || userData.projects?.[0]?.tools || "", description: extraFields.desc || userData.projects?.[0]?.description || "", images: [] }] }); break;
      case 7: break; /* hasExperience toggle handled inline */
      case 8: updateUserData({ experience: [{ id: "1", role: fieldVal || userData.experience?.[0]?.role || "", organization: extraFields.org || userData.experience?.[0]?.organization || "", duration: extraFields.duration || userData.experience?.[0]?.duration || "", description: extraFields.desc || userData.experience?.[0]?.description || "" }] }); break;
      case 9: updateUserData({ achievements: [{ id: "1", title: fieldVal || userData.achievements?.[0]?.title || "", description: extraFields.achDesc || "" }] }); break;
      case 10: if (tags.length) updateUserData({ hobbies: tags }); break;
      case 11: updateUserData({ links: { github: fieldVal || userData.links?.github || "", linkedin: extraFields.linkedin || userData.links?.linkedin || "", portfolio: extraFields.portfolio || userData.links?.portfolio || "", other: extraFields.other || userData.links?.other || "" } }); break;
    }
  };

  const advance = () => {
    commitStep();
    if (step === 7 && fieldVal !== "yes") {
      /* skip experience step */
      setStep(9);
    } else if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    if (step > 0) {
      if (step === 9 && userData.hasExperience === false) {
        setStep(7);
      } else {
        setStep((s) => s - 1);
      }
    } else {
      setLocation("/templates");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      advance();
    }
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags((prev) => [...prev, t]);
    }
    setTagInput("");
  };

  const removeTag = (t: string) => {
    setTags((prev) => prev.filter((x) => x !== t));
  };

  const progressPct = ((step + 1) / totalSteps) * 100;

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Enter your full legal name as it should appear on your resume.</p>
            <Input ref={inputRef as any} value={fieldVal} onChange={(e) => setFieldVal(e.target.value)} onKeyDown={handleKeyDown} placeholder={userData.fullName || "e.g. Alex Morgan"} className="h-[52px] text-base" />
          </div>
        );
      case 1:
        return (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Your current or desired job title.</p>
            <Input ref={inputRef as any} value={fieldVal} onChange={(e) => setFieldVal(e.target.value)} onKeyDown={handleKeyDown} placeholder={userData.role || "e.g. Senior Product Manager"} className="h-[52px] text-base" />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">So recruiters can reach you.</p>
            <Input ref={inputRef as any} value={fieldVal} onChange={(e) => setFieldVal(e.target.value)} onKeyDown={handleKeyDown} placeholder={userData.email || "email@example.com"} className="h-[52px] text-base" type="email" />
            <Input value={extraFields.phone || userData.phone || ""} onChange={(e) => setExtraFields((p) => ({ ...p, phone: e.target.value }))} onKeyDown={handleKeyDown} placeholder={userData.phone || "+1 (555) 234-5678"} className="h-[52px] text-base" type="tel" />
          </div>
        );
      case 3:
        return (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">A short, punchy overview of who you are professionally (2-4 sentences).</p>
            <Textarea ref={inputRef as any} value={fieldVal} onChange={(e) => setFieldVal(e.target.value)} onKeyDown={handleKeyDown} placeholder={userData.summary || "Strategic product leader with 6+ years..."} className="min-h-[120px] text-base" rows={4} />
          </div>
        );
      case 4:
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Type a skill and press Enter or comma to add it.</p>
            <div className="flex gap-2">
              <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); } }} placeholder="Type a skill..." className="h-[52px] text-base" />
              <Button onClick={addTag} variant="outline" className="h-[52px]">Add</Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    {t}
                    <button onClick={() => removeTag(t)} className="hover:text-destructive"><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
            )}
            {userData.skills && userData.skills.length > 0 && tags.length === 0 && (
              <p className="text-xs text-muted-foreground">Saved: {userData.skills.join(", ")}</p>
            )}
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Your highest or most recent degree.</p>
            <Input ref={inputRef as any} value={fieldVal} onChange={(e) => setFieldVal(e.target.value)} onKeyDown={handleKeyDown} placeholder={userData.education?.[0]?.institution || "Institution"} className="h-[52px] text-base" />
            <div className="grid grid-cols-2 gap-3">
              <Input value={extraFields.degree || userData.education?.[0]?.degree || ""} onChange={(e) => setExtraFields((p) => ({ ...p, degree: e.target.value }))} placeholder="Degree (e.g. BSc)" className="h-[52px] text-base" />
              <Input value={extraFields.field || userData.education?.[0]?.field || ""} onChange={(e) => setExtraFields((p) => ({ ...p, field: e.target.value }))} placeholder="Field (e.g. CS)" className="h-[52px] text-base" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Input value={extraFields.startYear || userData.education?.[0]?.startYear || ""} onChange={(e) => setExtraFields((p) => ({ ...p, startYear: e.target.value }))} placeholder="Start Year" className="h-[52px] text-base" />
              <Input value={extraFields.endYear || userData.education?.[0]?.endYear || ""} onChange={(e) => setExtraFields((p) => ({ ...p, endYear: e.target.value }))} placeholder="End Year" className="h-[52px] text-base" />
              <Input value={extraFields.grade || userData.education?.[0]?.grade || ""} onChange={(e) => setExtraFields((p) => ({ ...p, grade: e.target.value }))} placeholder="Grade (opt.)" className="h-[52px] text-base" />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">A key project you'd like to highlight.</p>
            <Input ref={inputRef as any} value={fieldVal} onChange={(e) => setFieldVal(e.target.value)} onKeyDown={handleKeyDown} placeholder={userData.projects?.[0]?.title || "Project Title"} className="h-[52px] text-base" />
            <Input value={extraFields.tools || userData.projects?.[0]?.tools || ""} onChange={(e) => setExtraFields((p) => ({ ...p, tools: e.target.value }))} placeholder={userData.projects?.[0]?.tools || "Tech / Tools Used"} className="h-[52px] text-base" />
            <Textarea value={extraFields.desc || userData.projects?.[0]?.description || ""} onChange={(e) => setExtraFields((p) => ({ ...p, desc: e.target.value }))} placeholder="Description" className="min-h-[80px] text-base" rows={3} />
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Do you have professional work experience?</p>
            <div className="flex items-center gap-4">
              <Switch id="hasExp" checked={fieldVal === "yes"} onCheckedChange={(v) => setFieldVal(v ? "yes" : "no")} />
              <Label htmlFor="hasExp">{fieldVal === "yes" ? "Yes, I have experience" : "No, skip this section"}</Label>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Your most recent or current role.</p>
            <Input ref={inputRef as any} value={fieldVal} onChange={(e) => setFieldVal(e.target.value)} onKeyDown={handleKeyDown} placeholder={userData.experience?.[0]?.role || "Job Title"} className="h-[52px] text-base" />
            <Input value={extraFields.org || userData.experience?.[0]?.organization || ""} onChange={(e) => setExtraFields((p) => ({ ...p, org: e.target.value }))} placeholder={userData.experience?.[0]?.organization || "Company"} className="h-[52px] text-base" />
            <Input value={extraFields.duration || userData.experience?.[0]?.duration || ""} onChange={(e) => setExtraFields((p) => ({ ...p, duration: e.target.value }))} placeholder={userData.experience?.[0]?.duration || "e.g. Jan 2020 – Present"} className="h-[52px] text-base" />
            <Textarea value={extraFields.desc || userData.experience?.[0]?.description || ""} onChange={(e) => setExtraFields((p) => ({ ...p, desc: e.target.value }))} placeholder="Key responsibilities and achievements" className="min-h-[80px] text-base" rows={3} />
          </div>
        );
      case 9:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">An achievement or certification you're proud of.</p>
            <Input ref={inputRef as any} value={fieldVal} onChange={(e) => setFieldVal(e.target.value)} onKeyDown={handleKeyDown} placeholder={userData.achievements?.[0]?.title || "e.g. PMP Certified"} className="h-[52px] text-base" />
            <Input value={extraFields.achDesc || ""} onChange={(e) => setExtraFields((p) => ({ ...p, achDesc: e.target.value }))} onKeyDown={handleKeyDown} placeholder="Optional description" className="h-[52px] text-base" />
          </div>
        );
      case 10:
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">What do you enjoy outside of work?</p>
            <div className="flex gap-2">
              <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); } }} placeholder="Type a hobby..." className="h-[52px] text-base" />
              <Button onClick={addTag} variant="outline" className="h-[52px]">Add</Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    {t}
                    <button onClick={() => removeTag(t)} className="hover:text-destructive"><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      case 11:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Add links to your professional profiles (optional).</p>
            <Input ref={inputRef as any} value={fieldVal} onChange={(e) => setFieldVal(e.target.value)} onKeyDown={handleKeyDown} placeholder={userData.links?.github || "GitHub URL"} className="h-[52px] text-base" />
            <Input value={extraFields.linkedin || userData.links?.linkedin || ""} onChange={(e) => setExtraFields((p) => ({ ...p, linkedin: e.target.value }))} placeholder={userData.links?.linkedin || "LinkedIn URL"} className="h-[52px] text-base" />
            <Input value={extraFields.portfolio || userData.links?.portfolio || ""} onChange={(e) => setExtraFields((p) => ({ ...p, portfolio: e.target.value }))} placeholder={userData.links?.portfolio || "Portfolio URL"} className="h-[52px] text-base" />
            <Input value={extraFields.other || userData.links?.other || ""} onChange={(e) => setExtraFields((p) => ({ ...p, other: e.target.value }))} placeholder="Other URL" className="h-[52px] text-base" />

            <div className="pt-4 border-t space-y-2">
              <p className="text-sm font-medium">Ready to see the result?</p>
              <div className="flex gap-3">
                <Button onClick={() => { commitStep(); setLocation("/preview"); }} className="flex-1 h-12 text-base">
                  Preview & Export <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progressPct}%` }} />
      </div>

      {/* Form Panel */}
      <div className="flex-1 lg:w-1/2 min-h-screen flex items-center justify-center px-4 pt-8 pb-24 lg:pb-8">
        <div className="w-full max-w-lg mx-auto space-y-6">
          {/* Step counter */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">
              Step {step + 1} of {totalSteps}
            </p>
          </div>

          {/* Question */}
          <h2 className="text-2xl font-bold text-foreground font-sans">
            {stepTitles[step]}
          </h2>

          {/* Card with field(s) */}
          <Card className="p-6 space-y-4">
            {renderStepContent()}
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={goBack} className="h-12">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {step < totalSteps - 1 && (
              <Button onClick={advance} className="h-12 px-6">
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Preview Panel - visible on lg+ */}
      <div className="hidden lg:flex lg:w-1/2 min-h-screen bg-muted/30 sticky top-0 items-start justify-center p-8 overflow-auto">
        <div className="w-full max-w-[480px]">
          {/* Template name */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-muted-foreground">
              Live Preview — {templates.find((t) => t.id === templateId)?.name || "Template"}
            </p>
            <Button variant="outline" size="sm" onClick={() => setLocation("/templates")} data-testid="button-change-template">
              Change
            </Button>
          </div>

          {/* Mini preview */}
          <div
            className="overflow-hidden rounded-lg border bg-white shadow-sm"
            style={{
              transform: "scale(0.5)",
              transformOrigin: "top left",
              width: "200%",
              height: "200%",
              pointerEvents: "none",
            }}
          >
            {getTemplateComponent(templateId)}
          </div>
        </div>
      </div>

      {/* Mobile preview FAB */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={() => setShowPreview(!showPreview)}
        >
          <Eye className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile preview bottom sheet */}
      {showPreview && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-auto" onClick={() => setShowPreview(false)}>
          <div className="min-h-screen flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            <div className="w-full max-w-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium">Live Preview</p>
                <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}><X className="h-4 w-4" /></Button>
              </div>
              <div
                className="overflow-hidden rounded-lg border bg-white shadow-lg"
                style={{
                  transform: "scale(0.45)",
                  transformOrigin: "top left",
                  width: "222%",
                  height: "222%",
                  pointerEvents: "none",
                }}
              >
                {getTemplateComponent(templateId)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

```


---

## File: `client/src/pages/Landing.tsx`

```tsx
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, FileText, Palette, Download, Sparkles } from "lucide-react";
import { templates } from "@/lib/templates";
import { useEffect, useRef, useState } from "react";

const professions = [
  "Developers", "Doctors", "Teachers", "Lawyers",
  "Designers", "Engineers", "Executives", "Students",
];

const professionCards = [
  { emoji: "💻", label: "Software Engineers", count: "4 Templates" },
  { emoji: "🩺", label: "Healthcare", count: "3 Templates" },
  { emoji: "📚", label: "Education", count: "3 Templates" },
  { emoji: "⚖️", label: "Legal", count: "2 Templates" },
  { emoji: "🎨", label: "Design & Creative", count: "5 Templates" },
  { emoji: "🏢", label: "Business & Mgmt", count: "4 Templates" },
  { emoji: "📡", label: "Media & Publishing", count: "2 Templates" },
  { emoji: "🏛️", label: "Architecture", count: "2 Templates" },
];

export default function Landing() {
  const [professionIndex, setProfessionIndex] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProfessionIndex((prev) => (prev + 1) % professions.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  /* simple horizontal-scroll marquee without extra deps */
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    let pos = 0;
    const animate = () => {
      pos -= 0.5;
      if (pos <= -el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(animate);
    };
    let raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* ─── HERO ─── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[128px]" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-indigo-300" />
              <span className="text-sm font-medium text-white/90">
                No Login • No AI • Completely Free
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight max-w-4xl font-sans">
              Build a Resume for
              <span className="ml-3 inline-block min-w-[2ch] text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                {professions[professionIndex]}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 max-w-2xl">
              Choose from 20 professionally designed templates, fill in your details, and export as PDF — all in your browser, no account needed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/templates">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base h-12 px-10 bg-white text-indigo-900 hover:bg-white/90 font-semibold"
                >
                  Choose a Template
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/templates">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base h-12 px-10 border-white/30 text-white hover:bg-white/10"
                >
                  View All 20
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-6">
              {[
                ["20", "Templates"],
                ["0", "Sign-ups"],
                ["100%", "Free"],
              ].map(([value, label]) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="text-sm text-white/60">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ─── TEMPLATE MARQUEE ─── */}
      <section className="py-16 overflow-hidden bg-muted/30">
        <div className="text-center mb-10 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-sans">
            Templates for Every Career
          </h2>
          <p className="text-muted-foreground mt-2">
            10 resume + 10 portfolio layouts — scroll to explore
          </p>
        </div>
        <div className="relative">
          <div className="flex gap-6" ref={marqueeRef}>
            {[...templates, ...templates].map((t, i) => (
              <div
                key={`${t.id}-${i}`}
                className="flex-shrink-0 w-64 rounded-lg border bg-card p-5 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.type}
                  </span>
                  {t.profession && (
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {t.profession}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-foreground text-sm truncate">{t.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{t.description}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {t.features.slice(0, 2).map((f) => (
                    <span
                      key={f}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ALTERNATING FEATURES ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          {[
            {
              icon: FileText,
              title: "Answer Simple Questions",
              desc: "Our guided form walks you through every section — basic info, skills, experience, projects, and more. Add images, links, and achievements effortlessly.",
              reversed: false,
            },
            {
              icon: Palette,
              title: "20 Profession-Crafted Templates",
              desc: "Choose from 10 resume and 10 portfolio templates, each tailored to a specific profession. From legal to engineering, design to healthcare — we've got you.",
              reversed: true,
            },
            {
              icon: Download,
              title: "Export as PDF or Publish Live",
              desc: "Download a print-ready PDF resume or publish your portfolio as a standalone HTML page. No AI, no storage — your data stays in your browser.",
              reversed: false,
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`flex flex-col ${feature.reversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12`}
            >
              <div className="flex-1 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground font-sans">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
              <div className="flex-1 w-full max-w-lg aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <feature.icon className="h-16 w-16 mx-auto opacity-30" />
                  <p className="mt-2 text-sm">Preview</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BUILT FOR EVERY CAREER ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-sans">
              Built for Every Career Path
            </h2>
            <p className="text-muted-foreground mt-2">
              Profession-specific templates designed to highlight what matters most
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {professionCards.map((p) => (
              <Card
                key={p.label}
                className="p-6 text-center space-y-2 hover:border-primary/30 transition-colors"
              >
                <span className="text-3xl">{p.emoji}</span>
                <h4 className="font-semibold text-foreground text-sm">{p.label}</h4>
                <p className="text-xs text-muted-foreground">{p.count}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card
            className="p-12 space-y-6 border-primary/20"
            style={{
              background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans">
              Ready to Build Your Resume?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              20 templates, zero sign-ups, 100% free. Start building in under 3 minutes.
            </p>
            <Link href="/templates">
              <Button
                size="lg"
                className="h-12 px-10 text-base bg-white text-indigo-900 hover:bg-white/90 font-semibold"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}

```


---

## File: `client/src/pages/Preview.tsx`

```tsx
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

```


---

## File: `client/src/pages/Templates.tsx`

```tsx
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

```


---

## File: `client/src/pages/not-found.tsx`

```tsx
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

```


---

## File: `code.py`

```py
import os

OUTPUT_FILE = "code.md"

# Ignore these folders/files
IGNORE_DIRS = {
    "node_modules",
    ".git",
    "dist",
    "build",
    "__pycache__",
    ".next",
    ".turbo",
    ".idea",
    ".vscode"
}

IGNORE_FILES = {
    OUTPUT_FILE,
    "package-lock.json"
}

# Allowed file extensions
ALLOWED_EXTENSIONS = {
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".json",
    ".css",
    ".html",
    ".md",
    ".py",
    ".sql",
    ".env",
    ".yml",
    ".yaml",
    ".config",
}

def is_allowed_file(filename):
    _, ext = os.path.splitext(filename)

    if ext in ALLOWED_EXTENSIONS:
        return True

    # Include important files without extension
    important_files = {
        "Dockerfile",
        "README",
        "README.md",
        ".gitignore",
    }

    return filename in important_files


def should_ignore(path_parts):
    return any(part in IGNORE_DIRS for part in path_parts)


def collect_files(root_dir="."):
    collected = []

    for root, dirs, files in os.walk(root_dir):
        # Remove ignored dirs from traversal
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]

        for file in files:
            if file in IGNORE_FILES:
                continue

            if not is_allowed_file(file):
                continue

            full_path = os.path.join(root, file)

            path_parts = full_path.split(os.sep)

            if should_ignore(path_parts):
                continue

            collected.append(full_path)

    return sorted(collected)


def read_file_content(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return f.read()
    except UnicodeDecodeError:
        return "[Could not decode file]"
    except Exception as e:
        return f"[Error reading file: {e}]"


def generate_markdown(files):
    lines = []

    lines.append("# Codebase Export\n")

    for filepath in files:
        relative_path = os.path.relpath(filepath)

        ext = os.path.splitext(filepath)[1].replace(".", "")

        if not ext:
            ext = "text"

        lines.append(f"\n---\n")
        lines.append(f"## File: `{relative_path}`\n")

        lines.append(f"```{ext}")

        content = read_file_content(filepath)

        lines.append(content)

        lines.append("```\n")

    return "\n".join(lines)


def main():
    print("Scanning codebase...")

    files = collect_files()

    print(f"Found {len(files)} files")

    markdown_content = generate_markdown(files)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(markdown_content)

    print(f"\nDone ✅")
    print(f"Generated: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()

```


---

## File: `components.json`

```json
{
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "new-york",
    "rsc": false,
    "tsx": true,
    "tailwind": {
      "config": "tailwind.config.ts",
      "css": "client/src/index.css",
      "baseColor": "neutral",
      "cssVariables": true,
      "prefix": ""
    },
    "aliases": {
      "components": "@/components",
      "utils": "@/lib/utils",
      "ui": "@/components/ui",
      "lib": "@/lib",
      "hooks": "@/hooks"
    }
}
```


---

## File: `design_guidelines.md`

```md
# Design Guidelines: Resume & Portfolio Builder Platform

## Design Approach

**Selected Approach:** Design System-Based (Material Design 3)

**Justification:** This is a utility-focused, form-intensive productivity tool where clarity, efficiency, and user confidence are paramount. Material Design 3's comprehensive form components, clear hierarchy, and proven patterns for multi-step flows make it ideal for this application.

**Key Design Principles:**
1. Progressive disclosure - guide users step-by-step without overwhelming
2. Immediate feedback - show changes in real-time preview
3. Confidence building - clear progress indicators and validation
4. Professional polish - templates should look production-ready

---

## Typography

**Font Family:**
- Primary: Inter (via Google Fonts CDN)
- Monospace: 'Courier New' (for resume template previews)

**Type Scale:**
- Headings: 2xl (main screens), xl (section headers), lg (subsections)
- Body: base (form labels, descriptions), sm (helper text)
- Weights: 400 (regular), 500 (medium for labels), 600 (semibold for headings), 700 (bold for CTAs)

---

## Layout System

**Spacing Primitives:** Use Tailwind units of **2, 4, 6, 8, 12, 16**
- Tight spacing: 2-4 (form field groups, inline elements)
- Standard spacing: 6-8 (between sections, cards)
- Generous spacing: 12-16 (major section breaks, page margins)

**Container Structure:**
- Main container: max-w-7xl with px-4 md:px-6 lg:px-8
- Form containers: max-w-2xl for optimal readability
- Preview panel: Flexible width to show actual template proportions

---

## Component Library

### A. Navigation & Progress
**Header Bar:**
- Fixed top position with subtle shadow
- Logo/title left, progress indicator center, save/export actions right
- Height: h-16

**Progress Stepper:**
- Horizontal step indicator showing: Questions → Template Selection → Edit & Preview → Export
- Active step highlighted, completed steps with checkmark icons
- Clickable for navigation between completed steps

### B. Form Components

**Question Cards:**
- Each question in its own card with rounded-lg borders
- Card padding: p-6
- Stacked layout with clear label → input → helper text hierarchy
- Required fields marked with asterisk

**Input Fields:**
- Full-width text inputs with h-12
- Text areas with min-h-32 for longer responses
- Clear focus states with ring offset
- Inline validation with success/error states

**File Upload Areas:**
- Profile image: Square upload zone (w-32 h-32) with rounded-full preview
- Project images: Grid of upload slots (up to 5 per project)
- Drag-and-drop zones with dashed borders
- Image previews with remove button overlay
- Accepted formats displayed: "JPG, PNG up to 5MB"

### C. Template Selection

**Template Gallery:**
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Template cards with aspect-ratio-[3/4] thumbnail previews
- Template name and description below thumbnail
- Selected template: highlighted border and checkmark badge
- Hover state: subtle scale and shadow transition

### D. Preview System

**Split View Layout:**
- Left panel (40%): Editable sections with toggle controls
- Right panel (60%): Live preview iframe
- Responsive: Stack vertically on mobile (preview on top)

**Section Controls:**
- Each section header with eye icon (visibility toggle) and drag handle
- Inline editing: Click to edit text directly in preview
- Section spacing: space-y-4 between editable sections

### E. Export Interface

**Export Options Card:**
- Two primary action buttons side-by-side
- "Download PDF" with document icon
- "Export HTML Portfolio" with code icon  
- Buttons: h-14, rounded-lg, with icon + text
- Secondary options: Template selection, re-edit buttons below

---

## Page-Specific Layouts

### Landing Page
**Hero Section:** (h-screen)
- Split layout: 50/50 text and illustration
- Large headline (text-5xl font-bold)
- Subheading explaining "No login, No AI, 5 templates"
- Primary CTA: "Start Building" button (large, prominent)
- Hero image: Illustration showing resume templates fanning out

**Features Section:**
- 3-column grid showcasing: Quick Questions, Professional Templates, Instant Export
- Icon-title-description cards with p-8
- Icons from Heroicons (CDN)

### Question Flow Pages
**Single-column centered form:** max-w-2xl
- Progress bar at top
- One question card at a time (for simple questions)
- Multiple project cards stacked (for project entries)
- "Add Another Project" button with plus icon
- Navigation: "Back" and "Next" buttons footer-fixed

### Template Selection Page
**Full-width gallery:** max-w-7xl
- Large preview thumbnails
- Filter tabs: "All", "Resume", "Portfolio"
- Template cards: hover zoom effect on thumbnail

### Edit & Preview Page
**Dashboard layout:**
- Toolbar across top: Save, Preview modes (Desktop/Tablet/Mobile), Export
- Split panel with resizable divider
- Section list sidebar (left): accordion-style for each resume section
- Live preview (right): Shows actual resume/portfolio rendering

---

## Images

**Hero Section Image:**
- Placement: Right half of hero split-layout
- Description: Modern illustration showing multiple resume templates in a cascading arrangement, with a portfolio website preview on a laptop screen. Clean, professional aesthetic with subtle gradients.

**Feature Section Icons:**
- Use Heroicons for: question mark (Questions), document (Templates), arrow-down-tray (Export)
- Size: w-12 h-12 within circular background containers

**Template Thumbnails:**
- Actual miniature screenshots of each template
- Aspect ratio: 3:4 (standard resume proportions)
- Border: subtle gray stroke

**Upload Placeholders:**
- Profile: User silhouette icon in dashed circle
- Projects: Image icon in dashed rectangle grid

---

## Animations

**Minimal, purposeful only:**
- Form field focus: Subtle ring expansion
- Template selection: Scale(1.02) on hover
- Section reorder: Smooth position transition during drag
- Save confirmation: Brief success checkmark animation

**NO scroll-triggered or decorative animations** - keep focus on workflow efficiency.

---

## Key Implementation Notes

- Use Heroicons (CDN) for all interface icons
- Material Design elevation system: shadow-sm (cards), shadow-md (floating panels), shadow-lg (modals)
- Consistent rounded corners: rounded-lg for cards, rounded-md for inputs
- Form validation uses inline messages, not modals
- Auto-save indicator: Small "Saved" text with checkmark, fades after 2s
- Mobile: hamburger menu for section navigation, preview becomes full-screen modal
```


---

## File: `drizzle.config.ts`

```ts
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

```


---

## File: `package.json`

```json
{
  "name": "rest-express",
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index-dev.ts",
    "build": "vite build && esbuild server/index-prod.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js",
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc",
    "db:push": "drizzle-kit push"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@jridgewell/trace-mapping": "^0.3.25",
    "@neondatabase/serverless": "^0.10.4",
    "@radix-ui/react-accordion": "^1.2.4",
    "@radix-ui/react-alert-dialog": "^1.1.7",
    "@radix-ui/react-aspect-ratio": "^1.1.3",
    "@radix-ui/react-avatar": "^1.1.4",
    "@radix-ui/react-checkbox": "^1.1.5",
    "@radix-ui/react-collapsible": "^1.1.4",
    "@radix-ui/react-context-menu": "^2.2.7",
    "@radix-ui/react-dialog": "^1.1.7",
    "@radix-ui/react-dropdown-menu": "^2.1.7",
    "@radix-ui/react-hover-card": "^1.1.7",
    "@radix-ui/react-label": "^2.1.3",
    "@radix-ui/react-menubar": "^1.1.7",
    "@radix-ui/react-navigation-menu": "^1.2.6",
    "@radix-ui/react-popover": "^1.1.7",
    "@radix-ui/react-progress": "^1.1.3",
    "@radix-ui/react-radio-group": "^1.2.4",
    "@radix-ui/react-scroll-area": "^1.2.4",
    "@radix-ui/react-select": "^2.1.7",
    "@radix-ui/react-separator": "^1.1.3",
    "@radix-ui/react-slider": "^1.2.4",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-switch": "^1.1.4",
    "@radix-ui/react-tabs": "^1.1.4",
    "@radix-ui/react-toast": "^1.2.7",
    "@radix-ui/react-toggle": "^1.1.3",
    "@radix-ui/react-toggle-group": "^1.1.3",
    "@radix-ui/react-tooltip": "^1.2.0",
    "@tanstack/react-query": "^5.60.5",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "connect-pg-simple": "^10.0.0",
    "cross-env": "^10.1.0",
    "date-fns": "^3.6.0",
    "drizzle-orm": "^0.39.1",
    "drizzle-zod": "^0.7.0",
    "embla-carousel-react": "^8.6.0",
    "express": "^4.21.2",
    "express-session": "^1.18.1",
    "framer-motion": "^11.13.1",
    "html2canvas": "^1.4.1",
    "input-otp": "^1.4.2",
    "jspdf": "^3.0.4",
    "jszip": "^3.10.1",
    "lucide-react": "^0.453.0",
    "memorystore": "^1.6.7",
    "nanoid": "^5.1.6",
    "next-themes": "^0.4.6",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.55.0",
    "react-icons": "^5.4.0",
    "react-resizable-panels": "^2.1.7",
    "recharts": "^2.15.2",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "tw-animate-css": "^1.2.5",
    "vaul": "^1.1.2",
    "wouter": "^3.3.5",
    "ws": "^8.18.0",
    "zod": "^3.24.2",
    "zod-validation-error": "^3.4.0"
  },
  "devDependencies": {
    "@replit/vite-plugin-cartographer": "^0.4.4",
    "@replit/vite-plugin-dev-banner": "^0.1.1",
    "@replit/vite-plugin-runtime-error-modal": "^0.0.3",
    "@tailwindcss/typography": "^0.5.15",
    "@tailwindcss/vite": "^4.1.3",
    "@types/connect-pg-simple": "^7.0.3",
    "@types/express": "4.17.21",
    "@types/express-session": "^1.18.0",
    "@types/node": "20.16.11",
    "@types/passport": "^1.0.16",
    "@types/passport-local": "^1.0.38",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@types/ws": "^8.5.13",
    "@vitejs/plugin-react": "^4.7.0",
    "autoprefixer": "^10.4.20",
    "drizzle-kit": "^0.31.4",
    "esbuild": "^0.25.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.17",
    "tsx": "^4.20.5",
    "typescript": "5.6.3",
    "vite": "^5.4.20"
  },
  "optionalDependencies": {
    "bufferutil": "^4.0.8"
  }
}

```


---

## File: `postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```


---

## File: `replit.md`

```md
# Resume & Portfolio Builder Platform

## Overview
A comprehensive web application that helps users create professional resumes and portfolio websites without requiring login or AI. Users answer guided questions, upload profile and project images, choose from 5 beautiful templates, preview in real-time, and export as PDF (resume) or HTML (portfolio).

## Project Status
- **Current Date**: November 25, 2025
- **Current Phase**: MVP Development (Task 1: Frontend Complete)
- **Next Phase**: Minimal backend setup and integration

## Tech Stack

### Frontend
- **Framework**: React with TypeScript
- **Routing**: Wouter
- **Styling**: Tailwind CSS + Shadcn UI components
- **Forms**: React Hook Form + Zod validation
- **State**: React Context API
- **Storage**: LocalStorage (client-side only, no database)
- **Image Processing**: Browser-based File API with canvas resizing
- **Export**: jsPDF (PDF generation), JSZip (HTML export)

### Backend
- **Server**: Express.js (minimal - serves static assets only)
- **Database**: None (all data stored client-side in localStorage)

## Key Features

### 1. Guided Question Flow (4 Steps)
- **Step 1: Basic Info** - Name, role, contact, profile photo upload, professional links, summary
- **Step 2: Skills & Education** - Skill tags, multiple education entries with details
- **Step 3: Projects & Experience** - Projects with multi-image upload (up to 5 per project), optional work experience
- **Step 4: Final Touches** - Achievements, certifications, hobbies, portfolio hero text

### 2. Image Upload System
- **Profile Image**: Single upload with preview, auto-resize to 400px, circular display
- **Project Images**: Multiple upload (up to 5 per project), auto-resize to 800px, grid display
- **Storage**: Base64 encoding in localStorage
- **Validation**: 5MB max per image, image/* file types only

### 3. Template Selection
- **5 Resume Templates**:
  - Classic Professional (ATS-friendly)
  - Modern Minimal
  - Creative Student
  - Experience Oriented
  - Student Portfolio Style
- **1 Portfolio Template**: Full-featured website with hero, projects gallery, contact
- **Preview**: Thumbnail cards with feature badges

### 4. Live Preview & Export
- **Desktop/Mobile Preview**: Responsive preview with tab switching
- **Section Controls**: Show/hide individual sections
- **PDF Export**: Resume templates with embedded images
- **HTML Export**: Portfolio as downloadable zip with all assets

### 5. Auto-Save System
- Saves to localStorage after every field change
- Persists across browser sessions
- No server storage - completely private

## File Structure

```
client/
├── src/
│   ├── components/
│   │   ├── builder-steps/           # Multi-step form components
│   │   │   ├── BasicInfo.tsx
│   │   │   ├── SkillsEducation.tsx
│   │   │   ├── ProjectsExperience.tsx
│   │   │   └── AchievementsHobbies.tsx
│   │   ├── preview/                 # Preview components
│   │   │   ├── ResumePreview.tsx
│   │   │   └── PortfolioPreview.tsx
│   │   ├── ui/                      # Shadcn UI components
│   │   ├── ImageUpload.tsx          # Single image upload
│   │   ├── MultiImageUpload.tsx     # Multiple image upload
│   │   └── ProgressStepper.tsx      # Step indicator
│   ├── contexts/
│   │   └── BuilderContext.tsx       # Global state management
│   ├── lib/
│   │   ├── storage.ts               # localStorage utilities
│   │   ├── templates.ts             # Template definitions
│   │   └── utils.ts                 # Helper functions
│   ├── pages/
│   │   ├── Landing.tsx              # Hero + features
│   │   ├── Builder.tsx              # Question flow
│   │   ├── Templates.tsx            # Template selection
│   │   └── Preview.tsx              # Preview & export
│   └── App.tsx                      # Main router
shared/
└── schema.ts                        # TypeScript types & Zod schemas
server/
└── routes.ts                        # Minimal API routes
```

## Data Models

### UserData
- Basic info: name, role, email, phone, profile image
- Links: GitHub, LinkedIn, portfolio
- Summary: professional description
- Skills: array of skill strings
- Education: array of education entries
- Projects: array with title, tools, description, images[]
- Experience: optional array of work history
- Achievements: optional array
- Hobbies: optional array
- Portfolio hero: optional intro text

### Template
- ID, name, description, type (resume/portfolio)
- Thumbnail, category, features array

### SectionVisibility
- Boolean flags for each section (summary, skills, education, etc.)

## User Journey

1. **Landing Page** → Click "Start Building"
2. **Step 1-4: Questions** → Fill in details, upload images
3. **Template Selection** → Choose from 6 templates
4. **Preview** → Review, toggle sections, switch desktop/mobile view
5. **Export** → Download PDF or HTML zip file

## Design System

### Colors
- Primary: Blue (#4B91F7) - CTAs, links, accents
- Background: White/Light gray gradients
- Text: Dark gray hierarchy (900, 600, 400)

### Typography
- Font: Inter
- Headings: Bold, large scale (3xl-5xl)
- Body: Regular, comfortable line-height

### Components
- Cards: Rounded corners, subtle shadows
- Buttons: Primary (blue), Outline (white with border)
- Badges: Secondary variant for skills/tags
- Forms: Clean inputs with validation messages

### Spacing
- Tight: 2-4 units (form elements)
- Standard: 6-8 units (sections)
- Generous: 12-16 units (page margins)

## Recent Changes (Task 1)

### November 25, 2025
- Created complete data schema with image support
- Built all 4 question flow steps with validation
- Implemented profile and multi-image upload components
- Created landing page with hero and features
- Built template selection page with 6 templates
- Implemented preview page with PDF/HTML export
- Added localStorage auto-save system
- Integrated React Context for global state
- Set up complete routing with wouter

## Next Steps (Task 2)

1. Backend setup (minimal Express routes)
2. Integration testing
3. Final polish and bug fixes

## User Preferences
- Target users: Students, job seekers, professionals
- Design priority: Clean, professional, easy to use
- No login/signup - focus on privacy and simplicity
- No AI - template-driven with user input only

```


---

## File: `server/app.ts`

```ts
import { type Server } from "node:http";

import express, {
  type Express,
  type Request,
  Response,
  NextFunction,
} from "express";

import { registerRoutes } from "./routes";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

export default async function runApp(
  setup: (app: Express, server: Server) => Promise<void>,
) {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly run the final setup after setting up all the other routes so
  // the catch-all route doesn't interfere with the other routes
  await setup(app, server);

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
}

```


---

## File: `server/index-dev.ts`

```ts
import fs from "node:fs";
import path from "node:path";
import { type Server } from "node:http";

import { nanoid } from "nanoid";
import { type Express } from "express";
import { createServer as createViteServer, createLogger } from "vite";

import viteConfig from "../vite.config";
import runApp from "./app";

export async function setupVite(app: Express, server: Server) {
  const viteLogger = createLogger();
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

(async () => {
  await runApp(setupVite);
})();

```


---

## File: `server/index-prod.ts`

```ts
import fs from "node:fs";
import path from "node:path";
import { type Server } from "node:http";

import express, { type Express } from "express";
import runApp from "./app";

export async function serveStatic(app: Express, _server: Server) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

(async () => {
  await runApp(serveStatic);
})();

```


---

## File: `server/routes.ts`

```ts
import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // This application is client-side only per SRS requirements
  // No API routes needed - all data is stored in browser localStorage
  // Server only serves static frontend assets via Vite

  const httpServer = createServer(app);

  return httpServer;
}

```


---

## File: `server/storage.ts`

```ts
// This application uses client-side localStorage only
// No server-side storage is required per SRS requirements
// This file is kept minimal for potential future extensions

export interface IStorage {
  // Placeholder interface - no server storage needed
}

export class MemStorage implements IStorage {
  constructor() {
    // No server-side data storage
  }
}

export const storage = new MemStorage();

```


---

## File: `shared/schema.ts`

```ts
import { z } from "zod";

// Project schema with support for multiple images
export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Project title is required"),
  tools: z.string().min(1, "Tools/technologies are required"),
  description: z.string().min(10, "Description should be at least 10 characters"),
  images: z.array(z.string()).max(5, "Maximum 5 images per project").default([]),
});

export type Project = z.infer<typeof projectSchema>;

// Education schema
export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution name is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().min(1, "Field of study is required"),
  startYear: z.string(),
  endYear: z.string(),
  grade: z.string().optional(),
});

export type Education = z.infer<typeof educationSchema>;

// Experience schema
export const experienceSchema = z.object({
  id: z.string(),
  role: z.string().min(1, "Role is required"),
  organization: z.string().min(1, "Organization is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().min(10, "Description should be at least 10 characters"),
});

export type Experience = z.infer<typeof experienceSchema>;

// Achievement schema
export const achievementSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Achievement title is required"),
  description: z.string().optional(),
});

export type Achievement = z.infer<typeof achievementSchema>;

// Main user data schema
export const userDataSchema = z.object({
  // Basic Information
  fullName: z.string().min(1, "Full name is required"),
  role: z.string().min(1, "Role/Career objective is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  
  // Profile image (base64 encoded)
  profileImage: z.string().optional(),
  
  // Optional links
  links: z.object({
    github: z.string().url().optional().or(z.literal("")),
    linkedin: z.string().url().optional().or(z.literal("")),
    portfolio: z.string().url().optional().or(z.literal("")),
    other: z.string().url().optional().or(z.literal("")),
  }).optional(),
  
  // About/Summary
  summary: z.string().min(10, "Summary should be at least 10 characters"),
  
  // Skills
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  
  // Education
  education: z.array(educationSchema).min(1, "At least one education entry is required"),
  
  // Projects with images
  projects: z.array(projectSchema).min(1, "At least one project is required"),
  
  // Experience (optional)
  hasExperience: z.boolean().default(false),
  experience: z.array(experienceSchema).optional(),
  
  // Achievements/Certifications
  achievements: z.array(achievementSchema).optional(),
  
  // Hobbies/Interests
  hobbies: z.array(z.string()).optional(),
  
  // Portfolio-specific
  portfolioHero: z.string().optional(),
  
  // Selected template
  selectedTemplate: z.string().optional(),
});

export type UserData = z.infer<typeof userDataSchema>;

// Template metadata schema
export const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.enum(["resume", "portfolio"]),
  thumbnail: z.string(),
  category: z.string(),
  profession: z.string().optional(),
  features: z.array(z.string()),
});

export type Template = z.infer<typeof templateSchema>;

// Section visibility schema
export const sectionVisibilitySchema = z.object({
  summary: z.boolean().default(true),
  skills: z.boolean().default(true),
  education: z.boolean().default(true),
  projects: z.boolean().default(true),
  experience: z.boolean().default(true),
  achievements: z.boolean().default(true),
  hobbies: z.boolean().default(true),
});

export type SectionVisibility = z.infer<typeof sectionVisibilitySchema>;

// Section order schema
export const sectionOrderSchema = z.array(
  z.enum(["summary", "skills", "education", "projects", "experience", "achievements", "hobbies"])
);

export type SectionOrder = z.infer<typeof sectionOrderSchema>;

```


---

## File: `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: ".5625rem", /* 9px */
        md: ".375rem", /* 6px */
        sm: ".1875rem", /* 3px */
      },
      colors: {
        // Flat / base colors (regular buttons)
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
          border: "hsl(var(--card-border) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
          border: "hsl(var(--popover-border) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          border: "var(--primary-border)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
          border: "var(--secondary-border)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
          border: "var(--muted-border)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
          border: "var(--accent-border)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          border: "var(--destructive-border)",
        },
        ring: "hsl(var(--ring) / <alpha-value>)",
        chart: {
          "1": "hsl(var(--chart-1) / <alpha-value>)",
          "2": "hsl(var(--chart-2) / <alpha-value>)",
          "3": "hsl(var(--chart-3) / <alpha-value>)",
          "4": "hsl(var(--chart-4) / <alpha-value>)",
          "5": "hsl(var(--chart-5) / <alpha-value>)",
        },
        sidebar: {
          ring: "hsl(var(--sidebar-ring) / <alpha-value>)",
          DEFAULT: "hsl(var(--sidebar) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-foreground) / <alpha-value>)",
          border: "hsl(var(--sidebar-border) / <alpha-value>)",
        },
        "sidebar-primary": {
          DEFAULT: "hsl(var(--sidebar-primary) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",
          border: "var(--sidebar-primary-border)",
        },
        "sidebar-accent": {
          DEFAULT: "hsl(var(--sidebar-accent) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "var(--sidebar-accent-border)"
        },
        status: {
          online: "rgb(34 197 94)",
          away: "rgb(245 158 11)",
          busy: "rgb(239 68 68)",
          offline: "rgb(156 163 175)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

```


---

## File: `tsconfig.json`

```json
{
  "include": ["client/src/**/*", "shared/**/*", "server/**/*"],
  "exclude": ["node_modules", "build", "dist", "**/*.test.ts"],
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./node_modules/typescript/tsbuildinfo",
    "noEmit": true,
    "module": "ESNext",
    "strict": true,
    "lib": ["esnext", "dom", "dom.iterable"],
    "jsx": "preserve",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "allowImportingTsExtensions": true,
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "types": ["node", "vite/client"],
    "paths": {
      "@/*": ["./client/src/*"],
      "@shared/*": ["./shared/*"]
    }
  }
}

```


---

## File: `vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});

```
