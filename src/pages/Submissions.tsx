import React from "react";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useAppSelector } from "../lib/useAppSelector";
import { selectSubmissions } from "../redux/submissions";
import dayjs from 'dayjs';

export default function Submissions() {
  const submissions = useAppSelector(selectSubmissions);

  return (
    <Box sx={{ mt: 2 }}>
      <Container>
        <TableContainer component={Paper}>
         <Typography variant="h4" sx={{ m: 1 }}>
          My Submissions
         </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Submitted At</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Zip</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {submissions.map((submission) => {
                const { listing } = submission;

                return (
                  <TableRow key={submission.id}>
                    <TableCell>{dayjs(submission.createdAt).format('M/D/YYYY h:mm:ss A')}</TableCell>
                    <TableCell>{listing.name}</TableCell>
                    <TableCell>{listing.physicalAddress.address1}</TableCell>
                    <TableCell>{listing.physicalAddress.city}</TableCell>
                    <TableCell>{listing.physicalAddress.state}</TableCell>
                    <TableCell>{listing.physicalAddress.zip}</TableCell>
                    <TableCell sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textWrap: "nowrap",
                      maxWidth: "200px",
                    }}>
                      {submission.reason}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
