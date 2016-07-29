<?php
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
$headers .= 'From:' .$_REQUEST['email'] . "\r\n";
$to = 'vorback@gmail.com';
$subject .= 'Meddelande från bar.vincentorback.se' . "\r\n";
  
 
  
$message = '<html><body>';
$message .= $_REQUEST['message'];
$message .= "<br><br>Från:" . $_REQUEST['name'];
$message .= "</body></html>";  
  



if (mail($to, $subject, $message, $headers)) {
  header( "Location: http://bar.vincentorback.se/tack/" );
} 
else {
echo "<p>Kunde inte skicka ditt meddelande.<br>Försök igen eller skicka ditt meddelande direkt till<a href='mailto:vorback@gmail.com'>vorback@gmail.com</a>.</p><br><p>Du får jättegärna höra av dig till oss och berätta om formuläret inte fungerar!.</p>";
}


die();




?>