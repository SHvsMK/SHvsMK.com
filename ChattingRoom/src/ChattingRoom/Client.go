package main

import (
	"fmt"
	"net"
)

const (
	Server_Type = "tcp"
	Server_Port = "8080"

	BUFFSIZE = 1024
)

func main() {
	addr, _ := net.ResolveTCPAddr(Server_Type, ":"+Server_Port)
	conn, _ := net.DialTCP(Server_Type, nil, addr)
	fmt.Println(conn)

}
