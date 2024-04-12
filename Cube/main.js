import * as THREE from 'three';


window.onload(function(){
	const scene = new THREE.Scene();
	const canvas = document.getElementById("c");
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	const renderer = new THREE.WebGLRenderer({antialias: true, canvas: canvas});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	const geometry = new THREE.BoxGeometry( 1, 1, 1 );
	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	// const sphere = new THREE.SphereGeometry(10,64,32);
	// const sphereMat = new THREE.MeshBasicMaterial({color:"red"});
	// const sphereObj = new THREE.Mesh(sphere,sphereMat);
	// scene.add(sphereObj);


camera.position.z = 5;
});

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.05;
	cube.rotation.y += 0.05;

	renderer.render( scene, camera );
}

animate();

//THREE.AnimationMixer(scene,cube)