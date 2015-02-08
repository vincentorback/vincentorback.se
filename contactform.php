<?php
header('Content-Type: application/json; charset=utf-8');

$toemail = 'vorback@gmail.com';

$fieldData = array(
  'name' => $_POST['name'] ? 'Namn: ' . $_POST['name'] : false,
  'email' => $_POST['email'] ? 'Email: ' . $_POST['email'] : false,
  'purpose' => $_POST['purpose'] ? 'Purpose: ' . $_POST['purpose'] : false,
  'business' => $_POST['business'] ? 'Business: ' . $_POST['business'] : false,
  'profile' => $_POST['profile'] ? 'Graphic profile: ' . $_POST['profile'] : false,
  'ecommerce' => $_POST['ecommerce'] ? 'Sell online: ' . $_POST['ecommerce'] : false,
  'working_for' => $_POST['working_for'] ? 'Working for: ' . $_POST['working_for'] : false,
  'profit' => $_POST['profit'] ? 'Profit: ' . $_POST['profit'] : false,
  'involved' => $_POST['involved'] ? 'Involved: ' . $_POST['involved'] : false,
  'competitors' => $_POST['competitors'] ? 'Competitors: ' . $_POST['competitors'] : false,
  'message' => $_POST['message'] ? 'Message: ' . $_POST['message'] : false);

$text = '';

foreach ($fieldData as $field) {
  if ($field) {
    $text = $text . $field . "\n";
  }
}

$message = "Meddelande från vincentorback.se\n\n" . $text;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if ($toemail && $message && $_POST['email']) {
    mail($toemail, 'Meddelande från vincentorback.se', $message, 'From: ' . $_POST['email']);
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