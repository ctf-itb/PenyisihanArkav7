package main

import (
	"os"
	"fmt"
	"crypto/rand"
	"encoding/binary"
	"io/ioutil"
	"bufio"
	"strconv"
)

var (
	cheese	=-0x0000000000000001
	burger 	= 0x5c0ac2f97d522690
	pizza 	= 0x4348dfa34f25871a
	rice 	= 0x6d24f6d696542617
	egg 	= 0x43359e102356ae8d
	milk 	= 0x29faeb773d60e073
	sprite 	= 0x53900c11aa4c5279
	coke 	= 0x40a4ad84159eea23
	fanta	= 0x50e0e94bf4d79de1
	pepsi 	= 0x13ac113ffe5feb63
)

func how(x int, y int) int {
	return ((x << y) & cheese) | (x >> (64 - y))
}

func to(x int) int {
	menu1 := (x * burger) - pepsi
	menu2 := rice - egg - x
	menu3 := - coke - (pizza - sprite) * x * x
	return menu1 + menu2 + menu3
}

func eat(x int) int {
	k1 := burger
	k2 := pizza
	k3 := rice
	k4 := egg
	k5 := milk

	for i := 0; i < 80; i++ {
		var k, f int
		if i < 20 {
			f = (k2 & k3) ^ (k2 & k4)
			k = sprite
		} else if i < 40 {
			f = k2 ^ k3 ^ k4
			k = coke
		} else if i < 60 {
			f = (k2 & k3) ^ (k2 & k4) ^ (k3 & k4)
			k = fanta
		} else {
			f = k2 ^ k3 ^ k4
			k = pepsi
		}
		temp := ((k1 << 5) + f + k5 + k) & x
		k5 = k4
		k4 = k3
		k3 = k2
		k2 = k1
		k1 = temp
	}
	return (k1 + k2 + k3 + k4 + k5) & 0x7fffffffffff
}

func life(x int, y int, z int) int {
	res := 1
	for y != 0 {
		if y & 1 == 1 {
			res = (res * x) % z
		}
		y >>= 1
		x = (x * x) % z
	}
	return res
}

func randomNum(n int) int {
	data := [8]byte{}
	_, err := rand.Read(data[:])
	if err != nil {
		panic(err)
	}
	if n != 0 {
		return (n + (int(binary.BigEndian.Uint64(data[:])) % n)) % n
	}
	return int(binary.BigEndian.Uint64(data[:]))
}

func readFlag() string {
	dat, err := ioutil.ReadFile("flag.txt")
	if err != nil {
		panic(err)
	}
    return string(dat)
}

func main() {
	fmt.Println(`
                  $$  $$  $$
     HOW        __||__||__||__
     TO        | * * * * * * *|
     EAT       |* * * * * * * |
     LIFE      | * * * * * * *|
               |______________|
	`)

	reader := bufio.NewReader(os.Stdin)
	r := randomNum(50)
	attempts := 10
	correct := 0

	for ; attempts > 0; attempts-- {
		var (
			input string
			err error
			a, b int
		)

		o := randomNum(0)
		q := randomNum(0)

		fmt.Println("Can you guess the number to get my ID?")
		fmt.Println(fmt.Sprintf("ID: %d", q))

		fmt.Print("A: ")
		input, _ = reader.ReadString('\n')
		a, err = strconv.Atoi(input[:len(input)-1])
		if err != nil {
			panic(err)
		}

		fmt.Print("B: ")
		input, _ = reader.ReadString('\n')
		b, err = strconv.Atoi(input[:len(input)-1])
		if err != nil {
			panic(err)
		}

		if life(o, eat(to(how(a, r))), cheese) * b == q {
			fmt.Println("You're correct!")
			correct++
		} else {
			fmt.Println("You're wrong :(")
		}

		if correct == 10 {
			fmt.Println(fmt.Sprintf("You did it! Here is your flag: %s", readFlag()))
			return
		}

		fmt.Println(fmt.Sprintf("You have %d attempts left", attempts-1))
	}

	fmt.Println("Goodbye, you're out of attempt...")
}