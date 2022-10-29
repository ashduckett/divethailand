
// function makeLeftCanvasPath(ctx, width, height, widthFifteenPercent) {
//     ctx.beginPath();
//     ctx.moveTo(0, 0);
//     ctx.lineTo(width, 0);
//     ctx.lineTo(width - widthFifteenPercent, height);
//     ctx.lineTo(0, height);
//     ctx.lineTo(0, 0);
//     ctx.closePath();
// }

// function makeRightCanvasPath(ctx, width, height, widthFifteenPercent) {
//     ctx.beginPath();
//     ctx.moveTo(widthFifteenPercent, 0);
//     ctx.lineTo(width, 0);
//     ctx.lineTo(width, height);
//     ctx.lineTo(0, height);
//     ctx.lineTo(widthFifteenPercent, 0);
//     ctx.closePath();
// }

// var VideoSplit = function(container, sourceA, sourceB) {
//     var leftMediaSource = sourceA;
//     var leftMuted = true;

//     var leftCanvas = document.createElement('canvas');
//     leftCanvas.id = 'leftCanvas';

//     var ctxLeft = leftCanvas.getContext("2d");
//     var leftVideoContainer; 
//     var leftVideo = document.createElement("video");

//     leftVideo.src = leftMediaSource;
//     leftVideo.autoplay = false;
//     leftVideo.loop = true;
//     leftVideo.muted = leftMuted;

//     leftVideoContainer = {
//         leftVideo : leftVideo,
//         ready: false,
//         ctx: ctxLeft
//     };

//     leftVideo.oncanplay = readyToPlayVideoLeft;

//     var rightMediaSource = sourceB;
//     var rightMuted = true;

//     var rightCanvas = document.createElement('canvas');

//     rightCanvas.id = 'rightCanvas';

//     var ctxRight = rightCanvas.getContext("2d");
//     var rightVideoContainer; 
//     var rightVideo = document.createElement("video");

//     rightVideo.src = rightMediaSource;
//     rightVideo.autoplay = false;
//     rightVideo.loop = true;
//     rightVideo.muted = rightMuted;
    
//     $(rightVideo).attr('playsinline',''); 

//     rightVideoContainer = {
//         leftVideo : rightVideo,
//         ready : false,   
//         ctx: ctxRight
//     };

    

//     rightVideo.oncanplay = readyToPlayVideoRight;


//     // Create an overlay to capture mouse events
//     var eventOverlay = document.createElement('div');
//     eventOverlay.classList.add('eventOverlay');


//     container.appendChild(leftCanvas);
//     container.appendChild(rightCanvas);
//     container.appendChild(eventOverlay);


//     // Syncronise dimensions:
//     leftCanvas.width = leftCanvas.clientWidth;
//     rightCanvas.width = rightCanvas.clientWidth;

//     leftCanvas.height = leftCanvas.clientHeight;
//     rightCanvas.height = rightCanvas.clientHeight;
   
//     syncroniseCoordinateSystems();
//     ctxLeft.save();
//     ctxRight.save();




//     function syncroniseCoordinateSystems() {
//         // Syncronise dimensions:
//         var containerWidth = window.getComputedStyle(container).width;


//         container.style.height = (parseInt(containerWidth) / 100 * 56.25) / 2 + 'px';
//         var height = parseInt(container.style.height);

//         // Get 54.5% of the container width

//         var percentageOfWidth = parseInt(containerWidth) / 100 * 54.5;

//         leftCanvas.width = percentageOfWidth;
//         rightCanvas.width = percentageOfWidth;

//         leftCanvas.height = height;
//         rightCanvas.height = height;

//         leftCanvas.style.height = leftCanvas.height + 'px';
//         rightCanvas.style.height = rightCanvas.height + 'px';


//         var fifteenPercentOfWidth = rightCanvas.width / 100 * 15;
//         makeLeftCanvasPath(ctxLeft, leftCanvas.width, leftCanvas.height, fifteenPercentOfWidth);
//         ctxLeft.clip();

//         makeRightCanvasPath(ctxRight, ctxRight.canvas.width, ctxRight.canvas.height, fifteenPercentOfWidth);
//         ctxRight.clip();


//     }

//     function readyToPlayVideoRight(event) {
//         rightVideoContainer.ready = true;
//     }

//     function readyToPlayVideoLeft(event) {
//         leftVideoContainer.ready = true;
//         requestAnimationFrame(updateCanvasLeft);
//     }

//     function updateCanvasLeft() {

//         var containerWidth = window.getComputedStyle(container).width;

//         // Set the style of the actual container so it retains video aspect ratio
//         container.style.height = (parseFloat(containerWidth) / 100 * 56.25) / 2 + 'px';

//         var height = parseFloat(container.style.height);
//         var width = parseInt(containerWidth) / 100 * 54.5;


