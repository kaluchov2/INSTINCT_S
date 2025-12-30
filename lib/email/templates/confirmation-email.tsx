import * as React from 'react';
import { format } from 'date-fns';

interface ConfirmationEmailProps {
  customerName: string;
  confirmationCode: string;
  experienceTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: number;
  totalAmount: number;
}

export const ConfirmationEmail: React.FC<ConfirmationEmailProps> = ({
  customerName,
  confirmationCode,
  experienceTitle,
  date,
  startTime,
  endTime,
  participants,
  totalAmount,
}) => (
  <html>
    <body style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <div style={{ backgroundColor: '#2a3439', padding: '30px', borderRadius: '8px 8px 0 0' }}>
          <h1 style={{ color: '#ffffff', margin: 0 }}>INSTINCT S</h1>
          <p style={{ color: '#14b8a6', fontSize: '18px', margin: '10px 0 0 0' }}>
            Awaken Your Instincts
          </p>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '30px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ color: '#2a3439', marginTop: 0 }}>
            Booking Confirmed! 🎉
          </h2>

          <p>Dear {customerName},</p>

          <p>
            Your reservation for <strong>{experienceTitle}</strong> has been confirmed!
          </p>

          <div style={{
            backgroundColor: '#f3f4f6',
            padding: '20px',
            borderRadius: '8px',
            margin: '20px 0'
          }}>
            <h3 style={{ marginTop: 0, color: '#2a3439' }}>Reservation Details</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Confirmation Code:</td>
                <td style={{ padding: '8px 0', color: '#14b8a6', fontWeight: 'bold' }}>{confirmationCode}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Date:</td>
                <td style={{ padding: '8px 0' }}>{format(new Date(date), 'MMMM dd, yyyy')}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Time:</td>
                <td style={{ padding: '8px 0' }}>{startTime} - {endTime}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Participants:</td>
                <td style={{ padding: '8px 0' }}>{participants}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Total:</td>
                <td style={{ padding: '8px 0' }}>${totalAmount.toFixed(2)} USD</td>
              </tr>
            </table>
          </div>

          <h3 style={{ color: '#2a3439' }}>What to Bring</h3>
          <ul>
            <li>Comfortable athletic clothing</li>
            <li>Proper footwear for outdoor activities</li>
            <li>Water bottle (1L minimum)</li>
            <li>Sunscreen and hat</li>
            <li>Positive attitude and ready to challenge yourself!</li>
          </ul>

          <h3 style={{ color: '#2a3439' }}>Need to Make Changes?</h3>
          <p>
            If you need to modify or cancel your reservation, please contact us at{' '}
            <a href="mailto:info@instincts.com" style={{ color: '#14b8a6' }}>
              info@instincts.com
            </a>{' '}
            with your confirmation code.
          </p>

          <p style={{ marginTop: '30px' }}>
            We're excited to have you join us for this transformative experience!
          </p>

          <p>
            See you soon,<br />
            <strong>The Instinct S Team</strong>
          </p>
        </div>

        <div style={{
          backgroundColor: '#f3f4f6',
          padding: '20px',
          borderRadius: '0 0 8px 8px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#6b7280'
        }}>
          <p style={{ margin: '5px 0' }}>
            Instinct S | Elite Outdoor Bootcamps
          </p>
          <p style={{ margin: '5px 0' }}>
            Phone: +1 (555) 123-4567 | Email: info@instincts.com
          </p>
        </div>
      </div>
    </body>
  </html>
);
