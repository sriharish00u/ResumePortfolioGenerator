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
