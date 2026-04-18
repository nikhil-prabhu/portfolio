// Inspired by the background shaders in Balatro by LocalThunk.
// Credits for the shader code: https://www.shadertoy.com/view/w3lGzH
// NOTE: The shader code has been slightly modified/customized to fit my needs, but the core logic and visual style remain intact.
import { useEffect, useRef } from 'react';
import vertexShader from '../shaders/vertex.glsl?raw';
import fragmentShader from '../shaders/fragment.glsl?raw';

export const VaporwaveBackground = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const requestRef = useRef<number>();

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const gl = canvas.getContext('webgl2');
		if (!gl) return;

		const createShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
			const shader = gl.createShader(type)!;
			gl.shaderSource(shader, source);
			gl.compileShader(shader);
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				console.error("Shader Error:", gl.getShaderInfoLog(shader));
			}
			return shader;
		};

		const program = gl.createProgram()!;
		gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertexShader));
		gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragmentShader));
		gl.linkProgram(program);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error("Link Error:", gl.getProgramInfoLog(program));
			return;
		}

		gl.useProgram(program);

		const mouseLoc = gl.getUniformLocation(program, "iMouse");
		const timeLoc = gl.getUniformLocation(program, "iTime");
		const resLoc = gl.getUniformLocation(program, "iResolution");

		let mouseX = window.innerWidth / 2;
		let mouseY = window.innerHeight / 2;

		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = window.innerHeight - e.clientY;
		};
		window.addEventListener('mousemove', handleMouseMove);

		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			-1, -1, 1, -1, -1, 1,
			-1, 1, 1, -1, 1, 1
		]), gl.STATIC_DRAW);

		const positionLoc = gl.getAttribLocation(program, "position");
		gl.enableVertexAttribArray(positionLoc);
		gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

		const render = (time: number) => {
			if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
				gl.viewport(0, 0, canvas.width, canvas.height);
			}

			gl.clearColor(0, 0, 0, 1);
			gl.clear(gl.COLOR_BUFFER_BIT);

			gl.uniform1f(timeLoc, time * 0.001);
			gl.uniform2f(resLoc, canvas.width, canvas.height);
			gl.uniform4f(mouseLoc, mouseX, mouseY, 0, 0);

			gl.drawArrays(gl.TRIANGLES, 0, 6);
			requestRef.current = requestAnimationFrame(render);
		};

		requestRef.current = requestAnimationFrame(render);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			if (requestRef.current) cancelAnimationFrame(requestRef.current);
			gl.deleteProgram(program);
			gl.deleteBuffer(buffer);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 -z-10 block h-full w-full pointer-events-none"
		/>
	);
};