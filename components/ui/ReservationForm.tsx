"use client";

import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { EXPERIENCES } from "@/lib/constants";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Activity, BookingFormData } from "@/types";
import { format } from "date-fns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation('common');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BookingFormData>();

  const watchedActivityId = watch("activityId");
  const experienceId = watchedActivityId || selectedExperience;

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

  // Reset selected activity when date or experience changes
  useEffect(() => {
    setSelectedActivity("");
  }, [selectedDate, experienceId]);

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
            {t('reservation_form.success_title')}
          </h3>
          <p className="text-gray-600 mb-4">
            {t('reservation_form.success_code')}{" "}
            <strong className="text-brand-teal">
              {reservationData.confirmationCode}
            </strong>
          </p>
          <p className="text-sm text-gray-500">
            {t('reservation_form.success_email')}
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
            {t('reservation_form.book_another')}
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
          {t('reservation_form.payment_title')}
        </h3>
        <p className="text-gray-600 mb-6">
          {t('reservation_form.payment_desc')}
        </p>
        <Button
          onClick={handleMockPayment}
          disabled={confirmPayment.isPending}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {confirmPayment.isPending ? t('reservation_form.processing') : t('reservation_form.confirm_payment')}
        </Button>
        <Button
          onClick={() => setBookingStep("form")}
          variant="secondary"
          size="lg"
          className="w-full mt-4"
        >
          {t('reservation_form.cancel')}
        </Button>
      </div>
    );
  }

  // Booking form
  return (
    <div className={cn("bg-white rounded-lg shadow-md p-6", className)}>
      <h3 className="text-2xl font-bold text-brand-gunmetal mb-6">
        {t('reservation_form.title')}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="experience"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            {t('reservation_form.select_experience')}
          </label>
          <select
            {...register("activityId", {
              required: t('reservation_form.experience_required'),
            })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-teal focus:outline-none transition-colors bg-white text-gray-700"
            defaultValue={selectedExperience || ""}
          >
            <option value="">{t('reservation_form.choose_bootcamp')}</option>
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
              {t('reservation_form.select_time_slot')} {format(selectedDate, "MMMM dd, yyyy")}
            </label>
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-teal focus:outline-none transition-colors bg-white text-gray-700"
            >
              <option value="">{t('reservation_form.choose_time')}</option>
              {activities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.start_time} - {activity.end_time} ($
                  {activity.price_usd}) - {activity.capacity - activity.reserved_count}{" "}
                  {t('reservation_form.spots_left')}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label
            htmlFor="customerName"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            {t('reservation_form.full_name')}
          </label>
          <input
            {...register("customerName", { required: t('reservation_form.name_required') })}
            type="text"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-teal focus:outline-none transition-colors text-gray-700"
            placeholder={t('reservation_form.full_name_placeholder')}
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
            {t('reservation_form.email')}
          </label>
          <input
            {...register("customerEmail", {
              required: t('reservation_form.email_required'),
              pattern: { value: /^\S+@\S+$/i, message: t('reservation_form.email_invalid') },
            })}
            type="email"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-teal focus:outline-none transition-colors text-gray-700"
            placeholder={t('reservation_form.email_placeholder')}
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
            {t('reservation_form.phone')}
          </label>
          <input
            {...register("phone")}
            type="tel"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-teal focus:outline-none transition-colors text-gray-700"
            placeholder={t('reservation_form.phone_placeholder')}
          />
        </div>

        <div>
          <label
            htmlFor="participants"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            {t('reservation_form.participants')}
          </label>
          <input
            {...register("participants", {
              required: t('reservation_form.participants_required'),
              min: { value: 1, message: t('reservation_form.participants_min') },
              max: { value: 10, message: t('reservation_form.participants_max') },
              valueAsNumber: true,
            })}
            type="number"
            defaultValue={1}
            min={1}
            max={10}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-teal focus:outline-none transition-colors text-gray-700"
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
            {t('reservation_form.additional_info')}
          </label>
          <textarea
            {...register("additionalInfo")}
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-teal focus:outline-none transition-colors resize-none text-gray-700"
            placeholder={t('reservation_form.additional_info_placeholder')}
          />
        </div>

        {selectedDate && experienceId && activities.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              {t('reservation_form.no_slots')}
            </p>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={createReservation.isPending || !selectedActivity}
        >
          {createReservation.isPending
            ? t('reservation_form.processing')
            : t('reservation_form.continue_payment')}
        </Button>
      </form>
    </div>
  );
}
