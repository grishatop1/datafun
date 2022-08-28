document.getElementById("go").addEventListener("click", () => {
  start();
});

let loading_text = document.getElementById("loading");
let output_text = document.getElementById("output");

async function typeWriter(txt) {
    txt = String(txt)
    if (!txt) {return;}
    let i = 0;
    while (i < txt.length) {
      document.getElementById("output").innerHTML += txt.charAt(i);
      i++;
      await new Promise(resolve => setTimeout(resolve, 80))
    }
    document.getElementById("output").innerHTML += "<br>";
  }

async function start() {
    document.getElementById("go").style.display = "None";
    loading_text.style.display = "";
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

    await typeWriter("IP: " + ip)
    await typeWriter(platform.name); // 'IE'
    await typeWriter(platform.version); // '10.0'
    await typeWriter(platform.layout); // 'Trident'
    await typeWriter(platform.description); // 'IE 10.0 x86 (platform preview; running in IE 7 mode) on Windows Server 2008 R2 / 7 x64'
    await typeWriter(screen.width + "x" + screen.height);
    await typeWriter(screen.pixelDepth);
}

async function getIP() {
    let response = await fetch("/data");
    let data = await response.json()
    let ip = data["ip"]
    return ip
}