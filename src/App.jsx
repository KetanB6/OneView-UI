import React, { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar"; // Check your import path
import "./App.css";

const App = () => {
  const [message, setMessage] = useState({ message: "", keys: "" });
  const [generatedKey, setGeneratedKey] = useState("");
  const [mode, setMode] = useState("retrieve");
  const [keyInput, setKeyInput] = useState("");
  const [retrievedMessage, setRetrievedMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const saveMessage = async () => {
    if (!message.message.trim()) return; // Prevent empty sends
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
    if (!keyInput.trim()) return;
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
    <div className="app-container">
      <Navbar />

      <div className="main-content">
        {/* Toggle Bar */}
        <div className="toggle-bar">
          <button
            className={`toggle-btn ${mode === "save" ? "active" : ""}`}
            onClick={() => {
              setMode("save");
              setGeneratedKey("");
              setRetrievedMessage("");
            }}
          >
            💬 Save Message
          </button>
          <button
            className={`toggle-btn ${mode === "retrieve" ? "active" : ""}`}
            onClick={() => {
              setMode("retrieve");
              setGeneratedKey("");
              setRetrievedMessage("");
            }}
          >
            🔑 Retrieve Message
          </button>
        </div>

        {/* Main Card */}
        <div className="card">
          {mode === "save" ? (
            <>
              <h2 className="card-heading">Secure Your Message</h2>
              <input
                type="text"
                placeholder="Type your secret message..."
                value={message.message}
                onChange={(e) => setMessage({ message: e.target.value, keys: "" })}
                className="input-field"
              />
              <button className="action-btn" onClick={saveMessage} disabled={loading}>
                {loading ? "Generating..." : "Generate Key"}
              </button>

              {generatedKey && !loading && (
                <div className="result-box">
                  <div>✅ Message Saved!</div>
                  <span className="key-display">{generatedKey}</span>
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="card-heading">Retrieve Message</h2>
              <div className="retrieve-row">
                <input
                  type="text"
                  placeholder="Enter access key..."
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  className="input-field input-small"
                />
                <button className="action-btn" style={{ width: 'auto' }} onClick={getMessage} disabled={loading}>
                  Decrypt
                </button>
              </div>

              {loading && <p className="loading-text">⏳ Fetching secure data...</p>}

              {retrievedMessage && !loading && (
                <div className="message-display">
                  <strong>📩 Decrypted Message:</strong>
                  <br /><br />
                  {retrievedMessage}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="footer-note">
        ⚠️ <strong>Note:</strong> Backend is hosted on Render Free Tier. <br />
        Please allow <strong>2-3 minutes</strong> for the server to wake up.
      </div>
    </div>
  );
};

export default App;