app.controller("OrientadorController", ["$scope","$http", function($scope,$http){

    /**
     * Collection Instituição
     * @type {Array}
     */
    $scope.collectionOrientador = [];
    $scope.orientadorNome = "";


    /**
     * $viewContentLoaded
     * Acionado quando o conteúdo é carregado
     */
    $scope.$watch('$viewContentLoaded', function(){
        $scope.findOrientador();
    });

    /**
     * Find Instituição
     */
    $scope.findOrientador = function(){
        console.log($scope.orientadorNome)
        var url = "";
        if ($scope.orientadorNome != "")
            url = API_URL + "api/orientador?nome=" + $scope.orientadorNome;
        else
            url = API_URL + "api/orientador?idInstituicao=" + Sessao.usuario.idInstituicao + "&idOrientador=" + Sessao.usuario.idOrientador; 

        console.log(url);
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            var data = response.data;
            
            $scope.collectionOrientador = data;

        }, function errorCallback(response) {
             alert("Ocorreu um erro ao carregar a página");
             console.log(response);
        });

    };


    /**
     * Abrir Modal
     */
    $scope.openWindow = function(orientador){
        $('#modalOrientador').modal()
        $scope.nome = orientador.nome;
        $scope.cpf = orientador.cpf;
        $scope.titulacao = orientador.titulacao;

        $scope.operacao = "update";

    };

    $scope.incluir = function(){
        $('#modalOrientador').modal()
    };

    $scope.salvarOrientador = function(){
        var data = 
        {
            "idOrientador": $scope.idOrientador,
            "nome": $scope.orientador.nomee,
            "cpf":$scope.orientador.cpf,
            "titulacao":$scope.orientador.titulacao,
            "ativo":$scope.orientador.ativo
        };


        console.log(data);

        var requisicao = {};
        if ($scope.idOrientador == 0){
            requisicao = {
            method: 'POST',
            url: API_URL + 'api/orientador',
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            data: data};
        }else if(idOrientador != "" && $scope.operacao=="update"){
             requisicao = {
            method: 'PUT',
            url: API_URL + 'api/orientador',
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            data: data};

        }

        console.log(requisicao);

        $http(requisicao).then(function successCallback(response) {
            var data = response.data;
            console.log(response);

        }, function errorCallback(response) {
             alert("Ocorreu um erro ao realizar a requisição");
             console.log(response);
        });
    };
     $scope.delete = function(orientador){        
        var data = 
        {
            "idInstituicao": Sessao.usuario.idInstituicao,
            "idOrientador": orientador.idOrientador,
            "nome": orientador.nome,
            "cpf": orientador.cpf,
            "titulacao":orientador.titulacao,
            "ativo":orientador.ativo
        };


        console.log(data);

        var requisicao = {};
        if ($scope.idCurso != ""){
            requisicao = {
            method: 'DELETE',
            url: API_URL + 'api/orientador',
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            data: data};
        }else{
            //url = API_URL + "api/instituicao?idInstituicao=" + Sessao.instituicao.idInstituicao;

        }

        console.log(requisicao);

        $http(requisicao).then(function successCallback(response) {
            var data = response.data;
            if(data == "true"){
                alert("Apagado com sucesso!");
            }else{
                alert("Erro ao apagar!");
            }

        }, function errorCallback(response) {
             alert("Ocorreu um erro ao realizar a requisição");
             console.log(response);
        });
    }

}]);