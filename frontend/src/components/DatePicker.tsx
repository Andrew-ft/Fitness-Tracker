"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Calendar28Props {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  return date ? !isNaN(date.getTime()) : false;
}

export function Calendar28({ value, onChange, disabled }: Calendar28Props) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);

  React.useEffect(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setDate(d);
        setMonth(d);
      }
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="June 01, 2025"
          className="bg-background pr-10"
          disabled={disabled}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val);
            const d = new Date(val);
            if (isValidDate(d)) {
              setDate(d);
              setMonth(d);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" && !disabled) {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        {!disabled && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date-picker"
                variant="ghost"
                className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              >
                <CalendarIcon className="size-3.5" />
                <span className="sr-only">Select date</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                month={month}
                onMonthChange={setMonth}
                onSelect={(selectedDate: Date | undefined) => {
                  if (!selectedDate) return;
                  setDate(selectedDate);
                  onChange(selectedDate.toISOString().split("T")[0]);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
