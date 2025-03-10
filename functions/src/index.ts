import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
// corsのインポート方法を修正
import cors from 'cors';

// corsのインスタンス化を修正
const corsMiddleware = cors({ origin: true });

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export const sendMail = functions.https.onRequest((req, res) => {
  // Promise型を返す関数に変換
  return new Promise<void>((resolve) => {
    corsMiddleware(req, res, async () => {
      if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return resolve();
      }

      try {
        const { name, email, message } = req.body as ContactRequest;

        if (!name || !email || !message) {
          res.status(400).send({ error: '必須項目が不足しています' });
          return resolve();
        }

        // 環境変数から設定を取得
        const config = functions.config();

        // トランスポーターを設定
        const transporter = nodemailer.createTransport({
          host: config.smtp.host,
          port: parseInt(config.smtp.port),
          secure: config.smtp.secure === 'true',
          auth: {
            user: config.smtp.user,
            pass: config.smtp.password
          }
        });

        // メール送信
        await transporter.sendMail({
          from: config.mail.from,
          to: config.mail.to,
          subject: `お問い合わせ: ${name}様より`,
          text: `名前: ${name}\nメールアドレス: ${email}\n\nメッセージ:\n${message}`
        });

        res.status(200).send({ success: true });
        return resolve();
      } catch (error) {
        console.error('Mail error:', error);
        res.status(500).send({ error: 'メール送信に失敗しました' });
        return resolve();
      }
    });
  });
});