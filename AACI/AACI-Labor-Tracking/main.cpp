#include "mainwindow.h"
#include "myeventfilter.h"
#include "input_dialog.h"

#include <QApplication>
#include <QtGui>
#include <QLabel>
#include <iostream>
#include <QInputDialog>
int main(int argc, char *argv[])
{

    QApplication a(argc, argv);
    //MyEventFilter f;
    //a.installEventFilter(&f);

    MainWindow w;

    return a.exec();
}
