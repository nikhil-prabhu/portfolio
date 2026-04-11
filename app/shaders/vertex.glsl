#version 300 es
in vec4 position;
out vec2 vUv;

void main() {
    vec2 pos = position.xy;
    
    // THE BULGE MATH
    // This warps the rectangle into a 'barrel' shape
    float strength = 0.15; // Higher = more 'tube' curve
    pos *= 1.0 + (pos.y * pos.y * strength);
    pos *= 1.0 + (pos.x * pos.x * strength);
    
    // We scale it up slightly (1.1) to ensure the corners 
    // of the warp don't show the 'black' void behind the canvas
    gl_Position = vec4(pos / 1.1, 0.0, 1.0);
}