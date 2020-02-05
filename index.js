import TestsRouter from "./lib/TestsRouter";
import { TestRunner } from "./lib/TestRunner";
export * from "./lib/Suite";
export * from "./lib/Test";

export default {
  install(Vue, { router }) {
    router.addRoutes([TestsRouter]);
  },
  TestRunner
};
