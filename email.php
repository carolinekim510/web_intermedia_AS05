<?php
/*
*********************************************************
Name: Caroline Kim
Assignment: 05
Purpose: Build a website with templating header.html and footer.html
Notes: This is where checking the attributes that came from contact form.  Once the contact form submits, it will come to here
then create a header and sends it to the receiver.
*********************************************************
 */

function redirect($url) {
    ob_start();
    header('Location: ' . $url);
    ob_end_flush();
    die();
}

function main() {

    if (!empty($_POST)) {

        $name = substr(strip_tags(trim($_POST['full-name'])), 0, 64);
        $title = substr(strip_tags(trim($_POST['title'])), 0, 64);
        $msg = substr(strip_tags(trim($_POST['user-msg'])), 0);
        $from01 = filter_var($_POST['user-email01'], FILTER_VALIDATE_EMAIL) ? $_POST['user-email01'] : $from = "";

        if (!empty($name) && !empty($from01) && !empty($title) && !empty($msg)) {

            $headers = "From: $from01\r\n";
            $headers .= "Reply-To: $from01\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-type: text/plain; charset=iso-8859-1\r\n";

            if (mail('caroline.kim@g.austincc.edu', $title, $name . '\n\n' . $msg, $headers)) {
                redirect('email-success.php');
            } else {redirect('email-error.php');}

        } else {redirect('email-error.php');}

    } else {redirect('email-error.php');}

}
main();
