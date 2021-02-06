// gcc chall.c -o cells -fno-stack-protector -z execstack
#include <stdio.h>

void interlinked()
{
    char vulnBuf[3];
    char buf1[10];
    char buf2[10];
    char buf3[10];

    printf("A system of cells interlinked - %p: ", &buf1);
    fgets(buf1, 7, stdin);

    printf("Within cells interlinked: ");
    fgets(buf2, 7, stdin);

    printf("Within cells interlinked within one stem: ");
    fgets(buf3, 7, stdin);

    printf("And dreadfully distinct against the dark: ");
    fgets(vulnBuf, 20, stdin);

    printf("A tall white fountain played\n");
    return;
}

int main(int argc, char const *argv[])
{
    setbuf(stdout, NULL);
    setbuf(stdin, NULL);

    printf("And blood black nothingness began to spin \n");
    interlinked();
    return 0;
}
