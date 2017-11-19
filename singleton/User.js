var User = (function () {
    var instance;
 
    function createInstance(usuario) {
       /*login: usuario.login,
        ativo: usuario.ativo,
        idInstituicao : usuario.idInstituicao,
        idAluno : usuario.idAluno,
        idOrientador : usuario.idOrientador,
        administrador: usuario.administrador,
        imagem: usuario.foto*/
        var object = {
             usuario:{
        login: usuario.login,
        ativo: usuario.ativo,
        idInstituicao : usuario.idInstituicao,
        idAluno : usuario.idAluno,
        idOrientador : usuario.idOrientador,
        administrador: usuario.administrador,
        imagem: usuario.foto
    }
        };
        return object;
    }
 
    return {
        getInstance: function (usuario) {
            if (!instance) {
                instance = createInstance(usuario);
            }
            return instance;
        }
      
    };
})();