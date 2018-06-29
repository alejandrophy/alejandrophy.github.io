<?php

    $jsondata = array();

    $jsondata['success'] = false;
    $jsondata['message'] = 'Hola! El valor recibido no es correcto.';

    

    //Aunque el content-type no sea un problema en la mayoría de casos, es recomendable especificarlo
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($jsondata);
    exit();

?>
