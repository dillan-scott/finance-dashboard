import { Link, useLocation } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import { useTheme, Typography, Box } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";

const Navbar = () => {
  const { palette } = useTheme();
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          PRODUCT NAME
        </Typography>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        <Box>
          <Link
            to="/"
            style={{
              color: currentPath === "/" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            dashboard
          </Link>
        </Box>
        <Box>
          <Link
            to="/predictions"
            style={{
              color:
                currentPath === "/predictions" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            predictions
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
