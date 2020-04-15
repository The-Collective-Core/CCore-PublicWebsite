
var bg=document.getElementById("bganima");

var asclog=document.getElementById("asciilogo");

var asclog_elments=asclog.children[0].children[0].children;

var asclog_main=asclog.children[0].children[0];

//var con_txt=document.getElementById("console_text").children[0];

const hexstr="0xABCDEF123456789uX";

var phrases=["integrating rouge AI;","scaning subroutine;","SYSTEM CHECK;","Cleaning Sensors;","Trouble shooting;","Allocating Memory;","CONNECTING...;","Mounting Subroutine;","observing\\\\\\\\\\;"]

/** how many lines will be present in the left console, logo has 24 lines */
const line_limit=24;

/* playing with color */
for(var i=0;i<asclog_elments.length;i++)
{
    if(asclog_elments[i].getAttribute("color")=="black")
    {
        //asclog_elments[i].setAttribute("color","#221f1f");
        
    }
    
    /* creating initial text in console */
    if(i>line_limit*2)
    {
        //add_console();
    }
}


/* switch charcters randomly in logo, and change prefial color */
function rndtxt()
{
    var rnd=Math.floor(Math.random()*asclog_elments.length);
    if(asclog_elments[rnd].getAttribute("color")=="#221f1f")
    {
        asclog_elments[rnd].setAttribute("color","#101010");
        setTimeout(function(){asclog_elments[rnd].setAttribute("color","#221f1f");},Math.floor(Math.random()*1000)+500);
        //return;
    }
    var txt=asclog_elments[rnd].textContent.substring(0,asclog_elments[rnd].textContent.length);
    var char=hexstr[Math.floor(Math.random()*hexstr.length)];
    txt=txt.replace(txt.charAt(Math.floor(Math.random()*txt.length)),char); 
    asclog_elments[rnd].textContent=txt;
    
    
}


/* add a command text line to console and delete the oldest line */
function add_console()
{
    if(Math.random()*0.8>Math.random())
    {
        return;
    }
    var cmd=document.createElement("FONT");
    var txt=document.createTextNode("#"+Math.floor(Math.random()*20000+10000).toString(10)+">> "+phrases[Math.floor(Math.random()*phrases.length)]);
    
    cmd.appendChild(txt)
    con_txt.appendChild(document.createElement("BR"));
    con_txt.appendChild(cmd);
    
    if(con_txt.children.length>line_limit*2)
    {
        con_txt.children[0].remove();
        con_txt.children[0].remove();
    }
}


/* blinking pointer at bottom of console */
function blink_text() {
    $('#blinker').fadeOut(250);
    $('#blinker').fadeIn(250);
}

/** start everything */
//setInterval(blink_text, 500);
setInterval(rndtxt,1);

/**console */
//setInterval(add_console,350);
