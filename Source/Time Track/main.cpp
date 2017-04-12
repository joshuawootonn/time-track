#include "admin.h"
#include "mainform.h"
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);




    MainForm *w= new MainForm;
    w->showMaximized();
    return a.exec();
}
