
var $$ = Dom7;

var app = new Framework7({
    root: '#app',
    name: 'My App',  
    id: 'com.myapp.test',  
    panel: {
      swipe: 'left',
    },
    routes: [
      {
        path: '/Registro/',
        url: 'Registro.html',
        options: {
          transition: 'f7-push',
        }
      },
      {
        path: '/inicio/',
        url: 'inicio.html',
        options: {
          transition: 'f7-push',
        }
      },
      {
        path: '/Tendencias/',
        url: 'Tendencias.html',
        options: {
          transition: 'f7-push',
        }
      },
      {
        path: '/Amigos/',
        url: 'Amigos.html',
        options: {
          transition: 'f7-push',
        }
      },
      {
        path: '/Mensajeria/',
        url: 'Mensajeria.html',
        options: {
          transition: 'f7-push',
        }
      },
      {
        path: '/Perfil/',
        url: 'Perfil.html',
      },
      {
        path: '/Crear/',
        url: 'Crear.html',
      },
      {
        path: '/Tubiblioteca/',
        url: 'Tubiblioteca.html',
      },
      {
        path: '/Buscar/',
        url: 'Buscar.html',
      },
      {
        path: '/Leer/',
        url: 'Leer.html',
      },
      {
        path: '/Buscar2/',
        url: 'Buscar2.html',
        options: {
          transition: 'f7-push',
        }
      },
    ]
  });

var mainView = app.views.create('.view-main');

// VARIABLES DE CLOUD FIRESTORE
var db = firebase.firestore();
var colUsuarios = db.collection("usuarios");
var colLibros =db.collection("Libros");
var colFeed = db.collection("feed");

// var subcolCap= colLibros.collection('Capitulos')
var arraycontenido=[];
var suslibs=[];
var autor='';
var todolibs=[];
var todolibs2=[];
var cont=-1;
var i=0;
var tempocap ="";
var arraylibs=[];
var arraylibs2 = [];
var arraycaps =[];
var arraycaps2 =[];
var refcap="";
var usuario="";
var contraseña="";
var email="";
var contraseña2="";
var pagina="";
var agpag="";
var agcap="";
var caps=0;
var libs=0;
var agcap2=[''];
var cuantos=0;
var aglib="";
var aglib2=[''];
var selec=0;
var selecl=0;
var id=0;
var id2=0;
var aglib3="";
var contm= 0;
var contc= 0;
var feedquien='';
var fechaPublicacion='';
var comentario='';
var quienesmeg2=[];
var quienesmeg=[];
var borrarmg=[];
var coment=''
var mg='';
var comt='';
var shares='';
var todopers=[];
var todopers2=[];
var arraysiguiendo =[];
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

