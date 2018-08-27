angular.module('todoApp', ['ngCookies','720kb.datepicker', 'ui.grid', 'ui.grid.selection', 'ui.grid.pagination', 'ui.grid.edit'])
  .controller('AppController', ['$cookies', '$scope','$http','$filter', function( $cookies,$scope, $http, $filter) {
    
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
          vm.gridOptions.data = vm.datosRepositorio;
          vm.formularioLleno=true; 
          vm.gridOptions.data = vm.datosRepositorio;               
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
        vm.refreshData = function() {
          if(vm.filtro.myInput.$valid){
          vm.gridOptions.data = $filter('filter')(vm.datosRepositorio, {name:vm.filterOptions.filterText});
          }
        };
        vm.filterOptions = {
          filterText: ''
      };
        
       // opciones de grilla        
        vm.gridOptions = {
          data: vm.datosRepositorio,            
          enableRowSelection: true,
          paginationPageSizes: [5, 10, 25],
          paginationPageSize: 5,
          enableRowSelection: true,
          enableRowHeaderSelection: true,
          multiSelect: true,
          columnDefs: [ 
            {field: 'name', enableSorting: true, 
             displayName: 'Repositorio',
          width: '15%'},
            {field: 'language',name: 'language', width: '10%', displayName: 'Lenguaje'},
            {field: 'description',width: '30%',
          },
            {field: 'html_url', width: '30%', displayName: 'Url'},
            {field: 'default_branch', width: '10%', displayName: 'Branch'}   
        ]
        };        
        vm.gridOptions.data =  vm.datosRepositorio;
  vm.reset2=function(){

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

     vm.favoriteCookie = '';
     
    vm.numeroRepositorios=0;   
    vm.datosRepositorio=[{
      name:'',
      language:'',
      default_branch:'',
      html_url:'',
      description:''
    }];
  }
  }]);