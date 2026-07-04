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
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7 text-destructive hover:text-destructive"
            onClick={onRemove}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={control}
            name={`projects.${index}.name`}
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Project name</FormLabel>
                <FormControl>
                  <Input placeholder="ATS Resume Builder" {...field} />
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
                  <Input placeholder="Full-stack Developer" {...field} />
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
                  <Input placeholder="https://github.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`projects.${index}.liveUrl`}
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Live URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourproject.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Tech stack</p>
          <div className="flex flex-wrap gap-2 rounded-md border p-2">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="gap-1 pr-1">
                {tech}
                <button
                  type="button"
                  onClick={() => removeTech(tech)}
                  className="rounded-full p-0.5 hover:bg-muted-foreground/20"
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
              className="h-7 w-40 border-none px-1 shadow-none focus-visible:ring-0"
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
                <Textarea placeholder="What does this project do?" rows={3} {...field} />
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
                <Textarea placeholder="Impact, metrics, results..." rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}