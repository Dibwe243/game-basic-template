(function(){




//Let form valition happen --login
let validate = (event)=>{

    let userName = document.getElementById('inputUsername3');
    let password = document.getElementById('password3');

    
    if(!userName.value.trim() || !password.value.trim()){

        alert("Please input password or username");

        event.preventDefault();
        
    }
}

//Let form validation happen -- registration

let validateRegistration = (event)=>{
    alert('working');
    
    let password =document.getElementById('password');
    let passwordConfirmation = document.getElementById('inputPasswordConf');

    if(password.value.trim() !== passwordConfirmation.value.trim()){
        alert('Password and password confirmation do not match');
        event.preventDefault();
    }
  
}

function valid(e){
    if(e.target !== e.currentTarget){
        let clickedItem = e.target.id;
        alert("Hello"+ clickedItem);
    }

    e.stopPropagation();
}

//Thy shall validate when login is pressed
document.querySelector('#loginBtn').addEventListener('click',valid);
document.getElementById('registerNow').addEventListener('click',valid);




})()