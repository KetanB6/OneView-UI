import React, { useState } from "react";
import axios from "axios";
import Nav from "./components/Navbar"

const App = () => {
  const [message, setMessage] = useState({ message: "", keys: "" });
  const [generatedKey, setGeneratedKey] = useState("");
  const [mode, setMode] = useState("retrieve");
  const [keyInput, setKeyInput] = useState("");
  const [retrievedMessage, setRetrievedMessage] = useState("");
  const [loading, setLoading] = useState(false); 

  const saveMessage = async () => {
    try {
      setLoading(true);
      const resp = await axios.post(
        `https://oneview-g8eh.onrender.com/message`,
        message
      );
      setGeneratedKey(resp.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getMessage = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `https://oneview-g8eh.onrender.com/message/${keyInput}`
      );
      setRetrievedMessage(resp.data);
    } catch (error) {
      setRetrievedMessage("Message not found or already viewed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Nav/>
    <div style={styles.container}>
      
      {/* Toggle */}
      <div style={styles.topBar}>
        <button
          style={mode === "save" ? { ...styles.topButton, ...styles.active } : styles.topButton}
          onClick={() => {
            setMode("save");
            setGeneratedKey("");
            setRetrievedMessage("");
          }}
        >
          💬 Save Message
        </button>
        <button
          style={mode === "retrieve" ? { ...styles.topButton, ...styles.active } : styles.topButton}
          onClick={() => {
            setMode("retrieve");
            setGeneratedKey("");
            setRetrievedMessage("");
          }}
        >
          🔑 Retrieve Message
        </button>
      </div>

      {/* Card */}
      <div style={styles.card}>
        {mode === "save" ? (
          <>
            <h2 style={styles.heading}>💬 Save a New Message</h2>
            <input
              type="text"
              placeholder="Type your message..."
              value={message.message}
              onChange={(e) => setMessage({ message: e.target.value, keys: "" })}
              style={styles.inputFull}
            />
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              <button style={styles.button} onClick={saveMessage}>
                Generate Key
              </button>
            </div>

            {loading && <p style={{ color: "gray", marginTop: 12 }}>💾 Saving message...</p>}
            {generatedKey && !loading && (
              <div style={styles.resultBox}>
                ✅ Your message has been saved! <br />
                <strong>Key:</strong> {generatedKey}
              </div>
            )}
          </>
        ) : (
          <>
            <h2 style={styles.heading}>🔑 Retrieve Message</h2>
            <div style={styles.retrieveRow}>
              <input
                type="text"
                placeholder="Enter your key..."
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                style={styles.inputSmall}
              />
              <button style={styles.button} onClick={getMessage}>
                Get Message
              </button>
            </div>
            <div className="message">
              {loading && <p style={{ color: "gray" }}>⏳ Fetching message...</p>}
              {retrievedMessage && !loading && (
                <p style={styles.result}>
                  <br /> 📩 Message for you:
                  <br />
                  <br />
                  {retrievedMessage}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};

/* Styles */
const styles = {
  container: {
    boxSizing: "border-box",
    width: "100%",
    minHeight: "100vh",
    padding: "40px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(135deg, #74ebd5 0%, #9face6 100%)",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  topBar: {
    display: "flex",
    gap: "12px",
    marginBottom: "22px",
  },
  topButton: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    background: "#ff6b6b",
    color: "#fff",
    fontWeight: 700,
    boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
    transition: "transform 0.15s ease, background 0.15s ease",
  },
  active: {
    background: "#4cafef",
    transform: "translateY(-2px)",
  },
  card: {
    width: "100%",
    maxWidth: "480px",
    background: "#fff",
    borderRadius: 12,
    padding: "22px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  heading: {
    margin: "0 0 14px 0",
    fontSize: "20px",
    color: "#222",
  },
  inputFull: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: 15,
    boxSizing: "border-box",
  },
  inputSmall: {
    padding: "10px",
    width: "180px",
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: 15,
    boxSizing: "border-box",
  },
  retrieveRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 12,
  },
  button: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    background: "#4cafef",
    color: "#fff",
    fontWeight: 700,
    boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
  },
  result: {
    marginTop: 12,
    fontWeight: 600,
    color: "#222",
  },
  resultBox: {
    marginTop: 14,
    background: "#ffffffef",
    padding: "14px 16px",
    borderRadius: 10,
    fontSize: 15,
    boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
  },
};

export default App;
