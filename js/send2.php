<?php
$name = $_POST['name'];
$contacts = $_POST['contacts'];
$service = $_POST['service'];
$comment = $_POST['comment'];
$name = htmlspecialchars($name);
$contacts = htmlspecialchars($contacts);
$service = htmlspecialchars($service);
$comment = htmlspecialchars($comment);
$name = urldecode($name);
$contacts = urldecode($contacts);
$service = urldecode($service);
$comment = urldecode($comment);
$name = trim($name);
$contacts = trim($contacts);
$service = trim($service);
$comment = trim($comment);
//echo $name;
//echo "<br>";
//echo $contacts;

$json = array();


mail("tdwarfs@gmail.com", "Заявка с сайта", "ФИО:".$name."\nКонтакты: ".$contacts."\nИнтересует услуга: ".$service."\nКомментарий: ".$comment ,"From: elfpirate@gmail.com \r\n");
$json['error'] = 0;
echo json_encode($json); // вывoдим мaссив oтвeтa
} else { // eсли мaссив POST нe был пeрeдaн
	echo 'GET LOST!'; // высылaeм
}
?>