// ECHO CLIENT
// gcc client.c -o client
// Modified from https://www.geeksforgeeks.org/socket-programming-cc/

#include <stdio.h> 
#include <sys/socket.h> 
#include <arpa/inet.h> 
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

int get_sock(char* ip, int port){
	int sock = 0;
	struct sockaddr_in serv_addr; 

	if((sock = socket(AF_INET, SOCK_STREAM, 0)) < 0) { 
		printf("\n Socket creation error \n"); 
		return -1; 
	} 
   
	serv_addr.sin_family = AF_INET; 
	serv_addr.sin_port = htons(port); 
	   
	if(inet_pton(AF_INET, ip, &serv_addr.sin_addr)<=0)  { 
		printf("\nInvalid address/ Address not supported \n"); 
		return -1; 
	}
   
	if(connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0) { 
		printf("\nConnection Failed \n"); 
		return -1; 
	}

	return sock;
}

void run(int sock){
	int len = 0;
	char in_buf[1024];
	char out_buf[1024];

	while(1){
		memset(in_buf, 0, 1024);
		memset(out_buf, 0, 1024);

		printf("\nsay something: ");

		fgets(in_buf, 1024, stdin);
		len = strlen(in_buf);
		send(sock, &len, 4, 0);
		send(sock, in_buf, len, 0);

		read(sock, out_buf, 1024); 
		printf("%s\n", out_buf);
	}
}

int main(int argc, char **argv) {
	printf("*** echo client v1.0.1 ***\n");
    
    if(argc != 3){
        printf("Usage: ./client <IP> <PORT>\n");
        return -1;
    }

	int sock = get_sock(argv[1], atoi(argv[2]));
	if(sock != -1){
		run(sock);
	}
	return 0;
} 