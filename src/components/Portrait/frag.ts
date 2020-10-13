export default `
  precision highp float;

  uniform sampler2D picture;
  uniform sampler2D displacementPicture;
  uniform float progress;
  uniform float time;

  varying vec2 vUv;

  vec4 displaceF(sampler2D picture, vec2 uv, float dis) {
    float red = texture2D(picture, vec2(uv.x - dis, uv.y + dis)).r;
    float green = texture2D(picture, vec2(uv.x + dis, uv.y - dis)).g;
    float blue = texture2D(picture, vec2(uv.x, uv.y)).b;
    float alpha = texture2D(picture, uv).a;

    return vec4(red, green, blue, alpha); 
  }

  void main() {
    // Displacement test
    // vec4 color = displaceF(picture, vUv, progress / 10.0);

    vec4 displace = texture2D(displacementPicture, vUv);
    vec2 displacedUV = vUv;

    displacedUV.x = mix(vUv.x, displace.r - 0.05, (1.0 - progress));

    vec4 color = texture2D(picture, displacedUV);

    float coef = sin(time / 1000.0);

    color.r = texture2D(picture, displacedUV - vec2(0.0, 0.01) * (1.0 - progress) * coef).r;
    color.g = texture2D(picture, displacedUV - vec2(0.0, 0.02) * (1.0 - progress) * coef).g;
    color.b = texture2D(picture, displacedUV - vec2(0.0, 0.03) * (1.0 - progress) * coef).b;

    gl_FragColor = color;
  }
`
