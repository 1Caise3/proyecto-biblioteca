const CLAVE_ALMACENAMIENTO = 'ciberseguridad_guias';

const GUIAS_BASE = [
  {
    id: 1,
    titulo: 'Usar contraseñas largas y únicas',
    categoria: 'contraseñas',
    nivel: 'básico',
    resumen: 'Una contraseña larga y diferente para cada cuenta reduce el daño si una se filtra.',
    contenido: 'Usa frases de al menos 14 caracteres que combinen palabras, números y símbolos. Nunca repitas la misma contraseña en dos servicios y evita datos personales como fechas de nacimiento o nombres de mascotas.',
    etiquetas: ['contraseñas', 'cuentas', 'higiene digital'],
    fecha: '2026-10-01T09:00:00.000Z',
    leida: true,
    favorita: false
  },
  {
    id: 2,
    titulo: 'Activar la verificación en dos pasos (MFA)',
    categoria: 'contraseñas',
    nivel: 'intermedio',
    resumen: 'El segundo factor protege tu cuenta incluso cuando la contraseña ya fue robada.',
    contenido: 'Activa MFA en el correo, la banca y las redes sociales. Prefiere aplicaciones de autenticación o llaves físicas antes que mensajes SMS, porque los SMS pueden ser interceptados con ataques de intercambio de SIM.',
    etiquetas: ['mfa', 'autenticación', 'cuentas'],
    fecha: '2026-10-03T09:00:00.000Z',
    leida: true,
    favorita: true
  },
  {
    id: 3,
    titulo: 'Reconocer correos de phishing',
    categoria: 'correo',
    nivel: 'básico',
    resumen: 'Aprende a detectar señales de suplantación antes de hacer clic en un enlace.',
    contenido: 'Revisa el remitente real, desconfía de mensajes con urgencia o amenazas y pasa el cursor sobre los enlaces para ver el destino. Si dudas, entra al sitio escribiendo la dirección tú mismo y no abras adjuntos inesperados.',
    etiquetas: ['phishing', 'correo', 'ingeniería social'],
    fecha: '2026-10-05T09:00:00.000Z',
    leida: false,
    favorita: true
  },
  {
    id: 4,
    titulo: 'Configurar SPF, DKIM y DMARC',
    categoria: 'correo',
    nivel: 'avanzado',
    resumen: 'Estos registros DNS ayudan a evitar que suplanten el dominio de tu organización.',
    contenido: 'SPF indica qué servidores pueden enviar correo por tu dominio, DKIM firma los mensajes y DMARC define qué hacer cuando fallan las verificaciones. Empieza con una política de monitoreo y luego endurécela de forma gradual.',
    etiquetas: ['dns', 'spf', 'dkim', 'dmarc'],
    fecha: '2026-10-08T09:00:00.000Z',
    leida: false,
    favorita: false
  },
  {
    id: 5,
    titulo: 'Evitar redes Wi-Fi públicas sin protección',
    categoria: 'redes',
    nivel: 'básico',
    resumen: 'Las redes abiertas permiten que otras personas observen o alteren tu tráfico.',
    contenido: 'Evita iniciar sesión en servicios sensibles desde una red pública. Si es necesario conectarte, usa una VPN confiable, verifica el nombre exacto de la red con el local y desactiva la conexión automática a redes abiertas.',
    etiquetas: ['wifi', 'vpn', 'redes públicas'],
    fecha: '2026-10-10T09:00:00.000Z',
    leida: true,
    favorita: false
  },
  {
    id: 6,
    titulo: 'Segmentar la red con VLAN',
    categoria: 'redes',
    nivel: 'avanzado',
    resumen: 'Separar dispositivos por función limita hasta dónde puede llegar un atacante.',
    contenido: 'Crea VLAN distintas para servidores, equipos de usuarios, invitados y dispositivos IoT. Aplica reglas de firewall entre segmentos y permite solo el tráfico estrictamente necesario entre ellos.',
    etiquetas: ['vlan', 'firewall', 'segmentación'],
    fecha: '2026-10-13T09:00:00.000Z',
    leida: false,
    favorita: false
  },
  {
    id: 7,
    titulo: 'Mantener el sistema y las aplicaciones actualizados',
    categoria: 'dispositivos',
    nivel: 'básico',
    resumen: 'Las actualizaciones corrigen vulnerabilidades que ya son conocidas por los atacantes.',
    contenido: 'Activa las actualizaciones automáticas del sistema operativo, del navegador y de las aplicaciones. Retira los programas que ya no tienen soporte y reinicia el equipo cuando el sistema lo solicite.',
    etiquetas: ['parches', 'actualizaciones', 'sistema operativo'],
    fecha: '2026-10-16T09:00:00.000Z',
    leida: true,
    favorita: false
  },
  {
    id: 8,
    titulo: 'Cifrar el disco de laptops y celulares',
    categoria: 'dispositivos',
    nivel: 'intermedio',
    resumen: 'Si pierdes el equipo, el cifrado evita que otra persona lea tus archivos.',
    contenido: 'Activa BitLocker en Windows, FileVault en macOS o el cifrado de almacenamiento en Android y iOS. Guarda la clave de recuperación en un lugar seguro y distinto al dispositivo.',
    etiquetas: ['cifrado', 'bitlocker', 'robo'],
    fecha: '2026-10-19T09:00:00.000Z',
    leida: false,
    favorita: false
  },
  {
    id: 9,
    titulo: 'Validar y sanear todas las entradas del usuario',
    categoria: 'desarrollo seguro',
    nivel: 'intermedio',
    resumen: 'Nunca confíes en los datos que llegan desde formularios, URLs o APIs.',
    contenido: 'Valida tipo, longitud y formato en el servidor. Usa consultas parametrizadas contra inyección SQL y escapa la salida para prevenir XSS. En el navegador, muestra los datos como texto plano y nunca como código HTML.',
    etiquetas: ['xss', 'sql injection', 'validación'],
    fecha: '2026-10-22T09:00:00.000Z',
    leida: false,
    favorita: true
  },
  {
    id: 10,
    titulo: 'Compartir solo los datos personales necesarios',
    categoria: 'privacidad',
    nivel: 'básico',
    resumen: 'Cuantos menos datos entregues, menor es el impacto de una filtración.',
    contenido: 'Revisa los permisos de tus aplicaciones y la configuración de privacidad de tus redes sociales. Evita publicar tu ubicación en tiempo real, documentos de identidad o información que sirva para adivinar tus preguntas de seguridad.',
    etiquetas: ['privacidad', 'datos personales', 'redes sociales'],
    fecha: '2026-10-25T09:00:00.000Z',
    leida: false,
    favorita: false
  }
];

function copiarGuiasBase() {
  return JSON.parse(JSON.stringify(GUIAS_BASE));
}

function guardarGuias(guias) {
  localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(guias));
}

function obtenerGuias() {
  try {
    const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO);
    if (guardado) {
      const guias = JSON.parse(guardado);
      if (Array.isArray(guias)) {
        return guias;
      }
    }
  } catch (error) {
    console.error('No se pudieron leer las guías guardadas:', error);
  }
  const guiasBase = copiarGuiasBase();
  guardarGuias(guiasBase);
  return guiasBase;
}

function eliminarGuiaPorId(id) {
  const guiasActualizadas = obtenerGuias().filter((guia) => guia.id !== id);
  guardarGuias(guiasActualizadas);
  return guiasActualizadas;
}

function restaurarDatosEjemplo() {
  guardarGuias(copiarGuiasBase());
}

function exportarAJSON() {
  const guias = obtenerGuias();
  const contenido = JSON.stringify(guias, null, 2);
  const blob = new Blob([contenido], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = 'guias-ciberseguridad.json';
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
  URL.revokeObjectURL(url);
}