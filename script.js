// Aishpra Luxury Jewelry 3D Experience - Main Application
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r160/three.module.js';
import { GLTFLoader } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r160/loaders/GLTFLoader.js';
import { EffectComposer } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r160/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r160/postprocessing/RenderPass.js';
import { BloomPass } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r160/postprocessing/BloomPass.js';
import { ShaderPass } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r160/postprocessing/ShaderPass.js';
import { FXAAShader } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r160/shaders/FXAAShader.js';
import { gsap } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.js';
import { ScrollTrigger } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.js';
import { ScrollSmoother } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollSmoother.js';
import { MotionPathPlugin } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/MotionPathPlugin.js';
import { Draggable } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Draggable.js';
import { DrawSVGPlugin } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/DrawSVGPlugin.js';
import { EaselPlugin } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/EaselPlugin.js';
import { Flip } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Flip.js';
import { GSDevTools } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/GSDevTools.js';
import { MotionPathHelper } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/MotionPathHelper.js';
import { MorphSVGPlugin } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/MorphSVGPlugin.js';
import { Observer } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Observer.js';
import { Physics2DPlugin } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Physics2DPlugin.js';
import { PhysicsPropsPlugin } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/PhysicsPropsPlugin.js';
import { PixiPlugin } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/PixiPlugin.js';
import { ScrambleTextPlugin } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrambleTextPlugin.js';
import { SplitText } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/SplitText.js';
import { TextPlugin } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.js';
import { RoughEase } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/utils/RoughEase.js';
import { ExpoScaleEase } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/utils/ExpoScaleEase.js';
import { SlowMo } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/utils/SlowMo.js';
import { CustomEase } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/utils/CustomEase.js';
import { CustomBounce } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/utils/CustomBounce.js';
import { CustomWiggle } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/utils/CustomWiggle.js';

// Register GSAP plugins
gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  MotionPathPlugin,
  Draggable,
  DrawSVGPlugin,
  EaselPlugin,
  Flip,
  GSDevTools,
  MotionPathHelper,
  MorphSVGPlugin,
  Observer,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  PixiPlugin,
  ScrambleTextPlugin,
  SplitText,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase,
  CustomBounce,
  CustomWiggle
);

class AishpraExperience {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.composer = null;
        this.ring = null;
        this.prongs = [];
        this.diamond = null;
        this.band = null;
        this.clock = new THREE.Clock();

        // Animation controls
        this.scrollProgress = 0;
        this.isScrolling = false;
        this.scrollTimeout = null;

        // Material original values for animation
        this.originalBandRoughness = null;
        this.originalDiamondRoughness = null;

