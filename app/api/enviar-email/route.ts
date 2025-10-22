import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Armazena temporariamente os IPs que enviaram e-mails recentemente
const ultimosEnvios = new Map<string, number>();

export async function POST(req: Request) {
  try {
    const { nome, email, mensagem } = await req.json();

    if (!nome || !email || !mensagem) {
      return NextResponse.json(
        { sucesso: false, erro: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] || "ip_desconhecido";

    // Verifica se esse IP enviou há menos de 30 segundos
    const agora = Date.now();
    const ultimoEnvio = ultimosEnvios.get(ip);
    if (ultimoEnvio && agora - ultimoEnvio < 30 * 1000) {
      const tempoRestante = Math.ceil((30 * 1000 - (agora - ultimoEnvio)) / 1000);
      return NextResponse.json(
        {
          sucesso: false,
          erro: `Aguarde ${tempoRestante}s antes de enviar outro e-mail.`,
        },
        { status: 429 } // Too Many Requests
      );
    }
    ultimosEnvios.set(ip, agora);

    // Configura o transporte
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Formulário do Portfólio" <${process.env.EMAIL_USER}>`,
      to: process.env.MEU_EMAIL_DESTINO || process.env.EMAIL_USER,
      subject: `Nova mensagem de ${nome}`,
      html: `
        <h2>Nova mensagem recebida pelo portfólio 💬</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>E-mail do remetente:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem}</p>
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      sucesso: true,
      mensagem: "E-mail enviado com sucesso! 🚀",
    });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json(
      { sucesso: false, erro: "Falha ao enviar e-mail." },
      { status: 500 }
    );
  }
}
