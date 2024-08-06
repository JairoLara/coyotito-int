<?php
    // conectar a la base de datos
    $servername = "localhost";
    $username = "registro";
    $password = "nn0_3Vijm_]299we";
    $dbname = "registro";

    $conexion = mysqli_connect($servername, $username, $password, $dbname); 

    if(!$conexion){
        die("Conexion fallida: ". mysqli_connect_error());
    }
?>