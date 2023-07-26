$( document ).ready(function() {
    $.ajax({
    type:'GET',
    async: false,
    url:'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20',
    success:function(data){

        var data = data.results;
        for (i = 0; i < data.length; i++) {
            buscarPokemon(data[i].name);
          }
    }
    });
});

function buscarPokemon(id){
  $.ajax({
  type:'GET',
  async: false,
  url:'https://pokeapi.co/api/v2/pokemon/'+id,
  success:function(data){
    var tipo="";
    for (x = 0; x < data.types.length; x++) {
      tipo+="<span class='label'>"+data.types[x].type.name+"</span>";
    }
    $( "#contenedor" ).append( "<div onclick=mostrarPokemon(\'"+id+"'\); class='swiper-slide'><img src='"+data.sprites.back_default+"'></br><p>"+data.name+"</p> "+tipo+" </div>" );
    iniciaSwiper();
   }
  });
  
}
function iniciaSwiper(){
  var swiper = new Swiper(".mySwiper", {
      slidesPerView: 5,
      spaceBetween: 30,
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
     
      });
}
function mostrarPokemon(nombre){
  limpiar();
  $.ajax({
  type:'GET',
  async: false,
  url:'https://pokeapi.co/api/v2/pokemon/'+nombre,
  success:function(data){
    var tipo="";
    var habilidades="";
    for (x = 0; x < data.types.length; x++) {
      tipo+="<span class='label'>"+data.types[x].type.name+"</span>";
    }
    for (y = 0; y < data.abilities.length; y++) {
      habilidades+="<span class='label abilities'>"+data.abilities[y].ability.name+"</span>";
    }
    $( "#nombrePokemon" ).text(data.name+" | N.º "+data.id);
    $( "#tipoPokemon" ).append(tipo);
    $( "#alturaPokemon" ).append((data.height/10).toFixed(1)+" m");
    $( "#pesoPokemon" ).append((data.weight/10).toFixed(1) +" kg");
    $( "#habilidadesPokemon" ).append(habilidades);
    $('#detallePokemon').modal('show');
  }
});
}
function limpiar(){
  
    $( "#nombrePokemon" ).text("");
    $( "#tipoPokemon" ).text("");
    $( "#alturaPokemon" ).text("");
    $( "#pesoPokemon" ).text("");
    $( "#habilidadesPokemon" ).text("");
    $('#detallePokemon').modal('hide');
}

