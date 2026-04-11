#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec4 iMouse; 
out vec4 fragColor;

float vort_speed = 1.;
vec4 colour_1 = vec4(0.996, 0.372, 0.333, 1.);
vec4 colour_2 = vec4(0.0, 0.615, 1.0, 1.);
float mid_flash = 0.;
float vort_offset = 0.;

#define PIXEL_SIZE_FAC 700.
#define BLACK 0.6 * vec4(79./255., 99./255., 103./255., 1.0/0.6)

vec4 easing(vec4 t, float power) {
    return vec4(pow(t.x, power), pow(t.y, power), pow(t.z, power), pow(t.w, power));
}

vec4 effect(vec3 screen_coords, float scale) {
    vec2 uv = screen_coords.xy;
    uv = floor(uv * (PIXEL_SIZE_FAC / 2.)) / (PIXEL_SIZE_FAC / 2.);
    uv /= scale;
    float uv_len = length(uv);
    float speed = (iTime + 10.0) * vort_speed;
    float new_pixel_angle = atan(uv.y, uv.x) + (2.2 + 0.4*min(6.,speed))*uv_len - 1. - speed*0.05 - min(6.,speed)*speed*0.02 + vort_offset;
    vec2 mid = (iResolution.xy/length(iResolution.xy))/2.;
    vec2 sv = vec2((uv_len * cos(new_pixel_angle) + mid.x), (uv_len * sin(new_pixel_angle) + mid.y)) - mid;
    
    sv *= 30.;
    speed = (iTime + 10.0) * 6.0 * vort_speed + vort_offset + 5.;
    vec2 uv2 = vec2(sv.x + sv.y);

    for(int i=0; i < 5; i++) {
        uv2 += sin(max(sv.x, sv.y)) + sv;
        sv += 0.5 * vec2(cos(5.1123 + 0.353 * uv2.y + speed * 0.131), sin(uv2.x - 0.113 * speed));
        sv -= 1.0 * cos(sv.x + sv.y) - 1.0 * sin(sv.x * 0.711 - sv.y);
    }

    float smoke_res = min(2., max(-2., 1.5 + length(sv)*0.12 - 0.17*(min(10., (iTime+10.0)*1.2))));
    if (smoke_res < 0.2) { smoke_res = (smoke_res - 0.2)*0.6 + 0.2; }
    
    float c1p = max(0., 1. - 2. * abs(1. - smoke_res));
    float c2p = max(0., 1. - 2. * (smoke_res));
    float cb = 1. - min(1., c1p + c2p);

    vec4 ret_col = colour_1 * c1p + colour_2 * c2p + vec4(cb * BLACK.rgb, cb * colour_1.a);
    float m_flash = max(mid_flash * 0.8, max(c1p, c2p) * 5. - 4.4) + mid_flash * max(c1p, c2p);
    
    return easing(ret_col * (1. - m_flash) + m_flash * vec4(1.), 1.5);
}

void main() {
    // 1. Setup normalized coordinates (-0.5 to 0.5)
    vec2 uv = gl_FragCoord.xy / iResolution.xy - 0.5;
    uv.x *= iResolution.x / iResolution.y;

    // 2. Setup normalized mouse (-0.5 to 0.5)
    vec2 mouse = (iMouse.xy / iResolution.xy) - 0.5;
    mouse.x *= iResolution.x / iResolution.y;

    // 3. DISTORTION MATH
    // Calculate distance between current pixel and the mouse
    float dist = length(uv - mouse);
    
    // Create a 'pull' strength. exp(-dist) means it is very strong 
    // exactly at the mouse and falls off quickly.
    float pull = exp(-dist * 2.5) * 0.15; 
    
    // Warp the UVs by pulling them toward the mouse position
    vec2 warpedUv = uv + (mouse - uv) * pull;

    // 4. Output with warped UVs
    fragColor = effect(vec3(warpedUv, 0.), 2.0);
}