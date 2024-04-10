import * as THREE from 'three';

function main(){
        const canvas = document.getElementById("c");
        const renderer = new THREE.WebGLRenderer({antias: true,canvas});

        //camera   
        const fov = 75;
        const aspect = 800/600;
        const near = 0.1;
        const far = 5;
        const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
        camera.position.z = 2;

        //create scene
        const scene = new THREE.Scene();
        //box geometry
        const boxWidth = 10;
        const boxHeight = 10;
        const boxDepth = 10;
        const geometry = new THREE.BoxGeometry(boxWidth,boxHeight,boxDepth);

        //color and material

        const material = new THREE.MeshBasicMaterial({color: '00ff83'});
        const cube = new THREE.Mesh(geometry,material);
        scene.add(cube);

        //renderer
        renderer.render(scene,camera);
}

function render(time){
    time *= 0.001;
    cube.rotation.x = time;
    cube.rotation.y = time;
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);