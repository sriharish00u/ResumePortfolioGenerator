import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BuilderProvider } from "@/contexts/BuilderContext";
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
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BuilderProvider>
          <Toaster />
          <Router />
        </BuilderProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
