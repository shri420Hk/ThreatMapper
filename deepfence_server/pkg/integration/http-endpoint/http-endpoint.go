package httpendpoint

import (
	"bytes"
	"encoding/json"
	"net/http"
)

// todo: add support for batch size
const BatchSize = 100

func New(b []byte) (*HTTPEndpoint, error) {
	h := HTTPEndpoint{}
	err := json.Unmarshal(b, &h)
	if err != nil {
		return &h, err
	}
	return &h, nil
}

func (h HTTPEndpoint) SendNotification(message string) error {
	var req *http.Request
	var err error

	payloadBytes := []byte(message)

	// send message to this http url using http
	// Set up the HTTP request.
	req, err = http.NewRequest("POST", h.Config.URL, bytes.NewBuffer(payloadBytes))
	if err != nil {
		return err
	}

	if h.Config.AuthKey != "" {
		req.Header.Set("Authorization", h.Config.AuthKey)
	}

	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")

	// Make the HTTP request.
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Check the response status code.
	if resp.StatusCode != http.StatusOK {
		return err
	}

	return nil
}

// func (s Slack) FormatMessage