const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Rate limiting middleware
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: "Too many email requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to email endpoint
app.use("/api/send-email", emailLimiter);

// Create nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use App Password for Gmail
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

// Email validation function
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Input validation function
const validateInput = (data) => {
  const { name, email, subject, message } = data;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return "Name must be at least 2 characters long";
  }

  if (!email || !validateEmail(email)) {
    return "Please provide a valid email address";
  }

  if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
    return "Subject must be at least 3 characters long";
  }

  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return "Message must be at least 10 characters long";
  }

  // Check for excessively long inputs
  if (name.length > 100) return "Name is too long";
  if (subject.length > 200) return "Subject is too long";
  if (message.length > 5000) return "Message is too long";

  return null;
};

// Sanitize input to prevent HTML injection
const sanitizeInput = (input) => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
};

// Main email sending endpoint
app.post("/api/send-email", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    const validationError = validateInput(req.body);
    if (validationError) {
      return res.status(400).json({
        success: false,
        error: validationError,
      });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name.trim());
    const sanitizedSubject = sanitizeInput(subject.trim());
    const sanitizedMessage = sanitizeInput(message.trim());

    // Create transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error("Transporter verification failed:", verifyError);
      return res.status(500).json({
        success: false,
        error: "Email server configuration error. Please try again later.",
      });
    }

    // Email options
    const mailOptions = {
      from: {
        name: "Portfolio Contact Form",
        address: process.env.EMAIL_USER,
      },
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: `Contact Form: ${sanitizedSubject}`,
      text: `
New Contact Form Submission

Name: ${sanitizedName}
Email: ${email}
Subject: ${sanitizedSubject}

Message:
${sanitizedMessage}

---
This message was sent from your portfolio contact form.
Reply directly to this email to respond to ${sanitizedName}.
      `,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 300;">
              New Contact Form Submission
            </h1>
          </div>
          
          <div style="padding: 30px;">
            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px; border-left: 5px solid #667eea;">
              <h2 style="color: #333; margin-top: 0; margin-bottom: 20px; font-size: 18px;">Contact Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555; width: 80px;">Name:</td>
                  <td style="padding: 8px 0; color: #333;">${sanitizedName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 8px 0; color: #333;"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td>
                  <td style="padding: 8px 0; color: #333;">${sanitizedSubject}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #ffffff; padding: 25px; border-radius: 10px; border: 1px solid #e9ecef;">
              <h3 style="color: #333; margin-top: 0; margin-bottom: 15px; font-size: 16px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Message:</h3>
              <div style="line-height: 1.6; color: #555; font-size: 15px; white-space: pre-wrap;">${sanitizedMessage.replace(
                /\n/g,
                "<br>"
              )}</div>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 10px; text-align: center;">
              <p style="margin: 0; color: #6c757d; font-size: 14px;">
                <strong>Quick Reply:</strong> Simply reply to this email to respond directly to ${sanitizedName}
              </p>
            </div>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="margin: 0; color: #6c757d; font-size: 12px;">
              Sent on ${new Date().toLocaleString()} • Portfolio Contact Form
            </p>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);
    console.log(`From: ${sanitizedName} (${email})`);
    console.log(`Subject: ${sanitizedSubject}`);

    res.status(200).json({
      success: true,
      message: "Email sent successfully!",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Error sending email:", error);

    let errorMessage = "Failed to send email. Please try again later.";

    // Handle specific error types
    if (error.code === "EAUTH") {
      errorMessage =
        "Email authentication failed. Please check server configuration.";
    } else if (error.code === "ECONNECTION") {
      errorMessage =
        "Failed to connect to email server. Please try again later.";
    } else if (error.code === "ETIMEDOUT") {
      errorMessage = "Email server timeout. Please try again later.";
    } else if (error.responseCode === 550) {
      errorMessage = "Invalid email address. Please check and try again.";
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
    service: "Portfolio Email API",
    version: "1.0.0",
    uptime: process.uptime(),
  });
});

// Test endpoint for development
app.get("/api/test", (req, res) => {
  res.status(200).json({
    message: "Email API is running!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Email server running on port ${PORT}`);
  console.log(`📧 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`📨 Email endpoint: http://localhost:${PORT}/api/send-email`);
});

module.exports = app;
