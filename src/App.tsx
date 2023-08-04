import Box from "@mui/material/Box";
import { DirectoryTable } from "./components/DirectoryTable/DirectoryTable.component";
import { createV5Theme } from "@qlik-trial/sprout/theme";
import { ThemeProvider } from "@mui/material/styles";
import TreeDataGrid from "./components/TreeDataGrid/TreeDataGrid.component";
import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";

const sproutV5Theme = createV5Theme();

function App() {
  const [view, SetView] = useState<"basic" | "mui">("mui");

  return (
    <ThemeProvider theme={sproutV5Theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "95vh",
          width: "95vw",
        }}
      >
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            name="basic"
            onClick={() => SetView("basic")}
            disabled={view === "basic"}
          >
            Basic
          </Button>
          <Button
            name="mui"
            onClick={() => SetView("mui")}
            disabled={view === "mui"}
          >
            MUI DG
          </Button>
        </ButtonGroup>
        {/* <BasicList /> */}
        <Box sx={{ alignSelf: "start", height: "95vh", width: "95vw" }}>
          {view === "basic" ? <DirectoryTable /> : <TreeDataGrid />}
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
