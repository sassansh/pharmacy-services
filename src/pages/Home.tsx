import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
  alpha,
} from "@mui/material";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import VaccinesIcon from "@mui/icons-material/Vaccines";

/* ---------- Helpers ---------- */

const tinted = (color: string) => alpha(color, 0.1);

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactElement;
  to: string;
  color: string;
}

const ServiceCard: React.FC<ServiceCardProps> = React.memo(
  ({ title, description, icon, to, color }) => (
    <Card
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: "350px",
        transition: "transform 0.25s, box-shadow 0.25s",
        "&:hover": {
          transform: "translateY(-3px) scale(1.02)",
          boxShadow: 6,
          borderColor: color,
        },
        border: "2px solid transparent",
        height: "100%", // equal card heights
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={to}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          pt: { xs: 3, md: 4 },
          pb: { xs: 3, md: 4 },
          px: 2,
        }}
      >
        <Avatar
          sx={{
            bgcolor: tinted(color),
            color,
            width: 56,
            height: 56,
            mb: 2,
          }}
        >
          {icon}
        </Avatar>

        <CardContent sx={{ flexGrow: 1, p: 0 }}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
);

ServiceCard.displayName = "ServiceCard";

/* ---------- Page ---------- */

export default function Home(): JSX.Element {
  return (
    <Box
      sx={{
        backgroundColor: "#edf4f8",
        minHeight: "100vh",
        py: { xs: 6, md: 10 },
        px: 2,
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <Container maxWidth="md">
        {/* Headline */}
        <Typography
          variant="h3"
          component="h1"
          textAlign="center"
          gutterBottom
          sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}
        >
          Welcome to Our Pharmacy
        </Typography>

        {/* Sub‑headline */}
        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          textAlign="center"
          mb={6}
          sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
        >
          Professional health services you can trust.
        </Typography>

        {/* Service cards */}
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={12} sm={6}>
            <ServiceCard
              title="Pharmacist Prescribing Services"
              description="Consult with our pharmacist for minor ailments and renewals."
              icon={<MedicalServicesIcon fontSize="large" />}
              to="/prescribing"
              color="#005f73"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <ServiceCard
              title="Vaccines & Immunizations"
              description="Book an appointment or walk in to stay protected."
              icon={<VaccinesIcon fontSize="large" />}
              to="/immunizations"
              color="#0a9396"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