//         // only draw if loaded and ready
//         if(leftVideoContainer !== undefined && leftVideoContainer.ready && rightVideoContainer !== undefined && rightVideoContainer.ready) { 
//             ctxLeft.drawImage(leftVideoContainer.leftVideo, 0, 0, width, height);
//             ctxRight.drawImage(rightVideoContainer.leftVideo, 0, 0, width, height);
//         }

//         requestAnimationFrame(updateCanvasLeft);
//     }

  


//         window.addEventListener('resize', function() {
//             syncroniseCoordinateSystems();

//             var fifteenPercentOfWidth = leftCanvas.width / 100 * 15;

//             makeLeftCanvasPath(ctxLeft, leftCanvas.width, leftCanvas.height, fifteenPercentOfWidth);
//             ctxLeft.clip();
//             makeRightCanvasPath(ctxRight, ctxRight.canvas.width, ctxRight.canvas.height, fifteenPercentOfWidth);
//             ctxRight.clip();
//         });




//     function playPauseClick(canvasClicked) {
//         var canvasClickedId = canvasClicked.id;
//         var videoContainer = (canvasClickedId == 'leftCanvas' ? leftVideoContainer : rightVideoContainer);
        
//         if(videoContainer !== undefined && videoContainer.ready) {
//             if(videoContainer.leftVideo.paused) {
//                 videoContainer.leftVideo.play();
//             }
//         }
//     }

//     eventOverlay.addEventListener('mousemove', function(e) {
//         var rect = this.getBoundingClientRect();
//         var x = e.clientX - rect.left;
//         var y = e.clientY - rect.top;
        
//         if (ctxLeft.isPointInPath(x, y)) {
//             leftVideo.play();
//             rightVideo.pause();
//         } else {
//             leftVideo.pause();
//             rightVideo.play();
//         }
//     }); 

//     eventOverlay.addEventListener('mouseout', function(e) {
//             leftVideo.pause();
//             rightVideo.pause();
//     }); 

// };

function VideoSplit(container, sourceA, sourceB) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var video1 = loadVid(sourceA);
    var video2 = loadVid(sourceB);
  
    var width;
    var height;
    var long_width
    var short_width;

    var shouldResize = false;
    var paused = false;
    var canvas_rect = null;
    var loaded = 0;

    window.addEventListener('resize', function() {
        if(paused && !shouldResize) requestAnimationFrame(draw);
        shouldResize = true;
    });
    
    canvas.addEventListener('mousemove', toggleVid);
    canvas.addEventListener('mouseout', pauseVids);

    function init() {
        container.appendChild(canvas);
        resize();
        draw();
        pauseVids();
    }

    function resize() {
        var cont_rect = container.getBoundingClientRect();
        width = canvas.width = cont_rect.width;
        height = canvas.height = (cont_rect.width / 2) * 0.5625; // 16/9 ratio
        container.style.height = height + 'px';

        // since we are dealing with a single path, we can draw it only when resizing the canvas
        drawPath();
        // save our canvas bounding rect so we don't have to request it anymore
        canvas_rect = canvas.getBoundingClientRect();
        shouldResize = false;
    }

    function drawPath() {
        var w = width / 2;
        var margin = w * (0.15 / 2);
        
        ctx.beginPath();
        ctx.lineTo(0, 0);
        ctx.lineTo(w + margin, 0); // 7.5% on the right of the center
        ctx.lineTo(w - margin, canvas.height); // 7.5 % on the left of the center
        ctx.lineTo(0, canvas.height);
    }

    function draw() {
        if (shouldResize) {
        // resize only in the rAF callback, so it fires once per frame at max
        resize();
        } else {
        if (paused) return; // force redraw on resize, even if paused
            // micro-optimization... resizing already clears the canvas
            ctx.globalCompositeOperation = 'source-over';
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
    
        var w = width / 2;
        var margin = w * (0.15 / 2);

        ctx.fill(); // draws our Path
        ctx.globalCompositeOperation = 'source-in'; // next drawing will occur only on the drawn Path
        ctx.drawImage(video1, 0, 0, w + margin, height);
        ctx.globalCompositeOperation = 'destination-over'; // next drawing will occur behind current drawing
        ctx.drawImage(video2, w - margin, 0, w + margin, height);

        requestAnimationFrame(draw); // do it again
    }

    function toggleVid(evt) {
        var mouse_x = evt.clientX - canvas_rect.left;
        var mouse_y = evt.clientY - canvas_rect.top;
        
        if (ctx.isPointInPath(mouse_x, mouse_y)) {
            video1.play();
            video2.pause();
        } else {
            video2.play();
            video1.pause();
        }
    
        if (paused) {
            paused = false;
            draw();
        }
    }

    function pauseVids() {
        video1.pause();
        video2.pause();
        paused = true;
    }

    function onVidload() {
        if (++loaded === 2)
            init();
    }

    function loadVid(url) {
        var video = document.createElement('video');
        video.src = url;
        video.onloadedmetadata = onVidload;
        video.onerror = function() {
            console.error('failed to load video resource, check you are on a browser that does support webm video format')
        };
        video.muted = true;
        video.repeat = true;
        video.play();
        return video;
    }
}
