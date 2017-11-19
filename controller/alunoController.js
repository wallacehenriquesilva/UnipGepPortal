app.controller("AlunoController", ["$scope","$http", function($scope,$http){

    /**
     * Collection Instituição
     * @type {Array}
     */
    $scope.collectionAluno = [];
    $scope.alunoMatricula = "";


    /**
     * $viewContentLoaded
     * Acionado quando o conteúdo é carregado
     */
    $scope.$watch('$viewContentLoaded', function(){
        $scope.findAluno();
    });

    /**
     * Find Instituição
     */
    $scope.findAluno = function(){
            console.log("oi");

        var url = "";
        if ($scope.alunoMatricula != ""){
            url = API_URL + "api/aluno?matricula=" + $scope.alunoMatricula;
        }
        else{
            url = API_URL + "api/aluno?idInstituicao=" + Sessao.usuario.idInstituicao + "&idAluno=" + Sessao.usuario.idAluno;
        }

        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            var data = response.data;
            console.log(data);
            
            $scope.collectionAluno = data;

        }, function errorCallback(response) {
             alert("Ocorreu um erro ao carregar a página");
             console.log(response);
        });

    };


    /**
     * Abrir Modal
     */
    $scope.openWindow = function(aluno){
        $('#modalAluno').modal()
        $scope.matricula = aluno.matricula;
        $scope.nome = aluno.nome;
        $scope.dataNascimento = aluno.dataNascimento;
        $scope.cpf = aluno.cpf;

        $scope.operacao = "update";

        
    };

    $scope.incluir = function(){
        $('#modalAluno').modal()
    };

    $scope.salvarAluno = function(){
        var data = 
        {
            "idAluno": $scope.idAluno,
            "nome": $scope.aluno.nome,
            "matricula":$scope.aluno.matricula,
            "dataNascimento":$scope.aluno.dataNascimento,
            "cpf":$scope.aluno.cpf,
            "ativo":$scope.aluno.ativo
        };


        console.log(data);

        var requisicao = {};
        if ($scope.idAluno == 0){
            requisicao = {
            method: 'POST',
            url: API_URL + 'api/aluno',
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            data: data};
        }else if ($scope.idAluno != "" && $scope.operacao = "update"){
            requisicao = {
            method: 'PUT',
            url: API_URL + 'api/aluno',
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

      $scope.delete = function(aluno){        
        var data = 
        {
            "idInstituicao": Sessao.usuario.idInstituicao,
            "idAluno": aluno.idaluno,
            "matricula": aluno.matricula,
            "nome":aluno.nome,
            "sexo":aluno.sexo,
            "dataNascimento":aluno.dataNascimento,
            "cpf":aluno.cpf,
            "ativo":aluno.ativo
        };


        console.log(data);

        var requisicao = {};
        if ($scope.idCurso != ""){
            requisicao = {
            method: 'DELETE',
            url: API_URL + 'api/aluno',
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