const ORDEN_NIVEL = { 'básico': 1, 'intermedio': 2, 'avanzado': 3 };
const CLASE_NIVEL = {
  'básico': 'badge--basico',
  'intermedio': 'badge--intermedio',
  'avanzado': 'badge--avanzado'
};

function escribirEnAlmacenamiento(clave, lista) {
  try {
    localStorage.setItem(clave, JSON.stringify(lista));
  } catch (error) {
    console.error('No se pudo guardar en el navegador:', error);
  }
}

function leerDeAlmacenamiento(clave, datosBase) {
  try {
    const guardado = localStorage.getItem(clave);
    if (guardado !== null) {
      const lista = JSON.parse(guardado);

      if (Array.isArray(lista)) {
        return lista;
      }
    }
  } catch (error) {
    console.error('No se pudo leer lo guardado:', error);
  }
  const copia = JSON.parse(JSON.stringify(datosBase));
  escribirEnAlmacenamiento(clave, copia);
  return copia;
}

function obtenerGuias() {
  return leerDeAlmacenamiento(CLAVE_ALMACENAMIENTO, GUIAS_BASE);
}

function guardarGuias(guias) {
  escribirEnAlmacenamiento(CLAVE_ALMACENAMIENTO, guias);
}

function agregarGuia(guiaNueva) {
  const guias = obtenerGuias();
  guias.push(guiaNueva);
  guardarGuias(guias);
}

function eliminarGuiaPorId(id) {
  const guiasActualizadas = obtenerGuias().filter((guia) => guia.id !== id);
  guardarGuias(guiasActualizadas);
  return guiasActualizadas;
}

function cambiarEstadoGuia(id, campo) {
  const guias = obtenerGuias();
  const guia = guias.find((item) => item.id === id);
  if (guia) {
    guia[campo] = !guia[campo];
    guardarGuias(guias);
  }
}

function restaurarDatosEjemplo() {
  guardarGuias(JSON.parse(JSON.stringify(GUIAS_BASE)));
}

function exportarAJSON() {
  const contenido = JSON.stringify(obtenerGuias(), null, 2);
  const blob = new Blob([contenido], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = 'mis-apuntes-ciberseguridad.json';
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
  URL.revokeObjectURL(url);
}

function obtenerRuta() {
  return leerDeAlmacenamiento(CLAVE_RUTA, RUTA_BASE);
}

function guardarRuta(ruta) {
  escribirEnAlmacenamiento(CLAVE_RUTA, ruta);
}

function cambiarEstadoTema(id) {
  const ruta = obtenerRuta();
  const tema = ruta.find((item) => item.id === id);
  if (tema) {
    tema.completado = !tema.completado;
    guardarRuta(ruta);
  }
}

function reiniciarRuta() {
  guardarRuta(JSON.parse(JSON.stringify(RUTA_BASE)));
}

function crearElemento(etiqueta, clase, texto) {
  const elemento = document.createElement(etiqueta);
  if (clase) {
    elemento.className = clase;
  }
  if (texto !== undefined) {
    elemento.textContent = texto;
  }
  return elemento;
}

function crearBoton(texto, clase, alHacerClic) {
  const boton = crearElemento('button', 'boton ' + clase, texto);
  boton.type = 'button';
  boton.addEventListener('click', alHacerClic);
  return boton;
}

function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  if (Number.isNaN(fecha.getTime())) {
    return '';
  }
  return fecha.toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' });
}

let temporizadorAviso = null;
function mostrarAviso(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = 'aviso aviso--' + tipo;
  elemento.hidden = false;
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => {
    elemento.hidden = true;
  }, 4000);
}

function iniciarMenu() {
  const btnMenu = document.getElementById('btnMenu');
  const menu = document.getElementById('menuPrincipal');
  if (!btnMenu || !menu) {
    return;
  }
  btnMenu.addEventListener('click', () => {
    const abierto = menu.classList.toggle('desplegado');
    btnMenu.setAttribute('aria-expanded', String(abierto));
  });
}

