var usernamePathBG = d.getElementById("usernamePathBG"),
    usernamePath = d.getElementById("usernamePath"),
    input = d.getElementById("input"),
    pathBG = d.getElementById("pathBG"),
    card = d.getElementById("card"),
    textHolder = d.getElementById("textHolder"),
    slope = 0.15625,
    textPath = d.getElementById("textPath"),
    topWings = d.getElementById("topWings"),
    topWings2 = d.getElementById("topWings2"),
    settingsH = d.getElementById("settingsHeader"),
    settings = d.getElementById("settings"),
    iconInput = d.getElementById("iconInput"),
    krunkerWings = d.getElementById("krunkerWings"),
    krunkerWingsIcon = d.getElementById("krunkerWingsIcon");
this.hue = 0;
this.iconHue = 0;
this.settingsClosed = false;
this.popups = ["changelog", "download"];
this._3dVal = 50;
this.season = "2";

;

(async function () {
    var version = document.getElementById("version"),
        changelog = await fetch("https://hitthemoney.com/krunker-logo-maker/changelog.txt"),
        changelogText = await changelog.text(),
        changelog2 = document.getElementById("changelog")
    version.innerHTML = changelogText.slice(0, 6)
    changelog2.innerHTML = changelogText
})();

svgToImg(document.getElementById("svg"), "YOURNAME");
updatePreview = () => {
    setTimeout(() => {
        usernamePath.textContent = input.value.toUpperCase();
        usernamePathBG.textContent = input.value.toUpperCase();
        if (input.value.split(" ").join("") == "") {
            usernamePath.textContent = "YOURNAME";
            usernamePathBG.textContent = "YOURNAME";
        }
        document.getElementById("svg").getElementById("usernameBG").style.textShadow = "rgb(16, 16, 16) 0px " + (_3dVal / (_3dVal / 20)).toString() + "px" //document.getElementById("svg").getElementById("usernameBG").style.textShadow.replace(_3dVal.toString() + "px", (_3dVal / 2.5).toString() + "px");
        svgToImg(document.getElementById("svg"), input.value);
        document.getElementById("svg").getElementById("usernameBG").style.textShadow = "rgb(16, 16, 16) 0px " + _3dVal.toString() + "px" //document.getElementById("svg").getElementById("usernameBG").style.textShadow.replace((Math.round((_3dVal / 2.5) * 10000) / 10000).toString() + "px", _3dVal.toString() + "px");
        let usernameBBox = usernamePath.getBBox();
        let width = usernameBBox.width
        let boxWidth = width + 5
        let topCurve = boxWidth / 2
        let startingPoint = 640 - topCurve
        if (width >= 1280) document.getElementById("svg").setAttribute("width", `${width + 25}`)
        else document.getElementById("svg").setAttribute("width", `1280`)
        if (boxWidth >= 1280) {
            textPath.setAttribute("d", `M 0 360 q ${width / 2} ${(width / 2) * 0.15625} ${width} 0`)
            textHolder.setAttribute("transform", "translate(96 54) scale(0.85)")
            topWings.setAttribute("stroke-width", "20")
            d.getElementById('sizeSlider').value = 0.85;
            d.getElementById('sizeInput').value = 0.85
        } else if (720 <= boxWidth && boxWidth <= 1280) {
            textHolder.setAttribute("transform", "translate(0 7) scale(1)")
            topWings.setAttribute("stroke-width", "20")
            d.getElementById('sizeSlider').value = 1;
            d.getElementById('sizeInput').value = 1;
        } else if (480 <= boxWidth && boxWidth <= 720) {
            textHolder.setAttribute("transform", "translate(-96 -45) scale(1.15)")
            topWings.setAttribute("stroke-width", "20")
            d.getElementById('sizeSlider').value = 1.15;
            d.getElementById('sizeInput').value = 1.15;
        } else if (boxWidth <= 480) {
            textHolder.setAttribute("transform", "translate(-192 -95) scale(1.3)")
            topWings.setAttribute("stroke-width", "30")
            d.getElementById('sizeSlider').value = 1.3;
            d.getElementById('sizeInput').value = 1.3;
        } else {
            textHolder.setAttribute("transform", "translate(0 7) scale(1)")
            topWings.setAttribute("stroke-width", "40")
            d.getElementById('sizeSlider').value = 1;
            d.getElementById('sizeInput').value = 1;
        }
        if (startingPoint >= 130) {
            let num = 0
            if (usernamePath.textContent.slice(0, 1).toLowerCase() == "j") num = 38
            boxWidth = width - 100 - num
            topCurve = boxWidth / 2
            startingPoint = 640 - topCurve
            pathBG.setAttribute("d",
                `M ${startingPoint} ${245 + (topCurve * slope) / 2} q ${topCurve} -${topCurve * slope} ${1280 - startingPoint * 2} 0`
            )
            textPath.setAttribute("d",
                `M 0 360 q 640 -100 1280 0`
            )
            //`M 0 380 q 640 -100 1280 0`
            topWings.style.display = "none"
        } else {
            topWings.style.display = ""
            topWings.setAttribute("d",
                `M 130 350 q 445 -69.53125 1022 0`
            )
            boxWidth = width - 100
            topCurve = boxWidth / 2
            startingPoint = 640 - topCurve
            pathBG.setAttribute("d",
                `M ${startingPoint} ${225 + (topCurve * slope) / 2} q ${topCurve} -${topCurve * slope} ${1280 - startingPoint * 2} 0`
            )
            var height = 360 - (_3dVal / 5)
            textPath.setAttribute("d",
                `M 0 ${height} q 640 -100 1280 0`
            )
        }
        boxWidth = width + 5
        if (boxWidth >= 1280) {
            topWings2.style.display = ""
            textPath.setAttribute("d",
                `M -${(width - 1280) / 2} 360 q ${width / 2} -${(width / 2) * 0.15625} ${width} 0`
            )
        } else {
            topWings2.style.display = "none"
        }
    }, 1);
}

