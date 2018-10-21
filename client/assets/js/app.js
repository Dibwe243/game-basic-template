(() => {
    'use strict';
    let body =document.getElementsByTagName('body')[0];
    let formsContainer = document.querySelector('.main');
    let gameScript =document.createElement('script');
    let loginForm = document.getElementsByTagName('form')[0];

    let flash_section = document.getElementById('snackbar');

//Flash messages important to give user feedbacks
  async function flashMessages(errorStatus, message){

    flash_section.innerHTML =message;
    flash_section.classList.add('show');

    //Turn color of message depending on the nature
    //green if positive  and red is error occured
    if(errorStatus >= 200 && errorStatus < 300){
      flash_section.style.background= 'green';
    }else{
      flash_section.style.background= 'red';
    }
    //Display then hide the meaage for 3 minute
  await  setTimeout(()=>{

          flash_section.classList.remove('show');
    },3000);

  }

  //Function to load The game script when needed
   function loadGameScript(){
     let promise;
    return promise = new Promise((resolve, reject)=>{
      console.log('about to load the game');
        gameScript.type = 'text/javascript';
        gameScript.src ='assets/js/game.js'

        gameScript.setAttribute('id','game');
        gameScript.async = true;
        resolve(gameScript);

      })
    }

    //Hide the authentification form
    function removeForm(){
      formsContainer.style.display='none';

    }

    //Load the authentification form
    function loadForm(){
      formsContainer.style.display='display';

    }

    //Check if use is logged in
    async function isUserLoggedIn(){


      let authenticated = false;

      await fetch("api/v1/auth/isLoggedIn")
      .then(res=>res.json())
      .then(res=>{
          if(res){
            console.log('authenticated status', res.authenticated)
            authenticated = res.authenticated;
          }
      })
      return authenticated;


    }

    async function initialLoad(){
      if(! isUserLoggedIn){
          loadForm();
        }else{
          removeForm();
          await loadGame();
          flashMessages(200, 'user already logeed in');

        }

    }
    async function loadGame(){
    await loadGameScript().then(
          script=>{
            body.appendChild(script);
          })
          .catch(err=>{alert('Oops something went wrong')});

    }

    async function authenticateUser(email,pass){
      const userData ={
        email:email,
        password:pass
      };
      const options ={
        method:'POST',
        body:JSON.stringify(userData),
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };

      await fetch('api/v1/auth/login',options)
      .then(res => res.json())
      .then(res =>{  return res})
      .catch(err=> console.log('Oops something went wrong ',err.status))
    }


    //display the form when the page load
    document.addEventListener('DOMContentLoaded',initialLoad);


    //login form is submited

    loginForm.addEventListener('submit',async (e)=>{
      e.preventDefault();
      const email = loginForm.querySelector('input[type ="text"]').value;
      const pass = loginForm.querySelector('input[type ="password"]').value;
      //await console.log('authenticating the user ', authenticateUser(email,pass));
      if(email && pass){
        let isUserIn = await isUserLoggedIn();
         if (!isUserIn ){
              let auth = await authenticateUser(email,pass);
              console.log('the person ',auth);
              if (auth){
                console.log('successfull loggedIn');

                removeForm();
                await loadGame();
                flashMessages(200, 'successfully loggedIn');

              }else{
                console.log('Oops something went wrong could not log you in ');
                flashMessages(401, 'Oops something went wrong could not log you in ');

              }
          }else{
            removeForm();
            await loadGame();
          console.log('user already logged in. Not you?', 'Loggout');
          flashMessages(200, 'user already logged in. Not you?', 'Loggout');

        }

      }else{
        //alert('Email or password missing');
        flashMessages(401, 'Email or password missing');


      }


    });


    let registrationForm = document.getElementsByTagName('form')[1];

    function toJsonString(form){
      let registrationObj ={};

      for(var i =0; i<registrationForm.length;++i){
        let element = registrationForm[i];
        let name = element.name;
        let value = element.value;

        if(name){
          registrationObj[name]=value;
        }
      }

      return JSON.stringify(registrationObj);

    }

    //Registration form is submited
    registrationForm.addEventListener('submit',async (e)=>{
      e.preventDefault();
      let json = toJsonString(this);
      console.log(json);

    //Register user


    const options ={
      method:'POST',
      body:json,
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };

    await fetch('api/v1/auth/register',options)
    .then(res => res.json())
    .then(user =>{
      if(user.email){
        console.log('registration was a success ',user)
        flashMessages(200, 'registration was a success');
      }else{
        console.log('user exist ',user.code)
        flashMessages(user.code,'User exist');
      }


    })
    .catch(err=>{
      console.log('Oops something went wrong ',err.code);
      flashMessages(err.code, 'Oops something went wrong');

    });




      });










  })()

  /*To do

  1.ability to Add user
    * display the registration form -done
    * get the data from the user
    * check if the user exists
    * Add the user to the database
    * display a suceesfull mesage
    * hide the registration form
    * Display the login form
  2.ability to login a user
    * display the loggin form -done
    * get user input -done
    * check if the user is already logged in
    * log the user
    * remove the login form
    *  Display the game witht the details
  3.ability to logout the user

    *check if the user is loged in
    *distroy the session
    *hide the game
    * display the login form

  4.ability to check if the user is logged inspect
  5. ability to check if the user exist


*/
//console.log('finished loading the game script ');
//console.log(document.getElementsByTagName('body')[0]);




 //gameScript.parentNode.removeChild(loginForm);
 //console.log('Game script removed',document.getElementsByTagName('body')[0]);
 //console.log('Game script ',);
