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
