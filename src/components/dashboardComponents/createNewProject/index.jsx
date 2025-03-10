"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import useDialogStore from "@/store/useDialogStore";
import { cn, testNewProjectErrors } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import CircularProgress from "@mui/material/CircularProgress";
import { createProject } from "@/apiCalls/projectAPI";
import { useRouter } from "next/navigation";

const storytellingStyles = [
  { value: "heros-journey", label: "Hero's Journey" },
  { value: "problem-solution", label: "Problem-Solution" },
  { value: "listicle", label: "Listicle Format" },
  { value: "narrative-documentary", label: "Narrative Documentary" },
  { value: "before-after", label: "Before-After" },
  { value: "mystery-investigation", label: "Mystery & Investigation" },
  { value: "chronological", label: "Chronological Timeline" },
  { value: "cause-effect", label: "Cause & Effect" },
  { value: "first-person", label: "First-Person Experience" },
  { value: "comparison", label: "Vs. Format (Comparison)" },
  { value: "day-in-life", label: "Day in the Life" },
  { value: "alternate-reality", label: "What If / Alternate Reality" },
  { value: "satirical", label: "Satirical / Parody" },
  { value: "shock-surprise", label: "Shock & Surprise" },
  { value: "challenge", label: "Challenge Format" },
  { value: "rags-to-riches", label: "Rags to Riches" },
  { value: "conspiracy", label: "Conspiracy & Hidden Truths" },
  { value: "explainer", label: "Explainer & Deep Dive" },
];
const storytellingStructures = [
  {
    name: "Hero's Journey",
    description:
      "Classic transformation arc where a protagonist faces challenges, overcomes obstacles, and triumphs.",
  },
  {
    name: "Problem-Solution",
    description:
      "Identifies a problem and presents a solution, commonly used in educational or persuasive content.",
  },
  {
    name: "Listicle Format",
    description:
      "Uses a numbered list to present key points, often seen in 'Top 10' or '5 Things You Didn’t Know' videos.",
  },
  {
    name: "Narrative Documentary",
    description:
      "Story-driven, fact-based content that presents information in a compelling, immersive way.",
  },
  {
    name: "Before-After",
    description:
      "Showcases a transformation, commonly used in fitness, business success, or personal growth stories.",
  },
  {
    name: "Mystery & Investigation",
    description:
      "Builds suspense by uncovering hidden details or solving a mystery, often used in true crime or conspiracy videos.",
  },
  {
    name: "Chronological Timeline",
    description:
      "Presents events in order, explaining how things unfolded over time, often used in historical or tech evolution videos.",
  },
  {
    name: "Cause & Effect",
    description:
      "Explores how one event leads to another, making connections between actions and consequences.",
  },
  {
    name: "First-Person Experience",
    description:
      "Personal storytelling where the creator shares their own journey or experiment.",
  },
  {
    name: "Vs. Format (Comparison)",
    description:
      "Compares two things to highlight their differences, commonly used in product reviews or debates.",
  },
  {
    name: "Day in the Life",
    description:
      "Immersive storytelling into someone's daily routine, offering behind-the-scenes insight.",
  },
  {
    name: "What If / Alternate Reality",
    description:
      "Hypothetical storytelling that explores alternative outcomes, often used in science or speculative content.",
  },
  {
    name: "Satirical / Parody",
    description:
      "Uses humor and exaggeration to critique or entertain, commonly seen in comedy and political commentary.",
  },
  {
    name: "Shock & Surprise",
    description:
      "Keeps engagement high by using unexpected twists or controversial topics.",
  },
  {
    name: "Challenge Format",
    description:
      "Creator attempts a difficult challenge, such as 'I Tried Living Like Elon Musk for a Week' videos.",
  },
  {
    name: "Rags to Riches",
    description:
      "Tells an underdog story of overcoming obstacles and achieving success.",
  },
  {
    name: "Conspiracy & Hidden Truths",
    description:
      "Unveils hidden details or controversial takes, often used in exposé-style videos.",
  },
  {
    name: "Explainer & Deep Dive",
    description:
      "Breaks down a complex topic into an easy-to-understand format, often used in educational content.",
  },
];

