<?php
// define variables and set to empty values
$matricula = $marca = $color = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $matricula = test_input($_POST["matricula"]);
  $marca = test_input($_POST["marca"]);
  $color = test_input($_POST["color"]);

}

?>