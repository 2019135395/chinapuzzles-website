import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 前端只传 name / email / message
    const { name, email, message } = body;

    // 只有 name 和 email 必填，message 可选
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and Email are required.' },
        { status: 400 }
      );
    }

    // 简单邮箱格式校验
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format.' },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: 'info@chinapuzzles.com', // 需确保在 Resend 验证过这个域名
      to: 'info@chinapuzzles.com',
      subject: `New Inquiry from ${name}`,
      replyTo: email,
      html: `
        <h2>New Inquiry Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${message ? `<p><strong>Message / Questions:</strong> ${message}</p>` : ''}
      `,
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}