<?php
/*
**  This file contains a simple Response class.
*/
class Response {
	public $responseCode;
	public $message;
	public $data;

	function Response($responseCode = -1,
						$message = "Something went wrong!",
						$data = "") {
		$this->responseCode= $responseCode;
		$this->message = $message;
		$this->data = $data;
	}
}
?>
