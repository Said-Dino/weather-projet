import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";


   export const themme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',        
      light: '#63a4ff',       
      dark: '#004ba0',        
      contrastText: '#ffffff',
      bdy :"#d6eaf8",
      shdw:"#070850"
    },
    secondary: {
      main: '#d81b60',    
      light: '#f19fab',      
      dark: '#d8466f',        
      contrastText: '#ffffff',
      bdy: "#fcdadf",
      shdw :"#5a0f3d"
    },
  },
});

export const useTheme = ()=>{
    return useState("primary")}

    export const TmPvd = ({children})=>{
        return <ThemeProvider theme={themme}>{children}</ThemeProvider>
    }



