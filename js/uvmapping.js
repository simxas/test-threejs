var App = (function() {
    'use strict';

    var scene,
        renderer,
        light,
        texture,
        material,
        a_mesh,
        camera;


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
        camera.position.y = 0;
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
        // a_mesh = new THREE.Mesh( );
        $("#userImage").change(function () {
            var selectedObject = scene.getObjectByName('ob');
            scene.remove( selectedObject );
            var image = document.createElement( 'img' );
            texture = new THREE.Texture( image );
            image.onload = function()  {
                texture.needsUpdate = true;
            };
            texture.anisotropy = renderer.getMaxAnisotropy();

            material = new THREE.MeshBasicMaterial( { map: texture } );

            var userImage = $("#userImage")[0];
            if (userImage.files && userImage.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    image.src = e.target.result;
                };

                reader.readAsDataURL(userImage.files[0]);
            }
            var loader = new THREE.JSONLoader();
            loader.load('assets/samsung2.json', function(geometry) {
                var rotMat = new THREE.Matrix4().makeRotationZ(Math.PI);
                // geometry.applyMatrix(rotMat);
                var a_material = new THREE.MeshLambertMaterial( { color: '#4499DC' } );
                a_mesh = new THREE.Mesh( geometry, material );
                a_mesh.scale.set(20, 20, 20);
                // a_mesh.rotation.x = 0.8;
                a_mesh.position.y = -30;
                a_mesh.name = 'ob';
                scene.add(a_mesh);
            });
        });

        var loader = new THREE.JSONLoader();
        loader.load('assets/uvmapping.json', function(geometry, materials) {
            var rotMat = new THREE.Matrix4().makeRotationZ(Math.PI);
            // geometry.applyMatrix(rotMat);
var texture2 = THREE.ImageUtils.loadTexture( 'assets/beach.jpg' );
    texture2.anisotropy = renderer.getMaxAnisotropy();

    var material2 = new THREE.MeshBasicMaterial( { map: texture2 } );
            // var a_material = new THREE.MeshLambertMaterial( { color: '#4499DC' } );
            a_mesh = new THREE.Mesh( geometry, material2 );
            a_mesh.scale.set(20, 20, 20);
            // a_mesh.rotation.x = 0.8;
            a_mesh.position.y = -30;
            a_mesh.name = 'ob';
            scene.add(a_mesh);
        });




        // initiate
        light.castShadow = true;
        light.shadowDarkness = 0.1;
        render();
        window.addEventListener( 'resize', onWindowResize, false );
    };

    var onWindowResize = function() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    };

    var render = function() {
        if(a_mesh != null) {
            a_mesh.rotation.y += 0.005;
        }
        renderer.render( scene, camera );
        requestAnimationFrame( render );//call render() function itself
    };

    return {
        initScene: initScene
    }

})();