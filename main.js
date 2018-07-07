//CARGA PRODUCTOS

var productos = [
    {
        codigo: '001',
        nombre: 'Leche'
    },
    {
        codigo: '002',
        nombre: 'Harina'
    },
    {
        codigo: '003',
        nombre: 'Arroz'
    }
];

function constructorProducto(_codigo, _nombre) {
    this.codigo = _codigo;
    this.nombre = _nombre;
    this.cantidad = function(codigoProducto, entradas, salidas) {
        var cantidadEntrada = 0;
        var cantidadSalida = 0;

        for (e = 0; e < entradas.length; e++) {
            if (entradas[e].codigo == codigoProducto) {
                cantidadEntrada += entradas[e].cantidad;
            }
        }
        for (s = 0; s < salidas.length; s++) {
            if (salidas[s].codigo == codigoProducto) {
                cantidadSalida += salidas[s].cantidad;
            }
        }

        return cantidadEntrada - cantidadSalida;
    };
}

function cargarProducto(producto) {
    if (localStorage.productos == undefined) {
        //var productos = [];
        productos.push(producto);
    } else {
        var productosGuardados = localStorage.getItem('productos');
        productos = JSON.parse(productosGuardados);
        productos.push(producto);
    }
    var productosString = JSON.stringify(productos);
    localStorage.setItem('productos', productosString);
}

function crearProducto() {
    var codigo = document.getElementById('inputCodigo').value;
    var nombre = document.getElementById('inputNombre').value;

    if (codigo !== '' && nombre !== '') {
        var producto = new constructorProducto(codigo, nombre);
        cargarProducto(producto);
        document.getElementById('formIngresoProductos').reset();
    }
}

function productosMain() {
    document.getElementById('guardarProducto').addEventListener('click', function () {
        crearProducto();
    });
}

// ENTRADAS/SALIDAS

function generarOpcionesProductos() {
    var productos = JSON.parse(localStorage.productos);
    var listaProductos = '';

    for (var i = productos.length - 1; i >= 0; i--) {
        listaProductos += "<option value='" + productos[i].codigo + "'>" + productos[i].nombre + "</option>"
    }

    if (listaProductos != "") {
        document.getElementById("dropdownEntrada").innerHTML += listaProductos;
        document.getElementById("dropdownSalida").innerHTML += listaProductos;
    }
}

function constructorEntrada(_codigo, _cantidad, _lote) {
    this.codigo = _codigo;
    this.cantidad = _cantidad;
    this.lote = _lote;
}

function nuevaEntrada() {
    var codigo = document.getElementById("dropdownEntrada").value;
    var cantidad = document.getElementById("cantidadEntrada").value;
    cantidad = parseInt(cantidad);
    var lote = document.getElementById("loteEntrada").value;

    if (codigo !== '' && cantidad !== '' && lote !== '') {
        var nuevaEntrada = new constructorEntrada(codigo, cantidad, lote);
        cargarEntradas(nuevaEntrada);
        document.getElementById('formEntradas').reset();
    }
}

function cargarEntradas(entrada) {
    if (localStorage.entradas == undefined) {
        var entradas = [];
        entradas.push(entrada);
    }
    else {
        var entradasGuardadas = localStorage.entradas;
        var entradas = JSON.parse(entradasGuardadas);
        entradas.push(entrada);
    }
    var entradasString = JSON.stringify(entradas);
    localStorage.setItem('entradas', entradasString);
}

function constructorSalida(_codigo, _cantidad, _lote) {
    this.codigo = _codigo;
    this.cantidad = _cantidad;
    this.lote = _lote;
}

function nuevaSalida() {
    var codigo = document.getElementById("dropdownSalida").value;
    var cantidad = document.getElementById("cantidadSalida").value;
    cantidad = parseInt(cantidad);
    var lote = document.getElementById("loteSalida").value;

    if (codigo !== '' && cantidad !== '' && lote !== '') {
        var nuevaSalida = new constructorSalida(codigo, cantidad, lote);
        cargarSalidas(nuevaSalida);
        document.getElementById('formSalidas').reset();
    }
}

function cargarSalidas(salida) {
    if (localStorage.salidas == undefined) {
        var salidas = [];
        salidas.push(salida);
    }
    else {
        var salidasGuardadas = localStorage.Salidas;
        var salidas = JSON.parse(salidasGuardadas);
        salidas.push(salida);
    }
    var salidasString = JSON.stringify(salidas);
    localStorage.setItem('salidas', salidasString);
}

//STOCK

function mostrarStock() {
    var productos = JSON.parse(localStorage.productos);
    var entradas = JSON.parse(localStorage.entradas);
    var salidas = JSON.parse(localStorage.salidas);
    var cantidad;
    var tablaStock = document.getElementById('tablaStock');
    tablaStock.innerHTML = '';

    for (i = 0; i < productos.length; i++) {
        cantidad = calcularCantidad(productos[i].codigo, entradas, salidas);
        tablaStock.innerHTML += "<tr><td>" + productos[i].codigo + "</td><td>" + productos[i].nombre + "</td><td>" + cantidad + "</td></tr>";
    }
}

function calcularCantidad(codigoProducto, entradas, salidas) {
    var cantidadEntrada = 0;
    var cantidadSalida = 0;

    for (e = 0; e < entradas.length; e++) {
        if (entradas[e].codigo == codigoProducto) {
            cantidadEntrada += entradas[e].cantidad;
        }
    }
    for (s = 0; s < salidas.length; s++) {
        if (salidas[s].codigo == codigoProducto) {
            cantidadSalida += salidas[s].cantidad;
        }
    }

    return cantidadEntrada - cantidadSalida;
};

