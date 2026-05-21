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
