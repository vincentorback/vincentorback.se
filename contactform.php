<?php
header('Content-Type: application/json; charset=utf-8');

$toemail = 'vincentorback@gmail.com';
$subject = 'Message from vincentorback.se';
$fieldData = array(
  'name' => isset($_POST['name']) ? 'Name: ' . $_POST['name'] : false,
  'email' => isset($_POST['email']) ? 'Email: ' . $_POST['email'] : false,
  'message' => isset($_POST['message']) ? "\n" . $_POST['message'] : false);

$message = '';

foreach ($fieldData as $field) {
  if ($field) {
    $message = $message . $field . "\n";
  }
}

if ($_POST['spam_test'] != 'foo') {
  $subject = 'Spam from vincentorback.se';
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if ($toemail && $message && $_POST['email']) {
    mail($toemail, $subject, $message, 'From: ' . $_POST['email']);
    $response = "Thank you for your message ". $_POST['name'] .". <br>I’ll get back to you ASAP!";
  }
  else {
    $response = 'Something went wrong. Try sending and email to <a href="mailto:vincentorback@gmail.com&subject=Message from vincentorback.se&body=' . $_POST['message'] . '">vincentorback@gmail.com</a> instead.';
  }
} else {
  $response = 'Something went wrong. Try sending and email to <a href="mailto:vincentorback@gmail.com&subject=Message from vincentorback.se&body=' . $_POST['message'] . '">vincentorback@gmail.com</a> instead.';
}

echo json_encode($response, JSON_PRETTY_PRINT);
?>