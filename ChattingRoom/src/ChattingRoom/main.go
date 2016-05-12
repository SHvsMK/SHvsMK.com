package main

import (
  "golang.org/x/net/websocket"
  // "encoding/json"
	// "fmt"
  "chat"
	"net/http"
)

func main() {
  http.Handle("/", websocket.Handler(chat.BuildConnection))

  go chat.InitChattingRoom()

	err := http.ListenAndServe(":8080", nil)
  if err != nil {
    panic("ListenAndServe: " + err.Error())
  }
}
