app.controller("IndicadorController", ["$scope","$http", function($scope,$http){

    var API_URL = "http://localhost/UnipGepPortalProvider/"
    /**
     * Indicador 5 - Valores
     * @type {number}
     */
    $scope.indicadorTotalAlunos = 99;
    $scope.indicadorTotalOrientadores = 99;
    $scope.indicadorTotalCursos = 99;
    $scope.indicadorTotalPublicacoes = 99;


    /**
     * $viewContentLoaded
     * Acionado quando o conteúdo é carregado
     */
    $scope.$watch('$viewContentLoaded', function(){
        $scope.createChartRankAlunosPublicacao();
        $scope.createChartRankOrientadoresPublicacao();
        $scope.createChartComparativoAlunos();
        $scope.createChartComparativoOrientadores();
        $scope.loadIndicadorTotalizador();
    });

    $scope.loadIndicadorTotalizador = function(){
        $http({
            method: 'GET',
            url: API_URL + "api/instituicao/indicador?idInstituicao=" + Sessao.usuario.idInstituicao,
            "headers": {
                "Accept": "application/json, text/plain, */*"
            }
        }).then(function successCallback(response) {
            var data = response.data[0];
            $scope.indicadorTotalCursos = data.totalCursos;
            $scope.indicadorTotalAlunos = data.totalAlunos;
            $scope.indicadorTotalOrientadores = data.totalOrientadores;
            $scope.indicadorTotalPublicacoes = data.totalPublicacoes;

        }, function errorCallback(response) {
            console.log(response);
            alert("Ocorreu um erro ao carregar indicador" + response);
        });

    };



    /**
     * Gráfico - createChartRankAlunosPublicacao
     */
    $scope.createChartRankAlunosPublicacao = function(){
        $http({
            method: 'GET',
            url: API_URL + "api/aluno/rank/5?idInstituicao=" + Sessao.usuario.idInstituicao,
            "headers": {
                "Accept": "application/json"
            }
        }).then(function successCallback(response) {
           charts(response.data,"aluno");  

        }, function errorCallback(response) {
            console.log(response);
            alert("Ocorreu um erro no indicador" + response);
        });
    };


    function charts(data,tipo)
{

var jsonData=data;
google.load("visualization", "1", {packages:["corechart"], callback: drawVisualization});
function drawVisualization() 
{
var data = new google.visualization.DataTable();
data.addColumn('string', 'Nome');
data.addColumn('number', 'Número de Publicações');
$.each(jsonData, function(i,jsonData)
{
var numeroPublicacoes= parseInt(jsonData.numeroPublicacoes);
var nome=jsonData.nome;
data.addRows([ [nome, numeroPublicacoes]]);
});

var options = {
title : "Publicações por Aluno",
colorAxis: {colors: ['#54C492', '#cc0000']},
datalessRegionColor: '#dedede',
defaultColor: '#dedede'
};

var chart;
if(tipo == "aluno"){
chart = new google.visualization.ColumnChart(document.getElementById('chartRankAlunosPublicacao'));
}else if(tipo == "orientador"){
    chart = new google.visualization.ColumnChart(document.getElementById('chartRankOrientadoresPublicacao'));
}
chart.draw(data, options);
}
}

    /**
     * Gráfico - createChartRankOrientadoresPublicacao
     */
    $scope.createChartRankOrientadoresPublicacao = function(){
         $http({
            method: 'GET',
            url: API_URL + "api/orientador/rank/5?idInstituicao=" + Sessao.usuario.idInstituicao,
            "headers": {
                "Accept": "application/json"
            }
        }).then(function successCallback(response) {
           charts(response.data,"orientador");  

        }, function errorCallback(response) {
            console.log(response);
            alert("Ocorreu um erro no indicador" + response);
        });
    };

    /**
     * Gráfico - Comparativo Alunos Ativos e Inativos
     */
    $scope.createChartComparativoAlunos = function(){
    var data = {};
        $http({
            method: 'GET',
            url: API_URL + "api/aluno/status?idInstituicao=" + Sessao.usuario.idInstituicao,
            "headers": {
                "Accept": "application/json, text/plain, */*"
            }
        }).then(function successCallback(response) {
            console.log(response);
            data = response.data[0];
            console.log(data.alunosInativos);

        }, function errorCallback(response) {
            console.log(response);
            alert("Ocorreu um erro no indicador" + response);
        });

        Highcharts.chart('chartComparativoAlunos', {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Alunos',
                data: [
                    ['Ativos', parseInt(data.alunosAtivos)],
                    ['Inativos', parseInt(data.alunosInativos)]
                ]
            }]
        });
    }



    /**
     * Gráfico - Comparativo Orientadores Ativos e Inativos
     */
    $scope.createChartComparativoOrientadores = function(){

 var data = {};
        $http({
            method: 'GET',
            url: API_URL + "api/orientador/status?idInstituicao=" + Sessao.usuario.idInstituicao,
            "headers": {
                "Accept": "application/json, text/plain, */*"
            }
        }).then(function successCallback(response) {
            console.log(response);
            data = response.data[0];
            console.log(data.alunosInativos);

        }, function errorCallback(response) {
            console.log(response);
            alert("Ocorreu um erro no indicador" + response);
        });


        Highcharts.chart('chartComparativoOrientadores', {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Orientadores',
                data: [
                    ['Ativos', 60],
                    ['Inativos', 40]
                ]
            }]
        });
    }
}]);