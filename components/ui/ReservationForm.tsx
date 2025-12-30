"use client";

import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { EXPERIENCES } from "@/lib/constants";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Activity, BookingFormData } from "@/types";
import { format } from "date-fns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ReservationFormProps {
  className?: string;
  selectedDate: Date | null;
  selectedExperience?: string;
}

type BookingStep = "form" | "payment" | "success";

export function ReservationForm({
  className,
  selectedDate,
  selectedExperience,
}: ReservationFormProps) {
  const [selectedActivity, setSelectedActivity] = useState<string>("");
  const [bookingStep, setBookingStep] = useState<BookingStep>("form");
  const [reservationData, setReservationData] = useState<any>(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BookingFormData>();

  const experienceId = watch("activityId")
    ? EXPERIENCES.find((e) =>
        activities?.some(
          (a) => a.id === watch("activityId") && a.experience_id === e.id
        )
      )?.id
    : selectedExperience;

  // Fetch activities for the selected date and experience
  const { data: activitiesData } = useQuery({
    queryKey: [
      "activities-for-form",
      selectedDate ? format(selectedDate, "yyyy-MM-dd") : null,
      experienceId,
    ],
    queryFn: async () => {
      if (!selectedDate || !experienceId) return [];

      const params = new URLSearchParams({
        experienceId: experienceId,
        startDate: format(selectedDate, "yyyy-MM-dd"),
        endDate: format(selectedDate, "yyyy-MM-dd"),
      });

      const response = await fetch(`/api/activities?${params}`);
      const data = await response.json();
      return data.activities?.filter(
        (a: Activity) => a.reserved_count < a.capacity
      ) || [];
    },
    enabled: !!selectedDate && !!experienceId,
  });

  const activities: Activity[] = activitiesData || [];

  // Create reservation mutation
  const createReservation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create reservation");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setReservationData(data);
      setBookingStep("payment");
      // Invalidate activities cache to refresh availability
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
    onError: (error: Error) => {
      alert(error.message || "An error occurred. Please try again.");
    },
  });

  // Confirm payment mutation
  const confirmPayment = useMutation({
    mutationFn: async (reservationId: string) => {
      const response = await fetch(
        `/api/reservations/${reservationId}/confirm-payment`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Payment failed");
      }

      return response.json();
    },
    onSuccess: () => {
      setBookingStep("success");
      // Invalidate cache after successful booking
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
    onError: (error: Error) => {
      alert(error.message || "Payment processing failed. Please try again.");
    },
  });

  const onSubmit = (data: BookingFormData) => {
    createReservation.mutate({
      ...data,
      activityId: selectedActivity,
    });
  };

  const handleMockPayment = () => {
    if (reservationData?.reservationId) {
      confirmPayment.mutate(reservationData.reservationId);
    }
  };

  // Success screen
  if (bookingStep === "success") {
    return (
      <div className={cn("bg-white rounded-lg shadow-md p-6", className)}>
        <div className="text-center">
          <div className="text-6xl mb-4">✓</div>
          <h3 className="text-2xl font-bold text-brand-gunmetal mb-4">
            Booking Confirmed!
          </h3>
          <p className="text-gray-600 mb-4">
            Your confirmation code is:{" "}
            <strong className="text-brand-teal">
              {reservationData.confirmationCode}
            </strong>
          </p>
          <p className="text-sm text-gray-500">
            We've sent a confirmation email to your inbox with all the details.
          </p>
          <Button
            onClick={() => {
              setBookingStep("form");
              setReservationData(null);
              setSelectedActivity("");
            }}
            variant="primary"
            className="mt-6"
          >
            Book Another Activity
          </Button>
        </div>
      </div>
    );
  }

  // Payment screen
  if (bookingStep === "payment") {
    return (
      <div className={cn("bg-white rounded-lg shadow-md p-6", className)}>
        <h3 className="text-2xl font-bold text-brand-gunmetal mb-6">
          Mock Payment
        </h3>
        <p className="text-gray-600 mb-6">
          This is a simulated payment. Click the button below to confirm your
          reservation.
        </p>
        <Button
          onClick={handleMockPayment}
          disabled={confirmPayment.isPending}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {confirmPayment.isPending ? "Processing..." : "Confirm Payment"}
        </Button>
        <Button
          onClick={() => setBookingStep("form")}
          variant="secondary"
          size="lg"
          className="w-full mt-4"
        >
          Cancel
        </Button>
      </div>
    );
  }

  // Booking form
  return (
    <div className={cn("bg-white rounded-lg shadow-md p-6", className)}>
      <h3 className="text-2xl font-bold text-brand-gunmetal mb-6">
        Reserve Your Spot
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="experience"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Select Experience
          </label>
          <select
            {...register("activityId", {
              required: "Please select an experience",
            })}
            value={experienceId || ""}
            onChange={(e) => {
              // This is just for display - actual activity selection is separate
            }}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-teal focus:outline-none transition-colors bg-white"
          >
            <option value="">Choose a bootcamp...</option>
            {EXPERIENCES.map((exp) => (
              <option key={exp.id} value={exp.id}>
                {exp.title}
              </option>
            ))}
          </select>
          {errors.activityId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.activityId.message}
            </p>
          )}
        </div>

        {selectedDate && activities.length > 0 && (
          <div>
            <label
              htmlFor="activity"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Select Time Slot for {format(selectedDate, "MMMM dd, yyyy")}
            </label>
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-teal focus:outline-none transition-colors bg-white"
            >
              <option value="">Choose a time...</option>
              {activities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.start_time} - {activity.end_time} ($
                  {activity.price_usd}) - {activity.capacity - activity.reserved_count}{" "}
                  spots left
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedDate && experienceId && activities.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              No available time slots for this date. Please select another date
              or experience.
            </p>
          </div>
        )}

        <div>
          <label
            htmlFor="customerName"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Full Name
          </label>
          <input
            {...register("customerName", { required: "Name is required" })}
            type="text"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-teal focus:outline-none transition-colors"
            placeholder="Enter your full name"
          />
          {errors.customerName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.customerName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="customerEmail"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            {...register("customerEmail", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            type="email"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-teal focus:outline-none transition-colors"
            placeholder="your.email@example.com"
          />
          {errors.customerEmail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.customerEmail.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Phone (Optional)
          </label>
          <input
            {...register("phone")}
            type="tel"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-teal focus:outline-none transition-colors"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label
            htmlFor="participants"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Number of Participants
          </label>
          <input
            {...register("participants", {
              required: "Number of participants is required",
              min: { value: 1, message: "At least 1 participant" },
              max: { value: 10, message: "Maximum 10 participants" },
              valueAsNumber: true,
            })}
            type="number"
            defaultValue={1}
            min={1}
            max={10}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-teal focus:outline-none transition-colors"
          />
          {errors.participants && (
            <p className="text-red-500 text-sm mt-1">
              {errors.participants.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="additionalInfo"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Additional Information (Optional)
          </label>
          <textarea
            {...register("additionalInfo")}
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-teal focus:outline-none transition-colors resize-none"
            placeholder="Any questions or special requirements?"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={createReservation.isPending || !selectedActivity}
        >
          {createReservation.isPending
            ? "Processing..."
            : "Continue to Payment"}
        </Button>
      </form>
    </div>
  );
}
