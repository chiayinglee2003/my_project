'use strict';
// set the scene size
var WIDTH = 1000, HEIGHT = 350;

// set some attribute
var VIEW_ANGLE = 45;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 0.1;
var FAR = 10000;
var isPaused = false;
// set the DOM element to attach it
var container = document.querySelector('#container');

// create an webgl renderer, camera and a scene
var renderer = new THREE.WebGLRenderer();
var camera   = new THREE.PerspectiveCamera(
                   VIEW_ANGLE,
                   ASPECT,
                   NEAR,
                   FAR
               );
var scene    = new THREE.Scene();

// add camera(with trackballcontrol) to scene
var controls = new THREE.TrackballControls( camera, container );
camera.position.z = 500;
controls.addEventListener('change', render);
scene.add(camera);
renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0.0); // 第二个参数是透明度，範圍 0（完全透明）到 1（完全不透明）
renderer.setSize(WIDTH, HEIGHT);
var ambientLight = new THREE.AmbientLight( 0x000000 );
scene.add( ambientLight );

var lights = [];
lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

lights[ 0 ].position.set( 0, 200, 0 );
lights[ 1 ].position.set( 100, 200, 100 );
lights[ 2 ].position.set( - 100, - 200, - 100 );

scene.add( lights[ 0 ] );
scene.add( lights[ 1 ] );
scene.add( lights[ 2 ] );

// attach the renderer-supplied DOM Element
container.appendChild(renderer.domElement);

// declare global control variable
var sun, earth, moon;
var speed = [0, 0.01, 0.05];
var angle = [0, 0, 0];
var rotate = [
  {speed: 0.01, identity: new THREE.Vector3(0, 1, 0), result: null, lock: false},
  {speed: 0.01, identity: new THREE.Vector3(0, 1, 0), result: null, lock: false},
  {speed: 0.01, identity: new THREE.Vector3(0, 1, 0), result: null, lock: false}
];
var Mercury, Mars, Uranus;
  var newspeed = [0.02, 0.03, 0.01];
  var newangle = [0, 0, 0];
  var newrotate = [
    {speed: 0.03, identity: new THREE.Vector3(0, 1, 0), result: null, lock: false},
    {speed: 0.02, identity: new THREE.Vector3(0, 1, 0), result: null, lock: false},
    {speed: 0.01, identity: new THREE.Vector3(0, 1, 0), result: null, lock: false}
  ];
var shootingStars = [];
var audio = document.createElement('audio');
audio.id = 'backgroundAudio';
audio.src = 'js/image/sound.mp3';
document.body.appendChild(audio);

