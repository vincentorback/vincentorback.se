<?php
$toemail = 'vorback@gmail.com';
$name = $_POST['name'];
$email = $_POST['email'];
$formmessage = $_POST['message'];

$message = "Meddelande från vincentorback.se/en\n\n".
"Namn: " . "$name\n".
"E-post: " . "$email\n".
"Meddelande: " . "$formmessage";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	if (mail($toemail, 'Meddelande från vincentorback.se/en', $message, 'From: ' . $email)) {
		mail($toemail, 'Meddelande från vincentorback.se/en', $message, 'From: ' . $email);
		echo "Thank you for your message ". $name .".<br />I'll get back to you ASAP!";
	}
	else {
		echo 'Something went wrong. Try sending and email to <a href="mailto:vorback@gmail.com&subject=Message from vincentorback.se&body='.$message.'">vorback@gmail.com</a> instead.';
	}
} else {
	echo 'Something went wrong. Try sending and email to <a href="mailto:vorback@gmail.com&subject=Message from vincentorback.se&body='.$message.'">vorback@gmail.com</a> instead.';
}
?>