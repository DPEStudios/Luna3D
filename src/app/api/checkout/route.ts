import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Aquí (en el futuro) se integraría MercadoPago, Flow, o guardar en Base de Datos.
    // Por ahora, solo simularemos que se recibió correctamente.
    console.log("=== NUEVO PEDIDO RECIBIDO ===");
    console.log(JSON.stringify(body, null, 2));
    console.log("==============================");

    // Mock delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true, 
      message: 'Pedido procesado temporalmente. (Pendiente redirección pasarela)' 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
