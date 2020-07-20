var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'nmelectronics',
   password: 'creo1304',
   database: 'ot_ebs_db',
   port: 3306
});
connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});
var query = connection.query('SELECT * FROM status', [1], function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
        var i= 0;
         if(resultado.length > 0){
                for(i=0;i<resultado.length;i++){

        console.log(resultado[i].id + ' ' + resultado[i].title + ' / ' + resultado[i].icon);
}
         }else{
            console.log('Registro no encontrado');
         }
      }
   }
);
connection.end();
