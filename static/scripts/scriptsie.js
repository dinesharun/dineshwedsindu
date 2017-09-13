var tarYear = 2013;
var tarMon  = 6;
var tarDay  = 23;
var tarHour = 10;
var tarMin  = 0;
var tarSec  = 0;

var slack    = 1000*60*60*3; // 3 Hours
var holdTime = 1000*60*60*3; // 3 Hours

var colored     = 1;
var desaturated = 1;
var isItIE      = -1;
var currLink    = -1;
var numEntry    = 0;
var gbFilled    = 0;
var testMode    = 1;
var localMode   = 1;
var numEntry    = 0;
var mapMode     = "m";
var lastSelMapID    = 3;

var magicDate = new Date(tarYear, (tarMon-1), tarDay, tarHour, tarMin, tarSec, 0);
var today     = new Date();

function onLoadActions()
{
	isItIE = getInternetExplorerVersion();
	
	$.support.cors = true;
	
	calculateTime();
	registerMouseEvents();
	BlinkCursor();
	preloadImages('imgs/home.pngc.png,imgs/story.pngc.png,imgs/info.pngc.png,imgs/album.pngc.png,imgs/guestbook.pngc.png, \
				imgs/indu.pngc.png,imgs/dinesh.pngc.png');
	registerForms();
	fillGuestBook();
	
	displayIEWarning();
	setTimeout(function () {resetIEWarning();}, 30000);
}

function displayIEWarning()
{
	$("body").append('<div id="IEWarning" style="position:fixed;top:15%;right:33%;width:24%;height:15%;z-index:999999;font-family:salsa;' + 
					 ' background-color:#cccccc;border:1px solid #000000;color:#ee6666;font-size:124%;padding:1%;">' +
					 ' We see you are using Internet Explorer ' + isItIE + '. Please use someother modern browser for a better ' +
					 ' user experience. Auto close in 30 seconds.....</div>');
}

function resetIEWarning()
{
	$("#IEWarning").css("display", "none");
}

function registerMouseEvents()
{
   $("#hBD").mouseenter(function() {colorize('hBI', 0);});
   $("#hBD").mouseleave(function() {desaturate('hBI');});
   $("#hGD").mouseenter(function() {colorize('hGI', 0);});
   $("#hGD").mouseleave(function() {desaturate('hGI');});  
}

function getInternetExplorerVersion()
{
   var rv = -1; 
   
   if (navigator.appName == 'Microsoft Internet Explorer')
   {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
         rv = parseFloat( RegExp.$1 );
   }
   
   return rv;
}

function registerForms()
{
	$("#gIF").submit(function(event) {
		 
	  /* stop form from submitting normally */
	  event.preventDefault();
	  
	/* get some values from elements on the page: */
	  var $form = $( this ),
		  name  = $form.find( 'input[name="name"]' ).val(),
		  email = $form.find( 'input[name="email"]' ).val(),
		  log   = $form.find( 'textarea[name="log"]' ).val(),
		  url = $form.attr( 'action' );
		  
	  /* Redirect to local if testing */
	  if(localMode == 1)
	  {
		url = "http://localhost:8081/greetings/greet";
	  }
	  
	  /* Validate the form */
	  if((name == "") || (name == " ") || (name == "Name... (Req)"))
	  {
		alert("A Valid Name is required for Posting....");
	  }
	  else if((log == "") || (log == " ") || (log == " Enter Your Wishes in Our Guestbook... "))
	  {
		alert("At least something is required for Posting....");
	  }
	  else
	  {
		/* Send the data using post */
		this.submit();
	  }
	});
}

function fillGuestBook()
{
	var url = "";
	
	var c1 = document.getElementById("gCL");
		
	if(c1)
	{	
		c1.innerHTML = '<iframe class="cmtFrame" allowTransparency="true" frameborder="0"; src="https://dineshwedsindudatastore.appspot.com/entries"></iframe>';
	}
}

