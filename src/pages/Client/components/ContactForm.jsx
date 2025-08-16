import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const validate = (v) => {
  const e = {};
  if (!v.name.trim()) e.name = "Ad Soyad zorunludur.";
  if (!v.email.trim()) e.email = "E-posta zorunludur.";
  else if (!/^\S+@\S+\.\S+$/.test(v.email))
    e.email = "Geçerli bir e-posta girin.";
  if (!v.message.trim()) e.message = "Mesaj zorunludur.";
  return e;
};

const ContactForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [honey, setHoney] = useState("");

  useEffect(() => {
    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      limitRate: { throttle: 5000 },
    });
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (honey) return;

    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    setLoading(true);
    setStatus(null);
    try {
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        name: form.name,
        email: form.email,
        phone: form.phone || "-",
        subject: form.subject || "-",
        message: form.message,
        time: new Date().toLocaleString("tr-TR"),
      });

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const INPUT = [
    "w-full bg-transparent focus:bg-transparent",
    "border-0 border-b border-gray-400/50",
    "focus:border-gray-200 dark:focus:border-white",
    "text-[16px] leading-6", // iOS zoom engelleme
    "text-gray-100 placeholder-gray-400",
    "dark:text-gray-100 dark:placeholder-gray-400",
    "py-2 outline-none appearance-none transition-colors",
    "aria-[invalid=true]:border-red-500",

    // Autofill beyaz dolgu ve metin rengi
    "[&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_transparent]",
    "[&:-webkit-autofill]:[-webkit-text-fill-color:#ffffff]",
    "dark:[&:-webkit-autofill]:[-webkit-text-fill-color:#ffffff]",
    "[&:-webkit-autofill]:caret-white",
    "[&:-webkit-autofill]:transition-[background-color] [&:-webkit-autofill]:duration-[9999s]",
    ":root:not(.dark) [&:-webkit-autofill]:[-webkit-text-fill-color:#111827]", // gray-900
    "dark:[&:-webkit-autofill]:[-webkit-text-fill-color:#ffffff]",
  ].join(" ");

  const ERR = "text-xs text-red-500 mt-1";

  return (
    <article className="pt-4 ">
      {status === "success" && (
        <div className="mb-3 rounded border border-green-200 bg-green-50 px-3 py-2 text-green-700 text-sm">
          Mesajınız alındı. En kısa sürede dönüş yapacağız.
        </div>
      )}
      {status === "error" && (
        <div className="mb-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-red-700 text-sm">
          Bir hata oluştu. Lütfen daha sonra tekrar deneyin.
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        {/* Honeypot */}
        <input
          type="text"
          name="company"
          value={honey}
          onChange={(e) => setHoney(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Ad Soyad *"
              className={INPUT}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "err-name" : undefined}
              autoComplete="name"
              autoCapitalize="words"
            />
            {errors.name && (
              <p id="err-name" className={ERR}>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="E-posta *"
              className={INPUT}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              inputMode="email"
            />
            {errors.email && (
              <p id="err-email" className={ERR}>
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="Telefon"
            className={INPUT}
            autoComplete="tel"
            inputMode="tel"
          />

          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={onChange}
            placeholder="Konu"
            className={INPUT}
            autoComplete="off"
            autoCapitalize="sentences"
          />
        </div>

        <div>
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            placeholder="Mesaj *"
            rows={4}
            className={INPUT + " resize-none"}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "err-message" : undefined}
          />
          {errors.message && (
            <p id="err-message" className={ERR}>
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-gray-100 text-gray-900 dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Gönderiliyor..." : "Gönder"}
        </button>
      </form>
    </article>
  );
};

export default ContactForm;
