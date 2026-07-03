"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { MoreVertical, Copy, Trash2, Pencil } from "lucide-react";
import { formatDistanceToNow } from "@/lib/utils";
import { duplicateResume, softDeleteResume } from "@/actions/resume.actions";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ResumeCardProps {
  resumeId: string;
  title: string;
  templateSlug: string;
  status: "DRAFT" | "PUBLISHED";
  updatedAt: Date;
  fullName: string | null;
}

export function ResumeCard({
  resumeId,
  title,
  templateSlug,
  status,
  updatedAt,
  fullName,
}: ResumeCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isActionPending, startTransition] = useTransition();

  const handleDuplicate = () => {
    startTransition(() => {
      duplicateResume(resumeId);
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await softDeleteResume(resumeId);
      setIsDeleteDialogOpen(false);
    });
  };

  return (
    <>
      <Card className="group overflow-hidden transition-shadow hover:shadow-md">
        <Link href={`/resumes/${resumeId}/edit`}>
          <div className="flex aspect-[3/4] items-center justify-center bg-muted/40 text-xs text-muted-foreground">
            {templateSlug} preview
          </div>
        </Link>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Link
                href={`/resumes/${resumeId}/edit`}
                className="truncate text-sm font-medium hover:underline"
              >
                {title}
              </Link>
              <p className="truncate text-xs text-muted-foreground">
                {fullName ?? "No name set"}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-7 shrink-0">
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/resumes/${resumeId}/edit`}>
                    <Pencil className="mr-2 size-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDuplicate} disabled={isActionPending}>
                  <Copy className="mr-2 size-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-4 pt-3">
          <Badge variant={status === "PUBLISHED" ? "default" : "secondary"}>
            {status === "PUBLISHED" ? "Published" : "Draft"}
          </Badge>
          <span className="text-xs text-muted-foreground">
            Updated {formatDistanceToNow(updatedAt)}
          </span>
        </CardFooter>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this resume?</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{title}&quot; will be moved to trash. This action can be reversed
              by contacting support within 30 days.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isActionPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isActionPending}>
              {isActionPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}