var audioButton = document.createElement('button');
audioButton.textContent = 'Play/Pause music';
audioButton.addEventListener('click', toggleAudio);
audioButton.id = 'customAudioButton';  // 设置按钮的ID
document.body.appendChild(audioButton);
// 音频播放和暂停的函数
function toggleAudio() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
// 获取按钮元素并设置样式
var customAudioButton = document.getElementById('customAudioButton');
if (customAudioButton) {
    customAudioButton.style.position = 'absolute';
    customAudioButton.style.top = '24px';  // 设置按钮距离顶部的位置
    customAudioButton.style.left = '20px';  // 设置按钮距离左侧的位置
    customAudioButton.style.zIndex = '1400';  // 设置按钮的层级
   
}
function toggleShootingStar(index) {
    var shootingStar = shootingStars[index];
    if (shootingStar) {
        shootingStar.visible = !shootingStar.visible;
    }
}
function createShootingStar(x, y, z) {
    var starGeometry = new THREE.SphereGeometry(2.5);
    var starMaterial = new THREE.MeshBasicMaterial({ color: 0xe0ffff });
    var shootingStar = new THREE.Mesh(starGeometry, starMaterial);
    // 设置流星的初始位置
    shootingStar.position.set(x,y,z);
    // 创建尾巴
   
    var tail = createTail();
    shootingStar.add(tail);
    scene.add(shootingStar);
    shootingStar.tail = tail;
    // 设置初始尾巴可见性
    tail.visible = false;

    // 设置流星动画
    startShootingStarAnimation(shootingStar);
    shootingStars.push(shootingStar);
}
function createTail() {
    var tailGeometry = new THREE.BufferGeometry();
    var tailMaterial = new THREE.PointsMaterial({
        color: 0xffff00,
        size: 100000,
        transparent: true,
        opacity: 1
    });
    var tailVertices = [];
    for (var i = 0; i < 1000; i++) {
        tailVertices.push(0, 0, 0);
    }
    tailGeometry.addAttribute('position', new THREE.Float32BufferAttribute(tailVertices, 3));
    var tail = new THREE.Line(tailGeometry, tailMaterial);

    // 设置初始尾巴可见性
    tail.visible = false;
    return tail;
}
function startShootingStarAnimation() {
    // 设置流星动画
    var animationInterval = setInterval(function () {
        shootingStar.position.x -= 2; // 修改为适当的速度
        // 添加其他更新逻辑
        if (shootingStar.position.x < -WIDTH / 2) {
            shootingStar.position.x = WIDTH / 2;
            // 显示尾巴
            shootingStar.tail.visible = true;
            // 设置尾巴起始位置
            shootingStar.tail.position.copy(shootingStar.position);
        }
        // 更新尾巴的位置
        for (var i = 0; i < shootingStar.tail.geometry.attributes.position.array.length; i += 3) {
            shootingStar.tail.geometry.attributes.position.array[i] = shootingStar.position.x;
            shootingStar.tail.geometry.attributes.position.array[i + 1] = shootingStar.position.y;
            shootingStar.tail.geometry.attributes.position.array[i + 2] = shootingStar.position.z;
        }
        shootingStar.tail.geometry.attributes.position.needsUpdate = true;
        // 隐藏尾巴
        setTimeout(function () {
            shootingStar.tail.visible = false;
        }, 1000); // 尾巴持续时间
    }, 16); // 帧率约为60fps
}
function updateShootingStars() {
    for (var i = 0; i < shootingStars.length; i++) {
        var shootingStar = shootingStars[i];
        if (shootingStar.visible) {
            shootingStar.position.x -= 2;

            if (shootingStar.position.x < -WIDTH / 2) {
                shootingStar.position.x = WIDTH / 2;
                shootingStar.tail.visible = true;
                shootingStar.tail.position.copy(shootingStar.position);
            }

            for (var j = 0; j < shootingStar.tail.geometry.attributes.position.array.length; j += 3) {
                shootingStar.tail.geometry.attributes.position.array[j] = shootingStar.position.x;
                shootingStar.tail.geometry.attributes.position.array[j + 1] = shootingStar.position.y;
                shootingStar.tail.geometry.attributes.position.array[j + 2] = shootingStar.position.z;
            }

            shootingStar.tail.geometry.attributes.position.needsUpdate = true;

            setTimeout(function (star) {
                return function () {
                    star.tail.visible = false;
                };
            }(shootingStar), 1000); // 尾巴持續時間
        }
    }
}

