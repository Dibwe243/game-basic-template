(function(){

//Let there be a canvas tag
var myCanvas =document.createElement('canvas');
myCanvas.id ='ctx';
myCanvas.width ='1200';
myCanvas.height ='800';
myCanvas.setAttribute('style','border:1px solid black');
myCanvas.setAttribute('style','margin:auto');

var content_fluid = document.getElementById('container');
content_fluid.appendChild(myCanvas);


})()