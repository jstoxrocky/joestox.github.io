var canvas
var ctx

function initialize_canvas(){

    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight
    ctx = canvas.getContext("2d");

}


function clear_canvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00B2EE"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}





function draw_circle_with_alpha(x,y,radius,color,multiplier){

    alpha = 1-(multiplier/200)

    ctx.save();
    ctx.globalAlpha = alpha;
    draw_circle(x,y,radius,color,multiplier)
    ctx.restore();


    return alpha

}







function draw_circle(x,y,radius,color,multiplier){

    ctx.fillStyle = color;
    ctx.beginPath();

    radius_list = get_circle_sizes(multiplier*radius)

    ctx.arc(x,y,radius_list[0],0,2*Math.PI,false);
    ctx.arc(x,y,radius_list[1],0,2*Math.PI, true);
    ctx.closePath();
    ctx.fill();

}




function get_circle_sizes(s){

    s_small = s - 1
    return [s, s_small]
}








$(document).ready(function(){

    initialize_canvas()
    clear_canvas()


    $("body").click(function(event){  

        ripple_list.push({"x":event.pageX,"y":event.pageY,"size":0.99,"multiplier":10})
        $(".outer").fadeOut('slow')
        $("#footer").fadeIn(10000)

        // sleep_loop()

    })

    function sleep_loop(){

        clear_canvas()

        for(var i in ripple_list){

            alpha = recursive_circle(ripple_list[i].x, ripple_list[i].y, ripple_list[i].size,ripple_list[i].multiplier)
            ripple_list[i].multiplier = ripple_list[i].multiplier + 10

            // console.log(alpha)

            if (alpha < 0.015){
                // console.log('hi')
            // if (ripple_list[i].multiplier > 300){
                ripple_is_gone = true
                removal_num = removal_num + 1
            }

        }

        if (ripple_is_gone){
            ripple_list = ripple_list.splice(1, removal_num);
            ripple_is_gone = false
        }

        setTimeout(sleep_loop, 100)

    }


    
    var multiplier = 0
    var ripple_list = []
    var removal_num = 0
    var ripple_is_gone = false
    sleep_loop()



});