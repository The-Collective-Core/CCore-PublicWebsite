function logout(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "www.centralmind.net/logout.php", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
    logout: 'logout'
    }));
    window.location.replace("http://www.centralmind.net");
}