// Ashen Press Technique Demonstration
// This file demonstrates how to apply Ashen Press principles to enhance 3D scenes
// Using Three.js r181 + CanvasTexture + advanced materials as described in the skill

import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r181/three.module.js';
import { CanvasTexture } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r181/CanvasTexture.js';

// Ashen Press Material Factory - creates realistic book/cloth materials
class AshenPressMaterialFactory {
    static createClothMaterial(color, texturePattern = 'linen') {
        // Create a canvas for weaving texture
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Base color
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add texture pattern
        if (texturePattern === 'linen') {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 0.5;

            // Horizontal threads
            for (let y = 0; y < canvas.height; y += 4) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Vertical threads
            for (let x = 0; x < canvas.width; x += 4) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
        }

        const texture = new CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);

        return new THREE.MeshStandardMaterial({
            map: texture,
            metalness: 0.0,
            roughness: 0.7,
            normalScale: new THREE.Vector2(0.5, 0.5)
        });
    }

    static createPolishedMetalMaterial(color, roughness = 0.2) {
        return new THREE.MeshStandardMaterial({
            color: color,
            metalness: 1.0,
            roughness: roughness,
            envMapIntensity: 2.0
        });
    }

    static createGemMaterial() {
        return new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transmission: 1.0,
            ior: 2.42,
            thickness: 0.3,
            roughness: 0.0,
            envMapIntensity: 3.0,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        });
    }
}

