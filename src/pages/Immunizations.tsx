import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";

/* ---------- Data ---------- */

const immunizationData = [
  /* ————— INFANTS & CHILDREN ————— */
  {
    category: "Infants & Children (0‑6 years)",
    vaccines: [
      {
        name: "DTaP‑HB‑IPV‑Hib",
        protectsAgainst:
          "Diphtheria, Tetanus, Pertussis, Hepatitis B, Polio, Haemophilus influenzae type b.",
        coverage: "Free",
      },
      {
        name: "Pneumococcal Conjugate (PCV20)",
        protectsAgainst: "20‑serotype pneumococcal disease.",
        coverage: "Free",
      },
      {
        name: "Rotavirus",
        protectsAgainst: "Rotavirus gastroenteritis.",
        coverage: "Free",
      },
      {
        name: "Meningococcal C Conjugate (Men‑C‑C)",
        protectsAgainst: "Meningococcal C disease.",
        coverage: "Free",
      },
      {
        name: "MMR",
        protectsAgainst: "Measles, Mumps, Rubella.",
        coverage: "Free",
      },
      {
        name: "Varicella (Chickenpox)",
        protectsAgainst: "Chickenpox (varicella).",
        coverage: "Free",
      },
      {
        name: "Influenza (Flu)",
        protectsAgainst: "Seasonal influenza — starts at 6 months, yearly.",
        coverage: "Free",
      },
      {
        name: "Hepatitis A (Indigenous program)",
        protectsAgainst: "Hepatitis A.",
        coverage: "Free",
      },
      {
        name: "Tdap‑IPV (School‑entry booster)",
        protectsAgainst: "Tetanus, Diphtheria, Pertussis, Polio.",
        coverage: "Free",
      },
      {
        name: "COVID‑19",
        protectsAgainst: "COVID‑19.",
        coverage: "Free",
      },
      {
        name: "RSV Monoclonal Antibody (Nirsevimab)",
        protectsAgainst:
          "Severe RSV infection (passive immunity for the first RSV season).",
        coverage: "Free (only for eligible high‑risk infants)",
      },
      {
        name: "Meningococcal B (4CMenB)",
        protectsAgainst: "Meningococcal B disease.",
        coverage: "Out of Pocket",
      },
    ],
  },

  /* ————— ADOLESCENTS & TEENS ————— */
  {
    category: "Adolescents & Teens (Grade 6‑12)",
    vaccines: [
      {
        name: "HPV9 (Human Papillomavirus)",
        protectsAgainst:
          "Cancers and warts caused by HPV types 6, 11, 16, 18, 31, 33, 45, 52, 58.",
        coverage: "Free (Grade 6 program)",
      },
      {
        name: "Meningococcal Quadrivalent (Men‑ACYW‑135)",
        protectsAgainst: "Meningococcal A, C, Y, W‑135 disease.",
        coverage: "Free (Grade 9 program)",
      },
      {
        name: "Tdap",
        protectsAgainst: "Tetanus, Diphtheria, Pertussis — Grade 9 booster.",
        coverage: "Free",
      },
      {
        name: "Influenza (Flu)",
        protectsAgainst: "Seasonal influenza.",
        coverage: "Free",
      },
      {
        name: "COVID‑19",
        protectsAgainst: "COVID‑19.",
        coverage: "Free",
      },
      {
        name: "Meningococcal B (4CMenB)",
        protectsAgainst: "Meningococcal B disease.",
        coverage: "Out of Pocket",
      },
      {
        name: "Varicella (catch‑up)",
        protectsAgainst: "Chickenpox (for students lacking prior immunity).",
        coverage: "Free",
      },
    ],
  },

  /* ————— ADULTS ————— */
  {
    category: "Adults (19‑64)",
    vaccines: [
      {
        name: "Td (Tetanus‑Diphtheria)",
        protectsAgainst: "Tetanus & Diphtheria — booster every 10 years.",
        coverage: "Free",
      },
      {
        name: "Tdap (one adult dose)",
        protectsAgainst:
          "Tetanus, Diphtheria, Pertussis — free if never received; otherwise purchase.",
        coverage: "Out of Pocket",
      },
      {
        name: "Influenza (Flu)",
        protectsAgainst: "Seasonal influenza.",
        coverage: "Free",
      },
      {
        name: "COVID‑19",
        protectsAgainst: "COVID‑19.",
        coverage: "Free",
      },
      {
        name: "Shingles (Shingrix)",
        protectsAgainst: "Shingles & post‑herpetic neuralgia.",
        coverage: "Out of Pocket",
      },
      {
        name: "RSV (Arexvy / Abrysvo)",
        protectsAgainst:
          "Lower‑respiratory‑tract disease caused by RSV (recommended age 60‑64 or high risk).",
        coverage: "Out of Pocket",
      },
      {
        name: "MMR (catch‑up)",
        protectsAgainst:
          "Measles, Mumps, Rubella (for adults born ≥ 1970 lacking immunity).",
        coverage: "Free",
      },
      {
        name: "Varicella (catch‑up)",
        protectsAgainst:
          "Chickenpox (for adults without history or vaccination).",
        coverage: "Free",
      },
      {
        name: "Pneumococcal Conjugate (PCV20)",
        protectsAgainst:
          "20‑serotype pneumococcal disease (for certain high‑risk adults).",
        coverage: "Free (medical risk only)",
      },
    ],
  },

  /* ————— SENIORS ————— */
  {
    category: "Seniors (65+)",
    vaccines: [
      {
        name: "Pneumococcal Conjugate (PCV20)",
        protectsAgainst: "Pneumococcal disease (single lifetime dose).",
        coverage: "Free",
      },
      {
        name: "High‑Dose / Adjuvanted Influenza",
        protectsAgainst:
          "Seasonal influenza — enhanced formulation for seniors.",
        coverage: "Free",
      },
      {
        name: "Td (Tetanus‑Diphtheria)",
        protectsAgainst: "Tetanus & Diphtheria — booster every 10 years.",
        coverage: "Free",
      },
      {
        name: "COVID‑19 (seasonal boosters)",
        protectsAgainst: "COVID‑19.",
        coverage: "Free",
      },
      {
        name: "RSV (Arexvy / Abrysvo)",
        protectsAgainst: "Lower‑respiratory‑tract disease caused by RSV.",
        coverage: "Out of Pocket",
      },
      {
        name: "Shingles (Shingrix)",
        protectsAgainst: "Shingles & post‑herpetic neuralgia.",
        coverage: "Out of Pocket",
      },
    ],
  },

  /* ————— PREGNANT PEOPLE ————— */
  {
    category: "Pregnant People",
    vaccines: [
      {
        name: "Tdap (each pregnancy)",
        protectsAgainst:
          "Tetanus, Diphtheria, Pertussis — given at 27‑32 weeks gestation.",
        coverage: "Free",
      },
      {
        name: "Influenza (Flu)",
        protectsAgainst: "Seasonal influenza.",
        coverage: "Free",
      },
      {
        name: "COVID‑19",
        protectsAgainst: "COVID‑19.",
        coverage: "Free",
      },
      {
        name: "RSV (Abrysvo – maternal)",
        protectsAgainst:
          "Passive protection against RSV for newborns & parent.",
        coverage: "Out of Pocket",
      },
    ],
  },

  /* ————— TRAVEL / OPTIONAL ————— */
  {
    category: "Travel & Optional Vaccines",
    vaccines: [
      {
        name: "Hepatitis A",
        protectsAgainst: "Hepatitis A.",
        coverage: "Out of Pocket",
      },
      {
        name: "Hepatitis B",
        protectsAgainst: "Hepatitis B.",
        coverage: "Out of Pocket",
      },
      {
        name: "Twinrix (Hep A + B)",
        protectsAgainst: "Hepatitis A & B.",
        coverage: "Out of Pocket",
      },
      {
        name: "Typhoid",
        protectsAgainst: "Typhoid fever.",
        coverage: "Out of Pocket",
      },
      {
        name: "Japanese Encephalitis",
        protectsAgainst: "Japanese Encephalitis.",
        coverage: "Out of Pocket",
      },
      {
        name: "Yellow Fever",
        protectsAgainst: "Yellow Fever.",
        coverage: "Out of Pocket",
      },
      {
        name: "Rabies (pre‑exposure)",
        protectsAgainst: "Rabies.",
        coverage: "Out of Pocket",
      },
      {
        name: "Cholera / Traveller’s Diarrhea (Dukoral)",
        protectsAgainst: "Cholera & ETEC traveller’s diarrhea.",
        coverage: "Out of Pocket",
      },
      {
        name: "Polio (IPV booster)",
        protectsAgainst: "Polio — required for some destinations.",
        coverage: "Out of Pocket",
      },
      {
        name: "Tick‑Borne Encephalitis (TBE)",
        protectsAgainst: "Tick‑borne encephalitis virus.",
        coverage: "Out of Pocket",
      },
      {
        name: "Meningococcal B (4CMenB)",
        protectsAgainst:
          "Meningococcal B disease (for travel or outbreak areas).",
        coverage: "Out of Pocket",
      },
    ],
  },
];

