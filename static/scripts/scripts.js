var tarYear = 2013;
var tarMon  = 6;
var tarDay  = 23;
var tarHour = 10;
var tarMin  = 0;
var tarSec  = 0;

var slack    = 1000*60*60*3; // 3 Hours
var holdTime = 1000*60*60*3; // 3 Hours

var currImg = null;
var mouse_x = 0;
var mouse_y = 0;
var currImgOldLeft = "";
var currImgOldTop  = "";
var currImgOldzIdx = "";
var currImgOldSrc  = "";
var currImgRotate  = 0;
var currImgObj = null;

var albumState = new Array();

var lastEvtID   = 7;
var lastCmtId   = 0;
var colored     = 1;
var desaturated = 1;
var isItIE      = -1;
var currLink    = -1;
var numEntry    = 0;
var gbFilled    = 0;
var mapMode     = "m";
var lastSelMapID    = 3;
var lastTravelRouteID = 0;
var lastSelectedImg = null;
var loaded = 0;
var prevTourId = 0;

var testMode    = 0;
var localMode   = 0;

var magicDate = new Date(tarYear, (tarMon-1), tarDay, tarHour, tarMin, tarSec, 0);
var today     = new Date();

function onLoadActions()
{
	var targetID = 0;
	
	window.onresize = function () {resizeMe();};
	isItIE = getInternetExplorerVersion();
	
	if(isItIE == -1)
	{
		resizeMe();
	}
	else
	{
		shrinkClock();
		displayIEWarning();
		setTimeout(function () {resetIEWarning();}, 30000);
	}

    calculateTime();
	registerMouseEvents();
    BlinkCursor();
	preloadImages('imgs/loading.gif, imgs/home.pngc.png,imgs/story.pngc.png,imgs/info.pngc.png,imgs/album.pngc.png,imgs/guestbook.pngc.png, \
	               imgs/indu.pngc.png,imgs/dinesh.pngc.png');
	registerForms();
	InitAlbum();
	showEvtTime(2);
	switchMap(3,"m");
	
	var getArray = getParameters();
	
	if(getArray["t"] == "gb")
	{
		targetID = 4;
	}
	
	/* Go to intial section */
	setTimeout(function() {changePage(targetID);}, 600);
	
	/* hide loading */
	var c = document.getElementById("loadDiv");
	c.innerHTML = "Loaded!";
	$("#loadDiv").animate({backgroundColor: "#eeeeee", }, {duration: 1200, easing: 'swing', complete: function () {$("#loadDiv").css("display", "none");} } );	
	loaded = 1;
}

function getParameters() 
{
  var searchString = window.location.search.substring(1)
    , params = searchString.split("&")
    , hash = {}
    ;

  for (var i = 0; i < params.length; i++) {
    var val = params[i].split("=");
    hash[unescape(val[0])] = unescape(val[1]);
  }
  return hash;
}

function registerMouseEvents()
{
	window.ondragstart = function() { return false; }
    document.onmousemove = updateMousePos;
    $("#hBD").mouseenter(function() {colorize('hBI', 0);});
    $("#hBD").mouseleave(function() {desaturate('hBI');});
    $("#hGD").mouseenter(function() {colorize('hGI', 0);});
    $("#hGD").mouseleave(function() {desaturate('hGI');});  
    $(".albumImgs").mousedown(function (){currImg = this;dragInProgress = 0;});
    $(document).mouseup(function (){currImg = null;});
}

