  // funcion para comentar el post
  $$('#cm'+selec).on('click', function(){
    var id2=this.id;
    id = id2.replace('cm','');
    colFeed.doc(selec).collection('Comentarios').doc(feedquien).get()
    .then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        // $$('#cajacoment2').append(`
        //   <div class="paletcolor2" id="cajacoment">
        //   <div class="paletcolor3">
        //   <div class="block block-title">`+email+` le comenta: </div>
        //   <div><p>`+coment+`</p></div>
        //   </div>
        //   </div>
        //   `)
      })
    })
    feedquien = $$('#n'+autor).html();
    console.log('este es a quien le comentas: '+feedquien);
    $$('#comentas').on('click',function(){
      colFeed.doc(selec).where("Cuenta","==", feedquien).update({Comments: firebase.firestore.FieldValue.increment(1)});
      datacoment= {
        Cuenta: email,
        Comentario: $$('#comentar').val(),
      }
      var subcolComent= colFeed.doc(selec).collection('Comentarios').doc(feedquien);      
      subcolComent.set(datacoment)
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
  })



        // $$('#comentas').on('click',function(){
      //   feedquien = $$('#n'+autor).html();
      //   console.log('este es a quien le comentas: '+feedquien);
      //   colFeed.doc(id).update({Comments: firebase.firestore.FieldValue.increment(1)});
      //   datacoment= {
      //     Cuenta: email,
      //     Comentario: $$('#comentar').val(),
      //   }
      //   var subcolComent= colFeed.doc(id).collection('Comentarios').doc(feedquien);      
      //   subcolComent.set(datacoment)
      //   .then(function(doc){
      //     $$('#cajacoment2').append(`
      //     <div class="paletcolor2" id="cajacoment">
      //     <div class="paletcolor3">
      //     <div class="block block-title">`+email+` le comenta: </div>
      //     <div><p>`+$$('#comentar').val()+`</p></div>
      //     </div>
      //     </div>
      //     `)
      //   })
      // })









































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
        datos={ Nombre: usuario,
        Libros: 0,
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
          app.alert('Por favor complete el formulario para el registro')
        })
})
$$(document).on('page:init', '.page[data-name="inicio"]', function (e) {
  // Crea el feed en el inicio
  colFeed.get()
  .then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
      // cargamos las variables para crear el post correspondiente
      cargadefeed();
      function cargadefeed(){

        var coment=doc.data().Comentario;
        var mg= doc.data().Megustas;
        var comt=doc.data().Comments;
        var shares= doc.data().Compartidos;
        var author = doc.data().Cuenta;
        var sabercual= doc.data().fechaPublicacion;
        quienesmeg = doc.data().quienesmeg;
        console.log(quienesmeg2)
        // if (quienesmegg  == email)
        author = author.replace('@','');
        author = author.replace('.','');
        // append para el posteo 
        $$('#posteos').append(`
        <div class="card demo-facebook-card">
        <div class="card-header">
          <div class="demo-facebook-avatar">
          <a id="clickperfil" href="#" >
            <img src="img/avatar1.jpg" width="34" height="34" />
          </a>
          </div>
          <div id="n`+author+`" class="demo-facebook-name">`+doc.data().Cuenta+`</div>
          <div class="demo-facebook-date">Recien</div>
        </div>
        <div class="card-content card-content-padding">
          <p>`+ coment +`.</p>
          
        </div>
        <div class="card-footer"><a href="#" id="mg`+sabercual+`" class="link">    `+mg+`<img id="libc`+sabercual+`" class="mgpost" src="img/libritocerrado.png" ></a><a href="#" id="cm`+author+`" class="link popup-open" href="#" data-popup=".comentario">Comentarios `+comt+`</a>
        </div>
      </div>
        `)
        if (quienesmeg.indexOf(email) >=0 ){
          borrarmg=quienesmeg2.indexOf(email);
          console.log(borrarmg)
          $$('#libc'+sabercual).remove('<img id="libc'+sabercual+'" class="mgpost" src="img/libritocerrado.png" ></img>');
          $$('#mg'+sabercual).append('<img id="libc'+sabercual+'" class="mgpost"  src="img/libritoabierto.png" ></img>')
        }
        else if (quienesmeg.indexOf(email) == -1){
          $$('#libc'+sabercual).remove('<img id="libc'+sabercual+'" class="mgpost" src="img/libritoabierto.png" ></img>');
          $$('#libc'+sabercual).remove('<img id="libc'+sabercual+'" class="mgpost" src="img/libritocerrado.png" ></img>');
          $$('#mg'+sabercual).append('<img id="libc'+sabercual+'" class="mgpost" src="img/libritocerrado.png" ></img>');
        }
        console.log(quienesmeg.indexOf(email));
        
        // funcion para dar mg en el post de alguien
        $$('#mg'+sabercual).on('click',function(){
          $$('#libc'+sabercual).remove('<img id="libc'+sabercual+'" class="mgpost" src="img/libritocerrado.png" ></img>');
          $$('#libc'+sabercual).remove('<img id="libc'+sabercual+'" class="mgpost" src="img/libritoabierto.png" ></img>');
           var id2=this.id;
          id = id2.replace('mg','');
          console.log('le das mg a: '+id)
          feedquien = $$('#n'+author).html();
  
          colFeed.where("fechaPublicacion", "==", id).get()
          .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){ 
              quienesmeg= doc.data().quienesmeg;
              console.log('esta? : ' +quienesmeg.indexOf(email) );
            })
            var borrarmg=quienesmeg.indexOf(email);
            console.log('la posicion donde esta el que borras: '+ borrarmg);
            if (quienesmeg.indexOf(email)==-1){
              quienesmeg.push(email);
              quienesmeg = quienesmeg.filter((item,index ) =>{ return quienesmeg.indexOf(item) === index} );
              console.log(quienesmeg);
              colFeed.doc(id).update({quienesmeg: firebase.firestore.FieldValue.arrayUnion(email)});
              $$('#libc'+sabercual).remove('<img id="libc'+sabercual+'" class="mgpost" src="img/libritocerrado.png" ></img>');
              $$('#mg'+sabercual).append('<img id="libc'+sabercual+'" class="mgpost"  src="img/libritoabierto.png" ></img>');
              var setWithMerge = colFeed.doc(sabercual).set({Megustas: quienesmeg.length,}, {merge: quienesmeg.length});
            } else if (quienesmeg.indexOf(email) >=0){
              borrarmg=quienesmeg.indexOf(email);
              console.log(quienesmeg[borrarmg]);
              quienesmeg = quienesmeg.filter((item,index ) =>{ return quienesmeg.indexOf(item) === index} );
              console.log(quienesmeg);
              colFeed.doc(id).update({quienesmeg: firebase.firestore.FieldValue.arrayRemove(email)});
              $$('#libc'+sabercual).remove('<img id="libc'+sabercual+'" class="mgpost" src="img/libritoabierto.png" ></img>');
              $$('#mg'+sabercual).append('<img id="libc'+sabercual+'" class="mgpost" src="img/libritocerrado.png" ></img>')
              var setWithMerge = colFeed.doc(sabercual).set({Megustas: quienesmeg.length,}, {merge: quienesmeg.length});
              borrarmg=[];
            }
          })
        })
        // funcion para comentar el post
        $$('#cm'+author).on('click', function(){
          $$('#cajacoment').remove();
          colFeed.doc(sabercual).collection('Comentarios').get()
          .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
            $$('#cajacoment2').append(`
            <div class="paletcolor2" id="cajacoment">
            <div class="paletcolor3">
            <div class="block block-title">`+doc.data().Cuenta+` le comenta: </div>
            <div><p>`+doc.data().Comentario+`</p></div>
            </div>
            </div>
            `)
          })
        })
          feedquien = $$('#n'+author).html();
          console.log('este es a quien le comentas: '+feedquien);
          id=this.id;
          console.log(id);
          $$('#comentas').on('click',function(){
            colFeed.doc(sabercual).update({Comments: firebase.firestore.FieldValue.increment(1)});
            datacoment= {
              Cuenta: email,
              Comentario: $$('#comentar').val(),
            }
            var subcolComent= colFeed.doc(sabercual).collection('Comentarios').doc($$('#comentar').val());      
            subcolComent.set(datacoment)
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
            .catch(function(error){
            console.log("uy, no se pudo " + error);})
          })
        })

      }

    })
  })
  .catch(function (error){console.log('uy algo paso, ' + error)} );
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
  // -----------------------------------------------------------
      // esta funcion esta hecha para cuando posteas vos
      $$('#postear').on('click', function(){
        const timestamp = Date.now();
        fechaa= timestamp;
        fechaa= 'a'+timestamp;
        sabercual=fechaa;
        coment= $$('#comentario').val();
        cont=0;
        Megustas=0;
        Compartidos=0;
        author =email;
        author = autor.replace('@','');
        author = autor.replace('.','');
        quienesmeg=[];
        var datapost={
          Cuenta: email,
          Comentario: coment ,
          Megustas: Megustas,
          Comments: contm,
          Compartidos: contc,
          fechaPublicacion: fechaa,
          quienesmeg: [],
        }

    colFeed.doc(fechaa).set(datapost)
    .then(function(doc) {
      


      $$('#posteos').append(`
      <div class="card demo-facebook-card">
      <div class="card-header">
        <div class="demo-facebook-avatar">
        <a id="clickperfil" href="#" >
          <img src="img/avatar1.jpg" width="34" height="34" />
        </a>
        </div>
        <div id="n`+author+`" class="demo-facebook-name">`+email+`</div>
        <div class="demo-facebook-date">Recien</div>
      </div>
      <div class="card-content card-content-padding">
        <p>`+ coment +`.</p>
        
        <p id="cantm`+author+`" class="likes">Megustas: `+Megustas+`</p> <p id="com`+author+`"Commentarios: `+ contm+`</p>
      </div>
      <div class="card-footer"><a href="#" id="mg`+sabercual+`" class="link"><img id="libc`+sabercual+`" class="mgpost" src="img/libritocerrado.png" ></a><a href="#" id="cm`+author+`" class="link popup-open" href="#" data-popup=".comentario">Comentarios</a><a href="#"
          class="link">compartir</a></div>
    </div>
      `)
      if (quienesmeg.indexOf(email) >=0 ){
        borrarmg=quienesmeg2.indexOf(email);
        console.log(borrarmg)
        $$('#libc'+sabercual).remove('<img id="libc'+sabercual+'" class="mgpost" src="img/libritocerrado.png" ></img>');
        $$('#mg'+sabercual).append('<img id="libc'+sabercual+'" class="mgpost"  src="img/libritoabierto.png" ></img>')
      }
      else if (quienesmeg.indexOf(email) == -1){
        $$('#libc'+sabercual).remove('<img id="libc'+sabercual+'" class="mgpost" src="img/libritoabierto.png" ></img>');
        $$('#libc'+sabercual).remove('<img id="libc'+sabercual+'" class="mgpost" src="img/libritocerrado.png" ></img>');
        $$('#mg'+sabercual).append('<img id="libc'+sabercual+'" class="mgpost" src="img/libritocerrado.png" ></img>');
      }
      // funcion para dar mg en el post de alguien
      $$('#mg'+sabercual).on('click',function(){

        $$('#libc'+sabercual).remove('<img id="libc'+sabercual+'" class="mgpost" src="img/libritocerrado.png" ></img>');
        $$('#libc'+sabercual).remove('<img id="libc'+sabercual+'" class="mgpost" src="img/libritoabierto.png" ></img>');
         var id2=this.id;
        id = id2.replace('mg','');
        console.log('le das mg a: '+id)
        feedquien = $$('#n'+author).html();

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
            console.log(quienesmeg);
            colFeed.doc(id).update({quienesmeg: firebase.firestore.FieldValue.arrayUnion(email)});
            $$('#libc'+sabercual).remove('<img id="libc'+sabercual+'" class="mgpost" src="img/libritocerrado.png" ></img>');
            $$('#mg'+sabercual).append('<img id="libc'+sabercual+'" class="mgpost"  src="img/libritoabierto.png" ></img>');
            var setWithMerge = colFeed.doc(sabercual).set({Megustas: quienesmeg.length,}, {merge: quienesmeg.length});
          } else if (quienesmeg.indexOf(email) >=0){
            // borrarmg=quienesmeg.indexOf(email);
            console.log(quienesmeg[borrarmg]);
            // quienesmeg = quienesmeg.filter((item,index ) =>{ return quienesmeg.indexOf(item) === index} );
            console.log(quienesmeg);
            colFeed.doc(id).update({quienesmeg: firebase.firestore.FieldValue.arrayRemove(email)});
            $$('#libc'+sabercual).remove('<img id="libc'+sabercual+'" class="mgpost" src="img/libritoabierto.png" ></img>');
            $$('#mg'+sabercual).append('<img id="libc'+sabercual+'" class="mgpost" src="img/libritocerrado.png" ></img>')
            var setWithMerge = colFeed.doc(sabercual).set({Megustas: quienesmeg.length,}, {merge: quienesmeg.length});
            borrarmg=[];
          }
        })
      })
      // funcion para comentar el post
      $$('#cm'+author).on('click', function(){
        $$('#cajacoment').remove();
        colFeed.doc(sabercual).collection('Comentarios').get()
        .then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
          $$('#cajacoment2').append(`
          <div class="paletcolor2" id="cajacoment">
          <div class="paletcolor3">
          <div class="block block-title">`+doc.data().Cuenta+` le comenta: </div>
          <div><p>`+doc.data().Comentario+`</p></div>
          </div>
          </div>
          `)
        })
      })
        feedquien = $$('#n'+author).html();
        console.log('este es a quien le comentas: '+feedquien);
        id=this.id;
        console.log(id);
        $$('#comentas').on('click',function(){
          colFeed.doc(sabercual).update({Comments: firebase.firestore.FieldValue.increment(1)});
          datacoment= {
            Cuenta: email,
            Comentario: $$('#comentar').val(),
          }
          var subcolComent= colFeed.doc(sabercual).collection('Comentarios').doc($$('#comentar').val());      
          subcolComent.set(datacoment)
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
          .catch(function(error){
          console.log("uy, no se pudo " + error);})
        })
      })




    })
    .catch(function(error){
      console.log("uy, no se pudo " + error);
    })
  })


  // -----------------------------------------------------------
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
$$(document).on('page:init', '.page[data-name="Buscar"]', function (e) {
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
  busqueda();
  async function busqueda() {

    // consulta a la BBDD para obtener todos los libros en la busqueda
    await colLibros.where("Publico","==","si").get()
    .then(function(querySnapshot){
     querySnapshot.forEach(function(doc){
      console.log("libros: " + doc.data().Libro);
      todolibs2.push(doc.data().Libro);
      todolibs = todolibs2.filter((item,index) => { return todolibs2.indexOf(item) === index} );
      })
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
            $$('#busclib2').html("Estas leyendo: " + aglib);
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
    })
    .catch(function (error){console.log('uy algo paso, ' + error)} )

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

  for (i=0; i<=6; i++){
    $$('#imgp'+i).on('click', function(){
      id=this.id;
      var id2= id.replace('imgp', '');
      console.log(id);
      $$('#clickimg').remove('<img id="clickimg" class="imgformaperfil" src="img/avatar1.jpg" ></img>');
      $$('#clickimg2').append('<img id="clickimg" class="imgformaperfil" src="img/avatar'+id2+'.jpg" ></img>')
    })
  }
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
      for (i=0; i<arraylibs2.length; i++){        
        $$('#crearcard').append('<div class="card demo-card-header-pic"><div style="background-image:url(https://cdn.framework7.io/placeholder/nature-1000x600-3.jpg)"class="card-header align-items-flex-end"></div><div class="card-content card-content-padding"><p id="desk'+i+'" class="date"></p><p id="b'+i+'"></p></div><div class="card-footer"><div id="e'+i+'" value="'+i+'" data-popup=".otropopup" class=" popup-open abrire button button-fill"> Ver </div> <div id="l'+i+'"data-popup=".my-popup" class="popup-open button button-fill"> + Cap </div><div id="p'+i+'"data-popover=".popover-about" class="button button-fill popover-open">public/priv</div></div>');
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
                    $$('#pageditt').html(pagina);
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
             nuevocont =$$('#pageditt2').html();
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
              .catch(function(error){
              console.log("uy, no se pudo " + error);
              app.dialog.alert('¡Listo! ¡Se agrego un nuevo contenido a tu capitulo!')
            })
            }
          })
        })
        //
      }
      
    });
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
      noveredit();
        var datacap= {
          Cuenta: email, 
          Libro: aglib, 
          Cap: agcap,
          Contenido: pagina,}
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
      // var cantlib= colUsuarios.doc(email).where("Libros").limit(1);
      // console.log(cantlib);
      // colUsuarios.doc(email).update ({Libros: })
      // AGREGAMOS EL LIBRO A LA BB DD
      app.dialog.alert('¡Listo! esta pagina se guardara en tu biblioteca, ¡podras seguir editandolo cuando quieras!')
      
      var datalibro={
        Cuenta: email,
        Tema: "cualquiera",
        Libro: aglib,
      }
      var datacap= {
        Cuenta: email, 
        Libro: aglib, 
        Cap: agcap,
        Contenido: pagina,}


      colLibros.doc(aglib).set(datalibro)
      .then(function(docRef) {
        // console.log("listo, subido con id= " + docRef.id);
        // var docid= docRef.id;
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
      // var subcolCaps= colLibros.doc(docid).collection('Capitulos');      
      // subcolCaps.add(datacap)
      // subcolCaps= colLibros.doc(email).collection('Capitulos');
      // subcolCaps.add(datacap);
      // var subcolCaps= colLibros.doc('/docRef.id').collection('Capitulos');      })
      // var subcolCaps.add(datacap)

      // subcolCaps.add(datacap)
      // .then(function(docRef){
      //   console.log("listo, subcol de caps creada");
      // })
      // .catch(function(error){
      //   console.log("uy, no se pudo " + error);
      // })

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
        // console.log(aglib2.indexOf(aglib));
        // query = colLibros.where(aglib).where(email)
        // query.get()
        // .then(function(querySnapshot){querySnapshot.forEach(function(doc){console.log("si esta: " + doc.data().nombre) })} )
        // .catch(function(error) {console.log('error: '+ error)})
        if (esta != -1 ){
          app.dialog.alert('El nombre: "'+ aglib +'" ya existe en tus libros')
        } else {
          aglib2.push(aglib);
          $$('#tulibro').text(aglib);
          // $$('#lista4').append('<option value='+libs+'><a href="#"> Libro: '+ libs +' '+ aglib +'</a></option>');
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
    // $$('#lista4').on('change', () =>{
    //   libs = $$('#lista4').val();
    //   console.log('opcion libro: ' + libs);
    // })

    $$('#sellib').on('click', () =>{
      selecl=$$('#lista').val();
      console.log( 'valor del value opc libro ' + selecl);
    })
    $$('#selcap').on('click', () =>{
      selec=$$('#b'+caps).val();
      console.log( 'valor del value opc cap ' + selec);
    })

  $$('#borrarpag').on('click', function(){
    $$('#pagcrea').html("");
  })
})