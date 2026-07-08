"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  MoreVertical,
  Copy,
  Trash2,
  Pencil,
  Download,
} from "lucide-react";
import { formatDistanceToNow } from "@/lib/utils";
import {
  duplicateResume,
  softDeleteResume,
} from "@/actions/resume.actions";
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
      <Card
        className="
          group
          overflow-hidden
          rounded-2xl
          border
          transition-all
          duration-300
          ease-out
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        <Link
          href={`/resumes/${resumeId}/edit`}
          className="block overflow-hidden"
        >
          <div
            className="
              flex
              aspect-[3/4]
              items-center
              justify-center
              bg-muted/40
              text-xs
              text-muted-foreground
              transition-all
              duration-500
              group-hover:scale-105
              group-hover:bg-muted/60
            "
          >
            {templateSlug} preview
          </div>
        </Link>

        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <Link
                href={`/resumes/${resumeId}/edit`}
                className="
                  block
                  truncate
                  text-sm
                  font-semibold
                  transition-colors
                  duration-300
                  hover:text-primary
                "
              >
                {title}
              </Link>

              <p className="mt-1 truncate text-xs text-muted-foreground">
                {fullName ?? "No name set"}
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="
                    h-8
                    w-8
                    shrink-0
                    rounded-lg
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:bg-muted
                    active:scale-95
                  "
                >
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-48 rounded-xl"
              >
                <DropdownMenuItem asChild>
                  <Link href={`/resumes/${resumeId}/edit`}>
                    <Pencil className="mr-2 size-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <a href={`/api/pdf?resumeId=${resumeId}`}>
                    <Download className="mr-2 size-4" />
                    Download
                  </a>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleDuplicate}
                  disabled={isActionPending}
                >
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

        <CardFooter
          className="
            flex
            flex-col
            gap-3
            border-t
            p-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <Badge
            variant={status === "PUBLISHED" ? "default" : "secondary"}
            className="transition-all duration-300 group-hover:scale-105"
          >
            {status === "PUBLISHED" ? "Published" : "Draft"}
          </Badge>

          <span className="text-xs text-muted-foreground">
            Updated {formatDistanceToNow(updatedAt)}
          </span>
        </CardFooter>
      </Card>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete this resume?
            </AlertDialogTitle>

            <AlertDialogDescription>
              &quot;{title}&quot; will be moved to trash. This action can be
              reversed by contacting support within 30 days.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isActionPending}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={isActionPending}
            >
              {isActionPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}