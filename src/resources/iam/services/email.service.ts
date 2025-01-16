import { Inject, Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import type { EmailConfig, ServiceType } from "../types/email.interfaces";
@Injectable()
export class EmailService {
  private readonly sendermail: string = process.env.email_user;
  private readonly service: ServiceType = process.env
    .email_service as ServiceType;
  private readonly password: string = process.env.email_pass;
  private transporter: nodemailer.Transporter;

  constructor(@Inject("EMAIL_CONFIG") private readonly config: EmailConfig) {
    this.service = config.service;
    this.sendermail = config.sendermail;
    this.password = config.password;
  }

  private async sendEmail({
    email,
    subject,
    html,
  }: {
    email: string;
    subject: string;
    html: string;
  }): Promise<boolean> {
    try {
      const info = await this.transporter.sendMail({
        subject,
        from: this.sendermail,
        to: email,
        html,
      });
      console.log("Email sent: %s", info.messageId);
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }

  async sendOtpEmail(email: string, code: number): Promise<boolean> {
    const subject = "Your Verification Code";
    const html = `
      <h1>Verification Code</h1>
      <p>Your code is: ${code}</p>
      <p>Please use this code to verify your account.</p>
    `;
    return this.sendEmail({ email, subject, html });
  }
  async sendResetEmail(email: string, resetToken: string): Promise<boolean> {
    const subject = "Password Reset Request";
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const html = `
      <h1>Password Reset Request</h1>
      <p>You have requested to reset your password. Click the link below to proceed:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    `;
    return this.sendEmail({ email, subject, html });
  }
  async sendWelcomeEmail(email: string, name: string, code: number): Promise<boolean> {
    const subject = "Welcome to Assessment";
    const html = `
      <h1>Welcome to Assessment!</h1>
      <p>Dear ${name},</p>
      <p>We're thrilled to have you join our community at Assessment. As a member, you'll have access to our innovative property management solutions.</p>
      <p>Here are a few things you can do to get started:</p>
      <ul>
        <li>Verify your mail by copying this code : ${code}</li>
      </ul>
      <p>If you have any questions, our support team is always here to help.</p>
      <p>Best regards,<br>The Assessment Team</p>
    `;
    return this.sendEmail({ email, subject, html });
  }
  public async initialize() {
    this.transporter = nodemailer.createTransport({
      service: this.service,
      secure: true,
      auth: {
        user: this.sendermail,
        pass: this.password,
      },
    });

    try {
      await this.transporter.verify();
      console.log("Email service initialized successfully");
    } catch (error) {
      console.error("Failed to initialize email service", error);
    }
  }
}