function BlinkCursor()
{
    var c = document.getElementById("cursor");
    
    if(c)
    {
       if(c.innerHTML == "|")
       {
          c.innerHTML = "&nbsp;";
       }
       else
       {
          c.innerHTML = "|";
       }
    }
    
    setTimeout("BlinkCursor()", 1000);
}


function colorize(id, index)
{
    var img = document.getElementById(id);
	
	if(img)
	{
	    numEntry++;
		
		if(numEntry >= 8)
		{
			numEntry = 7;
		}
		
		$(img).animate(
				{
					opacity: 0.3
				},
				{
					duration: 50,
					easing: "linear",
                  
					complete: function() 
					{
						var oldPath = img.src;
						var newPath = oldPath + 'c.png';
						img.src = newPath;	
						
						$(img).animate(
										{
											opacity: 1.0
										},
										{
											duration: 100,
											easing: "linear",					
											
											complete: function() 
											{
												var txt = document.getElementById("tmtxt");
												
												if(txt)
												{
													switch(index)
													{
														case 0:
															break;
														case 1:
															txt.innerHTML = "Go back to Home";
															break;
														case 2:
															txt.innerHTML = "Marriage related Info";
															break;
														case 3:
															txt.innerHTML = "Albums";
															break;
														case 4:
															txt.innerHTML = "Write a few words in our Guestbook";
															break;		
														case 5:
															txt.innerHTML = "Tourist Guide";
															break;	
														case 6:
															txt.innerHTML = "Invitation";
															break;																
														case 7:
															txt.innerHTML = "Travel Info";
															break;	
														default:
															txt.innerHTML = "&nbsp;";
															break;	
													}
												}
											}
										}
									);
					}
				}
			);
	}
}

function desaturate(id)
{
    var img = document.getElementById(id);

	if(img)
	{
		$(img).animate(
				{
					opacity: 0.3
				},
				{
					duration: 600,
					easing: "linear",
                  
					complete: function() 
					{
						var path = img.src;
						path = path.replace("c.png", "");
						img.src = path;
						
						$(img).animate(
										{
											opacity: 1.0
										},
										{
											duration: 300,
											easing: "linear",					
											
											complete: function() 
											{
												var txt = document.getElementById("tmtxt");
												
												if(numEntry > 0)
												{
													numEntry--;
												}
												else
												{
													numEntry = 0;
												}
												
												if((txt) && (numEntry == 0))
												{
													txt.innerHTML = "&nbsp;";
												}												
											}
										}
									);
					}
				}
			);
	}	
}

