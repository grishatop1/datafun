let btn = document.getElementById("gen");

let routers = document.getElementById("routers");
let monitors = document.getElementById("monitors");
let phones = document.getElementById("phones");

let output = document.getElementById("output");

btn.addEventListener("click", ()=>{
    let router = routers.value;
    let monitor = monitors.value;
    let phone = phones.value;

    if (!router) {router="p"}
    if (!monitor) {monitor="p"}
    if (!phone) {phone="p"}

    output.innerHTML = "https://cheburek.pythonanywhere.com/?d=" + router + monitor + phone
});