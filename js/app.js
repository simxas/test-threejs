var App = (function() {
    'use strict';

    var scene = new THREE.Scene(),
        renderer = new THREE.WebGLRenderer(),
        light = new THREE.AmbientLight(0xffffff),
        camera,
        box;

    var initScene = function() {
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        // scene.add(light);

        camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1000 );

        camera.position.z = 100;
        scene.add(camera);

        var geometry = new THREE.BoxGeometry( 20, 20, 20 );
        var material = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
        box = new THREE.Mesh( geometry, material );

        box.name = "box";
        box.rotateX(10);
        scene.add(box);

        render();

        window.addEventListener( 'resize', onWindowResize, false );

    };

    var onWindowResize = function() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    };

    var render = function() {
        box.rotateX(10);
        renderer.render( scene, camera );
        requestAnimationFrame( render );//call render() function itself
    };

    return {
        initScene: initScene
    }
})();
