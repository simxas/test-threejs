var App = (function() {
    'use strict';

    var scene,
        renderer,
        light,
        texture_back_monitor,
        material_for_back_monitor,
        material_for_board,
        back_monitor,
        board,
        board_name,
        back_name,
        image,
        default_computer,
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
        board = new THREE.Mesh( );
        back_monitor = new THREE.Mesh( );
        $("#userImage").change(function () {
            default_computer = scene.getObjectByName('ob');
            back_name = scene.getObjectByName('back');
            board_name = scene.getObjectByName('board');
            scene.remove( back_name, board_name, default_computer );

            image = document.createElement( 'img' );
            texture_back_monitor = new THREE.Texture( image );
            image.onload = function()  {
                texture_back_monitor.needsUpdate = true;
            };
            texture_back_monitor.anisotropy = renderer.getMaxAnisotropy();

            material_for_back_monitor = new THREE.MeshBasicMaterial( { map: texture_back_monitor } );

            var userImage = $("#userImage")[0];
            if (userImage.files && userImage.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    image.src = e.target.result;
                };

                reader.readAsDataURL(userImage.files[0]);
            }
            var loader = new THREE.JSONLoader();
            loader.load('assets/board.json', function(geometry) {
                material_for_board = new THREE.MeshLambertMaterial( { color: '#4499DC' } );
                board = new THREE.Mesh( geometry, material_for_board );
                board.scale.set(20, 20, 20);
                // a_mesh.rotation.x = 0.8;
                board.position.y = -30;
                // board.rotation.y += 1;
                board.name = 'board';
                scene.add(board);

                loader.load('assets/back_monitor.json', function(geometry) {
                    back_monitor = new THREE.Mesh( geometry, material_for_back_monitor);
                    back_monitor.scale.set(20, 20, 20);
                    back_monitor.position.y = -30;
                    back_monitor.name = 'back';

                    scene.add(back_monitor);
                });
            });


        });
//==========================================================================================
        var loader = new THREE.JSONLoader();

        loader.load('assets/board.json', function(geometry) {
                material_for_board = new THREE.MeshLambertMaterial( { color: '#4499DC' } );
                board = new THREE.Mesh( geometry, material_for_board );
                board.scale.set(20, 20, 20);
                // a_mesh.rotation.x = 0.8;
                board.position.y = -30;
                // board.rotation.y += 1;
                board.name = 'ob';
                scene.add(board);

                // loader.load('assets/back_monitor.json', function(geometry) {
                //     texture_back_monitor = THREE.ImageUtils.loadTexture( 'assets/tex.jpg' );
                //     texture_back_monitor.anisotropy = renderer.getMaxAnisotropy();

                //     material_for_back_monitor = new THREE.MeshBasicMaterial( { map: texture_back_monitor } );


                //     back_monitor = new THREE.Mesh( geometry, material_for_back_monitor);
                //     back_monitor.scale.set(20, 20, 20);
                //     back_monitor.position.y = -30;
                //     // back_monitor.rotation.y += 1;

                //     scene.add(back_monitor);
                // });
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
        if(back_monitor != null && board != null) {
            back_monitor.rotation.y += 0.005;
            board.rotation.y += 0.005;
        }
        renderer.render( scene, camera );
        requestAnimationFrame( render );//call render() function itself
    };

    return {
        initScene: initScene
    }

})();