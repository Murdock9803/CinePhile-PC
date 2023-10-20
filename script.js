//SHERY.JS USAGE
Shery.imageEffect("#back", { 
    style: 2, 
    config: { 
        "resolutionXY": { "value": 100 }, 
        "distortion": { "value": false }, 
        "mode": { "value": -3 }, 
        "mousemove": { "value": 0 }, 
        "modeA": { "value": 1 }, 
        "modeN": { "value": 0 }, 
        "speed": { "value": 1, "range": [-500, 500], "rangep": [-10, 10] }, 
        "frequency": { "value": 50, "range": [-800, 800], "rangep": [-50, 50] }, 
        "angle": { "value": 0.5, "range": [0, 3.141592653589793] }, 
        "waveFactor": { "value": 1.4, "range": [-3, 3] }, 
        "color": { "value": 10212607 }, 
        "pixelStrength": { "value": 3, "range": [-20, 100], "rangep": [-20, 20] }, 
        "quality": { "value": 5, "range": [0, 10] }, 
        "contrast": { "value": 1, "range": [-25, 25] }, 
        "brightness": { "value": 1, "range": [-1, 25] }, 
        "colorExposer": { "value": 0.18, "range": [-5, 5] }, 
        "strength": { "value": 0.2, "range": [-40, 40], "rangep": [-5, 5] }, 
        "exposer": { "value": 8, "range": [-100, 100] }, 
        "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, 
        "aspect": { "value": 2.0551948703386897 }, 
        "gooey": { "value": true }, 
        "infiniteGooey": { "value": true }, 
        "growSize": { "value": 4, "range": [1, 15] }, 
        "durationOut": { "value": 1, "range": [0.1, 5] }, 
        "durationIn": { "value": 1.5, "range": [0.1, 5] }, 
        "displaceAmount": { "value": 0.5 }, 
        "masker": { "value": false }, 
        "maskVal": { "value": 1, "range": [1, 5] }, 
        "scrollType": { "value": 0 }, 
        "geoVertex": { "range": [1, 64], "value": 1 }, 
        "noEffectGooey": { "value": true }, 
        "onMouse": { "value": 1 }, 
        "noise_speed": { "value": 0.2, "range": [0, 10] }, 
        "metaball": { "value": 0.1, "range": [0, 2] }, 
        "discard_threshold": { "value": 0.5, "range": [0, 1] }, 
        "antialias_threshold": { "value": 0, "range": [0, 0.1] }, 
        "noise_height": { "value": 0.28, "range": [0, 2] }, 
        "noise_scale": { "value": 20.66, "range": [0, 100] } }, 
    gooey: true });



//h1 scroll motion 

var elems = document.querySelectorAll(".elem");

elems.forEach( function(elem){
    var h1s = elem.querySelectorAll("h1");
    var index = 0;
    var animating = false;

    document.querySelector("#main").addEventListener("click", function (){
        if (!animating){
            animating : true;

            gsap.to(h1s[index], {
                top: "-=100%",
                ease: Expo.easeInOut,
                duration:1,
                onComplete: function (){
                    gsap.set(this._targets[0], {top: "100%"});
                    animating : false;
                }
            })

            index === h1s.length - 1 ? (index = 0) : index++;

            gsap.to(h1s[index], {
                top: "-=100%",
                ease: Expo.easeInOut,
                duration:1
            })
        }
})
})



// carousel
const track = document.getElementById("image-track");

window.onmousedown = e => {
  track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
  if (track.dataset.mouseDownAt == "0") return;
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, -15), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({transform: `translate(${nextPercentage}%, -50%)`},{ duration: 1200, fill: "forwards" });

  let children = document.getElementById("image-track").childElementCount;

  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${nextPercentage / children + (50+50/children)}% center`}, { duration: 1200, fill: "forwards"});
  }
}