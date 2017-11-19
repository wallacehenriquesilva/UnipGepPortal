app.controller("CursoController", ["$scope","$http", function($scope,$http){

    /**
     * Collection Instituição
     * @type {Array}
     */
    $scope.collectionCurso = [];
    $scope.cursoNome = "";


    /**
     * $viewContentLoaded
     * Acionado quando o conteúdo é carregado
     */
    $scope.$watch('$viewContentLoaded', function(){
        $scope.findCurso();
    });

    /**
     * Find Instituição
     */
    $scope.findCurso = function(){

        var url = "";
        if ($scope.cursoNome != "")
            url = API_URL + "api/curso?nome=" + $scope.cursoNome;
        else
            url = API_URL + "api/curso?idInstituicao=" + Sessao.usuario.idInstituicao + "&idAluno=" + Sessao.usuario.idAluno;

        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            var data = response.data;
            
            $scope.collectionCurso = data;

        }, function errorCallback(response) {
             alert("Ocorreu um erro ao carregar a página");
             console.log(response);
        });

    };


    /**
     * Abrir Modal
     */
    $scope.openWindow = function(curso){
        $('#modalCurso').modal()
        $scope.nome = curso.nome;
        $scope.descricao = curso.descricao;

        $scope.operacao = "update";

    };

    $scope.incluir = function(){
        $('#modalCurso').modal()
    };

    $scope.salvarCurso = function(){
        var data = 
        {
            "idCurso": $scope.idCurso,
            "nome": $scope.curso.nome,
            "descricao":$scope.curso.descricao,
            "ativo":$scope.curso.ativo
        };


        console.log(data);

        var requisicao = {};
        if ($scope.idCurso == 0){
            requisicao = {
            method: 'POST',
            url: API_URL + 'api/curso',
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            data: data};
        }else if($scope.idAluno != "" && $scope.operacao == "update"){
            requisicao = {
            method: 'PUT',
            url: API_URL + 'api/curso',
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

     $scope.delete = function(curso){        
        var data = 
        {
            "idInstituicao": Sessao.usuario.idInstituicao,
            "idCurso": curso.idCurso,
            "nome": curso.nome,
            "descricao":curso.descricao,
            "ativo":curso.ativo
        };


        console.log(data);

        var requisicao = {};
        if ($scope.idCurso != ""){
            requisicao = {
            method: 'DELETE',
            url: API_URL + 'api/curso',
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