function calculateTime()
{  
   var cd = document.getElementById("countDown");
   
   var crossed  = checkCrossed();
   
   if(cd)
   {
	   today=new Date();
	   
	   cd.innerHTML = "";   
	   
	   if(crossed == 0)
	   {
		 if(deltaYears(crossed) != 0)
		 cd.innerHTML += '<span class="num">&nbsp;' + deltaYears(crossed) + '&nbsp;</span>' + " Year(s) ";
		 if(deltaMonths(crossed) <= 1)
		 cd.innerHTML += '<span class="num">&nbsp;' + deltaMonths(crossed) + '&nbsp;</span>' + " Month ";
		 else if(deltaMonths(crossed) != 0)
		 cd.innerHTML += '<span class="num">&nbsp;' + deltaMonths(crossed) + '&nbsp;</span>' + " Months "; 
		 if(deltaDays(crossed) <= 1)
		 cd.innerHTML += '<span class="num">&nbsp;' + deltaDays(crossed)   + '&nbsp;</span>' + " Day ";
		 else if(deltaDays(crossed) != 0)
		 cd.innerHTML += '<span class="num">&nbsp;' + deltaDays(crossed)   + '&nbsp;</span>' + " Days ";     
		 if(deltaHours(crossed) <= 1)
		 cd.innerHTML += '<span class="num">&nbsp;' + deltaHours(crossed)   + '&nbsp;</span>' + " Hour ";
		 else if(deltaHours(crossed) != 0)
		 cd.innerHTML += '<span class="num">&nbsp;' + deltaHours(crossed)   + '&nbsp;</span>' + " Hours ";
		 if(deltaMinutes(crossed) <= 1)
		 cd.innerHTML += '<span class="num">&nbsp;' + deltaMinutes(crossed)   + '&nbsp;</span>' + " Minute ";
		 else if(deltaMinutes(crossed) != 0)
		 cd.innerHTML += '<span class="num">&nbsp;' + deltaMinutes(crossed)   + '&nbsp;</span>' + " Minutes ";   
		 if(deltaSeconds(crossed) <= 1)
		 cd.innerHTML += '<span class="num">&nbsp;' + deltaSeconds(crossed)   + '&nbsp;</span>' + " Second ";
		 else if(deltaSeconds(crossed) != 0)
		 cd.innerHTML += '<span class="num">&nbsp;' + deltaSeconds(crossed)   + '&nbsp;</span>' + " Seconds ";     
		 
		 cd.innerHTML += "<br /><div class=\"mrgEvent\"> Left for Our Wedding </div> ";
	   }
	   else if(crossed == 1)
	   {
		 cd.innerHTML += "<div class=\"mrgEvent\"> The magic is happening </div> ";
	   }
	   else
	   {
		 cd.innerHTML += '<span class="num">&nbsp;' + deltaYears(crossed)  + '&nbsp;</span>' + " Year(s) ";
		 cd.innerHTML += '<span class="num">&nbsp;' + deltaMonths(crossed) + '&nbsp;</span>' + " Month(s) ";
		 cd.innerHTML += '<span class="num">&nbsp;' + deltaDays(crossed)   + '&nbsp;</span>' + " Day(s) ";
		 cd.innerHTML += '<span class="num">&nbsp;' + deltaHours(crossed)   + '&nbsp;</span>' + " Hour(s) ";
		 cd.innerHTML += '<span class="num">&nbsp;' + deltaMinutes(crossed)   + '&nbsp;</span>' + " Minute(s) "; 
		 cd.innerHTML += '<span class="num">&nbsp;' + deltaSeconds(crossed)   + '&nbsp;</span>' + " Second(s) "; 		 
		 cd.innerHTML += "<div class=\"mrgEvent\"> Since weadlock </div>";   
	   }
		 
	   setTimeout("calculateTime()", 1000);
	}
}

function checkCrossed()
{ 
   var tarTime  = magicDate.getTime();
   var currTime = today.getTime();
   
   if(tarTime > (currTime + slack))
   {
     return 0;
   }
   else if(tarTime >= (currTime - holdTime))
   {
     return 1;
   }
   else
   {
     return 2;
   }
}


function deltaYears(crossed)
{
  if(crossed == 0)
  {
    return Math.floor(((magicDate.getTime() - today.getTime()) / (1000*60*60*24*365)));
  }
  else
  {
    return Math.floor(((today.getTime() - magicDate.getTime()) / (1000*60*60*24*365)));
  }  
}

function deltaMonths(crossed)
{
  if(crossed == 0)
  {
    return Math.floor((((magicDate.getTime() - today.getTime()) / (1000*60*60*24)) - (deltaYears(crossed)*365))/30);
  }
  else
  {
    return Math.floor((((today.getTime() - magicDate.getTime()) / (1000*60*60*24)) - (deltaYears(crossed)*365))/30);
  } 
}

function deltaDays(crossed)
{
  if(crossed == 0)
  {
    return Math.floor(((magicDate.getTime() - today.getTime()) / (1000*60*60*24)) - (deltaYears(crossed)*365) - (deltaMonths(crossed)*30));
  }
  else
  {
    return Math.floor(((today.getTime() - magicDate.getTime()) / (1000*60*60*24)) - (deltaYears(crossed)*365) - (deltaMonths(crossed)*30));
  } 
}

