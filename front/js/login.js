app.controller('loginCtrl', function($scope) {

    console.log(localStorage.login);
    if (localStorage.login == "true") {
        console.log("login: "+localStorage.login);
        document.querySelector('.errorLogin').style.display = "none";
        document.querySelector('#loginForm').style.display = "none";
    } else if(localStorage.login == "false" || localStorage.login == undefined){
        console.log("not login: "+localStorage.login);
        document.querySelector('#logedIn').style.display = "none";
    }

    $scope.login = function() {
        const Http = new XMLHttpRequest();
        const url='/login';
        Http.open("POST", url, true);
        Http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        Http.send("name="+document.querySelector('#name').value+"&pwd="+document.querySelector('#pwd').value);
        Http.onreadystatechange= (e)=>{
            console.log(Http.status);
            if(Http.status == 200){
                console.log("login");
                localStorage.setItem("login", true);
                localStorage.setItem("temp", Http.response);
                document.querySelector('#logedIn').style.display = "block";
                document.querySelector('.errorLogin').style.display = "none";
                document.querySelector('#loginForm').style.display = "none";
                window.location.reload();
            } else{
                localStorage.setItem("login", false);
                localStorage.setItem("temp", undefined);
                console.log("not login");
                document.querySelector('#logedIn').style.display = "none";
                document.querySelector('.errorLogin').innerHTML = (Http.status == 404) ? "The password is wrong": "The username is wrong";
                document.querySelector('.errorLogin').style.display = "block";
            }
        };
    };

    $scope.logout = function() {
        localStorage.setItem("login", false);
        localStorage.setItem("temp", undefined);
        document.querySelector('#logedIn').style.display = "none";
        document.querySelector('.errorLogin').style.display = "none";
        document.querySelector('#loginForm').style.display = "block";
        window.location.reload();
    }
});