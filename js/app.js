document.addEventListener('DOMContentLoaded', () => {
  const CATEGORIAS = ['contraseñas', 'correo', 'redes', 'dispositivos', 'desarrollo seguro', 'privacidad'];
  const ORDEN_NIVEL = { 'básico': 1, 'intermedio': 2, 'avanzado': 3 };
  const CLASE_NIVEL = {
    'básico': 'badge--basico',
    'intermedio': 'badge--intermedio',
    'avanzado': 'badge--avanzado'
  };

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

    const detalle = document.createElement('details');
    detalle.className = 'tarjeta__detalle';
    const sumario = document.createElement('summary');
    sumario.textContent = 'Ver detalle';
    const textoDetalle = document.createElement('p');
    textoDetalle.textContent = guia.contenido;
    detalle.appendChild(sumario);
    detalle.appendChild(textoDetalle);

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

    const btnLeida = crearBoton(
      guia.leida ? 'Leída ✓' : 'Marcar como leída',
      guia.leida,
      () => {
        cambiarEstado(guia.id, 'leida');
        alActualizar();
      }
    );

    const btnFavorita = crearBoton(
      guia.favorita ? '★ Favorita' : '☆ Marcar favorita',
      guia.favorita,
      () => {
        cambiarEstado(guia.id, 'favorita');
        alActualizar();
      }
    );

    acciones.appendChild(btnLeida);
    acciones.appendChild(btnFavorita);

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
        const textoGuia = [guia.titulo, guia.resumen, guia.contenido, (guia.etiquetas || []).join(' ')]
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
      restaurarDatosEjemplo();
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

    const mensaje = document.getElementById('mensajeFormulario');

    function mostrarMensaje(texto, tipo) {
      mensaje.textContent = texto;
      mensaje.className = 'mensaje-form mensaje-form--' + tipo;
      mensaje.hidden = false;
    }

    formulario.addEventListener('submit', (e) => {
      e.preventDefault();

      const titulo = formulario.elements['titulo'].value.trim();
      const categoria = formulario.elements['categoria'].value.trim();
      const nivel = formulario.elements['nivel'].value.trim();
      const resumen = formulario.elements['resumen'].value.trim();
      const contenido = formulario.elements['contenido'].value.trim();
      const etiquetasTexto = formulario.elements['etiquetas'].value;

      const faltantes = [];
      if (titulo === '') faltantes.push('título');
      if (categoria === '') faltantes.push('categoría');
      if (nivel === '') faltantes.push('nivel');
      if (resumen === '') faltantes.push('resumen');
      if (contenido === '') faltantes.push('detalle');

      if (faltantes.length > 0) {
        mostrarMensaje('Completa los campos obligatorios: ' + faltantes.join(', ') + '.', 'error');
        return;
      }

      const etiquetas = etiquetasTexto
        .split(',')
        .map((etiqueta) => etiqueta.trim())
        .filter((etiqueta) => etiqueta !== '');

      const nuevaGuia = {
        id: Date.now(),
        titulo: titulo,
        categoria: categoria,
        nivel: nivel,
        resumen: resumen,
        contenido: contenido,
        etiquetas: etiquetas,
        fecha: new Date().toISOString(),
        leida: false,
        favorita: false
      };

      const guias = obtenerGuias();
      guias.push(nuevaGuia);
      guardarGuias(guias);

      formulario.reset();
      mostrarMensaje('La práctica se guardó correctamente.', 'exito');
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
      relleno.style.width = porcentaje + '%';

      pista.appendChild(relleno);
      item.appendChild(encabezado);
      item.appendChild(pista);

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