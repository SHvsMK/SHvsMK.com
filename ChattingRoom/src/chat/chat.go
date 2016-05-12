package chat

import (
  "golang.org/x/net/websocket"
  // "fmt"
  "encoding/json"
)

type ChattingRoom struct {
  onlineUsers map[string]*OnlineUser
  broadcast chan Message
  closeSign chan bool
}

type OnlineUser struct {
  room *ChattingRoom
  conn *websocket.Conn
  userInfo *User
  send chan Message
}

type Message struct {
  textMessage TextMessage
  // userStatus UserStatus
}

type TextMessage struct {
  content string
  userInfo *User
  time string
}

type userStatus struct {
  user []*User
}

type User struct {
  name string
}

type Mssg struct {
	Sender  string
	Message string
}

var Room *ChattingRoom = &ChattingRoom{}

func InitChattingRoom() {
  Room = &ChattingRoom{
    onlineUsers: make(map[string]*OnlineUser),
    broadcast: make(chan Message),
    closeSign: make (chan bool),
  }
  go Room.start()
}

func (this * ChattingRoom) start() {
  for {
    select {
      case b := <-this.broadcast:
        for _, user := range this.onlineUsers {
          user.send <- b
        }
      case c := <-this.closeSign:
        if c == true {
          close(this.broadcast)
          close(this.closeSign)
          return
      }
    }
  }
}

func BuildConnection(ws *websocket.Conn) {
  username := ws.Request().URL.Query().Get("username")

  onlineuser := &OnlineUser {
    room: Room,
    conn: ws,
    send: make(chan Message, 256),
    userInfo: &User{
      name: username,
    },
  }
  Room.onlineUsers[username] = onlineuser

  go onlineuser.SendMessage()
  onlineuser.ReceiveMessage()
  onlineuser.EndChatting()
}

func (this *OnlineUser) SendMessage() {
  for b := range this.send {
    msg := &Mssg{
      Sender: b.textMessage.userInfo.name,
      Message: b.textMessage.content,
    }
    m, _ := json.Marshal(msg)
    x := string(m)
    err := websocket.Message.Send(this.conn, x)
    if err != nil {
      break
    }
  }
}

func (this *OnlineUser) ReceiveMessage() {
  for {
    var content string
    err := websocket.Message.Receive(this.conn, &content)
    if err != nil {
      return
    }
    msg := Mssg{}
    json.Unmarshal([]byte(content), &msg)
    m := Message{
      textMessage: TextMessage{
        userInfo: this.userInfo,
        content: msg.Message,
      },
    }
    this.room.broadcast <- m
  }
}

func (this *OnlineUser) EndChatting() {
  this.conn.Close()
  delete(this.room.onlineUsers, this.userInfo.name)
  close(this.send)
}