function iniciarIndex() {
  const contenedor = document.getElementById('contenedorCards');
  if (!contenedor) {
    return;
  }

  const mensajeVacio = document.getElementById('mensajeVacio');
  const textoVacio = document.getElementById('textoVacio');
  const avisoGlobal = document.getElementById('avisoGlobal');
  const inputBusqueda = document.getElementById('inputBusqueda');
  const selectCategoria = document.getElementById('selectCategoria');
  const selectNivel = document.getElementById('selectNivel');
  const selectOrden = document.getElementById('selectOrden');

  const modal = document.getElementById('modalEliminar');
  const modalNombre = document.getElementById('modalNombre');
  const modalImagen = document.getElementById('modalImagen');
  const btnAlternarImagen = document.getElementById('btnAlternarImagen');
  const btnConfirmarBorrar = document.getElementById('btnConfirmarBorrar');
  const btnCancelarBorrar = document.getElementById('btnCancelarBorrar');

  let idPendiente = null;

  let botonOrigen = null;

  function actualizarContadores(guias) {
    document.getElementById('statTotal').textContent = guias.length;
    document.getElementById('statLeidas').textContent = guias.filter((g) => g.leida).length;
    document.getElementById('statFavoritas').textContent = guias.filter((g) => g.favorita).length;
  }

  function filtrarGuias(guias) {
    const texto = inputBusqueda.value.trim().toLowerCase();
    const categoria = selectCategoria.value;
    const nivel = selectNivel.value;

    return guias.filter((guia) => {
      const todoElTexto = (guia.titulo + ' ' + guia.resumen + ' ' + guia.categoria).toLowerCase();
      const coincideTexto = texto === '' || todoElTexto.includes(texto);
      const coincideCategoria = categoria === 'todas' || guia.categoria === categoria;
      const coincideNivel = nivel === 'todos' || guia.nivel === nivel;
      return coincideTexto && coincideCategoria && coincideNivel;
    });
  }

  function ordenarGuias(guias) {
    const copia = [...guias];
    if (selectOrden.value === 'nivel') {
      copia.sort((a, b) => ORDEN_NIVEL[a.nivel] - ORDEN_NIVEL[b.nivel]);
    } else {
      copia.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    }
    return copia;
  }

  function crearTarjeta(guia) {
    const tarjeta = crearElemento('article', 'tarjeta');

    const badge = crearElemento('span', 'badge ' + (CLASE_NIVEL[guia.nivel] || ''), guia.nivel);
    const titulo = crearElemento('h3', 'tarjeta__titulo', guia.titulo);
    const categoria = crearElemento('p', 'tarjeta__categoria', guia.categoria);
    const resumen = crearElemento('p', 'tarjeta__resumen', guia.resumen);
    const fecha = crearElemento('p', 'tarjeta__fecha', 'Guardado el ' + formatearFecha(guia.fecha));

    const acciones = crearElemento('div', 'tarjeta__acciones');

    const btnLeida = crearBoton('✓ Leída', 'boton--secundario', () => {
      cambiarEstadoGuia(guia.id, 'leida');
      mostrarVista();
    });
    btnLeida.setAttribute('aria-pressed', String(guia.leida));

    const btnFavorita = crearBoton('★ Favorita', 'boton--secundario', () => {
      cambiarEstadoGuia(guia.id, 'favorita');
      mostrarVista();
    });
    btnFavorita.setAttribute('aria-pressed', String(guia.favorita));

    const btnEliminar = crearBoton('🗑 Eliminar', 'boton--peligro', () => {
      abrirModalEliminar(guia, btnEliminar);
    });
    btnEliminar.setAttribute('aria-label', 'Eliminar el apunte ' + guia.titulo);

    acciones.append(btnLeida, btnFavorita, btnEliminar);
    tarjeta.append(badge, titulo, categoria, resumen, fecha, acciones);
    return tarjeta;
  }

  function mostrarVista() {
    const todas = obtenerGuias();
    const resultado = ordenarGuias(filtrarGuias(todas));

    actualizarContadores(todas);

    contenedor.replaceChildren();
    resultado.forEach((guia) => {
      contenedor.appendChild(crearTarjeta(guia));
    });

    if (resultado.length === 0) {
      textoVacio.textContent = todas.length === 0
        ? 'Tu biblioteca está vacía. Carga los 10 apuntes de ejemplo o agrega uno nuevo.'
        : 'No encontré apuntes con esos filtros. Prueba cambiando la búsqueda.';
    }
    mensajeVacio.hidden = resultado.length > 0;
  }

  function imagenOculta() {
    try {
      return localStorage.getItem(CLAVE_IMAGEN_MODAL) === 'si';
    } catch (error) {
      return false;
    }
  }

  function aplicarImagen(ocultar) {
    modalImagen.hidden = ocultar;
    btnAlternarImagen.textContent = ocultar ? 'Mostrar imagen' : 'Ocultar imagen';
    btnAlternarImagen.setAttribute('aria-pressed', String(ocultar));
  }

  function abrirModalEliminar(guia, boton) {
    idPendiente = guia.id;
    botonOrigen = boton;
    modalNombre.textContent = '"' + guia.titulo + '"';
    aplicarImagen(imagenOculta());
    modal.classList.add('abierto');
    modal.setAttribute('aria-hidden', 'false');

    btnCancelarBorrar.focus();
  }

  function cerrarModalEliminar() {
    modal.classList.remove('abierto');
    modal.setAttribute('aria-hidden', 'true');
    idPendiente = null;
    if (botonOrigen && document.body.contains(botonOrigen)) {
      botonOrigen.focus();
    }
    botonOrigen = null;
  }

  function confirmarEliminacion() {
    if (idPendiente === null) {
      return;
    }
    eliminarGuiaPorId(idPendiente);
    botonOrigen = null;
    cerrarModalEliminar();
    mostrarVista();
    mostrarAviso(avisoGlobal, 'Listo, el apunte se borró de tu biblioteca.', 'exito');
  }

  function iniciarModal() {
    btnConfirmarBorrar.addEventListener('click', confirmarEliminacion);
    btnCancelarBorrar.addEventListener('click', cerrarModalEliminar);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        cerrarModalEliminar();
      }
    });

    btnAlternarImagen.addEventListener('click', () => {
      const ocultar = !modalImagen.hidden;
      aplicarImagen(ocultar);
      try {
        localStorage.setItem(CLAVE_IMAGEN_MODAL, ocultar ? 'si' : 'no');
      } catch (error) {
        console.error('No se pudo guardar la preferencia:', error);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('abierto')) {
        return;
      }
      if (e.key === 'Escape') {
        cerrarModalEliminar();
        return;
      }
      if (e.key === 'Tab') {
        const botones = Array.from(modal.querySelectorAll('button')).filter((b) => b.offsetParent !== null);
        const primero = botones[0];
        const ultimo = botones[botones.length - 1];
        if (e.shiftKey && document.activeElement === primero) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primero.focus();
        }
      }
    });
  }

  document.getElementById('formFiltros').addEventListener('submit', (e) => e.preventDefault());

  inputBusqueda.addEventListener('input', mostrarVista);
  selectCategoria.addEventListener('change', mostrarVista);
  selectNivel.addEventListener('change', mostrarVista);
  selectOrden.addEventListener('change', mostrarVista);

  document.getElementById('btnCargarEjemplos').addEventListener('click', () => {
    restaurarDatosEjemplo();
    mostrarVista();
    mostrarAviso(avisoGlobal, 'Se cargaron los 10 apuntes de ejemplo.', 'exito');
  });

  document.getElementById('btnExportar').addEventListener('click', exportarAJSON);

  iniciarModal();
  mostrarVista();
}

