import './application.scss';

setInterval(function(){
  let app = document.getElementById('app');
  let text = app.textContent.trim();
  let newText = text.split('').map(function(char){
    if ( Math.random() < 0.5) {
      return char.toUpperCase();
    } else {
      return char.toLowerCase();
    }
  });

  app.textContent = newText.join('');
}, 1000);
