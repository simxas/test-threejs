var App = (function() {
    'use strict';

    var scene,
        renderer,
        light,
        camera,
        background,
        pictureBox,
        headerBox,
        geometry_for_pictureBox,
        geometry_for_headerBox,
        material_for_pictureBox;


    var initScene = function() {
        scene = new THREE.Scene();

        //=============
        // LIGHTS
        // ============
        scene.add( new THREE.AmbientLight( '#DDDDDD' ) );
        light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.x = -100;
        light.position.y = 150;
        scene.add(light);

        //=============
        // CAMERA
        // ============
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);

        camera.position.z = 200;
        camera.position.y = 10;
        camera.lookAt({x:0,y:0,z:0});
        scene.add(camera);

        //=============
        // RENDERER
        // ============
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor( "#DDDDDD", 1);
        document.body.appendChild(renderer.domElement);
        renderer.shadowMapEnabled = true;
        renderer.shadowMapSoft = true;

        renderer.shadowCameraNear = 3;
        renderer.shadowCameraFar = camera.far;
        renderer.shadowCameraFov = 50;

        renderer.shadowMapBias = 0.0039;
        renderer.shadowMapDarkness = 0.5;
        renderer.shadowMapWidth = 1024;
        renderer.shadowMapHeight = 1024;

        //=============
        // OBJECTS
        // ============
        background = new THREE.Mesh(new THREE.PlaneGeometry( 400, 200 ), new THREE.MeshLambertMaterial({ color: "#DDDDDD" }));
        scene.add( background );

        //pictureBox
        geometry_for_pictureBox = new THREE.BoxGeometry( 50, 50, 5 );
        material_for_pictureBox = new THREE.MeshLambertMaterial( { color: '#4499DC' } );
        pictureBox = new THREE.Mesh( geometry_for_pictureBox, material_for_pictureBox );
        pictureBox.position.x = -165;
        pictureBox.position.y = 70;
        pictureBox.position.z = 0;
        scene.add( pictureBox );

        //headerBox
        geometry_for_headerBox = new THREE.BoxGeometry( 300, 50, 5 );
        headerBox = new THREE.Mesh( geometry_for_headerBox, material_for_pictureBox );
        headerBox.position.x = 40;
        headerBox.position.y = 70;
        headerBox.position.z = 0;
        scene.add( headerBox );


        // initiate
        light.castShadow = true;
        light.shadowDarkness = 0.1;
        pictureBox.castShadow = true;
        headerBox.castShadow = true;
        background.receiveShadow = true;
        render();
        window.addEventListener( 'resize', onWindowResize, false );
    };

    var onWindowResize = function() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    };

    var render = function() {
        renderer.render( scene, camera );
        requestAnimationFrame( render );//call render() function itself
    };

    return {
        initScene: initScene
    }

})();