function iniciarAgregar() {
  const formulario = document.getElementById('formAgregar');
  if (!formulario) {
    return;
  }

  const mensaje = document.getElementById('mensajeFormulario');

  function mostrarMensajeForm(texto, tipo, conEnlace) {
    mensaje.replaceChildren();
    mensaje.appendChild(crearElemento('span', '', texto));
    if (conEnlace) {
      const enlace = crearElemento('a', 'aviso__enlace', 'Ver mis apuntes');
      enlace.href = 'index.html';
      mensaje.appendChild(enlace);
    }
    mensaje.className = 'aviso aviso--' + tipo;
    mensaje.hidden = false;
  }

  formulario.addEventListener('submit', (e) => {

    e.preventDefault();

    const titulo = formulario.elements['titulo'].value.trim();
    const categoria = formulario.elements['categoria'].value.trim();
    const resumen = formulario.elements['resumen'].value.trim();
    const nivel = formulario.elements['nivel'].value.trim();

    const faltantes = [];
    if (titulo === '') faltantes.push('título del tema');
    if (categoria === '') faltantes.push('categoría');
    if (resumen === '') faltantes.push('resumen');
    if (nivel === '') faltantes.push('nivel de dificultad');

    if (faltantes.length > 0) {
      mostrarMensajeForm('Te falta completar: ' + faltantes.join(', ') + '.', 'error', false);
      return;
    }

    const nuevaGuia = {
      id: Date.now(),
      titulo: titulo,
      categoria: categoria,
      nivel: nivel,
      resumen: resumen,
      fecha: new Date().toISOString(),
      leida: false,
      favorita: false
    };

    agregarGuia(nuevaGuia);

    formulario.reset();
    mostrarMensajeForm('¡Listo! Tu apunte quedó guardado en la biblioteca.', 'exito', true);
  });
}

