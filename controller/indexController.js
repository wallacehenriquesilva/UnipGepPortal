app.controller("IndexController", ["$scope", function($scope){


    /**
     * Controla Exibição dos Módulos
     * @type {boolean}
     */
    $scope.showModuloHome = true;
    $scope.showModuloAluno = true;
    $scope.showModuloOrientador = true;
    $scope.showModuloPublicacao = true;
    $scope.showModuloCurso = true;
    $scope.showModuloInstituicao = true;
    

    try{
        $scope.nome = Sessao.usuario.login;
        $scope.imagem = Sessao.usuario.imagem;
    }catch(err){
        window.location.href = 'login.html';
    }
    /**
     * $viewContentLoaded
     * Acionado quando o conteúdo é carregado
     */
    $scope.$watch('$viewContentLoaded', function(){
        $scope.loadView =  'view/indicadorView.html';
    });

    /**
     * Abrir Módulo - Home
     */
    $scope.onClickShowHome = function(){
        $scope.loadView =  'view/indicadorView.html';
    }

    /**
     * Abrir Módulo - Aluno
     */
    $scope.onClickShowAluno = function(){
        $scope.loadView =  'view/alunoView.html';
    }
    
    /**
     * Abrir Módulo - Orientador
     */
    $scope.onClickShowOrientador = function(){
        $scope.loadView =  'view/orientadorView.html';
    }
    /**
     * Abrir Módulo - Publicação
     */
    $scope.onClickShowPublicacao = function(){
        $scope.loadView =  'view/publicacaoView.html';
    }

    /**
     * Abrir Módulo - Curso
     */
    $scope.onClickShowCurso = function(){
        $scope.loadView =  'view/cursoView.html';
    }

    /**
     * Abrir Módulo - Instituição
     */
    $scope.onClickShowInstituicao = function(){
        $scope.loadView =  'view/instituicaoView.html';
    }
}]);