<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$dynamicEvt = array('title' => 'Event', 'start' => '2021-06-25');

echo json_encode($dynamicEvt);