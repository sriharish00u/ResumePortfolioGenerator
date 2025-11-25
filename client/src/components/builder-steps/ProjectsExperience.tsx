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
