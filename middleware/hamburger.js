export default function ({
  store,
  route
}) {
  store.commit("menu/SetActive", false);
}