import { Button, Container, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useEffect, useState } from "react";
import "./index.css";

const DEFAUL_URL = "https://jsonplaceholder.typicode.com/posts/";

export default function Main() {
  const [concurrency, setConcurrency] = useState(3);
  const [count, setCount] = useState(3);
  const [urls, setUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let value: string[] = [];
    for (let i = 0; i < count; i++) {
      const url = DEFAUL_URL + (i + 1);
      value.push(url);
    }
    setUrls(value);
  }, [count]);

  return (
    <Container maxWidth="lg">
      <h1>Typescript Parallel API</h1>
      <div className="main-container">
        <div className="top-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "32px",
            }}
          >
            <TextField
              type="number"
              label="Concurrency"
              variant="outlined"
              style={{ width: "120px" }}
              value={concurrency}
              onChange={(e) => setConcurrency(parseInt(e.target.value))}
            />
            <LoadingButton
              loading={loading}
              loadingPosition="end"
              variant="contained"
              endIcon={<SendIcon />}
              style={{ width: "160px", marginLeft: "auto" }}
            >
              Fetch Data
            </LoadingButton>
          </div>
          <TextField
            label="Urls"
            variant="outlined"
            disabled
            multiline
            rows={10}
            value={urls.join("\n")}
          />
          <div style={{ marginTop: "24px" }}>
            <Button
              variant="contained"
              style={{ width: "120px", marginRight: "24px" }}
              onClick={() => setCount((prevCount) => prevCount + 1)}
            >
              Add
            </Button>
            <Button
              variant="contained"
              style={{ width: "120px" }}
              onClick={() =>
                setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0))
              }
            >
              Remove
            </Button>
          </div>
          <div className="bottom-container">
            <TextField
              label="Response"
              variant="outlined"
              disabled
              multiline
              rows={20}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
