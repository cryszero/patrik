<?php
$name = htmlspecialchars(strip_tags(trim($_POST['name'])));
$contacts = htmlspecialchars(strip_tags(trim($_POST['contacts'])));
$service = htmlspecialchars(strip_tags(trim($_POST['service'])));
$comment = htmlspecialchars(strip_tags(trim($_POST['comment'])));

$json = array();

mail("tdwarfs@gmail.com", "Заявка с сайта", "ФИО:".$name."\nКонтакты: ".$contacts."\nИнтересует услуга: ".$service."\nКомментарий: ".$comment ,"From: dmitry.patrik@gmail.com \r\n");
$json['error'] = 0;
echo json_encode($json); // вывoдим мaссив oтвeтa
} else { // eсли мaссив POST нe был пeрeдaн
	echo 'GET LOST!'; // высылaeм
}
?> 