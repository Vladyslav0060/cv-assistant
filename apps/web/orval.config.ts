const config = {
  api: {
    input: "http://localhost:5050/api-json",
    output: {
      mode: "split",
      target: "src/api/generated.ts",
      client: "react-query",
      baseUrl: "http://localhost:5050",
      override: {
        mutator: {
          path: "src/api/mutator.ts",
          name: "mutator",
        },
      },
      // schemas: {
      //   path: "./model",
      //   type: "zod", // 'typescript' | 'zod'
      // },
    },
  },
  apiZod: {
    input: { target: "http://localhost:5050/api-json" },
    output: {
      client: "zod",
      mode: "tags-split",
      target: "src/api/models",
      fileExtension: ".zod.ts",
    },
  },
};

export default config;
