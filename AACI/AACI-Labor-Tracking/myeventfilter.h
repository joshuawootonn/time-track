#ifndef MYEVENTFILTER_H
#define MYEVENTFILTER_H

#include <QObject>
#include <QDialog>
#include <QWidget>
#include <QEvent>

#include <QMainWindow>
#include <QStackedWidget>
#include <QComboBox>
#include <QtSql>
#include <windows.h>
#include <QVariant>
#include <QWidget>
#include <QDesktopWidget>
#include <QCoreApplication>


class MyEventFilter : public QObject
{
    Q_OBJECT
public:
    explicit MyEventFilter(QObject *parent = 0);


protected:
    bool eventFilter(QObject *obj, QEvent *ev);

signals:
    void active();
public slots:
};

#endif // MYEVENTFILTER_H
