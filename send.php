<?php
	date_default_timezone_set("Asia/Yekaterinburg");

  require("lib/src/PHPMailer.php");
  require("lib//src/SMTP.php");

    $mail = new PHPMailer\PHPMailer\PHPMailer();
    $mail->IsSMTP(); // enable SMTP
    $name = htmlspecialchars(strip_tags(trim($_POST['name'])));
		$contacts = htmlspecialchars(strip_tags(trim($_POST['contacts'])));
		$service = htmlspecialchars(strip_tags(trim($_POST['service'])));
		$comment = htmlspecialchars(strip_tags(trim($_POST['comment'])));





    $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true; // authentication enabled
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = "smtp.yandex.ru";
    $mail->Port = 465; // or 587
    $mail->IsHTML(true);
    $mail->Username = "patrik2036";
    // $mail->Username = "cryszer0";
    $mail->Password = "32253153";
    // $mail->Password = "kvbbhxajbnbngiyl";
    $mail->SetFrom("patrik2036@yandex.ru");
    $mail->Subject = "Patrik request";
    $mail->Body = "<b>ФИО:</b> ".$name."<br/><b>Контакты:</b> ".$contacts."<br/><b>Интересует услуга:</b> ".$service."<br/><b>Комментарий:</b> ".$comment;
    // $mail->AddAddress("dmitry.patrik@gmail.com");
    $mail->AddAddress("tdwarfs@gmail.com");
    if(isset($_FILES['attachfile'])) { 
                if($_FILES['attachfile']['error'] == 0){ 
                        $mail->AddAttachment($_FILES['attachfile']['tmp_name'], $_FILES['attachfile']['name']); 
                } 
         } 

     if(!$mail->Send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
     } else {
        echo "Message has been sent";
     }
?>