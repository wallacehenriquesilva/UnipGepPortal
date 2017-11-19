var Sessao = {};
var app2 = angular.module("UnipGEPAppLogin", []);
Webcam.set({
  width: 620,
  height: 540,
  image_format: 'jpeg',
  jpeg_quality: 90
 });
 Webcam.attach('#my_camera');

app2.controller("LoginController", ["$scope", "$http", function($scope, $http) {
  $scope.botao = "Entrar";
  
  var imagemBase64 = {};
  
  $scope.capturarImagem = function() {
    Webcam.snap( function(data_uri) {
    imagemBase64 = {
      imagem: data_uri.replace("data:image/jpeg;base64","")
    }
  });

  var requisicao = {
    method: 'POST',
    url: 'http://127.0.0.1:5000/api/login',
    headers: {"Content-Type": "application/json" },
    data: JSON.stringify(imagemBase64)
  }
  $http(requisicao).then(function successCallback(response) {
            var data = JSON.parse(response.data);
            console.log(data);
            console.log(data.login);
            
            var singleton = User.getInstance(data);
           
            Sessao = singleton;

            window.location.href = 'index.html';


        }, function errorCallback(response) {
             alert("Ocorreu um erro ao realizar a requisição");
             console.log(response);
        });
}


}]);