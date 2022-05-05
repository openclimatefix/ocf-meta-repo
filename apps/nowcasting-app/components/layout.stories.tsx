import Layout from "./layout";

export default {
  title: "Components/Layout",
  component: Layout,
};

export const LayoutComponent = () => (
  <Layout environment="local">
    <h1>Hello</h1>
  </Layout>
);