/* ---------- Components ---------- */

interface VaccineCardProps {
  name: string;
  protectsAgainst: string;
  coverage: "Free" | "Out of Pocket" | string;
}

const VaccineCard: React.FC<VaccineCardProps> = React.memo(
  ({ name, protectsAgainst, coverage }) => (
    <Card
      elevation={2}
      sx={{
        width: "100%",
        height: "100%",
        border: "1px solid",
        borderColor: "grey.200",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Protects against: {protectsAgainst}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Chip
          label={coverage}
          color={coverage === "Free" ? "success" : "warning"}
          size="small"
        />
      </Box>
    </Card>
  )
);
VaccineCard.displayName = "VaccineCard";

/* ---------- Page ---------- */

export default function Immunizations(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredData = useMemo(() => {
    let data = immunizationData;

    if (selectedCategory) {
      data = data.filter((group) => group.category === selectedCategory);
    }

    if (searchTerm) {
      data = data
        .map((group) => {
          const filteredVaccines = group.vaccines.filter((vaccine) =>
            vaccine.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          return { ...group, vaccines: filteredVaccines };
        })
        .filter((group) => group.vaccines.length > 0);
    }

    return data;
  }, [searchTerm, selectedCategory]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#edf4f8",
        minHeight: "100vh",
        py: { xs: 6, md: 10 },
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        {/* Headline */}
        <Typography
          variant="h3"
          component="h1"
          textAlign="center"
          gutterBottom
          sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}
        >
          Immunizations & Vaccines
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
          Stay protected with our available immunizations.
        </Typography>

        {/* Filter and Search Controls */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mb: 4,
            flexWrap: "wrap",
          }}
        >
          <TextField
            label="Search by vaccine name..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: "100%",
              maxWidth: "400px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
                backgroundColor: "white",
              },
            }}
          />
          <FormControl
            variant="outlined"
            sx={{
              width: "100%",
              maxWidth: "300px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
                backgroundColor: "white",
              },
            }}
          >
            <InputLabel>Filter by age group</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Filter by age group"
            >
              <MenuItem value="">
                <em>All Age Groups</em>
              </MenuItem>
              {immunizationData.map((group) => (
                <MenuItem key={group.category} value={group.category}>
                  {group.category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            onClick={handleClearFilters}
            sx={{
              borderRadius: "25px",
              height: "56px",
            }}
          >
            Clear
          </Button>
        </Box>

        {/* Vaccine Categories */}
        {filteredData.map((category) => (
          <Box key={category.category} sx={{ mb: 6 }}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" },
                borderBottom: "2px solid #0a9396",
                pb: 1,
                mb: 4,
              }}
            >
              {category.category}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 3,
              }}
            >
              {category.vaccines.map((vaccine) => (
                <VaccineCard
                  key={vaccine.name}
                  name={vaccine.name}
                  protectsAgainst={vaccine.protectsAgainst}
                  coverage={vaccine.coverage as "Free" | "Out of Pocket"}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
}
