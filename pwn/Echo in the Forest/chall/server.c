// ECHO SERVER
// gcc server.c -o server

#include <stdio.h>
#include <string.h>
#include <unistd.h> 

void run(){
	int len;
	char buf[1024];
	
	while(1){
		memset(buf, 0, 1024);
		len = 0;

		read(0, &len, 4);
		if(len<0) break;
		read(0, buf, len);

		write(1, "you said: ", 10);
		write(1, buf, len);
	}
	
}

int main(){
	setbuf(stdout, NULL);
	setbuf(stdin, NULL);
	run();
	return 0;
}