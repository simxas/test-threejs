var App = (function() {
    'use strict';

    var scene,
        renderer,
        light,
        texture_back_monitor,
        material_for_back_monitor,
        material_for_board,
        back_monitor,
        monitor,
        board,
        board_name,
        back_name,
        image,
        default_computer,
        camera;
    var video, videoImage, videoImageContext, videoTexture, material_for_monitor;
    var laptop_group;

    var initScene = function() {
        scene = new THREE.Scene();

        laptop_group = new THREE.Object3D();
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
        camera = new THREE.PerspectiveCamera(60, 500 / 300, 1, 10000);

        camera.position.z = 200;
        camera.position.y = 0;
        camera.lookAt({x:0,y:0,z:0});
        scene.add(camera);

        //=============
        // RENDERER
        // ============
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(500, 300);
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
        //VIDEO
        //=============
        var errorCallback = function(e) {
            console.log('Nope!', e);
        };
        video = document.getElementById( 'myVideo' );
        navigator.getUserMedia  = navigator.getUserMedia ||
                                  navigator.webkitGetUserMedia ||
                                  navigator.mozGetUserMedia ||
                                  navigator.msGetUserMedia;

        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: false, video: true}, function(stream) {
                video.src = window.URL.createObjectURL(stream);
            }, errorCallback);
        } else {
            video.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/61062/rin-SD.mp4';
        }

        videoImage = document.createElement( 'canvas' );
        videoImage.width = 640;
        videoImage.height = 320;
        videoImageContext = videoImage.getContext( '2d' );
        videoImageContext.fillStyle = '#ffffff';
        videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

        videoTexture = new THREE.Texture( videoImage );
        videoTexture.crossOrigin = "Anonymous";
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;

        material_for_monitor = new THREE.MeshBasicMaterial({
            color : 'white',
            map: videoTexture,
            overdraw: true,
            side:THREE.DoubleSide
        });


        //=============
        // OBJECTS
        // ============
        if(laptop_group != null) {
            console.log(laptop_group);
        }
        board = new THREE.Mesh();
        back_monitor = new THREE.Mesh();
        monitor = new THREE.Mesh();
        $("#userImage").change(function () {
            default_computer = scene.getObjectByName('default');
            scene.remove( default_computer );

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
                board.position.y = -30;
                // board.name = 'ob';
                // scene.add(board);
                laptop_group.add(board);

                loader.load('assets/back_monitor2.json', function(geometry) {

                    back_monitor = new THREE.Mesh( geometry, material_for_back_monitor);
                    back_monitor.scale.set(20, 20, 20);
                    back_monitor.position.y = -30;

                    // scene.add(back_monitor);
                    laptop_group.add(back_monitor);

                    loader.load('assets/monitor.json', function(geometry) {

                        monitor = new THREE.Mesh( geometry, material_for_monitor);
                        monitor.scale.set(20, 20, 20);
                        monitor.position.y = -30;

                        // scene.add(monitor);
                        laptop_group.add(monitor);
                        scene.add(laptop_group);
                        laptop_group.name = 'default';
                    });
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
                // scene.add(board);
                laptop_group.add(board);

                loader.load('assets/back_monitor2.json', function(geometry) {
                    
                    texture_back_monitor = THREE.ImageUtils.loadTexture( 'assets/beach.jpg' );
                    texture_back_monitor.anisotropy = renderer.getMaxAnisotropy();

                    // material_for_back_monitor = new THREE.MeshBasicMaterial( { map: texture_back_monitor } );
                    material_for_back_monitor = new THREE.MeshLambertMaterial( { color: '#4499DC' } );


                    back_monitor = new THREE.Mesh( geometry, material_for_back_monitor);
                    back_monitor.scale.set(20, 20, 20);
                    back_monitor.position.y = -30;
                    // back_monitor.rotation.y += 1;

                    // scene.add(back_monitor);
                    laptop_group.add(back_monitor);

                    loader.load('assets/monitor.json', function(geometry) {

                        // texture_back_monitor = THREE.ImageUtils.loadTexture( 'assets/beach.jpg' );
                        // texture_back_monitor.anisotropy = renderer.getMaxAnisotropy();

                        // material_for_back_monitor = new THREE.MeshBasicMaterial( { map: texture_back_monitor } );


                        monitor = new THREE.Mesh( geometry, material_for_monitor);
                        monitor.scale.set(20, 20, 20);
                        monitor.position.y = -30;
                        // back_monitor.rotation.y += 1;

                        // scene.add(monitor);
                        laptop_group.add(monitor);
                        scene.add(laptop_group);
                        laptop_group.name = 'default';
                    });




                });
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
        // if( (back_monitor != null && board != null) && monitor != null ) {
        //     back_monitor.rotation.y += 0.005;
        //     board.rotation.y += 0.005;
        //     monitor.rotation.y += 0.005;
        // }
        if(laptop_group.name != '') {
            laptop_group.rotation.y += 0.005;
        }
        videoImageContext.drawImage( video, 0,0,640, 320 );
        if ( videoTexture ){
            videoTexture.needsUpdate = true;
        }

        renderer.render( scene, camera );
        requestAnimationFrame( render );//call render() function itself
    };

    return {
        initScene: initScene
    }

})();