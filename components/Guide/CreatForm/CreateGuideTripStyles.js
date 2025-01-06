import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
  },
  galleryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  imageWrapper: {
    position: "relative",
    marginRight: 8,
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 4,
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#FCD228",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  fieldRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  inputSmall: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 4,
  },
  addButton: {
    color: "#007BFF",
    fontWeight: "bold",
    marginVertical: 8,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
});

export default styles;
