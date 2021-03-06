
let cliente = document.getElementById("nombre").value;
let mesa = parseInt(document.getElementById("numeroMesa").value);
var Clickbutton=null;
var tbody=null;
var products= []

 fetch("./db.json").then((respuesta) => {    
    return respuesta.json();
  }).then((json) => {  
        products = json;
        cargaProductos() 
        Clickbutton= document.querySelectorAll(".button")
    tbody= document.querySelector(".tbody");   


 Clickbutton.forEach(btn =>{
    btn.addEventListener("click", addToCarritoItem)
}) 
}); 
 

    /* $.getJSON("./db.json", function(datos){
  products=datos;
cargaProductos()}); */


// login
const ingresar= ()=>{
    let cliente = document.getElementById("nombre").value;
    let mesa = parseInt(document.getElementById("numeroMesa").value);
    let mensajeValidacion = document.querySelector('#mensaje-validacion');

if(cliente!== "" && mesa <25){
    mensajeValidacion.className="text-success";
    mensajeValidacion.innerHTML=`Bienvenido ${cliente}`;
    localStorage.setItem("usuario", JSON.stringify(cliente));
    mensajeValidacion.style.display = '';
     
    
   setTimeout(()=>{
        window.location='./index.html';
    }, 3000);
  }else{
    mensajeValidacion.className="text-danger";
    mensajeValidacion.innerHTML="Usuario o numero de mesa incorrecta";
  }
  
}

//Animacion JQUERY
$("#loguito").hide();
$(".menu_titulo").click(function(){
  $(this).animate({
    "padding":"20px",
    "marginLeft":"40px"},1500,function(){
      $("#loguito").fadeIn(1000);
    }).delay(3000);
    $(this).animate({
      "padding":"0px",
      "marginLeft":"0px"
    },1500,function(){
      $("#loguito").hide();
    });
    
  })
  
  
  // uso de JSON para obtener nombre de usuario
  var username= JSON.parse(localStorage.getItem("usuario"));
  var newDiv= document.createElement("h2");
  newDiv.id="usuarios";
  newDiv.innerText= `Bienvenido ${username}`;
  document.body.before(newDiv);
  $("#usuarios").css({"font-family":"dancing script","color":"rgb(254, 255, 222)",
  "font-size":"30px", "margin":"60px",
  "position":"absolute" })

if(username=== null){
  $("#usuarios").hide()
}
//bloqueo de botones hasta usuario registrado
const habilitar=()=>{
   
  if(cliente==""|| mesa==isNaN){
      document.getElementById("boton-form").disabled=true;
  }
else{
    document.getElementById("boton-form").disabled=false;
}
}



//botones carrito
 function addToCarritoItem(e){
    const button= e.target
    const item= button.closest(".card")
    const itemTitle= item.querySelector(".card-title").textContent;
    const itemPrice= item.querySelector(".precio").textContent;
    const itemImg= item.querySelector(".card-img-top").src;

    const newItem={
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad:1
    }
    addItemCarrito(newItem)
}
var carrito=[]
function addItemCarrito(newItem){
  
  const cantitadElegida= tbody.getElementsByClassName("input__cantidad")
  for(let i=0; i<carrito.length;i++)
  if(carrito[i].title===newItem.title){
    carrito[i].cantidad++;
  const inputCantidad=cantitadElegida[i]
  inputCantidad.value++;
  carritoTotal()
    return null;
  }
    carrito.push(newItem)
    renderCarrito()
};
function renderCarrito(){
    tbody.innerHTML = ''
    carrito.map(item => {
      const tr = document.createElement('tr')
      tr.classList.add('ItemCarrito')
      const Content = `
      
      <th scope="row">1</th>
              <td class="table__productos">
                <img src=${item.img}  alt="">
                <h6 class="title">${item.title}</h6>
              </td>
              <td class="table__price"><p>${item.precio}</p></td>
              <td class="table__cantidad">
                <input type="number" min="1" value=${item.cantidad} class="input__cantidad">
                <button class="delete btn btn-danger"id="boton-delete">x</button>
              </td>`
      tr.innerHTML = Content;
      tbody.append(tr)

      tr.querySelector(".delete").addEventListener("click",removeItemCarrito);
      tr.querySelector(".input__cantidad").addEventListener("change", sumaCantidad)
    })  
carritoTotal()
}

function carritoTotal(){
  let total= 0;
  const itemCartTotal= document.querySelector(".itemCartTotal")
carrito.forEach((item)=>{
const precio= Number(item.precio.replace("$", ""))
total= total+precio*item.cantidad;
})
itemCartTotal.innerHTML=`Total $ ${total}`
agregarLocalSt()
}


  function removeItemCarrito (e){
    const buttonDelete= e.target;
    const tr= buttonDelete.closest (".ItemCarrito");
    const title= tr.querySelector(".title").textContent;
    for(let i=0; i<carrito.length; i++){
      if(carrito[i].title=== title){
        carrito.splice(i,1)
      }
    }
      tr.remove()
      carritoTotal()
      
}
function sumaCantidad(e){
  const sumaInput= e.target
  const tr= sumaInput.closest (".ItemCarrito")
  const title= tr.querySelector(".title").textContent;
  carrito.forEach(item=>{
    if(item.title=== title){
      sumaInput.value <1 ?(sumaInput.value=1): sumaInput.value;
      item.cantidad=sumaInput.value;
      carritoTotal()
    }
  })
}

function agregarLocalSt(){
  localStorage.setItem("carrito", JSON.stringify(carrito))
}
window.onload= function(){
  const storage= JSON.parse(localStorage.getItem("carrito"));
  if(storage){
    carrito=storage
    renderCarrito()
  }
}

//objeto pedido hecho
/* class PedidoHecho{
  constructor(pNombre, pMesa, pComida){
  this.nombre = pNombre
  this.mesa = pMesa
  this.comida = pComida
}
}
const pedido1 = new PedidoHecho (cliente, mesa, newItem)
console.log(`hola soy ${this.nombre}, sentado en ${this.mesa}`)

 */

