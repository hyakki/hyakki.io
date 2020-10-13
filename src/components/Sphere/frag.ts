export default `
  precision highp float;

  uniform float time;
  uniform vec2 size;

  #define PI 3.14159265358979323846

  vec2 tile(vec2 _st, float _zoom){
      _st *= _zoom;
      return fract(_st);
  }

  float box(vec2 _st, vec2 _size, float _smoothEdges){
      _size = vec2(0.5)-_size*0.5;
      vec2 aa = vec2(_smoothEdges*0.5);
      vec2 uv = smoothstep(_size,_size+aa,_st);
      uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
      return uv.x*uv.y;
  }

  void main(void){
    vec2 st = gl_FragCoord.xy/size.xy;
    vec3 color = vec3(1.0, 0.0, 0.0);

    // Divide the space in 100
    st = tile(st, size.x / 12.0);

    // Draw a square
    color = vec3(box(st,vec2(0.25),0.01));
    color = mix(vec3(1.0), vec3(0.8), color);

    gl_FragColor = vec4(color,1.0);
  }
`
