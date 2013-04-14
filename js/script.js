(function($, undefined) {

  var lines, $container, $insertPoint, $para;

  $(document).ready(function() {
      beginTyping();
  })

  function beginTyping() {

    lines = ["Miss Mary Mac, Mac, Mac.",
              "All dressed in black, black, black.",
              "With silver buttons, buttons, buttons,",
              "All down her back, back, back."];

    // Select the container
    $container = $('#container');

    // Create the 'insertion point'
    $insertPoint = $(document.createElement('span'));
    $insertPoint.attr('id', 'insert-point');

    // Create our paragraph tags
    for(var i=0, l=lines.length; i<l; i++) {
      var p = document.createElement('p');
      p.innerHTML='<span class="content"></span>'
      $container.append(p);
    }

    // Set our font size based on the window size
    var fontSize = $(window).width()*0.04+'px';
    $container.find('p').css({
      'font-size': fontSize,
      'height': fontSize
    });

    $insertPoint.css('height', fontSize);

    // Select first paragraph, add the insertion point, start typing
    $para = $container.find('p:first');
    $para.append($insertPoint);
    typeLine($para, 0);

  }

  function typeLine($p, index) {

    var $span = $p.find('span.content');
    var line = lines[index];
    
    // Begin typing line
    typeLetter(index, 0, $span, line, lineCallback);

  }

  function typeLetter(lineIndex, letterIndex, $span, line, callback) {
    
    var thisLine = line;
    var thisLength = line.length;

    // add the letter
    $span.append(thisLine[letterIndex]);

    if(letterIndex < thisLength-1) {
      // Add another letter (after a delay)
      setTimeout(
        function() { 
          typeLetter(lineIndex, letterIndex+1, $span, line, lineCallback);  
        }, Math.floor((Math.random()*200)+50)
      );   
    } else {
      // We've reached the end of the line, callback after a short delay
      if(callback) {
          setTimeout(callback(lineIndex), 500);
      }
    }
  }

  function lineCallback(i) {
    // When we've finished a line of type, start a new one
    if(i < 3) {
      $para = $para.next();
      $insertPoint.remove().appendTo($para);
      typeLine($para, i+1);
    } 
  }
  
}(jQuery));