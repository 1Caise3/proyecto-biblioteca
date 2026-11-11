const CLAVE_ALMACENAMIENTO = 'ciberseguridad_guias';

const CLAVE_RUTA = 'biblioteca_ruta_estudio';

const CLAVE_IMAGEN_MODAL = 'biblioteca_ocultar_imagen';

const GUIAS_BASE = [
  {
    id: 1,
    titulo: 'Contraseñas largas y que no se repitan',
    categoria: 'contraseñas',
    nivel: 'básico',
    resumen: 'Usa frases largas como clave para que no te jakeen el correo de la u y sea fácil acordarte en el examen. Y nunca uses la misma clave en todas tus cuentas.',
    fecha: '2026-10-01T09:00:00.000Z',
    leida: true,
    favorita: false
  },
  {
    id: 2,
    titulo: 'Activa el doble paso (aunque te dé flojera)',
    categoria: 'contraseñas',
    nivel: 'intermedio',
    resumen: 'Con el doble paso, aunque te roben la clave igual no pueden entrar porque les falta el código de tu celular. Actívalo primero en tu correo.',
    fecha: '2026-10-03T09:00:00.000Z',
    leida: true,
    favorita: true
  },
  {
    id: 3,
    titulo: 'Tips rápidos para que no te jakeen la cuenta de la universidad',
    categoria: 'correo',
    nivel: 'básico',
    resumen: 'Si un correo te mete apuro o te amenaza con cerrarte la cuenta, casi seguro es phishing. Antes de hacer clic, pasa el mouse por el enlace y mira a dónde va.',
    fecha: '2026-10-05T09:00:00.000Z',
    leida: false,
    favorita: true
  },
  {
    id: 4,
    titulo: 'SPF, DKIM y DMARC explicados fácil',
    categoria: 'correo',
    nivel: 'avanzado',
    resumen: 'Son tres configuraciones para que nadie mande correos haciéndose pasar por tu dominio. SPF es la lista de quién puede enviar, DKIM es la firma y DMARC dice qué hacer si algo falla.',
    fecha: '2026-10-08T09:00:00.000Z',
    leida: false,
    favorita: false
  },
  {
    id: 5,
    titulo: 'Cuidado con el Wi-Fi gratis de la cafetería',
    categoria: 'redes',
    nivel: 'básico',
    resumen: 'Una red abierta es como hablar en voz alta en un salón lleno: cualquiera puede escuchar. Si tienes que usarla, conéctate con VPN y no entres al banco.',
    fecha: '2026-10-10T09:00:00.000Z',
    leida: true,
    favorita: false
  },
  {
    id: 6,
    titulo: 'Separar la red con VLAN',
    categoria: 'redes',
    nivel: 'avanzado',
    resumen: 'Es como tener cada curso en un salón con su propia puerta: si entran a uno, no llegan a todos los demás. Se separan servidores, usuarios e invitados.',
    fecha: '2026-10-13T09:00:00.000Z',
    leida: false,
    favorita: false
  },
  {
    id: 7,
    titulo: 'Actualiza tu compu y tu cel, no lo dejes para mañana',
    categoria: 'dispositivos',
    nivel: 'básico',
    resumen: 'Cada actualización tapa huecos de seguridad que los hackers ya conocen. Deja activadas las automáticas y reinicia cuando te lo pida.',
    fecha: '2026-10-16T09:00:00.000Z',
    leida: true,
    favorita: false
  },
  {
    id: 8,
    titulo: 'Cifra el disco por si pierdes tu laptop',
    categoria: 'dispositivos',
    nivel: 'intermedio',
    resumen: 'Si te roban la laptop, con el disco cifrado no pueden leer tus archivos. Guarda la clave de recuperación en otro lado o te quedas sin acceso tú también.',
    fecha: '2026-10-19T09:00:00.000Z',
    leida: false,
    favorita: false
  },
  {
    id: 9,
    titulo: 'Nunca confíes en lo que escribe el usuario',
    categoria: 'desarrollo seguro',
    nivel: 'intermedio',
    resumen: 'Todo lo que llega de un formulario hay que revisarlo antes de usarlo. Esto sale en el parcial seguro: es lo que evita la inyección SQL y el XSS.',
    fecha: '2026-10-22T09:00:00.000Z',
    leida: false,
    favorita: true
  },
  {
    id: 10,
    titulo: 'No regales tus datos personales',
    categoria: 'privacidad',
    nivel: 'básico',
    resumen: 'Mientras menos datos publiques, menos cosas pueden usar en tu contra. Revisa los permisos de tus apps: ¿por qué una linterna pide tu ubicación?',
    fecha: '2026-10-25T09:00:00.000Z',
    leida: false,
    favorita: false
  }
];

const RUTA_BASE = [
  {
    id: 1,
    semana: 'Semana 1',
    tema: 'Redes básicas',
    descripcion: 'Repasar qué es una red, el Wi-Fi público y para qué sirve una VPN.',
    completado: false
  },
  {
    id: 2,
    semana: 'Semana 2',
    tema: 'Contraseñas seguras',
    descripcion: 'Frases largas, gestor de contraseñas y no repetir claves.',
    completado: false
  },
  {
    id: 3,
    semana: 'Semana 3',
    tema: 'Evitar el phishing',
    descripcion: 'Aprender a reconocer correos falsos y revisar los enlaces antes de abrirlos.',
    completado: false
  },
  {
    id: 4,
    semana: 'Semana 4',
    tema: 'Seguridad en mis dispositivos',
    descripcion: 'Actualizaciones, cifrado del disco y bloqueo de pantalla.',
    completado: false
  },
  {
    id: 5,
    semana: 'Semana 5',
    tema: 'Programación segura',
    descripcion: 'Validar entradas del usuario y entender la inyección SQL y el XSS.',
    completado: false
  },
  {
    id: 6,
    semana: 'Semana 6',
    tema: 'Repaso final para el parcial',
    descripcion: 'Releer mis apuntes favoritos y hacer un simulacro con mis compañeros.',
    completado: false
  }
];