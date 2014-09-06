<?php

header('Content-Type: application/json; charset=utf-8');

$toemail = 'vorback@gmail.com';

$fieldData = array(
  'name' => (isset($_POST['name']) ? $_POST['name'] : ''),
  'email' => (isset($_POST['email']) ? $_POST['email'] : ''),
  'message' => (isset($_POST['message']) ? $_POST['message'] : ''));

$message = "Meddelande från vincentorback.se\n\n" .
"Namn: " . $fieldData['name'] . "\n" .
"E-post: " . $fieldData['email'] . "\n" .
"Meddelande: " . $fieldData['message'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if ($toemail && $message && $fieldData['email']) {
    mail($toemail, 'Meddelande från vincentorback.se', $message, 'From: ' . $fieldData['email']);
    echo "Tack för det " . $fieldData['name'] .". <br>Jag återkommer så fort jag bara kan!";
  }
  else {
    echo 'Det blev något fel på ditt meddelande $fieldData["name"]. Försök att skicka ett mail till <a href="mailto:vorback@gmail.com&subject=Message from vincentorback.se&body='.$message.'">vorback@gmail.com</a> istället.';
  }
} else {
  echo 'Det blev något fel på ditt meddelande $fieldData["name"]. Försök att skicka ett mail till <a href="mailto:vorback@gmail.com&subject=Message from vincentorback.se&body='.$message.'">vorback@gmail.com</a> istället.';
}

?>