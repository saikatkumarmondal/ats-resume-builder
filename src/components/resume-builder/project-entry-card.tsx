"use client";

import { Trash2, X } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import type { Control, UseFormSetValue } from "react-hook-form";
import type { SaveProjectsInput } from "@/schemas/project.schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectEntryCardProps {
  control: Control<SaveProjectsInput>;
  setValue: UseFormSetValue<SaveProjectsInput>;
  index: number;
  techStack: string[];
  onRemove: () => void;
}

export function ProjectEntryCard({
  control,
  setValue,
  index,
  techStack,
  onRemove,
}: ProjectEntryCardProps) {
  const [draftTech, setDraftTech] = useState("");

  const handleTechKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      const trimmed = draftTech.trim();

      if (trimmed && !techStack.includes(trimmed)) {
        setValue(`projects.${index}.techStack`, [...techStack, trimmed]);
      }

      setDraftTech("");
    }
  };

  const removeTech = (tech: string) => {
    setValue(
      `projects.${index}.techStack`,
      techStack.filter((item) => item !== tech)
    );
  };

  return (
    <Card
      className="
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <CardContent className="space-y-5 p-4 sm:p-5 lg:p-6">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="
              h-8
              w-8
              rounded-lg
              text-destructive
              transition-all
              duration-300
              hover:scale-110
              hover:bg-destructive/10
              hover:text-destructive
              active:scale-95
            "
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            control={control}
            name={`projects.${index}.name`}
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Project name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ATS Resume Builder"
                    className="transition-all duration-300 focus-visible:ring-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`projects.${index}.role`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your role</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Full-stack Developer"
                    className="transition-all duration-300 focus-visible:ring-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`projects.${index}.githubUrl`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://github.com/..."
                    className="transition-all duration-300 focus-visible:ring-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`projects.${index}.liveUrl`}
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Live URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://yourproject.com"
                    className="transition-all duration-300 focus-visible:ring-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium">Tech stack</p>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
              rounded-xl
              border
              p-3
              transition-all
              duration-300
              hover:border-primary/40
            "
          >
            {techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="
                  gap-1
                  pr-1
                  transition-all
                  duration-300
                  hover:scale-105
                "
              >
                {tech}

                <button
                  type="button"
                  onClick={() => removeTech(tech)}
                  className="
                    rounded-full
                    p-0.5
                    transition-all
                    duration-300
                    hover:bg-muted-foreground/20
                    hover:rotate-90
                  "
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}

            <Input
              value={draftTech}
              onChange={(event) => setDraftTech(event.target.value)}
              onKeyDown={handleTechKeyDown}
              placeholder="Type and press Enter"
              className="
                h-9
                min-w-[170px]
                flex-1
                border-none
                bg-transparent
                px-1
                shadow-none
                focus-visible:ring-0
              "
            />
          </div>
        </div>

        <FormField
          control={control}
          name={`projects.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>

              <FormControl>
                <Textarea
                  placeholder="What does this project do?"
                  rows={4}
                  className="
                    resize-none
                    transition-all
                    duration-300
                    focus-visible:ring-2
                  "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`projects.${index}.achievements`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key achievements</FormLabel>

              <FormControl>
                <Textarea
                  placeholder="Impact, metrics, results..."
                  rows={4}
                  className="
                    resize-none
                    transition-all
                    duration-300
                    focus-visible:ring-2
                  "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}