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