$$(document).on('page:init', function (e) {
    console.log(e);

  
})
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  $$('#ingreso').on('click', function(){
    if ($$('#user').val()=="") {
      app.dialog.alert('Completa el usuario por favor');
    } else if ($$('#pass').val()=="") {
      app.dialog.alert('Completa la contraseña por favor');
    } else {

        // usuario=$$('#user').val();
        email=$$('#emaillog').val();
        contraseña=$$('#pass').val();
        usuario=$$('#user').val();

        firebase.auth().signInWithEmailAndPassword(email, contraseña)
        .then(function(){
          mainView.router.navigate('/inicio/', { transition: 'f7-push' })

        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/user-not-found') {
            alert('Usuario no encontrado.');
            } else {
            alert(errorMessage);
            }
            console.log(error);
            })
            
     }
  })  
  $$('#Registro').on('click', function(){
    mainView.router.navigate('/Registro/', { transition: 'f7-push' });
  })
})
$$(document).on('page:init', '.page[data-name="Registro"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized

  $$('#Registro1').on('click', function(){
    if ($$('#passreg').val()=="") {
      app.dialog.alert('Completa la contraseña, por favor');
    } else if ($$('#passreg1').val()==""){
      app.dialog.alert('Completa el campo de "repetir contraseña", por favor')
    } else if ($$('#passreg2').val()!=$$('#passreg').val()){
      app.dialog.alert('Las contraseñas no son iguales')
      console.log();
    } else if ($$('#emailreg').val()==""){
      app.dialog.alert('Completa el campo del email, por favor')
    } else if ($$('#userreg').val()==""){
      app.dialog.alert('Completa el campo del nombre, por favor')
    }

    else {
      usuario=$$('#userreg').val();
      contraseña=$$('#passreg').val();
      email=$$('#emailreg').val();    
      // console.log(usuario, contraseña, email);
      console.log(contraseña, email);
      mainView.router.navigate('/Index/', { transition: 'f7-flip' });

      var email = email;
      var contraseña = contraseña;
      firebase.auth().createUserWithEmailAndPassword(email, contraseña)
      .then(  function(){
        datos={ 
        Nombre: usuario,
        Libros: 0,
        Cuenta: email,
        Siguiendo: ["ulii@ulii.com"],
        };
        colUsuarios.doc(email).set(datos);

          $$('#Graciasreg2').removeClass('novisible');
          $$('#Graciasreg2').addClass('visible');
          $$('#btnreg2').removeClass('visible');
          $$('#btnreg2').addClass('novisible');


 
      })

      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
      alert('Clave muy débil.');
      } else {
      alert(errorMessage);
      }
      console.log(error);
      })
    }
        })  
        $$('#Registro').on('click', function(){
          app.dialog.alert('Por favor complete el formulario para el registro');
        })
})
$$(document).on('page:init', '.page[data-name="inicio"]', function (e) {

  $$('#inicio1').on('click', function(){
    mainView.router.navigate('/inicio/');
  })
  $$('#tendencia1').on('click', function(){
    mainView.router.navigate('/Tendencias/');
  })
  $$('#amigo1').on('click', function(){
    mainView.router.navigate('/Amigos/');
  })
  $$('#mensajeria1').on('click', function(){
    mainView.router.navigate('/Mensajeria/');
  })
  $$('#perfil').on('click', function(){
    mainView.router.navigate('/Perfil/');
  })
  $$('#crelib').on('click', function(){
    mainView.router.navigate('/Crear/');
  })
  $$('#tubiblio1').on('click', function(){
    mainView.router.navigate('/Tubiblioteca/');
  })
  $$('#buscar').on('click', function(){
    mainView.router.navigate('/buscar/');
  })
  $$('#actcom').on('click', function(){
    mainView.router.navigate('/inicio/', {reloadCurrent: true})
  })
  // carga la busqueda en el popup de inicio, para la busqueda de personas
  function busc(){
    var searchbar = app.searchbar.create({
      el: '.searchbar',
      searchContainer: '.list',
      searchIn: '.item-title',
      on: {
        search(sb, query, previousQuery) {
          console.log(query, previousQuery);
        }
      }
    });
  }
  // Crea el feed en el inicio con los usuarios a los que sigo:
   cargarfed();
 async function cargarfed(){
  var arrayseguidor = [];
  
  await colUsuarios.get()
  .then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
      var imagen='';
      imagen= doc.data().Img;
      console.log(imagen);

      arrayseguidor= doc.data().Siguiendo;
      var sucuenta = doc.id;
      console.log(arrayseguidor);
      var estoy= arrayseguidor.indexOf(email);
      console.log(estoy);
      
      colFeed.where("Cuenta","==", sucuenta).get()
      .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          // cargamos las variables para crear el post correspondiente
          autor = doc.data().Cuenta;
          if (estoy > -1 || autor === email) {
          
          coment=doc.data().Comentario;
          mg= doc.data().Megustas;
          comt=doc.data().Comments;
          shares= doc.data().Compartidos;
          var selec= doc.data().fechaPublicacion;
          quienesmeg = doc.data().quienesmeg;
          nombre = doc.data().Nombre;
          console.log(quienesmeg2)
          console.log("autor : "+autor)
          // if (quienesmegg  == email)
          autor = autor.replace('@','');
          autor = autor.replace('.','');
          // append para el posteo 
          $$('#posteos').append(`
            <div class="card demo-facebook-card">
            <div class="card-header">
              <div class="demo-facebook-avatar">
              <a id="clickperfil" href="#" >
                <img id="elim`+nombre+`" class="popover-open" data-popover=".popo-noseguir" `+imagen+` width="34" height="34" />
              </a>
              </div>
              <div id="n`+autor+`" class="demo-facebook-name">`+doc.data().Cuenta+`</div>
              <div class="demo-facebook-date"></div>
            </div>
            <div class="card-content card-content-padding">
              <p>`+ coment +`.</p>
                    
            </div>
            <div class="card-footer">
            <a href="#" id="mg`+selec+`" class="link"> <div id="t`+selec+`"> Megustas: `+mg+`  </div><img id="libc`+selec+`" class="mgpost" src="img/libritocerrado.png" ></a>
            <div id="co`+selec+`" class="button link popup-open" href="#" data-popup=".comentario" >Comentarios `+comt+`</div>
            </div>
            </div>
           `)
           if (quienesmeg.indexOf(email) >=0 ){
            borrarmg=quienesmeg2.indexOf(email);
            console.log(borrarmg)
            $$('#libc'+selec).remove('<img id="libc'+selec+'" class="mgpost" src="img/libritocerrado.png" ></img>');
            $$('#mg'+selec).append('<img id="libc'+selec+'" class="mgpost"  src="img/libritoabierto.png" ></img>')
            }
            else if (quienesmeg.indexOf(email) == -1){
              $$('#libc'+selec).remove('<img id="libc'+selec+'" class="mgpost" src="img/libritoabierto.png" ></img>');
              $$('#libc'+selec).remove('<img id="libc'+selec+'" class="mgpost" src="img/libritocerrado.png" ></img>');
              $$('#mg'+selec).append('<img id="libc'+selec+'" class="mgpost" src="img/libritocerrado.png" ></img>');
            }
            console.log(quienesmeg.indexOf(email));
                  
            // funcion para dar mg en el post de alguien
            $$('#mg'+selec).on('click',function(){
              $$('#libc'+selec).remove('<img id="libc'+selec+'" class="mgpost" src="img/libritocerrado.png" ></img>');
              $$('#libc'+selec).remove('<img id="libc'+selec+'" class="mgpost" src="img/libritoabierto.png" ></img>');
              var id2=this.id;
              id = id2.replace('mg','');
              console.log('mg seleccionado: '+ id);
              feedquien = $$('#n'+autor).html();
              colFeed.where("fechaPublicacion", "==", id).get()
              .then(function(querySnapshot){
                querySnapshot.forEach(function(doc){ 
                  quienesmeg= doc.data().quienesmeg;
                })
                var borrarmg=quienesmeg.indexOf(email);
                if (quienesmeg.indexOf(email)==-1){
                  quienesmeg.push(email);
                  quienesmeg = quienesmeg.filter((item,index ) =>{ return quienesmeg.indexOf(item) === index} );
                  colFeed.doc(id).update({quienesmeg: firebase.firestore.FieldValue.arrayUnion(email)});
                  $$('#libc'+selec).remove('<img id="libc'+selec+'" class="mgpost" src="img/libritocerrado.png" ></img>');
                  $$('#mg'+selec).append('<img id="libc'+selec+'" class="mgpost"  src="img/libritoabierto.png" ></img>');
                  var setWithMerge = colFeed.doc(id).set({Megustas: quienesmeg.length,}, {merge: quienesmeg.length});
                  $$('#t'+selec).html('Megustas: '+ quienesmeg.length);
                } else if (quienesmeg.indexOf(email) >=0){     
                  colFeed.doc(id).update({quienesmeg: firebase.firestore.FieldValue.arrayRemove(email)});
                  $$('#libc'+selec).remove('<img id="libc'+selec+'" class="mgpost" src="img/libritoabierto.png" ></img>');
                  $$('#mg'+selec).append('<img id="libc'+selec+'" class="mgpost" src="img/libritocerrado.png" ></img>')
                  borrarmg=quienesmeg.indexOf(email);
                  quienesmeg.splice(borrarmg, 1);
                  var lenght = quienesmeg.length;
                  var setWithMerge = colFeed.doc(id).set({Megustas: quienesmeg.length,}, {merge: true});
                  console.log('cuanto tiene el lenght cuando eliminas: '+ lenght);
                  $$('#t'+selec).html('Megustas: '+ quienesmeg.length);
                }
              })
            })
            $$('#co'+selec).on('click', function(){
              // $$('#creabtn').remove();
              var comentt='';
              var quienn='';
              id=this.id;
              id = id.replace('co','');
      
              // $$('#creabtn').append(`<div id="c`+id+`" class="button button-fill btn1">
              // ¡Comentar!
              // </div>`)
      
              console.log('hiciste click en: '+ id);
              colFeed.doc(id).collection('Comentarios').get()
              .then(function(querySnapshot){
                querySnapshot.forEach(function(doc){
                  console.log('cuantas veces se repite el comentario y en donde: ' + doc.data().Comentario);
                    $$('#cajacoment3').append(`
                    <div id="cajacoment2">
                      <div class="paletcolor2" id="cajacoment">
                        <div class="paletcolor3">
                          <div class="block block-title">`+doc.data().Cuenta+` le comenta: </div>
                          <div><p>`+doc.data().Comentario+`</p></div>
                        </div>
                      </div>
                    </div>
                    `)
                })
              })
              // feedquien = $$('#n'+autor).html();
              // console.log('este es a quien le comentas: '+feedquien);
              $$('#cajacoment2').remove();
            })
            // funcion para dejar de seguir
            var aliminar ='';
            var elle='';
      
            $$('#elim'+nombre).on('click',function(){
              $$('#quienseguirrr').remove();
              console.log('entra en el onclick');
              console.log(arraysiguiendo);
              id= this.id;
              id= id.replace('elim', '');
              console.log(id);
              $$('#agperr').append(`
              <p id="quienseguirrr">`+id+`</p>
              `)
              $$('#quienseguirr').on('click',function(){
                colUsuarios.where("Nombre","==", id).get()
                .then(function(querySnapshot){
                  querySnapshot.forEach(function(doc){ 
                    elle= doc.data().Siguiendo;
                    id= doc.data().Cuenta;
                  })
                  console.log(elle);
                  var estanoseguir= elle.indexOf(email);
                  console.log('esta?: '+estanoseguir);
                  aliminar= elle[estanoseguir];
                  console.log('este eliminas ', aliminar );
                  elle.splice(estanoseguir, 1);
                  console.log(elle);
                  var setWithMerge = colUsuarios.doc(id).set({Siguiendo: elle,}, {merge: true}); 
                  $$('#elim'+nombre).remove();
                  mainView.router.navigate('/inicio/', {reloadCurrent: true})
                })
              })
      
            })            
          } else if (estoy == -1) {
            console.log('no toy')
          }
          })
        })

    })
  })
}
  // funcion para comentar el post
  var quecomentas='';
  $$('#comentas').on('click',function(){
    quecomentas=$$('#comentar').val();
    console.log('holaa apretas btn comentasr ' + quecomentas);
    datacoment= {
      Cuenta: email,
      Comentario: quecomentas,
    }
    colFeed.doc(id).collection('Comentarios').add(datacoment)
    .then(function(doc){
        $$('#cajacoment3').append(`
        <div id="cajacoment2">
        <div class="paletcolor2" id="cajacoment">
        <div class="paletcolor3">
        <div class="block block-title">`+email+` le comenta: </div>
        <div><p>`+quecomentas+`</p></div>
        </div>
        </div>
        </div>
      `)
      colFeed.doc(id).update({Comments: firebase.firestore.FieldValue.increment(1)});
      $$('#comentar').val('');
    })
  })
  // -----------------------------------------------------------
  // Se crea toda la lista de personas en la busqueda
  busc();
  cargarbusqueda2();
  async function cargarbusqueda2(){
    await colUsuarios.get()
    .then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        console.log("cuentas: " + doc.data().Nombre);
        todopers2.push(doc.data().Nombre);
        todopers = todopers2.filter((item,index) => { return todopers2.indexOf(item) === index} );
        busc();
    })
  })
  .catch(function (error){console.log('uy algo paso, ' + error)} )
 for (i=0; i<todopers.length; i++){
   $$('#buscarpers').append('<li class="item-content"><div class="item-inner"><div class="item-title"><a href="#" class="menu-item popover-open paletcolor2 text-color-black" data-view=".page-content" data-popover=".popo-seguir" id="leerpers'+i+'"><div class="menu-item-content">'+todopers[i]+'</div></a></div></div></li>');
   
   $$('#leerpers'+i).on('click', function(){
    $$('#quienseguirr').remove();
     id=this.id;
     var id2 = id.replace('leerpers', '');
     persona= todopers[id2];
     console.log('id de la persona: '+ persona);
     $$('#agper').append('<p id="quienseguirr">'+ persona +'</p>');

      $$('#quienseguir').on('click',function(){
        colUsuarios.where("Nombre","==", persona).get()
        .then(function(querySnapshot){
          querySnapshot.forEach(function(doc){ 
            var seguir= doc.id;
            arraysiguiendo = doc.data().Siguiendo;
            if (arraysiguiendo[0] == ""){
              arraysiguiendo= [];
            }
            console.log(seguir)
            arraysiguiendo.push(email);
            arraysiguiendo = arraysiguiendo.filter((item,index) => { return arraysiguiendo.indexOf(item) === index} );
            var setWithMerge = colUsuarios.doc(seguir).set({Siguiendo: arraysiguiendo,}, {merge: true}); 
            console.log('array de quienese seguis: ' + arraysiguiendo);
            mainView.router.navigate('/inicio/', {reloadCurrent: true})
          })
        })
      })
    })

}
}
  //-------------------------------------------------- 
  // esta funcion esta hecha para cuando posteas vos
  $$('#postear').on('click', function(){
    colUsuarios.where("Cuenta","==", email).get()
    .then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        imagen= doc.data().Img;
      })
    })
    $$('#cajacoment2').remove();
    const timestamp = Date.now();
    fechaa= timestamp;
    fechaa= 'a'+timestamp;
    selec=fechaa;
    coment= $$('#comentario').val();
    cont=0;
    Megustas=0;
    Compartidos=0;
    autor =email;
    autor = autor.replace('@','');
    autor = autor.replace('.','');
    quienesmeg=[];
    var datapost={
      Cuenta: email,
      Comentario: coment ,
      Megustas: Megustas,
      Comments: contm,
      Compartidos: contc,
      fechaPublicacion: fechaa,
      quienesmeg: [],
      Nombre: usuario,
    }
    colFeed.doc(fechaa).set(datapost)
    .then(function(doc) {
      $$('#posteos').append(`
      <div class="card demo-facebook-card">
      <div class="card-header">
        <div class="demo-facebook-avatar">
        <a id="clickperfil" href="#" >
          <img `+imagen+` width="34" height="34" />
        </a>
        </div>
        <div id="n`+autor+`" class="demo-facebook-name">`+email+`</div>
        <div class="demo-facebook-date">Recien</div>
      </div>
      <div class="card-content card-content-padding">
        <p>`+ coment +`.</p>
        
        <p id="cantm`+autor+`" class="likes">Megustas: `+Megustas+`</p> <p id="com`+autor+`"Commentarios: `+ contm+`</p>
      </div>
      <div class="card-footer">
      <a href="#" id="mgg`+selec+`" class="link"> <div id="t`+selec+`"> Megustas: `+mg+`  </div><img id="libcc`+selec+`" class="mgpost" src="img/libritocerrado.png" ></a>
      <div id="co`+selec+`" class="button link popup-open" href="#" data-popup=".comentario" >Comentarios `+comt+`</div>
      </div>
      </div>
      
      `)
      if (quienesmeg.indexOf(email) >=0 ){
        borrarmg=quienesmeg2.indexOf(email);
        $$('#libcc'+selec).remove('<img id="libcc'+selec+'" class="mgpost" src="img/libritocerrado.png" ></img>');
        $$('#mgg'+selec).append('<img id="libcc'+selec+'" class="mgpost"  src="img/libritoabierto.png" ></img>')
      }
      else if (quienesmeg.indexOf(email) == -1){
        $$('#libcc'+selec).remove('<img id="libcc'+selec+'" class="mgpost" src="img/libritoabierto.png" ></img>');
        $$('#libcc'+selec).remove('<img id="libcc'+selec+'" class="mgpost" src="img/libritocerrado.png" ></img>');
        $$('#mgg'+selec).append('<img id="libcc'+selec+'" class="mgpost" src="img/libritocerrado.png" ></img>');
      }

      // funcion para dar mg en el post de alguien
      $$('#mgg'+selec).on('click',function(){

        $$('#libcc'+selec).remove('<img id="libcc'+selec+'" class="mgpost" src="img/libritocerrado.png" ></img>');
        $$('#libcc'+selec).remove('<img id="libcc'+selec+'" class="mgpost" src="img/libritoabierto.png" ></img>');
         var id2=this.id;
        id = id2.replace('mg','');
        console.log('le das mg a: '+id)
        feedquien = $$('#n'+autor).html();

        colFeed.where("fechaPublicacion", "==", id).get()
        .then(function(querySnapshot){
          querySnapshot.forEach(function(doc){ 
            quienesmeg= doc.data().quienesmeg;
            Megustas= doc.data().Megustas;
            console.log('esta? : ' +quienesmeg.indexOf(email) );
          })
          var borrarmg=quienesmeg.indexOf(email);
          console.log('la posicion donde esta el que borras: '+ borrarmg);

          if (quienesmeg.indexOf(email)==-1){

            quienesmeg.push(email);
            quienesmeg = quienesmeg.filter((item,index ) =>{ return quienesmeg.indexOf(item) === index} );
            colFeed.doc(id).update({quienesmeg: firebase.firestore.FieldValue.arrayUnion(email)});
            $$('#libcc'+selec).remove('<img id="libcc'+selec+'" class="mgpost" src="img/libritocerrado.png" ></img>');
            $$('#mgg'+selec).append('<img id="libcc'+selec+'" class="mgpost"  src="img/libritoabierto.png" ></img>');
            var setWithMerge = colFeed.doc(selec).set({Megustas: quienesmeg.length,}, {merge: quienesmeg.length});

          } else if (quienesmeg.indexOf(email) >=0){ 

            colFeed.doc(id).update({quienesmeg: firebase.firestore.FieldValue.arrayRemove(email)});
            $$('#libcc'+selec).remove('<img id="libcc'+selec+'" class="mgpost" src="img/libritoabierto.png" ></img>');
            $$('#mgg'+selec).append('<img id="libcc'+selec+'" class="mgpost" src="img/libritocerrado.png" ></img>')
            borrarmg=quienesmeg.indexOf(email);      
            quienesmeg.splice(borrarmg, 1);           
            var lenght = quienesmeg.length;         
            var setWithMerge = colFeed.doc(selec).set({Megustas: lenght,}, {merge: true});

          }
          borrarmg=[];
        })
      })
      $$('#co'+selec).on('click', function(){
        var comentt='';
        var quienn='';
        id=this.id;
        id = id.replace('co','');
        console.log('hiciste click en: '+ id);
        colFeed.doc(id).collection('Comentarios').get()
        .then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
            console.log('cuantas veces se repite el comentario y en donde: ' + doc.data().Comentario);
            $$('#cajacoment3').append(`
              <div id="cajacoment2">
                <div class="paletcolor2" id="cajacoment">
                  <div class="paletcolor3">
                    <div class="block block-title">`+doc.data().Cuenta+` le comenta: </div>
                    <div><p>`+doc.data().Comentario+`</p></div>
                  </div>
                </div>
              </div>
            `)
          })
        })
        $$('#cajacoment2').remove();
      })
    })
  })
})                              
// funcion para comentar el post
$$('#comentas').on('click',function(){
  colFeed.doc(id).update({Comments: firebase.firestore.FieldValue.increment(1)});
  datacoment= {
    Cuenta: email,
    Comentario: $$('#comentar').val(),
  }
  var subcolComent= colFeed.doc(id).collection('Comentarios');      
  subcolComent.add(datacoment)
  .then(function(doc){
      $$('#cajacoment2').append(`
      <div class="paletcolor2" id="cajacoment">
      <div class="paletcolor3">
      <div class="block block-title">`+email+` le comenta: </div>
      <div><p>`+$$('#comentar').val()+`</p></div>
      </div>
      </div>
    `)
  })
})
$$(document).on('page:init', '.page[data-name="Tendencias"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log('Tendencias cargadas');
  $$('#inicio1').on('click', function(){
    mainView.router.navigate('/inicio/');
  })
  $$('#tendencia1').on('click', function(){
    mainView.router.navigate('/Tendencias/');
  })
  $$('#amigo1').on('click', function(){
    mainView.router.navigate('/Amigos/');
  })
  $$('#mensajeria1').on('click', function(){
    mainView.router.navigate('/Mensajeria/');
  })
  $$('#perfil').on('click', function(){
    mainView.router.navigate('/Perfil/');
  })
  $$('#crelib').on('click', function(){
    mainView.router.navigate('/Crear/');
  })
  $$('#tubiblio1').on('click', function(){
    mainView.router.navigate('/Tubiblioteca/');
  })
  $$('#buscar').on('click', function(){
    mainView.router.navigate('/Buscar/');
  })
})
$$(document).on('page:init', '.page[data-name="Leer"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log('Tendencias cargadas');
  $$('#Volver').on('click', function(){
    mainView.router.navigate('/Buscar/');
  })
})
$$(document).on('page:init', '.page[data-name="Buscar2]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log('Tendencias cargadas');
  mainView.router.navigate('/inicio/');

})


