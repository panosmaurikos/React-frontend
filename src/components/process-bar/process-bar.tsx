import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';

export function ProcessBar({ steps, activeStep }: { steps: string[]; activeStep: number }) {
  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, idx) => (
          <Step key={label} completed={idx < activeStep}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}