const nodemailer = require('nodemailer');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const response = (statusCode, body) => ({
  statusCode,
  headers: corsHeaders,
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
    };
  }

  if (event.httpMethod !== 'POST') {
    return response(405, { error: 'Method not allowed' });
  }

  const missingEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'].filter(
    (key) => !process.env[key]
  );
  if (missingEnv.length) {
    return response(500, {
      error: 'Email transport is not configured on the server.',
      missing: missingEnv,
    });
  }

  let payload = {};
  try {
    payload = JSON.parse(event.body ?? '{}');
  } catch {
    return response(400, { error: 'Invalid JSON body' });
  }

  const { name, phone, message = '', consent } = payload;

  if (!name || !phone || consent !== true) {
    return response(400, {
      error: 'Name, phone and consent are required.',
    });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const toEmail = process.env.TO_EMAIL || process.env.SMTP_USER;
  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;

  const text = [
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Комментарий: ${message || '—'}`,
  ].join('\n');

  try {
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: 'Новая заявка с контактной формы',
      text,
    });

    return response(200, { ok: true });
  } catch (error) {
    console.error('Failed to send email', error);
    return response(500, { error: 'Failed to send email' });
  }
};
