import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Palette, Download, ArrowRight, Sparkles } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8" data-testid="hero-content">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  No Login • No AI • Completely Free
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Build Professional Resumes in
                  <span className="text-primary"> Minutes</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
                  Choose from 5 beautiful templates, answer simple questions, and export your resume as PDF or portfolio as HTML. No account required.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/builder">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto text-base h-12 px-8"
                    data-testid="button-start-building"
                  >
                    Start Building
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto text-base h-12 px-8"
                    data-testid="button-view-templates"
                  >
                    View Templates
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">5</p>
                  <p className="text-sm text-muted-foreground">Templates</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">0</p>
                  <p className="text-sm text-muted-foreground">Sign-ups</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">100%</p>
                  <p className="text-sm text-muted-foreground">Free</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square">
                {/* Floating Cards Animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full max-w-md">
                    {[0, 1, 2].map((index) => (
                      <Card
                        key={index}
                        className={`absolute inset-0 border-2 shadow-lg transition-all duration-700 ${
                          index === 0 ? "rotate-0 z-30" : 
                          index === 1 ? "rotate-3 translate-x-4 translate-y-4 z-20 opacity-80" :
                          "rotate-6 translate-x-8 translate-y-8 z-10 opacity-60"
                        }`}
                        style={{
                          aspectRatio: "8.5/11",
                        }}
                      >
                        <div className="p-8 space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-primary/10" />
                            <div className="flex-1 space-y-2">
                              <div className="h-3 bg-muted rounded w-3/4" />
                              <div className="h-2 bg-muted rounded w-1/2" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-2 bg-muted rounded" />
                            <div className="h-2 bg-muted rounded w-5/6" />
                          </div>
                          <div className="grid grid-cols-3 gap-2 pt-2">
                            <div className="h-6 bg-primary/20 rounded" />
                            <div className="h-6 bg-primary/20 rounded" />
                            <div className="h-6 bg-primary/20 rounded" />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to create your professional resume or portfolio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-4 hover-elevate transition-all" data-testid="card-feature-questions">
              <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Answer Simple Questions
              </h3>
              <p className="text-muted-foreground">
                Fill in your details through our guided questionnaire. Upload profile and project images to showcase your work.
              </p>
            </Card>

            <Card className="p-8 space-y-4 hover-elevate transition-all" data-testid="card-feature-templates">
              <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center">
                <Palette className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Choose Your Template
              </h3>
              <p className="text-muted-foreground">
                Select from 5 professionally designed templates. Preview your resume in real-time as you make changes.
              </p>
            </Card>

            <Card className="p-8 space-y-4 hover-elevate transition-all" data-testid="card-feature-export">
              <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center">
                <Download className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Download & Share
              </h3>
              <p className="text-muted-foreground">
                Export your resume as PDF or portfolio as HTML. Your data stays private in your browser.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 space-y-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Ready to Build Your Resume?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of job seekers who've created professional resumes without any hassle. No account needed, start now!
            </p>
            <Link href="/builder">
              <Button size="lg" className="h-12 px-8 text-base" data-testid="button-cta-start">
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
