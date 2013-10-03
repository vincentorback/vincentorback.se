<?php
$toemail = 'vorback@gmail.com';
$name = $_POST['name'];
$email = $_POST['email'];
$formmessage = $_POST['message'];

$message = "Meddelande från vincentorback.se\n\n".
"Namn: " . "$name\n".
"Telefon: " . "$telephone\n".
"E-post: " . "$email\n".
"Meddelande: " . "$formmessage";


if(mail($toemail, 'Meddelande från vincentorback.se', $message, 'From: ' . $email)) {
echo '<div class="sent">Thank you for your message!.</div>';
} else {
echo '<div class="sent">Something went wrong. Try sending and email to <a href="mailto:vorback@gmail.com>vorback@gmail.com</a> instead.</div>';
}
?>