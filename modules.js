import * as THREE from 'three';

export function createMengerSponge(level, size, color, scene, x = 0, y = 0, z = 0) {
    console.log(scene);
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({ color });

    if (level === 0) {
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        scene.add(cube);
    } else {
        const newSize = size / 3;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                for (let dz = -1; dz <= 1; dz++) {
                    if (Math.abs(dx) + Math.abs(dy) + Math.abs(dz) >= 2) {
                        createMengerSponge(level - 1, newSize, color, scene, x + dx * newSize, y + dy * newSize, z + dz * newSize);
                    }
                }
            }
        }
    }
}

const colors = [
    0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff,
    0x00ffff, 0x800000, 0x008000, 0x000080, 0x808000
];

export function createColoredMengerSponge(level, size, scene, x = 0, y = 0, z = 0) {
    if (level === 0) {
        return;
    } else {
        const newSize = size / 3;
        let colorIndex = 0;
        let id = 0;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                for (let dz = -1; dz <= 1; dz++) {
                    if (Math.abs(dx) + Math.abs(dy) + Math.abs(dz) >= 2) {
                        createMengerSponge(level -1, newSize, new THREE.Color(colors[colorIndex]), scene, dx * newSize, y + dy * newSize, z + dz * newSize);
                        // if (level == 1) {
                        //     createMengerSponge(level -1, newSize, new THREE.Color(colors[colorIndex]), scene, x + dx * newSize, y + dy * newSize, z + dz * newSize);
                        // }

                        // if (level > 1) {
                        //     createColoredMengerSponge(level - 1, newSize, scene, x + dx * newSize, y + dy * newSize, z + dz * newSize)
                        // }
                        
                        id++;
                        if (id < 10) colorIndex++;
                        if (id > 10) colorIndex--;
                    }
                }
            }
        }
    }
}