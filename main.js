/*
*********************************************************
Name: Caroline Kim
Assignment: 05
Purpose: Build a website with templating header.html and footer.html
Notes: This is javascript portion where it checks all the attributes that were taken from the form.
This should be showing if all the fields are entered correctly.
However, since the site is strictly using the email-error.php, this won't show to the user where and what part of the form is entered wrong.
*********************************************************
*/


"use strict";

function validEmail(email) {
    /* do not modify this fucntion, just use it as is */
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


function clearForm() {
    document.forms[0].reset();
    document.getElementById('answer-area').innerText = '';
}


function validate() {
    var inputArr = document.getElementsByTagName('input');      //array of input items
    var errorMsg = [];                                          //empty array for error message
    var isMatch = true;

    for (var i = 0; i < inputArr.length; i++) {
        var input = inputArr[i];

        if (!input.value.trim()) {                                                  //Validating input fields
            errorMsg.push('Please enter ' + input.placeholder);
        } else {
            if (input.getAttribute('id') == 'name') {                               //Validating name field value
                var name = document.getElementById('name').value.trim();
                var ckStringName = /^([A-Za-z]+\s)*[A-Za-z]+$/;

                if (!ckStringName.test(name)) {
                    errorMsg.push(input.placeholder + ' cannot contain special characters.');
                }
                document.getElementById('name').value = name;
            }
            if (input.getAttribute('id') == 'email-01') {                           //Validating Emails file value
                var email = document.getElementById('email-01').value;

                if (!validEmail(email)) {
                    errorMsg.push(input.placeholder + ' format is wrong');
                } else {
                    if (email != document.getElementById('email-02').value) {
                        isMatch = false;
                        errorMsg.push('Emails do not match');
                    }
                }
            }
            if (input.getAttribute('id') == 'subject') {                            //Validating subject field and trimming
                input.value = document.getElementById('subject').value.trim();
            }
        }
    }

    var message = document.getElementById('message');                               //Validating Message field

    if (!message.value.trim()) {
        errorMsg.push(message.placeholder + ' can\'t be left blank.');
    } else {
        if (message.value.length >1000) {
            errorMsg.push('Can\'t exceed 1000 characters');
        }
    }
    return errorMsg;                                                                //Returns Array of errorMsg
}


/* My event handler */
var sendBtn = document.getElementById('msg-send');
sendBtn.onclick = function () {
    var errorMsg = validate();                                              //Grabbing all the return values from validate()
    if (errorMsg.length > 0){
        document.getElementById('answer-area').innerText = errorMsg.join('\n');
    } else {
        document.forms["names-form"].submit();
    }
    document.forms["names-form"].submit();

};

var resetBtn = document.getElementById('msg-clear');                                //Clear error messages and fields from form
resetBtn.onclick = function () {
    clearForm();
};
