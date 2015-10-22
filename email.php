<?php
    $autoResponse = true; //if set to true auto response email will be sent, if you don't want autoresponse set it to false
    $autoResponseSubject = "Mental Modeler password request"; 
    $autoResponseMessage = "Thank you for your interest in Mental Modeler.\r\n\r\nThe download credentials are:\r\n\r\nUsername: mentalmodeler\r\nPassword: mentalmodeler\r\n\r\nhttp://www.mentalmodeler.com/resources/mentalmodeler.exe\r\n\r\nPlease note, this is an auto-generated email. If you need to contact us, please use the email: stevenallangray@mentalmodeler.com";
    $autoResponseHeaders = "From: passwordrequest@mentalmodeler.com";  
    
    //we need to get our variables first
    $email_to =  "passwordrequest@mentalmodeler.com";
    $name =  $_POST['name'];
    $institution =  $_POST['institution'];
    $reasonForUse =  $_POST['reason-for-use'];
    $areaOfStudy =  $_POST['area-of-study'];
    $phone =  $_POST['phone'];
    $address =  $_POST['address'];
    $email =  $_POST['email'];
    $subject = "Mental Modeler password request";
    $message = "I would like the password to download the Mental Modeler application.\r\n\r\nName:\r\n$name\r\n\r\nInstitution:\r\n$institution\r\n\r\nReason for Use:\r\n$reasonForUse\r\n\r\nArea of Study:\r\n$areaOfStudy\r\n\r\nPhone:\r\n$phone\r\n\r\nAddress:\r\n$address\r\n\r\nEmail:\r\n$email";

    /*the $header variable is for the additional headers in the mail function,
     we are asigning 2 values, first one is FROM and the second one is REPLY-TO.
     That way when we want to reply the email gmail(or yahoo or hotmail...) will know
     who are we replying to. */
    $headers  = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    if( mail($email_to, $subject, $message, $headers) ){
        if($autoResponse === true){
            mail($email, $autoResponseSubject, $autoResponseMessage, $autoResponseHeaders);
        }
    }
?>