function deltaHours(crossed)
{
  if(crossed == 0)
  {
    return Math.floor(((magicDate.getTime() - today.getTime()) / (1000*60*60)) - (deltaYears(crossed)*365*24) - (deltaMonths(crossed)*30*24) - (deltaDays(crossed)*24));
  }
  else
  {
    return Math.floor(((today.getTime() - magicDate.getTime()) / (1000*60*60)) - (deltaYears(crossed)*365*24) - (deltaMonths(crossed)*30*24) - (deltaDays(crossed)*24));
  } 
}

function deltaMinutes(crossed)
{
  if(crossed == 0)
  {
    return Math.floor(((magicDate.getTime() - today.getTime()) / (1000*60)) - (deltaYears(crossed)*365*24*60) - (deltaMonths(crossed)*30*24*60) - (deltaDays(crossed)*24*60) - (deltaHours(crossed)*60));
  }
  else
  {
    return Math.floor(((today.getTime() - magicDate.getTime()) / (1000*60)) - (deltaYears(crossed)*365*24*60) - (deltaMonths(crossed)*30*24*60) - (deltaDays(crossed)*24*60) - (deltaHours(crossed)*60));
  } 
}

function deltaSeconds(crossed)
{
  if(crossed == 0)
  {
    return Math.floor(((magicDate.getTime() - today.getTime()) / (1000)) - (deltaYears(crossed)*365*24*60*60) - (deltaMonths(crossed)*30*24*60*60) - (deltaDays(crossed)*24*60*60) - (deltaHours(crossed)*60*60) - (deltaMinutes(crossed)*60));
  }
  else
  {
    return Math.floor(((today.getTime() - magicDate.getTime()) / (1000)) - (deltaYears(crossed)*365*24*60*60) - (deltaMonths(crossed)*30*24*60*60) - (deltaDays(crossed)*24*60*60) - (deltaHours(crossed)*60*60) - (deltaMinutes(crossed)*60));
  } 
}

function preloadImages(images) 
{
	var i = 0;
	var imageArray = new Array();
	var imageObj   = new Image();
	
	imageArray = images.split(',');
	
	var p = document.getElementById("preLoadDiv");
	
	if(p)
	{
		p.innerHTML = "0%";
	}
	
	for(i=0; i<=imageArray.length-1; i++) 
	{
		//document.write('<img src="' + imageArray[i] + '" />');// Write to page (uncomment to check images)
		imageObj.src=imageArray[i];
		
		if(p)
		{
			p.innerHTML = (((i+1)/imageArray.length)*100) + "%";
		}
	}
	
	if(p)
	{	
		p.style.display = "none";
	}
}

function removeVal(id)
{
	var i = document.getElementById(id);
	
	if(i)
	{
		if(i.value==i.defaultValue)
		{
			i.value='';
		}
		
		i.style.color = "#000000";
	}
}

function addVal(id)
{
	var i = document.getElementById(id);
	
	if(i)
	{
		if(i.value=='')
		{
			i.value=i.defaultValue;
		}
		
		i.style.color = "#aaaaaa";
	}
}


function switchMap(id,type)
{
	var m = "#loc" + id;
	
	if(id == -1)
	{
		if(mapMode == "s") { mapMode = "m"; $("#lSwt").html("Switch To Satellite");}
		else {mapMode = "s"; $("#lSwt").html("Switch To Map");}
		id = lastSelMapID;
		m = "#loc" + lastSelMapID;
	}
	
	type = mapMode;
	$(".locName").attr("style", "");
	$(m).css("backgroundColor", "#9f9fac");
	$(m).css("fontWeight", "bold");
	$("#iLMF").attr("src", "map.htm?i="+id+"&t="+type);
	
	lastSelMapID = id;
}

