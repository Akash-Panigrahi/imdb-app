import AddEditMovie from "../components/AddEditMovie";
import Layout from "../components/Layout";

export default function AddMovie() {
  return (
    <Layout>
      <AddEditMovie
        movie={{
          name: "",
          director: "",
          genres: [],
          "99popularity": 1,
        }}
        operation="add"
      />
    </Layout>
  );
}
