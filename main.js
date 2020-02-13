var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var canvas= document.getElementById("webCanvas");
var renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true });
renderer.setClearColor( 0x000000, 0 ); // background
renderer.setSize( window.innerWidth, window.innerHeight );
//document.body.appendChild( renderer.domElement );

var innerColor = 0x27F8D8;
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

//innerSphere
var geometry = new THREE.IcosahedronGeometry(50,3);
var material = new THREE.MeshLambertMaterial( { color: innerColor,
    ambient: innerColor,
    wireframe: true,
    transparent: true,
    shininess: 0 } );
var innerSphere = new THREE.Mesh( geometry, material );
scene.add(innerSphere);

//RingGeometry
var geo = new THREE.RingGeometry(55, 70, 20 );
var mat = new THREE.MeshLambertMaterial( { color: innerColor,
    wireframe: true
 } );
var ring = new THREE.Mesh( geo, mat );
scene.add( ring );

//circleGeometry
var radius   = 70,
    segments = 64,
    material = new THREE.LineBasicMaterial( { color: innerColor } ),
    geometry = new THREE.CircleGeometry( radius, segments );
geometry.vertices.shift();
var circle = new THREE.LineLoop( geometry, material );
scene.add( circle );

//draw LineLoop
/*var material = new THREE.LineBasicMaterial( { color: innerColor } );
var points = [];
points.push( new THREE.Vector3( - 70, 0, 0 ) );
points.push( new THREE.Vector3( 0, 70, 0 ) );
points.push( new THREE.Vector3( 70, 0, 0 ) );
points.push( new THREE.Vector3( 0, -70, 0 ) );
points.push( new THREE.Vector3( -70, 0, 0 ) );
var geometry = new THREE.BufferGeometry().setFromPoints( points );
var line = new THREE.Line( geometry, material );
scene.add( line );*/

//particleCircle


//particleSystem
var particles = new THREE.Geometry();
for (i = 0; i < 10000; i++) {
  var particle = new THREE.Vector3();
  particle.x = Math.random() * 2000 - 1000;
  particle.y = Math.random() * 2000 - 1000;
  particle.z = Math.random() * 2000 - 1000;

  // create a velocity vector
  particle.velocity = 0;
  particle.acceleration = 0.005;

  particles.vertices.push(particle);
}
var particleSystem = new THREE.PointCloud(particles, new THREE.PointCloudMaterial({
  size: 1,
  color: innerColor,
  blending: THREE.AdditiveBlending,
  transparent: true
  })
);
particleSystem.sortParticles = true;
scene.add(particleSystem);

camera.position.z = 150;
//camera.rotation.x = Math.PI/2;

var time = new THREE.Clock();
var dx = 0.01;
var target = 1;
var negtarget = 0.8;
var freq = 1;
var amp = 2;

function animate() {
  renderer.render( scene, camera );
  //sphere animation
	innerSphere.rotation.x += 0.01;
	innerSphere.rotation.y += 0.01;

  //ring Animation
  var outerShift = Math.abs(Math.cos(( (time.getElapsedTime()+5) / 10)));
  var innerShift = Math.abs(Math.cos(( (time.getElapsedTime()+2.5) / 20)));

  //if(circle.scale.x > target || circle.scale.x < negtarget){
    //dx = -dx;
  //}
  //circle.scale.x += dx;
  //circle.rotation.z += 0.01;

  //particle animation
  particles.vertices.forEach(p=>{
    p.velocity += p.acceleration;
    p.z += p.velocity;
    if(p.z > 200){
      p.z = -200;
      p.velocity = 0;
    }
  });
  particles.verticesNeedUpdate = true;
  //particleSystem.rotation.z +=0.002;

  requestAnimationFrame( animate );
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
animate();
