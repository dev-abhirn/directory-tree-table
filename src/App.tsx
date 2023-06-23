import Box from "@mui/material/Box";
import { DirectoryTable } from "./components/DirectoryTable/DirectoryTable.component";
import { createV5Theme } from "@qlik-trial/sprout/theme";
import { ThemeProvider } from "@mui/material/styles";

const sproutV5Theme = createV5Theme();

function App() {
  return (
    <ThemeProvider theme={sproutV5Theme}>
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
    </ThemeProvider>
  );
}

export default App;
