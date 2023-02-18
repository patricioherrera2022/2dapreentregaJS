const carrito = [];

const ordenarMenorMayor = () => {
    servicios.sort((a,b)=> a.precio - b.precio);
    mostrarListaOrdenada();
}

const ordenarMayorMenor = () => {
    servicios.sort((a,b)=> b.precio - a.precio);
    mostrarListaOrdenada();
}

const mostrarListaOrdenada = () => {
    const listaOrdenada = servicios.map(servicio => {
        return '- '+ servicio.nombre+' $'+ servicio.precio
    });
    alert('Lista de precios:'+'\n\n'+listaOrdenada.join('\n'))
    comprarServicio(listaOrdenada)
}

const comprarServicio = (listaDeServicio) => {
    let otroServicio;
    let servicioNombre = '';
    let servicioCantidad = 0;

    do {
        servicioNombre = prompt ('¿Que servicio desea adquirir?'+'\n\n'+listaDeServicio.join('\n'));
        servicioCantidad = parseInt(prompt('¿Cuántos meses lo quiere adquirir?'));

        const servicio = servicios.find(servicio => servicio.nombre.toLowerCase() === servicioNombre.toLowerCase());

        if (servicio) {
            agregarAlCarrito(servicio, servicio.id, servicioCantidad)
        } else {
            alert('Servicio no disponible')
        }

        otroServicio = confirm('Desea agregar otro servicio?');
    } while (otroServicio)

    confirmarCompra()
};

const agregarAlCarrito = (servicio, servicioId, servicioCantidad) => {
    const servicioRepetido = carrito.find(servicio => servicio.id === servicioId)
    if (!servicioRepetido) {
        servicio.cantidad += servicioCantidad
        carrito.push(servicio)
    } else {
        servicioRepetido.cantidad += servicioCantidad;
    }
}

const eliminarServicioCarrito = (servicioNombre) => {
    carrito.forEach((servicio, index) => {
        if (servicio.nombre.toLowerCase() === servicioNombre) {
            if (servicio.cantidad > 1) {
                servicio.cantidad--
            } else {
                carrito.splice(index, 1);
            }
        }
    });
    confirmarCompra()
};

const confirmarCompra = () => {
    const listaServicio = carrito.map(servicio => {
        return '- '+ servicio.nombre+' | Cantidad: '+ servicio.cantidad
    });

    const confirmar = confirm('Checkout: '
            +'\n\n'+listaServicio.join('\n')
            +'\n\nPara continuar, presione "Aceptar" o "Cancelar" para eliminar servicios no queridos del carrito."'
    )

    if (confirmar) {
        finalizarCompra(listaServicio)
    } else {
        const servicioAEliminar = prompt('Ingrese el nombre del servicio a eliminar:')
        eliminarServicioCarrito(servicioAEliminar)
    }
};

const finalizarCompra = (listaServicios) => {
    const cantidadTotal = carrito.reduce((acc, elemento) => acc + elemento.cantidad, 0)
    const precioTotal = carrito.reduce((acc, elemento) => acc + (elemento.precio * elemento.cantidad), 0)
    alert('Detalle de la compra: '
        +'\n\n'+listaServicios.join('\n')
        +'\n\nTotal de servicios: '+cantidadTotal
        +'\n\nEl total de la compra es: $'+precioTotal
        +'\n\nMuchas Gracias por su compra! Somos The Proyect Argento!'
    )
};

const comprar = () => {
    const serviciosBaratos = confirm("¿Desea ordenar la lista de servicios del más barato al más caro?")
    if (serviciosBaratos){
        ordenarMenorMayor();
    }else{
        ordenarMayorMenor();
    }
}

comprar();
