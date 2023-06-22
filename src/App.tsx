// import { BasicList } from "./components/List/List.component";
import Box from "@mui/material/Box";
import { DirectoryTable } from "./components/Table/DirectoryTable.component";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "95vh",
        width: "95vw",
      }}
    >
      {/* <BasicList /> */}
      <Box sx={{ alignSelf: "start" }}>
        <DirectoryTable />
      </Box>
    </div>
  );
}

export default App;
