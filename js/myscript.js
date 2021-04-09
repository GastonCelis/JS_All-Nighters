function calculo_dps(nivel, ilvl) {
    return (nivel + ilvl) * 9
}

function animacion(){
    $(".js_subtitulo1").fadeOut(2000)
                        .fadeIn(2000);
}

function animienbros(){
    $(".js_mienbros").hide();
}


class Jugador {
    constructor(nombre, raza, clase, rol, contenido) {
        this.nombre = nombre;
        this.raza = raza;
        this.clase = clase;
        this.rol = rol;
        this.contenido = contenido
    }

    setIngresa = function() {
        return "El jugador ingresó a la guild";
    }
}

$(".js_subtitulo1").append("¡Bienvenid@ Ingresante!");

var animaciones = "si"

const URLJSON = "datos/jugadores_guild.json"

var listanombres = [];
var listaraza = [];
var listaclase = [];
var listarol = [];
var listacontenido = [];


var rol = " "
$(".js_rolPJ1").click(function(){
    rol = "Daño"
});
$(".js_rolPJ2").click(function(){
    rol = "Sanador"
});
$(".js_rolPJ3").click(function(){
    rol = "Tanque"
});


$(".btn-solicitud").click(
    function(){
        var nombre = $(".js_nombrepPJ").val();
        var raza = $(".js_razaPJ").val();
        var clase = $(".js_clasePJ").val()
        var contenido = $(".js_contenidoPJ").val();

        if(nombre == " " || raza == " " || clase == " " || rol == " "){
            Swal.fire({
                title: 'Datos Incompletos',
                text: 'Completa todos los campos del formulario',
                icon: 'error',
                background: 'center/cover no-repeat url(../multimedia/imagenes/humano2.jpg)',
                allowOutsideClick: false,
                /*customClass: {
                    title: 'tituloAlerta',
                    content: 'textoAlerta',
                },*/
                confirmButtonColor: 'red'
            })
        }
    
        else {
            listanombres.push(nombre);
            listaraza.push(raza);
            listaclase.push(clase);
            listarol.push(rol)
            listacontenido.push(contenido);
    
            $("#js_tabla").append("<tr class=tablainterna><td class=itemtabla>" + nombre + "</td><td class=itemtabla>" + raza + "</td><td class=itemtabla>" + clase + "</td><td class=itemtabla>" + rol + "</td><td><button class='btm_eliminar js_btnEliminar' type=button>X</button></td></tr>")
            

            $(".js_btnEliminar").click(function (e) { 
                e.preventDefault();
                var fila = $(this).parent().parent()[0]
                fila.remove()
            });


            for(i=0; i < listanombres.length; i++){
                var jugadores = new Jugador(listanombres[i].toUpperCase(), listaraza[i].toUpperCase(),
                listaclase[i].toUpperCase(), listarol[i].toUpperCase(), listacontenido[i].toUpperCase())
                }
            
            console.log(jugadores)
            console.log(jugadores.setIngresa())

            $("#js_formulario")[0].reset()
        }
        
    }
)



$(".btn-enviar").click(function(){
    var nivel = parseInt($(".js_nivel").val());
    var ilvl = parseInt($(".js_ilvl").val());
    if(isNaN(nivel) || isNaN(ilvl)){
        var Nnan = true
    }
    var calculo = calculo_dps(nivel, ilvl);
    if( (nivel < 1 || nivel > 60 || Nnan == true) || (ilvl < 1 || ilvl > 236 || Nnan == true)){
        Swal.fire({
            title: 'Ingresó un nivel o un item level incorrectos',
            text: 'El nivel es de 1 - 60, El Ilvl de 1 - 236',
            icon: 'error',
            background: 'center/cover no-repeat url(../multimedia/imagenes/humano1.jpg)',
            allowOutsideClick: false,
            /*customClass: {
                title: 'tituloAlerta2',
                content: 'textoAlerta2',
            },*/
            confirmButtonColor: 'red'
        })
    }

    else{
        $("#js_resultadodps").replaceWith("<p class='resultadodps' id='js_resultadodps'>"+calculo+"</p>");

        $("#formulariodDPS")[0].reset()
    }
})



$(".btn-fondo").click(function(){
    if ($("body").hasClass("img-fondo1")){
        $("body").removeClass();
        $("body").addClass("img-fondo2")
    }
        
    else if ($("body").hasClass("img-fondo2")){
        $("body").removeClass();
        $("body").addClass("img-fondo1")
    }
    
    else {
        $("body").addClass("img-fondo2")
    }
})

$(".js_btn_miembros").click(() =>{
    $(".js_mienbros").show();
    if($("#js_miembros_activos").hasClass("verificacionM")){
        console.log("Ya se genero la lista de miembros activos.")
    }
    else{
            $.getJSON(URLJSON, function (respuesta, estado) {
                if (estado === "success"){
                    var datosJugadores = respuesta;
                    for(const dato of datosJugadores){
                        $("#js_tabla_miembros").append(`<tr class='tablainterna'><td class='tabla_nombre'><a class='nombre_miembro' target='_blank' href=${dato.enlace}>${dato.nombre}</a></td><td class='tabla_datos'>${dato.raza}</td><td class='tabla_datos'>${dato.clase}</td><td class='tabla_datos'>${dato.rol}</td></tr>`)
                    }
                }
            }
        );
        $("#js_miembros_activos").addClass("verificacionM");
    }
    
})

animienbros()
setInterval(animacion, 1000);