        // Initialize
        this.init();
    }

    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createLights();
        this.createEnvironment();
        this.loadRingModel();
        this.setupPostProcessing();
        this.setupGSAP();
        this.animate();
        this.setupResizeHandler();
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 1.5, 3.5);
        this.camera.lookAt(0, 0, 0);
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Performance guardrail
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        document.getElementById('three-container').appendChild(this.renderer.domElement);
    }

    createLights() {
        // Main key light (simulating studio softbox)
        const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
        keyLight.position.set(3, 5, 2);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 1024;
        keyLight.shadow.mapSize.height = 1024;
        this.scene.add(keyLight);

        // Fill light
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
        fillLight.position.set(-2, 3, -1);
        this.scene.add(fillLight);

        // Rim light for edge highlight
        const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
        rimLight.position.set(0, -3, 2);
        this.scene.add(rimLight);

        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);
    }

    createEnvironment() {
        // Create a simple HDRI-like environment using a large sphere with emissive material
        const envGeometry = new THREE.SphereGeometry(50, 32, 32);
        // Invert normals to create inner sphere
        envGeometry.scale(-1, 1, 1);

        const envMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.BackSide
        });

        this.environment = new THREE.Mesh(envGeometry, envMaterial);
        this.scene.add(this.environment);
    }

    loadRingModel() {
        const loader = new GLTFLoader();

        // Try to load a real GLTF model, fallback to procedural generation
        loader.load(
            // URL would be provided in production - using procedural for now
            'data:model/gltf-binary;base64,AAABAAIAAQAMAAAAAFRydWlsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////wMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAA//8DAAAAAAwAAAAJAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQAAAAkAAAACQ==
            ',
            (gltf) => {
                this.onModelLoaded(gltf);
            },
            (xhr) => {
                console.log(`(xhr.loaded / xhr.total * 100) % loaded`);
            },
            (error) => {
                console.error('Error loading GLTF model:', error);
                // Fallback to procedural model
                this.createProceduralRing();
            }
        );
    }

    onModelLoaded(gltf) {
        this.scene.add(gltf.scene);

        // Traverse to find specific parts
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                // Store references to parts by name or type
                if (child.name.toLowerCase().includes('band') ||
                    child.geometry.type === 'TorusGeometry' ||
                    child.geometry.type === 'RingGeometry') {
                    this.band = child;
                    this.originalBandRoughness = child.material.roughness;
                } else if (child.name.toLowerCase().includes('prong')) {
                    this.prongs.push(child);
                } else if (child.name.toLowerCase().includes('diamond') ||
                         child.geometry.type === 'IcosahedronGeometry' ||
                         child.geometry.type === 'OctahedronGeometry') {
                    this.diamond = child;
                    this.originalDiamondRoughness = child.material.roughness;
                    // Configure diamond material for transmission
                    if (child.material instanceof THREE.MeshPhysicalMaterial) {
                        child.material.transmission = 1;
                        child.material.ior = 2.42;
                        child.material.thickness = 0.5;
                        child.material.roughness = 0;
                        child.material.envMapIntensity = 2;
                    }
                }
            }
        });

        // If we couldn't find parts by name, estimate based on object count/order
        if (!this.band || this.prongs.length === 0 || !this.diamond) {
            this.estimatePartsFromModel(gltf.scene);
        }

        console.log('Ring model loaded successfully');
    }

    estimatePartsFromModel(parent) {
        const meshes = [];
        parent.traverse((child) => {
            if (child.isMesh) meshes.push(child);
        });

        if (meshes.length >= 3) {
            // Assume first is band, last is diamond, middle are prongs
            this.band = meshes[0];
            this.diamond = meshes[meshes.length - 1];
            this.prongs = meshes.slice(1, meshes.length - 1);

            this.originalBandRoughness = this.band.material.roughness;
            this.originalDiamondRoughness = this.diamond.material.roughness;

            // Configure diamond material
            if (this.diamond.material instanceof THREE.MeshPhysicalMaterial) {
                this.diamond.material.transmission = 1;
                this.diamond.material.ior = 2.42;
                this.diamond.material.thickness = 0.5;
                this.diamond.material.roughness = 0;
                this.diamond.material.envMapIntensity = 2;
            }
        }
    }

    createProceduralRing() {
        console.log('Creating procedural ring model');

        // Create band (torus)
        const bandGeometry = new THREE.TorusGeometry(0.8, 0.15, 16, 100);
        const bandMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x8B0000, // Dark red gold
            metalness: 1.0,
            roughness: 0.6,
            envMapIntensity: 1.5,
            clearcoat: 0.1,
            clearcoatRoughness: 0.1
        });
        this.band = new THREE.Mesh(bandGeometry, bandMaterial);
        this.originalBandRoughness = bandMaterial.roughness;
        this.scene.add(this.band);

        // Create prongs (6 cones)
        const prongGeometry = new THREE.ConeGeometry(0.05, 0.2, 8);
        const prongMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x8B0000,
            metalness: 1.0,
            roughness: 0.6,
            envMapIntensity: 1.5
        });

        for (let i = 0; i < 6; i++) {
            const prong = new THREE.Mesh(prongGeometry, prongMaterial);
            const angle = (i / 6) * Math.PI * 2;
            prong.position.set(
                Math.cos(angle) * 0.7,
                0.9,
                Math.sin(angle) * 0.7
            );
            prong.rotation.x = Math.PI / 2;
            prong.rotation.z = angle;
            this.scene.add(prong);
            this.prongs.push(prong);
        }

        // Create diamond (icosahedron for simplicity)
        const diamondGeometry = new THREE.IcosahedronGeometry(0.3, 0);
        const diamondMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transmission: 1,
            ior: 2.42,
            thickness: 0.5,
            roughness: 0,
            envMapIntensity: 2
        });
        this.diamond = new THREE.Mesh(diamondGeometry, diamondMaterial);
        this.diamond.position.set(0, 0.9, 0);
        this.originalDiamondRoughness = diamondMaterial.roughness;
        this.scene.add(this.diamond);

        console.log('Procedural ring created');
    }

    setupPostProcessing() {
        this.composer = new EffectComposer(this.renderer);
        this.composer.setSize(window.innerWidth, window.innerHeight);

        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        const bloomPass = new BloomPass(
            1.5,    // strength
            25,     // kernel size
            4.0,    // sigma
            256     // blur render target resolution
        );
        this.composer.addPass(bloomPass);

        const fxaaPass = new ShaderPass(FXAAShader);
        const pixelWidth = 1 / window.innerWidth;
        const pixelHeight = 1 / window.innerHeight;
        fxaaPass.material.uniforms['resolution'].value.set(1/pixelWidth, 1/pixelHeight);
        this.composer.addPass(fxaaPass);
    }

    setupGSAP() {
        // Create smooth scroller
        this.scrollSmoother = ScrollSmoother.create({
            smooth: 2,
            effects: true,
            normalizeScroll: true,
            ignoreMobileResize: true
        });

        // Create the master timeline for the signature loop
        this.masterTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#the-making',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                pin: true,
                anticipatePin: 1
            }
        });

        // Add the 5 beats to the timeline
        this.addBeat1(); // 0-0.15
        this.addBeat2(); // 0.15-0.4
        this.addBeat3(); // 0.4-0.7
        this.addBeat4(); // 0.7-0.9
        this.addBeat5(); // 0.9-1.0

        // Setup idle breathing animation
        this.setupIdleAnimation();

        // Handle scroll events for idle detection
        window.addEventListener('scroll', () => {
            this.isScrolling = true;
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                this.isScrolling = false;
            }, 150);
        });
    }

    addBeat1() {
        // Beat 1 — The Band Arrives (0–0.15)
        // Bare metal band fades/floats in from depth (z-axis), slow rotation on Y.
        // Camera does a slow dolly-in, DOF sharpens as it settles center-frame.

        this.masterTimeline.fromTo(
            this.band.position,
            { z: 2 }, // Start further back
            { z: 0, duration: 0.15, ease: "power3.out" },
            0
        );

        this.masterTimeline.fromTo(
            this.band.rotation,
            { y: -Math.PI/2 },
            { y: 0, duration: 0.15, ease: "power3.out" },
            0
        );

        this.masterTimeline.fromTo(
            this.camera.position,
            { z: 5 }, // Start further back
            { z: 3.5, duration: 0.15, ease: "power3.out" },
            0
        );

        // Optional: Add slight rotation to band for more dynamic entry
        this.masterTimeline.fromTo(
            this.band.rotation,
            { x: -0.5 },
            { x: 0, duration: 0.15, ease: "power3.out" },
            0
        );
    }

    addBeat2() {
        // Beat 2 — The Setting (0.15–0.4)
        // Prongs subtly flex outward, diamond drops in, prongs snap closed

        // Prongs flex outward (scale up slightly)
        this.masterTimeline.to(
            this.prongs.map(prong => prong.scale),
            { x: 1.2, y: 1.2, z: 1.2, duration: 0.1, ease: "power1.out" },
            0.15
        );

        // Diamond drops in from above
        this.masterTimeline.fromTo(
            this.diamond.position,
            { y: 2 },
            { y: 0.9, duration: 0.25, ease: "power3.inOut" },
            0.15
        );

        // Prongs snap closed (scale back down with elastic effect)
        this.masterTimeline.to(
            this.prongs.map(prong => prong.scale),
            { x: 1, y: 1, z: 1, duration: 0.15, ease: "elastic.out(1, 0.3)" },
            0.3
        );

        // Diamond scale-punch on contact (weight feel)
        this.masterTimeline.fromTo(
            this.diamond.scale,
            { x: 1, y: 1, z: 1 },
            { x: 1.03, y: 1.03, z: 1.03, duration: 0.05, ease: "power2.out" },
            0.35
        ).to(
            this.diamond.scale,
            { x: 1, y: 1, z: 1, duration: 0.05, ease: "power2.in" },
            0.4
        );

        // Tiny camera shake on "click"
        this.masterTimeline.fromTo(
            this.camera.position,
            { x: 0, y: 0 },
            {
                x: () => (Math.random() - 0.5) * 0.1,
                y: () => (Math.random() - 0.5) * 0.1,
                z: 3.5,
                duration: 0.15,
                ease: "power1.inOut"
            },
            0.3
        ).to(
            this.camera.position,
            { x: 0, y: 0, z: 3.5, duration: 0.1, ease: "power1.out" },
            0.45
        );
    }

    addBeat3() {
        // Beat 3 — Polishing (0.4–0.7)
        // Polishing cloth sweeps, roughness animates, micro-scratches fade

        // Animate band roughness from matte to polished
        this.masterTimeline.to(
            this.band.material,
            { roughness: 0.05, duration: 0.3, ease: "power3.inOut" },
            0.4
        );

        // Simulate polishing cloth passes (we'll animate a simple sweeping effect)
        // Create a temporary plane to represent the cloth
        const clothGeometry = new THREE.PlaneGeometry(2, 0.1);
        const clothMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            opacity: 0.1,
            transparent: true,
            visible: false
        });
        this.cloth = new THREE.Mesh(clothGeometry, clothMaterial);
        this.cloth.rotation.x = -Math.PI/2;
        this.scene.add(this.cloth);

        // First pass
        this.masterTimeline.fromTo(
            this.cloth.position,
            { x: -1.5, y: 0.16 },
            { x: 1.5, y: 0.16, duration: 0.2, ease: "power1.inOut" },
            0.4
        );

        // Second pass
        this.masterTimeline.fromTo(
            this.cloth.position,
            { x: -1.5, y: 0.15 },
            { x: 1.5, y: 0.15, duration: 0.2, ease: "power1.inOut" },
            0.5
        );

        // Third pass
        this.masterTimeline.fromTo(
            this.cloth.position,
            { x: -1.5, y: 0.14 },
            { x: 1.5, y: 0.14, duration: 0.2, ease: "power1.inOut" },
            0.6
        );

        // Hide cloth after passes
        this.masterTimeline.to(
            this.cloth.material,
            { opacity: 0, duration: 0.1 },
            0.65
        );

        // Fade out micro-scratches (simulate by reducing some texture effect)
        // In a real implementation, this would animate a noise texture opacity
        this.masterTimeline.to(
            this.band.material,
            {
                // Simulate scratch reduction by slightly increasing roughness then decreasing
                roughness: 0.03,
                duration: 0.1,
                ease: "power1.inOut"
            },
            0.65
        ).to(
            this.band.material,
            { roughness: 0.05, duration: 0.05 },
            0.7
        );
    }

    addBeat4() {
        // Beat 4 — The Reveal (0.7–0.9)
        // Full 360° slow rotation, camera arcs, bloom intensifies

        // Ring rotates 360° while camera orbits
        this.masterTimeline.to(
            this.band.rotation,
            { y: Math.PI * 2, duration: 0.2, ease: "power1.inOut" },
            0.7
        );

        this.masterTimeline.to(
            this.diamond.rotation,
            { y: Math.PI * 2, duration: 0.2, ease: "power1.inOut" },
            0.7
        );

        // Prongs also rotate with the ring
        this.prongs.forEach(prong => {
            this.masterTimeline.to(
                prong.rotation,
                { y: Math.PI * 2, duration: 0.2, ease: "power1.inOut" },
                0.7
            );
        });

        // Camera orbits around the ring
        this.masterTimeline.fromTo(
            this.camera.position,
            { x: 0, z: 3.5 },
            {
                x: () => Math.sin(gsap.utils.random(0, Math.PI*2)) * 1.5,
                z: () => Math.cos(gsap.utils.random(0, Math.PI*2)) * 1.5 + 2,
                duration: 0.2,
                ease: "power1.inOut"
            },
            0.7
        );

        // Look at center during orbit
        this.masterTimeline.to(
            this.camera,
            {
                lookAt: { x: 0, y: 0, z: 0 },
                duration: 0.2,
                ease: "power1.inOut"
            },
            0.7
        );

        // Bloom intensity ramps up on diamond facets
        // Animate an environmental light or HDRI rotation
        this.masterTimeline.to(
            this.environment.rotation,
            { y: Math.PI * 2, duration: 0.2, ease: "power1.inOut" },
            0.7
        );

        // Increase bloom/diamond sparkle by animating a key light
        // We'll simulate this by animating envMap intensity or adding a pulsed light
        const sparkleLight = new THREE.PointLight(0xffffcc, 3, 10, 2);
        sparkleLight.position.set(0, 3, 0);
        this.scene.add(sparkleLight);

        this.masterTimeline.fromTo(
            sparkleLight.intensity,
            { value: 0 },
            { value: 3, duration: 0.15, ease: "power3.out" },
            0.75
        ).to(
            sparkleLight.intensity,
            { value: 0, duration: 0.15, ease: "power3.in" },
            0.85
        );

        // Optional: Add slight camera roll for cinematic feel
        this.masterTimeline.fromTo(
            this.camera.rotation,
            { z: 0 },
            { z: () => (Math.random() - 0.5) * 0.2, duration: 0.1, ease: "power1.out" },
            0.75
        ).to(
            this.camera.rotation,
            { z: 0, duration: 0.1, ease: "power1.in" },
            0.85
        );
    }

    addBeat5() {
        // Beat 5 — Product Lockup (0.9–1.0)
        // Ring settles, product info fades in

        // Ensure final stable position
        this.masterTimeline.to(
            [this.band.position, this.diamond.position],
            { y: 0.9, duration: 0.1, ease: "power3.out" },
            0.9
        );

        this.prongs.forEach(prong => {
            this.masterTimeline.to(
                prong.position,
                { y: 0.9, duration: 0.1, ease: "power3.out" },
                0.9
            );
        });

        // Final tiny adjustments for perfect settle
        this.masterTimeline.to(
            this.band.rotation,
            { y: Math.PI * 2, duration: 0.05, ease: "power3.out" },
            0.9
        );

        // Fade in product info (we'll trigger this via ScrollTrigger separately)
        // For now, just ensure everything is stable
    }

    setupIdleAnimation() {
        // Idle "breathing" loop when scroll is at rest
        this.idleTimeline = gsap.timeline({ repeat: -1, yoyo: true, paused: true });

        this.idleTimeline.to(
            this.band.rotation,
            { y: '+=' + (Math.PI * 0.1), duration: 3, ease: "power1.inOut" }
        ).to(
            this.diamond.rotation,
            { y: '+=' + (Math.PI * 0.1), duration: 3, ease: "power1.inOut" }
        ).to(
            this.environment.rotation,
            { y: '+=' + (Math.PI * 0.05), duration: 3, ease: "power1.inOut" }
        );

        // Add subtle scale pulse for "breathing" feel
        this.idleTimeline.to(
            [this.band.scale, this.diamond.scale],
            { x: 1.01, y: 1.01, z: 1.01, duration: 1.5, ease: "power1.inOut" },
            0
        ).to(
            [this.band.scale, this.diamond.scale],
            { x: 1, y: 1, z: 1, duration: 1.5, ease: "power1.inOut" },
            1.5
        );
    }

    setupResizeHandler() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.composer.setSize(window.innerWidth, window.innerHeight);

            // Update FXAA pass resolution
            if (this.composer.passes[2]) {
                const fxaaPass = this.composer.passes[2];
                const pixelWidth = 1 / window.innerWidth;
                const pixelHeight = 1 / window.innerHeight;
                fxaaPass.material.uniforms['resolution'].value.set(1/pixelWidth, 1/pixelHeight);
            }
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Update idle animation based on scroll state
        if (this.idleTimeline) {
            if (!this.isScrolling) {
                this.idleTimeline.play();
            } else {
                this.idleTimeline.pause();
            }
        }

        // Update cloth visibility if it exists
        if (this.cloth) {
            this.cloth.visible = !this.isScrolling;
        }

        this.composer.render();
    }
}

