const CLAVE_ALMACENAMIENTO = 'ciberseguridad_guias';

const GUIAS_BASE = [
  {
    id: 1,
    titulo: 'Usar contraseñas largas y únicas',
    categoria: 'contraseñas',
    nivel: 'básico',
    resumen: 'Una contraseña larga y diferente para cada cuenta reduce el daño si una se filtra.',
    pasos: [
      'Elige una frase de al menos 14 caracteres que combine palabras, números y símbolos.',
      'Usa una contraseña distinta para cada cuenta o servicio.',
      'Evita datos personales como fechas de nacimiento o nombres de mascotas.',
      'Cámbiala solo cuando sospeches que fue filtrada.'
    ],
    fuente: 'https://pages.nist.gov/800-63-3/sp800-63b.html',
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
    pasos: [
      'Activa MFA primero en tu correo, tu banca y tus redes sociales.',
      'Prefiere una aplicación de autenticación o una llave física antes que mensajes SMS.',
      'Guarda los códigos de respaldo en un lugar seguro y fuera del celular.',
      'Revisa de vez en cuando qué dispositivos tienen sesión iniciada.'
    ],
    fuente: 'https://www.cisa.gov/mfa',
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
    pasos: [
      'Revisa el remitente real y no solo el nombre que aparece.',
      'Desconfía de mensajes con urgencia, premios o amenazas.',
      'Pasa el cursor sobre los enlaces para ver a dónde llevan.',
      'Si dudas, entra al sitio escribiendo tú mismo la dirección.',
      'No abras adjuntos que no esperabas y reporta el mensaje.'
    ],
    fuente: 'https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks',
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
    pasos: [
      'Publica un registro SPF con los servidores que pueden enviar correo por tu dominio.',
      'Activa la firma DKIM en tu servicio de correo.',
      'Publica un registro DMARC con política de monitoreo (p=none).',
      'Revisa los reportes durante unas semanas para detectar envíos legítimos que fallan.',
      'Endurece la política de forma gradual: quarantine y luego reject.'
    ],
    fuente: 'https://dmarc.org/overview/',
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
    pasos: [
      'Evita iniciar sesión en servicios sensibles desde una red pública.',
      'Verifica con el local el nombre exacto de la red antes de conectarte.',
      'Si es necesario, usa una VPN confiable.',
      'Desactiva la conexión automática a redes abiertas.'
    ],
    fuente: 'https://consumer.ftc.gov/articles/how-safely-use-public-wi-fi-networks',
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
    pasos: [
      'Identifica los grupos de dispositivos: servidores, usuarios, invitados e IoT.',
      'Crea una VLAN distinta para cada grupo.',
      'Aplica reglas de firewall entre las VLAN.',
      'Permite solo el tráfico estrictamente necesario entre segmentos.',
      'Revisa las reglas cada cierto tiempo y elimina las que ya no se usan.'
    ],
    fuente: 'https://csrc.nist.gov/pubs/sp/800/41/r1/final',
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
    pasos: [
      'Activa las actualizaciones automáticas del sistema operativo.',
      'Haz lo mismo con el navegador y las aplicaciones que más usas.',
      'Desinstala los programas que ya no tienen soporte.',
      'Reinicia el equipo cuando el sistema lo solicite.'
    ],
    fuente: 'https://www.cisa.gov/secure-our-world/update-software',
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
    pasos: [
      'Activa BitLocker en Windows, FileVault en macOS o el cifrado de Android y iOS.',
      'Guarda la clave de recuperación en un lugar seguro y distinto al dispositivo.',
      'Usa un bloqueo de pantalla con contraseña o PIN.',
      'Comprueba en la configuración que el cifrado quedó activo.'
    ],
    fuente: 'https://learn.microsoft.com/en-us/windows/security/operating-system-security/data-protection/bitlocker/',
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
    pasos: [
      'Valida tipo, longitud y formato de cada dato en el servidor.',
      'Usa consultas parametrizadas contra la inyección SQL.',
      'Escapa la salida para prevenir XSS.',
      'En el navegador, muestra los datos con textContent y no como código HTML.'
    ],
    fuente: 'https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html',
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
    pasos: [
      'Revisa los permisos que tienen tus aplicaciones y quita los que no necesitan.',
      'Configura la privacidad de tus redes sociales.',
      'Evita publicar tu ubicación en tiempo real.',
      'No publiques documentos de identidad ni datos que sirvan para adivinar tus preguntas de seguridad.'
    ],
    fuente: 'https://consumer.ftc.gov/identity-theft-and-online-security/online-privacy-and-security',
    etiquetas: ['privacidad', 'datos personales', 'redes sociales'],
    fecha: '2026-10-25T09:00:00.000Z',
    leida: false,
    favorita: false
  },
  {
    id: 11,
    titulo: 'Usar un gestor de contraseñas',
    categoria: 'contraseñas',
    nivel: 'intermedio',
    resumen: 'Un gestor genera y guarda contraseñas únicas para que no tengas que memorizarlas.',
    pasos: [
      'Elige un gestor de contraseñas confiable y con buena reputación.',
      'Crea una contraseña maestra larga que no uses en ningún otro sitio.',
      'Deja que el gestor genere contraseñas aleatorias para cada cuenta.',
      'Activa MFA en el propio gestor.'
    ],
    fuente: 'https://www.cisa.gov/secure-our-world/use-strong-passwords',
    etiquetas: ['gestor', 'contraseñas', 'cuentas'],
    fecha: '2026-10-27T09:00:00.000Z',
    leida: false,
    favorita: false
  },
  {
    id: 12,
    titulo: 'Revisar si tus cuentas aparecen en filtraciones',
    categoria: 'contraseñas',
    nivel: 'básico',
    resumen: 'Saber si tu correo apareció en una filtración te permite cambiar a tiempo tus contraseñas.',
    pasos: [
      'Consulta tu correo en un servicio de verificación de filtraciones, como Have I Been Pwned.',
      'Nunca escribas tu contraseña completa en un sitio que no conoces.',
      'Cambia la contraseña de las cuentas que aparezcan afectadas.',
      'No reutilices esa contraseña en ninguna otra cuenta.'
    ],
    fuente: 'https://haveibeenpwned.com/',
    etiquetas: ['filtraciones', 'contraseñas', 'cuentas'],
    fecha: '2026-10-29T09:00:00.000Z',
    leida: false,
    favorita: false
  }
];

