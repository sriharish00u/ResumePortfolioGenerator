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
