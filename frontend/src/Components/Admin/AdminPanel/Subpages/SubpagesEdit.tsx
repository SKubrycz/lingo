import { ThemeProvider } from "@emotion/react";
import { Box, Grid2, IconButton, Typography } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { adminTheme } from "../../../../adminTheme";
import { Edit } from "@mui/icons-material";
import getBackground from "../../getBackground";

export default function SubpagesEdit() {
  const [routeData, setRouteData] = useState<any>();
  const { state } = useLocation();

  const handleAuth = async () => {
    if (
      state &&
      typeof state.route === "string" &&
      (state.route !== undefined || state.route !== null) &&
      state.language
    ) {
      // fetch specific route translation
      try {
        const res = await axios.get(
          `http://localhost:${
            import.meta.env.VITE_SERVER_PORT
          }/admin/panel/subpages/edit?route=${state.route}&language=${
            state.language
          }`,
          { withCredentials: true }
        );

        console.log(res.data);

        setRouteData(res.data);
      } catch (error) {
        console.error(error);
        if (isAxiosError(error)) {
        }
      }
    }
  };

  useEffect(() => {
    handleAuth();

    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  }, []);

  const mapData = (data: any, depth = 0) => {
    if (!data) return;

    const indent = { marginLeft: `${depth * 20}px` };

    if (Array.isArray(data)) {
      return (
        <Box sx={indent}>
          {data.map((el, i) => {
            return <b key={i}>{mapData(el, depth + 1)}</b>;
          })}
        </Box>
      );
    } else if (typeof data === "object" && data !== null) {
      return (
        <Box sx={indent}>
          {Object.entries(data).map(([key, value]) => {
            if (key === "metadata") return;
            return (
              <div key={key}>
                <b>{key}</b>: {mapData(value, depth + 1)}
              </div>
            );
          })}
        </Box>
      );
    } else {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={indent}>{String(data)}</Typography>
          <IconButton>
            <Edit sx={{ fontSize: 14 }}></Edit>
          </IconButton>
        </Box>
      );
    }
  };

  return (
    <ThemeProvider theme={adminTheme}>
      <Box
        width="100%"
        height="100vh"
        sx={{
          color: "primary.dark",
          backgroundColor: "primary.contrastText",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" margin="1em">
            Podstrona: {`/${state.route}`}, Język: {state.language}{" "}
            <span className={`fi fi-${state.language}`}></span>
          </Typography>
          <Box sx={{ width: "80%", padding: "2em" }}>
            {routeData && mapData(routeData)}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
