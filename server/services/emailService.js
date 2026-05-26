const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send email helper
const sendEmail = async (to, subject, html) => {
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
    console.log(`📧 Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('❌ Email error:', error.message);
    return false;
  }
};

// ========== EMAIL TEMPLATES ==========

// 1. HR Notification - New Application
const sendHRNotification = async (candidate) => {
  const subject = `🆕 New Application: ${candidate.fullName} - ${candidate.position}`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f0f2f5; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #4F46E5, #7C3AED); color: #fff; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; }
        .content { padding: 30px; }
        .field { margin-bottom: 12px; }
        .label { font-weight: 600; color: #374151; font-size: 14px; }
        .value { color: #6B7280; font-size: 14px; }
        .btn { display: inline-block; padding: 12px 28px; background: #4F46E5; color: #fff; text-decoration: none; border-radius: 8px; margin-top: 20px; font-weight: 600; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #9CA3AF; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 New Application Received</h1>
        </div>
        <div class="content">
          <div class="field"><span class="label">Name:</span> <span class="value">${candidate.fullName}</span></div>
          <div class="field"><span class="label">Email:</span> <span class="value">${candidate.email}</span></div>
          <div class="field"><span class="label">Phone:</span> <span class="value">${candidate.phone}</span></div>
          <div class="field"><span class="label">Position:</span> <span class="value">${candidate.position}</span></div>
          <div class="field"><span class="label">Experience:</span> <span class="value">${candidate.experience || 'N/A'}</span></div>
          <div class="field"><span class="label">Expected Salary:</span> <span class="value">${candidate.expectedSalary || 'N/A'}</span></div>
          <a href="${process.env.CLIENT_URL}/admin/candidates/${candidate._id}" class="btn">View Application →</a>
        </div>
        <div class="footer">
          <p>HR Recruitment Portal • Automated Notification</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return sendEmail(process.env.HR_EMAIL, subject, html);
};

// 2. Interview Scheduled Email to Candidate
const sendInterviewEmail = async (candidate, interviewDetails) => {
  const subject = `🎯 Interview Scheduled - ${candidate.position}`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f0f2f5; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #3B82F6, #1D4ED8); color: #fff; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; }
        .content { padding: 30px; }
        .greeting { font-size: 16px; color: #1F2937; margin-bottom: 16px; }
        .info-box { background: #EFF6FF; border-left: 4px solid #3B82F6; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .info-item { margin-bottom: 10px; }
        .info-label { font-weight: 600; color: #1E40AF; }
        .info-value { color: #374151; }
        .btn { display: inline-block; padding: 12px 28px; background: #3B82F6; color: #fff; text-decoration: none; border-radius: 8px; margin-top: 15px; font-weight: 600; }
        .note { color: #6B7280; font-size: 14px; margin-top: 20px; font-style: italic; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #9CA3AF; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 Interview Scheduled</h1>
        </div>
        <div class="content">
          <p class="greeting">Dear <strong>${candidate.fullName}</strong>,</p>
          <p>We are pleased to inform you that your interview for the position of <strong>${candidate.position}</strong> has been scheduled.</p>
          <div class="info-box">
            <div class="info-item"><span class="info-label">📅 Date:</span> <span class="info-value">${interviewDetails.date}</span></div>
            <div class="info-item"><span class="info-label">⏰ Time:</span> <span class="info-value">${interviewDetails.time}</span></div>
            <div class="info-item"><span class="info-label">💻 Mode:</span> <span class="info-value">${interviewDetails.mode}</span></div>
            ${interviewDetails.meetingLink ? `<div class="info-item"><span class="info-label">🔗 Meeting Link:</span> <span class="info-value"><a href="${interviewDetails.meetingLink}">${interviewDetails.meetingLink}</a></span></div>` : ''}
          </div>
          ${interviewDetails.description ? `<p><strong>Instructions:</strong> ${interviewDetails.description}</p>` : ''}
          ${interviewDetails.meetingLink ? `<a href="${interviewDetails.meetingLink}" class="btn">Join Meeting →</a>` : ''}
          <p class="note">Please be on time and have your ID ready. Good luck!</p>
        </div>
        <div class="footer">
          <p>HR Recruitment Portal • Best wishes for your interview!</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return sendEmail(candidate.email, subject, html);
};

// 3. Rejection Email to Candidate
const sendRejectionEmail = async (candidate, reason) => {
  const subject = `Application Update - ${candidate.position}`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f0f2f5; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #6B7280, #374151); color: #fff; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; }
        .content { padding: 30px; }
        .greeting { font-size: 16px; color: #1F2937; margin-bottom: 16px; }
        .message { color: #4B5563; line-height: 1.6; }
        ${reason ? `.reason-box { background: #F3F4F6; border-left: 4px solid #6B7280; padding: 15px; border-radius: 8px; margin: 20px 0; color: #374151; }` : ''}
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #9CA3AF; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Application Update</h1>
        </div>
        <div class="content">
          <p class="greeting">Dear <strong>${candidate.fullName}</strong>,</p>
          <div class="message">
            <p>Thank you for your interest in the <strong>${candidate.position}</strong> position and for taking the time to apply.</p>
            <p>After careful consideration, we regret to inform you that we have decided to move forward with other candidates at this time.</p>
            ${reason ? `<div class="reason-box"><strong>Feedback:</strong> ${reason}</div>` : ''}
            <p>We truly appreciate your interest in our organization and encourage you to apply for future openings that match your qualifications.</p>
            <p>We wish you all the best in your career journey.</p>
          </div>
        </div>
        <div class="footer">
          <p>HR Recruitment Portal • Thank you for applying</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return sendEmail(candidate.email, subject, html);
};

// 4. Selection/Welcome Email to Candidate
const sendSelectionEmail = async (candidate) => {
  const subject = `🎉 Congratulations! You've Been Selected - ${candidate.position}`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f0f2f5; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #10B981, #059669); color: #fff; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; }
        .content { padding: 30px; }
        .greeting { font-size: 16px; color: #1F2937; margin-bottom: 16px; }
        .congrats { font-size: 18px; color: #059669; font-weight: 700; text-align: center; margin: 20px 0; }
        .info-box { background: #ECFDF5; border-left: 4px solid #10B981; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .message { color: #4B5563; line-height: 1.6; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #9CA3AF; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome Aboard!</h1>
        </div>
        <div class="content">
          <p class="greeting">Dear <strong>${candidate.fullName}</strong>,</p>
          <p class="congrats">🎊 Congratulations! You've been selected! 🎊</p>
          <div class="message">
            <p>We are thrilled to inform you that you have been <strong>selected</strong> for the position of <strong>${candidate.position}</strong>.</p>
            <div class="info-box">
              <p><strong>What's Next:</strong></p>
              <ul>
                <li>You will receive your offer letter shortly</li>
                <li>Our HR team will contact you with joining details</li>
                <li>Please keep your documents ready for verification</li>
              </ul>
            </div>
            <p>Welcome to the team! We look forward to working with you.</p>
          </div>
        </div>
        <div class="footer">
          <p>HR Recruitment Portal • Welcome to the team! 🚀</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return sendEmail(candidate.email, subject, html);
};

// 5. Send OTP Email for Password Reset
const sendOTPEmail = async (email, name, otp) => {
  const subject = `🔐 Password Reset OTP - HR Recruitment Portal`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f0f2f5; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #EF4444, #F59E0B); color: #fff; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; }
        .content { padding: 30px; }
        .greeting { font-size: 16px; color: #1F2937; margin-bottom: 16px; }
        .otp-box { background: #FEF3C7; border: 2px dashed #F59E0B; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .otp-code { font-size: 32px; font-weight: 800; color: #D97706; letter-spacing: 6px; margin: 0; }
        .note { color: #6B7280; font-size: 14px; margin-top: 20px; line-height: 1.5; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #9CA3AF; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Password Reset Request</h1>
        </div>
        <div class="content">
          <p class="greeting">Hello <strong>${name}</strong>,</p>
          <p>We received a request to reset your password for the HR Recruitment Portal Admin account. Please use the following One-Time Password (OTP) to complete the reset process:</p>
          <div class="otp-box">
            <h2 class="otp-code">${otp}</h2>
          </div>
          <p class="note">This OTP is valid for <strong>10 minutes</strong>. For security reasons, do not share this OTP with anyone.</p>
          <p class="note">If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
        </div>
        <div class="footer">
          <p>HR Recruitment Portal • Security Alert</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return sendEmail(email, subject, html);
};

module.exports = {
  sendHRNotification,
  sendInterviewEmail,
  sendRejectionEmail,
  sendSelectionEmail,
  sendOTPEmail,
};
