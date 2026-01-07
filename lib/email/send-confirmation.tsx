import * as React from 'react';
import { resend } from './resend-client';
import { ConfirmationEmail } from './templates/confirmation-email';
import { EXPERIENCES } from '@/lib/constants';
import { Reservation } from '@/types';
import { render } from '@react-email/render';

export async function sendConfirmationEmail(reservation: any) {
  const experience = EXPERIENCES.find(
    (e) => e.id === reservation.activity.experience_id
  );

  if (!experience) {
    throw new Error(`Experience not found for ID: ${reservation.activity.experience_id}`);
  }

  try {
    const emailHtml = await render(
      <ConfirmationEmail
        customerName={reservation.customer_name}
        confirmationCode={reservation.confirmation_code}
        experienceTitle={experience.title}
        date={reservation.activity.date}
        startTime={reservation.activity.start_time}
        endTime={reservation.activity.end_time}
        participants={reservation.participants}
        totalAmount={reservation.total_amount}
      />
    );

    const { data, error } = await resend.emails.send({
      from: "ka'an <onboarding@resend.dev>",
      to: [reservation.customer_email],
      subject: `Booking Confirmed - ${experience.title} - ${reservation.confirmation_code}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Error sending email:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    throw error;
  }
}
