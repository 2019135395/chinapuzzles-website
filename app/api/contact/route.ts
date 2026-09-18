
// import { NextResponse } from 'next/server';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { name, email, message } = body;

//     if (!name || !email || !message) {
//       return NextResponse.json({ success: false, message: "Missing required fields." }, { status: 400 });
//     }

//     await resend.emails.send({
//       from: 'info@chinapuzzles.com',
//       to: 'info@chinapuzzles.com',
//       subject: `New message from ${name}`,
//       replyTo: email,
//       html: `<p>You have a new message from your website contact form:</p>
//              <p><strong>Name:</strong> ${name}</p>
//              <p><strong>Email:</strong> ${email}</p>
//              <p><strong>Message:</strong></p>
//              <p>${message}</p>`,
//     });

//     return NextResponse.json({ success: true, message: "Message sent successfully!" });
//   } catch (error) {
//     console.error("Error in API route:", error);
//     return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 解构前端传来的所有表单字段
    const { name, email, affiliation, participants, programType, travelTime, message } = body;

    // 只有 message 是可选的，其他均为必填
    if (!name || !email || !affiliation || !participants || !programType || !travelTime) {
      return NextResponse.json({ success: false, message: "Missing required fields." }, { status: 400 });
    }

    await resend.emails.send({
      // from: 'info@chinapuzzles.com', // 需要确保在 Resend 验证过这个域名
      // to: 'info@chinapuzzles.com',
      from: 'info@chinapuzzles.com', // 需要确保在 Resend 验证过这个域名
      to: 'info@chinapuzzles.com',
      subject: `New Inquiry from ${name}`,
      replyTo: email, // 用户填写的邮箱，方便你直接回复
      html: `
        <h2>New Inquiry Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Affiliation:</strong> ${affiliation}</p>
        <p><strong>Number of participants:</strong> ${participants}</p>
        <p><strong>Interested program type:</strong> ${programType}</p>
        <p><strong>Expected travel time:</strong> ${travelTime}</p>
        ${message ? `<p><strong>Message / Questions:</strong> ${message}</p>` : ''}
      `,
    });

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}
