// Kataraphie Vertex Shader – 180° Kuppel Projektion

uniform float uRotation;     // 180° - epsilon
uniform float uGS6;          // Goldener Schnitt Super-6
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

attribute vec3 position;
attribute vec3 normal;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {

    // 1. Kataraphie-Rotation (180° - GS6)
    float rot = radians(180.0 - uRotation);

    mat3 rotY = mat3(
        cos(rot), 0.0, sin(rot),
        0.0,      1.0, 0.0,
       -sin(rot), 0.0, cos(rot)
    );

    vec3 pos = rotY * position;

    // 2. GS6-Zentrierung (stabilisiert die Kuppel)
    pos += normal * uGS6;

    // 3. Normals korrigieren (verhindert Brust/Kopf-Abschneiden)
    vNormal = normalize(rotY * normal);

    // 4. Standard GPU Pipeline
    vPosition = pos;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
}
