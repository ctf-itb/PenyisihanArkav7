package main

import (
	"bytes"
	"fmt"
	"strings"
)

func ljust(s string, n int, fill string) string {
	return s + strings.Repeat(fill, n)
}

// xor encryption
func oncle(input []byte) (output []byte) {
	key := "oncle"
	output = make([]byte, len(input))
	for i := 0; i < len(input); i++ {
		output[i] = byte(input[i] ^ key[i%len(key)])
	}
	return output
}

//  subtitution cipher
func jazz(input []byte) (output []byte) {
	var key, plain string
	plain = "abcdefghijklmnopqrstuvwxyz_{}"
	key = "u{pkmfzq}thjsyo_rvlbanwxiegdc"
	var mapping map[byte]byte
	mapping = make(map[byte]byte, 27)
	for i := 0; i < len(plain); i++ {
		mapping[plain[i]] = key[i]
	}
	output = make([]byte, len(input))
	for i := 0; i < len(input); i++ {
		output[i] = mapping[input[i]]
	}

	return output

}

func main() {

	enc1 := []byte{46, 28, 8, 13, 19, 88, 21, 20, 9, 9, 12, 1, 14, 9, 58, 27, 1, 60, 11, 10}
	enc2 := []byte{106, 117, 121, 122, 103, 111, 121, 112, 106, 109, 103, 116, 117, 101, 101, 101, 101, 101, 101, 99}

	var ooo string
	fmt.Scanln(&ooo)
	ooo = ljust(ooo, 40, "\x00")
	aaa := ooo[:20]
	bbb := ooo[20:40]

	ccc := []byte(aaa)
	zzz := []byte(bbb)

	nnn := oncle(ccc)
	lll := jazz(zzz)

	res := bytes.Equal(nnn, enc1)
	ress := bytes.Equal(lll, enc2)

	if res && ress {
		fmt.Print("Yess Oncle Jazzzz")
	} else {
		fmt.Print("Noo Oncle Jazzzz")
	}
}
