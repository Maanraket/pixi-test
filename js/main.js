(function(){ 
    var _width = 320;
    var _height = 320;

	// You can use either PIXI.WebGLRenderer or PIXI.CanvasRenderer
    var renderer = new PIXI.WebGLRenderer(_width,_height,{transparent: true});
    renderer.clearBeforeRender = false;
    renderer.blendModeManager.setBlendMode(1);
    renderer.mapBlendModes();
    var canvas1 = document.body.appendChild(renderer.view);

    var stage = new PIXI.Stage;
    var numberStars = 30000;
    var starContainers = Array();
    starTexture = PIXI.Texture.fromImage("img/dot.png");
    for(var i=0;i<numberStars;i++){
        star =  new PIXI.Sprite(starTexture);

        star.position.x = Math.random() * _width;
        star.position.y = Math.random() * _height;

        star.scale.x = .2;
        star.scale.y = .2;
        star.alpha = .6;

        starContainers.push({
            star: star,
            x: Math.random() * _width * 6 - _width / 2 * 6,
            y: Math.random() * _width * 6 - _width / 2 * 6,
            step: Math.round(Math.random()*1000)
        });

        stage.addChild(star);
    }

    requestAnimationFrame(animate);
    var mousePos = {x:_width/2,y:_height/2};
    var counter = 0;
    var mouseEasing = 0.05;
    function animate() {
        counter++;
        //var mousePos = stage.getMousePosition().x > 0 ? stage.getMousePosition() : {x:_width/2,y:_height/2};
        mousePos = stage.getMousePosition().x > 0 ? {x:mousePos.x * (1-mouseEasing) + stage.getMousePosition().x*mouseEasing, y:mousePos.y * (1-mouseEasing) + stage.getMousePosition().y*mouseEasing} : mousePos;
        var deviation = {x:(mousePos.x-_width/2)/_width + Math.sin(counter/100)*0.45, y:(mousePos.y-_height/2)/_height + Math.sin(counter/80+1.5)*0.45};
        
        for(var i=0;i<numberStars;i++){
            var stepSize = Math.sqrt(Math.abs(starContainers[i].x) + Math.abs(starContainers[i].y)) * (Math.pow(starContainers[i].step,3)/100000) * (0.90+Math.random()*.2) * (Math.sin(counter/100)/2+1); 
            starContainers[i].step = starContainers[i].step < 1000 ? starContainers[i].step + stepSize: Math.random()*5;
            starContainers[i].star.position.x = _width/2 + starContainers[i].x * Math.pow(starContainers[i].step,2)/50 + deviation.x*_width*starContainers[i].step/50;
            starContainers[i].star.position.y = _height/2 + starContainers[i].y * Math.pow(starContainers[i].step,2)/50 + deviation.y*_height*starContainers[i].step/50;
            
            //starContainers[i].star.position.x += (starContainers[i].x/10);
            //starContainers[i].star.position.y += (starContainers[i].y/10);

            starContainers[i].star.scale.y = (starContainers[i].step/1000) * 600 * (Math.abs(starContainers[i].x)/_width+1) *(Math.abs(starContainers[i].y)/_height+1) * (starContainers[i].step/10) ;
            
            if(Math.abs(starContainers[i].y)<Math.abs(starContainers[i].x)){
                starContainers[i].star.rotation = Math.sin(starContainers[i].y/starContainers[i].x)+Math.PI/2;
            } else {
                starContainers[i].star.rotation = -Math.sin(starContainers[i].x/starContainers[i].y);
            }
        }


        renderer.render(stage);

        requestAnimationFrame(animate);
    }

    window.onresize = resizeHandler;
    var resizeHandler = function(event) {
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;

        _width = x;
        _height = y;
        renderer.resize(x,y);
    };
    resizeHandler();
})();