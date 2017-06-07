<?php
require 'database.php';

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:Content-Type');
header('Access-Control-Allow-Methods: POST, GET, PUT, PATCH, DELETE, OPTIONS'); 
header('Access-Control-Methods: POST, GET, PUT, PATCH, DELETE, OPTIONS'); 
header('Content-Type:application/json');

$_POST = json_decode(file_get_contents('php://input'));

// REST
$_request_method = $_SERVER['REQUEST_METHOD'];

switch ($_request_method) {
	case 'GET':
		$stmt = $conn->prepare("SELECT * FROM todos");
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode([
			'status' => TRUE,
			'result' => $result
		]);
		break;
	case 'POST':
		$stmt = $conn->prepare("INSERT INTO `todos`(`title`, `isDone`) VALUES (:title,:isDone)");
		$stmt->bindParam(':title',$_POST->title);
		$stmt->bindParam(':isDone',$_POST->isDone);
		$stmt->execute();

		echo json_encode([
			'status' => TRUE,
			'todo'   => [
				'id'    => $conn->lastInsertId(),
				'title' => $_POST->title,
				'isDone'=> $_POST->isDone
			]
 		]);
		break;
	case 'PUT':
		$id    = $_POST->id;
		$title = $_POST->title;
		$stmt  = $conn->prepare("UPDATE `todos` SET `title`=:title WHERE id=:id");
		$stmt->bindParam(":id",$id);
		$stmt->bindParam(":title",$title);
		$stmt->execute();
		echo json_encode([
			'status' => TRUE,
		]);
		break;
	case 'PATCH':
		echo json_encode([
			'status' => 'PATCH'
		]);
		break;
	case 'DELETE':
		$id = $_GET['id'];
		$stmt = $conn->prepare("DELETE FROM `todos` WHERE id=:id");
		$stmt->bindParam(':id',$id);
		$stmt->execute();
		echo json_encode([
			'status' => TRUE
		]);
		break;
	default:
		# code...
		break;
}