changeHue = () => {
    //setTimeout(() => {
    this.hue = d.getElementById("hueInput").value
    d.getElementById("svg").style =
        `transform: scale(0.5) translate(0%, -50%); filter: hue-rotate(${hue}deg)`
    krunkerWingsIcon.style.filter =
        `hue-rotate(${this.iconHue - this.hue}deg)`
    svgToImg(d.getElementById("svg"), input.value);
    //}, 1);
}

changeStroke = () => {
    //setTimeout(() => {
    this.strokeW = d.getElementById("strokeInput").value
    d.getElementById("usernameBG").setAttribute("stroke-width", `${strokeW*2}px`)
    svgToImg(d.getElementById("svg"), input.value);
    //}, 1);
}

changeSize = () => {
    setTimeout(() => {
        this.size = d.getElementById("sizeInput").value
        var x,
            y;
        if (size > 1) {
            x = (-(((size - 1) * 1280) / 2))
            y = (-(((size - 1) * 720) / 2)) + 13
        } else if (size < 1) {
            x = (((1 - size) * 1280) / 2)
            y = (((1 - size) * 720) / 2) + 7
        } else if (size == 1) {
            x = 0
            y = 7
        }
        textHolder.setAttribute("transform", `translate(${x} ${y}) scale(${size})`)
        svgToImg(d.getElementById("svg"), input.value);
        let usernameBBox = usernamePath.getBBox();
        let width = usernameBBox.width * size
        if (width >= 1280) document.getElementById("svg").setAttribute("width", `${width + 25}`)
        else document.getElementById("svg").setAttribute("width", `1280`)
    }, 1);
}

