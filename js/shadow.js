renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0xdddddd, 1);
document.body.appendChild(renderer.domElement);

scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);

camera.position.z = 200;
camera.position.y = 200;
camera.lookAt({x:0,y:0,z:0});
scene.add(camera);

cube = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50), new THREE.MeshLambertMaterial({color: "grey"}));
cube.position.y = 15;
scene.add(cube);

plane = new THREE.Mesh(new THREE.PlaneGeometry(200,200), new THREE.MeshLambertMaterial({color: 0x22FF11}));
scene.add(plane);

scene.add( new THREE.AmbientLight( 0x212223) );

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.x = -100;
light.position.y = 150;
scene.add(light);

renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = false;

renderer.shadowCameraNear = 3;
renderer.shadowCameraFar = camera.far;
renderer.shadowCameraFov = 50;

renderer.shadowMapBias = 0.0039;
renderer.shadowMapDarkness = 0.5;
renderer.shadowMapWidth = 1024;
renderer.shadowMapHeight = 1024;

light.castShadow = true;
cube.castShadow = true;
plane.receiveShadow = true;

renderer.render(scene, camera);