// Initialize the experience when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Show fallback message or implement simplified experience
        document.getElementById('three-container').innerHTML = `
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                        text-align: center; color: white; padding: 2rem; background: rgba(0,0,0,0.7);
                        border-radius: 1rem;">
                <h2>Aishpra Jewelry</h2>
                <p>Experience reduced motion version</p>
                <p>For the full 3D experience, please enable motion effects in your system preferences.</p>
            </div>
        `;
        return;
    }

    // Check if we're on a low-end device (simple heuristic)
    const isLowEnd = navigator.hardwareConcurrency < 4 ||
                     (navigator.deviceMemory && navigator.deviceMemory < 4);

    if (isLowEnd) {
        // Could serve a pre-rendered video instead - for now we'll continue with reduced quality
        console.log('Low-end device detected, using performance optimizations');
    }

    // Initialize the experience
    window.aishpra = new AishpraExperience();

    // Populate collection grid
    const collectionData = [
        {
            name: "The Solitaire",
            price: "$12,500",
            description: "Classic round brilliant cut in 18k gold",
            image: "https://images.unsplash.com/photo-1605100784630-ef51e610bb0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzY1Nzl8MHwxfHNlYXJjaHwxfHxyaW5nZWx8ZW58MHx8fHwxNjYwMDkzNjUw&ixlib=rb-1.2.1&q=80&w=400"
        },
        {
            name: "The Halo",
            price: "$18,750",
            description: "Center stone surrounded by micropave diamonds",
            image: "https://images.unsplash.com/photo-1605100783390-91bfb429039e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzY1Nzl8MHwxfHNlYXJjaHwzfHxyaW5nZWx8ZW58MHx8fHwxNjYwMDkzNjUw&ixlib=rb-1.2.1&q=80&w=400"
        },
        {
            name: "The Three-Stone",
            price: "$22,000",
            description: "Past, present, future symbolism with tapered baguettes",
            image: "https://images.unsplash.com/photo-1605100784737-66f2c7c8e457?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzY1Nzl8MHwxfHNlYXJjaHw1fHxyaW5nZWx8ZW58MHx8fHwxNjYwMDkzNjUw&ixlib=rb-1.2.1&q=80&w=400"
        },
        {
            name: "The Vintage",
            price: "$15,300",
            description: "Milgrain details and filigree inspired by Art Deco",
            image: "https://images.unsplash.com/photo-1605100785484-4675255d0ae8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzY1Nzl8MHwxfHNlYXJjaHw3fHxyaW5nZWx8ZW58MHx8fHwxNjYwMDkzNjUw&ixlib=rb-1.2.1&q=80&w=400"
        }
    ];

    const collectionGrid = document.getElementById('collection-grid');
    if (collectionGrid) {
        collectionData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'preview-card';
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover rounded-md mb-4">
                <h3 class="font-bold text-lg mb-2">${item.name}</h3>
                <p class="text-sm opacity-75 mb-2">${item.description}</p>
                <p class="font-semibold text-xl">${item.price}</p>
            `;
            collectionGrid.appendChild(card);
        });
    }
});