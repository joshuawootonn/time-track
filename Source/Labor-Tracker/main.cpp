#include "admin.h"
#include "loginform.h"
#include "mainform.h"
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);


    QFile styleFile("../Qss/default.qss");
    styleFile.open(QFile::ReadOnly);

    QString style(styleFile.readAll());
    a.setStyleSheet(style);

    MainForm *w= new MainForm;




    w->showMaximized();
    return a.exec();
}