function svgToImg(svg, name) {
    svg.style = `transform: scale(1); filter: hue-rotate(${hue}deg)`;
    var svgData = new XMLSerializer().serializeToString(svg);
    document.getElementById("svg").getElementById("usernameBG").style.textShadow = "rgb(16, 16, 16) 0px " + _3dVal.toString() + "px" //document.getElementById("svg").getElementById("usernameBG").style.textShadow.replace((Math.round((_3dVal / 2.5) * 10000) / 10000).toString() + "px", _3dVal.toString() + "px");
    var svgData2 = new XMLSerializer().serializeToString(svg);
    svg.style = `transform: scale(0.5) translate(0%, -50%); filter: hue-rotate(${hue}deg`;

    window.canvas = d.getElementById("canvas") //createElement("canvas");
    canvas.width = svg.getAttribute('width');
    canvas.height = svg.getAttribute('height');
    var ctx = canvas.getContext("2d");

    window.img = d.createElement("img");
    let svgDataUrl = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    img.setAttribute("src", svgDataUrl);
    img.id = "previewImg"

    img.onload = function () {
        let hue2 = hue
        if (hue2 == 360) hue2 = 720
        //ctx.filter = 'hue-rotate(' + hue2 / 2 + 'deg)';
        ctx.drawImage(img, 0, 0);
        pngLink = canvas.toDataURL("image/png");
        let imgSrcElem = d.getElementsByClassName("imgSrc")
        for (num = 0; num < imgSrcElem.length; num++) imgSrcElem[num]["content"] = pngLink
        d.getElementById("downloadPng").download = `${name}'s_Krunker_Logo.PNG`;
        d.getElementById("downloadPng").href = pngLink;

        d.getElementById("downloadJpg").download = `${name}'s_Krunker_Logo.JPG`;
        d.getElementById("downloadJpg").href = canvas.toDataURL("image/jpeg");

        d.getElementById("downloadSvg").download = `${name}'s_Krunker_Logo.SVG`;
        d.getElementById("downloadSvg").href = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData2)));
    };
};

function checkSettings(event) {
    switch (event) {
        case "out":
            if (settingsClosed == false) {
                settingsH.innerHTML = "Settings";
            }
            break;
        case "hover":
            if (settingsClosed == false) {
                settingsH.innerHTML = "Close Settings";
            }
            break;
        case "click":
            if (settingsClosed == false) {
                settingsClosed = true;
                settings.style = "height: 78px; overflow: hidden;";
                settingsH.innerHTML = "Show Settings";
            } else if (settingsClosed == true) {
                settingsClosed = false;
                settings.style = "";
                settingsH.innerHTML = "Settings";
            }
            break;
    }
}

function textBox(checked) {
    if (checked == true) {
        pathBG.style.display = "";
    } else if (checked == false) {
        pathBG.style.display = "none";
    };
}

function showChangelog() {
    let changelogHolder = document.getElementById("changelogHolder");
    changelogHolder.style.display = "block";
    document.getElementById("popupHolder").style.display = "block";
}

function hidePopup() {
    clearInterval(this.interval);
    for (num = 0; num < popups.length; num++) document.getElementById(popups[num] + "Holder").style.display = "none"
    document.getElementById("popupHolder").style.display = "none"
}

function blobToDataURL(blob, callback) {
    var fr = new FileReader();
    fr.onload = function (e) {
        callback(e.target.result);
    }
    fr.readAsDataURL(blob);
}

iconInput.addEventListener('change', function () {
    changeIcon(this.files);
}, false);

changeIcon = (files) => {
    let icon = files[0]
    //let iconUrl = URL.createObjectURL(icon)
    blobToDataURL(icon, function (dataUrl) {
        //console.log(dataUrl);
        d.getElementById("iconSInput").style.cursor = "initial";
        d.getElementById('iconSSlider').style.cursor = "initial";
        d.getElementById("iconHueInput").style.cursor = "initial";
        d.getElementById('iconHueSlider').style.cursor = "initial";
        d.getElementById("iconCInputX").style.cursor = "initial";
        d.getElementById('iconCInputY').style.cursor = "initial";
        this.iconChanged = true
        if (season == "2") {
            krunkerWings.href.baseVal = wingsNoIcon
            krunkerWings.href.animVal = wingsNoIcon
        } else if (season == "3") {
            krunkerWings.href.animVal = wingsS3NoIcon
            krunkerWings.href.baseVal = wingsS3NoIcon
        }
        krunkerWingsIcon.style.display = ""
        krunkerWingsIcon.src = dataUrl
        svgToImg(document.getElementById("svg"), input.value);
        //krunkerWingsIcon.href.animVal = dataUrl
        //krunkerWingsIcon.href.baseVal = dataUrl
    });
}

