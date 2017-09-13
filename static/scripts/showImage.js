var stageDiv;
var imgDiv;
var imgTimeOut;
var refreshCount = 0;
var currTitle = "";
var curPath = "";

function ShowImage(path, title)
{
  //alert("Showing" + path);

  imgTimeOut = null;
  
  stageDiv = document.getElementById("StageBG");
  imgDiv   = document.getElementById("StageImg");
  
  if((stageDiv != null) && (imgDiv != null))
  {
    stageDiv.style.top = "0%";
    stageDiv.style.left = "0%";
    stageDiv.style.bottom = "0%";
    stageDiv.style.right = "0%";
	stageDiv.style.paddingTop = "9%";
	stageDiv.style.paddingBottom = "9%";
    stageDiv.style.width = "100%";
    stageDiv.style.height = "81%";
    stageDiv.style.zIndex = "996";
    imgDiv.style.top = "12%";
    imgDiv.style.left = "9%";
    imgDiv.style.bottom = "12%";
    imgDiv.style.right = "9%";    
    imgDiv.style.width = "81%";
    imgDiv.style.height = "72%";
    stageDiv.innerHTML = '' + title;
    imgDiv.innerHTML   = '<span class="closeImg" title="Close" onClick="StopImage()"> &nbsp;&nbsp;&nbsp; </span> <br /><br /><br /><a target="_blank" title="Open Image in a new tab" href="' + path + '"><img class="ShowImageImg" id="ShowImageImg" width="99%" src=' + path + ' onload="RefreshImage()" /></a>'; 
    currTitle = title;
    currPath  = path;
    var CallAgain = function() { RefreshImage(); };
    imgTimeOut = setTimeout(CallAgain,500);
    refreshCount = 0;
  }
}

function RefreshImage()
{
  refreshCount++;
  
  if(refreshCount >= 25)
  {
    clearTimeout(imgTimeOut);
    imgTimeOut = null;
  }
  
  if((stageDiv != null) && (imgDiv != null) && (imgTimeOut != null))
  {
    stageDiv.innerHTML = '' + currTitle;
    imgDiv.innerHTML   = '<span class="closeImg" title="Close" onClick="StopImage()"> &nbsp;&nbsp;&nbsp; </span> <br /><br /><br /><a target="_blank" title="Open Image in a new tab" href="' + currPath + '"><img class="ShowImageImg" id="ShowImageImg" width="99%" src=' + currPath + ' onload="RefreshImage()" /></a>'; 
  
    var img = document.getElementById("ShowImageImg");
    var imgSrc = new Image();
	
	/* var scrwh  =  (($(window).height()) /  ($(window).width())) * 100;
	var scrhw  =  (($(window).width()) /  ($(window).height())) * 100;
	var scale = ((scrwh > scrhw)?(scrhw):(scrwh)); */
  
    imgSrc.src = img.src;
  
    if(img != null)
    {
      if(imgSrc.width > imgSrc.height)
      {
	img.style.width  = "96%";
	img.style.height = "auto";
      }
      else
      {
 	img.style.width = "auto";
 	img.style.height = "96%";
      }
    }
  }
}

function StopImage()
{
  if((stageDiv != null) && (imgDiv != null))
  {
    stageDiv.style.top = "0%";
    stageDiv.style.left = "0%";
    stageDiv.style.bottom = "100%";
    stageDiv.style.right = "100%";
    stageDiv.style.width = "0%";
	stageDiv.style.paddingTop = "0%";
	stageDiv.style.paddingBottom = "0%";
    stageDiv.style.height = "0%";
    stageDiv.style.zIndex = "-1";
    imgDiv.style.top = "0%";
    imgDiv.style.left = "0%";
    imgDiv.style.bottom = "100%";
    imgDiv.style.right = "100%"; 
    imgDiv.style.width = "0%";
    imgDiv.style.height = "0%";
    stageDiv.innerHTML = "";
    imgDiv.innerHTML = "";
    clearTimeout(imgTimeOut);
    imgTimeOut = null;
    stageDiv = null;
    imgDiv = null;
  }
}
