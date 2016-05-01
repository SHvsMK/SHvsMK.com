package main

import (
	// "ErrorHandler"
	"encoding/json"
	// "fmt"
	"net/http"
	// "net/url"
	// "os"
	"golang.org/x/net/websocket"
	// "time"
)

const (
	Server_Type = "tcp"
	Server_Port = "8080"
	BUFFSIZE    = 1024
)

type Mssg struct {
	Sender  string
	Message string
}

var connections map[*websocket.Conn]bool
// var connections = make(map[*websocket.Conn]bool)

func main() {
	// r := helm.New(Root)
	// r.Handle("GET", "/", Root)
	// http.HandleFunc("/", test1)
	connections = make(map[*websocket.Conn]bool)
	http.Handle("/", websocket.Handler(Echo))
	// r.Handle("GET", "/ReceiveMsg", ReceiveMsg)
	// r.Handle("POST", "/SendMsg", SendMsg)
	http.ListenAndServe(":8080", nil)
}

func Echo(ws *websocket.Conn) {
	// var err error
	for {
		var msg Mssg
		// var sender string
		// var message string
		flag := true

		if _, exsited := connections[ws]; !exsited {
			connections[ws] = true
		}

		data, _ := json.Marshal(msg)

		if err := websocket.Message.Receive(ws, &data); err == nil {
			m := Mssg{}
		 	json.Unmarshal([]byte(data), &m)

			for conn, _ := range connections {
				err := websocket.Message.Send(conn, m.Sender)
				if err != nil {
					er := conn.Close()
					if er != nil {
						flag = false
					}
					delete(connections, conn)
				}
			}
		}

		if flag == false {
			break
		}
	}
}
