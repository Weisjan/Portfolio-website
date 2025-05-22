const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: "Too many email requests from this IP, please try again later.",
  },
});

app.use(cors());
app.use(express.json());
app.use("/api/send-email", emailLimiter);

const createTransporter = () => {
  return nodemailer.createTransporter({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateInput = (data) => {
  const { name, email, subject, message } = data;

  if (!name || name.trim().length < 2) {
    return "Name must be at least 2 characters long";
  }

  if (!email || !validateEmail(email)) {
    return "Please provide a valid email address";
  }

  if (!subject || subject.trim().length < 3) {
    return "Subject must be at least 3 characters long";
  }

  if (!message || message.trim().length < 10) {
    return "Message must be at least 10 characters long";
  }

  return null;
};

app.post("/api/send-email", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const validationError = validateInput(req.body);
    if (validationError) {
      return res.status(400).json({
        success: false,
        error: validationError,
      });
    }

    const transporter = createTransporter();

    await transporter.verify();

    const mailOptions = {
      from: {
        name: "Contact Form",
        address: process.env.EMAIL_USER,
      },
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: `Contact Form: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #4b5563;">${message.replace(
              /\n/g,
              "<br>"
            )}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This message was sent from your portfolio contact form.</p>
            <p>Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);

    res.status(200).json({
      success: true,
      message: "Email sent successfully!",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Error sending email:", error);

    let errorMessage = "Failed to send email. Please try again later.";

    if (error.code === "EAUTH") {
      errorMessage =
        "Email authentication failed. Please check server configuration.";
    } else if (error.code === "ECONNECTION") {
      errorMessage =
        "Failed to connect to email server. Please try again later.";
    }

    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "Email API",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/api/health`);
});

module.exports = app;
