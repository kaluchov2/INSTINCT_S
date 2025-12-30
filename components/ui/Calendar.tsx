"use client";

import { cn } from "@/lib/utils";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameMonth,
  isToday,
  isBefore,
  startOfDay,
} from "date-fns";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Activity } from "@/types";

interface CalendarProps {
  className?: string;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  experienceId?: string;
}

export function Calendar({
  className,
  selectedDate,
  onDateSelect,
  experienceId,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { data: activitiesData } = useQuery({
    queryKey: ["activities", experienceId, format(currentMonth, "yyyy-MM")],
    queryFn: async () => {
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(currentMonth);

      const params = new URLSearchParams({
        startDate: format(monthStart, "yyyy-MM-dd"),
        endDate: format(monthEnd, "yyyy-MM-dd"),
      });

      if (experienceId) {
        params.append("experienceId", experienceId);
      }

      const response = await fetch(`/api/activities?${params}`);
      const data = await response.json();
      return data.activities || [];
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const activities: Activity[] = activitiesData || [];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = getDay(monthStart);
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const emptyDays = Array.from({ length: startDayOfWeek }, (_, i) => i);

  const getActivitiesForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return activities.filter((a) => a.date === dateStr);
  };

  const hasAvailability = (date: Date) => {
    const dateActivities = getActivitiesForDate(date);
    return dateActivities.some((a) => a.reserved_count < a.capacity);
  };

  const isPastDate = (date: Date) => {
    return isBefore(date, startOfDay(new Date()));
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-md p-6", className)}>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-2xl font-bold text-brand-gunmetal">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
              )
            }
            className="px-3 py-1 rounded hover:bg-gray-100 text-brand-gunmetal font-semibold"
            aria-label="Previous month"
          >
            ←
          </button>
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
              )
            }
            className="px-3 py-1 rounded hover:bg-gray-100 text-brand-gunmetal font-semibold"
            aria-label="Next month"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dayLabels.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-600 pb-2"
          >
            {day}
          </div>
        ))}

        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {daysInMonth.map((day) => {
          const isCurrentDay = isToday(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected =
            selectedDate &&
            format(selectedDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd");
          const available = hasAvailability(day);
          const past = isPastDate(day);

          return (
            <button
              key={day.toString()}
              onClick={() => !past && available && onDateSelect(day)}
              disabled={past || !available}
              className={cn(
                "aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors relative",
                isSelected && "ring-2 ring-brand-teal bg-brand-teal/10",
                isCurrentDay && "bg-brand-teal/20",
                available &&
                  !past &&
                  "hover:bg-gray-100 cursor-pointer text-gray-700",
                (!available || past) &&
                  "opacity-40 cursor-not-allowed text-gray-400",
                !isCurrentMonth && "text-gray-300"
              )}
            >
              <span>{format(day, "d")}</span>
              {available && !past && (
                <span className="absolute bottom-1 w-1.5 h-1.5 bg-brand-teal rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4 text-xs justify-center">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-brand-teal rounded-full" />
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-gray-300 rounded-full" />
            <span className="text-gray-600">Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
}