function meshCreate () {
  var sungeometry = new MexicoHat(50.0);
  var sunmaterial = new THREE.MeshLambertMaterial({color: 0xF28500, side: THREE.DoubleSide});
  sun = new THREE.Mesh(sungeometry, sunmaterial);
      
  sun.position.set(0, 0, 0);
  rotate[0].result = rotate[0].identity.clone();
  rotate[0].result.multiplyScalar(rotate[0].speed);
  scene.add(sun);
    
  /*var loader = new THREE.TextureLoader();
  loader.crossOrigin = true;
  var texture = loader.load('http://i.imgur.com/1wZKcwy.jpg');*/
      
  var earthgeometry = new MexicoHat(25.0);
  var earthmaterial = new THREE.MeshLambertMaterial({color: 0x228b22, side: THREE.DoubleSide});
  earth = new THREE.Mesh(earthgeometry, earthmaterial);
  rotate[1].result = rotate[1].identity.clone();
  rotate[1].result.multiplyScalar(rotate[1].speed);
  scene.add(earth);
      
  var moongeometry = new MexicoHat(10.0);
  var moonmaterial = new THREE.MeshLambertMaterial({color: 0x444444, side: THREE.DoubleSide});
  moon = new THREE.Mesh(moongeometry, moonmaterial);
  rotate[2].result = rotate[2].identity.clone();
  rotate[2].result.multiplyScalar(rotate[2].speed);
  scene.add(moon);

  
  var Mercurygeometry = new MexicoHat(30.0);
  var Mercurymaterial = new THREE.MeshLambertMaterial({color: 0x48d1cc, side: THREE.DoubleSide});
  Mercury = new THREE.Mesh(Mercurygeometry, Mercurymaterial);  
  newrotate[0].result = newrotate[0].identity.clone();
  newrotate[0].result.multiplyScalar(newrotate[0].speed);
  scene.add(Mercury);
      
    /*var loader = new THREE.TextureLoader();
    loader.crossOrigin = true;
    var texture = loader.load('http://i.imgur.com/1wZKcwy.jpg');*/
        
    var Marsgeometry = new MexicoHat(25.0);
    var Marsmaterial = new THREE.MeshLambertMaterial({color: 0xb22222, side: THREE.DoubleSide});
    Mars = new THREE.Mesh(Marsgeometry, Marsmaterial);
    newrotate[1].result = newrotate[1].identity.clone();
    newrotate[1].result.multiplyScalar(newrotate[1].speed);
    scene.add(Mars);
        
    var Uranusgeometry = new MexicoHat(40.0);
    var Uranusmaterial = new THREE.MeshLambertMaterial({color: 0x663399, side: THREE.DoubleSide});
    Uranus = new THREE.Mesh(Uranusgeometry, Uranusmaterial);
    newrotate[2].result = newrotate[2].identity.clone();
    newrotate[2].result.multiplyScalar(newrotate[2].speed);
    scene.add(Uranus);
    createShootingStar(100, 100, 100);
    createShootingStar(-200, 50, -200);
    createShootingStar(300, 150, 300);
    createShootingStar(50, 0, -20);
    createShootingStar(-100, 0, 150);
    createShootingStar(-20, 5, -100);
    createShootingStar(-100, -10, -20);
    createShootingStar(300, -100, 0);
    createShootingStar(300, 100, 100);
}
// 在 JavaScript 中添加一个函数来切换流星的显示状态
function toggleAllShootingStars() {
    for (var i = 0; i < shootingStars.length; i++) {
        var shootingStar = shootingStars[i];
        if (shootingStar) {
            shootingStar.visible = !shootingStar.visible;
        }
    }
}
function togglePause() {
    isPaused = !isPaused;
}
// jscolor callback function
function setColor (jscolor) {
  var targetElement = jscolor.targetElement;
  switch(targetElement.name){
    case 'sunC':
      sun.material.color = new THREE.Color('#' + jscolor);
      break;
    case 'earthC':
      earth.material.color = new THREE.Color('#' + jscolor);
      break;
    case 'moonC':
      moon.material.color = new THREE.Color('#' + jscolor);
      break;
    case 'MercuryC':
      Mercury.material.color = new THREE.Color('#' + jscolor);
      break;
    case 'MarsC':
          Mars.material.color = new THREE.Color('#' + jscolor);
          break;
      case 'UranusC':
          Uranus.material.color = new THREE.Color('#' + jscolor);
          break;
  }
}
function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
    // Get all elements with class='tabcontent' and hide them
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    // Get all elements with class='tablinks' and remove the class 'active'
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    // Show the current tab, and add an 'active' class to the button that opened the tab
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}
function render () {
  renderer.render(scene, camera);
}
function update () {
  // update control
    controls.update();
    // 更新流星的位置或其他属性
    updateShootingStars();
    if (!isPaused) {
        // update position
        angle[1] += speed[1];
        angle[2] += speed[2];

        newangle[0] += newspeed[0];
        newangle[1] += newspeed[1];
        newangle[2] += newspeed[2];

        sun.rotation.setFromVector3(
            sun.rotation.toVector3().add(
                rotate[0].result
            )
        );
        earth.rotation.setFromVector3(
            earth.rotation.toVector3().add(
                rotate[1].result
            )
        );
        earth.position.set(
            200 * Math.cos(angle[1]),
            0,
            200 * Math.sin(angle[1])
        );
        moon.rotation.setFromVector3(
            moon.rotation.toVector3().add(
                rotate[2].result
            )
        );
        moon.position.set(
            200 * Math.cos(angle[1]) + 50 * Math.cos(angle[2]),
            0,
            200 * Math.sin(angle[1]) + 50 * Math.sin(angle[2])
        );
        Mercury.rotation.setFromVector3(
            Mercury.rotation.toVector3().add(
                newrotate[0].result
            )
        );
        Mercury.position.set(
            150 * Math.cos(newangle[0]), 0,
            100 * Math.sin(newangle[0]),
        );

        Mars.rotation.setFromVector3(
            Mars.rotation.toVector3().add(
                newrotate[1].result
            )
        );
        Mars.position.set(
            300 * Math.cos(newangle[1]),
            0,
            300 * Math.sin(newangle[1])
        );
        Uranus.rotation.setFromVector3(
            Uranus.rotation.toVector3().add(
                newrotate[2].result
            )
        );
        Uranus.position.set(
            400 * Math.cos(newangle[2]),
            0,
            400 * Math.sin(newangle[2])
        );
        sun.material.needsUpdate = true;
        sun.geometry.uvsNeedUpdate = true;
        sun.geometry.buffersNeedUpdate = true;

        // Draw!
        render();
    }
  // Schedule the next frame.
  requestAnimationFrame(update);
}
// Schedule the first frame.
meshCreate ();
listener ();
update ();
document.querySelector('.tablinks').click();