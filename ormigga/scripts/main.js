angular.module('todoApp', ['ngCookies','720kb.datepicker', 'ui.grid', 'ui.grid.selection', 'ui.grid.pagination', 'ui.grid.edit'])
  .controller('AppController', ['$cookies', '$scope','$http','$filter', function( $cookies,$scope, $http, $filter) {
    
    var vm= this;

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
     

    //Variable para controlar el estado de llenado del formulario y controlar vistas
    vm.formularioLleno=false;
    vm.mostrarGrilla=false;
    vm.mostrarError=false;
    //Arreglo de Objeto con repositorios
    vm.datosRepositorio=[{
      name:'',
      language:'',
      default_branch:'',
      html_url:'',
      description:''
    }];
    //Función Para verificar el envío del formulario
    vm.enviarFormulario = function() {
        var a ='aaa';
        if(vm.formulario.$valid){
          vm.gridOptions.data = $filter('filter')(vm.datosRepositorio, vm.filterOptions.filterText);
            
            $cookies.put('nombres', vm.formularioBusqueda.nombres);
            vm.favoriteCookie = $cookies.get('nombres');
            vm.consultarReopsitorios();    
            vm.formularioLleno=true;     
        }
        else{

            vm.formularioLleno=false;
        }


      };

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
      };
      //consulta usuario github
      vm.consularUsuario= function(){
        $http.get("https://api.github.com/users/" + vm.formularioBusqueda.usuarioGithub)
               .then(function (data) {
                  if (data.name == "") data.name = data.login;
                  $scope.user = data;
                  $scope.loaded = true;
               },function (error) {
                  $scope.userNotFound = true;
               });
      }
      //consulta repositorios Usuario
      vm.consultarReopsitorios=function(){

        $http.get("https://api.github.com/users/" + vm.formularioBusqueda.usuarioGithub + "/repos").then(function (data) {
          vm.datosRepositorio= angular.copy(data.data);
          vm.gridOptions.data = $filter('filter')(vm.datosRepositorio, vm.filterOptions.filterText);      
          vm.mostrarGrilla=true;
         },function (error) {
            if(error.data){
          vm.mostrarGrilla=false;
          vm.mostrarError=true;
          }

       });
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


      

  
  }]);