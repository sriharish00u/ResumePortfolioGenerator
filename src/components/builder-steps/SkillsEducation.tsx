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
