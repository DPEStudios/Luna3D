import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_123');

export async function POST(request: Request) {
  try {
    const { nombre, correo, mensaje } = await request.json();

    if (!nombre || !correo || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    // Nota: "onboarding@resend.dev" es solo para pruebas. 
    // En producción debe ser un correo verificado en tu dominio.
    const { data, error } = await resend.emails.send({
      from: 'LUNA 3D Contacto <onboarding@resend.dev>',
      to: ['contacto@luna3d.cl'], // O el correo que reciba los mensajes en desarrollo
      subject: `Nuevo mensaje de ${nombre}`,
      text: `Nombre: ${nombre}\nEmail: ${correo}\nMensaje:\n${mensaje}`,
    });

    if (error) {
      console.error('Error de Resend:', error);
      return NextResponse.json({ error: 'Error del proveedor de correo' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Catch error enviando email:', error);
    return NextResponse.json({ error: 'Hubo un error interno al conectar con el servidor' }, { status: 500 });
  }
}
