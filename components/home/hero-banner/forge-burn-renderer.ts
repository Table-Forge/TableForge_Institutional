const VERTEX_SHADER = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
  #else
    precision mediump float;
  #endif

  uniform vec2 u_resolution;
  uniform vec2 u_origin;
  uniform float u_maxDistance;
  uniform float u_progress;
  uniform float u_time;

  float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 n) {
    const vec2 d = vec2(0.0, 1.0);
    vec2 b = floor(n);
    vec2 f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
  }

  float fbm(vec2 n) {
    float total = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      total += noise(n) * amplitude;
      n = n * 2.0 + 17.3;
      amplitude *= 0.55;
    }
    return total;
  }

  void main() {
    vec2 frag = gl_FragCoord.xy;
    vec2 uv = frag / min(u_resolution.x, u_resolution.y);
    float t = u_progress;

    float radial = distance(frag, u_origin) / u_maxDistance;
    float shapeNoise = fbm(uv * 2.2 + 3.7 - vec2(0.15, 0.35) * t);
    float field = radial * 0.62 + shapeNoise * 0.38;

    float burned = smoothstep(field - 0.004, field, t);
    float paperAlpha = 1.0 - burned;

    float heat = smoothstep(field - 0.2, field, t);
    heat *= heat;
    vec3 paperColor = vec3(0.55, 0.06, 0.0) * heat;

    float flameNoise = fbm(uv * 9.0 + vec2(0.0, -u_time * 0.9));
    float showFire = smoothstep(0.35, 0.8, flameNoise);
    showFire += smoothstep(0.55, 0.75, fbm(uv * 1.5 + 5.0 - vec2(0.0, u_time * 0.15)));
    float fireBorder = 0.05 * showFire;
    float fireEdge = smoothstep(field - fireBorder, field - 0.5 * fireBorder, t);
    fireEdge *= 1.0 - smoothstep(field - 0.5 * fireBorder, field, t);
    float fireTone = fbm(uv * 7.0 - vec2(0.0, u_time * 0.6));
    vec3 fireColor = mix(vec3(1.0, 0.14, 0.0), vec3(1.0, 0.72, 0.0), smoothstep(0.2, 0.7, fireTone)) * (1.2 + 1.8 * fireTone);
    paperColor += fireColor * fireEdge;

    float rim = smoothstep(field - 0.012, field - 0.003, t) * paperAlpha;
    paperColor += vec3(1.0, 0.92, 0.7) * rim * 1.4;

    float emberZone = smoothstep(field - 0.06, field + 0.02, t) * (1.0 - smoothstep(field + 0.02, field + 0.16, t));
    float emberNoise = noise(uv * 90.0 + vec2(sin(u_time * 0.7) * 2.0, -u_time * 3.0));
    float ember = smoothstep(0.82, 0.9, emberNoise) * emberZone;
    vec3 emberColor = mix(vec3(1.0, 0.35, 0.05), vec3(1.0, 0.85, 0.5), fract(emberNoise * 5.0));

    float alpha = clamp(paperAlpha + ember, 0.0, 1.0);
    vec3 color = paperColor * paperAlpha + emberColor * ember * 1.6;

    gl_FragColor = vec4(color, alpha);
  }
`;

export interface IForgeBurnRenderer {
  resize: (width: number, height: number, pixelRatio: number) => void;
  setOrigin: (x: number, y: number) => void;
  render: (progress: number, time: number) => void;
  destroy: () => void;
}

function compileShader(gl: WebGLRenderingContext, source: string, type: number) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function createForgeBurnRenderer(canvas: HTMLCanvasElement): IForgeBurnRenderer | null {
  const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
  if (!gl) return null;

  const vertexShader = compileShader(gl, VERTEX_SHADER, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(gl, FRAGMENT_SHADER, gl.FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!vertexShader || !fragmentShader || !program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const positionLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const uniforms = {
    resolution: gl.getUniformLocation(program, "u_resolution"),
    origin: gl.getUniformLocation(program, "u_origin"),
    maxDistance: gl.getUniformLocation(program, "u_maxDistance"),
    progress: gl.getUniformLocation(program, "u_progress"),
    time: gl.getUniformLocation(program, "u_time"),
  };

  let bufferWidth = 1;
  let bufferHeight = 1;
  let ratio = 1;
  let originX = 0;
  let originY = 0;

  const applyOrigin = () => {
    const x = originX * ratio;
    const y = bufferHeight - originY * ratio;
    const maxDistance = Math.max(
      Math.hypot(x, y),
      Math.hypot(bufferWidth - x, y),
      Math.hypot(x, bufferHeight - y),
      Math.hypot(bufferWidth - x, bufferHeight - y),
    );
    gl.uniform2f(uniforms.origin, x, y);
    gl.uniform1f(uniforms.maxDistance, Math.max(maxDistance, 1));
  };

  return {
    resize: (width, height, pixelRatio) => {
      ratio = pixelRatio;
      bufferWidth = Math.max(1, Math.round(width * pixelRatio));
      bufferHeight = Math.max(1, Math.round(height * pixelRatio));
      canvas.width = bufferWidth;
      canvas.height = bufferHeight;
      gl.viewport(0, 0, bufferWidth, bufferHeight);
      gl.uniform2f(uniforms.resolution, bufferWidth, bufferHeight);
      applyOrigin();
    },
    setOrigin: (x, y) => {
      originX = x;
      originY = y;
      applyOrigin();
    },
    render: (progress, time) => {
      gl.uniform1f(uniforms.progress, progress);
      gl.uniform1f(uniforms.time, time);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    destroy: () => {
      gl.deleteBuffer(vertexBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