function iniciarMiRuta() {
  const lista = document.getElementById('listaRuta');
  if (!lista) {
    return;
  }

  const rellenoProgreso = document.getElementById('rellenoProgreso');
  const pistaProgreso = document.getElementById('pistaProgreso');
  const textoProgreso = document.getElementById('textoProgreso');
  const mensajeMotivacion = document.getElementById('mensajeMotivacion');
  const avisoRuta = document.getElementById('avisoRuta');

  function mensajePorPorcentaje(porcentaje) {
    if (porcentaje === 100) {
      return '¡Lo lograste! Ya repasaste todo, ahora a rendir ese parcial con confianza.';
    }
    if (porcentaje >= 50) {
      return 'Ya vas más de la mitad, no aflojes que se viene lo bueno.';
    }
    if (porcentaje > 0) {
      return 'Buen comienzo, un tema a la vez y llegas bien al examen.';
    }
    return 'Todo empieza con el primer paso: marca tu primer tema cuando lo termines.';
  }

  function actualizarProgreso(ruta) {
    const completados = ruta.filter((tema) => tema.completado).length;
    const porcentaje = ruta.length > 0 ? Math.round((completados / ruta.length) * 100) : 0;

    rellenoProgreso.style.width = porcentaje + '%';
    pistaProgreso.setAttribute('aria-valuenow', String(porcentaje));
    textoProgreso.textContent = completados + ' de ' + ruta.length + ' temas completados (' + porcentaje + '%)';
    mensajeMotivacion.textContent = mensajePorPorcentaje(porcentaje);
  }

  function crearPaso(tema) {
    const paso = crearElemento('li', 'paso ' + (tema.completado ? 'paso--completado' : 'paso--pendiente'));

    const semana = crearElemento('p', 'paso__semana', tema.semana);
    const titulo = crearElemento('h3', 'paso__titulo', tema.tema);
    const descripcion = crearElemento('p', 'paso__descripcion', tema.descripcion);

    const boton = crearBoton(
      tema.completado ? '✓ Completado' : 'Pendiente',
      tema.completado ? 'boton--primario' : 'boton--neutro',
      () => {
        cambiarEstadoTema(tema.id);
        mostrarRuta();
      }
    );
    boton.setAttribute('aria-pressed', String(tema.completado));
    boton.setAttribute('aria-label', tema.semana + ': ' + tema.tema + '. Marcar como ' + (tema.completado ? 'pendiente' : 'completado'));

    paso.append(semana, titulo, descripcion, boton);
    return paso;
  }

  function mostrarRuta() {
    const ruta = obtenerRuta();
    lista.replaceChildren();
    ruta.forEach((tema) => {
      lista.appendChild(crearPaso(tema));
    });
    actualizarProgreso(ruta);
  }

  document.getElementById('btnReiniciarRuta').addEventListener('click', () => {
    reiniciarRuta();
    mostrarRuta();
    mostrarAviso(avisoRuta, 'Reinicié tu ruta: todos los temas quedaron pendientes otra vez.', 'exito');
  });

  mostrarRuta();
}

document.addEventListener('DOMContentLoaded', () => {
  iniciarMenu();
  iniciarIndex();
  iniciarAgregar();
  iniciarMiRuta();
});