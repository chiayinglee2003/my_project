function listener () {
  // declare DOM list
  var earthSpeedDOM = document.querySelector('.stats span.earthS');
  var moonSpeedDOM  = document.querySelector('.stats span.moonS');
  var earthInputDOM = document.querySelector('.stats input.earthS');
  var moonInputDOM  = document.querySelector('.stats input.moonS');
  var sunColorSel   = document.querySelector('.stats input[name="sunC"]');
  var earthColorSel = document.querySelector('.stats input[name="earthC"]');
  var moonColorSel  = document.querySelector('.stats input[name="moonC"]');
  var sunRotateSel  = document.querySelector('.sunR').getElementsByTagName("button");
  var sunRotateDOM  = document.querySelectorAll('.sunRS');
  var earthRotateSel = document.querySelector('.earthR').getElementsByTagName("button");
  var earthRotateDOM = document.querySelectorAll('.earthRS');
  var moonRotateSel = document.querySelector('.moonR').getElementsByTagName("button");
    var moonRotateDOM = document.querySelectorAll('.moonRS');

    var MercuryRotateSel = document.querySelector('.MercuryR').getElementsByTagName("button");
    var MercuryRotateDOM = document.querySelectorAll('.MercuryRS');
    var MercurySpeedDOM = document.querySelector('.stats span.MercuryS');
    var MercuryInputDOM = document.querySelector('.stats input.MercuryS');
    var MercuryColorSel = document.querySelector('.stats input[name="MercuryC"]');


    var MarsRotateSel = document.querySelector('.MarsR').getElementsByTagName("button");
    var MarsRotateDOM = document.querySelectorAll('.MarsRS');
    var MarsSpeedDOM = document.querySelector('.stats span.MarsS');
    var MarsInputDOM = document.querySelector('.stats input.MarsS');
    var MarsColorSel = document.querySelector('.stats input[name="MarsC"]');

    var UranusRotateSel = document.querySelector('.UranusR').getElementsByTagName("button");
    var UranusRotateDOM = document.querySelectorAll('.UranusRS');
    var UranusSpeedDOM = document.querySelector('.stats span.UranusS');
    var UranusInputDOM = document.querySelector('.stats input.UranusS');
    var UranusColorSel = document.querySelector('.stats input[name="UranusC"]');



  var sunScaleSel   = document.querySelectorAll('.sunSC');
  var earthScaleSel   = document.querySelectorAll('.earthSC');
  var moonScaleSel   = document.querySelectorAll('.moonSC');
    var MercuryScaleSel = document.querySelectorAll('.MercurySC');
    var MarsScaleSel = document.querySelectorAll('.MarsSC');
    var UranusScaleSel = document.querySelectorAll('.UranusSC');
    // setup initial value
    
  earthSpeedDOM.innerText = speed[1];
    moonSpeedDOM.innerText = speed[2];
    MercurySpeedDOM.innerText = newspeed[0];
    MarsSpeedDOM.innerText = newspeed[1];
    UranusSpeedDOM.innerText = newspeed[2];

  earthInputDOM.value     = speed[1];
    moonInputDOM.value = speed[2];
    MercuryInputDOM.value = newspeed[0];
    MarsInputDOM.value = newspeed[1];
    UranusInputDOM.value = newspeed[2];
  sunColorSel.value       = 'F28500';
  earthColorSel.value     = '11AD42';
  moonColorSel.value      = '444444';
    var toggleStarButton = document.getElementById('toggleStarButton');
    toggleStarButton.addEventListener('click', function () {
        toggleAllShootingStars();
    });

    var pauseButton = document.getElementById('pauseButton');

    pauseButton.addEventListener('click', function () {
        togglePause(); // 调用暂停/播放函数
    });

  // setup input listener
  earthInputDOM.addEventListener('input', function (e) {
    speed[1] = parseFloat(e.target.value);
    earthSpeedDOM.innerText = speed[1];
  });
  moonInputDOM.addEventListener('input', function (e) {
    speed[2] = parseFloat(e.target.value);
    moonSpeedDOM.innerText = speed[2];
  });
    MercuryInputDOM.addEventListener('input', function (e) {
        newspeed[0] = parseFloat(e.target.value);
       MercurySpeedDOM.innerText = newspeed[0];
    });
    MarsInputDOM.addEventListener('input', function (e) {
        newspeed[1] = parseFloat(e.target.value);
        MarsSpeedDOM.innerText = newspeed[1];
    });
    UranusInputDOM.addEventListener('input', function (e) {
        newspeed[2] = parseFloat(e.target.value);
        UranusSpeedDOM.innerText = newspeed[2];
    });

  for(var i = 0; i < sunRotateSel.length; i++){
    sunRotateSel[i].addEventListener('click', function(e){
      switch(e.target.innerText){
        case 'X': rotate[0].identity = new THREE.Vector3(1, 0, 0);break;
        case 'Y': rotate[0].identity = new THREE.Vector3(0, 1, 0);break;
        case 'Z': rotate[0].identity = new THREE.Vector3(0, 0, 1);break;
      }
      rotate[0].result = rotate[0].identity;
      rotate[0].result.multiplyScalar(rotate[0].speed);
    });
  }
  sunRotateDOM[1].innerText = rotate[0].speed;
  sunRotateDOM[0].addEventListener('input', function(e) {
    if(rotate[0].lock) return;
    rotate[0].lock = true;
    rotate[0].speed = parseFloat(e.target.value);
    sunRotateDOM[1].innerText = rotate[0].speed;
    rotate[0].result = rotate[0].identity.clone();
    rotate[0].result.multiplyScalar(rotate[0].speed);
    rotate[0].lock = false;
  });
  for(var i = 0; i < earthRotateSel.length; i++){
    earthRotateSel[i].addEventListener('click', function(e){
      switch(e.target.innerText){
        case 'X': rotate[1].identity = new THREE.Vector3(1, 0, 0);break;
        case 'Y': rotate[1].identity = new THREE.Vector3(0, 1, 0);break;
        case 'Z': rotate[1].identity = new THREE.Vector3(0, 0, 1);break;
      }
      rotate[1].result = rotate[1].identity;
      rotate[1].result.multiplyScalar(rotate[1].speed);
    });
  }
  earthRotateDOM[1].innerText = rotate[1].speed;
  earthRotateDOM[0].addEventListener('input', function(e) {
    if(rotate[1].lock) return;
    rotate[1].lock = true;
    rotate[1].speed = parseFloat(e.target.value);
    earthRotateDOM[1].innerText = rotate[1].speed;
    rotate[1].result = rotate[1].identity.clone();
    rotate[1].result.multiplyScalar(rotate[1].speed);
    rotate[1].lock = false;
  });
  for(var i = 0; i < moonRotateSel.length; i++){
    moonRotateSel[i].addEventListener('click', function(e){
      switch(e.target.innerText){
        case 'X': rotate[2].identity = new THREE.Vector3(1, 0, 0);break;
        case 'Y': rotate[2].identity = new THREE.Vector3(0, 1, 0);break;
        case 'Z': rotate[2].identity = new THREE.Vector3(0, 0, 1);break;
      }
      rotate[2].result = rotate[2].identity;
      rotate[2].result.multiplyScalar(rotate[2].speed);
    });
  }
  moonRotateDOM[1].innerText = rotate[2].speed;
  moonRotateDOM[0].addEventListener('input', function(e) {
    if(rotate[2].lock) return;
    rotate[2].lock = true;
    rotate[2].speed = parseFloat(e.target.value);
    moonRotateDOM[1].innerText = rotate[2].speed;
    rotate[2].result = rotate[2].identity.clone();
    rotate[2].result.multiplyScalar(rotate[2].speed);
    rotate[2].lock = false;
  });

    for (var i = 0; i < MercuryRotateSel.length; i++) {
         MercuryRotateSel[i].addEventListener('click', function (e) {
            switch (e.target.innerText) {
                case 'X': newrotate[0].identity = new THREE.Vector3(1, 0, 0); break;
                case 'Y': newrotate[0].identity = new THREE.Vector3(0, 1, 0); break;
                case 'Z': newrotate[0].identity = new THREE.Vector3(0, 0, 1); break;
            }
             newrotate[0].result = newrotate[0].identity;
             newrotate[0].result.multiplyScalar(newrotate[0].speed);
        });
    }
    MercuryRotateDOM[1].innerText = newrotate[0].speed;
      MercuryRotateDOM[0].addEventListener('input', function (e) {
         if (newrotate[0].lock) return;
        newrotate[0].lock = true;
         newrotate[0].speed = parseFloat(e.target.value);
          MercuryRotateDOM[1].innerText = newrotate[0].speed;
         newrotate[0].result = newrotate[0].identity.clone();
         newrotate[0].result.multiplyScalar(newrotate[0].speed);
         newrotate[0].lock = false;
    });

    for (var i = 0; i <  MarsRotateSel.length; i++) {
         MarsRotateSel[i].addEventListener('click', function (e) {
            switch (e.target.innerText) {
                case 'X': newrotate[1].identity = new THREE.Vector3(1, 0, 0); break;
                case 'Y': newrotate[1].identity = new THREE.Vector3(0, 1, 0); break;
                case 'Z': newrotate[1].identity = new THREE.Vector3(0, 0, 1); break;
            }
            newrotate[1].result = newrotate[1].identity;
            newrotate[1].result.multiplyScalar(newrotate[1].speed);
        });
    }
     MarsRotateDOM[1].innerText = newrotate[1].speed;
     MarsRotateDOM[0].addEventListener('input', function (e) {
        if (newrotate[1].lock) return;
        newrotate[1].lock = true;
        newrotate[1].speed = parseFloat(e.target.value);
       MarsRotateDOM[1].innerText = newrotate[1].speed;
        newrotate[1].result = newrotate[1].identity.clone();
        newrotate[1].result.multiplyScalar(newrotate[1].speed);
        newrotate[1].lock = false;
    });


    

    for (var i = 0; i < UranusRotateSel.length; i++) {
        UranusRotateSel[i].addEventListener('click', function (e) {
            switch (e.target.innerText) {
                case 'X': newrotate[2].identity = new THREE.Vector3(1, 0, 0); break;
                case 'Y': newrotate[2].identity = new THREE.Vector3(0, 1, 0); break;
                case 'Z': newrotate[2].identity = new THREE.Vector3(0, 0, 1); break;
            }
            newrotate[2].result = newrotate[2].identity;
            newrotate[2].result.multiplyScalar(newrotate[2].speed);
        });
    }
    UranusRotateDOM[1].innerText = newrotate[1].speed;
    UranusRotateDOM[0].addEventListener('input', function (e) {
        if (newrotate[2].lock) return;
        newrotate[2].lock = true;
        newrotate[2].speed = parseFloat(e.target.value);
        UranusRotateDOM[1].innerText = newrotate[2].speed;
        newrotate[2].result = newrotate[2].identity.clone();
        newrotate[2].result.multiplyScalar(newrotate[2].speed);
        newrotate[2].lock = false;
    });





  sunScaleSel[1].innerText = sun.scale.x;
  sunScaleSel[0].value = Math.log(sun.scale.x) / Math.log(1.5);
  sunScaleSel[0].addEventListener('input', function(e){
    sun.scale.x = Math.pow(1.5, parseFloat(e.target.value));
    e.target.nextSibling.nextSibling.innerText = sun.scale.x;
  });
  sunScaleSel[3].innerText = sun.scale.y;
  sunScaleSel[2].value = Math.log(sun.scale.y) / Math.log(1.5);
  sunScaleSel[2].addEventListener('input', function(e){
    sun.scale.y = Math.pow(1.5, parseFloat(e.target.value));
    e.target.nextSibling.nextSibling.innerText = sun.scale.y;
  });
  sunScaleSel[5].innerText = sun.scale.z;
  sunScaleSel[4].value = Math.log(sun.scale.z) / Math.log(1.5);
  sunScaleSel[4].addEventListener('input', function(e){
    sun.scale.z = Math.pow(1.5, parseFloat(e.target.value));
    e.target.nextSibling.nextSibling.innerText = sun.scale.z;
  });

  earthScaleSel[1].innerText = earth.scale.x;
  earthScaleSel[0].value = Math.log(earth.scale.x) / Math.log(1.5);
  earthScaleSel[0].addEventListener('input', function(e){
    earth.scale.x = Math.pow(1.5, parseFloat(e.target.value));
    e.target.nextSibling.nextSibling.innerText = earth.scale.x;
  });
  earthScaleSel[3].innerText = earth.scale.y;
  earthScaleSel[2].value = Math.log(earth.scale.y) / Math.log(1.5);
  earthScaleSel[2].addEventListener('input', function(e){
    earth.scale.y = Math.pow(1.5, parseFloat(e.target.value));
    e.target.nextSibling.nextSibling.innerText = earth.scale.y;
  });
  earthScaleSel[5].innerText = earth.scale.z;
  earthScaleSel[4].value = Math.log(earth.scale.z) / Math.log(1.5);
  earthScaleSel[4].addEventListener('input', function(e){
    earth.scale.z = Math.pow(1.5, parseFloat(e.target.value));
    e.target.nextSibling.nextSibling.innerText = earth.scale.z;
  });

  moonScaleSel[1].innerText = moon.scale.x;
  moonScaleSel[0].value = Math.log(moon.scale.x) / Math.log(1.5);
  moonScaleSel[0].addEventListener('input', function(e){
    moon.scale.x = Math.pow(1.5, parseFloat(e.target.value));
    e.target.nextSibling.nextSibling.innerText = moon.scale.x;
  });
  moonScaleSel[3].innerText = moon.scale.y;
  moonScaleSel[2].value = Math.log(moon.scale.y) / Math.log(1.5);
  moonScaleSel[2].addEventListener('input', function(e){
    moon.scale.y = Math.pow(1.5, parseFloat(e.target.value));
    e.target.nextSibling.nextSibling.innerText = moon.scale.y;
  });
  moonScaleSel[5].innerText = moon.scale.z;
  moonScaleSel[4].value = Math.log(moon.scale.z) / Math.log(1.5);
  moonScaleSel[4].addEventListener('input', function(e){
    moon.scale.z = Math.pow(1.5, parseFloat(e.target.value));
    e.target.nextSibling.nextSibling.innerText = moon.scale.z;
  });

    MercuryScaleSel[1].innerText = Mercury.scale.x;
    MercuryScaleSel[0].value = Math.log(Mercury.scale.x) / Math.log(1.5);
    MercuryScaleSel[0].addEventListener('input', function (e) {
        Mercury.scale.x = Math.pow(1.5, parseFloat(e.target.value));
        e.target.nextSibling.nextSibling.innerText = Mercury.scale.x;
    });
    MercuryScaleSel[3].innerText = Mercury.scale.y;
    MercuryScaleSel[2].value = Math.log(Mercury.scale.y) / Math.log(1.5);
    MercuryScaleSel[2].addEventListener('input', function (e) {
        Mercury.scale.y = Math.pow(1.5, parseFloat(e.target.value));
        e.target.nextSibling.nextSibling.innerText = Mercury.scale.y;
    });
    MercuryScaleSel[5].innerText = Mercury.scale.z;
    MercuryScaleSel[4].value = Math.log(Mercury.scale.z) / Math.log(1.5);
    MercuryScaleSel[4].addEventListener('input', function (e) {
        Mercury.scale.z = Math.pow(1.5, parseFloat(e.target.value));
        e.target.nextSibling.nextSibling.innerText = Mercury.scale.z;
    });

    MarsScaleSel[1].innerText = Mars.scale.x;
    MarsScaleSel[0].value = Math.log(Mars.scale.x) / Math.log(1.5);
    MarsScaleSel[0].addEventListener('input', function (e) {
        Mars.scale.x = Math.pow(1.5, parseFloat(e.target.value));
        e.target.nextSibling.nextSibling.innerText = Mars.scale.x;
    });
    MarsScaleSel[3].innerText = Mars.scale.y;
    MarsScaleSel[2].value = Math.log(Mars.scale.y) / Math.log(1.5);
    MarsScaleSel[2].addEventListener('input', function (e) {
        Mars.scale.y = Math.pow(1.5, parseFloat(e.target.value));
        e.target.nextSibling.nextSibling.innerText = Mars.scale.y;
    });
    MarsScaleSel[5].innerText = Mars.scale.z;
    MarsScaleSel[4].value = Math.log(Mars.scale.z) / Math.log(1.5);
    MarsScaleSel[4].addEventListener('input', function (e) {
        Mars.scale.z = Math.pow(1.5, parseFloat(e.target.value));
        e.target.nextSibling.nextSibling.innerText = Mars.scale.z;
    });


    UranusScaleSel[1].innerText = Uranus.scale.x;
    UranusScaleSel[0].value = Math.log(Uranus.scale.x) / Math.log(1.5);
    UranusScaleSel[0].addEventListener('input', function (e) {
        Uranus.scale.x = Math.pow(1.5, parseFloat(e.target.value));
        e.target.nextSibling.nextSibling.innerText = Uranus.scale.x;
    });
    UranusScaleSel[3].innerText = Uranus.scale.y;
    UranusScaleSel[2].value = Math.log(Uranus.scale.y) / Math.log(1.5);
    UranusScaleSel[2].addEventListener('input', function (e) {
        Uranus.scale.y = Math.pow(1.5, parseFloat(e.target.value));
        e.target.nextSibling.nextSibling.innerText = Uranus.scale.y;
    });
    UranusScaleSel[5].innerText = Uranus.scale.z;
    UranusScaleSel[4].value = Math.log(Uranus.scale.z) / Math.log(1.5);
   UranusScaleSel[4].addEventListener('input', function (e) {
       Uranus.scale.z = Math.pow(1.5, parseFloat(e.target.value));
       e.target.nextSibling.nextSibling.innerText = Uranus.scale.z;
   });

   

}