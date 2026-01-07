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
import { EXPERIENCES } from "@/lib/constants";

// Color mapping for each experience
const EXPERIENCE_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "elite-mountain": { bg: "bg-purple-100", text: "text-purple-800", dot: "bg-purple-500" },
  "los-cabos": { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" },
  "hyrox-training": { bg: "bg-orange-100", text: "text-orange-800", dot: "bg-orange-500" },
  "running-era": { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
};

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

  const getUniqueExperiences = (date: Date) => {
    const dateActivities = getActivitiesForDate(date);
    const availableActivities = dateActivities.filter((a) => a.reserved_count < a.capacity);
    const uniqueExpIds = [...new Set(availableActivities.map((a) => a.experience_id))];
    return uniqueExpIds;
  };

  // Get all unique experiences that have activities in this month
  const monthExperiences = [...new Set(activities.map((a) => a.experience_id))].filter(
    (expId) => activities.some((a) => a.experience_id === expId && a.reserved_count < a.capacity)
  );

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
                "aspect-square flex flex-col items-center justify-center rounded-lg text-sm font-medium transition-colors relative",
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
                <div className="absolute bottom-1 flex gap-0.5">
                  {getUniqueExperiences(day).map((expId) => (
                    <span
                      key={expId}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        EXPERIENCE_COLORS[expId]?.dot || "bg-brand-teal"
                      )}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-600 text-center mb-2">
            Available Activities
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {monthExperiences.map((expId) => {
              const experience = EXPERIENCES.find((e) => e.id === expId);
              const colors = EXPERIENCE_COLORS[expId];
              return experience ? (
                <div
                  key={expId}
                  className={cn(
                    "flex items-center gap-1.5 px-2 py-1 rounded-full text-xs",
                    colors?.bg || "bg-gray-100"
                  )}
                >
                  <span className={cn("w-2 h-2 rounded-full", colors?.dot || "bg-brand-teal")} />
                  <span className={cn("font-medium", colors?.text || "text-gray-700")}>
                    {experience.title}
                  </span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
