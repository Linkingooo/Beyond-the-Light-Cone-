// Defensive shim for WebGL on mobile browsers (iOS in-app, old Safari/WebView)
// where getShaderPrecisionFormat() returns null and crashes three.js'
// WebGLCapabilities.getMaxPrecision when it dereferences `.precision`.
//
// Patches WebGLRenderingContext.prototype once. WebGL2RenderingContext
// inherits from it, so both contexts are covered.

let installed = false;

export function installWebGLShim() {
  if (installed) return;
  if (typeof window === "undefined") return;
  const Ctor = (window as unknown as {
    WebGLRenderingContext?: typeof WebGLRenderingContext;
  }).WebGLRenderingContext;
  if (!Ctor) return;

  const proto = Ctor.prototype as WebGLRenderingContext;
  const original = proto.getShaderPrecisionFormat;
  if (!original) {
    installed = true;
    return;
  }

  proto.getShaderPrecisionFormat = function (
    this: WebGLRenderingContext,
    shaderType: GLenum,
    precisionType: GLenum
  ) {
    const result = original.call(this, shaderType, precisionType);
    if (result === null) {
      // Pretend mediump-ish capability is available so three.js doesn't crash.
      return {
        rangeMin: 14,
        rangeMax: 14,
        precision: 10,
      } as WebGLShaderPrecisionFormat;
    }
    return result;
  };
  installed = true;
}
