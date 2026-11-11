document.addEventListener('DOMContentLoaded', () => {
  const CATEGORIAS = ['contraseñas', 'correo', 'redes', 'dispositivos', 'desarrollo seguro', 'privacidad'];
  const ORDEN_NIVEL = { 'básico': 1, 'intermedio': 2, 'avanzado': 3 };
  const CLASE_NIVEL = {
    'básico': 'badge--basico',
    'intermedio': 'badge--intermedio',
    'avanzado': 'badge--avanzado'
  };
  const LIMITES = {
    tituloMin: 3,
    tituloMax: 80,
    resumenMin: 10,
    resumenMax: 200,
    pasosMin: 3,
    pasosMax: 8,
    pasoMin: 5,
    pasoMax: 200,
    etiquetasMax: 6,
    etiquetaMax: 20
  };

  function esEnlaceSeguro(texto) {
    if (typeof texto !== 'string') {
      return false;
    }
    const limpio = texto.trim();
    if (limpio === '' || /\s/.test(limpio)) {
      return false;
    }
    try {
      const url = new URL(limpio);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (error) {
      return false;
    }
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

  function cambiarEstado(id, campo) {
    const guias = obtenerGuias();
    const guia = guias.find((item) => item.id === id);
    if (guia) {
      guia[campo] = !guia[campo];
      guardarGuias(guias);
    }
  }

  function crearBoton(texto, activo, alHacerClic) {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'boton boton--secundario';
    boton.textContent = texto;
    boton.setAttribute('aria-pressed', String(activo));
    boton.addEventListener('click', alHacerClic);
    return boton;
  }

  function crearDetalle(guia) {
    const detalle = document.createElement('details');
    detalle.className = 'tarjeta__detalle';

    const sumario = document.createElement('summary');
    sumario.textContent = 'Ver pasos';
    detalle.appendChild(sumario);

    const pasos = Array.isArray(guia.pasos) ? guia.pasos : [];
    if (pasos.length > 0) {
      const lista = document.createElement('ol');
      lista.className = 'tarjeta__pasos';
      pasos.forEach((paso) => {
        const item = document.createElement('li');
        item.textContent = paso;
        lista.appendChild(item);
      });
      detalle.appendChild(lista);
    } else if (guia.contenido) {
      const texto = document.createElement('p');
      texto.textContent = guia.contenido;
      detalle.appendChild(texto);
    }

    if (guia.fuente) {
      const parrafo = document.createElement('p');
      parrafo.className = 'tarjeta__fuente';
      if (esEnlaceSeguro(guia.fuente)) {
        const enlace = document.createElement('a');
        enlace.href = new URL(guia.fuente.trim()).href;
        enlace.target = '_blank';
        enlace.rel = 'noopener noreferrer';
        enlace.textContent = 'Ver fuente';
        parrafo.appendChild(enlace);
      } else {
        parrafo.textContent = 'Fuente: ' + guia.fuente;
      }
      detalle.appendChild(parrafo);
    }

    return detalle;
  }

  function crearTarjeta(guia, alActualizar) {
    const tarjeta = document.createElement('article');
    tarjeta.className = 'tarjeta';

    const badge = document.createElement('span');
    badge.className = 'badge ' + (CLASE_NIVEL[guia.nivel] || '');
    badge.textContent = guia.nivel;

    const titulo = document.createElement('h3');
    titulo.className = 'tarjeta__titulo';
    titulo.textContent = guia.titulo;

    const categoria = document.createElement('p');
    categoria.className = 'tarjeta__categoria';
    categoria.textContent = guia.categoria;

    const resumen = document.createElement('p');
    resumen.className = 'tarjeta__resumen';
    resumen.textContent = guia.resumen;

    const detalle = crearDetalle(guia);

    const etiquetas = document.createElement('div');
    etiquetas.className = 'tarjeta__etiquetas';
    (guia.etiquetas || []).forEach((texto) => {
      const etiqueta = document.createElement('span');
      etiqueta.className = 'etiqueta';
      etiqueta.textContent = texto;
      etiquetas.appendChild(etiqueta);
    });

    const acciones = document.createElement('div');
    acciones.className = 'tarjeta__acciones';

    const btnLeida = crearBoton('✓ Leída', guia.leida, () => {
      cambiarEstado(guia.id, 'leida');
      alActualizar();
    });

    const btnFavorita = crearBoton('★ Favorita', guia.favorita, () => {
      cambiarEstado(guia.id, 'favorita');
      alActualizar();
    });

    const btnEditar = document.createElement('a');
    btnEditar.className = 'boton boton--secundario';
    btnEditar.href = 'agregar.html?editar=' + encodeURIComponent(guia.id);
    btnEditar.textContent = '✎ Editar';

    const btnEliminar = crearBoton('🗑 Eliminar', false, () => {
      const confirmado = confirm('¿Seguro que deseas eliminar la práctica "' + guia.titulo + '"?');
      if (confirmado) {
        eliminarGuiaPorId(guia.id);
        alActualizar();
      }
    });
    btnEliminar.classList.add('boton--peligro');
    btnEliminar.removeAttribute('aria-pressed');

    acciones.appendChild(btnLeida);
    acciones.appendChild(btnFavorita);
    acciones.appendChild(btnEditar);
    acciones.appendChild(btnEliminar);

    tarjeta.appendChild(badge);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(categoria);
    tarjeta.appendChild(resumen);
    tarjeta.appendChild(detalle);
    tarjeta.appendChild(etiquetas);
    tarjeta.appendChild(acciones);

    return tarjeta;
  }

  function dibujarTarjetas(contenedor, mensajeVacio, guias, alActualizar) {
    contenedor.replaceChildren();
    guias.forEach((guia) => {
      contenedor.appendChild(crearTarjeta(guia, alActualizar));
    });
    mensajeVacio.hidden = guias.length > 0;
  }

  function iniciarIndex() {
    const contenedor = document.getElementById('contenedorCards');
    if (!contenedor) {
      return;
    }

    const mensajeVacio = document.getElementById('mensajeVacio');
    const formFiltros = document.getElementById('formFiltros');
    const inputBusqueda = document.getElementById('inputBusqueda');
    const selectCategoria = document.getElementById('selectCategoria');
    const selectNivel = document.getElementById('selectNivel');
    const selectOrden = document.getElementById('selectOrden');
    const btnCargarEjemplos = document.getElementById('btnCargarEjemplos');
    const btnExportar = document.getElementById('btnExportar');

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
        const textoGuia = [
          guia.titulo,
          guia.resumen,
          guia.contenido || '',
          (guia.pasos || []).join(' '),
          (guia.etiquetas || []).join(' ')
        ]
          .join(' ')
          .toLowerCase();
        const coincideTexto = texto === '' || textoGuia.includes(texto);
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

    function mostrarVista() {
      const todas = obtenerGuias();
      const resultado = ordenarGuias(filtrarGuias(todas));
      actualizarContadores(todas);
      dibujarTarjetas(contenedor, mensajeVacio, resultado, mostrarVista);
    }

    formFiltros.addEventListener('submit', (e) => e.preventDefault());
    inputBusqueda.addEventListener('input', mostrarVista);
    selectCategoria.addEventListener('change', mostrarVista);
    selectNivel.addEventListener('change', mostrarVista);
    selectOrden.addEventListener('change', mostrarVista);

    btnCargarEjemplos.addEventListener('click', () => {
      agregarDatosEjemplo();
      mostrarVista();
    });

    btnExportar.addEventListener('click', exportarAJSON);

    mostrarVista();
  }

  function iniciarAgregar() {
    const formulario = document.getElementById('formAgregarGuia');
    if (!formulario) {
      return;
    }

    const CAMPOS = ['titulo', 'categoria', 'nivel', 'resumen', 'pasos', 'fuente', 'etiquetas'];
    const mensaje = document.getElementById('mensajeFormulario');
    const tituloFormulario = document.getElementById('tituloFormulario');
    const btnGuardar = document.getElementById('btnGuardar');
    const enlaceCancelar = document.getElementById('enlaceCancelar');

    function mostrarMensaje(texto, tipo) {
      mensaje.textContent = texto;
      mensaje.className = 'mensaje-form mensaje-form--' + tipo;
      mensaje.setAttribute('role', tipo === 'error' ? 'alert' : 'status');
      mensaje.hidden = false;
    }

    function mostrarError(campo, texto) {
      const control = formulario.elements[campo];
      const error = document.getElementById('error-' + campo);
      error.textContent = texto;
      error.hidden = false;
      control.setAttribute('aria-invalid', 'true');
    }

    function limpiarError(campo) {
      const control = formulario.elements[campo];
      const error = document.getElementById('error-' + campo);
      error.textContent = '';
      error.hidden = true;
      control.removeAttribute('aria-invalid');
    }

    function limpiarErrores() {
      CAMPOS.forEach(limpiarError);
      mensaje.hidden = true;
    }

    function separarLineas(texto) {
      return texto
        .split('\n')
        .map((linea) => linea.trim())
        .filter((linea) => linea !== '');
    }

    function separarEtiquetas(texto) {
      return texto
        .split(',')
        .map((etiqueta) => etiqueta.trim())
        .filter((etiqueta) => etiqueta !== '');
    }

    function validar() {
      const errores = {};
      const titulo = formulario.elements['titulo'].value.trim();
      const categoria = formulario.elements['categoria'].value;
      const nivel = formulario.elements['nivel'].value;
      const resumen = formulario.elements['resumen'].value.trim();
      const pasos = separarLineas(formulario.elements['pasos'].value);
      const fuente = formulario.elements['fuente'].value.trim();
      const etiquetas = separarEtiquetas(formulario.elements['etiquetas'].value);

      if (titulo === '') {
        errores.titulo = 'El título es obligatorio.';
      } else if (titulo.length < LIMITES.tituloMin || titulo.length > LIMITES.tituloMax) {
        errores.titulo = 'El título debe tener entre ' + LIMITES.tituloMin + ' y ' + LIMITES.tituloMax + ' caracteres.';
      }

      if (!CATEGORIAS.includes(categoria)) {
        errores.categoria = 'Selecciona una categoría.';
      }

      if (!Object.prototype.hasOwnProperty.call(ORDEN_NIVEL, nivel)) {
        errores.nivel = 'Selecciona un nivel.';
      }

      if (resumen === '') {
        errores.resumen = 'El resumen es obligatorio.';
      } else if (resumen.length < LIMITES.resumenMin || resumen.length > LIMITES.resumenMax) {
        errores.resumen = 'El resumen debe tener entre ' + LIMITES.resumenMin + ' y ' + LIMITES.resumenMax + ' caracteres.';
      }

      if (pasos.length < LIMITES.pasosMin || pasos.length > LIMITES.pasosMax) {
        errores.pasos = 'Escribe entre ' + LIMITES.pasosMin + ' y ' + LIMITES.pasosMax + ' pasos, uno por línea.';
      } else if (pasos.some((paso) => paso.length < LIMITES.pasoMin || paso.length > LIMITES.pasoMax)) {
        errores.pasos = 'Cada paso debe tener entre ' + LIMITES.pasoMin + ' y ' + LIMITES.pasoMax + ' caracteres.';
      }

      if (fuente === '') {
        errores.fuente = 'La fuente es obligatoria.';
      } else if (!esEnlaceSeguro(fuente)) {
        errores.fuente = 'Escribe un enlace válido que empiece por http:// o https://.';
      }

      if (etiquetas.length > LIMITES.etiquetasMax) {
        errores.etiquetas = 'Escribe máximo ' + LIMITES.etiquetasMax + ' etiquetas.';
      } else if (etiquetas.some((etiqueta) => etiqueta.length > LIMITES.etiquetaMax)) {
        errores.etiquetas = 'Cada etiqueta puede tener hasta ' + LIMITES.etiquetaMax + ' caracteres.';
      }

      return {
        errores: errores,
        datos: {
          titulo: titulo,
          categoria: categoria,
          nivel: nivel,
          resumen: resumen,
          pasos: pasos,
          fuente: fuente,
          etiquetas: etiquetas
        }
      };
    }

    const parametros = new URLSearchParams(window.location.search);
    let guiaEditada = null;
    if (parametros.has('editar')) {
      guiaEditada = obtenerGuiaPorId(Number(parametros.get('editar')));
      if (!guiaEditada) {
        mostrarMensaje('No se encontró la práctica que quieres editar.', 'error');
      }
    }

    if (guiaEditada) {
      const pasosActuales = Array.isArray(guiaEditada.pasos)
        ? guiaEditada.pasos
        : (guiaEditada.contenido ? [guiaEditada.contenido] : []);
      formulario.elements['titulo'].value = guiaEditada.titulo || '';
      formulario.elements['categoria'].value = guiaEditada.categoria || '';
      formulario.elements['nivel'].value = guiaEditada.nivel || '';
      formulario.elements['resumen'].value = guiaEditada.resumen || '';
      formulario.elements['pasos'].value = pasosActuales.join('\n');
      formulario.elements['fuente'].value = guiaEditada.fuente || '';
      formulario.elements['etiquetas'].value = (guiaEditada.etiquetas || []).join(', ');
      tituloFormulario.textContent = 'Editar práctica';
      btnGuardar.textContent = 'Guardar cambios';
      enlaceCancelar.hidden = false;
    }

    formulario.addEventListener('input', (e) => {
      if (CAMPOS.includes(e.target.name)) {
        limpiarError(e.target.name);
      }
    });

    formulario.addEventListener('submit', (e) => {
      e.preventDefault();
      limpiarErrores();

      const resultado = validar();
      const camposConError = CAMPOS.filter((campo) => resultado.errores[campo]);

      if (camposConError.length > 0) {
        camposConError.forEach((campo) => mostrarError(campo, resultado.errores[campo]));
        mostrarMensaje('Revisa los campos marcados en rojo.', 'error');
        formulario.elements[camposConError[0]].focus();
        return;
      }

      if (guiaEditada) {
        const guardado = actualizarGuia(guiaEditada.id, resultado.datos);
        if (guardado) {
          mostrarMensaje('Los cambios se guardaron correctamente.', 'exito');
        } else {
          mostrarMensaje('No se pudieron guardar los cambios.', 'error');
        }
        return;
      }

      const nuevaGuia = Object.assign({}, resultado.datos, {
        id: Date.now(),
        fecha: new Date().toISOString(),
        leida: false,
        favorita: false
      });

      const guias = obtenerGuias();
      guias.push(nuevaGuia);

      if (guardarGuias(guias)) {
        formulario.reset();
        mostrarMensaje('La práctica se guardó correctamente.', 'exito');
      } else {
        mostrarMensaje('No se pudo guardar la práctica.', 'error');
      }
    });
  }

  function iniciarMiRuta() {
    const contenedorBarras = document.getElementById('contenedorBarras');
    if (!contenedorBarras) {
      return;
    }

    const contenedorFavoritas = document.getElementById('contenedorFavoritas');
    const mensajeSinFavoritas = document.getElementById('mensajeSinFavoritas');
    const contenedorLeidas = document.getElementById('contenedorLeidas');
    const mensajeSinLeidas = document.getElementById('mensajeSinLeidas');

    function crearBarra(categoria, guias) {
      const deCategoria = guias.filter((guia) => guia.categoria === categoria);
      const leidas = deCategoria.filter((guia) => guia.leida).length;
      const porcentaje = deCategoria.length > 0 ? Math.round((leidas / deCategoria.length) * 100) : 0;

      const item = document.createElement('div');
      item.className = 'barra-item';

      const encabezado = document.createElement('div');
      encabezado.className = 'barra-item__encabezado';

      const nombre = document.createElement('span');
      nombre.textContent = categoria;

      const valor = document.createElement('span');
      valor.className = 'barra-item__porcentaje';
      valor.textContent = porcentaje + '% (' + leidas + '/' + deCategoria.length + ')';

      encabezado.appendChild(nombre);
      encabezado.appendChild(valor);

      const pista = document.createElement('div');
      pista.className = 'barra-item__pista';
      pista.setAttribute('role', 'progressbar');
      pista.setAttribute('aria-label', 'Avance en ' + categoria);
      pista.setAttribute('aria-valuemin', '0');
      pista.setAttribute('aria-valuemax', '100');
      pista.setAttribute('aria-valuenow', String(porcentaje));

      const relleno = document.createElement('div');
      relleno.className = 'barra-item__relleno';
      relleno.style.width = '0%';

      pista.appendChild(relleno);
      item.appendChild(encabezado);
      item.appendChild(pista);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          relleno.style.width = porcentaje + '%';
        });
      });

      return item;
    }

    function mostrarRuta() {
      const guias = obtenerGuias();

      contenedorBarras.replaceChildren();
      CATEGORIAS.forEach((categoria) => {
        contenedorBarras.appendChild(crearBarra(categoria, guias));
      });

      const favoritas = guias.filter((guia) => guia.favorita);
      const leidas = guias.filter((guia) => guia.leida);

      dibujarTarjetas(contenedorFavoritas, mensajeSinFavoritas, favoritas, mostrarRuta);
      dibujarTarjetas(contenedorLeidas, mensajeSinLeidas, leidas, mostrarRuta);
    }

    mostrarRuta();
  }

  iniciarMenu();
  iniciarIndex();
  iniciarAgregar();
  iniciarMiRuta();
});