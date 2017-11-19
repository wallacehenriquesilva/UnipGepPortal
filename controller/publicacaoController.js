app.controller("PublicacaoController", ["$scope","$http", function($scope,$http){

    /**
     * Collection Instituição
     * @type {Array}
     */
    $scope.collectionPublicacao = [];
    $scope.publicacaoTitulo = "";


    /**
     * $viewContentLoaded
     * Acionado quando o conteúdo é carregado
     */
    $scope.$watch('$viewContentLoaded', function(){
        $scope.findPublicacao();
    });

    /**
     * Find Instituição
     */
    $scope.findPublicacao = function(){

        var url = "";
        if ($scope.publicacaoTitulo != "")
            url = API_URL + "api/publicacao?descricao=" + $scope.publicacaoTitulo;
        else
            url = API_URL + "api/publicacao?idInstituicao=" + Sessao.usuario.idInstituicao + "&idOrientador="+ Sessao.usuario.idOrientador;

        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            var data = response.data;
            console.log(data);
            $scope.collectionPublicacao = data;

        }, function errorCallback(response) {
             alert("Ocorreu um erro ao carregar a página");
             console.log(response);
        });

    };


    /**
     * Abrir Modal
     */
    $scope.openWindow = function(publicacao){
        $('#modalPublicacao').modal()
        $scope.titulo = publicacao.titulo;
        $scope.tipo = publicacao.tipo;
        $scope.resumo = publicacao.resumo;
        $scope.palavrasChave = publicacao.palavrasChave;
        $scope.dataPublicacao = publicacao.dataPublicacao;


        $scope.operacao = "update";

        
    };

    $scope.incluir = function(){
        $('#modalPublicacao').modal()
    };

    $scope.salvarPublicacao = function(){
         var data = 
        {
            "idPublicacao": $scope.idPublicacao,
            "tipo": $scope.publicacao.tipo,
            "titulo":$scope.publicacao.titulo,
            "resumo":$scope.publicacao.resumo,
            "palavrasChave":$scope.publicacao.palavrasChave,
            "ativo":$scope.publicacao.ativo
        };


        console.log(data);

        var requisicao = {};
        if ($scope.idPublicacao == 0){
            requisicao = {
            method: 'POST',
            url: API_URL + 'api/publicacao',
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            data: data};
        }else if($scope.idPublicacao != "" && $scope.operacao == "update"){
             requisicao = {
            method: 'PUT',
            url: API_URL + 'api/publicacao',
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

     $scope.delete = function(publicacao){        
        var data = 
        {
            "idInstituicao": Sessao.usuario.idInstituicao,
            "idPublicacao": publicacao.idPublicacao,
            "titulo": publicacao.titulo,
            "resumo":publicacao.resumo,
            "palavrasChave":publicacao.palavrasChave,
            "dataPublicacao":publicacao.dataPublicacao,
            "ativo":publicacao.ativo
        };


        console.log(data);

        var requisicao = {};
        if ($scope.idCurso != ""){
            requisicao = {
            method: 'DELETE',
            url: API_URL + 'api/publicacao',
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