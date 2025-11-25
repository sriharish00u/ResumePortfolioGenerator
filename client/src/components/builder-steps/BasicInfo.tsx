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