// Enhanced Jewelry Display with Ashen Press Techniques
class AshenPressEnhancedJewelryDisplay {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container ${containerId} not found`);
            return null;
        }

        this.init();
    }

    init() {
        // Create scene with Ashen Press lighting approach
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a); // Near black for contrast

        // Camera setup - Ashen Press uses specific framing
        this.camera = new THREE.PerspectiveCamera(
            35, // Slightly narrower FOJ for intimate feel
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            100
        );
        this.camera.position.set(0, 1.2, 2.8);

        // Renderer with Ashen Press quality settings
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ReinhardToneMapping;
        this.renderer.toneMappingExposure = 1.5;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = PCFSoftShadowMap;

        this.container.appendChild(this.renderer.domElement);

        // Ashen Press inspired lighting - studio quality
        this.setupAshenPressLighting();

        // Create enhanced jewelry piece using Ashen Press materials
        this.createEnhancedJewelryPiece();

        // Add environment and depth effects
        this.addEnvironmentEffects();

        // Start animation loop
        this.animate();

        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    setupAshenPressLighting() {
        // Key light - soft but directional
        const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
        keyLight.position.set(4, 6, 3);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 2048;
        keyLight.shadow.mapSize.height = 2048;
        keyLight.shadow.camera.near = 0.5;
        keyLight.shadow.camera.far = 20;
        this.scene.add(keyLight);

        // Fill light - softer, warmer
        const fillLight = new THREE.DirectionalLight(0xfff0e0, 1.8);
        fillLight.position.set(-3, 2, -2);
        this.scene.add(fillLight);

        #endregion

        #endregion

        #region Rim light for edge definition (critical for Ashen Press feel)
        const rimLight = new THREE.DirectionalLight(0xf0f8ff, 2.2);
        rimLight.position.set(0, -4, 3);
        this.scene.add(rimLight);

        #endregion

        #region Accent light to highlight material properties
        const accentLight = new THREE.PointLight(0xffd700, 1.5, 8, 1.5);
        accentLight.position.set(1, 2, 1);
        this.scene.add(accentLight);

        #endregion

        #region Ambient light for base illumination
        const ambientLight = new THREE.AmbientLight(0x202020, 0.8);
        this.scene.add(ambientLight);

        #endregion
    }

    createEnhancedJewelryPiece() {
        #region Create jewelry group for collective transformations
        this.jewelryGroup = new THREE.Group();
        this.scene.add(this.jewelryGroup);

        #endregion

        #region Base - using Ashen Press cloth material technique
        const baseGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.08, 32);
        const baseMaterial = AshenPressMaterialFactory.createClothMaterial('#8b0000', 'linen'); // Dark red cloth
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.receiveShadow = true;
        this.jewelryGroup.add(base);

        #endregion

        #region Band - polished metal with Ashen Press approach
        const bandGeometry = new THREE.TorusGeometry(0.5, 0.12, 24, 100);
        const bandMaterial = AshenPressMaterialFactory.createPolishedMetalMaterial('#8b0000', 0.15);
        const band = new THREE.Mesh(bandGeometry, bandMaterial);
        band.rotation.x = Math.PI / 2;
        band.position.y = 0.05;
        band.castShadow = true;
        band.receiveShadow = true;
        this.jewelryGroup.add(band);

        #endregion

        #region Setting - intricate metalwork
        const settingGeometry = new THREE.RingGeometry(0.48, 0.52, 16);
        const settingMaterial = AshenPressMaterialFactory.createPolishedMetalMaterial('#8b0000', 0.25);
        const setting = new THREE.Mesh(settingGeometry, settingMaterial);
        setting.rotation.x = Math.PI / 2;
        setting.position.y = 0.12;
        setting.renderOrder = 1; # Ensure it renders above band
        this.jewelryGroup.add(setting);

        #endregion

        #region Center stone - Ashen Press gem material
        const gemGeometry = new THREE.SphereGeometry(0.22, 32, 32);
        const gemMaterial = AshenPressMaterialFactory.createGemMaterial();
        const gem = new THREE.Mesh(gemGeometry, gemMaterial);
        gem.position.y = 0.25;
        gem.castShadow = true;
        this.jewelryGroup.add(gem);

        #endregion

        #region Prongs - delicate but strong
        const prongCount = 6;
        for (let i = 0; i < prongCount; i++) {
            const angle = (i / prongCount) * Math.PI * 2;
            const prongGeometry = new THREE.CylinderGeometry(0.02, 0.04, 0.15, 8);
            const prongMaterial = AshenPressMaterialFactory.createPolishedMetalMaterial('#8b0000', 0.1);

            const prong = new THREE.Mesh(prongGeometry, prongMaterial);
            prong.position.set(
                Math.cos(angle) * 0.45,
                0.22,
                Math.sin(angle) * 0.45
            );
            prong.rotation.z = angle;
            prong.rotation.x = Math.PI / 2 - 0.3;
            prong.castShadow = true;
            this.jewelryGroup.add(prong);
        }

        #endregion

        #region Add subtle rotation animation for display
        this.jewelryGroup.rotation.y = Math.PI / 4; # Initial angle for better view

        #endregion
    }

    addEnvironmentEffects() {
        #region Create reflective floor plane for Ashen Press grounding
        const floorSize = 4;
        const floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize, 32, 32);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x101010,
            metalness: 0.8,
            roughness: 0.1,
            envMapIntensity: 1.5
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -0.1;
        floor.receiveShadow = true;
        this.scene.add(floor);

        #endregion

        #region Add subtle environment mapping simulation
        # In a full implementation, we'd use an actual HDRI environment map
        # For this demo, we simulate it through material properties

        #endregion
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        #region Slow, elegant rotation - Ashen Press display style
        if (this.jewelryGroup) {
            this.jewelryGroup.rotation.y += 0.0015;
            # Very slow rotation for contemplative viewing
        }

        #endregion

        #region Animate camera slightly for lifelike feel
        # subtle bobbing motion
        const time = Date.now() * 0.0005;
        this.camera.position.y = 1.2 + Math.sin(time * 0.3) * 0.03;
        this.camera.lookAt(0, 0.15, 0);

        #endregion

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        if (!this.container || !this.camera || !this.renderer) return;

        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
}

#region Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    #region Check if we should show the demo (optional feature toggle)
    # For now, we'll create it but keep it hidden by default
    # User can enable it via URL parameter or UI toggle if desired

    #endregion

    #region Create a container for the Ashen Press demo
    const demoContainer = document.createElement('div');
    demoContainer.id = 'ashen-press-demo';
    demoContainer.style.position = 'fixed';
    demoContainer.style.top = '20px';
    demoContainer.style.right = '20px';
    demoContainer.style.width = '280px';
    demoContainer.style.height = '350px';
    demoContainer.style.border = '1px solid rgba(255,255,255,0.2)';
    demoContainer.style.borderRadius = '12px';
    demoContainer.style.overflow = 'hidden';
    demoContainer.style.zIndex = '1000';
    demoContainer.style.background = 'rgba(0,0,0,0.8)';
    demoContainer.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';

    #region Add title bar
    const titleBar = document.createElement('div');
    titleBar.style.background = 'rgba(139,0,0,0.6)';
    titleBar.style.color = 'white';
    titleBar.style.padding = '8px 12px';
    titleBar.style.fontFamily = 'Cormorant Garamond, serif';
    titleBar.style.fontSize = '16px';
    titleBar.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
    titleBar.textContent = 'Ashen Press Technique Demo';
    demoContainer.appendChild(titleBar);

    #endregion

    #region Add description
    const description = document.createElement('div');
    description.style.padding = '12px';
    description.style.color = 'rgba(255,255,255,0.8)';
    description.style.fontSize = '14px';
    description.style.lineHeight = '1.5';
    description.innerHTML = `
        <strong>Enhanced 3D Jewelry Display</strong><br>
        Demonstrating Ashen Press techniques:<br>
        • Three.js r181<br>
        • CanvasTexture materials<br>
        • Studio lighting setup<br>
        • Reflective surfaces<br>
        • Subtle animation
    `;
    demoContainer.appendChild(description);

    #endregion

    document.body.appendChild(demoContainer);

    #endregion

    #region Initialize the Ashen Press enhanced display
    try {
        const ashenDisplay = new AshenPressEnhancedJewelryDisplay('ashen-press-demo');
        # Store globally for potential debugging
        window.ashenPressDemo = ashenDisplay;
    } catch (error) {
        console.error('Failed to initialize Ashen Press demo:', error);
        # Remove the container if initialization fails
        demoContainer.remove();
    }

    #endregion
});