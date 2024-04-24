import * as THREE from '../lib/three.module.js';

function main() {
    // set up canvas
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    // set up camera
    const fov = 90;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 4;

    // set up the scene
    const scene = new THREE.Scene();
    {
        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    // set up box
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry_cube = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const geometry_cone = new THREE.ConeGeometry(0.75, 2, 32);
    const geometry_cylinder = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);

    // texture
    const loader = new THREE.TextureLoader();
    const texture = loader.load('../resources/flower-1.jpg');

    // function to make an instance of a shape
    function makeInstance(geometry, x) {
        const material = new THREE.MeshPhongMaterial({ map: texture });

        const shape = new THREE.Mesh(geometry, material);
        scene.add(shape);

        shape.position.x = x;

        return shape;
    }

    // array that keeps track of shapes
    const shapes = [
        makeInstance(geometry_cube, 0),
        makeInstance(geometry_cylinder, 2),
        makeInstance(geometry_cone, -2),
    ];

    // function to resize the shapes based on display size
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }

        return needResize;
    }

    // function to render shapes/objects
    function render(time) {

        // convert time to seconds
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        // render each shape
        shapes.forEach((shape, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            shape.rotation.x = rot;
            shape.rotation.y = rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();