export default function NewProjectDialog() {
  const { isOpen, closeDialog } = useDialogStore();
  const [projectName, setProjectName] = React.useState("");
  const [scriptTitle, setScriptTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [selectedStyle, setSelectedStyle] = React.useState(null);
  const [error, setError] = React.useState("");

  const { isLoading, updateIsLoading } = useDialogStore();
  const router = useRouter();

  const handleSave = async () => {
    updateIsLoading(true);
    setError(null);

    const error = testNewProjectErrors({
      projectName,
      scriptTitle,
      storytellingStyle: selectedStyle?.label,
      description,
    });

    if (error) {
      setError(error);
      updateIsLoading(false);
    } else {
      setError(null);
      const newProject = await createProject({
        projectName,
        scriptTitle,
        storytellingStyle: selectedStyle?.label,
        tags: tags.split(",").map((tag) => tag.trim()),
        description,
        notes,
      });

      if (newProject?.error) {
        // toast error
        updateIsLoading(false);
        toast.error("Error creating project.", {
          description: newProject?.error,
          style: {
            border: "none",
            color: "red",
          },
        });
      } else {
        toast.success("Project is created", {
          description: "Preparing research data",
          style: {
            border: "none",
            color: "green",
          },
        });

        updateIsLoading(false);
        closeProjectDialog();
        router.push(`/project/${newProject?.project?.id}`);
      }
    }
  };

  const closeProjectDialog = () => {
    setError(null);
    setDescription("");
    setScriptTitle("");
    setSelectedStyle(null);
    setNotes("");
    setTags("");
    updateIsLoading(false);

    closeDialog();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="flex flex-col sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Script Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to generate a structured script and
            research insights.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Project Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="projectName" className="text-right">
              Project Name
            </Label>
            <Input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="col-span-3"
              placeholder="e.g., AI Revolution"
            />
          </div>

          {/* Script Title */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="scriptTitle" className="text-right">
              Script Title
            </Label>
            <Input
              id="scriptTitle"
              value={scriptTitle}
              onChange={(e) => setScriptTitle(e.target.value)}
              className="col-span-3"
              placeholder="e.g., How AI is Changing Everything"
            />
          </div>

          {/* Storytelling Style Dropdown */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Style</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="col-span-3 justify-between"
                >
                  {selectedStyle
                    ? storytellingStyles.find(
                        (style) => style.label === selectedStyle.label
                      )?.label
                    : "Select Style"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0">
                <Command>
                  <CommandInput placeholder="Search style..." />
                  <CommandList>
                    <CommandEmpty>No style found.</CommandEmpty>
                    <CommandGroup>
                      {storytellingStyles.map((style) => (
                        <CommandItem
                          key={style.value}
                          value={style.value}
                          onSelect={() => {
                            setSelectedStyle(
                              selectedStyle?.value === style.value
                                ? null
                                : style
                            );
                            setOpen(false);
                          }}
                        >
                          {style.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              selectedStyle?.value === style.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Selected Style description */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="tags" className="text-right">
            Description
          </Label>

          {selectedStyle ? (
            <p className="col-span-3 p-4 border rounded-md bg-gray-100 text-gray-700 text-xs">
              {
                storytellingStructures.find(
                  (structure) => structure?.name === selectedStyle?.label
                )?.description
              }
            </p>
          ) : (
            <p className="col-span-3 p-4 border rounded-md bg-gray-100 text-gray-700 text-xs">
              select a style
            </p>
          )}
        </div>

        {/* Tags Input */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="tags" className="text-right">
            Tags
          </Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="col-span-3"
            placeholder="e.g., AI, technology, future"
          />
        </div>

        {/* Script Description */}
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="description" className="text-right mt-2">
            Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="col-span-3"
            placeholder="Briefly describe the script..."
          />
        </div>

        {/* Additional Notes */}
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="notes" className="text-right mt-2">
            Notes
          </Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="col-span-3"
            placeholder="Any additional information..."
          />
        </div>

        {error && (
          <p className="leading-7 text-red-500 text-sm self-center">{error}</p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={closeProjectDialog}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {!isLoading ? (
              <p>Create Project</p>
            ) : (
              <CircularProgress color="white" size="17px" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
