import './application.scss';

import("pkg").then(module => {
  let counter = module.Counter.new();

  setInterval(function(){
    counter.increment();

    let app = document.getElementById('app');
    let text = app.textContent.trim().split(':')[0];

    let newText = text.split('').map(function(char){
      if ( Math.random() < 0.5) {
        return char.toUpperCase();
      } else {
        return char.toLowerCase();
      }
    });

    app.textContent = `${newText.join('')}:${counter.count()}`;
  }, 1000);

});
