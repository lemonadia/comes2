document.addEventListener("DOMContentLoaded", function(){
    // Get Masonry layout img height
    var workImg = document.getElementsByClassName('work-img');

    for (var i = 0; i < workImg.length; i++) {
        var imgHeight = workImg.item(i).offsetHeight;
        console.log(imgHeight);
        var img = workImg.item(i);
        img.parentNode.style.height = imgHeight + 'px';
    }

    // Homepage Hero heading animations
    var homeHero = anime.timeline({
        easing: 'cubicBezier(.5, .05, .1, .3)',
        duration: 1000
    });

    homeHero
        .add({
            targets: '.h1-anim',
            translateY: 0,
        })
});


