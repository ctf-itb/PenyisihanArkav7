// gcc lovewhisper.c -o lovewhisper -no-pie -Wl,-z,relro,-z,now -m32

#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/mman.h>

void secret(){
	FILE *fp;
	char flag[48];
	printf("♥ you got this! ♥\n");
	fp = fopen("flag.txt", "r");
	fread(&flag, sizeof(char), 48, fp);
	printf("%s\n", flag);
	fclose(fp);
}

void input(char* buffer){
	char c;
	while((c = getchar()) != '\n'){
		*(buffer++) = c;
	}
}

void init(){
	setbuf(stdout, NULL);
}

void chant(){
	FILE *fp;
	char spell[16];
	input(spell);
	fp = fopen("/dev/null", "w");
	fprintf(fp, spell);
	fclose(fp);
}

void ready(){
	char _a[4];
	char* _b;
	_b = _a;
	printf("♥ whisper your love spell ♥\n> ");
	chant();
}

int main(){
	init();
	ready();
	printf("♥ bye! ♥\n");
	return 0;
}