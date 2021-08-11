const cargaProductos = ()=>{
    
    let vistaProductos= "";

    products.forEach(
        (p) => 
            (vistaProductos +=`
<div class="card d-inline-flex p-2 col-2 m-2" style="width: 18rem">
    <img src="${p.imagen}" style="height: 12rem" class="card-img-top" alt="${p.cardTitle}">
    <div class="card-body">
        <h5 class="card-title">${p.cardTitle}</h5>
        <p class="card-text">Precio: ${p.cardText}</p>
        <h5 class="text-primary">Precio: <span class="precio">${p.precio}</span></h5>
        <div class="d-grid gap-2">
            <button class="btn btn-primary button" id="btnComida">Añadir a pedido</button>
        </div>
    </div>
</div>`)
);
$("#menu-listado").html(vistaProductos);


};


