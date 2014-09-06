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
    $response = "Thank you for your message ". $fieldData['name'] .". <br>I’ll get back to you ASAP!";
  }
  else {
    $response = 'Something went wrong. Try sending and email to <a href="mailto:vorback@gmail.com&subject=Message from vincentorback.se&body=' . $fieldData['message'] . '">vorback@gmail.com</a> instead.';
  }
} else {
  $response = 'Something went wrong. Try sending and email to <a href="mailto:vorback@gmail.com&subject=Message from vincentorback.se&body=' . $fieldData['message'] . '">vorback@gmail.com</a> instead.';
}


$data = array('response' => $response);
echo json_encode($data, JSON_PRETTY_PRINT);

?>