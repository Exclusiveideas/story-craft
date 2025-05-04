import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { storytellingStructures, storytellingStyles } from "@/lib/constants";

export function ProjectForm({
  selectedStyle,
  setField,
  setSelectedStyle,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="grid gap-4 py-4">
      {/* Project Name */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="projectName" className="text-right">
          Project Name
        </Label>
        <Input
          id="projectName"
          onChange={(e) => setField("projectName", e.target.value)}
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
          onChange={(e) => setField("scriptTitle", e.target.value)}
          className="col-span-3"
          placeholder="e.g., How AI is Changing Everything"
        />
      </div>

      {/* Storytelling Style Dropdown */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Style</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="col-span-3 justify-between">
              {selectedStyle ? selectedStyle.label : "Select Style"}
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
                          selectedStyle?.value === style.value ? null : style
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

      {/* Selected Style description */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="tags" className="text-right">
          Style Info
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
          onChange={(e) => setField("tags", e.target.value)}
          className="col-span-3"
          placeholder="e.g., AI, technology, future"
        />
      </div>

      {/* Description */}
      <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor="description" className="text-right mt-2">
          Description
        </Label>
        <Textarea
          id="description"
          onChange={(e) => setField("description", e.target.value)}
          className="col-span-3"
          placeholder="Describe your video idea, audience, tone, and limitations (like max no. of chapters)"
        />
      </div>
    </div>
  );
}