$$(document).on('page:init', '.page[data-name="Buscar"]', function (e) {
  function busc(){
    var searchbar = app.searchbar.create({
      el: '.searchbar',
      searchContainer: '.list',
      searchIn: '.item-title',
      on: {
        search(sb, query, previousQuery) {
          console.log(query, previousQuery);
        }
      }
    });
  }
  $$('#buscarlib').remove();

  $$('#buscadora').append('<ul id="buscarlib"> </ul>');

  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log('Buscar cargado');
  $$('#inicio1').on('click', function(){
    mainView.router.navigate('/inicio/');
  })
  $$('#tendencia1').on('click', function(){
    mainView.router.navigate('/Tendencias/');
  })
  $$('#amigo1').on('click', function(){
    mainView.router.navigate('/Amigos/');
  })
  $$('#mensajeria1').on('click', function(){
    mainView.router.navigate('/Mensajeria/');
  })
  $$('#perfil').on('click', function(){
    mainView.router.navigate('/Perfil/');
  })
  $$('#crelib').on('click', function(){
    mainView.router.navigate('/Crear/');
  })
  $$('#tubiblio1').on('click', function(){
    mainView.router.navigate('/Tubiblioteca/');
  })
  $$('#buscar').on('click', function(){
    mainView.router.navigate('/Buscar/');
  })
    // consulta a la BBDD para obtener todos los libros en la busqueda
    busc();
    cargarbusqueda();
   async function cargarbusqueda(){
      await colLibros.where("Publico","==","si").get()
            .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
              console.log("libros: " + doc.data().Libro);
              todolibs2.push(doc.data().Libro);
              todolibs = todolibs2.filter((item,index) => { return todolibs2.indexOf(item) === index} );
              })
            })
          .catch(function (error){console.log('uy algo paso, ' + error)} )
    // Se crea toda la lista de libros en la busqueda
    for (i=0; i<todolibs.length; i++){
      $$('#buscarlib').append('<li class="item-content"><div class="item-inner"><div class="item-title"><a href="#" class="menu-item paletcolor2 text-color-black" data-view=".page-content" id="leerbusc'+i+'"><div class="menu-item-content">'+todolibs2[i]+'</div></a></div></div></li>')    
      arraycaps2=[];
      $$('#leerbusc'+i).on('click', function(){
        mainView.router.navigate('/Leer/');
        id=this.id;
        var id2 = id.replace('leerbusc', '');
        aglib= todolibs[id2];
        var asd='';
        arraycontenido=[];
  
      // collection('Capitulos').where("Cuenta", "==", email).where("Libro", "==", indice ).where("Cap", "==", indice2).get()
      colLibros.where("Libro", "==", aglib).get()
      .then(function (querySnapshot){
        querySnapshot.forEach(function(doc) {
          autor= doc.data().Cuenta;
          aglib2=doc.data().Libro;
          $$('#autor').html("Autor/a: " + autor);
          $$('#busclib2').html(aglib);
          colLibros.doc(aglib).collection('Capitulos').where("Cuenta", "==", autor).where("Libro", "==", aglib ).get()
          .then(function (querySnapshot){
            querySnapshot.forEach(function(doc){
              agcap= doc.data().Cap;
              arraycaps2.push(agcap);
              arraycaps = arraycaps2.filter((item,index ) =>{ return arraycaps2.indexOf(item) === index} );
            })
            console.log(arraycaps);
            for(o=0; o<arraycaps.length; o++){
              id= arraycaps[o];
              console.log("capitulo 1: "+id[0] + arraycaps);
              colLibros.doc(aglib).collection('Capitulos').where("Cuenta", "==", autor).where("Libro", "==", aglib ).where("Cap", "==", id ).get()
              .then(function(querySnapshot){
                querySnapshot.forEach(function(doc){
                  var arraycontenido2 =[];
                  arraycontenido.push(doc.data().Contenido);
                  arraycontenido = arraycontenido.filter((item,index ) =>{ return arraycontenido.indexOf(item) === index} );
                  console.log("Array contenido + length: " + arraycontenido + arraycontenido.length);
                  $$('#lercap').html(doc.data().Contenido);
                })
              })
              $$('#busccap').append('<li><a id="otroolib'+o+'" href="#" class="item-content item-link item-selected "><div class="item-inner"><div class="item-title">'+id+'</div></div></a></li>');
              $$('#lertitle').text(id);
              $$('#otroolib'+ o).on('click', function() {
                // cambia el contenido del texto con este capitulo
                id=this.id;
                var id2 = id.replace('otroolib', '');
                $$('#lercap').html(arraycontenido[id2]);
              })
            }
          })
        })
      })
    })
  }
  }
})
$$(document).on('page:init', '.page[data-name="Amigos"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log('Amigos cargados');
  $$('#inicio1').on('click', function(){
    mainView.router.navigate('/inicio/');
  })
  $$('#tendencia1').on('click', function(){
    mainView.router.navigate('/Tendencias/');
  })
  $$('#amigo1').on('click', function(){
    mainView.router.navigate('/Amigos/');
  })
  $$('#mensajeria1').on('click', function(){
    mainView.router.navigate('/Mensajeria/');
  })
  $$('#perfil').on('click', function(){
    mainView.router.navigate('/Perfil/');
  })
  $$('#crelib').on('click', function(){
    mainView.router.navigate('/Crear/');
  })
  $$('#tubiblio1').on('click', function(){
    mainView.router.navigate('/Tubiblioteca/');
  })
  $$('#buscar').on('click', function(){
    mainView.router.navigate('/Buscar/');
  })

})
$$(document).on('page:init', '.page[data-name="Mensajeria"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log('Mensajeria cargado');


  $$('#inicio1').on('click', function(){
    mainView.router.navigate('/inicio/');
  })
  $$('#tendencia1').on('click', function(){
    mainView.router.navigate('/Tendencias/');
  })
  $$('#amigo1').on('click', function(){
    mainView.router.navigate('/Amigos/');
  })
  $$('#mensajeria1').on('click', function(){
    mainView.router.navigate('/Mensajeria/');
  })
  $$('#perfil').on('click', function(){
    mainView.router.navigate('/Perfil/');
  })
  $$('#crelib').on('click', function(){
    mainView.router.navigate('/Crear/');
  })
  $$('#tubiblio1').on('click', function(){
    mainView.router.navigate('/Tubiblioteca/');
  })
  $$('#buscar').on('click', function(){
    mainView.router.navigate('/Buscar/');
  })

})
$$(document).on('page:init', '.page[data-name="Perfil"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log('Perfil cargado');

  $$('#inicio1').on('click', function(){
    mainView.router.navigate('/inicio/');
  })
  $$('#tubiblio1').on('click', function(){
    mainView.router.navigate('/Tubiblioteca/');
  })
  colUsuarios.where("Cuenta","==",email).get()
  .then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
      imagen= doc.data().Img;
      console.log(imagen);
      $$('#clickimg').remove('<img id="clickimg" class="imgformaperfil" src="img/avatar1.jpg" ></img>');
      $$('#clickimg2').append('<img id="clickimg" class="imgformaperfil" '+imagen+' ></img>');
    })
  })

  for (i=0; i<=6; i++){
    $$('#imgp'+i).on('click', function(){
      id=this.id;
      var id2= id.replace('imgp', '');
      console.log(id);
      $$('#clickimg').remove('<img id="clickimg" class="imgformaperfil" src="img/avatar1.jpg" ></img>');
      var imagen= 'src="img/avatar'+id2+'.jpg"'
      var setWithMerge = colUsuarios.doc(email).set({Img: imagen ,}, {merge: true}); 
      $$('#clickimg2').append('<img id="clickimg" class="imgformaperfil" src="img/avatar'+id2+'.jpg" ></img>');
      colUsuarios.where("Cuenta","==",email).get()
      .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          imagen= doc.data().Img;
          console.log(imagen);
          $$('#clickimg').remove('<img id="clickimg" class="imgformaperfil" src="img/avatar1.jpg" ></img>');
          $$('#clickimg2').append('<img id="clickimg" class="imgformaperfil" '+imagen+' ></img>');
          mainView.router.navigate('/Perfil/', {reloadCurrent: true})
        })
      })
    })
  }

  var cuenta = '';
  var nombre = '';
  var libros = '';
  var aquienseguis = '';
  console.log(email)
  colUsuarios.where("Cuenta","==", email).get()
  .then(function (querySnapshot){
    querySnapshot.forEach(function(doc){
        cuenta = doc.data().Cuenta;
        libros = doc.data().Libros;
        nombre = doc.data().Nombre;
        aquienseguis = doc.data().Siguiendo;
       console.log(aquienseguis)
       $$('#tuemail').html('Tu email: ' + cuenta);
       $$('#tunom').html('Tu nombre: ' + nombre);
       $$('#tuslibros').html('Tus libros: ' + libros);
       for(i=0; i<aquienseguis.lenght; i++){
         $$('#aquiens').append('<li> <div class="button button-outline popover-open" data-view=".page-content" data-popover=".popo-noseguirr" id="seguisa'+i+'">'+ i+'</div></li>');
         $$('#seguisa'+i).on('click', function(){
           elle=[];
           id= this.id;
           id= id.replace('seguisa', '');
           console.log(id);
           colUsuarios.where("Nombre","==", id).get()
           .then(function(querySnapshot){
             querySnapshot.forEach(function(doc){ 
               elle= doc.data().Siguiendo;
               id= doc.data().Cuenta;
             })
           })
           .catch(function (error){console.log('uy algo paso, ' + error)} );
       
             $$('#quienseguirrr').on('click',function(){
               console.log(elle);
               var estanoseguir= elle.indexOf(email);
               console.log('esta?: '+estanoseguir);
               aliminar= elle[estanoseguir];
               console.log('este eliminas ', aliminar );
               elle.splice(estanoseguir, 1);
               console.log(elle);
               var setWithMerge = colUsuarios.doc(id).set({Siguiendo: elle,}, {merge: true}); 
             })
             $$('#noseguirrr').on('click',function(){
               
             })
         })
       } 
    })
  
  })
  })



