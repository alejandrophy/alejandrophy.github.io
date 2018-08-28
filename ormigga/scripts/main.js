angular.module('todoApp', ['ngCookies','720kb.datepicker'])
  .controller('AppController', ['$cookies', '$scope','$http','$filter' , function( $cookies,$scope, $http, $filter) {
    
    var vm= this;
     //Variable para controlar el estado de llenado del formulario y controlar vistas
     vm.formularioLleno=false;
     vm.mostrarGrilla=false;
     vm.mostrarError=false;
     vm.fechaValida=false;

     

    this.myDate = new Date();
    this.isOpen = false;
    //Clase que contiene los valores del formulario
    vm.formularioBusqueda={
        nombres:'',
        cedula:'',
        fechaNacimiento: null,
        correo:'',
        usuarioGithub:''
    };

     vm.favoriteCookie = '';
    // Setting a cookie
     
    vm.numeroRepositorios=0;
   
    //Arreglo de Objeto con repositorios
    vm.datosRepositorio=[];
    //Función Para verificar el envío del formulario
    vm.enviarFormulario = function() {
        if(vm.formulario.$valid){     
          vm.fechaValida=false;                  
            $cookies.put('datosFormularios', vm.formularioBusqueda);
            vm.consularUsuario(vm.formularioBusqueda.usuarioGithub);                
        }
        else{
          if(vm.formulario.fechaNac.$error.required)
            vm.fechaValida=true;
          
            vm.formularioLleno=false;
        }

      };
      
      vm.fechaSelecionada= function(){
        vm.fechaValida=false;
      }
      vm.nuevoFormulario = function() {        
            vm.formularioLleno=false;  
            vm.mostrarGrilla=false;  
            vm.mostrarError=false;
            vm.formularioBusqueda={
              nombres:'',
              cedula:'',
              fechaNacimiento: null,
              correo:'',
              usuarioGithub:''
          }; 
          vm.datosRepositorio=[];
      };
      //consulta usuario github
      vm.consularUsuario= function(user){
        var numRepos=0;
        var pg=1;
        $http.get("https://api.github.com/users/" + user)
               .then(function (data) {
                numRepos=data.data.public_repos;               
                vm.consultarRepositoriosPg(numRepos, pg, user);      
               },function (error) {
                if(error.data){            
                vm.error=true;
                vm.formularioLleno=true;  
                vm.mostrarGrilla=false;
                vm.mostrarError=true;
              }}
            );          
      }

      
      //consulta repositorios Usuario  
      vm.consultarRepositoriosPg=function(numRepos, pg, user){

        if(vm.datosRepositorio.length<numRepos){
        $http.get("https://api.github.com/users/" + user + "/repos?per_page=100&page="+pg).then(function (data) {
          if(pg<=1)
           vm.datosRepositorio=angular.copy(data.data);
          else
            vm.datosRepositorio=vm.datosRepositorio.concat(data.data);
         //llamo recursivamente a la función
          vm.consultarRepositoriosPg(numRepos, pg+1, user);
          vm.datosFiltrados = $filter('filter')(vm.datosRepositorio, "");
          vm.paginar();
          vm.formularioLleno=true; 
                        
          vm.mostrarGrilla=true;          
           
           },function (error) {
              if(error.data){            
              vm.error=true;
              vm.mostrarGrilla=false;
              vm.mostrarError=true;
            }
         });
        }
      }

      //refresca los datos de la grilla al aplicar el filtro
      vm.datosRepositorioModel=[];
      vm.datosFiltrados=[];
      vm.filterOptions = {
        filterText: ''
    };
        vm.refreshData = function() {
          if(vm.filtro.myInput.$valid){
            vm.datosFiltrados = $filter('filter')(vm.datosRepositorio, {name:vm.filterOptions.filterText});            
            vm.currentIndex=0;
            vm.paginar();
          }
        };
        
        vm.propertyName = 'name';
        vm.reverse = false;

      vm.sortBy = function(propertyName) {
        vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
        vm.propertyName = propertyName;
        vm.datosRepositorio=$filter('orderBy')(vm.datosRepositorio, propertyName, vm.reverse )
        vm.refreshData();
      };
        
      vm.currentPage = 0;
      vm.pageSize = 5; // Esta la cantidad de registros que deseamos mostrar por página
      vm.pages = 0;
      vm.currentPage=1

      vm.totalFiltrados = 0;
      vm.currentIndex=0

      vm.paginar = function(){   
        vm.pages = Math.ceil(vm.datosFiltrados.length/vm.pageSize);  
        vm.currentPage=Math.floor(vm.currentIndex/vm.pageSize )+1;   
        vm.datosRepositorioModel=vm.datosFiltrados.slice(vm.currentIndex,vm.currentIndex+5);
      };

      vm.nextPage= function(){
        vm.currentIndex=vm.currentIndex+5;
        if(vm.currentIndex > vm.datosFiltrados.length)
          vm.currentIndex =vm.currentIndex-5;
        vm.paginar(); 
      }
      vm.lastPage= function(){
        vm.currentIndex=vm.currentIndex-5;
        if(vm.currentIndex<0)
          vm.currentIndex=0
        vm.paginar(); 
      }
    
  

  }]);