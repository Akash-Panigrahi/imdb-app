import AddEditMovie from "../components/AddEditMovie";
import Layout from "../components/Layout";

export default function EditMovie() {
  return (
    <Layout>
      <AddEditMovie
        movie={JSON.parse(sessionStorage.getItem("movie-to-edit"))}
        operation="edit"
      />
    </Layout>
  );
}
