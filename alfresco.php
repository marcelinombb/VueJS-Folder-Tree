<?php

class AlfrescoAPI{

    private $BASE_URL = "http://127.0.0.1:8080/alfresco/api/-default-/public/alfresco/versions/1";
    private $TICKET_URL = "http://127.0.0.1:8080/alfresco/api/-default-/public/authentication/versions/1/tickets";
    private $ticket;
    
    public function __construct(){
        $this->getTicket();
    }
    
    private function getTicket(){
        $requestBody = $this->requestBody($this->TICKET_URL);
        $requestBody->data = ["userId"=>"marcelino","password"=>"1234"];
        $ticket = json_decode($this->request($requestBody,"POST"));
        $this->ticket = base64_encode($ticket->entry->id);
    }

    private function getMethod(){
        return $_SERVER["REQUEST_METHOD"];
    }

    private function request($requestBody,string $method=null) : string{
        $curl = curl_init($requestBody->url);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method ?? $this->getMethod());
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($requestBody->data));
        curl_setopt( $curl, CURLOPT_HTTPHEADER, $requestBody->headers);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }

    private function requestBody(string $url, $headers= array() ){
        $requestBody = new stdClass();
        $requestBody->url = $url;
        $requestBody->data = file_get_contents("php://input");
        $requestBody->headers = array_merge(array("Content-Type: application/json"),$headers);
        return $requestBody;
    }

    public function run(){
        $query = explode("endpoint=",$_SERVER["QUERY_STRING"])[1] ?? "";
        $headers = array("Authorization: Basic {$this->ticket}","Accept: application/json");
        $requestBody = $this->requestBody("{$this->BASE_URL}{$query}",$headers);
        echo $this->request($requestBody);
    }
}

(new AlfrescoAPI())->run();