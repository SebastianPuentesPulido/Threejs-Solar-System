import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './style.css';
import Typed from 'typed.js';

var options = {
    strings: ['Creation','Animation','Solar System','Experiment'],
    typeSpeed: 50,
    loop: true
}

var typed  = new  Typed('.typed', options);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);

renderer.render(scene, camera);
// planet Earth
const Texture = new THREE.TextureLoader().load("./images/earth.jpg");
const geometry = new THREE.SphereGeometry(15, 32, 16);
const material = new THREE.MeshStandardMaterial({
  map: Texture,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

sphere.position.set(100, 52, 25);

// Sun
const SunTexture = new THREE.TextureLoader().load("./images/sun.jpg");
const Sun = new THREE.Mesh(
  new THREE.SphereGeometry(45, 32, 16),
  new THREE.MeshBasicMaterial({ map: SunTexture })
);
scene.add(Sun);
Sun.position.set(9, 9, 9);
//

// Mercury planet
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(12, 32, 16),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load("./images/mercury.jpg"),
  })
);
scene.add(mercury);
mercury.position.set(40, 43, 15);

// Venus
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 16),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load("./images/venus.jpg"),
  })
);
scene.add(venus);
venus.position.set(65, 48, 20);

// Mars Planet
const textureMars = new THREE.TextureLoader().load("./images/Mars.jpg");

const Mars = new THREE.Mesh(
  new THREE.SphereGeometry(9, 32, 16),
  new THREE.MeshBasicMaterial({ map: textureMars })
);

scene.add(Mars);
Mars.position.set(150, 70, 30);

// ilumination

const pointLight = new THREE.PointLight(0xfdcb6e);
pointLight.position.set(2, 2, 2);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(900, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const spaceTexture = new THREE.TextureLoader().load("./images/space.jpg");
scene.background = spaceTexture;

// Solar System Text  with TextGeometry
const loader = new THREE.FontLoader();
loader.load("./fonts/Space Mono_Bold.json", function (font) {
  const geometryText = {
    font: font,
    size: 20,
    height: 5,
    curveSegments: 12,
    bevelEnabled: false,
    bevelThickness: 10,
    bevelSize: 5,
    bevelOffset: 0,
    bevelSegments: 5,
  };
  const SolarText = new THREE.TextGeometry("Solar System", geometryText);
  const MatText = new THREE.MeshLambertMaterial({ color: 0x74b9ff });
  const TextSolar = new THREE.Mesh(SolarText, MatText);
  scene.add(TextSolar);
  TextSolar.position.set(0, 100, 0);
});
// Audio
const listener = new THREE.AudioListener();
camera.add(listener);

// create audio
const sound = new THREE.Audio(listener);

// Load The Sound
const AudioLoader = new THREE.AudioLoader();
AudioLoader.load("./sounds/Dead-Voxel.mp3", (buffer) => {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  sound.play();
});
// Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(2, 30, 30);
  const material = new THREE.MeshStandardMaterial({ color: 0xfdcb6e });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(800));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);
//

// sketchfab model
const rocket = new GLTFLoader();
rocket.load('./images/sketchfab/scene.gltf', function (gltf) {
  var model3d = gltf.scene.children[0];
  scene.add(gltf.scene);
  model3d.position.set(0,60,0);
}, undefined, function (error) {
  console.log(error);
});
//


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.x += 10;
  camera.position.y += 100;
  camera.position.z += 300;
}

document.body.onscroll = moveCamera;
moveCamera();

animate();

function animate() {
  requestAnimationFrame(animate);

  Sun.rotation.y += -0.01;
  controls.update();
  renderer.render(scene, camera);

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  sphere.rotation.z += 0.01;
  
  mercury.rotation.x += 0.01;
  mercury.rotation.y += 0.01;
  mercury.rotation.z += 0.01;

  venus.rotation.x += 0.01;
  venus.rotation.y += 0.01;
  venus.rotation.z += 0.01;

  Mars.rotation.x += 0.01;
  Mars.rotation.y += 0.01;
  Mars.rotation.z += 0.01;
}
