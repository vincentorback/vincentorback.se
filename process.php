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
echo '<div class="sent">Tack för ditt meddelande.</div>';
} else {
echo '<div class="sent">Det blev något fel på ditt meddelande. Försök att skicka ett mail till <a href="mailto:vorback@gmail.com>vorback@gmail.com</a> istället.</div>';
}
?>