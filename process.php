<?php
$toemail = 'vorback@gmail.com';
$name = $_POST['name'];
$email = $_POST['email'];
$formmessage = $_POST['message'];

$message = "Meddelande från vincentorback.se\n\n".
"Namn: " . "$name\n".
"E-post: " . "$email\n".
"Meddelande: " . "$formmessage";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	if (mail($toemail, 'Meddelande från vincentorback.se', $message, 'From: ' . $email)) {
		mail($toemail, 'Meddelande från vincentorback.se', $message, 'From: ' . $email);
		echo "Tack för det " . $name .".<br />Jag återkommer fort jag bara kan!";
	}
	else {
		echo 'Det blev något fel på ditt meddelande. Försök att skicka ett mail till <a href="mailto:vorback@gmail.com&subject=Message from vincentorback.se&body='.$message.'">vorback@gmail.com</a> istället.';
	}
} else {
	echo 'Det blev något fel på ditt meddelande. Försök att skicka ett mail till <a href="mailto:vorback@gmail.com&subject=Message from vincentorback.se&body='.$message.'">vorback@gmail.com</a> istället.';
}
?>