changeIconScale = () => {
    let value = d.getElementById("iconSInput").value
    if (this.iconChanged == true) {
        /*let x = 541.5 * (1 - (value - 1)) //541.5 - (value * 100 * (1 + ((value - 1)/2)));
        console.log(x)*/
        let y = 240 + (100 * (1 + (1 - value))); //240 + (100 * ((1 + (1 - value)) * value)); //240 + (100 * (1 + (1 - value))); //340
        if (value > 1) {
            y = 240 + (100 * ((1 + (1 - value)) * value));
        }
        krunkerWingsIcon.style.transform = `scale(${value})`
        krunkerWingsIcon.style.transformOrigin = "center"
        //krunkerWingsIcon.setAttribute("x", x)
        d.getElementById('iconCInputY').value = y;
        krunkerWingsIcon.setAttribute("y", y)
        svgToImg(document.getElementById("svg"), input.value);
    } else {
        d.getElementById("iconSInput").value = 1;
        d.getElementById('iconSSlider').value = 1;
    }
}

changeIconCords = (xy) => {
    if (this.iconChanged == true) {
        if (xy == "x") {
            //krunkerWingsIcon.setAttribute("x", d.getElementById('iconCInputX').value)
            krunkerWingsIcon.style.left = d.getElementById('iconCInputX').value + "px"
        } else if (xy == "y") {
            //krunkerWingsIcon.setAttribute("y", d.getElementById('iconCInputY').value)
            krunkerWingsIcon.style.top = d.getElementById('iconCInputY').value + "px"
        }
        svgToImg(document.getElementById("svg"), input.value);
    } else {
        d.getElementById('iconCInputX').value = 541.5
        d.getElementById('iconCInputY').value = 340
    }
}

changeIconHue = () => {
    if (this.iconChanged == true) {
        this.iconHue = d.getElementById("iconHueInput").value
        krunkerWingsIcon.style.filter = `hue-rotate(${iconHue - this.hue}deg)`
        svgToImg(document.getElementById("svg"), input.value);
    } else {
        d.getElementById("iconHueInput").value = 0;
        d.getElementById("iconHueSlider").value = 0;
    }
}

update3dWidth = (id) => {
    setTimeout(() => {
        var elem = document.getElementById(id)
        document.getElementById("svg").getElementById("usernameBG").style.textShadow = "rgb(16, 16, 16) 0px " + (elem.value).toString() + "px" //document.getElementById("svg").getElementById("usernameBG").style.textShadow.replace(_3dVal.toString() + "px", (elem.value).toString()  + "px");
        this._3dVal = elem.value;
    }, 1);
}

downloadImage = (format) => {
    document.getElementById("download" + format).click();
}

function showDownloadPopup() {
    let downloadHolder = document.getElementById("downloadHolder");
    downloadHolder.style.display = "block";
    document.getElementById("popupHolder").style.display = "block";
}

function changeSeason(val) {

    //krunkerWings.href.baseVal = wingsNoIcon
    //krunkerWings.href.animVal = wingsNoIcon

    this.season = val;
    if (val == "2") {
        if (krunkerWingsIcon.src == document.URL) {
            krunkerWings.href.animVal = wingsWithIcon
            krunkerWings.href.baseVal = wingsWithIcon
        } else {
            krunkerWings.href.animVal = wingsNoIcon
            krunkerWings.href.baseVal = wingsNoIcon
        }
    } else if (val == "3") {
        if (krunkerWingsIcon.src == document.URL) {
            krunkerWings.href.animVal = wingsS3WithIcon
            krunkerWings.href.baseVal = wingsS3WithIcon
        } else {
            krunkerWings.href.animVal = wingsS3NoIcon
            krunkerWings.href.baseVal = wingsS3NoIcon
        }
    }
}