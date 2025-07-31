import React from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import Accordion from '@mui/material/Accordion';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { jodi_digit, single_digit } from 'src/_mock/numbers';

// ----------------------------------------------------------------------

export default function ResultPage() {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Game Numbers</Typography>
      </Stack>

      <>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>SINGLE DIGIT NUMBERS</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              direction="row"
              alignItems="center"
              flexWrap="wrap"
              justifyContent="space-evenly"
              mb={2}
            >
              {single_digit.map((value) => (
                <Avatar key={value} component="span" sx={{ bgcolor: blue[500], m: 1 }} variant="rounded">
                  {value}
                </Avatar>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>JODI DIGIT NUMBERS</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              direction="row"
              alignItems="center"
              flexWrap="wrap"
              justifyContent="space-evenly"
              mb={2}
            >
              {jodi_digit.map((value) => (
                <Avatar key={value} component="span" sx={{ bgcolor: blue[500], m: 1 }} variant="rounded">
                  {value}
                </Avatar>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </>
    </Container>
  );
}
