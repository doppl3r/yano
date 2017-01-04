<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Form</title>
</head>
<body>
<?php
require 'class.phpmailer.php';

//Create a new PHPMailer instance
$mail = new PHPMailer();
$mail->setFrom('info@yanocreative.com', $_REQUEST['name']);
$mail->addAddress('info@yanocreative.com');
$mail->Subject = 'A New Testimonial has been filled out!';
$message =  '<div style="padding: 64px; background-color: #f9f9f9; max-width: 480px; margin: 0 auto; text-align: center;">'.
            '<p style="color: #fff; font-size: 16px;"><strong>Somebody wants to contact you!</strong></p>'.
            '<p style="color: #fff; font-size: 16px;"><strong>Name:</strong> '.$_REQUEST['name'].'</p>'.
            '<p style="color: #fff; font-size: 16px;"><strong>Comment:</strong> '.$_REQUEST['comment'].'</p>'.
            '</div>';
$mail->msgHTML($message);
//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo '<script>window.location = "success.html";</script>';
}
?>
</body>
</html>
