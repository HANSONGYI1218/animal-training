"use client";

/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DropdownProps } from "react-day-picker";
import { ko } from "date-fns/locale";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils/utils";

function CalendarDropDown({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-full p-3", className)}
      locale={ko}
      classNames={{
        months: "flex flex-col w-full space-y-4",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium hidden",
        caption_dropdowns: "flex items-center justify-center gap-4 w-full",
        nav: "space-x-1 flex flex-col items-center",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1 top-2.5 hover:bg-neutral-5",
        nav_button_next: "absolute right-1 top-2.5 hover:bg-neutral-5",
        table: "w-full border-collapse space-y-1",
        head_row: "flex w-full",
        head_cell:
          "text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-11 p-0 font-normal aria-selected:opacity-100 hover:bg-green-10 focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        ),
        day_selected:
          "bg-green-100 text-white hover:text-white hover:bg-green-100/90 focus:bg-green-100/90 focus:text-primary-foreground",
        day_today:
          "bg-slate-100 hover:bg-slate-100/80 text-black focus:bg-slate-100/80 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Dropdown: ({ value, onChange, children, ...props }: DropdownProps) => {
          const options = React.Children.toArray(
            children,
          ) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[];

          const selected = options.find((child) => child.props.value === value);

          const handleChange = (value: string) => {
            const changeEvent = {
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange?.(changeEvent);
          };
          return (
            <Select
              value={value?.toString()}
              onValueChange={(value) => {
                handleChange(value);
              }}
            >
              <SelectTrigger
                onMouseDown={(e: any) => e.stopPropagation()} // Prevents the Popover from closing
                onClick={(e: any) => e.stopPropagation()} // Additional safety for click events
                className={`${/^\d{4}$/.test(selected?.props?.children?.toString() ?? "") ? "w-[68px]" : "w-12"} justify-between gap-1 border-none px-0 focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0`}
              >
                <SelectValue>
                  {(() => {
                    const isYear = /^\d{4}$/.test(
                      selected?.props?.value?.toString() ?? "",
                    ); // Check if it's a year
                    if (isYear) {
                      return `${selected?.props?.value}년`; // Display year
                    }
                    const monthValue =
                      parseInt(selected?.props?.value?.toString() ?? "0", 10) +
                      1; // Adjust month value
                    return `${monthValue}월`; // Display adjusted month
                  })()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent position="popper" className="-translate-x-8">
                {options.map((option, id: number) => {
                  let value = option.props.value?.toString() ?? "";
                  const isYear = /^\d{4}$/.test(value); // Check if the value is a 4-digit year

                  if (!isYear) {
                    // Convert month values from 0-11 to 1-12
                    const monthValue = parseInt(value, 10) + 1;
                    value = monthValue.toString();
                  }
                  const displayText = isYear ? `${value}년` : `${value}월`;

                  return (
                    <SelectItem
                      key={`${value}-${id}`}
                      value={(option.props.value ?? "").toString()}
                      className="focus:bg-neutral-5"
                    >
                      {displayText}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          );
        },
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
CalendarDropDown.displayName = "CalendarDropDown";

export { CalendarDropDown };
