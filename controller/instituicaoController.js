app.controller("InstituicaoController", ["$scope","$http", function($scope,$http){

    /**
     * Collection Instituição
     * @type {Array}
     */
    $scope.collectionInstituicao = [];
    $scope.instituicaoDescricao = "";
    //$scope.sigla = "oi";
    /**
     * $viewContentLoaded
     * Acionado quando o conteúdo é carregado
     */
    $scope.$watch('$viewContentLoaded', function(){
        $scope.findInstituicao();
    });

    /**
     * Find Instituição
     */
    $scope.findInstituicao = function(){
        var url = "";
        if ($scope.instituicaoDescricao != "")
            url = API_URL + "api/instituicao?descricao=" + $scope.instituicaoDescricao;
        else
            url = API_URL + "api/instituicao?idInstituicao=" + Sessao.usuario.idInstituicao;

        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            var data = response.data;
            
            $scope.collectionInstituicao = data;

        }, function errorCallback(response) {
             alert("Ocorreu um erro ao carregar a página");
             console.log(response);
        });
    };


    /**
     * Abrir Modal
     */
    $scope.openWindow = function(instituicao){
        $('#modalInstituicao').modal();   
        $scope.idInstituicaoModal = instituicao.idInstituicao;
        $scope.sigla = instituicao.sigla;
        $scope.descricao = instituicao.descricao;

        $scope.Operação="update";     
    };

    $scope.incluir = function(){
        $scope.idInstituicao = 0;
        console.log("estou aqui");
        $('#modalInstituicao').modal()
    };

    $scope.salvarInstituicao = function(){
        var data = 
        {
            "idInstituicao": $scope.idInstituicao,
            "sigla": $scope.instituicao.sigla,
            "descricao":$scope.instituicao.descricao,
            "ativo":$scope.instituicao.ativo
        };


        console.log(data);

        var requisicao = {};
        if ($scope.idInstituicao ==  0){
            requisicao = {
            method: 'POST',
            url: API_URL + 'api/instituicao',
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            data: data};
        }else if($scope.idInstituicao != "" && $scope.operacao == "update"){
             requisicao = {
            method: 'PUT',
            url: API_URL + 'api/instituicao',
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            data: data};
        }

        console.log(requisicao);

        $http(requisicao).then(function successCallback(response) {
            var data = response.data;
            alert("Operação realizada com sucesso!");
            console.log(response);
            


        }, function errorCallback(response) {
             alert("Ocorreu um erro ao realizar a requisição");
             console.log(response);
        });
    };

   $scope.delete = function(instituicao){        
        var data = 
        {
            "idInstituicao": instituicao.idInstituicao,
            "sigla": instituicao.sigla,
            "descricao": instituicao.descricao,
            "ativo":instituicao.ativo
        };


        console.log(data);

        var requisicao = {};
        if ($scope.idCurso != ""){
            requisicao = {
            method: 'DELETE',
            url: API_URL + 'api/instituicao',
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