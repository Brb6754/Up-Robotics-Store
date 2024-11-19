const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const comprarCarrito = document.querySelector('#comprar-carrito')
let articulosCarrito=[];


registrarEventListeners();
function registrarEventListeners(){
    listaProductos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarrito.addEventListener('click', vaciarCarro);
    comprarCarrito.addEventListener('click', comprarCarro)
}

function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
        const productoSeleccionado = e.target.parentElement.parentElement;

        leerDatosProducto(productoSeleccionado);
    }
}

function vaciarCarro(){
    articulosCarrito=[];
    limpiarHtml()
}


function comprarCarro(){
    const mensaje1  = obtenerDatosCarrito(articulosCarrito)
    const mensaje  = mensaje1
    const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=+526188390652&text=${encodeURIComponent(mensaje)}`;
    window.open(enlaceWhatsApp, '_blank')
}



function obtenerDatosCarrito(articulosCarrito){
    let mensaje = "Gracias por tu  pedido Up Robotics Store 🤖:\n";
     mensaje += "Los productos que ordenaste son:\n"

    articulosCarrito.forEach(producto => {
        mensaje += ` ${producto.titulo} - ${producto.talla} - ${producto.precio}\n`;
    });

    mensaje += "En unos momentos nos pondremos en contacto contigo para confirmar el pedido y el pago.😀"
    
    return mensaje;

}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
      const eliminado = e.target.getAttribute('data-id')

      articulosCarrito = articulosCarrito.filter(producto => producto.id !== eliminado)

      carritoHtml()
    }
    
}


function leerDatosProducto(producto){
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h4').textContent,
            precio: producto.querySelector('.precio span').textContent,
            talla: 'S',
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        const existe = articulosCarrito.some(producto => producto.id === infoProducto.id)
        if(existe){
            const productos = articulosCarrito.map(producto => {
                if (producto.id === infoProducto.id){
                    producto.cantidad++;
                    return producto;
                }
            })
            articulosCarrito =[...productos]
        }
        else{
            articulosCarrito = [...articulosCarrito, infoProducto]
        }
    console.log(articulosCarrito)
    carritoHtml()
}

function carritoHtml() {
    limpiarHtml();

    articulosCarrito.forEach(producto => {
        const { imagen, titulo, precio, cantidad, id, talla } = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100px">
            </td>
            <td> 
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                <select>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
        contenedorCarrito.appendChild(row);

        row.querySelector('select').addEventListener('change', (event) => {
            const selectedTalla = event.target.value;
            const productId = row.querySelector('a').getAttribute('data-id');
            const productIndex = articulosCarrito.findIndex(item => item.id === productId);
            articulosCarrito[productIndex].talla = selectedTalla;
        });
    });

}

function limpiarHtml(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

const back1 = document.getElementById('playeraback');

back1.addEventListener('mouseover', () => {
    back1.src = "img/playeraf.png";
});

back1.addEventListener('mouseout', () => {
    back1.src = "img/playerabrasil2.png";
});

const back2 = document.getElementById('playeraback2');

back2.addEventListener('mouseover', () => {
    back2.src = "img/playeraf.png";
});

back2.addEventListener('mouseout', () => {
    back2.src = "img/playerbrasil3.png";
});

const back3 = document.getElementById('playeraback3');

back3.addEventListener('mouseover', () => {
    back3.src = "img/playeraf.png";
});

back3.addEventListener('mouseout', () => {
    back3.src = "img/playeravideojuego.png";
});


const hoddie = document.getElementById('hoodie');

hoddie.addEventListener('mouseover', () => {
    hoddie.src = "img/hoodie.png";
});

hoddie.addEventListener('mouseout', () => {
    hoddie.src = "img/hoddieback.png";
});
