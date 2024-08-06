<?php
    require 'conexion.php';

    if (isset($_POST['registro'])) {
        $nombre = $_POST['first_name'];
        $apellido = $_POST['last_name'];
        $email = $_POST['email'];
        $numero = $_POST['phone'];
        $contraseña = $_POST['password'];
        $image = $_POST['imagen'];
        $sql = "INSERT INTO usuarios (Id, first_name, last_name, email, phone, password, imagen) VALUES (null, '$nombre',
         '$apellido', '$email', '$numero', '$contraseña', '$imagen')";
        $resultado = mysqli_query($conexion,$sql);
            if ($resultado) {
                header("Location: ../log.html");
                exit();
            }else{
                echo "No se pudo. " . "<br>";
            }
    }
?>