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
      temp = document.getElementById("output").innerHTML
      if ( temp.substring(temp.length - 1, temp.length) === "_") {
        document.getElementById("output").innerHTML = temp.slice(0, -1)
      }
      document.getElementById("output").innerHTML += txt.charAt(i);
      document.getElementById("output").innerHTML += "_";
      i++;
      await new Promise(resolve => setTimeout(resolve, 60))
    }
    temp = document.getElementById("output").innerHTML
    if ( temp.substring(temp.length - 1, temp.length) === "_") {
      document.getElementById("output").innerHTML = temp.slice(0, -1)
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
    
    let idata = await getIPData(ip);

    //GOOO
    audio.play()
    await new Promise(resolve => setTimeout(resolve, 1800))
    document.body.removeChild(loading_text);

    await typeWriter("IP: " + ip)
    for (const [key, value] of Object.entries(idata)) {
      await typeWriter(key + ": " + value);
    }
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

async function getIPData(ip) {
  if (ip == "127.0.0.1") {
    ip = "109.165.224.229"
  }
  let data = await fetch("http://ip-api.com/json/"+ip)
  let json = await data.json();
  let output = {
    "COUNTRY": json["country"],
    "ISP": json["as"],
    "LAT": json["lat"],
    "LON": json["lon"],
  }
  return output
}