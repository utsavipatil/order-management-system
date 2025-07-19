/**
 * Section1 Styles
 * 
 * This file contains all the styled components used by the Section1 (Hero) component.
 * It uses Material-UI's styled API and CSS-in-JS for styling the hero section.
 * 
 * The styled components include:
 * - StyledSection: Main container with responsive padding and background
 * - Heading: Main headline with custom typography
 * - Subheading: Descriptive text below the main heading
 * - Grid2Col: Two-column grid layout for the hero section
 * - GridImageBox: Container for the image grid
 * - ContentBox: Container for the text content and CTA button
 * 
 * The styles use CSS custom properties (variables) for theming and responsive design.
 * Breakpoints are defined for different screen sizes to ensure proper display on all devices.
 */

import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

// Base section styles
export const sectionStyles = {
  overflow: "clip",
  paddingTop:
    "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_sizes---section--section-padding-vertical)",
  paddingBottom:
    "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_sizes---section--section-padding-vertical)",
  backgroundColor:
    "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758---background-color--bg-primary)",
  color:
    "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758---text-color--text-primary)",
  "&.is-inverse": {
    backgroundColor:
      "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758---background-color--bg-inverse)",
    color:
      "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758---text-color--text-inverse-primary)",
  },
  "@media (max-width: 991px)": {
    paddingTop:
      "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_sizes---section--section-padding-vertical-tablet)",
    paddingBottom:
      "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_sizes---section--section-padding-vertical-tablet)",
  },
  "@media (max-width: 767px)": {
    paddingTop:
      "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_sizes---section--section-padding-vertical-mobile-l)",
    paddingBottom:
      "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_sizes---section--section-padding-vertical-mobile-l)",
  },
  "@media (max-width: 479px)": {
    paddingTop:
      "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_sizes---section--section-padding-vertical-mobile-p)",
    paddingBottom:
      "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_sizes---section--section-padding-vertical-mobile-p)",
  },
};

// Grid styles
export const gapXSmall = {
  columnGap:
    "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_sizes---gap--xs-gap)",
  rowGap:
    "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_sizes---gap--xs-gap)",
};

export const grid2ColStyles = {
  display: "grid",
  gridAutoColumns: "1fr",
  gridTemplateColumns: "minmax(0px, 1fr) minmax(0px, 1fr)",
  gridTemplateRows: "auto",
  "&.gap-xxlarge": {
    columnGap:
      "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_sizes---gap--xxl-gap)",
    rowGap:
      "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_sizes---gap--xxl-gap)",
  },
  "&.tablet-1-col": {
    "@media (max-width: 991px)": {
      gridTemplateColumns: "1fr",
    },
  },
  "@media (max-width: 767px)": {
    gridTemplateColumns: "minmax(0px, 1fr)",
  },
};

export const StyledSection = styled("section")(({ theme }) => ({
  ...sectionStyles,
  marginTop: "1%",
  [theme.breakpoints.down("lg")]: {
    paddingTop: sectionStyles["@media (max-width: 991px)"].paddingTop,
    paddingBottom: sectionStyles["@media (max-width: 991px)"].paddingBottom,
  },
  [theme.breakpoints.down("md")]: {
    paddingTop: sectionStyles["@media (max-width: 767px)"].paddingTop,
    paddingBottom: sectionStyles["@media (max-width: 767px)"].paddingBottom,
  },
  [theme.breakpoints.down("sm")]: {
    paddingTop: sectionStyles["@media (max-width: 479px)"].paddingTop,
    paddingBottom: sectionStyles["@media (max-width: 479px)"].paddingBottom,
  },
}));

// Grid component
export const Grid2Col = styled("div")(({ theme }) => ({
  ...grid2ColStyles,
  "&.gap-xsmall": {
    ...gapXSmall,
  },
  "&.tablet-1-col": {
    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "1fr",
    },
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "minmax(0px, 1fr)",
  },
}));

export const GridImageBox = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "repeat(2, 1fr)",
  gap: "2%",
  "& > img:first-of-type, & > img:nth-of-type(3)": {
    gridRow: "span 2",
    height: "100%",
  },
  "& > img": {
    width: "100%",
    height: "100%",
    minHeight: "200px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto",
    gap: "8px",
    "& > img:first-of-type, & > img:nth-of-type(3)": {
      gridRow: "auto",
      height: "200px",
    },
  },
}));

export const Heading = styled("h1")(({ theme }) => ({
  marginBottom:
    "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_typography---h1-heading--h1-margin-bottom, 24px)",
  fontFamily:
    "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_typography---font--heading-font, inherit)",
  fontSize:
    "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_typography---h1-heading--h1-size, 2.8rem)",
  lineHeight: 1.1,
  fontWeight:
    "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_typography---h1-heading--h1-weight, 700)",
  letterSpacing:
    "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_typography---h1-heading--h1-letter-spacing, normal)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  [theme.breakpoints.down("lg")]: {
    fontSize: "2.4rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
    whiteSpace: "normal",
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize:
      "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_typography---h1-heading--h1-size-mobile-p, 1.75rem)",
  },
}));

export const ImageCover = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
});

export const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  height: "100%",
  textAlign: "left",
  width: "100%",
  marginLeft: "15%",
  [theme.breakpoints.down("md")]: {
    marginLeft: "0",
    padding: theme.spacing(0, 2),
  },
}));

export const Subheading = styled("p")(({ theme }) => ({
  maxWidth:
    "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_sizes---container--container-sm-width)",
  margin: "0 auto",
  marginBottom:
    "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_sizes---spacing--1-25x)",
  fontFamily:
    "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_typography---font--body-font)",
  fontSize:
    "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_typography---text-lg--lg-text-size)",
  lineHeight:
    "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_typography---text-lg--lg-text-line-height)",
  letterSpacing:
    "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_typography---text-lg--lg-text-letter-spacing)",
  color: "color-mix(in srgb, currentcolor 70%, transparent)",
  textWrap: "balance",
  [theme.breakpoints.down("lg")]: {
    fontSize:
      "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_typography---text-lg--lg-text-size-tablet)",
  },
  [theme.breakpoints.down("md")]: {
    fontSize:
      "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_typography---text-lg--lg-text-size-mobile-l)",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize:
      "var(--ai-gen-82921b10-4b39-48f0-b346-808cf4903d29-1752694285758_typography---text-lg--lg-text-size-mobile-p)",
  },
}));