$$(document).on('page:init', '.page[data-name="Opciones"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log('opciones listas');

  $$('#inicio1').on('click', function(){
    mainView.router.navigate('/inicio/');
  })

})

$$(document).on('page:init', '.page[data-name="Tubiblioteca"]', function (e) {
  console.log('crear cargado');
  colFeed.get()
  .then(function(querySnapshot){
    querySnapshot.forEach(function(doc){}
    )})
  $$('#inicio1').on('click', function(){
    mainView.router.navigate('/inicio/');
  })
  $$('#tendencia1').on('click', function(){
    mainView.router.navigate('/Tendencias/');
  })
  $$('#amigo1').on('click', function(){
    mainView.router.navigate('/Amigos/');
  })
  $$('#mensajeria1').on('click', function(){
    mainView.router.navigate('/Mensajeria/');
  })
  $$('#perfil').on('click', function(){
    mainView.router.navigate('/Perfil/');
  })
  $$('#crelib').on('click', function(){
    mainView.router.navigate('/Crear/');
  })
  $$('#tubiblio1').on('click', function(){
    mainView.router.navigate('/Tubiblioteca/');
  })
  $$('#buscar').on('click', function(){
    mainView.router.navigate('/Buscar/');
  })
  $$('.popover-about').on('popover:open', function (e) {
    
  });
  $$('.popover-about').on('popover:opened', function (e) {
    
  });

  biblioteca();
  async function biblioteca () {
    await colLibros.where("Cuenta", "==" , email).get()
    .then(function (onSnapshot){
      onSnapshot.forEach(function(doc) {
        arraylibs.push(doc.data().Libro);
        arraylibs2 = arraylibs.filter((item,index ) =>{ return arraylibs.indexOf(item) === index} )
      })
      // ESTE BLOQUE LO QUE HACE ES TRAER DE LA BBDD TODOS LOS LIBROS QUE UNO TENGA
      // console.log("email: " +usuario);
    });
    for (i=0; i<arraylibs2.length; i++){        
      $$('#crearcard').append('<div class="card demo-card-header-pic"><div style="background-color: #282940;"class="card-header align-items-flex-end"></div><div class="card-content card-content-padding"><p id="desk'+i+'" class="date"></p><p id="b'+i+'"></p></div><div class="card-footer"><div id="e'+i+'" value="'+i+'" data-popup=".otropopup" class=" popup-open abrire button button-outline btn2"> Ver </div> <div id="l'+i+'"data-popup=".my-popup" class="popup-open button button-outline btn2"> + Cap </div><div id="p'+i+'"data-popover=".popover-about" class="button button-outline btn2 popover-open">public/priv</div></div>');
      $$('#desk'+i).text("Libro: " + arraylibs2[i]); //<---- Nombre del libro
      $$('#b'+i).text('');  //<----Descripcion
     
      $$('#e'+i).on('click',function(){
        $$('#estecap').html('');
        $$('#leercap').html('');
        noveredit();
        noverdelete();
        id = this.id;
        var id2 = id.replace('e', '');
        indice = arraylibs2[id2];
        $$('#quelib').text('Libro: '+ indice);
        aglib=indice;
        $$('#estelib').html(aglib);
        $$('#borrarl').text('Borrar libro: '+aglib);
        var arraycaps=[];
        var arraycaps2=[];
        pagina='';
       
        colLibros.doc(indice).collection('Capitulos').where("Cuenta", "==", email).where("Libro", "==", indice ).get()
        .then(function (querySnapshot){
          querySnapshot.forEach(function(doc) {
            console.log("Capitulo: " + doc.data().Cap);
            arraycaps.push(doc.data().Cap);
            arraycaps2 = arraycaps.filter((item,index ) =>{ return arraycaps.indexOf(item) === index} );
            cont+=1;
            $$('#xx').append('<li class="opcap"><a id="ecap'+cont+'" href="#" class="item-content item-link item-selected "><div class="item-inner"><div class="item-title">'+doc.data().Cap+'</div></div></a></li>');
            
            $$('#ecap'+cont).on('click', function(){
              id= this.id;
              var id2 = id.replace('ecap', '');
              var indice2 = arraycaps2[id2];
              console.log(arraycaps2 + 'Apretaste el cap: '+ indice2 );
              agcap=indice2;
              $$('#estecap').html(agcap);
              $$('#borrarc').text('Borrar capitulo: '+agcap);
              //

              colLibros.doc(indice).collection('Capitulos').where("Cuenta", "==", email).where("Libro", "==", indice ).where("Cap", "==", indice2).get()
              .then(function (querySnapshot){
                querySnapshot.forEach(function(doc) {
                  console.log("Capitulo: " + doc.data().Contenido);
                  pagina= doc.data().Contenido;
                  console.log('esto es lo que vas a editar:  ' + pagina);
                  $$('#pageditt2').html(pagina);
                  paginaeditada= $$('#pageditt2').html();
                  console.log('esto es lo que editas:  ' + paginaeditada);

                })

                $$('#btnlee').on('click', function(){
                  if ($$('#estecap').html() == ''){
                    app.dialog.alert('¡Selecciona un capitulo para leer!')
                  } else {
                    $$('#leercap').html(pagina);
                    noverdelete();
                    noveredit();
                  }
                })

              })
              //
            })
          });
        })
        .catch(function (error){console.log('uy algo paso, ' + error)} );
        $$('.opcap').remove();
        cont=-1;
        console.log(aglib);
      })
      $$('#p'+i).on('click', function(){    
        id = this.id;
        var id2 = id.replace('p', '');
        indice = arraylibs2[id2];
        aglib=indice;
        console.log('seleccionaste este id: '+ aglib);
        $$('#publiclib').html(aglib);
        $$('#publicsi').on('click',function(){
          datapublic={
            Cuenta: email,
            Libro: aglib,
            Tema: "cualquiera", 
            Publico: 'si',
          }
          colLibros.doc(aglib).set(datapublic)
          .then(function(){
            app.dialog.alert('¡Listo! Tu libro se hizo publico. ')    
            $$('#buscarlib').remove();
            todolibs2=[];
          })
        })
        $$('#publicno').on('click',function(){
          datapublic={
            Cuenta: email,
            Libro: aglib,
            Tema: "cualquiera", 
            Publico: 'no',
          }
          colLibros.doc(aglib).set(datapublic)
          .then(function(){
            app.dialog.alert('¡Listo! Tu libro es privado.')
            $$('#buscarlib').remove();
            todolibs2=[];
          })
        })
      })
      //funcion para agregar capitulos al libro en la biblioteca
      $$('#l'+i).on('click', function(){
        var nuevocap =''
        var nuevocont ='';
        id = this.id;
        var id2 = id.replace('l', '');
        indice = arraylibs2[id2];
        aglib=indice;
        console.log('seleccionaste este id: '+ id + aglib);
        $$('#quelib3').text('Libro: '+ indice);
        $$('#agnuevoc').on('click', function(){
           nuevocap =$$('#quecap3').val();
           nuevocont =$$('#pageditt3').html();
          console.log('asdafsd'+nuevocap + nuevocont);
          if (nuevocap == ''){
            app.dialog.alert('¡Ingresa un nombre para tu nuevo capitulo!')
            console.log('escrito en el bloque blanco: '+ nuevocont);
          }else if (nuevocont == '<br>'){
            app.dialog.alert('¡Ingresa un contenido para tu capitulo!')
          }else{
            var datacap= {
              Cuenta: email, 
              Libro: aglib, 
              Cap: nuevocap,
              Contenido: nuevocont,}
            var subcolCaps= colLibros.doc(aglib).collection('Capitulos').doc(nuevocap);      
            subcolCaps.set(datacap)
            .then(function(doc){
              app.dialog.alert('¡Listo! ¡Se agrego un nuevo contenido a tu capitulo!')
              mainView.router.navigate('/Tubiblioteca/', {reloadCurrent: true})
            })
            .catch(function(error){
            console.log("uy, no se pudo " + error);
          })
          }
        })
      })
      //
    }
    $$('#btnborrar').on('click',function(){
      noveredit();
      $$('#leercap').html('');
      if($$('#borrarc').html() == ''){
        app.dialog.alert('Selecciona un capitulo primero')
      }else {
        verdelete();
        noveredit();
      }
    })
    $$('#cancelarb').on('click',function(){
      noverdelete();
    })
    $$('#borrarc').on('click', function(){
      console.log('Borrar capitulo: ' + agcap);
      if ($$('#estecap').html() == '' ) {
        app.dialog.alert('¡Selecciona el cap. a borrar!');
      }else {
        colLibros.doc(aglib).collection('Capitulos').doc(agcap).delete()
        .then(function(){
          console.log('¡Listo!')
        })
        .catch(function(error){
          console.error(error);
        })
      }
    })
    $$('#borrarl').on('click', function(){
      console.log('Borrar libro: ' + aglib);
      colLibros.doc(aglib).delete()
      .then(function(){
        console.log('¡Listo!')
      })
      .catch(function(error){
        console.error(error);
      })
  
    })
  
    $$('#btnedit').on('click', function(){
      $$('#leercap').html('');
      veredit();
      noverdelete();
  
    })
    $$('#editp2').on('click', function(){
      noveredit();
    });
    $$('#editp3').on('click', function(){
      paginaeditada= $$('#pageditt2').html();
      noveredit();
        var datacap= {
          Cuenta: email, 
          Libro: aglib, 
          Cap: agcap,
          Contenido: paginaeditada,}
          console.log('Esto le editas al capitulo : '+ paginaeditada);
          console.log('Esto son los otros valores, cuenta : '+ email + ' Libro : ' + aglib + ' Cap : ' + agcap );
        var subcolCaps= colLibros.doc(aglib).collection('Capitulos').doc(agcap);      
        subcolCaps.set(datacap);
        app.dialog.alert('¡Listo!')
      });
  
  
    function verdelete(){
      $$('#borrarl').removeClass('novisible');
      $$('#borrarl').addClass('visible');
      $$('#borrarc').removeClass('novisible');
      $$('#borrarc').addClass('visible');
      $$('#cancelarb').removeClass('novisible');
      $$('#cancelarb').addClass('visible');
    }
    function noverdelete(){
      $$('#borrarl').removeClass('visible');
      $$('#borrarl').addClass('novisible');
      $$('#borrarc').removeClass('visible');
      $$('#borrarc').addClass('novisible');
      $$('#cancelarb').removeClass('visible');
      $$('#cancelarb').addClass('novisible');
    }
    function veredit(){
      $$('#editp').removeClass('novisible');
      $$('#editp').addClass('visible');
      $$('#editp2').removeClass('novisible');
      $$('#editp2').addClass('visible');
      $$('#editp3').removeClass('novisible');
      $$('#editp3').addClass('visible');
    };
    function noveredit(){
      $$('#editp').removeClass('visible');
      $$('#editp').addClass('novisible');
      $$('#editp2').removeClass('visible');
      $$('#editp2').addClass('novisible');
      $$('#editp3').removeClass('visible');
      $$('#editp3').addClass('novisible');
    }
  }

})


