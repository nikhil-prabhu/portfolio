#version 300 es
in vec4 position;
out vec2 vUv;

void main() {
    vec2 pos = position.xy;
    
    float strength = 0.15;
    pos *= 1.0 + (pos.y * pos.y * strength);
    pos *= 1.0 + (pos.x * pos.x * strength);
    
    gl_Position = vec4(pos / 1.1, 0.0, 1.0);
}