function copiarGuiasBase() {
  return JSON.parse(JSON.stringify(GUIAS_BASE));
}

function guardarGuias(guias) {
  try {
    localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(guias));
    return true;
  } catch (error) {
    console.error('No se pudieron guardar las guías:', error);
    return false;
  }
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

function obtenerGuiaPorId(id) {
  return obtenerGuias().find((guia) => guia.id === id) || null;
}

function actualizarGuia(id, cambios) {
  const guias = obtenerGuias();
  const guia = guias.find((item) => item.id === id);
  if (!guia) {
    return false;
  }
  Object.assign(guia, cambios);
  return guardarGuias(guias);
}

function eliminarGuiaPorId(id) {
  const guiasActualizadas = obtenerGuias().filter((guia) => guia.id !== id);
  guardarGuias(guiasActualizadas);
  return guiasActualizadas;
}

function agregarDatosEjemplo() {
  const actuales = obtenerGuias();
  let agregadas = 0;

  copiarGuiasBase().forEach((base) => {
    const existente = actuales.find((guia) => guia.id === base.id);
    if (!existente) {
      actuales.push(base);
      agregadas++;
    } else if (!Array.isArray(existente.pasos)) {
      existente.titulo = base.titulo;
      existente.categoria = base.categoria;
      existente.nivel = base.nivel;
      existente.resumen = base.resumen;
      existente.pasos = base.pasos;
      existente.fuente = base.fuente;
      existente.etiquetas = base.etiquetas;
      existente.fecha = base.fecha;
      delete existente.contenido;
    }
  });

  guardarGuias(actuales);
  return agregadas;
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