$$(document).on('page:init', '.page[data-name="Crear"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log('crear cargado');
  $$("#btnc").on('click', function(){
    $$("btnc").addClass("item-selected");
    $$("#btnmis").removeClass("item-selected");
  })
  $$("#btnmis").on('click', function(){
    $$("btnc").removeClass("item-selected");
    $$("#btnmis").addClass("item-selected");
  })
  $$('#inicio1').on('click', function(){
    mainView.router.navigate('/inicio/');
  })
  $$('#tendencia1').on('click', function(){
    mainView.router.navigate('/Tendencias/');
  })
  $$('#amigo1').on('click', function(){
    mainView.router.navigate('/Amigos/');
  })
  $$('#mensajeria1').on('click', function(){
    mainView.router.navigate('/Mensajeria/');
  })
  $$('#perfil').on('click', function(){
    mainView.router.navigate('/Perfil/');
  })
  $$('#crelib').on('click', function(){
    mainView.router.navigate('/Crear/');
  })
  $$('#tubiblio1').on('click', function(){
    mainView.router.navigate('/Tubiblioteca/');
  })
  $$('#buscar').on('click', function(){
    mainView.router.navigate('/Buscar/');
  })


  $$('#vis').on('click', function(){
    $$('#quelib').html('');
    $$('#quecap').html('');
    if ($$('#lista4').val() == 0 || $$('#lista4').val() =='') {
      app.dialog.alert('Por favor, crea o selecciona el nombre de tu libro');
    } else if ($$('#lista').val() == 0 || $$('#lista').val() =='') {
      app.dialog.alert('Por favor, crea o selecciona el nombre de tu capitulo');
    }else {
      $$('#vis').addClass('popup-open');
      $$('#previs').addClass('paletcolor1');
      if ($$('#pagcrea').html() == ''){
        app.dialog.alert('¡¡No escribiste nada en tu pagina!!')
      } else{
        pagina=$$('#pagcrea').html();
      }
      console.log(' libro '+libs + '  ' + ' capitulos '+caps);
      $$('#quelib').append('Libro :'+ aglib);
      $$('#quecap').append('Capitulo :'+ caps);
      // console.log(pagina);
      $$('#pre1').html(pagina);
    }
  })
  $$('#mascap').on('click', function(){
    // if ($$('#lista4').val() == 0 || $$('#lista4').val() =='') {
    //   app.dialog.alert('Por favor, crea el nombre de tu libro');
    //   $$('#vis').removeClass('popup-open');
    if (aglib==0) {
      app.dialog.alert('Por favor, crea el nombre de tu libro');
      $$('#vis').removeClass('popup-open');
    }else {
      $$('#vercap').removeClass("novisible");
      $$('#vercap').addClass("visible");
      $$('#vis').addClass('popup-open');
    }
  })
  $$('#novercap').on('click', function(){
    $$('#vercap').removeClass("visible");
    $$('#vercap').addClass("novisible");
  })


  $$('#nomcap2').on('click', () =>{
    // if ($$('#lista4').val() == 0 || $$('#lista4').val() =='') {
    //   app.dialog.alert('Por favor, crea el nombre de tu libro');
    if (aglib== 0) {
      app.dialog.alert('Por favor, crea el nombre de tu libro');
    };
    if ($$('#nomcap').val()=="") {
      app.dialog.alert('Agrega un nombre a tu capitulo');}
      else {
        $$('#vis').addClass('popup-open');
        agcap=$$('#nomcap').val();
        // console.log(agcap , agcap2);
        esta = agcap2.indexOf(agcap);
        // console.log(agcap2.indexOf(agcap));
        if (esta != -1 ){
          app.dialog.alert('El nombre: "'+ agcap +'" ya existe en tus capitulos')
        } else {
          agcap2.push(agcap);
          
          caps+=1;
          $$('#lista').value(caps);
          $$('#tucapitulo').text(agcap);
          // $$('#lista').append('<option value='+caps+'><a href="#"> Capitulo: '+ caps +' '+ agcap +'</a></option>');
          $$('#lista2').removeClass('novisible');
          $$('#lista2').addClass('visible');
          $$('#textolibb').removeClass('novisible');
          $$('textolibb').addClass('visible');
        }
      }
      $$('#nomcap').val('');
    })
  $$('#lista').on('change', () =>{
    caps = parseInt($$('#lista').val());
    console.log('opcion capitulo: ' + caps +'nombre del capitulo: ' + agcap);
    if ($$('#lista').val() == 0 || $$('#lista').val() =='') {
      $$('#vis').removeClass('popup-open');
    } else {
      $$('#vis').addClass('popup-open');
    }
  })

  // AGREGAMOS EL LIBRO A LA BIBLIOTECA
  $$('#maspag').on('click',() =>{
    console.log(libs);
    if (pagina == ' '){
      console.log(pagina);
      app.dialog.alert('¡¡No hay nada escrito en la pagina!!')
    }else{
      libs=1;
      app.dialog.alert('¡Listo! esta pagina se guardara en tu biblioteca, ¡podras seguir editandolo cuando quieras!')
      
      var datalibro={
        Cuenta: email,
        Tema: "cualquiera",
        Libro: aglib,
        Publico: "no",
      }
      var datacap= {
        Cuenta: email, 
        Libro: aglib, 
        Cap: agcap,
        Contenido: pagina,}


      colLibros.doc(aglib).set(datalibro)
      .then(function(docRef) {
        var subcolCaps= colLibros.doc(aglib).collection('Capitulos').doc(agcap);      
        subcolCaps.set(datacap)
      })
      .catch(function(error){
        console.log("uy, no se pudo " + error);
      })
      var subcolCaps= colLibros.doc(aglib).collection('Capitulos').doc(agcap); 
      subcolCaps.update({pagina})
      .then(() => {console.log('se actualizo a: ' + pagina)})
      .catch(function (error){console.log('uy algo paso, ' + error)} )
    }
    colUsuarios.doc(email).update({Libros : firebase.firestore.FieldValue.increment(1)});
  })


  $$('#maslib').on('click', () => {
    $$('#verlib').removeClass("novisible");
    $$('#verlib').addClass("visible");

  })

  $$('#noverlib').on('click', function(){
    $$('#verlib').removeClass("visible");
    $$('#verlib').addClass("novisible");
  })


  $$('#nomlib2').on('click', () =>{
    if ($$('#nomlib').val()=="") {
      app.dialog.alert('Agrega un nombre a tu libro');}
      else {
        aglib=$$('#nomlib').val();
        // console.log(aglib , aglib2);
        esta = aglib2.indexOf(aglib);
        if (esta != -1 ){
          app.dialog.alert('El nombre: "'+ aglib +'" ya existe en tus libros')
        } else {
          aglib2.push(aglib);
          $$('#tulibro').text(aglib);
          $$('#lista3').removeClass('novisible');
          $$('#lista3').addClass('visible');
        }
      }
      $$('#nomlib').val('');
    })
    $$('#lista4').on('change', () =>{
      libs = parseInt($$('#lista4').val());
      console.log('opcion libro: ' + libs + 'nombre del libro: ' + aglib);
      if ($$('#lista4').val() == 0 || $$('#lista4').val() =='') {
        $$('#vis').removeClass('popup-open');
      }else {
        $$('#vis').addClass('popup-open');
      }
    })

    $$('#sellib').on('click', () =>{
      selecl=$$('#lista').val(); 
    })
    $$('#selcap').on('click', () =>{
      selec=$$('#b'+caps).val();
    })

  $$('#borrarpag').on('click', function(){
    $$('#pagcrea').html("");
  })
})