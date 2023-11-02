import * as THREE from 'three';

const width = window.innerWidth, height = window.innerHeight;
const mouse = new THREE.Vector2(); // Vektor untuk menyimpan posisi mouse

// init

const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Tambahkan event listener untuk mengikuti pergerakan kursor mouse
document.addEventListener('mousemove', onMouseMove, false);

// Fungsi yang akan dipanggil saat mouse bergerak
function onMouseMove(event) {
    // Ambil posisi mouse dan normalisasikan ke dalam rentang -1 hingga 1
    mouse.x = (event.clientX / width) * 2 - 1;
    mouse.y = -(event.clientY / height) * 2 + 1;

    // Update rotasi kotak (mesh) berdasarkan posisi mouse pada semua sumbu
    mesh.rotation.x = mouse.y * Math.PI;
    mesh.rotation.y = -mouse.x * Math.PI;
    mesh.rotation.z = mouse.y * Math.PI;
}

// animation

function animation() {
    renderer.render(scene, camera);

    // Beritahu browser untuk memanggil fungsi ini lagi pada frame berikutnya
    requestAnimationFrame(animation);
}

// Mulai animasi
animation();
