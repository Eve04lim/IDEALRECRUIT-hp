import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, name, email, phone, message, type } = body;

    // 入力検証
    if (!company || !name || !email || !message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // メール転送用のトランスポーター設定
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // お問い合わせ種別の日本語表示
    const typeLabels: Record<string, string> = {
      general: '一般的なお問い合わせ',
      service: 'サービスについて',
      estimate: 'お見積りについて',
      other: 'その他',
    };

    // メール送信
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject: `【お問い合わせ】${company}様 - ${typeLabels[type] || type}`,
      text: `
【お問い合わせ内容】
会社名: ${company}
お名前: ${name}
メール: ${email}
電話番号: ${phone || '未入力'}
お問い合わせ種別: ${typeLabels[type] || type}

【メッセージ】
${message}
      `,
      html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="border-bottom: 1px solid #ddd; padding-bottom: 10px;">お問い合わせがありました</h2>
  
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <tr>
      <th style="text-align: left; padding: 8px; border-bottom: 1px solid #eee;">会社名</th>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${company}</td>
    </tr>
    <tr>
      <th style="text-align: left; padding: 8px; border-bottom: 1px solid #eee;">お名前</th>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td>
    </tr>
    <tr>
      <th style="text-align: left; padding: 8px; border-bottom: 1px solid #eee;">メールアドレス</th>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td>
    </tr>
    <tr>
      <th style="text-align: left; padding: 8px; border-bottom: 1px solid #eee;">電話番号</th>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || '未入力'}</td>
    </tr>
    <tr>
      <th style="text-align: left; padding: 8px; border-bottom: 1px solid #eee;">お問い合わせ種別</th>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${typeLabels[type] || type}</td>
    </tr>
  </table>
  
  <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px;">メッセージ</h3>
  <div style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 4px;">
    ${message.replace(/\n/g, '<br>')}
  </div>
</div>
      `,
    });

    return NextResponse.json({
      message: 'お問い合わせを受け付けました',
      success: true,
    });
  } catch (error) {
    console.error('メール送信エラー:', error);
    return NextResponse.json(
      { error: 'お問い合わせの送信に失敗しました' },
      { status: 500 }
    );
  }
}