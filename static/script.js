document.addEventListener("DOMContentLoaded", function() {
    start();
});

let loading_text = document.getElementById("loading");
let output_text = document.getElementById("output");

async function typeWriter(txt) {
    txt = String(txt)
    if (!txt) {return;}
    let i = 0;
    while (i < txt.length) {
      temp = document.getElementById("output").innerHTML
      if ( temp.substring(temp.length - 1, temp.length) === "_") {
        document.getElementById("output").innerHTML = temp.slice(0, -1)
      }
      document.getElementById("output").innerHTML += txt.charAt(i);
      document.getElementById("output").innerHTML += "_";
      i++;
      await new Promise(resolve => setTimeout(resolve, 80))
    }
    temp = document.getElementById("output").innerHTML
    if ( temp.substring(temp.length - 1, temp.length) === "_") {
      document.getElementById("output").innerHTML = temp.slice(0, -1)
    }
    document.getElementById("output").innerHTML += "<br>";
  }

var data = [
    screen.width,
    history.length,
    decodeURIComponent(document.cookie.split(";")),
    
    screen.height,
    document.width,
    document.height,
    innerWidth,
    innerHeight,
    screen.availWidth,
    screen.availHeight,
    screen.colorDepth,
    screen.pixelDepth,
];

async function start() {
    let audio = await new Promise(function(resolve, reject) {
        let audio = new Audio("media/dubstep.mp3");
        audio.addEventListener("canplay", ()=>{
            resolve(audio);
        });
      });
    let ip = await getIP();
    audio.play()
    await new Promise(resolve => setTimeout(resolve, 1800))
    document.body.removeChild(loading_text);

    await typeWriter(ip);
    await typeWriter(platform.name); // 'IE'
    await typeWriter(platform.version); // '10.0'
    await typeWriter(platform.layout); // 'Trident'
    await typeWriter(platform.description); // 'IE 10.0 x86 (platform preview; running in IE 7 mode) on Windows Server 2008 R2 / 7 x64'
    await typeWriter(screen.width + "x" + screen.height);
}

async function getIP() {
    let response = await fetch("/data");
    let data = await response.json()
    let ip = data["ip"]
    return ip
}
