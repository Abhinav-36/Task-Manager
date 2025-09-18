import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    palette: {
        primary: {
            main: "#42a5f5",
        },
        secondary: {
            main: "#FFFFFF"
        },
  },

  components: {
    MuiTableCell:{
        styleOverrides: {
            head: {
                fontWeight: "bold",
            }
        }
    }
  }
})

export default theme;
