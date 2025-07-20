import {
  Box,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";

// Import icons from Material-UI
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import ChildFriendlyOutlinedIcon from "@mui/icons-material/ChildFriendlyOutlined";
import CleanHandsOutlinedIcon from "@mui/icons-material/CleanHandsOutlined";
import DirectionsRunOutlinedIcon from "@mui/icons-material/DirectionsRunOutlined";
import DonutSmallOutlinedIcon from "@mui/icons-material/DonutSmallOutlined";
import EmergencyOutlinedIcon from "@mui/icons-material/EmergencyOutlined";
import FaceRetouchingNaturalOutlinedIcon from "@mui/icons-material/FaceRetouchingNaturalOutlined";
import FilterVintageOutlinedIcon from "@mui/icons-material/FilterVintageOutlined";
import FlareOutlinedIcon from "@mui/icons-material/FlareOutlined";
import HealingOutlinedIcon from "@mui/icons-material/HealingOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import PestControlRodentOutlinedIcon from "@mui/icons-material/PestControlRodentOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import SentimentVeryDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentVeryDissatisfiedOutlined";
import SmokeFreeOutlinedIcon from "@mui/icons-material/SmokeFreeOutlined";
import SportsGymnasticsOutlinedIcon from "@mui/icons-material/SportsGymnasticsOutlined";
import WashOutlinedIcon from "@mui/icons-material/WashOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import WomanOutlinedIcon from "@mui/icons-material/WomanOutlined";

/* ---------- Data ---------- */

const ailmentData = [
  {
    condition: "Acne",
    description:
      "Acne causes pimples, blackheads, or whiteheads, often on the face, chest, or back. Pharmacists can recommend treatments to help clear the skin and prevent breakouts.",
    icon: <FaceRetouchingNaturalOutlinedIcon />,
  },
  {
    condition: "Nonbullous Impetigo",
    description:
      "Nonbullous impetigo is a skin infection that causes red sores and yellow crusts, usually around the mouth and nose. It spreads easily but clears up with prescribed treatment.",
    icon: <FlareOutlinedIcon />, // Using Flare as a stand-in for sores
  },
  {
    condition: "Canker Sores",
    description:
      "Canker sores are small, painful ulcers inside the mouth that can make eating or talking uncomfortable. They usually heal on their own, but treatment can help ease the pain.",
    icon: <SentimentVeryDissatisfiedOutlinedIcon />,
  },
  {
    condition: "Cold Sore (Herpes Labialis)",
    description:
      "Cold sores are small, fluid-filled blisters on or around the lips caused by a virus. Pharmacists can recommend or prescribe antiviral treatments to help them heal faster.",
    icon: <SentimentDissatisfiedOutlinedIcon />,
  },
  {
    condition: "Eczema (Dermatitis)",
    description:
      "Eczema is a skin condition that causes dryness, redness, itching, or flaking. Pharmacists can suggest creams or ointments to soothe symptoms and protect the skin.",
    icon: <FlareOutlinedIcon />,
  },
  {
    condition: "Dandruff",
    description:
      "Dandruff causes dry, flaky skin on the scalp. Pharmacists can recommend medicated shampoos to reduce flaking and itchiness.",
    icon: <WashOutlinedIcon />,
  },
  {
    condition: "Diaper Rash",
    description:
      "Diaper rash causes red, irritated skin in the diaper area. It’s common in babies and usually clears with creams that protect and soothe the skin.",
    icon: <ChildFriendlyOutlinedIcon />,
  },
  {
    condition: "Ringworm",
    description:
      "Ringworm is a fungal skin infection that looks like a red, round, itchy patch. It’s not caused by worms and can be treated with antifungal creams.",
    icon: <DonutSmallOutlinedIcon />,
  },
  {
    condition: "Jock Itch (Tinea Cruris)",
    description:
      "Jock itch is a red, itchy rash in the groin or inner thigh area. It’s common in athletes and can be treated with antifungal creams.",
    icon: <DirectionsRunOutlinedIcon />,
  },
  {
    condition: "Athlete’s Foot",
    description:
      "Athlete’s foot causes itching, redness, and cracked skin between the toes. It can be treated with antifungal creams or sprays from your pharmacist.",
    icon: <SportsGymnasticsOutlinedIcon />,
  },
  {
    condition: "Stomach Acid Reflux (GERD)",
    description:
      "GERD is when stomach acid flows back into the throat, causing heartburn. Pharmacists can recommend medications to reduce acid and help you feel better.",
    icon: <LocalFireDepartmentOutlinedIcon />,
  },
  {
    condition: "Hemorrhoids",
    description:
      "Hemorrhoids are swollen veins near the anus that cause pain, itching, or bleeding. Pharmacists can recommend creams or treatments to relieve symptoms.",
    icon: <ChairOutlinedIcon />,
  },
  {
    condition: "Insect Bites and Stings",
    description:
      "Insect bites or stings can cause itching, swelling, and redness. Pharmacists can provide treatments to relieve discomfort and prevent infection.",
    icon: <BugReportOutlinedIcon />,
  },
  {
    condition: "Nicotine Cessation",
    description:
      "Pharmacists can help you quit smoking or vaping by prescribing nicotine patches, gum, or other medications, and offering support for your quit plan.",
    icon: <SmokeFreeOutlinedIcon />,
  },
  {
    condition: "Oral Thrush",
    description:
      "Oral thrush is a yeast infection in the mouth that causes white patches or soreness. Pharmacists can prescribe treatments to clear it up.",
    icon: <CleanHandsOutlinedIcon />,
  },
  {
    condition: "Pink Eye (Conjunctivitis)",
    description:
      "Pink eye causes red, itchy, or watery eyes and may have discharge. Pharmacists can help determine the cause and provide drops to relieve it.",
    icon: <RemoveRedEyeOutlinedIcon />,
  },
  {
    condition: "Pinworms",
    description:
      "Pinworms are tiny worms that cause itching around the anus, especially at night. Pharmacists can prescribe medicine to treat them and offer prevention tips.",
    icon: <PestControlRodentOutlinedIcon />,
  },
  {
    condition: "Seasonal Allergies (Allergic Rhinitis)",
    description:
      "Seasonal allergies cause sneezing, runny nose, and itchy eyes from things like pollen. Pharmacists can recommend or prescribe medication to ease your symptoms.",
    icon: <FilterVintageOutlinedIcon />,
  },
  {
    condition: "Shingles (Herpes Zoster)",
    description:
      "Shingles causes a painful rash with blisters, usually on one side of the body. Pharmacists can prescribe antiviral medicine to help it heal faster if started early.",
    icon: <BoltOutlinedIcon />,
  },
  {
    condition: "Toenail Fungal Infection (Onychomycosis)",
    description:
      "A toenail fungal infection makes the nail thick, discolored, or crumbly. Pharmacists can assess and prescribe treatment to improve the nail’s health.",
    icon: <HealingOutlinedIcon />,
  },
  {
    condition: "Urinary Tract Infection (UTI)",
    description:
      "A UTI causes burning when peeing, needing to go often, or lower belly pain. Pharmacists can assess and prescribe antibiotics if it’s a simple infection.",
    icon: <WcOutlinedIcon />,
  },
  {
    condition: "Vaginal Yeast Infection",
    description:
      "A vaginal yeast infection causes itching, redness, and a thick white discharge. Pharmacists can prescribe antifungal treatments to help clear it up.",
    icon: <WomanOutlinedIcon />,
  },
  {
    condition: "Emergency Contraception",
    description:
      "Emergency contraception can prevent pregnancy after unprotected sex or birth control failure. Pharmacists can provide it quickly—best within 3 to 5 days.",
    icon: <EmergencyOutlinedIcon />,
  },
  {
    condition: "Hormonal Contraception",
    description:
      "Pharmacists can prescribe birth control pills, patches, or rings to prevent pregnancy. They can help you choose the best method for your needs.",
    icon: <CalendarMonthOutlinedIcon />,
  },
];

/* ---------- Components ---------- */

interface AilmentCardProps {
  condition: string;
  description: string;
  icon: React.ReactElement;
}

const AilmentCard: React.FC<AilmentCardProps> = React.memo(
  ({ condition, description, icon }) => (
    <Card
      elevation={2}
      sx={{
        width: "100%",
        height: "100%",
        border: "1px solid",
        borderColor: "grey.200",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Box sx={{ color: "primary.main" }}>{icon}</Box>
          <Typography variant="h6" component="div">
            {condition}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
);

AilmentCard.displayName = "AilmentCard";

/* ---------- Page ---------- */

export default function Prescribing(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAilments = useMemo(() => {
    if (!searchTerm) {
      return ailmentData;
    }
    return ailmentData.filter((ailment) =>
      ailment.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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
          Pharmacist Prescribing Services
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
          Our pharmacists can assess and prescribe for these minor ailments.
        </Typography>

        {/* Search Bar */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <TextField
            label="Search for a condition..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: "100%",
              maxWidth: "500px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
                backgroundColor: "white",
              },
            }}
          />
        </Box>

        {/* Service Cards */}
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
          {filteredAilments.map((ailment) => (
            <AilmentCard
              key={ailment.condition}
              condition={ailment.condition}
              description={ailment.description}
              icon={ailment.icon}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
