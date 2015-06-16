<?php
header('Content-Type: application/json; charset=utf-8');

$toemail = 'vorback@gmail.com';

$fieldData = array(
  'name' => isset($_POST['name']) ? 'Name: ' . $_POST['name'] : false,
  'email' => isset($_POST['email']) ? 'Email: ' . $_POST['email'] : false,
  'message' => isset($_POST['message']) ? "\n" . $_POST['message'] : false);

$text = '';

foreach ($fieldData as $field) {
  if ($field) {
    $text = $text . $field . "\n";
  }
}

$message = "Message from vincentorback.se\n\n" . $text;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if ($toemail && $message && $_POST['email']) {
    mail($toemail, 'Message from vincentorback.se', $message, 'From: ' . $_POST['email']);
    $response = "Thank you for your message ". $_POST['name'] .". <br>I’ll get back to you ASAP!";
  }
  else {
    $response = 'Something went wrong. Try sending and email to <a href="mailto:vorback@gmail.com&subject=Message from vincentorback.se&body=' . $_POST['message'] . '">vorback@gmail.com</a> instead.';
  }
} else {
  $response = 'Something went wrong. Try sending and email to <a href="mailto:vorback@gmail.com&subject=Message from vincentorback.se&body=' . $_POST['message'] . '">vorback@gmail.com</a> instead.';
}


$data = array('response' => $response);

echo json_encode($data, JSON_PRETTY_PRINT);
?>