function updateMousePos(e)
{
	mouse_x = document.all ? window.event.clientX : e.pageX;
	mouse_y = document.all ? window.event.clientY : e.pageY;
	
	if(currImg != null)
	{ 
	  var offset_x = parseInt($("#aS").css("left"), 10);
	  var offset_y = parseInt($("#aS").css("top"), 10);
	  
	  currImg.style.left = (mouse_x - (offset_x + (currImg.width/2)))  + "px";
	  currImg.style.top  = (mouse_y - (offset_y + (currImg.height/2))) + "px";
	  
	  dragInProgress = 1;
	}
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

function changePage(to)
{
    var same = 0;
	
	switch(currLink)
	{
		case 0:
		{
			$("#hITL").animate( {top:"111%", left: "21%", }, {duration: 2000, easing: 'swing'} );
			$("#hITR").animate( {top:"111%", right: "21%", }, {duration: 2000, easing: 'swing'} );
			$("#hBD").animate( {left: "-34.1%", }, {duration: 900, easing: 'swing'} );
			$("#hGD").animate( {right: "-34.1%", }, {duration: 1500, easing: 'swing'} );
			$("#hI").animate( {top: "111%", }, {duration: 1800, easing: 'swing'} );
			$("#hITT").animate( {top: "111%", }, {duration: 1800, easing: 'swing'} );
			$("#hII").animate( {top: "124%", }, {duration: 1800, easing: 'swing'} );
			$("#hBI").animate( {marginLeft: "-100%", }, {duration: 900, easing: 'swing'} );
			$("#hGI").animate( {marginRight: "-100%", }, {duration: 1500, easing: 'swing'} );			
		}
		break;
		
		case 1:
		{
			$("#iND").animate( {left: "-100%", }, {duration: 900, easing: 'swing'} );
		}
		break;
		
		case 2:
		{
			$("#iDID").animate( {top: "-90%", }, {duration: 900, easing: 'swing'} )
			$("#iTID").animate( {left: "-60%", }, {duration: 900, easing: 'swing'} )
			$(".evts").animate( {left: "0%", }, {duration: 900, easing: 'swing'} )
			$("#iLID").animate( {right: "-100%", }, {duration: 900, easing: 'swing'} )
		}
		break;	
		
		case 3:
		{
			InitAlbum();
			$("#aS").animate( {top: "200%", bottom: "250%"}, {duration: 900, easing: 'swing'} )
		}
		break;

        case 4:
		{
			$("#gIN").animate( {top: "-15%", }, {duration: 1200, easing: 'swing'} );
			$("#gIT").animate( {top: "-12%", }, {duration: 1100, easing: 'swing'} );
			$("#gIE").animate( {top: "-15%", }, {duration: 900, easing: 'swing'} );
			$("#gCS").animate( {top: "120%", }, {duration: 1500, easing: 'swing'} );
			$("#gIB").animate( {top: "-15%", }, {duration: 1300, easing: 'swing'} );		
		}
		break;
		
		case 5:
		{
			$("#tI1").animate( {top: "-82%", }, {duration: 1100, easing: 'swing'} );
			$("#tI2").animate( {top: "-82%", }, {duration: 900, easing: 'swing'} );
			$("#tI3").animate( {top: "-82%", }, {duration: 600, easing: 'swing'} );
			$("#tI4").animate( {top: "-82%", }, {duration: 1200, easing: 'swing'} );
			$("#tI5").animate( {top: "-82%", }, {duration: 700, easing: 'swing'} );
			$("#tI6").animate( {top: "-82%", }, {duration: 1000, easing: 'swing'} );
			$("#tI7").animate( {top: "-82%", }, {duration: 800, easing: 'swing'} );
			$("#tIFD").animate( {bottom: "-82%", }, {duration: 800, easing: 'swing'} );

			var p = "#tIB" + prevTourId;
			$(p).animate( {bottom: "-82%", }, {duration: 720, easing: 'linear'} );	
		}
		break;
		
		case 6:
		{
			$("#tR1").animate( {left: "-69%", }, {duration: 900, easing: 'swing'} );
			$("#tR2").animate( {left: "-69%", }, {duration: 1200, easing: 'swing'} );
			$("#tR3").animate( {left: "-69%", }, {duration: 600, easing: 'swing'} );
			$("#tR4").animate( {left: "-69%", }, {duration: 1100, easing: 'swing'} );
			$("#tR5").animate( {left: "-69%", }, {duration: 800, easing: 'swing'} );
			$("#tOD").animate( {top: "-210%", }, {duration: 800, easing: 'swing'} );		
		}
		break;
		
		default:
		{
		}
		break;	
	}
	
	if(currLink == to)
	{
		same = 1;
	}
	
	currLink = to;
	
	switch(to)
	{
		case 0:
		{
			$("#hBD").animate( {left: "0%", }, {duration: 900, easing: 'swing'} );
			$("#hGD").animate( {right: "0%", }, {duration: 1500, easing: 'swing'} );
			$("#hI").animate( {top: "51%", }, {duration: 1800, easing: 'swing'} );
			$("#hITT").animate( {top: "44%", }, {duration: 1800, easing: 'swing'} );
			$("#hII").animate( {top: "27%", }, {duration: 1800, easing: 'swing'} );
			$("#hBI").animate( {marginLeft: "0%", }, {duration: 900, easing: 'swing'} );
			$("#hGI").animate( {marginRight: "0%", }, {duration: 1500, easing: 'swing'} );
			$("#hITL").animate( {top:"66%", left: "0%", }, {duration: 2000, easing: 'swing'} );
			$("#hITR").animate( {top:"66%", right: "0.6%", }, {duration: 2000, easing: 'swing'} );			
		}
		break;
		
		case 1:
		{
			$("#iND").animate( {left: "3%", }, {duration: 900, easing: 'swing'} );
		}
		break;
		
		case 2:
		{
			$("#iDID").animate( {top: "0%", }, {duration: 900, easing: 'swing'} )
			$("#iTID").css("height", $("#iTID").width());
			$("#iTID").animate( {left: "1%", }, {duration: 900, easing: 'swing'} )
			$(".evts").animate( {left: "39%", }, {duration: 1500, easing: 'linear'} )
			$("#iLID").animate( {right: "-1%", }, {duration: 900, easing: 'swing'} )
		}
		break;
		
		case 3:
		{
			$("#aS").animate( {top: "12%", bottom: "13%"}, {duration: 900, easing: 'swing'} )
		}
		break;
		
		case 4:
		{
			$("#gIN").animate( {top: "21%", }, {duration: 1100, easing: 'swing'} );
			$("#gIT").animate( {top: "18%", }, {duration: 1000, easing: 'swing'} );
			$("#gCS").animate( {top: "30%", }, {duration: 1500, easing: 'swing'} );
			$("#gIE").animate( {top: "21%", }, {duration: 900, easing: 'swing'} );
			$("#gIB").animate( {top: "21%", }, {duration: 1200, easing: 'swing'} );
			
			/* Fill the Guest Book Contents only the first time 
			   On second thought let's update everytime we come in */
			if((same == 0) /* && (gbFilled == 0)*/)
			{
				fillGuestBook();
				gbFilled = 1;
			}
		}
		break;
		
		case 5:
		{
			$("#tI1").animate( {top: "-12%", }, {duration: 1100, easing: 'swing'} );
			$("#tI2").animate( {top: "-12%", }, {duration: 900, easing: 'swing'} );
			$("#tI3").animate( {top: "-12%", }, {duration: 600, easing: 'swing'} );
			$("#tI4").animate( {top: "-12%", }, {duration: 1200, easing: 'swing'} );
			$("#tI5").animate( {top: "-12%", }, {duration: 700, easing: 'swing'} );
			$("#tI6").animate( {top: "-12%", }, {duration: 1000, easing: 'swing'} );
			$("#tI7").animate( {top: "-12%", }, {duration: 800, easing: 'swing'} );
			$("#tIFD").animate( {bottom: "-12%", }, {duration: 800, easing: 'swing'} );
			
			changeTourPlace(0);
		}
		break;
		
		case 6:
		{
			$("#tR1").animate( {left: "-0.9%", }, {duration: 900, easing: 'swing'} );
			$("#tR2").animate( {left: "-0.9%", }, {duration: 1200, easing: 'swing'} );
			$("#tR3").animate( {left: "-0.9%", }, {duration: 600, easing: 'swing'} );
			$("#tR4").animate( {left: "-0.9%", }, {duration: 1100, easing: 'swing'} );
			$("#tR5").animate( {left: "-0.9%", }, {duration: 800, easing: 'swing'} );
			$("#tOD").animate( {top: "6%", }, {duration: 800, easing: 'swing'} );
			ChangeTravelRoutes(1);
		}
		break;
		
		default:
		{
		}
		break;
	}
}

function registerForms()
{
	if(isItIE != -1)
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
	else
	{
		$("#gIF").submit(function(event) {
		 
		  /* stop form from submitting normally */
		  event.preventDefault();
		 
		  /* get some values from elements on the page: */
		  var $form = $( this ),
			  name  = $form.find( 'input[name="name"]' ).val(),
			  email = $form.find( 'input[name="email"]' ).val(),
			  log   = $form.find( 'textarea[name="log"]' ).val();
			  
		  /* Redirect to local if testing */
		  if(localMode == 1)
		  {
			url = "http://localhost:8081/greetings/greet";
		  }
		  else
		  {
			url = "https://dineshwedsindudatastore.appspot.com/guestbook/greet";
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
			var posting = $.post( url, { name: name, email: email, log: log, test: testMode }, null, "json");
			
			var n = document.getElementById("gIN"); if(n) {n.value = "Name... (Req)"};
			var e = document.getElementById("gIE"); if(e) {e.value = "Email... (Opt)"};
			var l = document.getElementById("gIT"); if(l) {l.value = " Enter Your Wishes in Our Guestbook... "};		
		 
			/* Put the results in a div */
			posting.done(function( data ) 
			{
				if(localMode == 1)
				{
					var respArray = new Array();
					respArray     = data.split(',');
				
					$(".mCSB_container").prepend('<div class="cmt" id="gC' + (n) + '">' +  respArray[0] + '<div class="cmtName">' 
												+ respArray[1] + ' </div> <div class="cmtDate"> ' + respArray[2] + ' </div></div>');
				}
				else
				{		
					$(".mCSB_container").prepend('<div class="cmt cmt' + (lastCmtId%2) + '" id="gC' + (n) + '"><div class="cmtNo">(' + (lastCmtId++) + ')</div>' 
												+ data[0].Post + '<div class="cmtName">' 
												+ data[0].Name + ' </div> <div class="cmtDate"> ' + data[0].CreatedTime + ' </div></div>');
				}
				
				/* Add the scroll bar a little while later */
				setTimeout(function () {$("#gCL").mCustomScrollbar("update");}, 300);
			});
		  }
		});
	}
}

function fillGuestBook()
{
	var url = "";
	
	var c1 = document.getElementById("gCL");
	
	if(isItIE != -1)
	{
		if(c1)
		{	
			c1.innerHTML = '<iframe class="cmtFrame" allowTransparency="true" frameborder="0"; src="https://dineshwedsindudatastore.appspot.com/entries"></iframe>';
		}
	}
	else
	{
		if(c1)
		{	
			c1.innerHTML = '<div class="cmtLoading"> <img style="width:99%;" src="imgs/loading.gif" /> </div>';
		}
		
		if(localMode == 1)
		{
			url = "http://localhost:8081/";
		}
		else
		{
			url ="https://dineshwedsindudatastore.appspot.com/root";
		}
		
		var getting = $.get(url, "", null, "json" );	

		/* Put the results in a div */
		getting.done(function( data ) 
		{
			if(localMode == 1)
			{
				var respArray = new Array();
				respArray     = data.split(',');
			}
			
			var i = 0;
			var c = document.getElementById("gCL");
			
			if(c)
			{	
				c.innerHTML = "";
				
				if(localMode == 1)
				{
					for(i=0;i<=respArray.length-1;i+=3)
					{
						if((respArray[i] != undefined) && (respArray[i+1] != undefined) && (respArray[i+2] != undefined))
						{
							c.innerHTML += '<div class="cmt" id="gC' + (i/3) + '">' +  respArray[i] + '<div class="cmtName">' 
											+ respArray[i+1] + ' </div> <div class="cmtDate"> ' + respArray[i+2] + ' </div></div>';
						}
					}
				}
				else
				{
					for(i=0;i<=data.length-1;i++)
					{
						if((data[i].Post != undefined) && (data[i].Name != undefined) && (data[i].CreatedTime != undefined))
						{
							c.innerHTML += '<div class="cmt cmt' + (i%2) + '"id="gC' + (i) + '"><div class="cmtNo">(' + (data.length - (i+1)) + ')</div>' 
											+ data[i].Post + '<div class="cmtName">' 
											+ data[i].Name + ' </div> <div class="cmtDate"> ' + data[i].CreatedTime + ' </div></div>';
						}
					}		
					lastCmtId = data.length;
				}
				
				c.innerHTML += "<br /><br /><br /><br /> ~~~ End of Wishes ~~~ <br /><br /><br />";
				
				/* Add the scroll bar a little while later */
				setTimeout(function () {
											$("#gCL").mCustomScrollbar(
																	{
																		theme:"dark-thick",
																		mouseWheel:true, 
																		mouseWheelPixels:300,
																		scrollButtons:{
																			enable:true,
																			scrollType:"continuous",
																			scrollSpeed:120,
																			scrollAmount:300
																		},
																		advanced:{
																			updateOnBrowserResize:true,
																			updateOnContentResize:true
																		}
																	}
																  );
											}, 900);	
			}
		});
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
    
	if(loaded == 0)
	{
		setTimeout("BlinkCursor()", 500);
	}
}

function colorize(id, index)
{
    var img = document.getElementById(id);
	
	if(img)
	{
	    numEntry++;
		
		if(numEntry >= 6)
		{
			numEntry = 5;
		}
		
		$(img).animate(
				{
					opacity: 0.3,
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
											opacity: 1.0,
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
											opacity: 1.0,
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

/* Resize the fonts according to the size of the browser window */
function resizeMe()
{
    //Standard height, for which the body font size is correct
    var preferredHeight = 864; 
    var preferredWidth = 1152; 
    var fontsize = 15;

    var displayHeight = $(window).height();
    var displayWidth  = $(window).width();
    var percentageH   = ((displayHeight) / preferredHeight);
    var percentageW   = ((displayWidth) / preferredWidth);
    //var percentage    = ((percentageH > percentageW)?(percentageW):(percentageH))
	var percentage = (percentageH + percentageW)/2;
    var newFontSize   = Math.floor(fontsize * percentage);
	/* var newWidth      = (((preferredWidth)*(displayHeight)) / (preferredHeight));
	
	$("html").css("width", newWidth);
	$("body").css("width", newWidth);
	$(window).width(newWidth);
	var t = $(window).width(); */
	
    $("body").css("font-size", newFontSize); 
	
	var bt = document.getElementById("bmtxt");
	
	if(bt)
	{
		if(displayHeight < 270)
		{
			bt.style.display = "none";
		}
		else
		{
			bt.style.display = "block";
		}
	}
}

/* Remove the default value from the form element */
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

/* Restore the default value to the form element */
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

/* Display the selected image from the album */
function SelectImage(i)
{
	var idx = -1;

	if(dragInProgress == 0)
	{
		if(i.name == "a1") { idx = 0; }
		else if(i.name == "a2") { idx = 1; }
		else if(i.name == "a3") { idx = 2; }
		
		/* If album not open open it first */
		if(albumState[idx] == 0)
		{
			randomizeImages(idx);
		}
		/* If album already opened display the image */
		else
		{
			if((i.className == "albumImgs albumImgs1") || (i.className == "albumImgs albumImgs2") || (i.className == "albumImgs albumImgs3"))
			{
				/* If an image is already opened close it first */
				if(currImgObj != null)
				{
					if(currImgObj.name == "a1") { currImgObj.className  = "albumImgs albumImgs1"; }
					else if(currImgObj.name == "a2") { currImgObj.className  = "albumImgs albumImgs2"; }
					else if(currImgObj.name == "a3") { currImgObj.className  = "albumImgs albumImgs3"; }
					currImgObj.style.left = currImgOldLeft;
					currImgObj.style.top  = currImgOldTop;
					currImgObj.style.zIndex = currImgOldzIdx;
					currImgObj.src = currImgOldSrc;
					currImgObj.style.transform       = "rotate(" + currImgRotate + "deg)";
					currImgObj.style.webkitTransform = "rotate(" + currImgRotate + "deg)";
					currImgObj.style.mozTransform    = "rotate(" + currImgRotate + "deg)";
					currImgObj.style.msTransform     = "rotate(" + currImgRotate + "deg)";
					currImgObj.style.oTransform      = "rotate(" + currImgRotate + "deg)";			
				}
				
				/* Open the requested image */
				currImgOldLeft = i.style.left;
				currImgOldTop  = i.style.top;
				currImgOldzIdx = i.style.zIndex;
				currImgOldSrc  = i.src;
				currImgRotate  = parseInt(i.style.borderSpacing, 10);
				i.className  = "albumImgCurr";
				i.src += "_b.jpg";
				
				i.style.left = "24%";
				
				if(i.height > i.width)
				{
					i.style.left = "39%";
				}
				i.style.top  = "3%";
				i.style.zIndex = "609";
				i.style.transform       = "rotate(" + 0 + "deg)";
				i.style.webkitTransform = "rotate(" + 0 + "deg)";
				i.style.mozTransform    = "rotate(" + 0 + "deg)";
				i.style.msTransform     = "rotate(" + 0 + "deg)";
				i.style.oTransform      = "rotate(" + 0 + "deg)";
				currImgObj = i;
			}
			/* Close the requested image */
			else
			{
				if(i.name == "a1") { i.className  = "albumImgs albumImgs1"; }
				else if(i.name == "a2") { i.className  = "albumImgs albumImgs2"; }
				else if(i.name == "a3") { i.className  = "albumImgs albumImgs3"; }
				i.style.left = currImgOldLeft;
				i.style.top  = currImgOldTop;
				i.style.zIndex = currImgOldzIdx;
				i.src = currImgOldSrc;
				i.style.transform       = "rotate(" + currImgRotate + "deg)";
				i.style.webkitTransform = "rotate(" + currImgRotate + "deg)";
				i.style.mozTransform    = "rotate(" + currImgRotate + "deg)";
				i.style.msTransform     = "rotate(" + currImgRotate + "deg)";
				i.style.oTransform      = "rotate(" + currImgRotate + "deg)";
				currImgObj = null;
			}
		}
	}
	dragInProgress = 0;
}

/* Initialize the albums  */
function InitAlbum()
{
	var a = document.getElementById("aS");
	var imgs = $("#aS").children();
	var i = 0;
	
	if(a)
	{
		/* Initialize album states to closed */
		albumState[0] = 0;
		albumState[1] = 0;
		albumState[2] = 0;
		
		/* remove the screen */
		$("#aScr").attr("style", "");
		
		for(i=0;i<=imgs.length-1;i++)
		{
			/* For all images */
			if(imgs[i].nodeName.toLowerCase() == "img")
			{
				/* Select a random inital rotation */
				$(imgs[i]).animate( {borderSpacing: Math.floor((Math.random()*36)-18) }, {
										step: function(now,fx) {
										  $(this).css('-webkit-transform','rotate('+now+'deg)');
										  $(this).css('-moz-transform','rotate('+now+'deg)'); 
										  $(this).css('-ms-transform','rotate('+now+'deg)');
										  $(this).css('-o-transform','rotate('+now+'deg)');
										  $(this).css('transform','rotate('+now+'deg)');  
										},
										duration:'600'
									},'swing');	
									
				/* Renove any inline stlyes from the images */					
				$(imgs[i]).attr("style", "");
				
				/* Restore the default class of the images */
				if(imgs[i].name == "a1")
				{
					$(imgs[i]).attr("class", "albumImgs albumImgs1");
				}
				else if(imgs[i].name == "a2")
				{
					$(imgs[i]).attr("class", "albumImgs albumImgs2");
				}
				else if(imgs[i].name == "a3")
				{
					$(imgs[i]).attr("class", "albumImgs albumImgs3")
				}				
			}
		}
	}
}

/* Open/Close an album and randomly arrange the images */
function randomizeImages(albumIndx)
{
	var a = document.getElementById("aS");
	var imgs = $("#aS").children();
	var i = 0;
	
	if(a)
	{
		for(i=0;i<=imgs.length-1;i++)
		{
			/* Only select images avoid div/span etc... */
			if(imgs[i].nodeName.toLowerCase() == "img")
			{
				/* Only choose images of current album */
				if(imgs[i].name == ("a" + (albumIndx+1)))
				{
					/* If album closed open it */
					if(albumState[albumIndx] == 0)
					{
						$(imgs[i]).animate( {left: ((((i%7)*13)+1) + (Math.floor((Math.random()*3)-1))) + "%", 
											 top:  ((((i%3)*27)+3) + (Math.floor((Math.random()*2)-1))) + "%",
											 borderSpacing: Math.floor((Math.random()*36)-18) }, {
												step: function(now,fx) {
												  $(this).css('-webkit-transform','rotate('+now+'deg)');
												  $(this).css('-moz-transform','rotate('+now+'deg)'); 
												  $(this).css('-ms-transform','rotate('+now+'deg)');
												  $(this).css('-o-transform','rotate('+now+'deg)');
												  $(this).css('transform','rotate('+now+'deg)');  
												},
												complete: function() {
												  $(this).css('z-index', '607');
												  $(this).css('border', '2px dotted #cccccc');
												},
												duration:'600'
											},'swing');		
					}
					/* If album opened close it */
					else
					{
						/* Remove any inline styles */
						$(imgs[i]).attr("style", "");
						
						/* Restore the default class of the images */
						if(imgs[i].name == "a1")
						{
							$(imgs[i]).attr("class", "albumImgs albumImgs1");
						}
						else if(imgs[i].name == "a2")
						{
							$(imgs[i]).attr("class", "albumImgs albumImgs2");
						}
						else if(imgs[i].name == "a3")
						{
							$(imgs[i]).attr("class", "albumImgs albumImgs3")
						}	

						$(imgs[i]).animate( {borderSpacing: Math.floor((Math.random()*36)-18) }, {
										step: function(now,fx) {
										  $(this).css('-webkit-transform','rotate('+now+'deg)');
										  $(this).css('-moz-transform','rotate('+now+'deg)'); 
										  $(this).css('-ms-transform','rotate('+now+'deg)');
										  $(this).css('-o-transform','rotate('+now+'deg)');
										  $(this).css('transform','rotate('+now+'deg)');  
										},
										duration:'600'
									},'swing');	
					}
				}
			}
		}
		
		/* Switch album states */
		if(albumState[albumIndx] == 0)
		{
			albumState[albumIndx] = 1;
			/* Add the screen */
			$("#aScr").attr("style", "left:0%;width:100%;height:100%;");
		}
		else
		{
			albumState[albumIndx] = 0;
		}
	}
}

function showEvtTime(id)
{
	var currEle = "#evt" + id;
	var lastEle = "#evt" + lastEvtID;
	
	$(lastEle).attr("style", "left:39%;height:39%;top:" + ((lastEvtID-1)*12) + "%");
	
	$(currEle).css("color", "#aa3333");
	$(currEle).css("backgroundColor", "#99999f;");
	$(currEle).css("border", "2px solid black");
	$(currEle).css("zIndex", "6");
				
	switch(id)
	{
		case 1:
			{
				rotateEle("#iTCM", 180, 900, id);
				rotateEle("#iTCH", 225, 900, id);
				$("#iTCT").html("07:30 AM");
				$("#evt1").animate( {height: "38%", }, {duration: 1200, easing: 'linear', step: function (now, fx){changeLastEle(lastEle, now, fx, id);} } );
				if(lastEvtID > 1) { $("#evt2").animate( {top: "36%", }, {duration: 1200, easing: 'linear'} ); }
				if(lastEvtID > 2) { $("#evt3").animate( {top: "48%", }, {duration: 1200, easing: 'linear'} ); }
				if(lastEvtID > 3) { $("#evt4").animate( {top: "60%", }, {duration: 1200, easing: 'linear'} ); }
				if(lastEvtID > 4) { $("#evt5").animate( {top: "72%", }, {duration: 1200, easing: 'linear'} ); }
				if(lastEvtID > 5) { $("#evt6").animate( {top: "84%", }, {duration: 1200, easing: 'linear'} ); }
			}
			break;
			
		case 2:
			{
				rotateEle("#iTCM", 180, 900, id);
				rotateEle("#iTCH", 315, 900, id);
				$("#iTCT").html("10:30 AM");
				{ $("#evt2").animate( {top: "12%", height: "42%",}, {duration: 1200, easing: 'linear', step: function (now, fx){changeLastEle(lastEle, now, fx, id);} } ); }
				if(lastEvtID > 2) { $("#evt3").animate( {top: "56%", }, {duration: 1200, easing: 'linear'} ); }
				if(lastEvtID > 3) { $("#evt4").animate( {top: "69%", }, {duration: 1200, easing: 'linear'} ); }
				if(lastEvtID > 4) { $("#evt5").animate( {top: "75%", }, {duration: 1200, easing: 'linear'} ); }
				if(lastEvtID > 5) { $("#evt6").animate( {top: "84%", }, {duration: 1200, easing: 'linear'} ); }
			}
			break;
			
		case 3:
			{
				rotateEle("#iTCM", 179, 900, id);
				rotateEle("#iTCH", 330, 900, id);
				$("#iTCT").html("11:30 AM");
				if(lastEvtID < 2) { $("#evt2").animate( {top: "12%", }, {duration: 1200, easing: 'linear'} ); }
				{ $("#evt3").animate( {top: "24%", height: "42%", }, {duration: 1200, easing: 'linear', step: function (now, fx){changeLastEle(lastEle, now, fx, id);} } );  }
				if(lastEvtID > 3) { $("#evt4").animate( {top: "66%", }, {duration: 1200, easing: 'linear'} ); }
				if(lastEvtID > 4) { $("#evt5").animate( {top: "72%", }, {duration: 1200, easing: 'linear'} ); }
				if(lastEvtID > 5) { $("#evt6").animate( {top: "84%", }, {duration: 1200, easing: 'linear'} ); }
			}
			break;

		case 4:
			{
				rotateEle("#iTCM", 0, 900, id);
				rotateEle("#iTCH", 210, 900, id);
				$("#iTCT").html("07:00 PM");
				if(lastEvtID < 2) { $("#evt2").animate( {top: "12%", }, {duration: 1200, easing: 'linear'} ); }
				if(lastEvtID < 3) { $("#evt3").animate( {top: "24%", }, {duration: 1200, easing: 'linear'} ); }
				{ $("#evt4").animate( {top: "36%", height: "42%", }, {duration: 1200, easing: 'linear', step: function (now, fx){changeLastEle(lastEle, now, fx, id);} } ); }
				if(lastEvtID > 4) { $("#evt5").animate( {top: "72%", }, {duration: 1200, easing: 'linear'} ); } 
				if(lastEvtID > 5) { $("#evt6").animate( {top: "84%", }, {duration: 1200, easing: 'linear'} ); }
			}
			break;
			
		case 5:
			{
				rotateEle("#iTCM", 90, 900, id);
				rotateEle("#iTCH", 9, 900, id);
				$("#iTCT").html("12:15 AM");
				if(lastEvtID < 2) { $("#evt2").animate( {top: "12%", }, {duration: 1200, easing: 'linear'} ); }
				if(lastEvtID < 3) { $("#evt3").animate( {top: "24%", }, {duration: 1200, easing: 'linear'} ); } 
				if(lastEvtID < 4) { $("#evt4").animate( {top: "36%", }, {duration: 1200, easing: 'linear'} ); } 
				{ $("#evt5").animate( {top: "48%", height: "38%", }, {duration: 1200, easing: 'linear', step: function (now, fx){changeLastEle(lastEle, now, fx, id);} } );  }
				if(lastEvtID > 5) { $("#evt6").animate( {top: "84%", }, {duration: 1200, easing: 'linear'} ); }
			}
			break;

		case 6:
			{
				rotateEle("#iTCM", 270, 900, id);
				rotateEle("#iTCH", 81, 900, id);
				$("#iTCT").html("02:45 AM");
				if(lastEvtID < 2) { $("#evt2").animate( {top: "12%", }, {duration: 1200, easing: 'linear'} ); }
				if(lastEvtID < 3) { $("#evt3").animate( {top: "24%", }, {duration: 1200, easing: 'linear'} ); }
				if(lastEvtID < 4) { $("#evt4").animate( {top: "36%", }, {duration: 1200, easing: 'linear'} ); }
				if(lastEvtID < 5) { $("#evt5").animate( {top: "48%", }, {duration: 1200, easing: 'linear'} ); }
				{ $("#evt6").animate( {top: "60%", height: "38%", }, {duration: 1200, easing: 'linear', step: function (now, fx){changeLastEle(lastEle, now, fx, id);} } ); }
			}
			break;
			
		default:
			{
				rotateEle("#iTCM", 0, 900, 0);
				rotateEle("#iTCH", 0, 900, 0);
				$("#iTCT").html("12:00 AM");
			}
			break;			
	}
	
	lastEvtID = id;
}

function changeLastEle(e, v, f, id)
{
	if(f.prop == "height") { $(e).css("height", (12 + (38 - v))  + "%"); }
}

function shrinkClock()
{
	$("#iTID").css("width", "15%");
	$("#iTID").css("top", "54%");
	$("#iTIDI").css("border", "0px");
}

function rotateEle(ele, deg, dur, id)
{
	if(isItIE != -1)
	{
		$(ele).attr("style", "left:0%;");
		$(ele).attr("src", "imgs/evt" + id + ".png");
	}
	else
	{
		$(ele).animate( {borderSpacing: deg, }, {
							 duration: dur, 
							 easing: 'swing', 
							 step: function (now, fx) {
								  $(this).css('-webkit-transform','rotate('+now+'deg)');
								  $(this).css('-moz-transform','rotate('+now+'deg)'); 
								  $(this).css('-ms-transform','rotate('+now+'deg)');
								  $(this).css('-o-transform','rotate('+now+'deg)');
								  $(this).css('transform','rotate('+now+'deg)');
								}
							} )
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

function ChangeTravelRoutes(id)
{
	if(id != lastTravelRouteID)
	{
		var tOName   = "#tR" + id;
		var ptOName  = "#tR" + lastTravelRouteID;
		var tRClass  = ".tOFR" + id;
		var ptRClass = ".tOFR" + lastTravelRouteID;
		
		if(lastTravelRouteID != 0) 
		{
			$(ptOName).animate( {backgroundColor: "#bbbbcc"}, {duration:900, easing: 'linear', complete:function (){$(ptOName).attr("style", "left:-0.9%");}});
		}
		$(tOName).animate( {backgroundColor: "#99cc99"}, {duration:900, easing: 'linear'});
		if(lastTravelRouteID != 0) 
		{
			$(ptRClass).animate( {opacity: "0.0", backgroundColor: "#aaaaaa"}, 
								 {duration:900, easing: 'swing', 
								  complete:function () {$(ptRClass).css("display", "none");} } );
		}
		$(tRClass).css("display", "block");
		$(tRClass).animate({opacity: "1.0", backgroundColor: "#ccaaaa"}, {duration:600, easing: 'swing'});
		
		lastTravelRouteID = id;
	}
}

function changeTourPlace(id)
{
	var t = "#tIB" + id;
	var p = "#tIB" + prevTourId;
	
	$(p).animate( {bottom: "-82%", }, {duration: 720, easing: 'linear'} );
	$(t).animate( {bottom: "-12%", }, {duration: 900, easing: 'linear'} );
	
	prevTourId = id;
	
	$("#tIF").attr("src", "tour.htm?t=m&i="+id);
}