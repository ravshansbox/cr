import nodemailer from 'nodemailer';
import {
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_PORT,
  MAIL_USERNAME,
} from './constants.js';

export const transporter = nodemailer.createTransport({
  secure: true,
  host: MAIL_HOST,
  port: Number(MAIL_PORT),
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
});
