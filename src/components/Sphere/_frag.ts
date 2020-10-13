export default `
  #define MAX_STEPS 30
  #define SURF_DIST 0.01
  #define CONNECT_DIST 0.1
  #define SPHERE 0

  precision highp float;

  uniform float time;
  uniform vec2 mouse;
  uniform vec2 size;
  uniform float progress;

  varying vec2 vUv;

  struct Shape {
    int type;
    vec3 direction;
    vec3 pos;
    float size;
    vec3 color;
  };
  Shape shapes[9];

  struct Light {
    vec3 pos;
    vec3 color;
  };
  Light lights[1];

  struct HitPoint {
    bool hit;
    vec3 pos;
    vec3 normal;
    vec3 color;
  };

  vec3 cameraPos = vec3(0.0,0.0,-2.5);

  float sphereDist(Shape sphere, vec3 point) {
    return length(point-sphere.pos)-sphere.size;
  }

  float smin(float a, float b, float k) {
    float h = clamp(0.5+0.5*(b-a)/k, 0.0,1.0);
    return mix(b, a, h)-k*h*(1.0-h);
  }

  HitPoint RayMarch(vec3 origin, vec3 ray) {
    float d0 = 0.0;
    HitPoint ret;
    ret.hit = false;

    for (int i = 0; i < MAX_STEPS; i++)
    {
      vec3 point = origin + ray*d0;
      float dS = -1.0;
      int shapeIndex = -1;
      float ratio = 0.0;
      vec3 color = vec3(0.0);
      vec3 pos = vec3(0.0);
      vec3 normal = vec3(0.0);
      for(int j = 0; j < 3; j++)
      {
        float shapeDist = 0.0;
        shapeDist = sphereDist(shapes[j], point);

        if (dS == -1.0) {
          dS = shapeDist;
          shapeIndex = j;
        } else {
          float k = 1.0;
          float mixedDist = smin(dS, shapeDist, k);
          ratio = clamp( 0.5+0.5*(shapeDist-dS)/k, 0.0, 1.0 );
          dS = mixedDist;
        }

        if (ratio < 1.0) {
         color = mix(shapes[j].color, color, ratio);            
         pos = mix(shapes[j].pos, pos, ratio);
         normal = normalize(point-pos);
        }
      }
      d0 += dS;

      if (dS < SURF_DIST && dS >= 0.0) {
        ret.hit = true;
        ret.pos = point;
        ret.normal = normal;         
        ret.color = color;
        break;
      }
  }

  return ret;
  }

  void createShapes(){    
    shapes[0].type = SPHERE;
    shapes[0].pos = vec3(0.0,0.0,0.0);
    shapes[0].size = 1.0;
    shapes[0].color = vec3(1.0,1.0,1.0);

    float t = time * 0.0003;

    shapes[1].type = SPHERE;
    shapes[1].direction = normalize(vec3(-1.0, 0.0, 0.0));
    shapes[1].pos = vec3(0.0) + (shapes[1].direction * (sin(t * 1.0) + 1.0)) * 1.2;
    shapes[1].size = 0.25;
    shapes[1].color = vec3(1.0,1.0,1.0);

    shapes[2].type = SPHERE;
    shapes[2].direction = normalize(vec3(1.0, 0.0, 0.0));
    shapes[2].pos = vec3(0.0) + (shapes[2].direction * (sin(t * 1.0) + 1.0)) * 1.2;
    shapes[2].size = 0.25;
    shapes[2].color = vec3(1.0,1.0,1.0);

    shapes[3].type = SPHERE;
    shapes[3].direction = normalize(vec3(0.0, 1.0, 0.0));
    shapes[3].pos = vec3(0.0) + (shapes[3].direction * (sin(t * 1.0) + 1.0)) * 1.2;
    shapes[3].size = 0.25;
    shapes[3].color = vec3(1.0,1.0,1.0);

    shapes[4].type = SPHERE;
    shapes[4].direction = normalize(vec3(0.0, -1.0, 0.0));
    shapes[4].pos = vec3(0.0) + (shapes[4].direction * (sin(t * 1.0) + 1.0)) * 1.2;
    shapes[4].size = 0.25;
    shapes[4].color = vec3(1.0,1.0,1.0);

    shapes[5].type = SPHERE;
    shapes[5].direction = normalize(vec3(-1.0, -1.0, 0.0));
    shapes[5].pos = vec3(0.0) + (shapes[5].direction * (sin(t * 1.0) + 1.0)) * 1.2;
    shapes[5].size = 0.1;
    shapes[5].color = vec3(1.0,1.0,1.0);

    shapes[6].type = SPHERE;
    shapes[6].direction = normalize(vec3(-1.0, 1.0, 0.0));
    shapes[6].pos = vec3(0.0) + (shapes[6].direction * (sin(t * 1.0) + 1.0)) * 1.2;
    shapes[6].size = 0.1;
    shapes[6].color = vec3(1.0,1.0,1.0);

    shapes[7].type = SPHERE;
    shapes[7].direction = normalize(vec3(1.0, -1.0, 0.0));
    shapes[7].pos = vec3(0.0) + (shapes[7].direction * (sin(t * 1.0) + 1.0)) * 1.2;
    shapes[7].size = 0.1;
    shapes[7].color = vec3(1.0,1.0,1.0);

    shapes[8].type = SPHERE;
    shapes[8].direction = normalize(vec3(1.0, 1.0, 0.0));
    shapes[8].pos = vec3(0.0) + (shapes[8].direction * (sin(t * 1.0) + 1.0)) * 1.2;
    shapes[8].size = 0.1;
    shapes[8].color = vec3(1.0,1.0,1.0);
  }

  void createLights() {
    lights[0].pos = vec3(-2.0,2.0,-3.0);
    lights[0].color = vec3(1.0,1.0,1.0);
  }

  float lambert(vec3 N, vec3 L) {
    vec3 nrmN = normalize(N);
    vec3 nrmL = normalize(L);
    float result = dot(nrmN, nrmL);
    return max(result, 0.0);
  }

  vec3 PhongShading(in HitPoint hitPoint, in vec3 origin, in vec3 pixelColor) {
    vec3 ambient = vec3(0.1);
    vec3 diffuse = vec3(0.0);
    vec3 specular = vec3(0.0);
      
    vec3 ray = normalize(lights[0].pos-hitPoint.pos);
   
    diffuse += max(dot(ray, hitPoint.normal),0.0)*lights[0].color;
   
    if (length(diffuse) > 0.0) {
      vec3 R = reflect(-ray, hitPoint.normal); //Reflected light vector
      vec3 V = normalize(origin-hitPoint.pos); //Vector to viewer
 
      float specFactor = max(dot(R,V),0.0);
      specular += pow(specFactor, 32.0)*lights[0].color;
    }
      
    return (ambient+diffuse+specular)*pixelColor;
  }

  vec3 Render(in HitPoint hitPoint) {
    vec3 pixelColor = vec3(1.0, 1.0, 1.0);

    if (hitPoint.hit) {
      pixelColor = PhongShading(hitPoint, cameraPos, hitPoint.color);
      // pixelColor = lambert(hitPoint.normal, lights[0].pos);
    }
    
    pixelColor *= 8.0;

    return pixelColor;
  }
  
  void main() {
    createShapes();
    createLights();

    // vUv => 0, 1
    // fragCoord => x,y position current pixel (0, ....)
    // iResolution => width, height canvas

    float aspect = size.x / size.y;
    // vec2 uv = vUv - 0.5;
    vec2 uv = (2.0 * (gl_FragCoord.xy / size.xy) - 1.0) * vec2(aspect, 1.0);

    vec3 ro = cameraPos;
    vec3 rd = normalize(vec3(uv.x,uv.y, 1));

    vec3 col = Render(RayMarch(ro, rd));

    // Output to screen
    gl_FragColor = vec4(col, 1.0);
  }
`
