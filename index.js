import TestsRouter from "./lib/TestsRouter"
export * from "./lib/Suite"
export * from "./lib/Test"

export default {
  install(Vue, { router }) {
    router.addRoutes([TestsRouter])
  }
}