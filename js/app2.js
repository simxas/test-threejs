var App = (function() {
    'use strict';

    var scene = new THREE.Scene(),
        renderer = new THREE.WebGLRenderer(),
        light,
        shadowlight,
        camera,
        geometryForBackground,
        materialForBackground,
        geometryForBox,
        materialForBox,
        box,
        background;

    var initScene = function() {
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.shadowMapEnabled = true;
        renderer.shadowMapType = THREE.PCFSoftShadowMap;
        renderer.setClearColor( 0xdddddd, 1);
        document.body.appendChild( renderer.domElement );
        // light = new THREE.PointLight( '0xFFFF00' );
        // light.position.set( 10, 0, 10 );
        // scene.add( light );

        // scene.add(light);

        camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.z = 200;
        camera.position.y = 100;
        camera.lookAt({x:0,y:0,z:0});
        // camera.position.z = 100;
        scene.add(camera);

        geometryForBackground = new THREE.BoxGeometry( 120, 80, 20 );
        materialForBackground = new THREE.MeshLambertMaterial( { color: '#EFFBFB' } );
        background = new THREE.Mesh( geometryForBackground, materialForBackground );
        background.receiveShadow = true;
        background.position.z = -50;

        background.name = "background";
        scene.add(background);

        //box object
        geometryForBox = new THREE.BoxGeometry( 10, 10, 10 );
        var texture = THREE.ImageUtils.loadTexture( 'assets/texture.jpg' );
        texture.anisotropy = renderer.getMaxAnisotropy();
        materialForBox = new THREE.MeshLambertMaterial( { map: texture } );
        // materialForBox = new THREE.MeshLambertMaterial( { color: 'blue' } );
        box = new THREE.Mesh( geometryForBox, materialForBox );
        box.castShadow = true;
        box.receiveShadow = false;
        box.position.z = 10;

        box.name = "box";
        scene.add(box);

        createLight();
        render();

        window.addEventListener( 'resize', onWindowResize, false );

    };

    var onWindowResize = function() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    };
    var createLight = function() {
        light = new THREE.DirectionalLight('white', 0.8);
        light.position.set(0, 0, 5);
        scene.add(light);
     }

    var render = function() {
        // box.rotation.y += 0.005;
        renderer.render( scene, camera );
        requestAnimationFrame( render );//call render() function itself
    };

    return {
        initScene: initScene
    }
})();
