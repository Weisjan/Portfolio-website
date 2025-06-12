import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
    loading: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setFormStatus({
        submitted: true,
        success: false,
        message: "Please fill in all required fields.",
        loading: false,
      });
      return;
    }

    // Set loading state
    setFormStatus({
      submitted: false,
      success: false,
      message: "",
      loading: true,
    });

    try {
      // Send email via backend API
      const response = await fetch("http://localhost:3001/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus({
          submitted: true,
          success: true,
          message:
            "Your message has been sent successfully! I will get back to you soon.",
          loading: false,
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setFormStatus({
          submitted: true,
          success: false,
          message: result.error || "Failed to send message. Please try again.",
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setFormStatus({
        submitted: true,
        success: false,
        message: "Network error. Please check your connection and try again.",
        loading: false,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-0">
      <h1 className="text-4xl font-bold mb-8 text-emerald-500">Contact Me</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-emerald-400">
            Get In Touch
          </h2>
          <p className="text-gray-300 mb-6">
            Have a project in mind or just want to say hello? I'd love to hear
            from you. Fill out the form or reach out through the contact
            information provided.
          </p>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="h-6 w-6 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="ml-3 text-gray-300">
                <p className="font-medium">Email</p>
                <p>janfranciszekweis@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="h-6 w-6 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="ml-3 text-gray-300">
                <p className="font-medium">Location</p>
                <p>Gdańsk, PL</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="h-6 w-6 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3 text-gray-300">
                <p className="font-medium">Availability</p>
                <p>Monday - Friday: 9am - 5pm CET</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">
              Connect With Me
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-emerald-400"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-emerald-400"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-emerald-400"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div>
          <div
            className="bg-black border border-emerald-500 p-6 rounded-lg shadow-lg relative overflow-hidden"
            style={{
              boxShadow:
                "0 0 15px rgba(16, 185, 129, 0.5), 0 0 30px rgba(5, 150, 105, 0.3)",
              backgroundImage:
                "linear-gradient(to bottom right, rgba(8, 8, 12, 0.95), rgba(3, 7, 18, 0.98))",
            }}
          >
            {formStatus.submitted && (
              <div
                className={`mb-6 p-4 rounded border ${
                  formStatus.success
                    ? "bg-black border-emerald-400 text-emerald-400"
                    : "bg-black border-red-400 text-red-400"
                }`}
                style={{
                  textShadow: formStatus.success
                    ? "0 0 8px rgba(52, 211, 153, 0.6)"
                    : "0 0 8px rgba(248, 113, 113, 0.6)",
                }}
              >
                {formStatus.message}
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-emerald-400 mb-2 tracking-wider text-sm"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={formStatus.loading}
                className="w-full px-4 py-2 bg-gray-900 border border-emerald-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-100 disabled:opacity-50"
                required
                style={{ boxShadow: "inset 0 0 6px rgba(16, 185, 129, 0.3)" }}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-emerald-400 mb-2 tracking-wider text-sm"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={formStatus.loading}
                className="w-full px-4 py-2 bg-gray-900 border border-emerald-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-100 disabled:opacity-50"
                required
                style={{ boxShadow: "inset 0 0 6px rgba(16, 185, 129, 0.3)" }}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-emerald-400 mb-2 tracking-wider text-sm"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={formStatus.loading}
                className="w-full px-4 py-2 bg-gray-900 border border-emerald-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-100 disabled:opacity-50"
                required
                style={{ boxShadow: "inset 0 0 6px rgba(16, 185, 129, 0.3)" }}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-emerald-400 mb-2 tracking-wider text-sm"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                disabled={formStatus.loading}
                className="w-full px-4 py-2 bg-gray-900 border border-emerald-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-100 disabled:opacity-50"
                required
                style={{ boxShadow: "inset 0 0 6px rgba(16, 185, 129, 0.3)" }}
              ></textarea>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={formStatus.loading}
              className="w-full bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-3 px-4 rounded-md hover:from-emerald-600 hover:to-emerald-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 tracking-wider disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              style={{ textShadow: "0 0 5px rgba(16, 185, 129, 0.8)" }}
            >
              {formStatus.loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
